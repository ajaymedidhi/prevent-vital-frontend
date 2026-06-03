import React, { useState, useEffect } from 'react';
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
  { value: '10,000+', label: 'Patients Served',   icon: Heart },
  { value: '50+',     label: 'Hospital Partners',  icon: Shield },
  { value: '96%',     label: 'Satisfaction Rate',  icon: Activity },
];

const widgetShell = (accentColor: string, children: React.ReactNode) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -12, scale: 0.97 }}
    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    className="relative bg-white/96 backdrop-blur-2xl border border-white/80 rounded-3xl p-6 w-[320px]"
    style={{ boxShadow: `0 24px 64px -12px ${accentColor}28, 0 8px 32px -4px rgba(15,30,60,0.12)` }}
  >
    {children}
  </motion.div>
);

/* ─── Slide 01: AI Risk Prediction ─── */
const PredictionWidget = ({ accentColor }: { accentColor: string }) =>
  widgetShell(accentColor, <>
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.12em] mb-0.5">PreventVital AI</p>
        <p className="text-sm font-bold text-slate-800">Risk Prediction</p>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-100">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold text-emerald-700">Active</span>
      </div>
    </div>

    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-slate-50 to-sky-50/40 rounded-2xl mb-3 border border-slate-100/60">
      <div className="relative w-[82px] h-[82px] flex-shrink-0">
        <svg viewBox="0 0 82 82" className="w-full h-full -rotate-90">
          <circle cx="41" cy="41" r="34" fill="none" stroke="#e8eef4" strokeWidth="6" />
          <circle cx="41" cy="41" r="34" fill="none" stroke={accentColor} strokeWidth="6"
            strokeDasharray={`${0.85 * 2 * Math.PI * 34} ${2 * Math.PI * 34}`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-slate-800 leading-none">85</span>
          <span className="text-[9px] font-semibold text-slate-400">/ 100</span>
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

    <div className="space-y-2.5 mb-3">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Condition Risk Breakdown</p>
      {[
        { label: 'Diabetes Risk', pct: 12, color: '#22c55e', level: 'Low' },
        { label: 'Cardiac Risk',  pct: 29, color: '#f59e0b', level: 'Moderate' },
        { label: 'Hypertension',  pct: 18, color: '#22c55e', level: 'Low' },
      ].map((r) => (
        <div key={r.label}>
          <div className="flex justify-between mb-1">
            <span className="text-[10px] font-semibold text-slate-600">{r.label}</span>
            <span className="text-[10px] font-bold" style={{ color: r.color }}>{r.level} · {r.pct}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
          </div>
        </div>
      ))}
    </div>

    <div className="p-2.5 rounded-xl flex items-center gap-2.5"
      style={{ backgroundColor: `${accentColor}0E`, border: `1px solid ${accentColor}1C` }}>
      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${accentColor}22` }}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke={accentColor} strokeWidth="1.5" opacity="0.4" />
          <path d="M7 4v3l2 1.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-[10px] font-semibold text-slate-700 leading-snug">
        AI analysed <span className="font-bold" style={{ color: accentColor }}>14 biomarkers</span> · Overall risk is low
      </p>
    </div>
  </>);

/* ─── Slide 02: Real-Time Monitoring ─── */
const MonitoringWidget = ({ accentColor }: { accentColor: string }) =>
  widgetShell(accentColor, <>
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.12em] mb-0.5">Wearable Sync</p>
        <p className="text-sm font-bold text-slate-800">Real-Time Monitoring</p>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 rounded-full border border-red-100">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-bold text-red-600">Recording</span>
      </div>
    </div>

    <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl mb-3 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Heart Rate</p>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold text-white leading-none">72</span>
            <span className="text-sm text-slate-400 mb-0.5">BPM</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-slate-400">Normal range</p>
          <p className="text-[10px] font-semibold text-emerald-400">60–100 BPM</p>
        </div>
      </div>
      <svg viewBox="0 0 240 44" className="w-full h-10" preserveAspectRatio="none">
        <path
          d="M0,22 L28,22 L34,22 L38,4 L42,40 L46,12 L50,22 L88,22 L94,22 L98,4 L102,40 L106,12 L110,22 L148,22 L154,22 L158,4 L162,40 L166,12 L170,22 L208,22 L214,22 L218,4 L222,40 L226,12 L230,22 L240,22"
          fill="none" stroke={accentColor} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </div>

    <div className="grid grid-cols-3 gap-2 mb-3">
      {[
        { label: 'Steps',      value: '8,432', sub: 'today', pct: 84, color: '#3b82f6' },
        { label: 'Active Min', value: '47',    sub: 'of 60', pct: 78, color: accentColor },
        { label: 'Calories',   value: '312',   sub: 'kcal',  pct: 52, color: '#f59e0b' },
      ].map((m) => (
        <div key={m.label} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">{m.label}</p>
          <p className="text-base font-bold text-slate-800 leading-none">{m.value}</p>
          <p className="text-[9px] text-slate-400 mt-0.5">{m.sub}</p>
          <div className="h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
          </div>
        </div>
      ))}
    </div>

    <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
      <div className="w-7 h-7 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="2" width="12" height="20" rx="3" />
          <path d="M12 18h.01" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-slate-700 truncate">Samsung Galaxy Watch</p>
        <p className="text-[9px] text-slate-400">Connected · Battery 84%</p>
      </div>
      <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
    </div>
  </>);

/* ─── Slide 03: Therapy & Wellness Program ─── */
const TherapyWidget = ({ accentColor }: { accentColor: string }) =>
  widgetShell(accentColor, <>
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.12em] mb-0.5">Wellness Program</p>
        <p className="text-sm font-bold text-slate-800">Your Therapy Plan</p>
      </div>
      <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 rounded-full border border-amber-100">
        <span className="text-[11px]">🔥</span>
        <span className="text-[10px] font-bold text-amber-700">12-Day Streak</span>
      </div>
    </div>

    <div className="p-4 bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-2xl mb-3 border border-slate-100/60">
      <div className="flex items-start justify-between mb-2.5">
        <div>
          <p className="text-sm font-bold text-slate-800">Diabetes Prevention</p>
          <p className="text-[11px] text-slate-500">Yoga & Breathwork · 8 Weeks</p>
        </div>
        <span className="text-[10px] font-bold text-white px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ backgroundColor: accentColor }}>
          Week 3
        </span>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full rounded-full"
            style={{ width: '38%', background: `linear-gradient(to right, ${accentColor}, ${accentColor}bb)` }} />
        </div>
        <span className="text-[11px] font-bold text-slate-600 flex-shrink-0">38%</span>
      </div>
    </div>

    <div className="mb-3">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Today's Sessions</p>
      <div className="space-y-2">
        {[
          { title: 'Morning Yoga',        duration: '30 min', done: true },
          { title: 'Pranayama Breathwork', duration: '20 min', done: false },
        ].map((s) => (
          <div key={s.title}
            className={`flex items-center gap-3 p-3 rounded-xl border ${
              s.done ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100'
            }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              s.done ? 'bg-emerald-500' : 'border-2 border-slate-200 bg-white'
            }`}>
              {s.done && (
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 12" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M2 6l3 3 5-5" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-bold truncate ${s.done ? 'text-emerald-800' : 'text-slate-700'}`}>
                {s.title}
              </p>
              <p className="text-[10px] text-slate-400">{s.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2">
      {[
        { label: 'Stress Level',  value: '↓ 42%', color: accentColor, bg: `${accentColor}12` },
        { label: 'Sleep Quality', value: '↑ 28%', color: '#3b82f6',   bg: '#3b82f612' },
      ].map((r) => (
        <div key={r.label} className="p-3 rounded-xl border border-slate-100 text-center"
          style={{ backgroundColor: r.bg }}>
          <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wide mb-1">{r.label}</p>
          <p className="text-base font-bold" style={{ color: r.color }}>{r.value}</p>
        </div>
      ))}
    </div>
  </>);

const WIDGETS = [PredictionWidget, MonitoringWidget, TherapyWidget];

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section
      className={`relative w-full overflow-hidden bg-background ${className}`}
      style={{ minHeight: 'clamp(620px, 80svh, 860px)' }}
      aria-labelledby="hero-heading"
    >
      {/* ── Background layers ── */}
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

      {/* ── Two-column grid — both columns anchored to the same container ── */}
      <div
        className="relative z-10 container-wide w-full h-full"
        style={{
          paddingTop:    'clamp(2.5rem, 2rem + 3vw, 5rem)',
          paddingBottom: 'clamp(3rem, 2rem + 4vw, 6rem)',
          display: 'grid',
          alignItems: 'center',
          minHeight: 'inherit',
        }}
      >
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] items-center gap-8 lg:gap-12 xl:gap-16">

          {/* ─── Left: text content ─── */}
          <div>
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
                  className="font-semibold leading-[1.1] tracking-tight text-foreground text-balance"
                  style={{ fontSize: 'var(--fz-h1)' }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  {slide.titleBefore}{' '}
                  <span className="gradient-text-soft">{slide.titleHighlight}</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  className="text-muted-foreground leading-relaxed"
                  style={{ fontSize: 'var(--fz-lg)', maxWidth: '42ch' }}
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
                    style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-md)' }}
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
            {/*
            // Temporarily hidden as per client request.
            // Metrics will be updated and re-enabled once official numbers are finalized.
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-border/50">
              {statsData.map(({ value, label }) => (
                <div key={label} className="space-y-0.5">
                  <p className="font-bold text-foreground leading-none" style={{ fontSize: 'var(--fz-3xl)' }}>
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">{label}</p>
                </div>
              ))}
            </div>
            */}

            {/* Platform security & compliance badges */}
            <div className="mt-10 pt-8 border-t border-border/50">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4">
                Platform Security & Trust
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Shield size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground leading-tight">ISO 27001 Certified</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Enterprise-grade data security</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Heart size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground leading-tight">Doctor Approved</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Clinical-grade health recommendations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right: widget — hidden on mobile, in-flow on desktop ─── */}
          <div className="hidden lg:flex items-center justify-center">
            {/* Wrapper provides the relative context for the ambient glow + floating badges */}
            <div className="relative flex items-center justify-center">

              {/* Ambient glow behind widget */}
              <AnimatePresence>
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="absolute w-[420px] h-[420px] rounded-full blur-[80px] pointer-events-none -z-10"
                  style={{ background: `radial-gradient(circle, ${slide.accentColor}22 0%, transparent 70%)` }}
                />
              </AnimatePresence>

              {/* Slide-specific dashboard widget */}
              <AnimatePresence mode="wait">
                {(() => { const W = WIDGETS[current]; return <W key={`widget-${current}`} accentColor={slide.accentColor} />; })()}
              </AnimatePresence>

              {/* Floating badge — top right of widget */}
              <motion.div
                key={`badge-ai-${current}`}
                initial={{ opacity: 0, x: 16, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-5 -right-10 flex items-center gap-2 bg-white/92 backdrop-blur-md border border-white/70 rounded-xl px-3 py-2 shadow-md pointer-events-none"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <span className="text-[11px] font-bold text-slate-700">AI Monitoring</span>
              </motion.div>

              {/* Floating badge — bottom left of widget */}
              <motion.div
                key={`badge-doc-${current}`}
                initial={{ opacity: 0, x: -16, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-5 -left-10 flex items-center gap-2 bg-white/92 backdrop-blur-md border border-white/70 rounded-xl px-3 py-2 shadow-md pointer-events-none"
              >
                <Heart size={12} className="text-rose-500 fill-rose-500 flex-shrink-0" />
                <span className="text-[11px] font-bold text-slate-700">Doctor Verified</span>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
