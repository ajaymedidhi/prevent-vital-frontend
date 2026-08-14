import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import FadeInSection from './FadeInSection';
import ProductShowcase from './ProductShowcase';

const steps = [
    {
        title: 'Tell Us About You',
        time: '5 minutes',
        description:
            'A quick questionnaire covering vitals, lifestyle, and family history. Keep your recent cholesterol test results handy.',
    },
    {
        title: 'Meet Your VITAL Score',
        time: 'Instant',
        description:
            'Get your 0–100 score, 10-year ASCVD risk, and vascular age—the core clinical metrics you\'ll track over time.',
    },
    {
        title: 'Get a Plan Matched to Your Score',
        time: 'Ongoing',
        description:
            "Personalized pathways based on your risk: from clinical cardiac programs to targeted lifestyle adjustments.",
    },
    {
        title: 'Watch It Change',
        time: 'Every 3 months',
        description:
            'Sync a wearable to monitor your daily progress, and retake the assessment quarterly to stay on the right track.',
    },
];

const WellnessJourney = () => {
    return (
        <section className="py-6 md:py-8 lg:py-8 bg-background overflow-hidden lg:min-h-[100dvh] lg:flex lg:items-center" aria-labelledby="wellness-journey-heading">
            <div className="container-wide">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
                    {/* Steps */}
                    <div className="w-full lg:w-1/2">
                        <FadeInSection>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-accent/8 border border-accent/15 rounded-full mb-2">
                                <span className="text-xs font-bold text-accent uppercase tracking-wider">How It Works</span>
                            </div>
                            <h2 id="wellness-journey-heading" className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-2 tracking-tight leading-snug">
                                Your Wellness Journey,{' '}
                                <span className="gradient-text-soft">One Honest Step at a Time</span>
                            </h2>
                            <p className="text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed mb-4">
                                No overwhelming dashboards on day one. Just a clear starting point, and a plan that grows with you.
                            </p>
                        </FadeInSection>

                        <div className="relative">
                            {/* Connecting line */}
                            <div className="absolute left-[20px] top-5 bottom-5 w-px bg-border/50 hidden sm:block" aria-hidden="true" />

                            <div className="space-y-1 md:space-y-2">
                                {steps.map((step, index) => {
                                    return (
                                        <motion.div
                                            key={step.title}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: '-40px' }}
                                            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                                            className="relative flex items-start gap-3 md:gap-4 p-1.5 md:p-2 rounded-2xl hover:bg-muted/40 transition-colors duration-200"
                                        >
                                            <div className="relative z-10 flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white border border-primary/20 flex items-center justify-center shadow-sm">
                                                <span className="text-base font-bold text-brand-700">{index + 1}</span>
                                            </div>
                                            <div className="pt-0.5">
                                                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                                    <h3 className="text-base font-bold text-foreground">
                                                        {step.title}
                                                    </h3>
                                                    <span className="text-[10px] font-semibold text-accent uppercase tracking-wider px-1.5 py-0.5 bg-accent/10 rounded-full">
                                                        {step.time}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-snug max-w-sm line-clamp-1">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        <FadeInSection delay={0.2} className="mt-4 ml-2 md:ml-3">
                            <Link
                                to="/ai-health-assessment"
                                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm md:text-base font-bold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                                style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-sm)' }}
                            >
                                Start With Step One
                                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </FadeInSection>
                    </div>

                    {/* Supporting Product Showcase */}
                    <FadeInSection delay={0.15} className="w-full lg:w-1/2">
                        <ProductShowcase />
                    </FadeInSection>
                </div>
            </div>
        </section>
    );
};

export default WellnessJourney;
