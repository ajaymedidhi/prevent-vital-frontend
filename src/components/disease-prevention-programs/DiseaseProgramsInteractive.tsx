
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, Users, Clock } from 'lucide-react';
import ProgramCard from './ProgramCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Program {
    id: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    therapies: string[];
    successRate: string;
    duration: string;
    category: 'prevention' | 'therapy';
}

export default function DiseaseProgramsInteractive() {
    const [activeTab, setActiveTab] = useState<'prevention' | 'therapy'>('prevention');

    const programs: Program[] = [
        {
            id: 'diabetes',
            title: 'Diabetes Prevention & Management',
            description: 'Comprehensive program combining AI-powered glucose monitoring with yoga, meditation, and personalized nutrition plans.',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7fc6a7f-1764743297281.png",
            alt: 'Diabetes prevention',
            therapies: ['Yoga', 'Meditation', 'Nutrition', 'Breathwork'],
            successRate: '87%',
            duration: '12 weeks',
            category: 'prevention'
        },
        {
            id: 'hypertension',
            title: 'Hypertension Control Program',
            description: 'Integrated approach to blood pressure management through stress reduction techniques and cardiovascular exercises.',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_18fdc3d89-1765186858638.png",
            alt: 'Hypertension control',
            therapies: ['Meditation', 'Breathwork', 'Physiotherapy', 'Yoga'],
            successRate: '82%',
            duration: '10 weeks',
            category: 'prevention'
        },
        {
            id: 'weight',
            title: 'Weight Management Program',
            description: 'Holistic weight management combining metabolic optimization with mindful eating and personalized exercise.',
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            alt: 'Weight management',
            therapies: ['Yoga', 'Nutrition', 'Physiotherapy'],
            successRate: '91%',
            duration: '16 weeks',
            category: 'prevention'
        },
        {
            id: 'stress',
            title: 'Stress & Anxiety Relief',
            description: 'Evidence-based program for mental wellness using meditation, breathwork, and cognitive techniques.',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b56c2cc1-1764999507242.png",
            alt: 'Stress relief',
            therapies: ['Meditation', 'Breathwork', 'Yoga'],
            successRate: '89%',
            duration: '8 weeks',
            category: 'prevention'
        },
        // Therapy Sessions (Placeholders to demonstrate tab functionality)
        {
            id: 'yoga-therapy',
            title: 'Advanced Yoga Therapy',
            description: 'Deepen your practice with condition-specific asanas guided by expert therapists.',
            image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            alt: 'Yoga therapy',
            therapies: ['Hatha Yoga', 'Pranayama'],
            successRate: '95%',
            duration: '60 mins',
            category: 'therapy'
        },
        {
            id: 'physio-session',
            title: 'Ortho-Neuro Physiotherapy',
            description: 'Targeted rehabilitation sessions for musculoskeletal and neurological conditions.',
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            alt: 'Physiotherapy',
            therapies: ['Manual Therapy', 'Exercises'],
            successRate: '92%',
            duration: '45 mins',
            category: 'therapy'
        }
    ];

    const filteredPrograms = programs.filter(p => p.category === activeTab);

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* HER HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-purple-50/30 to-white pointer-events-none" />

                <div className="container mx-auto px-6 md:px-16 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-cyan-600 font-semibold tracking-wide uppercase text-sm mb-4 block">
                            Ancient Wisdom Meets AI Innovation
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                            Transform Your Health with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
                                Holistic Wellness
                            </span>
                        </h1>
                        <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Experience personalized therapeutic programs combining yoga, meditation, breathwork, and physiotherapy—all enhanced by AI-powered insights.
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-16">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">500+</div>
                                <div className="text-sm text-gray-500 font-medium">Guided Sessions</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">50+</div>
                                <div className="text-sm text-gray-500 font-medium">Expert Instructors</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">24/7</div>
                                <div className="text-sm text-gray-500 font-medium">Access Anywhere</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* PROGRAMS SECTION */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 md:px-16">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                        <h2 className="text-3xl font-bold text-gray-900">Explore Programs</h2>

                        {/* Tabs */}
                        <div className="bg-gray-100 p-1 rounded-lg inline-flex self-start md:self-auto">
                            <button
                                onClick={() => setActiveTab('prevention')}
                                className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-300 ${activeTab === 'prevention'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Disease Prevention
                            </button>
                            <button
                                onClick={() => setActiveTab('therapy')}
                                className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-300 ${activeTab === 'therapy'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Therapeutic Sessions
                            </button>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredPrograms.map((program) => (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ProgramCard
                                    {...program}
                                    onClick={() => console.log('Clicked', program.id)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6 md:px-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ready to Start Your Wellness Journey?
                    </h2>
                    <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                        Take our free AI health assessment to get personalized program recommendations.
                    </p>
                    <Link to="/ai-health-assessment">
                        <Button className="bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-90 text-white px-8 py-6 h-auto text-lg rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                            Start Free Assessment
                            <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
