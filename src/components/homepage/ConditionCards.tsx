import { Link } from 'react-router-dom';
import { Beaker, Heart, Zap, Cloud, Sparkles, Scale, ArrowRight, Clock } from 'lucide-react';
import { conditionPrograms } from '@/constants/conditionPrograms';
import FadeInSection from './FadeInSection';
import AnimatedCounter from './AnimatedCounter';

const conditionIcons: Record<string, any> = {
    diabetes: Beaker,
    hypertension: Heart,
    cardiac: Zap,
    respiratory: Cloud,
    mental: Sparkles,
    weight: Scale,
};

const cardTones = [
    { accentClass: 'group-hover:border-primary/25', iconBg: 'bg-white/90 text-primary' },
    { accentClass: 'group-hover:border-accent/30', iconBg: 'bg-white/90 text-accent' },
];

const ConditionCards = () => {
    const conditions = conditionPrograms;

    return (
        <section className="section-padding bg-section-alt/30">
            <div className="container-wide">
                <FadeInSection className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/6 border border-primary/15 rounded-full mb-3 md:mb-4">
                        <span className="text-[10px] md:text-[11px] font-bold text-brand-700 uppercase tracking-widest">
                            <AnimatedCounter value={conditions.length} suffix=" Guided Programs" />
                        </span>
                    </div>
                    <h2 id="preventive-health-conditions" className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight leading-snug">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-800 to-wellness-600">
                            A Program for Where You Are Today
                        </span>
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed line-clamp-2 md:line-clamp-none mb-4">
                        Every risk is unique. Our programs are clinician-led, evidence-based, and paced for your real life.
                    </p>
                </FadeInSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {conditions.map((condition, index) => {
                        const IconComponent = conditionIcons[condition.id];
                        const { accentClass, iconBg } = cardTones[index % 2];
                        return (
                            <FadeInSection key={condition.id} delay={index * 0.06}>
                                <div
                                    className={`group bg-card rounded-[1.5rem] overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col ${accentClass}`}
                                    style={{ boxShadow: 'var(--shadow-md)' }}
                                >
                                    <div className="relative h-48 md:h-56 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10 group-hover:from-black/30 transition-all duration-300" />
                                        <img
                                            src={condition.image}
                                            alt={condition.alt}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                                        />
                                        <div className="absolute bottom-4 left-5 z-20">
                                            <div className={`w-12 h-12 ${iconBg} backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/40`}>
                                                <IconComponent size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8 flex flex-col flex-1">
                                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-brand-700 transition-colors duration-200">
                                            {condition.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-5 leading-relaxed line-clamp-2">
                                            {condition.description}
                                        </p>

                                        <div className="flex items-center gap-1.5 mb-2.5 md:mb-3 text-[11px] md:text-xs font-medium text-muted-foreground">
                                            <Clock size={12} />
                                            <span>{condition.duration} program</span>
                                        </div>

                                        <p className="text-xs text-muted-foreground mb-4 md:mb-5 leading-relaxed line-clamp-2 hidden md:block">
                                            {condition.outcomeFocus}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {condition.riskFactors.map((factor) => (
                                                <span
                                                    key={factor}
                                                    className="text-[9px] font-semibold px-2 py-1 bg-muted text-muted-foreground rounded-md border border-border/60 uppercase tracking-wide"
                                                >
                                                    {factor}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-border/60 flex items-center justify-end gap-3">
                                            <Link
                                                to={`/disease-prevention-programs/${condition.id}`}
                                                className="inline-flex items-center text-xs md:text-sm font-bold text-brand-700 hover:gap-2 gap-1.5 transition-all duration-200 flex-shrink-0"
                                            >
                                                View
                                                <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>
                        );
                    })}
                </div>

                <FadeInSection className="text-center mt-10 md:mt-12">
                    <Link
                        to="/disease-prevention-programs"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 hover:-translate-y-px transition-all duration-200"
                        style={{ boxShadow: 'var(--shadow-md)' }}
                    >
                        Explore All Programs
                        <ArrowRight size={16} />
                    </Link>
                </FadeInSection>
            </div>
        </section>
    );
};

export default ConditionCards;
