
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Activity, Heart, Shield } from 'lucide-react';
import ProgramCard from './ProgramCard';
import { motion } from 'framer-motion';

interface Program {
    id: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    therapies: string[];
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
            duration: '8 weeks',
            category: 'prevention'
        },
        {
            id: 'yoga-therapy',
            title: 'Advanced Yoga Therapy',
            description: 'Deepen your practice with condition-specific asanas guided by expert therapists.',
            image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            alt: 'Yoga therapy',
            therapies: ['Hatha Yoga', 'Pranayama'],
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
            duration: '45 mins',
            category: 'therapy'
        }
    ];

    const filteredPrograms = programs.filter(p => p.category === activeTab);

    const stats = [
        { value: '500+', label: 'Guided Sessions', icon: Activity },
        { value: '50+',  label: 'Expert Instructors', icon: Shield },
        { value: '24/7', label: 'Access Anywhere', icon: Heart },
    ];

    return (
        <div className="min-h-screen bg-background">

            {/* ── HERO ── */}
            <section
                className="relative w-full overflow-hidden"
                style={{ paddingTop: 'clamp(3rem, 2rem + 4vw, 6rem)', paddingBottom: 'clamp(3rem, 2rem + 4vw, 6rem)' }}
                aria-labelledby="programs-heading"
            >
                {/* Same background layers as homepage hero */}
                <div className="absolute inset-0 healthcare-mesh" />
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `
                            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, hsl(var(--primary) / 0.08) 0%, transparent 70%)' }}
                />

                <div className="container-wide relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        {/* Overline — matches homepage badge style */}
                        <div className="flex justify-center">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-border rounded-full shadow-xs">
                                <Sparkles size={13} className="text-accent" />
                                <span className="text-xs font-semibold text-primary tracking-wide">
                                    Ancient Wisdom Meets AI Innovation
                                </span>
                            </div>
                        </div>

                        {/* Headline — same size as homepage hero h1 */}
                        <h1
                            id="programs-heading"
                            className="font-semibold leading-[1.1] tracking-tight text-foreground text-balance mx-auto"
                            style={{ fontSize: 'var(--fz-h1)', maxWidth: '18ch' }}
                        >
                            Transform Your Health with{' '}
                            <span className="gradient-text-soft">Holistic Wellness</span>
                        </h1>

                        {/* Description */}
                        <p
                            className="text-muted-foreground leading-relaxed mx-auto"
                            style={{ fontSize: 'var(--fz-lg)', maxWidth: '52ch' }}
                        >
                            Experience personalized therapeutic programs combining yoga, meditation, breathwork, and physiotherapy—all enhanced by AI-powered insights.
                        </p>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                            <Link
                                to="/ai-health-assessment"
                                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                                style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-md)' }}
                            >
                                Start Free Assessment
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats — same pattern as homepage hero */}
                    {/*
                    // Temporarily hidden as per client request.
                    // Metrics will be updated and re-enabled once official numbers are finalized.
                    <div className="grid grid-cols-3 gap-4 mt-12 pt-10 border-t border-border/50 max-w-lg mx-auto">
                        {stats.map(({ value, label }) => (
                            <div key={label} className="space-y-0.5">
                                <p className="font-bold text-foreground leading-none" style={{ fontSize: 'var(--fz-3xl)' }}>
                                    {value}
                                </p>
                                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                            </div>
                        ))}
                    </div>
                    */}
                </div>
            </section>

            {/* ── PROGRAMS SECTION ── */}
            <section className="section-padding bg-background">
                <div className="container-wide">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                        <h2 className="text-fluid-4xl font-bold text-foreground tracking-tight">
                            Explore Programs
                        </h2>

                        {/* Tabs — matches homepage card active/inactive pattern */}
                        <div className="bg-muted p-1 rounded-lg inline-flex self-start md:self-auto">
                            <button
                                onClick={() => setActiveTab('prevention')}
                                className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-300 ${
                                    activeTab === 'prevention'
                                        ? 'bg-card text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Disease Prevention
                            </button>
                            <button
                                onClick={() => setActiveTab('therapy')}
                                className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-300 ${
                                    activeTab === 'therapy'
                                        ? 'bg-card text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Therapeutic Sessions
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPrograms.map((program) => (
                            <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ProgramCard
                                    {...program}
                                    onClick={() => {}}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA SECTION — matches homepage CTASection ── */}
            <section
                className="section-padding relative overflow-hidden"
                style={{ background: 'var(--gradient-health)' }}
                aria-labelledby="programs-cta-heading"
            >
                {/* Pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
                        backgroundSize: '28px 28px',
                    }}
                />
                <div className="absolute top-0 left-1/4 rounded-full blur-[80px] pointer-events-none bg-white/5"
                    style={{ width: 'clamp(16rem, 36vw, 36rem)', height: 'clamp(16rem, 36vw, 36rem)' }} />

                <div className="container-wide relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full backdrop-blur-sm">
                            <Shield size={13} className="text-emerald-300" />
                            <span className="text-xs font-semibold text-white/80 tracking-wide">Start Your Prevention Journey</span>
                        </div>

                        <h2
                            id="programs-cta-heading"
                            className="text-fluid-4xl font-semibold text-white leading-[1.15] tracking-tight"
                        >
                            Ready to Start Your{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
                                Wellness Journey?
                            </span>
                        </h2>

                        <p className="text-fluid-lg text-white/65 max-w-xl mx-auto leading-relaxed">
                            Take our free AI health assessment to get personalized program recommendations.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                            <Link
                                to="/ai-health-assessment"
                                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold bg-white transition-all duration-300 hover:-translate-y-px hover:shadow-lg"
                                style={{ color: 'hsl(var(--primary))' }}
                            >
                                Start Free Assessment
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
