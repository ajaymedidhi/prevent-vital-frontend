import { Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';
import FadeInSection from './FadeInSection';

const EverydayPrevention = () => {
    return (
        <section className="section-padding bg-section-alt/30 overflow-hidden" aria-labelledby="everyday-prevention-heading">
            <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image collage */}
                    <FadeInSection delay={0.1} className="order-1 lg:order-1">
                        <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
                            {/* Top wide image (Family) — 3:2 to match the source photo, so no one gets cropped out */}
                            <div
                                className="w-full aspect-[3/2] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-4 border-card relative mb-3 md:mb-4"
                                style={{ boxShadow: 'var(--shadow-lg)' }}
                            >
                                <img
                                    src="/images/wellness.jpeg"
                                    alt="Wellness and everyday prevention"
                                    loading="lazy"
                                    className="w-full h-full object-cover object-top transition-transform duration-[2000ms] hover:scale-105"
                                />
                            </div>

                            {/* Bottom side-by-side images (Fruits & Nutrition) */}
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div
                                    className="aspect-square rounded-[1.25rem] md:rounded-[1.75rem] overflow-hidden border-4 border-card relative"
                                    style={{ boxShadow: 'var(--shadow-md)' }}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=80"
                                        alt="Fresh citrus fruits, rich in vitamins"
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                                    />
                                </div>
                                <div
                                    className="aspect-square rounded-[1.25rem] md:rounded-[1.75rem] overflow-hidden border-4 border-card relative"
                                    style={{ boxShadow: 'var(--shadow-md)' }}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80"
                                        alt="Colorful nutritious salad bowl with avocado and vegetables"
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </FadeInSection>

                    {/* Copy */}
                    <FadeInSection delay={0.2} className="order-2 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/8 border border-accent/15 rounded-full mb-4">
                            <Leaf size={12} className="text-accent" />
                            <span className="text-[10px] md:text-[11px] font-bold text-accent uppercase tracking-wider">Everyday Prevention</span>
                        </div>
                        <h2 id="everyday-prevention-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight leading-snug">
                            Prevention That Fits{' '}
                            <span className="gradient-text-soft">Real Life</span>
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-lg">
                            An extra serving of fruit, a shared family walk, a home-cooked dinner instead of takeout—small, sustainable choices move your CVITAL score more than any single test. Your plan is built around the life you already have.
                        </p>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mt-4 mb-2 tracking-tight">
                            Know Your Risk.<br className="hidden sm:block" />
                            <span className="gradient-text-soft">Take Control of Your Health.</span>
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 md:mb-8 max-w-lg">
                            Personalized prevention built around your health, lifestyle and goals.
                        </p>
                        <Link
                            to="/disease-prevention-programs"
                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-[13px] font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                            style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-sm)' }}
                        >
                            See What Fits Your Day
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </FadeInSection>
                </div>
            </div>
        </section>
    );
};

export default EverydayPrevention;
