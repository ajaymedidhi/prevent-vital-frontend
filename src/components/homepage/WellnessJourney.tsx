import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardList, HeartPulse, Sparkles, LineChart, ArrowRight } from 'lucide-react';
import FadeInSection from './FadeInSection';

const steps = [
    {
        icon: ClipboardList,
        title: 'Tell Us About You',
        time: '5 minutes',
        description:
            'A 9-part questionnaire covering vitals, lipids, glycaemic health, family history, and lifestyle — no lab visit required to get started.',
    },
    {
        icon: HeartPulse,
        title: 'Meet Your CVITAL Score',
        time: 'Instant',
        description:
            'Your 0–100 score, plus your 10-year ASCVD risk and vascular age — the same clinical outputs your dashboard tracks over time.',
    },
    {
        icon: Sparkles,
        title: 'Get a Plan Matched to Your Score',
        time: 'Ongoing',
        description:
            "Higher risk opens a cardiac program and consultation; moderate risk gets targeted lifestyle changes; lower risk gets a wearable nudge toward Excellent.",
    },
    {
        icon: LineChart,
        title: 'Watch It Change',
        time: 'Every 3 months',
        description:
            'Connect a wearable to keep your score current day to day, and reassess quarterly to confirm you\'re moving the right direction.',
    },
];

const WellnessJourney = () => {
    return (
        <section className="section-padding bg-background overflow-hidden" aria-labelledby="wellness-journey-heading">
            <div className="container-wide">
                <div className="flex flex-col lg:flex-row gap-14 items-center">
                    {/* Steps */}
                    <div className="w-full lg:w-7/12">
                        <FadeInSection>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/8 border border-accent/15 rounded-full mb-5">
                                <span className="text-xs font-bold text-accent uppercase tracking-widest">How It Works</span>
                            </div>
                            <h2 id="wellness-journey-heading" className="text-fluid-4xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                                Your Wellness Journey,{' '}
                                <span className="gradient-text-soft">One Honest Step at a Time</span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
                                No overwhelming dashboards on day one. Just a clear starting point, and a plan that grows with you.
                            </p>
                        </FadeInSection>

                        <div className="relative">
                            {/* Connecting line */}
                            <div className="absolute left-6 top-6 bottom-6 w-px bg-border hidden sm:block" aria-hidden="true" />

                            <div className="space-y-3">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    return (
                                        <motion.div
                                            key={step.title}
                                            initial={{ opacity: 0, x: -16 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: '-60px' }}
                                            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            className="relative flex items-start gap-5 p-5 rounded-2xl hover:bg-muted/50 transition-colors duration-300"
                                        >
                                            <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-primary/15 flex items-center justify-center shadow-sm">
                                                <Icon size={20} className="text-primary" />
                                            </div>
                                            <div className="pt-1.5">
                                                <div className="flex items-center gap-2.5 mb-1">
                                                    <h3 className="text-base font-bold text-foreground">
                                                        {index + 1}. {step.title}
                                                    </h3>
                                                    <span className="text-[10px] font-bold text-accent uppercase tracking-wide px-2 py-0.5 bg-accent/8 rounded-full">
                                                        {step.time}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        <FadeInSection delay={0.2} className="mt-8 ml-5">
                            <Link
                                to="/ai-health-assessment"
                                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                                style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-md)' }}
                            >
                                Start With Step One
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </FadeInSection>
                    </div>

                    {/* Supporting photo */}
                    <FadeInSection delay={0.15} className="w-full lg:w-5/12">
                        <div className="relative rounded-3xl overflow-hidden border-4 border-card" style={{ boxShadow: 'var(--shadow-lg)' }}>
                            <img
                                src="https://images.unsplash.com/photo-1635770618588-06bd8d5d73b9?auto=format&fit=crop&w=900&q=80"
                                alt="Father joyfully lifting his toddler into the air outdoors"
                                loading="lazy"
                                className="w-full h-full object-cover aspect-[4/5]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3" style={{ boxShadow: 'var(--shadow-md)' }}>
                                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                    <HeartPulse size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-foreground leading-tight">Built for real life</p>
                                    <p className="text-[11px] text-muted-foreground mt-0.5">Because prevention has to fit around the people you love, not the other way round.</p>
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </div>
        </section>
    );
};

export default WellnessJourney;
