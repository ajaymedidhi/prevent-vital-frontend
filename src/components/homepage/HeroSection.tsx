import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Activity, Heart, Shield, Brain, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const APP_STORE_URL = 'https://apps.apple.com/in/app/prevent-vital/id6781125644';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.preventvital.app';

const AppleLogo = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#ffffff" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.415-3.13c.837-1.012 1.4-2.42 1.245-3.766-1.207.052-2.662.805-3.532 1.817-.78.887-1.454 2.32-1.273 3.622 1.297.104 2.622-.66 3.56-1.673z" />
  </svg>
);

const GooglePlayLogo = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
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

interface HeroSectionProps {
  className?: string;
}

const slides = [
  {
    overline: 'Your health, in plain language',
    titleBefore: 'Know Your Risk',
    titleHighlight: 'Before It Knows You',
    description:
      "Most heart and metabolic conditions give warning signs for years before anyone notices. We help you see yours early — and know exactly what to do about it.",
    cta: 'Get My Free Score',
    ctaLink: '/ai-health-assessment',
    secondaryCta: 'See How It Works',
    secondaryLink: '/disease-prevention-programs',
    tab: 'Your Score',
    icon: Shield,
    color: 'from-brand-800 to-brand-700',
    accentColor: '#0d9488',
  },
  {
    overline: 'Always quietly watching out for you',
    titleBefore: "You're Never",
    titleHighlight: 'Doing This Alone',
    description:
      'Connect a wearable you already own and let your everyday numbers — heart rate, steps, sleep — turn into gentle, timely nudges instead of after-the-fact regret.',
    cta: 'Connect My Device',
    ctaLink: '/disease-prevention-programs',
    secondaryCta: 'Learn More',
    secondaryLink: '/ai-health-assessment',
    tab: 'Everyday Care',
    icon: Activity,
    color: 'from-brand-900 to-brand-800',
    accentColor: '#0891b2',
  },
  {
    overline: 'Care that feels like care',
    titleBefore: 'Yoga, Breath, and',
    titleHighlight: 'a Little Help from AI',
    description:
      "Pair time-tested practices — yoga, pranayama, mindful movement — with a plan that's actually built around your body, not a generic routine.",
    cta: 'Explore Wellness Programs',
    ctaLink: '/disease-prevention-programs',
    secondaryCta: 'See Therapies',
    secondaryLink: '/disease-prevention-programs',
    tab: 'Whole-Person Care',
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
          paddingBottom: 'clamp(2rem, 1.5rem + 2vw, 3.5rem)',
          display: 'grid',
          alignItems: 'center',
        }}
      >
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] items-start gap-8 lg:gap-12 xl:gap-16">

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

            {/* Available on App Store / Google Play */}
            <div className="mt-10 pt-8 border-t border-border/50">
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] mb-3">
                Available On
              </p>
              <div className="flex items-center gap-3">
                {appBadges.map(({ name, href, Logo, eyebrow, title }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#12172a] hover:bg-[#1a2036] hover:-translate-y-px transition-all duration-200"
                    style={{ boxShadow: 'var(--shadow-md)' }}
                  >
                    <Logo />
                    <span className="text-left leading-none">
                      <span className="block text-[10px] font-semibold text-white/60 tracking-wide mb-1">{eyebrow}</span>
                      <span className="block text-lg font-bold text-white">{title}</span>
                    </span>
                  </a>
                ))}
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
