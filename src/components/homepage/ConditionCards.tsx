import { Link } from 'react-router-dom';
import { Beaker, Heart, Zap, Cloud, Sparkles, Scale, ArrowRight } from 'lucide-react';

interface Condition {
    id: string;
    title: string;
    description: string;
    icon: string;
    image: string;
    alt: string;
    riskFactors: string[];
    accentClass: string;
    iconBg: string;
}

const ConditionCards = () => {
    const conditions: Condition[] = [
        {
            id: 'diabetes',
            title: 'Diabetes Prevention',
            description: 'AI-powered glucose monitoring and lifestyle intervention programs to prevent Type 2 diabetes.',
            icon: 'BeakerIcon',
            image: "https://images.unsplash.com/photo-1685660375327-47bcca398780",
            alt: 'Blood glucose meter',
            riskFactors: ['Family History', 'Obesity', 'Sedentary Lifestyle'],
            accentClass: 'group-hover:border-blue-200',
            iconBg: 'bg-blue-50 text-blue-600',
        },
        {
            id: 'hypertension',
            title: 'Hypertension Management',
            description: 'Continuous blood pressure monitoring with personalized stress reduction and dietary guidance.',
            icon: 'HeartIcon',
            image: "https://images.unsplash.com/photo-1623658045230-605cb00c80d6",
            alt: 'Digital blood pressure monitor',
            riskFactors: ['High Sodium', 'Stress', 'Age'],
            accentClass: 'group-hover:border-rose-200',
            iconBg: 'bg-rose-50 text-rose-600',
        },
        {
            id: 'cardiac',
            title: 'Cardiac Health',
            description: 'Advanced heart health monitoring with ECG integration and cardiovascular risk assessment.',
            icon: 'BoltIcon',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_19c8b52ae-1765801567685.png",
            alt: 'Cardiologist examining ECG',
            riskFactors: ['Cholesterol', 'Smoking', 'Inactivity'],
            accentClass: 'group-hover:border-amber-200',
            iconBg: 'bg-amber-50 text-amber-600',
        },
        {
            id: 'respiratory',
            title: 'Respiratory Wellness',
            description: 'Breathwork therapy combined with air quality monitoring for optimal lung health.',
            icon: 'CloudIcon',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b83cbcc-1764755888108.png",
            alt: 'Person practicing deep breathing',
            riskFactors: ['Pollution', 'Allergies', 'Smoking'],
            accentClass: 'group-hover:border-sky-200',
            iconBg: 'bg-sky-50 text-sky-600',
        },
        {
            id: 'mental',
            title: 'Mental Health',
            description: 'Meditation, mindfulness, and AI-driven mood tracking for emotional wellness.',
            icon: 'SparklesIcon',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_11552d387-1764832853014.png",
            alt: 'Peaceful woman meditating',
            riskFactors: ['Stress', 'Sleep Issues', 'Isolation'],
            accentClass: 'group-hover:border-purple-200',
            iconBg: 'bg-purple-50 text-purple-600',
        },
        {
            id: 'weight',
            title: 'Weight Management',
            description: 'Holistic approach combining nutrition, exercise, and behavioral therapy for sustainable results.',
            icon: 'ScaleIcon',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb8da715-1764844202208.png",
            alt: 'Healthy lifestyle concept',
            riskFactors: ['Poor Diet', 'Inactivity', 'Metabolism'],
            accentClass: 'group-hover:border-emerald-200',
            iconBg: 'bg-emerald-50 text-emerald-600',
        },
    ];

    const IconMap: Record<string, any> = {
        BeakerIcon: Beaker,
        HeartIcon: Heart,
        BoltIcon: Zap,
        CloudIcon: Cloud,
        SparklesIcon: Sparkles,
        ScaleIcon: Scale,
    };

    return (
        <section className="py-24 bg-section-alt/30">
            <div className="container mx-auto px-6 md:px-16">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/6 border border-primary/15 rounded-full mb-5">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Targeted Programs</span>
                    </div>
                    <h2 id="preventive-health-conditions" className="text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
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
                        const IconComponent = IconMap[condition.icon];
                        return (
                            <div
                                key={condition.id}
                                className={`group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${condition.accentClass}`}
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
                                        <div className={`w-10 h-10 ${condition.iconBg} backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md border border-white/30`}>
                                            <IconComponent size={20} />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                                        {condition.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                                        {condition.description}
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
                                        to="/disease-prevention-programs"
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
