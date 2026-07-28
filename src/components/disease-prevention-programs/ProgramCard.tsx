
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface ProgramCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    therapies: string[];
    duration: string;
    outcomeFocus?: string;
    category: 'prevention' | 'therapy';
}

export default function ProgramCard({
    id,
    title,
    description,
    image,
    alt,
    therapies,
    duration,
    outcomeFocus,
    category,
}: ProgramCardProps) {
    // Only the six condition-specific "prevention" programs have a detail page;
    // therapy sessions (yoga, physio) still route straight to the assessment.
    const ctaLink = category === 'prevention' ? `/disease-prevention-programs/${id}` : '/ai-health-assessment';
    return (
        <Card className="group overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full bg-card rounded-2xl">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={image}
                    alt={alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            <CardHeader className="p-6 pb-2">
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {description}
                </p>
            </CardHeader>

            <CardContent className="p-6 pt-2 flex-grow">
                <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
                    <Clock size={15} />
                    <span>{duration}</span>
                </div>

                {outcomeFocus && (
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        {outcomeFocus}
                    </p>
                )}

                <div className="flex flex-wrap gap-2">
                    {therapies.map((therapy, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full border border-border"
                        >
                            {therapy}
                        </span>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 mt-auto">
                <Link
                    to={ctaLink}
                    className="group/btn w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                    style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-sm)' }}
                >
                    Explore Program
                    <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
            </CardFooter>
        </Card>
    );
}
