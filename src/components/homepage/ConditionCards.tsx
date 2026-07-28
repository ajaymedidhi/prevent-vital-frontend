import { Link } from 'react-router-dom';
import { Beaker, Heart, Zap, Cloud, Sparkles, Scale, ArrowRight, Clock } from 'lucide-react';
import { conditionPrograms } from '@/constants/conditionPrograms';

const accentStyles: Record<string, { accentClass: string; iconBg: string; icon: any }> = {
    diabetes: { accentClass: 'group-hover:border-blue-200', iconBg: 'bg-blue-50 text-blue-600', icon: Beaker },
    hypertension: { accentClass: 'group-hover:border-rose-200', iconBg: 'bg-rose-50 text-rose-600', icon: Heart },
    cardiac: { accentClass: 'group-hover:border-amber-200', iconBg: 'bg-amber-50 text-amber-600', icon: Zap },
    respiratory: { accentClass: 'group-hover:border-sky-200', iconBg: 'bg-sky-50 text-sky-600', icon: Cloud },
    mental: { accentClass: 'group-hover:border-purple-200', iconBg: 'bg-purple-50 text-purple-600', icon: Sparkles },
    weight: { accentClass: 'group-hover:border-emerald-200', iconBg: 'bg-emerald-50 text-emerald-600', icon: Scale },
};

const ConditionCards = () => {
    const conditions = conditionPrograms;

    return (
        <section className="section-padding bg-section-alt/30">
            <div className="container-wide">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/6 border border-primary/15 rounded-full mb-5">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Targeted Programs</span>
                    </div>
                    <h2 id="preventive-health-conditions" className="text-fluid-4xl font-bold text-foreground mb-4 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-800 to-wellness-600">
                            Condition-Specific Prevention
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Clinically validated interventions powered by AI analytics to address chronic risks effectively.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conditions.map((condition) => {
                        const { accentClass, iconBg, icon: IconComponent } = accentStyles[condition.id];
                        return (
                            <div
                                key={condition.id}
                                className={`group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${accentClass}`}
                                style={{ boxShadow: 'var(--shadow-xs)' }}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10 group-hover:from-black/30 transition-all duration-300" />
                                    <img
                                        src={condition.image}
                                        alt={condition.alt}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <div className={`w-10 h-10 ${iconBg} backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md border border-white/30`}>
                                            <IconComponent size={20} />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                                        {condition.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                        {condition.description}
                                    </p>

                                    <div className="flex items-center gap-1.5 mb-3 text-xs font-medium text-muted-foreground">
                                        <Clock size={13} />
                                        <span>{condition.duration} program</span>
                                    </div>

                                    <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
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

                                    <Link
                                        to={`/disease-prevention-programs/${condition.id}`}
                                        className="inline-flex items-center text-sm font-bold text-primary hover:gap-2 gap-1.5 transition-all duration-200"
                                    >
                                        View Program
                                        <ArrowRight size={15} />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/disease-prevention-programs"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 hover:-translate-y-px transition-all duration-200"
                        style={{ boxShadow: 'var(--shadow-md)' }}
                    >
                        Explore All Programs
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ConditionCards;
