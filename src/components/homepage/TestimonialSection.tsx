import { Quote } from 'lucide-react';

interface Testimonial {
    id: string;
    name: string;
    age: number;
    condition: string;
    quote: string;
    improvement: string;
    duration: string;
}

const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Rajesh',
        age: 52,
        condition: 'Type 2 Diabetes Prevention',
        quote: 'PreventVital helped me prevent diabetes through personalized lifestyle changes. The AI predictions were accurate, and the yoga therapy programs transformed my health.',
        improvement: '87% Risk Reduction',
        duration: '6 months',
    },
    {
        id: '2',
        name: 'Priya',
        age: 45,
        condition: 'Hypertension Management',
        quote: 'The continuous blood pressure monitoring and stress reduction programs have been life-changing. I no longer need medication, and my blood pressure is consistently normal.',
        improvement: 'Medication-Free',
        duration: '8 months',
    },
    {
        id: '3',
        name: 'Amit',
        age: 38,
        condition: 'Weight Management',
        quote: "Lost 18 kg with PreventVital's holistic approach. The combination of AI-driven nutrition plans, exercise tracking, and behavioral therapy made weight loss sustainable.",
        improvement: '18 kg Lost',
        duration: '10 months',
    },
    {
        id: '4',
        name: 'Sanjay',
        age: 49,
        condition: 'Cholesterol & ASCVD Risk',
        quote: "Seeing my actual 10-year cardiac risk number, not just a cholesterol reading, was the wake-up call I needed. It's dropped from high to moderate and I finally understand why it matters.",
        improvement: 'ASCVD Risk Halved',
        duration: '1 year',
    },
    {
        id: '5',
        name: 'Divya',
        age: 34,
        condition: 'Stress & Sleep',
        quote: 'Family history of heart disease made me anxious to even check my numbers. VITAL turned that anxiety into a plan — daily breathwork and a score I actually watch improve.',
        improvement: '28% Better Sleep',
        duration: '4 months',
    },
    {
        id: '6',
        name: 'Karan',
        age: 41,
        condition: 'Corporate Wellness Check',
        quote: "My company's wellness benefit got me to take the assessment. Found out my vascular age was 8 years ahead of my real age — that alone changed how I eat and move every day.",
        improvement: 'Vascular Age −6 yrs',
        duration: '9 months',
    },
];

const TestimonialSection = () => {
    return (
        <section className="section-padding bg-section-alt/40 relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
            />

            <div className="container-wide relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/8 border border-accent/15 rounded-full mb-5 md:mb-6">
                        <Quote size={14} className="text-accent" />
                        <span className="text-[11px] md:text-xs font-bold text-accent uppercase tracking-widest">Real Stories</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight mb-2 md:mb-3">
                        Real People,{' '}
                        <span className="gradient-text-soft">Real Turnarounds</span>
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto line-clamp-2 md:line-clamp-none mb-4">
                        Behind every score is a person who decided to start today. Here's what that looks like.
                    </p>
                </div>
            </div>

            <div className="relative mt-4">
                <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-section-alt/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-section-alt/40 to-transparent z-10 pointer-events-none" />

                <div className="group overflow-hidden">
                    <div className="flex w-max gap-6 animate-scroll [animation-duration:55s] group-hover:[animation-play-state:paused]">
                        {[...testimonials, ...testimonials].map((t, i) => (
                            <div
                                key={`${t.id}-${i}`}
                                className="bg-white rounded-[1.5rem] p-6 md:p-8 border border-border/60 flex flex-col w-[340px] md:w-[400px] flex-shrink-0"
                                style={{ boxShadow: 'var(--shadow-md)' }}
                            >
                                <Quote size={24} className="text-primary/15 mb-4 flex-shrink-0" fill="currentColor" />

                                <span className="inline-flex self-start px-3 py-1.5 rounded-full bg-primary/8 text-brand-700 text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-4">
                                    {t.condition}
                                </span>

                                <blockquote className="text-base md:text-lg text-foreground leading-relaxed flex-1 line-clamp-4 md:line-clamp-none italic">
                                    "{t.quote}"
                                </blockquote>

                                <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-border/60">
                                    <p className="text-[13px] font-bold text-foreground">
                                        {t.name}, {t.age}
                                    </p>
                                    <div className="text-right leading-tight">
                                        <p className="text-xs font-bold text-accent">{t.improvement}</p>
                                        <p className="text-[10px] text-muted-foreground">in {t.duration}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
