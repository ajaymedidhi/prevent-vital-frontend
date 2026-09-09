import React, { useState } from 'react';
import { PLANS } from '@/constants/plans';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/AppIcon';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store';

const PricingTable = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    const [plans, setPlans] = useState(PLANS);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        const fetchPlans = async () => {
            try {
                // Using the public config endpoint
                const res = await axios.get('/api/public/config/pricing-plans');
                if (res.data?.data?.config?.value?.b2c) {
                    setPlans(res.data.data.config.value.b2c);
                }
            } catch (err) {
                console.error('Error fetching public pricing plans:', err);
                // Fallback to hardcoded PLANS if API fails
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const handleSubscribe = async (plan: any) => {
        try {
            // Check auth (assuming localStorage token or similar context check)
            const token = sessionStorage.getItem('token'); // Simplistic check, ideally use Auth Context
            if (!token) {
                toast({ title: "Login Required", description: "Please login to subscribe.", variant: "destructive" });
                navigate('/login');
                return;
            }

            if (plan.monthlyPrice === 0) {
                toast({ title: "Free Plan", description: "You are already on the free tier." });
                return;
            }

            const interval = isAnnual ? 'annual' : 'monthly';
            const { data: createRes } = await axios.post('/api/payments/orders', {
                purchaseType: 'subscription',
                planId: plan.id,
                interval
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { internalOrderId, razorpayOrderId, amount, currency, keyId, prefill, gstAmount } = createRes.data;

            if (!razorpayOrderId) {
                toast({ title: "Error", description: "Order creation failed. Please try again.", variant: "destructive" });
                return;
            }

            const verifyAndFinish = async (payload: {
                razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string;
            }) => {
                const verifyRes = await axios.post('/api/payments/verify', { internalOrderId, ...payload }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (verifyRes.data.data?.status === 'paid') {
                    toast({ title: "Subscription Active", description: `You are now on the ${plan.name} plan!` });
                    navigate('/account');
                } else {
                    toast({ title: "Verification Failed", description: "Payment verification failed.", variant: "destructive" });
                }
            };

            // Dev/mock mode: backend returns a placeholder key when Razorpay isn't configured
            if (keyId === 'rzp_test_placeholder' || keyId === '') {
                await verifyAndFinish({
                    razorpay_order_id: razorpayOrderId,
                    razorpay_payment_id: `pay_mock_${Date.now()}`,
                    razorpay_signature: 'bypass'
                });
                return;
            }

            const options = {
                key: keyId,
                amount,
                currency,
                order_id: razorpayOrderId,
                name: "PreventVital",
                description: `${plan.name} Subscription (${interval})${gstAmount != null ? ' incl. 18% GST' : ''}`,
                handler: async function (response: any) {
                    try {
                        await verifyAndFinish({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });
                    } catch (err) {
                        toast({ title: "Verification Failed", description: "Payment verification failed.", variant: "destructive" });
                    }
                },
                prefill: prefill ?? {},
                theme: { color: "#3399cc" }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.status === 401) {
                // Auto-logout on 401
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                toast({ title: "Session Expired", description: "Please login again to continue.", variant: "destructive" });
                navigate('/login');
                return;
            }
            toast({ title: "Error", description: err.message || "Failed to initiate subscription.", variant: "destructive" });
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="py-12">
            <div className="flex justify-center mb-8 gap-4 items-center">
                <span className={`text-sm ${!isAnnual ? 'font-bold' : ''}`}>Monthly</span>
                <button
                    onClick={() => setIsAnnual(!isAnnual)}
                    className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${isAnnual ? 'bg-primary' : ''}`}
                >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${isAnnual ? 'translate-x-7' : ''}`}></div>
                </button>
                <span className={`text-sm ${isAnnual ? 'font-bold' : ''}`}>Annual (Save ~17%)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.id} className={`relative flex flex-col ${plan.id === 'pro' ? 'border-primary border-2 shadow-xl scale-105 z-10' : ''}`}>
                        {(plan as any).isPopular && (
                            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                                <Badge className="bg-yellow-500 text-black px-3 py-1">Best Value</Badge>
                            </div>
                        )}
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                            <CardDescription className="text-3xl font-bold text-primary mt-2">
                                ₹{isAnnual ? plan.annualPrice : plan.monthlyPrice}
                                <span className="text-sm font-normal text-muted-foreground">/{isAnnual ? 'yr' : 'mo'}</span>
                            </CardDescription>
                            {(isAnnual ? plan.annualPrice : plan.monthlyPrice) > 0 && (
                                <p className="text-xs text-muted-foreground mt-1">+ 18% GST at checkout</p>
                            )}
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-3">
                                {plan.features.map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm">
                                        <Icon name="CheckCircle" className="text-green-500 w-4 h-4" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className={`w-full ${plan.id === 'pro' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black' : ''}`}
                                onClick={() => handleSubscribe(plan)}
                            >
                                {plan.monthlyPrice === 0 ? 'Current Plan' : 'Upgrade Now'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PricingTable;
