import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Clock,
    FlaskConical,
    Heart,
    Activity,
    Wind,
    Sparkles,
    Scale,
    LucideIcon
} from "lucide-react";
import { conditionPrograms } from '@/constants/conditionPrograms';

const iconMap: Record<string, LucideIcon> = {
    diabetes: FlaskConical,
    hypertension: Heart,
    cardiac: Activity,
    respiratory: Wind,
    mental: Sparkles,
    weight: Scale,
};

const conditions = conditionPrograms;

export const FeaturedPrograms = () => {
    // No need for isHydrated in standard React SPA
    return (
        <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Condition-Specific Prevention Programs
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Targeted interventions powered by AI analytics and traditional wellness therapies
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conditions.map((condition) => {
                        const IconComponent = iconMap[condition.id];
                        return (
                            <div
                                key={condition.id}
                                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={condition.image}
                                        alt={condition.alt}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                                    <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                            <IconComponent size={20} className="text-primary-foreground" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        {condition.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                        {condition.description}
                                    </p>

                                    <div className="flex items-center gap-1.5 mb-3 text-xs font-medium text-muted-foreground">
                                        <Clock size={13} />
                                        <span>{condition.duration} program</span>
                                    </div>

                                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                                        {condition.outcomeFocus}
                                    </p>

                                    <div className="mb-4">
                                        <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Key Risk Factors:</div>
                                        <div className="flex flex-wrap gap-2">
                                            {condition.riskFactors.map((factor, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full font-medium"
                                                >
                                                    {factor}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <Button
                                        variant="link"
                                        className="p-0 h-auto font-semibold text-primary hover:text-primary/80"
                                        asChild
                                    >
                                        <Link to={`/disease-prevention-programs/${condition.id}`} className="inline-flex items-center">
                                            Learn More
                                            <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Button
                        size="xl"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:scale-105 transition-all duration-300"
                        asChild
                    >
                        <Link to="/disease-prevention-programs">
                            View All Programs
                            <ArrowRight size={20} className="ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};
