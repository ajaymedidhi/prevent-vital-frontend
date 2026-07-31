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

// Two-tone system (navy primary / teal accent), alternated by card position —
// replaces the old one-hue-per-condition rainbow badge treatment. Badge chip
// stays a consistent near-solid white so it reads cleanly over any photo;
// only the icon color alternates between the two brand tones.
const cardTones = [
    { accentClass: 'group-hover:border-primary/25', iconBg: 'bg-white/90 text-primary' },
    { accentClass: 'group-hover:border-accent/30', iconBg: 'bg-white/90 text-accent' },
];

const ConditionCards = () => {
    const conditions = conditionPrograms;

    return (
        <section className="section-padding bg-section-alt/30">
            <div className="container-wide">
                <FadeInSection className="text-center mb-8 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 md:px-3.5 md:py-1.5 bg-primary/6 border border-primary/15 rounded-full mb-3 md:mb-5">
                        <span className="text-[11px] md:text-xs font-bold text-primary uppercase tracking-widest">
                            <AnimatedCounter value={conditions.length} suffix=" Guided Programs" />
                        </span>
                    </div>
                    <h2 id="preventive-health-conditions" className="text-2xl md:text-[length:var(--fz-4xl)] font-bold text-foreground mb-2 md:mb-4 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-800 to-wellness-600">
                            A Program for Where You Are Today
                        </span>
                    </h2>
                    <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed line-clamp-2 md:line-clamp-none">
                        Every risk looks different up close. Each program below is led by a real clinician or coach,
                        grounded in clinical evidence, and paced for real life — not a generic checklist.
                    </p>
                </FadeInSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conditions.map((condition, index) => {
                        const IconComponent = conditionIcons[condition.id];
                        const { accentClass, iconBg } = cardTones[index % 2];
                        return (
                            <FadeInSection key={condition.id} delay={index * 0.06}>
                                <div
                                    className={`group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col ${accentClass}`}
                                    style={{ boxShadow: 'var(--shadow-xs)' }}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10 group-hover:from-black/30 transition-all duration-300" />
                                        <img
                                            src={condition.image}
                                            alt={condition.alt}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                                        />
                                        <div className="absolute bottom-4 left-4 z-20">
                                            <div className={`w-10 h-10 ${iconBg} backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md border border-white/30`}>
                                                <IconComponent size={20} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 md:p-7 flex flex-col flex-1">
                                        <h3 className="text-base md:text-lg font-bold text-foreground mb-1.5 md:mb-2 group-hover:text-primary transition-colors duration-200">
                                            {condition.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-muted-foreground mb-2.5 md:mb-3 leading-relaxed line-clamp-2">
                                            {condition.description}
                                        </p>

                                        <div className="flex items-center gap-1.5 mb-2.5 md:mb-3 text-xs font-medium text-muted-foreground">
                                            <Clock size={13} />
                                            <span>{condition.duration} program</span>
                                        </div>

                                        <p className="text-xs text-muted-foreground mb-4 md:mb-5 leading-relaxed line-clamp-2 hidden md:block">
                                            {condition.outcomeFocus}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {condition.riskFactors.map((factor) => (
                                                <span
                                                    key={factor}
                                                    className="text-[10px] font-semibold px-2 py-1 bg-muted text-muted-foreground rounded-md border border-border/60 uppercase tracking-wide"
                                                >
                                                    {factor}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-5 border-t border-border/60 flex items-center justify-end gap-3">
                                            {/*
                                            // Temporarily hidden — these are placeholder instructor names/photos,
                                            // not real people. Re-enable (and switch this row back to
                                            // justify-between) once real, credentialed instructors are assigned
                                            // per program.
                                            {condition.instructor && (
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <img
                                                        src={condition.instructor.photo}
                                                        alt={condition.instructor.name}
                                                        loading="lazy"
                                                        className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-bold text-foreground truncate">{condition.instructor.name}</p>
                                                        <p className="text-[10px] text-muted-foreground truncate">{condition.instructor.title}</p>
                                                    </div>
                                                </div>
                                            )}
                                            */}
                                            <Link
                                                to={`/disease-prevention-programs/${condition.id}`}
                                                className="inline-flex items-center text-sm font-bold text-primary hover:gap-2 gap-1.5 transition-all duration-200 flex-shrink-0"
                                            >
                                                View
                                                <ArrowRight size={15} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>
                        );
                    })}
                </div>

                <FadeInSection className="text-center mt-12">
                    <Link
                        to="/disease-prevention-programs"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 hover:-translate-y-px transition-all duration-200"
                        style={{ boxShadow: 'var(--shadow-md)' }}
                    >
                        Explore All Programs
                        <ArrowRight size={18} />
                    </Link>
                </FadeInSection>
            </div>
        </section>
    );
};

export default ConditionCards;
