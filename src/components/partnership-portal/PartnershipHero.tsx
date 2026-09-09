
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface PartnershipHeroProps {
    className?: string;
}

const PartnershipHero = ({ className = '' }: PartnershipHeroProps) => {
    return (
        <section
            className={`relative w-full overflow-hidden ${className}`}
            style={{ minHeight: 'clamp(440px, 58vh, 640px)' }}
            aria-labelledby="partnership-heading"
        >
            {/* Human-centric photography, matching the homepage/how-it-works hero treatment */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2069&q=80"
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 45%' }}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/45" />
            <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

            <div
                className="container-wide relative z-10 text-center flex flex-col justify-center h-full"
                style={{ minHeight: 'clamp(440px, 58vh, 640px)', paddingTop: 'clamp(3rem, 2.5rem + 2vw, 4.5rem)', paddingBottom: 'clamp(2.5rem, 2rem + 2vw, 3.5rem)' }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4 max-w-4xl mx-auto"
                >
                    {/* Overline badge */}
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                            <Sparkles size={13} className="text-white" />
                            <span className="text-xs font-semibold text-white tracking-wide">
                                Partnership Ecosystem
                            </span>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1
                        id="partnership-heading"
                        className="font-semibold leading-[1.15] tracking-tight text-white text-balance mx-auto"
                        style={{ fontSize: 'var(--fz-h1-sm)' }}
                    >
                        Build the Future of{' '}
                        <span style={{ color: '#5eead4' }}>Preventive Healthcare</span>{' '}
                        Together
                    </h1>

                    {/* Description */}
                    <p
                        className="text-white/80 leading-relaxed mx-auto"
                        style={{ fontSize: 'var(--fz-base)', maxWidth: '52ch' }}
                    >
                        Join India's pioneering integrated wellness-technology platform. Partner with PreventVital to transform healthcare delivery through AI-powered prevention.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <button
                            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-900 bg-white transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                            style={{ boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)' }}
                        >
                            Become a Partner
                            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        <button className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all duration-300">
                            View API Docs
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PartnershipHero;
