import { Link } from 'react-router-dom';
import { Sparkles, Wind, Salad, CalendarHeart, ArrowRight } from 'lucide-react';
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
                <FadeInSection className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/6 border border-primary/15 rounded-full mb-5">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Your Wellness Team</span>
                    </div>
                    <h2 id="wellness-team-heading" className="text-fluid-4xl font-bold text-foreground mb-4 tracking-tight">
                        You're Not Doing This <span className="text-foreground/30">With Just an App</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Behind every score and every program is a mix of real people and a genuinely helpful AI — working together, not instead of each other.
                    </p>
                </FadeInSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, index) => {
                        const Icon = member.icon;
                        return (
                            <FadeInSection key={member.id} delay={index * 0.08}>
                                <div
                                    className="group relative bg-card rounded-3xl overflow-hidden border border-border h-full flex flex-col hover:-translate-y-1.5 transition-all duration-300"
                                    style={{ boxShadow: 'var(--shadow-xs)' }}
                                >
                                    {member.photo ? (
                                        <div className="relative h-40 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent z-10" />
                                            <img
                                                src={member.photo}
                                                alt={member.alt}
                                                loading="lazy"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="relative h-40 flex items-center justify-center overflow-hidden"
                                            style={{ background: 'var(--gradient-health)' }}
                                        >
                                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                                            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
                                                <Icon size={26} className="text-white" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {member.photo && (
                                                <div className="w-7 h-7 rounded-lg bg-primary/8 text-primary flex items-center justify-center flex-shrink-0">
                                                    <Icon size={14} />
                                                </div>
                                            )}
                                            <h3 className="text-base font-bold text-foreground">{member.title}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                                            {member.description}
                                        </p>
                                        <Link
                                            to={member.link}
                                            className="inline-flex items-center text-sm font-bold text-primary hover:gap-2 gap-1.5 transition-all duration-200"
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
