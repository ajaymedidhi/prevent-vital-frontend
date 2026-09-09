
import { Building2, Smartphone, Users, Code, CheckCircle, ArrowRight } from 'lucide-react';

interface PartnershipType {
    id: string;
    title: string;
    description: string;
    icon: any;
    benefits: string[];
    iconStyle: string;
}

const partnershipTypes: PartnershipType[] = [
    {
        id: 'hospital',
        title: 'Hospital Partnerships',
        description: 'Integrate PreventVital into your healthcare facility to enhance patient outcomes through predictive analytics.',
        icon: Building2,
        benefits: [
            'Patient referral tracking system',
            'Outcome metrics dashboard',
            'Seamless EHR integration',
            'Revenue sharing model',
            'Co-branded patient programs',
        ],
        iconStyle: 'bg-primary/10 text-primary',
    },
    {
        id: 'device',
        title: 'Device Integration',
        description: 'Connect your wearable devices and health monitoring equipment to our AI-powered platform.',
        icon: Smartphone,
        benefits: [
            'Real-time data synchronization',
            'SDK and API access',
            'Technical integration support',
            'Joint marketing opportunities',
            'Expanded user base access',
        ],
        iconStyle: 'bg-accent/10 text-accent',
    },
    {
        id: 'provider',
        title: 'Healthcare Provider Network',
        description: 'Join our network of medical professionals delivering preventive care through technology.',
        icon: Users,
        benefits: [
            'Patient management tools',
            'Clinical decision support',
            'Telemedicine integration',
            'Continuing education credits',
            'Practice growth support',
        ],
        iconStyle: 'bg-emerald-100 text-emerald-600',
    },
    {
        id: 'technology',
        title: 'Technology Alliances',
        description: 'Build innovative health solutions together through our comprehensive API platform.',
        icon: Code,
        benefits: [
            'API-first integration',
            'White-label opportunities',
            'Joint solution development',
            'Technical co-innovation',
            'Market expansion support',
        ],
        iconStyle: 'bg-primary/8 text-primary',
    },
];

interface PartnershipTypesProps {
    className?: string;
}

const PartnershipTypes = ({ className = '' }: PartnershipTypesProps) => {
    return (
        <section className={`section-padding bg-background ${className}`}>
            <div className="container-wide">
                <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
                    <h2 className="text-fluid-4xl font-bold text-foreground tracking-tight">
                        Partnership Opportunities
                    </h2>
                    <p className="text-fluid-lg text-muted-foreground leading-relaxed">
                        Choose the partnership model that aligns with your organization's goals and capabilities
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {partnershipTypes.map((type) => (
                        <div
                            key={type.id}
                            className="bg-card rounded-2xl p-8 border border-border hover:shadow-md transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${type.iconStyle}`}>
                                    <type.icon size={22} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-foreground mb-1.5">{type.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">{type.description}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8 flex-grow">
                                <p className="text-xs font-bold text-foreground uppercase tracking-widest mb-3">Key Benefits</p>
                                {type.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle size={15} className="text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground text-sm">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="group w-full mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground bg-muted border border-border hover:bg-muted/80 transition-all duration-300">
                                Learn More
                                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnershipTypes;
