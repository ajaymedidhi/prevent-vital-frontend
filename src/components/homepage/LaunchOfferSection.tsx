import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FadeInSection from './FadeInSection';

export const LaunchOfferSection: React.FC = () => {
    const navigate = useNavigate();

    const handleSubscribe = () => {
        navigate('/account/dashboard');
    };

    return (
        <section className="section-padding bg-section-alt/40 relative overflow-hidden" aria-labelledby="launch-offer-heading">
            {/* Subtle radial ambient dots matching the homepage design language */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1.5px 1.5px, currentColor 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                }}
            />

            <div className="container-wide relative z-10 max-w-5xl mx-auto">
                <FadeInSection className="text-center space-y-3 mb-10 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-border rounded-full mb-2 shadow-xs">
                        <Sparkles size={12} className="text-accent" />
                        <span className="text-[10px] md:text-[11px] font-semibold text-brand-700 tracking-wider uppercase">
                            Exclusive Launch Offer
                        </span>
                    </div>

                    <h2
                        id="launch-offer-heading"
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-snug"
                    >
                        Start Your Preventive Journey Today
                    </h2>

                    <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        Get continuous cardiovascular risk intelligence, AI assessments, and connected device tracking at an unbeatable launch price.
                    </p>
                </FadeInSection>

                {/* Offer Card Container */}
                <FadeInSection delay={0.15}>
                    <div
                        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 text-white border border-white/20 transition-all duration-300"
                        style={{
                            background: 'var(--gradient-health)',
                            boxShadow: '0 20px 50px -15px rgba(81, 166, 203, 0.35)',
                        }}
                    >
                        {/* Decorative background glows */}
                        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Left: Value Proposition */}
                            <div className="lg:col-span-7 space-y-4">
                                <div className="inline-flex items-center gap-1.5 bg-amber-400/25 border border-amber-300/40 text-amber-200 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                                    <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                                    <span>LAUNCH OFFER • SAVE ₹4,000 / YR</span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                        Upgrade to Individual
                                    </h3>
                                    <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-lg">
                                        Designed for proactive individuals who want to track vascular age, catch emerging risks early, and stay ahead of chronic disease.
                                    </p>
                                </div>

                                <div className="space-y-2.5 pt-1">
                                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/95">
                                        <div className="w-5 h-5 rounded-full bg-emerald-400/25 border border-emerald-400/40 flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                                        </div>
                                        <span>Unlimited AI VITAL assessments</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/95">
                                        <div className="w-5 h-5 rounded-full bg-emerald-400/25 border border-emerald-400/40 flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                                        </div>
                                        <span>Wearable sync & longitudinal risk</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/95">
                                        <div className="w-5 h-5 rounded-full bg-emerald-400/25 border border-emerald-400/40 flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                                        </div>
                                        <span>Includes 1 month free</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Pricing Box & Action */}
                            <div className="lg:col-span-5 bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex flex-col justify-between gap-5 shadow-lg">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <span className="text-[11px] uppercase tracking-wider text-white/70 font-bold">
                                            Annual Subscription
                                        </span>
                                        <span className="text-xs text-white/60 line-through font-semibold">
                                            ₹4,999/yr
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl sm:text-4xl font-extrabold text-amber-300">
                                            ₹999
                                        </span>
                                        <span className="text-xs font-semibold text-white/80">/yr + 18% GST</span>
                                    </div>
                                    <p className="text-[11px] text-emerald-300 font-medium mt-1">
                                        Flat ₹4,000 instant launch discount applied
                                    </p>
                                </div>

                                <div className="space-y-2.5">
                                    <Button
                                        onClick={handleSubscribe}
                                        className="w-full h-11 bg-white hover:bg-slate-50 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                                    >
                                        <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                                        <span>Subscribe · ₹999</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() => navigate('/subscription')}
                                        className="w-full h-10 text-white hover:text-white bg-transparent hover:bg-white/15 border-white/25 rounded-xl text-xs font-semibold"
                                    >
                                        View Plans
                                    </Button>
                                </div>

                                <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-white/75 pt-2 border-t border-white/10">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                                    <span>Razorpay Secure · Instant GST Invoice</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </section>
    );
};

export default LaunchOfferSection;
