import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { clearCart } from '@/store/shopSlice';
import { Lock, CreditCard, User, MapPin, Phone, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const CheckoutPage = () => {
    const { cart, total }           = useSelector((state: any) => state.shop);
    const { user, isAuthenticated } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
        fullName: '', phone: '', street: '', city: '', state: '', postalCode: '', country: 'India'
    });
    const [loading, setLoading] = useState(false);
    const [errors,  setErrors]  = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirect=checkout');
        } else if (user) {
            setShippingAddress(prev => ({ ...prev, fullName: user.name || '', phone: user.phone || '' }));
        }
    }, [isAuthenticated, user, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!shippingAddress.fullName.trim())   newErrors.fullName   = 'Full Name is required';
        if (!shippingAddress.phone.trim()) {
            newErrors.phone = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(shippingAddress.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Enter a valid 10-digit phone number';
        }
        if (!shippingAddress.street.trim())     newErrors.street     = 'Street Address is required';
        if (!shippingAddress.city.trim())       newErrors.city       = 'City is required';
        if (!shippingAddress.state.trim())      newErrors.state      = 'State is required';
        if (!shippingAddress.postalCode.trim()) newErrors.postalCode = 'Postal Code is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = async () => {
        if (!validateForm()) return;
        setLoading(true);
        try {
            const { data: createRes } = await axios.post('/api/payments/orders', {
                purchaseType: 'product',
                items: cart.map((item: any) => ({ productId: item._id, quantity: item.quantity })),
                shippingAddress
            }, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
            });

            const { internalOrderId, razorpayOrderId, amount, currency, keyId, prefill } = createRes.data;

            if (!razorpayOrderId) {
                alert("Order creation failed. Please try again.");
                setLoading(false);
                return;
            }

            const verifyAndFinish = async (payload: {
                razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string;
            }) => {
                const verifyRes = await axios.post('/api/payments/verify', { internalOrderId, ...payload }, {
                    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
                });

                if (verifyRes.data.data?.status === 'paid') {
                    dispatch(clearCart());
                    navigate(`/order-confirmation/${internalOrderId}`);
                } else {
                    alert('Payment verification failed');
                }
            };

            if (keyId === 'rzp_test_placeholder' || keyId === '') {
                await verifyAndFinish({
                    razorpay_order_id:   razorpayOrderId,
                    razorpay_payment_id: `pay_mock_${Date.now()}`,
                    razorpay_signature:  'bypass'
                });
                setLoading(false);
                return;
            }

            const options = {
                key: keyId,
                amount,
                currency,
                name: "PreventVital",
                description: "Medical Device Purchase",
                order_id: razorpayOrderId,
                handler: async (response: any) => {
                    try {
                        await verifyAndFinish({
                            razorpay_order_id:   response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature:  response.razorpay_signature
                        });
                    } catch {
                        alert("Payment verification failed");
                    } finally {
                        setLoading(false);
                    }
                },
                modal: { ondismiss: () => setLoading(false) },
                prefill: prefill ?? { name: user?.name, email: user?.email, contact: user?.phone },
                theme: { color: 'hsl(var(--primary))' }
            };

            // @ts-ignore
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (err: any) {
            console.error("Payment initiation failed", err);
            alert(err.response?.data?.message || "Payment initiation failed. Please try again.");
            setLoading(false);
        }
    };

    if (!isAuthenticated) return null;

    const inputCls = (hasError: boolean) =>
        `h-12 bg-background border rounded-xl transition-colors text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary ${hasError ? 'border-destructive' : 'border-border'}`;

    const steps = [
        { label: 'Cart',        done: true  },
        { label: 'Information', active: true },
        { label: 'Payment',     pending: true },
    ];

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container-wide max-w-6xl">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
                    <h1 className="font-extrabold text-foreground" style={{ fontSize: 'var(--fz-3xl)' }}>Secure Checkout</h1>
                    <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                        <Lock size={12} />
                        <span className="font-semibold">256-bit SSL Encrypted</span>
                    </div>
                </div>

                {/* Progress stepper */}
                <div className="mb-10 max-w-sm">
                    <div className="flex items-center justify-between relative z-10">
                        {steps.map((step, i) => (
                            <div key={step.label} className="flex flex-col items-center gap-2">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                                        step.done || step.active
                                            ? 'text-primary-foreground'
                                            : 'bg-card border-2 border-border text-muted-foreground'
                                    }`}
                                    style={step.done || step.active ? { background: 'hsl(var(--primary))' } : {}}
                                >
                                    {step.done ? <Check size={18} strokeWidth={3} /> : i + 1}
                                </div>
                                <span className={`text-xs font-semibold ${step.pending ? 'text-muted-foreground' : 'text-foreground'}`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                        <div className="absolute top-5 left-0 right-0 h-px bg-border -z-10">
                            <div className="h-full w-1/2" style={{ background: 'hsl(var(--primary))' }} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Form */}
                    <div className="lg:col-span-7 space-y-5">

                        {/* Contact info */}
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2.5 mb-6">
                                <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">1</span>
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3.5 text-muted-foreground" size={16} />
                                        <Input id="fullName" name="fullName" value={shippingAddress.fullName} onChange={handleInputChange}
                                            className={`pl-9 ${inputCls(!!errors.fullName)}`} placeholder="John Doe" />
                                    </div>
                                    {errors.fullName && <p className="text-destructive text-xs">{errors.fullName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3.5 text-muted-foreground" size={16} />
                                        <Input id="phone" name="phone" value={shippingAddress.phone} onChange={handleInputChange}
                                            className={`pl-9 ${inputCls(!!errors.phone)}`} placeholder="+91 99999 99999" />
                                    </div>
                                    {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Shipping address */}
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2.5 mb-6">
                                <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">2</span>
                                Shipping Address
                            </h2>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="street" className="text-sm font-medium text-foreground">Street Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3.5 text-muted-foreground" size={16} />
                                        <Input id="street" name="street" value={shippingAddress.street} onChange={handleInputChange}
                                            className={`pl-9 ${inputCls(!!errors.street)}`} placeholder="123 Wellness Blvd" />
                                    </div>
                                    {errors.street && <p className="text-destructive text-xs">{errors.street}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="city" className="text-sm font-medium text-foreground">City</Label>
                                        <Input id="city" name="city" value={shippingAddress.city} onChange={handleInputChange}
                                            className={inputCls(!!errors.city)} placeholder="Mumbai" />
                                        {errors.city && <p className="text-destructive text-xs">{errors.city}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state" className="text-sm font-medium text-foreground">State</Label>
                                        <Input id="state" name="state" value={shippingAddress.state} onChange={handleInputChange}
                                            className={inputCls(!!errors.state)} placeholder="Maharashtra" />
                                        {errors.state && <p className="text-destructive text-xs">{errors.state}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="postalCode" className="text-sm font-medium text-foreground">Pincode</Label>
                                        <Input id="postalCode" name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange}
                                            className={inputCls(!!errors.postalCode)} placeholder="400001" />
                                        {errors.postalCode && <p className="text-destructive text-xs">{errors.postalCode}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country" className="text-sm font-medium text-foreground">Country</Label>
                                        <Input id="country" name="country" value={shippingAddress.country} readOnly
                                            className="h-12 bg-muted border-border text-muted-foreground rounded-xl cursor-not-allowed" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 md:sticky md:top-24">
                            <h2 className="text-lg font-bold text-foreground mb-5">Order Summary</h2>

                            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                                {cart.map((item: any) => (
                                    <div key={item._id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-muted/30 rounded-lg overflow-hidden border border-border flex-shrink-0">
                                                <img src={item.images?.[0] || item.image || '/placeholder.png'} className="w-full h-full object-contain p-1" alt="" />
                                            </div>
                                            <div>
                                                <span className="font-semibold text-foreground text-sm line-clamp-1">{item.name}</span>
                                                <span className="text-muted-foreground text-xs block">Qty: {item.quantity}</span>
                                            </div>
                                        </div>
                                        <span className="font-bold text-foreground text-sm">₹{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-5" />

                            <div className="space-y-2.5 text-sm text-muted-foreground mb-5">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-foreground font-medium">₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-emerald-600 font-semibold">Free</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-muted/50 p-4 rounded-xl mb-6">
                                <span className="font-bold text-foreground">Total Amount</span>
                                <span className="text-2xl font-extrabold text-primary">₹{total.toLocaleString()}</span>
                            </div>

                            <button
                                className="w-full h-14 rounded-xl font-bold text-primary-foreground flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                                style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-md)' }}
                                onClick={handlePayment}
                                disabled={loading || cart.length === 0}
                            >
                                <CreditCard size={20} />
                                {loading ? 'Processing...' : 'Pay Now'}
                            </button>

                            <div className="flex justify-center items-center gap-1.5 mt-4 text-xs text-muted-foreground">
                                <Lock size={11} />
                                Payments processed securely via Razorpay
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
