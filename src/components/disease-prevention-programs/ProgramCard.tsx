
import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';

interface ProgramCardProps {
    title: string;
    description: string;
    image: string;
    alt: string;
    therapies: string[];
    successRate: string;
    duration: string;
    onClick: () => void;
}

export default function ProgramCard({
    title,
    description,
    image,
    alt,
    therapies,
    successRate,
    duration,
    onClick
}: ProgramCardProps) {
    return (
        <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white rounded-2xl">
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={image}
                    alt={alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Success Rate Badge */}
                <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 backdrop-blur-sm text-sm font-semibold text-purple-600 hover:bg-white/95 px-3 py-1 shadow-sm border-0">
                        {successRate} Success Rate
                    </Badge>
                </div>
            </div>

            <CardHeader className="p-6 pb-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {description}
                </p>
            </CardHeader>

            <CardContent className="p-6 pt-2 flex-grow">
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-500">
                    <Clock size={16} />
                    <span>{duration}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {therapies.map((therapy, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-100"
                        >
                            {therapy}
                        </span>
                    ))}
                </div>
            </CardContent>

            <div className="p-4 pt-0 mt-auto">
                <Button
                    onClick={onClick}
                    className="w-full bg-gradient-to-r from-blue-400 to-pink-500 hover:from-blue-500 hover:to-pink-600 text-white font-semibold h-12 rounded-xl shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5"
                >
                    Explore Program
                    <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
        </Card>
    );
}
