import React, { useState } from 'react';
import { PLANS, Plan } from '@/constants/plans';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SubscriptionCheckoutModal from './SubscriptionCheckoutModal';
import { Check, Flame, CheckCircle2, Building2, Leaf, User as UserIcon, Users, ArrowUpCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

const PricingTable = () => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    let currentPlan = (user as any)?.subscription?.plan || user?.subscriptionPlan || 'free';
    if (currentPlan.toLowerCase() === 'basic') currentPlan = 'free';

    const isCorporate = user?.customerType === 'corporate';

    const handleSelectPlan = (plan: Plan) => {
        if (plan.id === currentPlan || plan.annualPrice === 0) return;
        if (isCorporate) return;

        if (!isAuthenticated) {
            navigate('/login?redirect=/subscription');
            return;
        }

        setSelectedPlanId(plan.id);
        setIsCheckoutOpen(true);
    };

    const getPlanIcon = (id: string, color: string) => {
        switch (id) {
            case 'free':
                return <Leaf className="w-5 h-5" style={{ color }} />;
            case 'pro':
                return <UserIcon className="w-5 h-5" style={{ color }} />;
            case 'family':
                return <Users className="w-5 h-5" style={{ color }} />;
            default:
                return <Check className="w-5 h-5" style={{ color }} />;
        }
    };

    return (
        <div className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {PLANS.map((plan) => {
                    const isCurrentPlan = plan.id === currentPlan;
                    const isPopular = plan.popular && !isCurrentPlan;

                    return (
                        <div
                            key={plan.id}
                            className={`bg-white rounded-3xl p-6 flex flex-col justify-between relative transition-all duration-300 border ${
                                isPopular
                                    ? 'border-amber-400 shadow-xl shadow-amber-500/10 md:-translate-y-1'
                                    : isCurrentPlan
                                    ? 'border-emerald-300 shadow-md'
                                    : 'border-slate-200 shadow-sm hover:shadow-md'
                            }`}
                        >
                            {/* Popular Badge */}
                            {isPopular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                    <Flame className="w-3 h-3 fill-white" />
                                    <span>Most Popular</span>
                                </div>
                            )}

                            {/* Current Plan Badge */}
                            {isCurrentPlan && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Current Plan</span>
                                </div>
                            )}

                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner"
                                        style={{ backgroundColor: plan.accentBg }}
                                    >
                                        {getPlanIcon(plan.id, plan.color)}
                                    </div>
                                    <h3 className="text-xl font-bold" style={{ color: plan.color }}>
                                        {plan.name}
                                    </h3>
                                </div>

                                <div className="mb-5">
                                    {!!plan.listPrice && (
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-semibold text-slate-400 line-through">
                                                ₹{plan.listPrice.toLocaleString('en-IN')}
                                            </span>
                                            <Badge className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0 border-0 font-bold">
                                                Launch offer
                                            </Badge>
                                        </div>
                                    )}
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-extrabold text-slate-900">
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

                                <div className="h-px bg-slate-100 w-full mb-5" />

                                <div className="space-y-2.5 mb-6">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5">
                                            <div
                                                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                                style={{ backgroundColor: plan.accentBg }}
                                            >
                                                <Check className="w-2.5 h-2.5 stroke-[3]" style={{ color: plan.color }} />
                                            </div>
                                            <span className="text-xs text-slate-700 leading-snug font-medium">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                {isCurrentPlan ? (
                                    <div className="w-full h-10 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5 text-emerald-700 font-bold text-xs">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span>Your Current Plan</span>
                                    </div>
                                ) : isCorporate ? (
                                    <div className="w-full h-10 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 text-slate-500 font-semibold text-xs">
                                        <Building2 className="w-3.5 h-3.5" />
                                        <span>Managed by Organisation</span>
                                    </div>
                                ) : (
                                    <Button
                                        onClick={() => handleSelectPlan(plan)}
                                        style={{ backgroundColor: plan.buttonColor || '#51A6CB' }}
                                        className="w-full h-10 hover:opacity-90 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                                    >
                                        <ArrowUpCircle className="w-3.5 h-3.5" />
                                        <span>{plan.buttonText}</span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

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

export default PricingTable;
