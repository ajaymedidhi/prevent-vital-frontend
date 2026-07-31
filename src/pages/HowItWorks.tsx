import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Sparkles,
    ArrowRight,
    ChevronRight,
    MessageCircle,
    CheckCircle2,
    Shield,
    ClipboardList,
    Gauge,
    Target,
    Smartphone,
    TrendingUp,
} from 'lucide-react';
import FadeInSection from '@/components/homepage/FadeInSection';

const APP_STORE_URL = 'https://apps.apple.com/in/app/prevent-vital/id6781125644';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.preventvital.app';

const AppleLogo = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff" aria-hidden="true">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.415-3.13c.837-1.012 1.4-2.42 1.245-3.766-1.207.052-2.662.805-3.532 1.817-.78.887-1.454 2.32-1.273 3.622 1.297.104 2.622-.66 3.56-1.673z" />
    </svg>
);

const GooglePlayLogo = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="#4285F4" d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-1.442V3.256c0-.554.225-1.055.609-1.442z" />
        <path fill="#34A853" d="M14.499 12.707l2.302 2.302-10.937 6.333 8.635-8.635z" />
        <path fill="#FBBC04" d="M17.698 9.509l2.807 1.626c.71.41 1.109.902 1.109 1.492s-.399 1.082-1.109 1.492l-2.807 1.626L15.401 12l2.297-2.29z" />
        <path fill="#EA4335" d="M6.363 1.658L17.298 8l-2.302 2.302L6.363 1.658z" />
    </svg>
);

const appBadges = [
    { name: 'App Store', href: APP_STORE_URL, Logo: AppleLogo, eyebrow: 'DOWNLOAD ON THE', title: 'App Store' },
    { name: 'Google Play', href: PLAY_STORE_URL, Logo: GooglePlayLogo, eyebrow: 'GET IT ON', title: 'Google Play' },
];

/* ── Step visual mockups — illustrative UI, mirrors real product data shapes
   (CVITAL 0–100 score, ASCVD %, vascular age) described in the product docs,
   not fabricated numbers presented as live user data. ── */

const QuestionnaireVisual = () => (
    <div className="bg-white rounded-3xl border border-border p-6 max-w-sm mx-auto w-full" style={{ boxShadow: 'var(--shadow-md)' }}>
        <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Section 3 of 9</p>
            <span className="text-xs font-bold text-primary">33%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
            <div className="h-full bg-primary rounded-full" style={{ width: '33%' }} />
        </div>
        <p className="text-sm font-bold text-foreground mb-4">Blood Pressure &amp; Vitals</p>
        <div className="space-y-3">
            {['Systolic BP', 'Diastolic BP', 'Resting Heart Rate'].map((label) => (
                <div key={label} className="flex items-center justify-between px-4 py-3 bg-muted/50 rounded-xl border border-border/60">
                    <span className="text-xs font-medium text-muted-foreground">{label}</span>
                    <div className="w-16 h-2 rounded-full bg-border" />
                </div>
            ))}
        </div>
    </div>
);

const ScoreVisual = () => (
    <div className="bg-white rounded-3xl border border-border p-6 max-w-sm mx-auto w-full" style={{ boxShadow: 'var(--shadow-md)' }}>
        <div className="flex items-center gap-5 mb-5">
            <div className="relative w-24 h-24 flex-shrink-0">
                <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="7" />
                    <circle
                        cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--accent))" strokeWidth="7"
                        strokeDasharray={`${0.82 * 2 * Math.PI * 40} ${2 * Math.PI * 40}`} strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-foreground leading-none">82</span>
                    <span className="text-[10px] text-muted-foreground">/ 100</span>
                </div>
            </div>
            <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">CVITAL Score</p>
                <p className="text-base font-bold text-foreground mt-0.5">Very Good</p>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50 border border-border/60">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">10-yr ASCVD Risk</p>
                <p className="text-sm font-bold text-foreground">4.2%</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50 border border-border/60">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Vascular Age</p>
                <p className="text-sm font-bold text-foreground">34 yrs</p>
            </div>
        </div>
    </div>
);

const PlanVisual = () => (
    <div className="bg-white rounded-3xl border border-border p-6 max-w-sm mx-auto w-full space-y-3" style={{ boxShadow: 'var(--shadow-md)' }}>
        {[
            { tier: 'Lower Risk', action: 'Wearable nudge toward Excellent', active: false },
            { tier: 'Moderate Risk', action: 'Targeted lifestyle changes', active: true },
            { tier: 'Higher Risk', action: 'Cardiac program + consultation', active: false },
        ].map((row) => (
            <div
                key={row.tier}
                className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${row.active ? 'bg-primary/6 border-primary/30' : 'border-border/60'}`}
            >
                <div>
                    <p className={`text-xs font-bold ${row.active ? 'text-primary' : 'text-foreground'}`}>{row.tier}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{row.action}</p>
                </div>
                {row.active && (
                    <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full flex-shrink-0">You</span>
                )}
            </div>
        ))}
    </div>
);

const TrendVisual = () => (
    <div className="bg-white rounded-3xl border border-border p-6 max-w-sm mx-auto w-full" style={{ boxShadow: 'var(--shadow-md)' }}>
        <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Score Trend</p>
            <span className="text-xs font-bold text-emerald-600">↑ 12 pts</span>
        </div>
        <svg viewBox="0 0 240 60" className="w-full h-14 mb-4" preserveAspectRatio="none">
            <path
                d="M0,50 L40,42 L80,44 L120,28 L160,24 L200,12 L240,8"
                fill="none" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/60">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <div className="min-w-0">
                <p className="text-xs font-bold text-foreground truncate">Wearable Connected</p>
                <p className="text-[10px] text-muted-foreground">Synced 2 minutes ago</p>
            </div>
        </div>
    </div>
);

const steps = [
    {
        tag: '5 minutes · No lab visit needed',
        title: 'Tell Us About You',
        description:
            'A quick questionnaire on vitals, lipids, glycaemic health, family history, and lifestyle — nothing here needs a clinic visit.',
        Visual: QuestionnaireVisual,
    },
    {
        tag: 'Instant · 0–100 scale',
        title: 'Meet Your CVITAL Score',
        description:
            'Your CVITAL score, 10-year ASCVD risk, and vascular age — calculated instantly with real ACC/AHA equations, not an invented metric.',
        Visual: ScoreVisual,
    },
    {
        tag: 'Personalized to your risk band',
        title: 'Get a Plan Matched to Your Score',
        description:
            'Higher risk opens a cardiac program and consultation. Moderate risk gets targeted changes. Lower risk gets a wearable nudge toward Excellent.',
        Visual: PlanVisual,
    },
];

const laterStep = {
    tag: 'Every 3 months, or live via wearable',
    title: 'Watch It Change',
    description:
        "Connect a wearable you already own and watch your score move with real daily data — reassess quarterly to confirm you're on track.",
    Visual: TrendVisual,
};

const quickSteps = [
    { anchor: '#step-1', label: 'Tell Us About You', tag: '5 min', Icon: ClipboardList },
    { anchor: '#step-2', label: 'Meet Your Score', tag: 'Instant', Icon: Gauge },
    { anchor: '#step-3', label: 'Get Your Plan', tag: 'Personalized', Icon: Target },
    { anchor: '#the-app', label: 'Download the App', tag: 'Free', Icon: Smartphone },
    { anchor: '#step-5', label: 'Watch It Change', tag: 'Ongoing', Icon: TrendingUp },
];

const appFeatures = [
    'Your CVITAL score, wearable data, and program sessions in one home screen',
    'VITA, your AI companion, already knows your score and check-ins',
    'Reminders for your next reassessment — nothing to remember yourself',
];

const PhoneMockup = () => (
    <div className="relative mx-auto" style={{ width: '270px' }}>
        <div
            className="relative rounded-[2.5rem] border-[6px] border-slate-900 bg-white overflow-hidden"
            style={{ boxShadow: 'var(--shadow-xl)', aspectRatio: '9 / 19' }}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-2xl z-20" />

            <div className="h-9" />

            <div className="px-5 pb-4 text-center">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Your CVITAL Score</p>
                <div className="relative w-28 h-28 mx-auto mt-3">
                    <svg viewBox="0 0 112 112" className="w-full h-full -rotate-90">
                        <circle cx="56" cy="56" r="46" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                        <circle
                            cx="56" cy="56" r="46" fill="none" stroke="hsl(var(--accent))" strokeWidth="8"
                            strokeDasharray={`${0.82 * 2 * Math.PI * 46} ${2 * Math.PI * 46}`} strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-foreground leading-none">82</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5">Very Good</span>
                    </div>
                </div>
            </div>

            <div className="px-4 space-y-2">
                <div className="p-3 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-foreground">Heart Rate</span>
                    <span className="text-[11px] font-bold text-foreground">72 BPM</span>
                </div>
                <div className="p-3 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-foreground">Today&apos;s Session</span>
                    <span className="text-[11px] font-bold text-primary">Morning Yoga</span>
                </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-3 border border-border" style={{ boxShadow: 'var(--shadow-md)' }}>
                <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-800 to-wellness-600 flex items-center justify-center flex-shrink-0">
                        <MessageCircle size={10} className="text-white" />
                    </div>
                    <p className="text-[11px] font-bold text-foreground">VITA</p>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-auto" />
                </div>
                <p className="text-[10px] text-foreground/80 leading-snug">Great walk today — want tomorrow&apos;s plan?</p>
            </div>
        </div>

        <div
            className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)' }}
        />
    </div>
);

const HowItWorks = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Helmet>
                <title>How It Works | Your 5-Step Path to Better Health - PreventVital</title>
                <meta
                    name="description"
                    content="See exactly how PreventVital works: a 5-minute assessment, your CVITAL score, a plan matched to your risk, the PreventVital app with VITA AI, and ongoing tracking as your score changes."
                />
                <link rel="canonical" href="https://preventvital.com/how-it-works" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="PreventVital" />
                <meta property="og:url" content="https://preventvital.com/how-it-works" />
                <meta property="og:title" content="How PreventVital Works | Your 5-Step Path to Better Health" />
                <meta property="og:description" content="From a 5-minute questionnaire to a wearable-connected app that tracks your risk over time." />
                <meta property="og:locale" content="en_IN" />
            </Helmet>

            <main className="flex-grow">
                {/* ── HERO ── */}
                <section
                    className="relative w-full overflow-hidden"
                    style={{ minHeight: 'clamp(480px, 62vh, 700px)' }}
                    aria-labelledby="how-it-works-heading"
                >
                    {/* Human-centric photography, matching the homepage hero treatment */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1614366483613-442f38491bf5?auto=format&fit=crop&w=2070&q=80"
                            alt=""
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 25%' }}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/40" />
                    <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

                    <div
                        className="container-wide relative z-10 text-center flex flex-col justify-center h-full"
                        style={{ minHeight: 'clamp(480px, 62vh, 700px)', paddingTop: 'clamp(3rem, 2.5rem + 2vw, 4.5rem)', paddingBottom: 'clamp(2.5rem, 2rem + 2vw, 3.5rem)' }}
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
                                    <span className="text-xs font-semibold text-white tracking-wide">How It Works</span>
                                </div>
                            </div>

                            <h1
                                id="how-it-works-heading"
                                className="font-semibold leading-[1.15] tracking-tight text-white text-balance mx-auto"
                                style={{ fontSize: 'var(--fz-h1-sm)', maxWidth: '26ch' }}
                            >
                                Your <span style={{ color: '#5eead4' }}>5-Step Path</span> to Better Health
                            </h1>

                            <p
                                className="text-white/80 leading-relaxed mx-auto"
                                style={{ fontSize: 'var(--fz-base)', maxWidth: '54ch' }}
                            >
                                From a 5-minute questionnaire to a wearable-connected app that watches your risk change over time — here's exactly what happens when you start with PreventVital.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                                <Link
                                    to="/ai-health-assessment"
                                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-900 bg-white transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                                    style={{ boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)' }}
                                >
                                    Get My Free Score
                                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <a
                                    href="#the-app"
                                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all duration-300"
                                >
                                    See the App
                                    <ChevronRight size={15} className="text-white/70 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── QUICK-SCAN STRIP — the whole journey in one glance ── */}
                <section className="bg-background border-b border-border/60">
                    <div className="container-wide">
                        <nav
                            aria-label="Jump to a step"
                            className="flex items-stretch gap-2 overflow-x-auto py-4 -mx-1 px-1 scrollbar-hide"
                        >
                            {quickSteps.map(({ anchor, label, tag, Icon }, i) => (
                                <a
                                    key={anchor}
                                    href={anchor}
                                    className="group flex items-center gap-2.5 flex-shrink-0 px-3.5 py-2 rounded-xl border border-border/60 hover:border-primary/40 hover:bg-muted/50 transition-all duration-200"
                                >
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/8 text-primary flex-shrink-0">
                                        <Icon size={14} />
                                    </span>
                                    <span className="text-left leading-tight whitespace-nowrap">
                                        <span className="block text-xs font-bold text-foreground">
                                            <span className="text-muted-foreground/70 mr-1">0{i + 1}</span>
                                            {label}
                                        </span>
                                        <span className="block text-[10px] text-muted-foreground">{tag}</span>
                                    </span>
                                </a>
                            ))}
                        </nav>
                    </div>
                </section>

                {/* ── STEPS 1–3 ── */}
                <section className="section-padding bg-background">
                    <div className="container-wide space-y-20 md:space-y-28">
                        {steps.map((step, index) => {
                            const Visual = step.Visual;
                            const isReversed = index % 2 === 1;
                            return (
                                <div key={step.title} id={`step-${index + 1}`} className="grid md:grid-cols-2 gap-10 md:gap-16 items-center scroll-mt-24">
                                    <FadeInSection className={isReversed ? 'md:order-2' : ''}>
                                        <span className="block text-7xl md:text-8xl font-extrabold text-primary/10 leading-none select-none">
                                            0{index + 1}
                                        </span>
                                        <div className="-mt-4 md:-mt-6">
                                            <span className="inline-flex px-2.5 py-1 rounded-full bg-accent/8 text-accent text-[11px] font-bold uppercase tracking-wide mb-3">
                                                {step.tag}
                                            </span>
                                            <h2 className="text-fluid-3xl font-bold text-foreground tracking-tight mb-3 leading-tight">
                                                {step.title}
                                            </h2>
                                            <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'var(--fz-lg)' }}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </FadeInSection>

                                    <FadeInSection delay={0.1} className={isReversed ? 'md:order-1' : ''}>
                                        <Visual />
                                    </FadeInSection>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── STEP 4: THE APP (showcase) ── */}
                <section id="the-app" className="section-padding bg-section-alt/30 relative overflow-hidden scroll-mt-20">
                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                    />
                    <div className="container-wide relative z-10">
                        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                            <FadeInSection>
                                <span className="block text-7xl md:text-8xl font-extrabold text-primary/10 leading-none select-none">
                                    04
                                </span>
                                <div className="-mt-4 md:-mt-6">
                                    <span className="inline-flex px-2.5 py-1 rounded-full bg-accent/8 text-accent text-[11px] font-bold uppercase tracking-wide mb-3">
                                        iOS &amp; Android · Free to start
                                    </span>
                                    <h2 className="text-fluid-3xl font-bold text-foreground tracking-tight mb-3 leading-tight">
                                        Download the App &amp; Meet VITA
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6" style={{ fontSize: 'var(--fz-lg)' }}>
                                        Everything from here on lives in the PreventVital app — your score, your program, your wearable data, and VITA, the AI companion that already knows your health story.
                                    </p>

                                    <ul className="space-y-3 mb-8">
                                        {appFeatures.map((item) => (
                                            <li key={item} className="flex items-start gap-3">
                                                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center gap-3">
                                        {appBadges.map(({ name, href, Logo, eyebrow, title }) => (
                                            <a
                                                key={name}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={name}
                                                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#12172a] hover:bg-[#1a2036] hover:-translate-y-px transition-all duration-200"
                                                style={{ boxShadow: 'var(--shadow-sm)' }}
                                            >
                                                <Logo />
                                                <span className="text-left leading-none">
                                                    <span className="block text-[9px] font-semibold text-white/60 tracking-wide mb-0.5">{eyebrow}</span>
                                                    <span className="block text-sm font-bold text-white">{title}</span>
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </FadeInSection>

                            <FadeInSection delay={0.15}>
                                <PhoneMockup />
                            </FadeInSection>
                        </div>
                    </div>
                </section>

                {/* ── STEP 5 ── */}
                <section id="step-5" className="section-padding bg-background scroll-mt-24">
                    <div className="container-wide">
                        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                            <FadeInSection>
                                <span className="block text-7xl md:text-8xl font-extrabold text-primary/10 leading-none select-none">
                                    05
                                </span>
                                <div className="-mt-4 md:-mt-6">
                                    <span className="inline-flex px-2.5 py-1 rounded-full bg-accent/8 text-accent text-[11px] font-bold uppercase tracking-wide mb-3">
                                        {laterStep.tag}
                                    </span>
                                    <h2 className="text-fluid-3xl font-bold text-foreground tracking-tight mb-3 leading-tight">
                                        {laterStep.title}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'var(--fz-lg)' }}>
                                        {laterStep.description}
                                    </p>
                                </div>
                            </FadeInSection>

                            <FadeInSection delay={0.1}>
                                <laterStep.Visual />
                            </FadeInSection>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section
                    className="section-padding relative overflow-hidden"
                    style={{ background: 'var(--gradient-health)' }}
                    aria-labelledby="how-it-works-cta-heading"
                >
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`, backgroundSize: '28px 28px' }}
                    />
                    <div
                        className="absolute top-0 left-1/4 rounded-full blur-[80px] pointer-events-none bg-white/5"
                        style={{ width: 'clamp(16rem, 36vw, 36rem)', height: 'clamp(16rem, 36vw, 36rem)' }}
                    />

                    <div className="container-wide relative z-10">
                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full backdrop-blur-sm">
                                <Shield size={13} className="text-emerald-300" />
                                <span className="text-xs font-semibold text-white/80 tracking-wide">Step One Takes 5 Minutes</span>
                            </div>

                            <h2 id="how-it-works-cta-heading" className="text-fluid-4xl font-semibold text-white leading-[1.15] tracking-tight">
                                Ready to Meet{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
                                    Your Score?
                                </span>
                            </h2>

                            <p className="text-fluid-lg text-white/65 max-w-xl mx-auto leading-relaxed">
                                No commitment, no judgment — just a clearer picture of your health, and a plan matched to it.
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

export default HowItWorks;
