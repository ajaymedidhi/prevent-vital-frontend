import { Heart, Shield, Lightbulb, Users, Eye, ArrowRight, Sparkles, Activity, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const values = [
    {
        icon: Heart,
        title: 'Patient-first, always',
        description: 'Every decision we make is guided by what is best for the patient\'s long-term health and well-being.',
        iconStyle: 'bg-primary/10 text-primary',
    },
    {
        icon: Shield,
        title: 'Science with compassion',
        description: 'We combine rigorous medical evidence with genuine empathy and care for the human experience.',
        iconStyle: 'bg-accent/10 text-accent',
    },
    {
        icon: Lightbulb,
        title: 'Innovation with responsibility',
        description: 'We leverage cutting-edge technology responsibly to solve real healthcare challenges.',
        iconStyle: 'bg-primary/8 text-primary',
    },
    {
        icon: Users,
        title: 'Accessibility for all',
        description: 'We strive to make high-quality preventive care accessible to everyone, regardless of location.',
        iconStyle: 'bg-emerald-100 text-emerald-600',
    },
    {
        icon: Eye,
        title: 'Transparency & trust',
        description: 'We build trust through open communication, data privacy, and ethical practices.',
        iconStyle: 'bg-accent/10 text-accent',
    },
];

const stats = [
    { value: '10,000+', label: 'Patients Served' },
    { value: '50+',     label: 'Hospital Partners' },
    { value: '6,000+',  label: 'Patients by Founder' },
    { value: '96%',     label: 'Satisfaction Rate' },
];

const storyPoints = [
    'Chronic diseases silently progressing and detected too late — even in top hospitals.',
    'Founded by Dr. Rakesh Kumar, senior interventional cardiologist with 6,000+ patients treated.',
    'Shifting the paradigm from reactive "sick care" to proactive "health care".',
];

const AboutUs = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Helmet>
                <title>About Us | Building India's AI Preventive Healthcare Future - PreventVital</title>
                <meta name="description" content="Learn about PreventVital's mission to democratize preventive medicine in India. AI-powered technology, clinician-led programs, and holistic wellness approach to transform healthcare." />
                <meta name="keywords" content="about preventvital, preventive healthcare mission India, AI healthcare company, health tech startup India, preventive medicine platform" />
                <link rel="canonical" href="https://preventvital.com/about-us" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="PreventVital" />
                <meta property="og:url" content="https://preventvital.com/about-us" />
                <meta property="og:title" content="About PreventVital | Building India's AI Preventive Healthcare Future" />
                <meta property="og:description" content="PreventVital's mission: democratizing preventive medicine through AI-powered technology and holistic wellness in India." />
                <meta property="og:image" content="https://preventvital.com/og-about.jpg" />
                <meta property="og:locale" content="en_IN" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@preventvital" />
                <meta name="twitter:title" content="About PreventVital | India's AI Preventive Healthcare" />
                <meta name="twitter:description" content="Democratizing preventive medicine through AI-powered technology and holistic wellness." />
                <meta name="twitter:image" content="https://preventvital.com/og-about.jpg" />
                <script type="application/ld+json">{JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'AboutPage',
                    name: 'About PreventVital',
                    description: "PreventVital's mission to democratize preventive medicine in India through AI-powered technology",
                    url: 'https://preventvital.com/about-us',
                    isPartOf: { '@type': 'WebSite', url: 'https://preventvital.com/' },
                    about: {
                        '@type': 'Organization',
                        name: 'PreventVital',
                        url: 'https://preventvital.com/',
                        description: "India's AI-powered preventive healthcare platform",
                    },
                })}</script>
            </Helmet>

            <main className="flex-grow">

                {/* ── HERO ── */}
                <section
                    className="relative w-full overflow-hidden"
                    style={{ paddingTop: 'clamp(2.5rem, 1.8rem + 2.5vw, 4rem)', paddingBottom: 'clamp(2rem, 1.5rem + 2vw, 3rem)' }}
                    aria-labelledby="about-heading"
                >
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
                            className="space-y-4"
                        >
                            <div className="flex justify-center">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-border rounded-full shadow-xs">
                                    <Sparkles size={13} className="text-accent" />
                                    <span className="text-xs font-semibold text-primary tracking-wide">Our Story</span>
                                </div>
                            </div>

                            <h1
                                id="about-heading"
                                className="font-semibold leading-[1.15] tracking-tight text-foreground text-balance mx-auto"
                                style={{ fontSize: 'var(--fz-h1-sm)', maxWidth: '22ch' }}
                            >
                                Building the Future of{' '}
                                <span className="gradient-text-soft">Preventive Healthcare</span>{' '}
                                in India
                            </h1>

                            <p
                                className="text-muted-foreground leading-relaxed mx-auto"
                                style={{ fontSize: 'var(--fz-base)', maxWidth: '50ch' }}
                            >
                                Democratizing preventive medicine through AI-powered technology and holistic wellness — so every Indian can prevent disease before it begins.
                            </p>
                        </motion.div>

                        {/* Stats row */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-14 pt-10 border-t border-border/50">
                            {stats.map(({ value, label }) => (
                                <div key={label} className="space-y-0.5">
                                    <p className="font-bold text-foreground leading-none" style={{ fontSize: 'var(--fz-3xl)' }}>
                                        {value}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-medium">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── OUR STORY ── */}
                <section className="section-padding-sm bg-background">
                    <div className="container-wide">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                            {/* Left: text */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full mb-6">
                                    <Activity size={13} className="text-primary" />
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Our Story</span>
                                </div>
                                <h2 className="text-fluid-4xl font-bold text-foreground tracking-tight mb-6 leading-tight">
                                    Born from a gap in{' '}
                                    <span className="gradient-text-soft">India's healthcare</span>
                                </h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed" style={{ fontSize: 'var(--fz-lg)' }}>
                                    <p>
                                        PreventVital was founded after witnessing a recurring tragedy in Indian healthcare: chronic diseases silently progressing and being detected too late — even when patients had access to top hospitals.
                                    </p>
                                    <p>
                                        Founded by Dr. Rakesh Kumar, a senior interventional cardiologist with experience treating over 6,000 patients, PreventVital exists to change this narrative.
                                    </p>
                                    <p>
                                        We believe that with the right technology and timely intervention, most chronic diseases can be prevented before irreversible damage occurs.
                                    </p>
                                </div>
                            </div>

                            {/* Right: key points card */}
                            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                                <p className="text-xs font-bold text-foreground uppercase tracking-widest mb-2">What drives us</p>
                                {storyPoints.map((point, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle size={16} className="text-primary" />
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
                                    </div>
                                ))}

                                {/* Founder callout */}
                                <div
                                    className="mt-6 p-5 rounded-xl border"
                                    style={{ background: 'hsl(var(--primary) / 0.04)', borderColor: 'hsl(var(--primary) / 0.15)' }}
                                >
                                    <p className="text-sm font-bold text-foreground mb-1">Dr. Rakesh Kumar</p>
                                    <p className="text-xs text-muted-foreground">Senior Interventional Cardiologist · Founder, PreventVital</p>
                                    <p className="text-xs text-muted-foreground mt-2 italic leading-relaxed">
                                        "Prevention is not a luxury — it is the most powerful medicine we have. We just haven't delivered it at scale yet."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── MISSION & VISION ── */}
                <section className="section-padding-sm bg-muted/30">
                    <div className="container-wide">
                        <div className="text-center mb-12 space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full">
                                <Activity size={13} className="text-primary" />
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">Purpose</span>
                            </div>
                            <h2 className="text-fluid-4xl font-bold text-foreground tracking-tight">
                                Mission & Vision
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <div className="bg-card border border-border rounded-2xl p-8 space-y-4 hover:shadow-md transition-all duration-300">
                                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Heart size={22} className="text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground">Our Mission</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    To democratize preventive medicine in India through AI-powered technology and holistic wellness, making early detection and prevention accessible to all.
                                </p>
                            </div>

                            <div className="bg-card border border-border rounded-2xl p-8 space-y-4 hover:shadow-md transition-all duration-300">
                                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                                    <Eye size={22} className="text-accent" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground">Our Vision</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    A future where chronic diseases are rare because they are consistently detected and addressed early, leading to a healthier, more vibrant society.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CORE VALUES ── */}
                <section className="section-padding bg-background">
                    <div className="container-wide">
                        <div className="text-center mb-12 space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full">
                                <Activity size={13} className="text-primary" />
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">What We Stand For</span>
                            </div>
                            <h2 className="text-fluid-4xl font-bold text-foreground tracking-tight">
                                Core Values
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className="group bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all duration-300"
                                >
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${value.iconStyle} group-hover:scale-110 transition-transform duration-300`}>
                                        <value.icon size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section
                    className="section-padding relative overflow-hidden"
                    style={{ background: 'var(--gradient-health)' }}
                    aria-labelledby="about-cta-heading"
                >
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
                            backgroundSize: '28px 28px',
                        }}
                    />
                    <div
                        className="absolute top-0 left-1/4 rounded-full blur-[80px] pointer-events-none bg-white/5"
                        style={{ width: 'clamp(16rem, 36vw, 36rem)', height: 'clamp(16rem, 36vw, 36rem)' }}
                    />

                    <div className="container-wide relative z-10">
                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full backdrop-blur-sm">
                                <Shield size={13} className="text-emerald-300" />
                                <span className="text-xs font-semibold text-white/80 tracking-wide">Join the Movement</span>
                            </div>

                            <h2
                                id="about-cta-heading"
                                className="text-fluid-4xl font-semibold text-white leading-[1.15] tracking-tight"
                            >
                                Start Your Prevention{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
                                    Journey Today
                                </span>
                            </h2>

                            <p className="text-fluid-lg text-white/65 max-w-xl mx-auto leading-relaxed">
                                Join thousands of Indians who are taking control of their health with AI-powered preventive care.
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
    );
};

export default AboutUs;
