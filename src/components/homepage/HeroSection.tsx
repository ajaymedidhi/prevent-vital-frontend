import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Heart, Shield, Activity, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface HeroSectionProps {
  className?: string;
}

/**
 * Background photography is Unsplash placeholder imagery (free-to-use, no
 * attribution required) chosen to preview the premium/editorial direction.
 * Swap `image` below for licensed or PreventVital-branded photography before
 * this ships to production.
 */
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
    secondaryLink: '/how-it-works',
    tab: 'Your Score',
    accentColor: '#2dd4bf',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=2069&q=80',
    imagePosition: 'center 20%',
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
    accentColor: '#38bdf8',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2070&q=80',
    imagePosition: 'center 30%',
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
    accentColor: '#5eead4',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=2069&q=80',
    imagePosition: 'center 35%',
  },
];

const trustBadges = [
  { icon: Heart, label: '10,000+ Patients Served' },
  { icon: Shield, label: 'ACC/AHA Clinically Grounded' },
  { icon: Activity, label: '96% Satisfaction Rate' },
];

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      style={{ minHeight: 'clamp(560px, 92vh, 880px)' }}
      aria-labelledby="hero-heading"
    >
      {/* ── Background photography, crossfaded per slide ── */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.1, ease: 'easeInOut' }, scale: { duration: 7, ease: 'easeOut' } }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: slide.imagePosition }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Darkening overlays for text legibility ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

      {/* ── Content ── */}
      <div
        className="relative z-10 container-wide w-full h-full flex flex-col"
        style={{ minHeight: 'clamp(560px, 92vh, 880px)' }}
      >
        <div className="flex-1 flex items-end md:items-center" style={{ paddingTop: 'clamp(3rem, 2.5rem + 2vw, 4.5rem)' }}>
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 md:space-y-6"
              >
                {/* Overline badge */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.4 }}
                  className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-3.5 md:py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
                >
                  <Sparkles size={12} className="text-white md:hidden" />
                  <Sparkles size={13} className="text-white hidden md:block" />
                  <span className="text-[11px] md:text-xs font-semibold text-white tracking-wide">
                    {slide.overline}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  id="hero-heading"
                  className="font-semibold leading-[1.15] md:leading-[1.1] tracking-tight text-white text-balance text-[1.75rem] sm:text-[2.25rem] md:text-[length:var(--fz-h1)]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  {slide.titleBefore}{' '}
                  <span style={{ color: slide.accentColor }}>{slide.titleHighlight}</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  className="text-white/80 leading-relaxed text-sm md:text-[length:var(--fz-lg)] line-clamp-2 md:line-clamp-none"
                  style={{ maxWidth: '42ch' }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.5 }}
                >
                  {slide.description}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-2.5 md:gap-3 pt-1 md:pt-2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, duration: 0.5 }}
                >
                  <Link
                    to={slide.ctaLink}
                    className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl text-xs md:text-sm font-semibold text-slate-900 bg-white transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                    style={{ boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)' }}
                  >
                    {slide.cta}
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    to={slide.secondaryLink}
                    className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl text-xs md:text-sm font-semibold text-white bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all duration-300"
                  >
                    {slide.secondaryCta}
                    <ChevronRight size={15} className="text-white/70 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>

                {/*
                // Temporarily hidden — unverified stats (patient count, satisfaction
                // rate). Re-enable once real, confirmed numbers are available.
                <motion.div
                  className="flex flex-wrap gap-2.5 pt-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.5 }}
                >
                  {trustBadges.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 backdrop-blur-md border border-white/15"
                    >
                      <Icon size={12} className="text-white/70" />
                      <span className="text-[11px] font-semibold text-white/85">{label}</span>
                    </div>
                  ))}
                </motion.div>
                */}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom bar: slide tabs + app store badges ── */}
        <div className="pb-8 md:pb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pt-6">
            {/* Slide tabs */}
            <div className="hidden md:flex flex-wrap gap-x-5 gap-y-2">
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`relative pb-1.5 text-xs font-semibold tracking-wide transition-all duration-250 ${
                    current === i ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                  aria-current={current === i ? 'true' : undefined}
                >
                  <span className="opacity-50 mr-1 text-[10px]">0{i + 1}</span>
                  {s.tab.toUpperCase()}
                  {current === i && (
                    <motion.span
                      layoutId="heroTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: slide.accentColor }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Available on App Store / Google Play */}
            <div>
              <p className="text-[9px] font-bold text-white/60 uppercase tracking-[0.15em] mb-2">
                Available On
              </p>
              <div className="flex items-center gap-2">
                {appBadges.map(({ name, href, Logo, eyebrow, title }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 hover:bg-black/55 hover:-translate-y-px transition-all duration-200"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
