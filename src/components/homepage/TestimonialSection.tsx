
import { useState } from 'react';
import { Star, Check, ChevronLeft, ChevronRight, TrendingUp, Clock } from 'lucide-react';

interface Testimonial {
    id: string;
    name: string;
    age: number;
    condition: string;
    quote: string;
    improvement: string;
    duration: string;
    rating: number;
    avatarColor: string;
}

const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Rajesh Kumar',
        age: 52,
        condition: 'Type 2 Diabetes Prevention',
        quote: 'PreventVital helped me prevent diabetes through personalized lifestyle changes. The AI predictions were accurate, and the yoga therapy programs transformed my health. My HbA1c dropped from 6.2 to 5.4 in just 6 months.',
        improvement: '87% Risk Reduction',
        duration: '6 Months',
        rating: 5,
        avatarColor: 'from-brand-800 to-wellness-600',
    },
    {
        id: '2',
        name: 'Priya Sharma',
        age: 45,
        condition: 'Hypertension Management',
        quote: 'The continuous blood pressure monitoring and stress reduction programs have been life-changing. I no longer need medication, and my blood pressure is consistently normal. The meditation sessions are incredibly effective.',
        improvement: 'Medication-Free',
        duration: '8 Months',
        rating: 5,
        avatarColor: 'from-brand-700 to-wellness-500',
    },
    {
        id: '3',
        name: 'Amit Patel',
        age: 38,
        condition: 'Weight Management',
        quote: "Lost 18 kg in 10 months with PreventVital's holistic approach. The combination of AI-driven nutrition plans, exercise tracking, and behavioral therapy made weight loss sustainable. I feel healthier and more energetic than ever.",
        improvement: '18 kg Weight Loss',
        duration: '10 Months',
        rating: 5,
        avatarColor: 'from-wellness-700 to-brand-700',
    },
];

const TestimonialSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const t = testimonials[currentIndex];

    const handlePrevious = () => setCurrentIndex((p) => (p === 0 ? testimonials.length - 1 : p - 1));
    const handleNext = () => setCurrentIndex((p) => (p === testimonials.length - 1 ? 0 : p + 1));

    return (
        <section className="section-padding bg-section-alt/40 relative overflow-hidden">
            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
            />

            <div className="container-wide relative z-10">
                {/* Section header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/8 border border-accent/15 rounded-full mb-5">
                        <Star size={13} className="text-accent fill-accent" />
                        <span className="text-xs font-bold text-accent uppercase tracking-widest">Success Stories</span>
                    </div>
                    <h2 className="text-fluid-4xl font-semibold text-foreground leading-tight tracking-tight mb-3">
                        Life-Changing{' '}
                        <span className="gradient-text-soft">Transformations</span>
                    </h2>
                    <p className="text-base text-muted-foreground max-w-xl mx-auto">
                        Join thousands who have rewritten their health stories with AI-driven preventive care.
                    </p>
                </div>

                {/* Main testimonial card */}
                <div className="max-w-4xl mx-auto">
                    <div
                        className="bg-white rounded-3xl p-8 md:p-10 border border-border/60 relative overflow-hidden"
                        style={{ boxShadow: 'var(--shadow-lg)' }}
                    >
                        {/* Decorative gradient corner */}
                        <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[60px] opacity-[0.07] bg-primary pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[50px] opacity-[0.06] bg-accent pointer-events-none" />

                        {/* Large quotation mark */}
                        <div className="absolute top-6 right-8 text-[120px] font-serif leading-none text-primary/6 select-none pointer-events-none">"</div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                            {/* Avatar column */}
                            <div className="flex-shrink-0 flex flex-col items-center gap-3">
                                <div className="relative">
                                    <div
                                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-2xl font-bold text-white shadow-md`}
                                    >
                                        {t.name.charAt(0)}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-accent rounded-full flex items-center justify-center shadow-md border-2 border-white">
                                        <Check size={12} className="text-white" strokeWidth={3} />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">Age {t.age}</p>
                                </div>
                            </div>

                            {/* Content column */}
                            <div className="flex-1 space-y-5">
                                {/* Condition + stars */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/8 text-primary text-[11px] font-bold uppercase tracking-wide">
                                        {t.condition}
                                    </span>
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>
                                </div>

                                {/* Quote */}
                                <blockquote className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
                                    "{t.quote}"
                                </blockquote>

                                {/* Result metrics */}
                                <div className="flex gap-6 pt-4 border-t border-border/60">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                            <TrendingUp size={15} className="text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-wider">Result</p>
                                            <p className="text-sm font-bold text-accent">{t.improvement}</p>
                                        </div>
                                    </div>
                                    <div className="w-px bg-border" />
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                                            <Clock size={15} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-wider">Timeframe</p>
                                            <p className="text-sm font-bold text-foreground">{t.duration}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation controls */}
                    <div className="flex items-center justify-between mt-6 px-1">
                        {/* Dot indicators */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`rounded-full transition-all duration-300 ${
                                        i === currentIndex
                                            ? 'w-6 h-2 bg-primary'
                                            : 'w-2 h-2 bg-border hover:bg-muted-foreground/40'
                                    }`}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                />
                            ))}
                        </div>

                        {/* Chevron buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrevious}
                                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
