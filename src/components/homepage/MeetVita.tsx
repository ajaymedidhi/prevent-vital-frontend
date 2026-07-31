import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import FadeInSection from './FadeInSection';

const vitaMessage = "Your BP readings crept up slightly this week — nothing alarming. Want a 10-minute wind-down routine before bed?";

const MeetVita = () => {
    return (
        <section className="section-padding bg-background overflow-hidden" aria-labelledby="meet-vita-heading">
            <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-14 items-center">
                    {/* Copy */}
                    <FadeInSection>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-border rounded-full mb-5 shadow-xs">
                            <Sparkles size={13} className="text-accent" />
                            <span className="text-xs font-semibold text-primary tracking-wide">Meet VITA</span>
                        </div>
                        <h2 id="meet-vita-heading" className="text-fluid-4xl font-bold text-foreground mb-5 tracking-tight leading-tight">
                            Your AI Wellness Companion,{' '}
                            <span className="gradient-text-soft">Always in Your Corner</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
                            VITA knows your latest CVITAL score and risk factors, so when you ask a question, you're not
                            starting from scratch — you're picking up a conversation that already understands your health story.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                'Explains your score and what actually moved it, in plain language',
                                'Nudges you gently — a breathing exercise, a walk, an earlier bedtime',
                                'Available whenever you need it, without waiting for an appointment',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    </div>
                                    <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                to="/ai-health-assessment"
                                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                                style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-md)' }}
                            >
                                Get My Score, Meet VITA
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <ShieldCheck size={14} className="text-muted-foreground/70" />
                                <span>A companion to your care team, never a replacement for it</span>
                            </div>
                        </div>
                    </FadeInSection>

                    {/* Real photo with floating VITA insight card overlay */}
                    <FadeInSection delay={0.15}>
                        <div className="relative flex justify-center lg:justify-end">
                            <div
                                className="relative rounded-3xl overflow-hidden border-4 border-card w-full max-w-sm aspect-[4/5]"
                                style={{ boxShadow: 'var(--shadow-xl)' }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1614366483613-442f38491bf5?auto=format&fit=crop&w=700&q=80"
                                    alt="Woman relaxing on her couch at home, checking her phone"
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                                {/* Floating VITA message card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute bottom-5 left-5 right-5 bg-white/97 backdrop-blur-md rounded-2xl p-4"
                                    style={{ boxShadow: 'var(--shadow-md)' }}
                                >
                                    <div className="flex items-center gap-2 mb-2.5">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-800 to-wellness-600 flex items-center justify-center flex-shrink-0">
                                            <MessageCircle size={13} className="text-white" />
                                        </div>
                                        <p className="text-xs font-bold text-foreground">VITA</p>
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-auto" />
                                        <span className="text-[10px] font-semibold text-emerald-700">Online</span>
                                    </div>
                                    <p className="text-xs text-foreground/80 leading-relaxed">
                                        {vitaMessage}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Ambient glow */}
                            <div
                                className="absolute -z-10 w-72 h-72 rounded-full blur-[90px] opacity-40"
                                style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)' }}
                            />
                        </div>
                    </FadeInSection>
                </div>
            </div>
        </section>
    );
};

export default MeetVita;
