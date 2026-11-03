import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import axios from 'axios';
import { Plan, getPlanConfig } from '@/constants/plans';
import { INDIAN_STATES, getStateName } from '@/constants/indianStates';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, AlertCircle, Loader2, Tag, ShieldCheck, ArrowRight, Building, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCredentials } from '@/store';
import { useNavigate } from 'react-router-dom';

interface SubscriptionCheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    planId: string;
    onSuccess?: () => void;
}

interface PriceDiscount {
    kind: 'offer' | 'referral' | 'coupon';
    label: string;
    code?: string;
    amountPaise: number;
}

interface TaxBreakdown {
    mode: 'inclusive' | 'exclusive';
    rateBp: number;
    supplyType?: 'intra' | 'inter';
    pricePaise: number;
    discountPaise: number;
    taxablePaise: number;
    cgstPaise: number | null;
    sgstPaise: number | null;
    igstPaise: number | null;
    totalTaxPaise: number;
    totalPaise: number;
}

interface SubscriptionQuote {
    planId: string;
    interval: 'annual';
    listPricePaise: number;
    discounts: PriceDiscount[];
    tax: TaxBreakdown;
    stateRequired: boolean;
    savedBilling?: {
        stateCode: string;
        gstin?: string;
        legalName?: string;
    } | null;
}

const GSTIN_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

const formatPaise = (paise: number) => {
    const negative = paise < 0;
    const abs = Math.abs(paise);
    const rupees = Math.floor(abs / 100).toString();
    const decimals = String(abs % 100).padStart(2, '0');
    const last3 = rupees.slice(-3);
    const rest = rupees.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return `${negative ? '−' : ''}₹${rest ? `${rest},${last3}` : last3}.${decimals}`;
};

export const SubscriptionCheckoutModal: React.FC<SubscriptionCheckoutModalProps> = ({
    isOpen,
    onClose,
    planId,
    onSuccess,
}) => {
    const plan = getPlanConfig(planId);
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state: RootState) => state.auth);

    const [stateCode, setStateCode] = useState<string>('');
    const [gstin, setGstin] = useState('');
    const [legalName, setLegalName] = useState('');
    const [couponInput, setCouponInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
    const [couponError, setCouponError] = useState<string | null>(null);
    const [applyingCoupon, setApplyingCoupon] = useState(false);

    const [quote, setQuote] = useState<SubscriptionQuote | null>(null);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [quoteError, setQuoteError] = useState<string | null>(null);
    const quoteSeq = useRef(0);
    const prefilled = useRef(false);

    const [paying, setPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const authHeaders = useMemo(() => ({
        headers: { Authorization: `Bearer ${token || sessionStorage.getItem('token')}` }
    }), [token]);

    // Load / calculate quote
    const loadQuote = useCallback(async (opts: { stateCode: string | null; couponCode: string | null }) => {
        if (!isOpen) return;
        const seq = ++quoteSeq.current;
        setQuoteLoading(true);
        setQuoteError(null);
        try {
            const res = await axios.post('/api/payments/subscription-quote', {
                planId,
                interval: 'annual',
                billing: opts.stateCode ? { stateCode: opts.stateCode } : undefined,
                couponCode: opts.couponCode || undefined,
            }, authHeaders);

            if (seq !== quoteSeq.current) return;
            const q: SubscriptionQuote = res.data?.data;
            setQuote(q);

            if (!prefilled.current && q.savedBilling && !opts.stateCode) {
                prefilled.current = true;
                setStateCode(q.savedBilling.stateCode || '');
                setGstin(q.savedBilling.gstin || '');
                setLegalName(q.savedBilling.legalName || '');
            }
        } catch (err: any) {
            if (seq !== quoteSeq.current) return;
            const field = err.response?.data?.field;
            const msg = err.response?.data?.message || err.message || 'Unable to calculate pricing quote';
            if (field === 'couponCode' && opts.couponCode) {
                setAppliedCoupon(null);
                setCouponError(msg);
            } else {
                setQuoteError(msg);
            }
        } finally {
            if (seq === quoteSeq.current) setQuoteLoading(false);
        }
    }, [isOpen, planId, authHeaders]);

    useEffect(() => {
        if (isOpen) {
            loadQuote({ stateCode: stateCode || null, couponCode: appliedCoupon });
        } else {
            // Reset modal state on close
            setPaymentSuccess(false);
            setPaying(false);
            setCouponError(null);
        }
    }, [isOpen, stateCode, appliedCoupon, loadQuote]);

    const handleApplyCoupon = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const code = couponInput.trim().toUpperCase();
        if (!code) {
            setCouponError(null);
            return;
        }
        setApplyingCoupon(true);
        setCouponError(null);
        try {
            await axios.post('/api/payments/subscription-quote', {
                planId,
                interval: 'annual',
                billing: stateCode ? { stateCode } : undefined,
                couponCode: code,
            }, authHeaders);
            setAppliedCoupon(code);
            setCouponInput('');
            toast({
                title: 'Coupon applied',
                description: `Code ${code} was successfully applied to your order.`,
            });
        } catch (err: any) {
            setCouponError(err.response?.data?.message || err.message || 'Invalid or expired coupon');
        } finally {
            setApplyingCoupon(false);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponError(null);
    };

    // GSTIN validation check
    const gstinValue = gstin.trim().toUpperCase();
    const gstinProblem = useMemo(() => {
        if (!gstinValue) return null;
        if (gstinValue.length < 15) return null; // typing in progress
        if (!GSTIN_PATTERN.test(gstinValue)) return 'Please enter a valid 15-character GSTIN';
        if (stateCode && gstinValue.slice(0, 2) !== stateCode) {
            return `First 2 digits (${gstinValue.slice(0, 2)}) must match selected state (${stateCode})`;
        }
        return null;
    }, [gstinValue, stateCode]);

    const canPay = !!stateCode && !!quote && !quoteLoading && !quoteError && !paying &&
        (!gstinValue || (gstinValue.length === 15 && !gstinProblem));

    const handlePay = async () => {
        if (!canPay || !stateCode) return;
        const currentToken = token || sessionStorage.getItem('token');
        if (!currentToken) {
            toast({ title: 'Authentication Required', description: 'Please sign in to proceed.', variant: 'destructive' });
            navigate('/login');
            return;
        }

        setPaying(true);
        try {
            const { data: createRes } = await axios.post('/api/payments/orders', {
                purchaseType: 'subscription',
                planId,
                interval: 'annual',
                pricingVersion: 2,
                billing: {
                    stateCode,
                    gstin: gstinValue || undefined,
                    legalName: gstinValue && legalName.trim() ? legalName.trim() : undefined,
                },
                couponCode: appliedCoupon || undefined,
            }, authHeaders);

            const { internalOrderId, razorpayOrderId, amount, currency, keyId, prefill } = createRes.data;

            if (!razorpayOrderId) {
                throw new Error('Order creation failed. Please try again.');
            }

            const verifyPayment = async (payload: {
                razorpay_order_id: string;
                razorpay_payment_id: string;
                razorpay_signature: string;
            }) => {
                const verifyRes = await axios.post('/api/payments/verify', {
                    internalOrderId,
                    ...payload,
                }, authHeaders);

                if (verifyRes.data?.data?.status === 'paid') {
                    // Update user profile in redux store
                    try {
                        const meRes = await axios.get('/api/auth/me', authHeaders);
                        if (meRes.data?.data?.user) {
                            dispatch(setCredentials({ user: meRes.data.data.user, token: currentToken }));
                        }
                    } catch {
                        // ignore background profile sync error
                    }

                    setPaymentSuccess(true);
                    toast({
                        title: 'Subscription Active!',
                        description: `Your ${plan.name} plan is now activated.`,
                    });
                    if (onSuccess) onSuccess();
                } else {
                    throw new Error('Payment verification could not be confirmed.');
                }
            };

            // Test / Mock mode handler (when Razorpay placeholder key is set in dev)
            if (keyId === 'rzp_test_placeholder' || keyId === '') {
                await verifyPayment({
                    razorpay_order_id: razorpayOrderId,
                    razorpay_payment_id: `pay_mock_${Date.now()}`,
                    razorpay_signature: 'bypass',
                });
                setPaying(false);
                return;
            }

            // Launch standard Razorpay Web checkout
            if (typeof (window as any).Razorpay === 'undefined') {
                throw new Error('Razorpay SDK failed to load. Please check your network connection.');
            }

            const options = {
                key: keyId,
                amount,
                currency: currency || 'INR',
                order_id: razorpayOrderId,
                name: 'PreventVital',
                description: `${plan.name} Plan (Annual)`,
                image: '/favicon.svg',
                prefill: {
                    name: prefill?.name || user?.name || '',
                    email: prefill?.email || user?.email || '',
                    contact: prefill?.contact || user?.profile?.phoneNumber || '',
                },
                handler: async function (response: any) {
                    try {
                        await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                    } catch (err: any) {
                        toast({
                            title: 'Verification Failed',
                            description: err.response?.data?.message || err.message || 'Payment verification failed.',
                            variant: 'destructive',
                        });
                    } finally {
                        setPaying(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setPaying(false);
                    },
                },
                theme: {
                    color: '#51A6CB',
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (resp: any) {
                setPaying(false);
                toast({
                    title: 'Payment Failed',
                    description: resp.error?.description || 'Payment was unsuccessful. Please try again.',
                    variant: 'destructive',
                });
            });
            rzp.open();
        } catch (err: any) {
            setPaying(false);
            toast({
                title: 'Order Error',
                description: err.response?.data?.message || err.message || 'Could not initiate checkout.',
                variant: 'destructive',
            });
        }
    };

    const tax = quote?.tax;
    const launchDiscount = quote?.discounts.find(d => d.kind === 'offer');
    const couponDiscount = quote?.discounts.find(d => d.kind === 'coupon');

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open && !paying) onClose(); }}>
            <DialogContent className="max-w-xl p-0 overflow-hidden sm:rounded-2xl border-slate-100 shadow-2xl">
                {/* Header Gradient */}
                <div className="bg-gradient-to-r from-[#51A6CB] via-[#BF40A3] to-[#802D9C] p-6 text-white relative">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <DialogTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                                    Checkout
                                </DialogTitle>
                                <DialogDescription className="text-white/80 text-sm mt-1">
                                    {plan.name} Plan · 1 Year Subscription
                                </DialogDescription>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white tracking-wide">
                                12 Months Access
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                {/* Modal Body */}
                <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
                    {paymentSuccess ? (
                        <div className="py-8 text-center space-y-4">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Subscription Activated!</h3>
                            <p className="text-sm text-slate-600 max-w-md mx-auto">
                                Thank you for subscribing to PreventVital {plan.name}. Your tax invoice has been generated and sent to your email.
                            </p>
                            <div className="pt-4 flex justify-center gap-3">
                                <Button
                                    onClick={() => { onClose(); navigate('/account/dashboard'); }}
                                    className="bg-gradient-to-r from-[#51A6CB] to-[#BF40A3] text-white hover:opacity-95"
                                >
                                    Go to Dashboard
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => { onClose(); navigate('/account/billing'); }}
                                >
                                    View Billing & Invoices
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Billing Information Section */}
                            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                                    <Building className="w-4 h-4 text-[#51A6CB]" /> Billing Details
                                </h4>

                                {/* State Selection */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="state-select" className="text-xs font-semibold text-slate-700">
                                            Place of Supply (State) <span className="text-rose-500">*</span>
                                        </Label>
                                        <span className="text-[11px] text-slate-400">Required for GST invoice</span>
                                    </div>
                                    <Select value={stateCode} onValueChange={setStateCode}>
                                        <SelectTrigger id="state-select" className="bg-white">
                                            <SelectValue placeholder="Select your state / UT" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-60">
                                            {INDIAN_STATES.map((s) => (
                                                <SelectItem key={s.code} value={s.code}>
                                                    {s.name} ({s.code})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* GSTIN & Business Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="gstin-input" className="text-xs font-semibold text-slate-700">
                                            GSTIN <span className="text-[11px] font-normal text-slate-400">(Optional)</span>
                                        </Label>
                                        <Input
                                            id="gstin-input"
                                            placeholder="e.g. 36AABCU9603R1ZM"
                                            value={gstin}
                                            maxLength={15}
                                            onChange={(e) => setGstin(e.target.value.replace(/\s/g, '').toUpperCase())}
                                            className="bg-white font-mono uppercase text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="legal-name" className="text-xs font-semibold text-slate-700">
                                            Legal Entity Name {gstin && <span className="text-rose-500">*</span>}
                                        </Label>
                                        <Input
                                            id="legal-name"
                                            placeholder="Company or Business Name"
                                            value={legalName}
                                            onChange={(e) => setLegalName(e.target.value)}
                                            className="bg-white text-xs"
                                        />
                                    </div>
                                </div>
                                {gstinProblem && (
                                    <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5" /> {gstinProblem}
                                    </p>
                                )}
                            </div>

                            {/* Coupon Code Section */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                                        <Tag className="w-3.5 h-3.5 text-[#BF40A3]" /> Have a Promo or Referral Code?
                                    </Label>
                                </div>

                                {appliedCoupon ? (
                                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-emerald-800 text-xs">
                                        <span className="font-semibold flex items-center gap-1.5">
                                            <Check className="w-4 h-4 text-emerald-600" />
                                            Code <span className="font-mono tracking-wider">{appliedCoupon}</span> applied
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleRemoveCoupon}
                                            className="text-emerald-700 hover:text-emerald-900 font-medium text-xs underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Enter coupon code"
                                            value={couponInput}
                                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                            className="font-mono text-xs uppercase"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => handleApplyCoupon()}
                                            disabled={!couponInput.trim() || applyingCoupon}
                                            className="px-4 text-xs font-semibold"
                                        >
                                            {applyingCoupon ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply'}
                                        </Button>
                                    </div>
                                )}
                                {couponError && (
                                    <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5" /> {couponError}
                                    </p>
                                )}
                            </div>

                            {/* Order Summary & Pricing Breakdown */}
                            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                                    Order Summary
                                </h4>

                                {quoteLoading ? (
                                    <div className="py-6 flex flex-col items-center justify-center gap-2 text-slate-400">
                                        <Loader2 className="w-5 h-5 animate-spin text-[#51A6CB]" />
                                        <span className="text-xs">Calculating taxes and pricing...</span>
                                    </div>
                                ) : quote ? (
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between text-slate-600">
                                            <span>List Price</span>
                                            <span>{formatPaise(quote.listPricePaise)}</span>
                                        </div>

                                        {launchDiscount && (
                                            <div className="flex justify-between text-emerald-600 font-medium">
                                                <span>{launchDiscount.label}</span>
                                                <span>−{formatPaise(launchDiscount.amountPaise)}</span>
                                            </div>
                                        )}

                                        {couponDiscount && (
                                            <div className="flex justify-between text-emerald-600 font-medium">
                                                <span>Coupon Discount ({couponDiscount.code})</span>
                                                <span>−{formatPaise(couponDiscount.amountPaise)}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-100">
                                            <span>Taxable Value</span>
                                            <span>{formatPaise(tax?.taxablePaise || 0)}</span>
                                        </div>

                                        {/* Tax Breakdown */}
                                        {stateCode ? (
                                            <>
                                                {tax?.cgstPaise != null && tax?.sgstPaise != null ? (
                                                    <>
                                                        <div className="flex justify-between text-xs text-slate-500">
                                                            <span>CGST (9%)</span>
                                                            <span>{formatPaise(tax.cgstPaise)}</span>
                                                        </div>
                                                        <div className="flex justify-between text-xs text-slate-500">
                                                            <span>SGST (9%)</span>
                                                            <span>{formatPaise(tax.sgstPaise)}</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex justify-between text-xs text-slate-500">
                                                        <span>IGST (18%)</span>
                                                        <span>{formatPaise(tax?.igstPaise || 0)}</span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex justify-between text-xs text-amber-600 font-medium">
                                                <span>GST (18%)</span>
                                                <span>Select state above to calculate</span>
                                            </div>
                                        )}

                                        <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold text-slate-900 text-base">
                                            <span>Total Amount</span>
                                            <span className="text-xl text-[#0F172A]">
                                                {formatPaise(tax?.totalPaise || 0)}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-xs text-rose-500">{quoteError || 'Failed to load pricing quote.'}</div>
                                )}
                            </div>

                            {/* Trust badges */}
                            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 py-1">
                                <span className="flex items-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 256-bit Encrypted Payment
                                </span>
                                <span>•</span>
                                <span>Powered by Razorpay</span>
                                <span>•</span>
                                <span>Instant GST Invoice</span>
                            </div>

                            {/* CTA Button */}
                            <Button
                                onClick={handlePay}
                                disabled={!canPay}
                                className="w-full h-12 bg-gradient-to-r from-[#51A6CB] via-[#BF40A3] to-[#802D9C] hover:opacity-95 text-white font-bold text-base shadow-lg shadow-purple-500/20 disabled:opacity-50"
                            >
                                {paying ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" /> Processing Order...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Pay {quote?.tax?.totalPaise ? formatPaise(quote.tax.totalPaise) : ''}
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                )}
                            </Button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubscriptionCheckoutModal;

