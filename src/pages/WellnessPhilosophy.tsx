import { Flower2, Wind, Brain, Apple, Smile, Sparkles, ArrowRight, Quote } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeInSection from "@/components/homepage/FadeInSection";

const components = [
    {
        icon: Flower2,
        title: "Yoga Therapy",
        description: "Disease-specific yoga protocols designed to improve flexibility, strength, and physiological function."
    },
    {
        icon: Brain,
        title: "Meditation & Mindfulness",
        description: "Guided practices to reduce stress, improve focus, and promote mental clarity and emotional balance."
    },
    {
        icon: Wind,
        title: "Breathwork (Pranayama)",
        description: "Controlled breathing techniques to regulate the nervous system and enhance respiratory health."
    },
    {
        icon: Apple,
        title: "Lifestyle & Nutrition",
        description: "Personalized dietary and lifestyle coaching to support your body's natural healing processes."
    },
    {
        icon: Smile,
        title: "Mental Health Support",
        description: "Compassionate support to address anxiety, depression, and the psychological aspects of chronic disease."
    }
];

const WellnessPhilosophy = () => {
    return (
        <>
        <Helmet>
            <title>Wellness Philosophy | Holistic Health Rooted in Science - PreventVital</title>
            <meta
                name="description"
                content="Explore PreventVital's wellness philosophy: integrating yoga therapy, meditation, breathwork (pranayama), nutrition, and mental health support with evidence-based medicine for complete holistic health."
            />
            <meta
                name="keywords"
                content="holistic wellness philosophy, yoga therapy, meditation for wellness, breathwork health, preventive wellness India, holistic health approach, traditional medicine modern science"
            />
            <link rel="canonical" href="https://preventvital.com/wellness-philosophy" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="PreventVital" />
            <meta property="og:url" content="https://preventvital.com/wellness-philosophy" />
            <meta property="og:title" content="Wellness Philosophy | Holistic Health Rooted in Science - PreventVital" />
            <meta property="og:description" content="PreventVital integrates yoga, meditation, breathwork, nutrition, and mental health support with modern medicine for complete holistic health." />
            <meta property="og:image" content="https://preventvital.com/og-wellness.jpg" />
            <meta property="og:locale" content="en_IN" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@preventvital" />
            <meta name="twitter:title" content="Wellness Philosophy | Holistic Health Rooted in Science - PreventVital" />
            <meta name="twitter:description" content="Integrating yoga, meditation, breathwork, nutrition, and mental health support with modern medicine." />
            <meta name="twitter:image" content="https://preventvital.com/og-wellness.jpg" />
        </Helmet>
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-grow">
                {/* ── HERO ── */}
                <section
                    className="relative w-full overflow-hidden"
                    style={{ minHeight: 'clamp(440px, 58vh, 640px)' }}
                    aria-labelledby="wellness-philosophy-heading"
                >
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2069&q=80"
                            alt=""
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 35%' }}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/40" />
                    <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

                    <div
                        className="container-wide relative z-10 text-center flex flex-col justify-center h-full"
                        style={{ minHeight: 'clamp(440px, 58vh, 640px)', paddingTop: 'clamp(3rem, 2.5rem + 2vw, 4.5rem)', paddingBottom: 'clamp(2.5rem, 2rem + 2vw, 3.5rem)' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-5"
                        >
                            <div className="flex justify-center">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                                    <Sparkles size={13} className="text-white" />
                                    <span className="text-xs font-semibold text-white tracking-wide">Our Philosophy</span>
                                </div>
                            </div>

                            <h1
                                id="wellness-philosophy-heading"
                                className="font-semibold leading-[1.15] tracking-tight text-white text-balance mx-auto"
                                style={{ fontSize: 'var(--fz-h1-sm)', maxWidth: '28ch' }}
                            >
                                Holistic Wellness, <span style={{ color: '#5eead4' }}>Rooted in Science</span> &amp; Tradition
                            </h1>

                            <p
                                className="text-white/80 leading-relaxed mx-auto"
                                style={{ fontSize: 'var(--fz-base)', maxWidth: '54ch' }}
                            >
                                We integrate time-tested ancient wellness practices with modern medical science to provide a truly holistic approach to health.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ── WHY BOTH: intro + supporting photo ── */}
                <section className="section-padding bg-background">
                    <div className="container-wide">
                        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                            <FadeInSection>
                                <span className="inline-flex px-2.5 py-1 rounded-full bg-accent/8 text-accent text-[11px] font-bold uppercase tracking-wide mb-4">
                                    Ancient Practice, Modern Evidence
                                </span>
                                <h2 className="text-fluid-3xl font-bold text-foreground tracking-tight mb-4 leading-tight">
                                    Neither alone is enough
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontSize: 'var(--fz-lg)' }}>
                                    A clinical risk score tells you where you stand. It doesn't teach your nervous system to calm down, or give you a daily practice you'll actually keep. That's where breathwork, yoga therapy, and mindfulness earn their place — not as alternatives to medicine, but as the daily discipline that makes the medicine work.
                                </p>
                                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'var(--fz-lg)' }}>
                                    Every practice below is chosen for a specific physiological reason, not because it's trendy — and every plan sits alongside your CVITAL score, not apart from it.
                                </p>
                            </FadeInSection>

                            <FadeInSection delay={0.15}>
                                <div className="relative rounded-3xl overflow-hidden border-4 border-card max-w-sm mx-auto" style={{ boxShadow: 'var(--shadow-lg)' }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&w=900&q=80"
                                        alt="Person practicing seated breathwork at home"
                                        loading="lazy"
                                        className="w-full h-full object-cover aspect-[4/5]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                                    <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4" style={{ boxShadow: 'var(--shadow-md)' }}>
                                        <div className="flex items-start gap-3">
                                            <Quote size={18} className="text-primary/40 flex-shrink-0 mt-0.5" fill="currentColor" />
                                            <p className="text-xs text-foreground/80 leading-relaxed">
                                                "10 minutes of pranayama, tracked alongside my score, changed how I handle stress more than anything else did."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                </section>

                {/* ── COMPONENTS GRID ── */}
                <section className="section-padding bg-section-alt/30">
                    <div className="container-wide">
                        <FadeInSection className="text-center mb-12">
                            <h2 className="text-fluid-3xl font-bold text-foreground tracking-tight mb-3 leading-tight">
                                The Five Pillars
                            </h2>
                            <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontSize: 'var(--fz-lg)' }}>
                                Each one shows up as a real, prescribed part of your plan — not a wellness buzzword.
                            </p>
                        </FadeInSection>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {components.map((item, index) => (
                                <FadeInSection key={item.title} delay={index * 0.08}>
                                    <div className="bg-card p-8 rounded-2xl border border-border h-full hover:-translate-y-1 transition-all duration-300 group" style={{ boxShadow: 'var(--shadow-sm)' }}>
                                        <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                                            <item.icon className="w-7 h-7 text-accent" />
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </FadeInSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section
                    className="section-padding relative overflow-hidden"
                    style={{ background: 'var(--gradient-health)' }}
                    aria-labelledby="wellness-philosophy-cta-heading"
                >
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`, backgroundSize: '28px 28px' }}
                    />
                    <div className="container-wide relative z-10">
                        <div className="max-w-2xl mx-auto text-center space-y-6">
                            <h2 id="wellness-philosophy-cta-heading" className="text-fluid-4xl font-semibold text-white leading-[1.15] tracking-tight">
                                See Where Your Practice{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
                                    Should Start
                                </span>
                            </h2>
                            <p className="text-fluid-lg text-white/65 max-w-xl mx-auto leading-relaxed">
                                Your CVITAL score points to which of these five pillars matters most for you, right now.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                                <Link
                                    to="/ai-health-assessment"
                                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold bg-white transition-all duration-300 hover:-translate-y-px hover:shadow-lg"
                                    style={{ color: 'hsl(var(--primary))' }}
                                >
                                    Get My Free Score
                                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <Link
                                    to="/disease-prevention-programs"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
                                >
                                    Explore Programs
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
        </>
    );
};

export default WellnessPhilosophy;
