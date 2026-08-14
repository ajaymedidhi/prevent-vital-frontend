import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Activity, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const APP_STORE_URL = 'https://apps.apple.com/in/app/prevent-vital/id6781125644';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.preventvital.app';

const AppleLogo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.415-3.13c.837-1.012 1.4-2.42 1.245-3.766-1.207.052-2.662.805-3.532 1.817-.78.887-1.454 2.32-1.273 3.622 1.297.104 2.622-.66 3.56-1.673z" />
  </svg>
);

const GooglePlayLogo = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
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
    overline: 'Preventive Health,',
    titleBefore: 'Reclaim Your',
    titleHighlight: 'Vitality',
    description:
      "Preventvital helps people prevent health problems before they become serious using reactive methods",
    cta: 'Get My Free Score',
    ctaLink: '/ai-health-assessment',
    secondaryCta: 'See How It Works',
    secondaryLink: '/how-it-works',
    tab: 'Your Score',
    accentColor: '#dd298a', // Vibrant Magenta from Logo
    image: '/images/yoga_buddha_hero.png',
    mobileImage: '/images/yoga_buddha_mobile.png',
    imagePosition: 'center 50%',
    imagePositionMobile: 'center 40%',
  },
  {
    overline: 'Always quietly watching out for you',
    titleBefore: "You're Never",
    titleHighlight: 'Doing This Alone',
    description:
      'Connect your wearable to turn everyday metrics like heart rate and sleep into gentle, timely nudges.',
    cta: 'Connect My Device',
    ctaLink: '/disease-prevention-programs',
    secondaryCta: 'Learn More',
    secondaryLink: '/ai-health-assessment',
    tab: 'Everyday Care',
    accentColor: '#1d8cd4', // Cerulean Blue from Logo
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2070&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2070&q=80',
    imagePosition: 'center 50%',
    imagePositionMobile: 'center 40%',
  },
  {
    overline: 'Care that feels like care',
    titleBefore: 'Yoga, Breath, and',
    titleHighlight: 'a Little Help from AI',
    description:
      "Pair time-tested practices like yoga and mindfulness with a plan tailored specifically for your body.",
    cta: 'Explore Wellness Programs',
    ctaLink: '/disease-prevention-programs',
    secondaryCta: 'See Therapies',
    secondaryLink: '/disease-prevention-programs',
    tab: 'Whole-Person Care',
    accentColor: '#dd298a', // Vibrant Magenta from Logo
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=2069&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=2069&q=80',
    imagePosition: 'center 50%',
    imagePositionMobile: 'center 40%',
  },
];

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [current]);

  const slide = slides[current];

  return (
    <section
      className={`relative w-full overflow-hidden min-h-[100dvh] ${className}`}
      aria-labelledby="hero-heading"
    >
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
            src={slide.mobileImage || slide.image}
            alt=""
            className="block md:hidden w-full h-full object-cover"
            style={{ objectPosition: slide.imagePositionMobile }}
          />
          <img
            src={slide.image}
            alt=""
            className="hidden md:block w-full h-full object-cover"
            style={{ objectPosition: slide.imagePosition }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for mobile (bottom-heavy) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 md:hidden" />
      {/* Dark overlay for desktop (left-heavy and slight bottom-heavy) */}
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 container-wide w-full h-full flex flex-col min-h-[100dvh]">
        <div className="flex-1 flex items-end md:items-center">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 md:space-y-5"
              >
                <motion.div
                  className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold tracking-wider text-white uppercase backdrop-blur-md border border-white/20 mb-6"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span>{slide.overline}</span>
                </motion.div>

                <motion.h1
                  id="hero-heading"
                  className="font-display font-bold leading-[1.1] tracking-tight text-white text-4xl sm:text-5xl md:text-[64px] lg:text-[72px]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {slide.titleBefore}{' '}
                  <span className="italic font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{slide.titleHighlight}</span>
                </motion.h1>

                <motion.p
                  className="text-lg sm:text-xl text-white font-bold leading-relaxed max-w-xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >  {slide.description}
                </motion.p>

                <motion.div
                  className="hidden md:flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, duration: 0.5 }}
                >
                  <Link
                    to={slide.ctaLink}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md text-sm md:text-base font-bold text-foreground bg-white transition-all duration-300 hover:bg-slate-100 hover:shadow-xl hover:-translate-y-1"
                  >
                    {slide.cta}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to={slide.secondaryLink}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md text-sm md:text-base font-bold text-white border-2 border-white/30 hover:border-white transition-all duration-300 hover:bg-white/10"
                  >
                    {slide.secondaryCta}
                  </Link>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 pt-8"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34, duration: 0.5 }}
                >
                  <p className="text-xs font-bold text-white uppercase tracking-[0.2em] hidden sm:block">
                    Get the App
                  </p>
                  <div className="flex items-center gap-3">
                    {appBadges.map(({ name, href, Logo, eyebrow, title }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-950 hover:bg-slate-900 border border-white/30 hover:border-white/50 transition-all duration-200 shadow-md text-white"
                      >
                        <Logo />
                        <span className="text-left leading-none">
                          <span className="block text-[8px] font-bold text-white/90 tracking-wide mb-0.5">{eyebrow}</span>
                          <span className="block text-[11px] font-bold text-white">{title}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="pb-6 md:pb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-8 pt-6">
            <div className="hidden md:flex flex-wrap gap-x-6 gap-y-2">
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`relative pb-1.5 text-[11px] font-medium tracking-wide transition-colors duration-300 ${current === i ? 'text-white' : 'text-white/50 hover:text-white/80'
                    }`}
                  aria-current={current === i ? 'true' : undefined}
                >
                  {s.tab}
                  {current === i && (
                    <motion.span
                      layoutId="heroTab"
                      className="absolute bottom-0 left-0 right-0 h-px bg-white/70"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
