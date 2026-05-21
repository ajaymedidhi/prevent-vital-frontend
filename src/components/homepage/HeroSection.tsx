import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Activity, Heart, Shield, Brain, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSectionProps {
  className?: string;
}

const slides = [
  {
    overline: 'AI-Powered Prevention',
    titleBefore: 'Prevention is Better',
    titleHighlight: 'Than Cure',
    description:
      'Transform your health journey with predictive analytics that identify risks before they become problems.',
    cta: 'Start Free Assessment',
    ctaLink: '/ai-health-assessment',
    secondaryCta: 'View Programs',
    secondaryLink: '/disease-prevention-programs',
    tab: 'Prediction',
    icon: Shield,
    color: 'from-brand-800 to-brand-700',
    accentColor: '#0d9488',
  },
  {
    overline: 'Continuous Monitoring',
    titleBefore: 'Your Health,',
    titleHighlight: 'Predicted & Protected',
    description:
      'Real-time health tracking integrated with wearable devices, providing 24/7 insights into your wellness metrics.',
    cta: 'Explore Platform',
    ctaLink: '/disease-prevention-programs',
    secondaryCta: 'Learn More',
    secondaryLink: '/ai-health-assessment',
    tab: 'Monitoring',
    icon: Activity,
    color: 'from-brand-900 to-brand-800',
    accentColor: '#0891b2',
  },
  {
    overline: 'Holistic Wellness',
    titleBefore: 'Ancient Wisdom Meets',
    titleHighlight: 'AI Innovation',
    description:
      'Combine traditional yoga, meditation, and breathwork with modern AI-driven personalized health recommendations.',
    cta: 'Discover Therapies',
    ctaLink: '/disease-prevention-programs',
    secondaryCta: 'See Therapies',
    secondaryLink: '/disease-prevention-programs',
    tab: 'Therapy',
    icon: Brain,
    color: 'from-[#134e4a] to-brand-800',
    accentColor: '#14b8a6',
  },
];

const statsData = [
  { value: '10,000+', label: 'Patients Served', icon: Heart },
  { value: '50+',     label: 'Hospital Partners', icon: Shield },
  { value: '96%',     label: 'Satisfaction Rate', icon: Activity },
];

/* Health Dashboard Mock Widget */
const HealthDashboard = ({ accentColor }: { accentColor: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -12, scale: 0.97 }}
    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    className="relative bg-white/96 backdrop-blur-2xl border border-white/80 rounded-3xl p-5 w-[272px]"
    style={{ boxShadow: `0 24px 64px -12px ${accentColor}28, 0 8px 32px -4px rgba(15,30,60,0.12)` }}
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.12em] mb-0.5">PreventVital AI</p>
        <p className="text-sm font-bold text-slate-800">Health Overview</p>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-100">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold text-emerald-700">Live</span>
      </div>
    </div>

    {/* Health Score Ring */}
    <div className="flex items-center gap-4 p-3.5 bg-gradient-to-br from-slate-50 to-sky-50/40 rounded-2xl mb-3 border border-slate-100/60">
      <div className="relative w-[68px] h-[68px] flex-shrink-0">
        <svg viewBox="0 0 68 68" className="w-full h-full -rotate-90">
          <circle cx="34" cy="34" r="28" fill="none" stroke="#e8eef4" strokeWidth="5" />
          <circle
            cx="34" cy="34" r="28" fill="none"
            stroke={accentColor} strokeWidth="5"
            strokeDasharray={`${0.85 * 2 * Math.PI * 28} ${2 * Math.PI * 28}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-slate-800 leading-none">85</span>
          <span className="text-[8px] font-semibold text-slate-400">/ 100</span>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Health Score</p>
        <p className="text-sm font-bold text-slate-800 mt-0.5">Excellent</p>
        <div className="flex items-center gap-1 mt-1.5">
          <span className="text-[10px] font-bold text-emerald-500">↑ 4.2%</span>
          <span className="text-[10px] text-slate-400">this month</span>
        </div>
      </div>
    </div>

    {/* Vitals 2×2 Grid */}
    <div className="grid grid-cols-2 gap-1.5 mb-3">
      {[
        { label: 'Heart Rate',     value: '72 BPM',  dot: '#ef4444' },
        { label: 'Blood Pressure', value: '118/76',  dot: '#0d9488' },
        { label: 'SpO₂',           value: '98%',     dot: '#3b82f6' },
        { label: 'Glucose',        value: 'Normal',  dot: '#22c55e' },
      ].map((v) => (
        <div key={v.label} className="p-2.5 bg-white rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: v.dot }} />
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider truncate">{v.label}</span>
          </div>
          <span className="text-xs font-bold text-slate-700">{v.value}</span>
        </div>
      ))}
    </div>

    {/* AI Risk Assessment */}
    <div
      className="p-3 rounded-xl"
      style={{ backgroundColor: `${accentColor}0E`, border: `1px solid ${accentColor}1C` }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">AI Risk Score</span>
        <span
          className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: accentColor }}
        >
          Low Risk
        </span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: '18%', backgroundColor: accentColor }} />
      </div>
      <p className="text-[8px] text-slate-400 mt-1.5">18% probability · Updated just now</p>
    </div>
  </motion.div>
);

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section
      className={`relative w-full min-h-[700px] lg:min-h-[780px] overflow-hidden bg-background flex items-center ${className}`}
      aria-labelledby="hero-heading"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 healthcare-mesh" />

      {/* Subtle grid */}
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

      {/* Radial glow — shifts with slide */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 70% 40%, ${slide.accentColor}14 0%, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      {/* ── Right-side visual panel (desktop) ── */}
      <div className="absolute right-0 top-0 bottom-0 w-[42%] hidden lg:flex items-center justify-center pointer-events-none select-none">
        <div className="relative w-full h-full flex items-center justify-center">

          {/* Ambient glow behind widget */}
          <AnimatePresence>
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute w-[380px] h-[380px] rounded-full blur-[90px] pointer-events-none"
              style={{ background: `radial-gradient(circle, ${slide.accentColor}22 0%, transparent 70%)` }}
            />
          </AnimatePresence>

          {/* Health Dashboard Widget */}
          <AnimatePresence mode="wait">
            <HealthDashboard key={`dashboard-${current}`} accentColor={slide.accentColor} />
          </AnimatePresence>

          {/* Floating ambient badges */}
          <motion.div
            key={`badge-ai-${current}`}
            initial={{ opacity: 0, x: 16, y: -8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[18%] right-[8%] flex items-center gap-2 bg-white/92 backdrop-blur-md border border-white/70 rounded-xl px-3 py-2 shadow-md"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="text-[11px] font-bold text-slate-700">AI Monitoring</span>
          </motion.div>

          <motion.div
            key={`badge-doc-${current}`}
            initial={{ opacity: 0, x: -16, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.7, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[20%] left-[6%] flex items-center gap-2 bg-white/92 backdrop-blur-md border border-white/70 rounded-xl px-3 py-2 shadow-md"
          >
            <Heart size={12} className="text-rose-500 fill-rose-500 flex-shrink-0" />
            <span className="text-[11px] font-bold text-slate-700">Doctor Verified</span>
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container-wide w-full pt-24 md:pt-28 pb-16 lg:pt-32">
        <div className="max-w-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Overline badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-border rounded-full shadow-xs"
              >
                <Sparkles size={13} className="text-accent" />
                <span className="text-xs font-semibold text-primary tracking-wide">
                  {slide.overline}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                id="hero-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-foreground"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {slide.titleBefore}{' '}
                <span className="gradient-text-soft">{slide.titleHighlight}</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5 }}
              >
                {slide.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 pt-2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26, duration: 0.5 }}
              >
                <Link
                  to={slide.ctaLink}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                  style={{
                    background: 'hsl(var(--primary))',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  {slide.cta}
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to={slide.secondaryLink}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-foreground bg-white border border-border hover:bg-muted transition-all duration-300"
                >
                  {slide.secondaryCta}
                  <ChevronRight size={15} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>

              {/* Slide tabs */}
              <motion.div
                className="flex gap-5 pt-4 border-t border-border/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                {slides.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`relative pb-1.5 text-xs font-semibold tracking-wide transition-all duration-250 ${
                      current === i ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-current={current === i ? 'true' : undefined}
                  >
                    <span className="opacity-40 mr-1 text-[10px]">0{i + 1}</span>
                    {s.tab.toUpperCase()}
                    {current === i && (
                      <motion.span
                        layoutId="heroTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-border/50">
            {statsData.map(({ value, label }) => (
              <div key={label} className="space-y-0.5">
                <p className="text-2xl md:text-3xl font-bold text-foreground leading-none">
                  {value}
                </p>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
