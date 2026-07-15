
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface PartnershipHeroProps {
    className?: string;
}

const PartnershipHero = ({ className = '' }: PartnershipHeroProps) => {
    return (
        <section
            className={`relative w-full overflow-hidden ${className}`}
            style={{ paddingTop: 'clamp(2.5rem, 1.8rem + 2.5vw, 4rem)', paddingBottom: 'clamp(2rem, 1.5rem + 2vw, 3rem)' }}
            aria-labelledby="partnership-heading"
        >
            {/* Same bg layers as homepage hero */}
            <div className="absolute inset-0 healthcare-mesh" />
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `
                        linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                        linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, hsl(var(--primary) / 0.08) 0%, transparent 70%)' }}
            />

            <div className="container-wide relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4 max-w-4xl mx-auto"
                >
                    {/* Overline badge — matches homepage style */}
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-border rounded-full shadow-xs">
                            <Sparkles size={13} className="text-accent" />
                            <span className="text-xs font-semibold text-primary tracking-wide">
                                Partnership Ecosystem
                            </span>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1
                        id="partnership-heading"
                        className="font-semibold leading-[1.15] tracking-tight text-foreground text-balance mx-auto"
                        style={{ fontSize: 'var(--fz-h1-sm)' }}
                    >
                        Build the Future of{' '}
                        <span className="gradient-text-soft">Preventive Healthcare</span>{' '}
                        Together
                    </h1>

                    {/* Description */}
                    <p
                        className="text-muted-foreground leading-relaxed mx-auto"
                        style={{ fontSize: 'var(--fz-base)', maxWidth: '52ch' }}
                    >
                        Join India's pioneering integrated wellness-technology platform. Partner with PreventVital to transform healthcare delivery through AI-powered prevention.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <button
                            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                            style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-md)' }}
                        >
                            Become a Partner
                            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        <button className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-foreground bg-card border border-border hover:bg-muted transition-all duration-300">
                            View API Docs
                        </button>
                    </div>
                </motion.div>

                {/* Stats row — matches homepage hero pattern */}
                {/*
                // Temporarily hidden as per client request.
                // Metrics will be updated and re-enabled once official numbers are finalized.
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-14 pt-10 border-t border-border/50 max-w-2xl mx-auto lg:max-w-none">
                    {[
                        { value: '500+', label: 'Healthcare Partners' },
                        { value: '50+',  label: 'Device Integrations' },
                        { value: '99.9%', label: 'Uptime SLA' },
                        { value: '24/7', label: 'Technical Support' },
                    ].map((stat) => (
                        <div key={stat.label} className="space-y-0.5 text-center lg:text-left">
                            <p className="font-bold text-foreground leading-none" style={{ fontSize: 'var(--fz-3xl)' }}>
                                {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>
                */}
            </div>
        </section>
    );
};

export default PartnershipHero;
