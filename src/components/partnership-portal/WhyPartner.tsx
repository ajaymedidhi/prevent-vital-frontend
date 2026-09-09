
import { ShieldCheck, Zap, Headset, FileText } from 'lucide-react';

interface WhyPartnerProps {
    className?: string;
}

const features = [
    {
        icon: ShieldCheck,
        title: 'Enterprise Security',
        description: 'HIPAA compliant infrastructure',
        iconStyle: 'bg-primary/10 text-primary',
    },
    {
        icon: Zap,
        title: 'Fast Integration',
        description: 'Go live in weeks, not months',
        iconStyle: 'bg-accent/10 text-accent',
    },
    {
        icon: Headset,
        title: 'Dedicated Support',
        description: '24/7 technical assistance',
        iconStyle: 'bg-emerald-100 text-emerald-600',
    },
    {
        icon: FileText,
        title: 'Comprehensive Docs',
        description: 'Detailed API documentation',
        iconStyle: 'bg-primary/8 text-primary',
    },
];

const WhyPartner = ({ className = '' }: WhyPartnerProps) => {
    return (
        <section className={`section-padding bg-muted/30 ${className}`}>
            <div className="container-wide">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <h2 className="text-fluid-4xl font-bold text-foreground tracking-tight">
                        Why Partner with PreventVital?
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-card p-8 rounded-2xl border border-border text-center hover:shadow-md transition-all duration-300">
                            <div className={`w-14 h-14 ${feature.iconStyle} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyPartner;
