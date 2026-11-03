import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PLANS, Plan } from '@/constants/plans';
import SubscriptionCheckoutModal from '@/features/subscription/SubscriptionCheckoutModal';
import { 
    Check, 
    Flame, 
    CheckCircle2, 
    ArrowLeft, 
    MessageSquare, 
    Building2, 
    Leaf, 
    User as UserIcon, 
    Users, 
    ArrowUpCircle,
    Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

export const SubscriptionPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // Current user subscription
    let currentPlan = (user as any)?.subscription?.plan || user?.subscriptionPlan || 'free';
    if (currentPlan.toLowerCase() === 'basic') currentPlan = 'free';

    const isCorporate = user?.customerType === 'corporate';
    const corporateName = (user as any)?.corporateSubscription?.name || 'your organisation';

    const handleSelectPlan = (plan: Plan) => {
        if (plan.id === currentPlan || plan.annualPrice === 0) return;
        if (isCorporate) return;

        if (!isAuthenticated) {
            navigate(`/login?redirect=/subscription`);
            return;
        }

        setSelectedPlanId(plan.id);
        setIsCheckoutOpen(true);
    };

    const getPlanIcon = (id: string, color: string) => {
        switch (id) {
            case 'free':
                return <Leaf className="w-6 h-6" style={{ color }} />;
            case 'pro':
                return <UserIcon className="w-6 h-6" style={{ color }} />;
            case 'family':
                return <Users className="w-6 h-6" style={{ color }} />;
            default:
                return <Shield className="w-6 h-6" style={{ color }} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-16 font-sans">
            <Helmet>
                <title>Choose Your Plan | PreventVital</title>
                <meta name="description" content="Unlock your full health potential with PreventVital subscription plans." />
            </Helmet>

            {/* Header Banner - Matching Mobile's Brand Gradient */}
            <div className="bg-gradient-to-r from-[#51A6CB] via-[#BF40A3] to-[#802D9C] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 relative shadow-lg">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-all text-white"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Choose Your Plan</h1>
                            <p className="text-sm sm:text-base text-cyan-100 font-medium">Unlock your full health potential</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 space-y-8">
                {/* Corporate Banner */}
                {isCorporate && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <p className="text-sm text-emerald-900 leading-snug">
                            Your account is managed by <span className="font-bold">{corporateName}</span>. Contact your organization administrator for subscription changes.
                        </p>
                    </div>
                )}

                {/* Plan Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {PLANS.map((plan) => {
                        const isCurrentPlan = plan.id === currentPlan;
                        const isPopular = plan.popular && !isCurrentPlan;

                        return (
                            <div
                                key={plan.id}
                                className={`bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-300 border ${
                                    isPopular
                                        ? 'border-amber-400 shadow-xl shadow-amber-500/10 md:-translate-y-2'
                                        : isCurrentPlan
                                        ? 'border-emerald-300 shadow-lg'
                                        : 'border-slate-200/80 shadow-md hover:shadow-lg'
                                }`}
                            >
                                {/* Popular Badge */}
                                {isPopular && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                                        <Flame className="w-3.5 h-3.5 fill-white" />
                                        <span>Most Popular</span>
                                    </div>
                                )}

                                {/* Current Plan Badge */}
                                {isCurrentPlan && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span>Current Plan</span>
                                    </div>
                                )}

                                <div>
                                    {/* Icon & Plan Name */}
                                    <div className="flex items-center gap-3.5 mb-5">
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner"
                                            style={{ backgroundColor: plan.accentBg }}
                                        >
                                            {getPlanIcon(plan.id, plan.color)}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold" style={{ color: plan.color }}>
                                                {plan.name}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Price Details */}
                                    <div className="mb-6">
                                        {!!plan.listPrice && (
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-semibold text-slate-400 line-through">
                                                    ₹{plan.listPrice.toLocaleString('en-IN')}
                                                </span>
                                                <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                                                    Launch offer
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                                                ₹{plan.annualPrice}
                                            </span>
                                            {plan.annualPrice > 0 && (
                                                <span className="text-sm font-semibold text-slate-500">/yr</span>
                                            )}
                                        </div>
                                        {plan.annualPrice > 0 && (
                                            <div className="mt-1 space-y-0.5">
                                                <p className="text-xs font-semibold text-emerald-600">Includes 1 Month Free</p>
                                                <p className="text-[11px] text-slate-500">
                                                    {plan.gstExtra ? '+ 18% GST' : '(Includes GST)'}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="h-px bg-slate-100 w-full mb-6" />

                                    {/* Features List */}
                                    <div className="space-y-3 mb-8">
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div
                                                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                                    style={{ backgroundColor: plan.accentBg }}
                                                >
                                                    <Check className="w-3 h-3 stroke-[3]" style={{ color: plan.color }} />
                                                </div>
                                                <span className="text-xs sm:text-sm text-slate-700 leading-snug font-medium">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Action Button */}
                                <div>
                                    {isCurrentPlan ? (
                                        <div className="w-full h-11 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-2 text-emerald-700 font-bold text-sm">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>Your Current Plan</span>
                                        </div>
                                    ) : isCorporate ? (
                                        <div className="w-full h-11 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-500 font-semibold text-sm">
                                            <Building2 className="w-4 h-4" />
                                            <span>Managed by Organisation</span>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() => handleSelectPlan(plan)}
                                            style={{
                                                backgroundColor: plan.buttonColor || '#51A6CB',
                                            }}
                                            className="w-full h-11 hover:opacity-90 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                                        >
                                            <ArrowUpCircle className="w-4 h-4" />
                                            <span>{plan.buttonText}</span>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Need Help / Contact */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#51A6CB] flex items-center justify-center shrink-0">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-900">Need help choosing a plan?</h4>
                            <p className="text-xs text-slate-500">Our preventive health specialists are available to answer any questions.</p>
                        </div>
                    </div>
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#51A6CB] to-[#BF40A3] hover:opacity-95 shadow-sm whitespace-nowrap"
                    >
                        Chat with us
                    </Link>
                </div>

                {/* Legal & Terms */}
                <div className="text-center pt-2 pb-6">
                    <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
                        By subscribing, you agree to our{' '}
                        <Link to="/terms-and-conditions" className="font-semibold text-slate-700 underline hover:text-primary">
                            Terms of Use (EULA)
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy-policy" className="font-semibold text-slate-700 underline hover:text-primary">
                            Privacy Policy
                        </Link>
                        . Subscriptions are billed annually.
                    </p>
                </div>
            </div>

            {/* Checkout Dialog Modal */}
            {selectedPlanId && (
                <SubscriptionCheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => {
                        setIsCheckoutOpen(false);
                        setSelectedPlanId(null);
                    }}
                    planId={selectedPlanId}
                />
            )}
        </div>
    );
};

export default SubscriptionPage;

