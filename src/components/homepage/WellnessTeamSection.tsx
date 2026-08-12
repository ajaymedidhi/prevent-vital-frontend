import { Link } from 'react-router-dom';
import { Sparkles, Wind, Salad, CalendarHeart, ArrowRight, MessageCircle } from 'lucide-react';
import FadeInSection from './FadeInSection';

interface TeamCard {
    id: string;
    title: string;
    description: string;
    icon: any;
    photo?: string;
    alt?: string;
    link: string;
    linkLabel: string;
}

const team: TeamCard[] = [
    {
        id: 'vita',
        title: 'VITA, Your AI Assistant',
        description: "Reads your CVITAL score and check-ins so it can answer questions the moment they come up — day or night.",
        icon: Sparkles,
        link: '/ai-health-assessment',
        linkLabel: 'Talk to VITA',
    },
    {
        id: 'yoga',
        title: 'Yoga & Movement Experts',
        description: 'Certified instructors design breathwork and movement sequences matched to your specific risk factors.',
        icon: Wind,
        photo: 'https://images.unsplash.com/photo-1697274834392-04ff3b76ef20?auto=format&fit=crop&w=500&q=80',
        alt: 'Yoga instructor practicing tree pose outdoors in a forest',
        link: '/disease-prevention-programs',
        linkLabel: 'Meet the instructors',
    },
    {
        id: 'nutrition',
        title: 'Nutrition Coaches',
        description: 'Real coaches build meal guidance around your preferences and metabolic profile — not a generic diet plan.',
        icon: Salad,
        photo: 'https://images.unsplash.com/photo-1723406230636-aa8c4ac1e6c5?auto=format&fit=crop&w=500&q=80',
        alt: 'Nutrition coach smiling, casual portrait',
        link: '/disease-prevention-programs/diabetes',
        linkLabel: 'See nutrition programs',
    },
    {
        id: 'programs',
        title: 'Structured Health Programs',
        description: 'Six condition-specific programs, each with its own curriculum, timeline, and clinician-reviewed curriculum.',
        icon: CalendarHeart,
        photo: 'https://images.unsplash.com/photo-1529693662653-9d480530a697?auto=format&fit=crop&w=500&q=80',
        alt: 'Small group yoga class practicing guided movement together',
        link: '/disease-prevention-programs',
        linkLabel: 'Browse all programs',
    },
];

const WellnessTeamSection = () => {
    return (
        <section className="section-padding bg-background" aria-labelledby="wellness-team-heading">
            <div className="container-wide">
                <FadeInSection className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/6 border border-primary/15 rounded-full mb-4 md:mb-5">
                        <span className="text-[11px] md:text-xs font-bold text-brand-700 uppercase tracking-widest">Your Wellness Team</span>
                    </div>
                    <h2 id="wellness-team-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3 tracking-tight">
                        You're Not Doing This <span className="text-foreground/30">With Just an App</span>
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed line-clamp-2 md:line-clamp-none">
                        Behind every score is a mix of real experts and helpful AI—working together to support you.
                    </p>
                </FadeInSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                    {team.map((member, index) => {
                        const Icon = member.icon;
                        return (
                            <FadeInSection key={member.id} delay={index * 0.08}>
                                <div
                                    className="group relative bg-card rounded-[1.25rem] overflow-hidden border border-border h-full flex flex-col hover:-translate-y-1 transition-all duration-300"
                                    style={{ boxShadow: 'var(--shadow-xs)' }}
                                >
                                    {member.photo ? (
                                        <div className="relative h-36 md:h-40 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent z-10" />
                                            <img
                                                src={member.photo}
                                                alt={member.alt}
                                                loading="lazy"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="relative h-36 md:h-40 flex items-center justify-center overflow-hidden p-4 md:p-5"
                                            style={{ background: 'var(--gradient-health)' }}
                                        >
                                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                                            <div
                                                className="relative bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-3 max-w-[85%]"
                                                style={{ boxShadow: 'var(--shadow-md)' }}
                                            >
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-brand-800 to-wellness-600 flex items-center justify-center flex-shrink-0">
                                                        <MessageCircle size={10} className="text-white" />
                                                    </div>
                                                    <p className="text-[11px] md:text-xs font-bold text-foreground">VITA</p>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-auto" />
                                                </div>
                                                <p className="text-[10px] md:text-[11px] text-foreground/80 leading-snug">
                                                    Hi, I'm here whenever you need me.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-4 md:p-5 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                                            {member.photo && (
                                                <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-primary/8 text-primary flex items-center justify-center flex-shrink-0">
                                                    <Icon size={12} />
                                                </div>
                                            )}
                                            <h3 className="text-[13px] md:text-sm font-bold text-foreground">{member.title}</h3>
                                        </div>
                                        <p className="text-xs md:text-[13px] text-muted-foreground leading-relaxed mb-3 md:mb-4 flex-1 line-clamp-2 md:line-clamp-none">
                                            {member.description}
                                        </p>
                                        <Link
                                            to={member.link}
                                            className="inline-flex items-center text-xs md:text-sm font-bold text-brand-700 hover:gap-2 gap-1.5 transition-all duration-200"
                                        >
                                            {member.linkLabel}
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </FadeInSection>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WellnessTeamSection;
