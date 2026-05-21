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
            title: 'Real-Time Health Monitoring',
            description: 'Continuous tracking of vital signs with instant alerts for anomalies',
            icon: 'ChartBarIcon',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_151995676-1764659090665.png",
            alt: 'Digital health dashboard displaying real-time heart rate',
            metrics: [
                { label: 'Heart Rate', value: '72 BPM' },
                { label: 'Blood Pressure', value: '120/80' },
                { label: 'Steps Today', value: '8,432' }
            ]
        },
        {
            id: 'prediction',
            title: 'AI Risk Prediction',
            description: 'Machine learning algorithms analyze patterns to predict health risks',
            icon: 'CpuChipIcon',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1add7ce1f-1764660531679.png",
            alt: 'Futuristic AI interface showing predictive health analytics',
            metrics: [
                { label: 'Diabetes Risk', value: 'Low (12%)' },
                { label: 'Cardiac Risk', value: 'Moderate' },
                { label: 'Overall', value: 'Good' }
            ]
        },
        {
            id: 'therapy',
            title: 'Personalized Therapy Plans',
            description: 'Customized yoga, meditation, and exercise routines based on your health data',
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
        <section className="section-padding bg-background overflow-hidden">
            <div className="container-wide">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Content Side */}
                    <div className="w-full lg:w-5/12 space-y-8 animate-fade-in-left">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full">
                            <Activity size={14} className="text-primary" />
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Platform Technology</span>
                        </div>

                        <div className="mb-fluid-12">
                            <h2 id="platform-technology" className="text-fluid-h1 font-bold text-foreground mb-4 leading-tight">
                                Experience the <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-800 to-wellness-600">
                                    Future of Care
                                </span>
                            </h2>
                            <p className="text-fluid-xl text-muted-foreground leading-relaxed">
                                Our AI-powered platform transforms raw health data into actionable, life-saving insights with clinical precision.
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
                                                <h3 className={`text-base font-bold mb-1 transition-colors ${isActive ? 'text-foreground' : 'text-foreground/70 group-hover:text-foreground'
                                                    }`}>
                                                    {feature.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
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
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border-4 border-card bg-black ring-1 ring-border aspect-[4/3]">

                            {/* Image with overlay */}
                            <img
                                src={features[activeFeature].image}
                                alt={features[activeFeature].alt}
                                loading="lazy"
                                className="w-full h-full object-cover opacity-90 transition-all duration-500"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                            {/* Floating Metrics */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="grid grid-cols-3 gap-4">
                                    {features[activeFeature].metrics.map((metric, index) => (
                                        <div
                                            key={index}
                                            className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10 transition-all hover:bg-black/50"
                                        >
                                            <div className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">
                                                {metric.label}
                                            </div>
                                            <div className="text-xl font-bold text-white">
                                                {metric.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Decorative Blobs */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformDemo;
