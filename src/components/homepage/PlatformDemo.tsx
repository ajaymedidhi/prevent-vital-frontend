import { useState } from 'react';
import { ChartBar, Cpu, SlidersHorizontal, ChevronRight, Activity } from 'lucide-react';

interface DemoFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
    image: string;
    alt: string;
    metrics: { label: string; value: string; }[];
}

const PlatformDemo = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features: DemoFeature[] = [
        {
            id: 'monitoring',
            title: 'Your Vitals, Watching Over You',
            description: 'Wear the device you already have, and let it quietly flag anything worth a second look',
            icon: 'ChartBarIcon',
            image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=1200&q=80",
            alt: 'Person checking their smartwatch during their everyday routine',
            metrics: [
                { label: 'Heart Rate', value: '72 BPM' },
                { label: 'Blood Pressure', value: '120/80' },
                { label: 'Steps Today', value: '8,432' }
            ]
        },
        {
            id: 'prediction',
            title: 'Clinical Insight, Not Guesswork',
            description: 'Your data is read against the same ACC/AHA risk models doctors use — reviewed, not just automated',
            icon: 'CpuChipIcon',
            image: "https://images.unsplash.com/photo-1730597842283-943c7986ee2c?auto=format&fit=crop&w=1200&q=80",
            alt: 'Clinician in scrubs reviewing a patient risk assessment',
            metrics: [
                { label: 'Diabetes Risk', value: 'Low (12%)' },
                { label: 'Cardiac Risk', value: 'Moderate' },
                { label: 'Overall', value: 'Good' }
            ]
        },
        {
            id: 'therapy',
            title: 'A Plan Built Around You',
            description: 'Yoga, meditation, and movement routines that adapt to your body, your schedule, and your progress',
            icon: 'AdjustmentsHorizontalIcon',
            image: "https://images.unsplash.com/photo-1702561474109-17616a842a5d",
            alt: 'Woman performing yoga pose on mat',
            metrics: [
                { label: 'Completed', value: '24/30' },
                { label: 'Stress', value: '-42%' },
                { label: 'Sleep', value: '+28%' }
            ]
        }
    ];

    const IconMap: Record<string, any> = {
        ChartBarIcon: ChartBar,
        CpuChipIcon: Cpu,
        AdjustmentsHorizontalIcon: SlidersHorizontal,
    };

    return (
        <section className="section-padding bg-section-alt/30 overflow-hidden">
            <div className="container-wide">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Content Side */}
                    <div className="w-full lg:w-5/12 space-y-8 animate-fade-in-left">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full">
                            <Activity size={14} className="text-primary" />
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Platform Technology</span>
                        </div>

                        <div className="mb-fluid-12">
                            <h2 id="platform-technology" className="text-2xl md:text-[length:var(--fz-4xl)] font-bold text-foreground mb-2 md:mb-4 leading-tight">
                                Care That Notices <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-800 to-wellness-600">
                                    Things Early
                                </span>
                            </h2>
                            <p className="text-sm md:text-[length:var(--fz-xl)] text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-none">
                                We turn everyday numbers — your heart rate, your sleep, your last check-up — into something you can actually act on, with real clinical grounding behind every recommendation.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {features.map((feature, index) => {
                                const IconComponent = IconMap[feature.icon];
                                const isActive = activeFeature === index;
                                return (
                                    <button
                                        key={feature.id}
                                        onClick={() => setActiveFeature(index)}
                                        className={`group w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${isActive
                                            ? 'bg-primary/5 border-primary/40'
                                            : 'bg-card border-border hover:border-primary/30 hover:bg-muted/40'
                                            }`}
                                        style={isActive ? { boxShadow: 'var(--shadow-sm)' } : {}}
                                    >
                                        {/* Active left accent bar */}
                                        {isActive && (
                                            <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-primary rounded-r-full" />
                                        )}
                                        <div className="relative z-10 flex items-start gap-4">
                                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                                                }`}>
                                                <IconComponent size={22} strokeWidth={isActive ? 2.5 : 2} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`text-sm md:text-base font-bold mb-1 transition-colors ${isActive ? 'text-foreground' : 'text-foreground/70 group-hover:text-foreground'
                                                    }`}>
                                                    {feature.title}
                                                </h3>
                                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-none">
                                                    {feature.description}
                                                </p>
                                            </div>
                                            <ChevronRight
                                                size={18}
                                                className={`flex-shrink-0 mt-0.5 transition-transform duration-300 ${isActive ? 'text-primary rotate-90' : 'text-muted-foreground/50 group-hover:text-foreground'
                                                    }`}
                                            />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Visual Side */}
                    <div className="w-full lg:w-7/12 relative animate-fade-in-right">
                        <div
                            className="relative rounded-3xl overflow-hidden border-4 border-card aspect-[4/3]"
                            style={{ boxShadow: 'var(--shadow-xl)' }}
                        >
                            {/* Image */}
                            <img
                                src={features[activeFeature].image}
                                alt={features[activeFeature].alt}
                                loading="lazy"
                                className="w-full h-full object-cover transition-all duration-500"
                            />

                            {/* Gradient — just enough for the caption card to read */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                            {/* Floating metrics card */}
                            <div
                                className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-5"
                                style={{ boxShadow: 'var(--shadow-md)' }}
                            >
                                <div className="grid grid-cols-3 gap-4">
                                    {features[activeFeature].metrics.map((metric, index) => (
                                        <div key={index} className={index > 0 ? 'pl-4 border-l border-border/60' : ''}>
                                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                                {metric.label}
                                            </p>
                                            <p className="text-base font-bold text-foreground">
                                                {metric.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Ambient glow — single, subtle, matches MeetVita's treatment */}
                        <div
                            className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] opacity-30 pointer-events-none"
                            style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformDemo;
