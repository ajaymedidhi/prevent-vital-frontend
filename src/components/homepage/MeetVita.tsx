import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import FadeInSection from './FadeInSection';

const vitaMessage = "Your BP readings crept up slightly this week — nothing alarming. Want a 10-minute wind-down routine before bed?";

const MeetVita = () => {
    return (
        <section className="section-padding bg-background overflow-hidden" aria-labelledby="meet-vita-heading">
            <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Copy */}
                    <FadeInSection>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-border rounded-full mb-4 shadow-xs">
                            <Sparkles size={12} className="text-accent" />
                            <span className="text-[10px] md:text-[11px] font-semibold text-brand-700 tracking-wider uppercase">Meet VITA</span>
                        </div>
                        <h2 id="meet-vita-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight leading-snug">
                            Your AI Wellness Companion,{' '}
                            <span className="gradient-text-soft">Always in Your Corner</span>
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5 md:mb-6 max-w-xl line-clamp-2 md:line-clamp-none">
                            VITA knows your CVITAL score and risk factors. When you ask a question, you're picking up a conversation that understands your health story.
                        </p>
                        <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                            {[
                                'Explains your score and what moves it, in plain language',
                                'Nudges you gently—a breathing exercise, a walk, an earlier bedtime',
                                'Available whenever you need it, without waiting for an appointment',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    </div>
                                    <span className="text-xs md:text-[13px] text-foreground/80 leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                to="/ai-health-assessment"
                                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-[13px] font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                                style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-sm)' }}
                            >
                                Get My Score, Meet VITA
                                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] text-muted-foreground">
                                <ShieldCheck size={12} className="text-muted-foreground/70 flex-shrink-0" />
                                <span>A companion to your care team, never a replacement for it</span>
                            </div>
                        </div>
                    </FadeInSection>

                    {/* Rich Collage with floating VITA insight card overlay */}
                    <FadeInSection delay={0.15}>
                        <div className="relative w-full max-w-lg mx-auto lg:max-w-none h-[450px] md:h-[550px] flex gap-3 md:gap-4">
                            {/* Ambient glow */}
                            <div
                                className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] opacity-30"
                                style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)' }}
                            />

                            {/* Left tall image (Family / Lifestyle) */}
                            <div className="w-[55%] h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-4 border-card relative transform -translate-y-4" style={{ boxShadow: 'var(--shadow-lg)' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=800&q=80"
                                    alt="Happy family enjoying time together outdoors"
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>

                            {/* Right side stacked images */}
                            <div className="w-[45%] flex flex-col gap-3 md:gap-4 pt-6 md:pt-10">
                                {/* Top right (Nutrition) */}
                                <div className="h-[45%] rounded-[1.25rem] md:rounded-[1.75rem] overflow-hidden border-4 border-card relative" style={{ boxShadow: 'var(--shadow-md)' }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80"
                                        alt="Assortment of fresh fruits"
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                                    />
                                </div>
                                {/* Bottom right (Active / Lifestyle) */}
                                <div className="flex-1 rounded-[1.25rem] md:rounded-[1.75rem] overflow-hidden border-4 border-card relative" style={{ boxShadow: 'var(--shadow-md)' }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80"
                                        alt="Person practicing yoga outdoors"
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Floating VITA message card */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:-left-12 lg:translate-x-0 w-[90%] sm:w-80 bg-white/97 backdrop-blur-md rounded-[1.25rem] p-4 z-20"
                                style={{ boxShadow: 'var(--shadow-xl)' }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-800 to-wellness-600 flex items-center justify-center flex-shrink-0">
                                        <MessageCircle size={10} className="text-white" />
                                    </div>
                                    <p className="text-[11px] font-bold text-foreground">VITA</p>
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-auto" />
                                    <span className="text-[9px] font-semibold text-emerald-700">Online</span>
                                </div>
                                <p className="text-[11px] md:text-xs text-foreground/80 leading-relaxed">
                                    {vitaMessage}
                                </p>
                            </motion.div>
                        </div>
                    </FadeInSection>
                </div>
            </div>
        </section>
    );
};

export default MeetVita;
