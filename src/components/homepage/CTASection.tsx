import { Link } from 'react-router-dom';
import { ArrowRight, Users, Shield, Activity, Clock } from 'lucide-react';

const stats = [
  { value: '5 min',  label: 'Assessment time', icon: Clock },
  { value: '24/7',   label: 'Monitoring',       icon: Activity },
  { value: '96%',    label: 'Satisfaction',      icon: Shield },
  { value: '50+',    label: 'Hospital partners', icon: Users },
];

const CTASection = () => {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--gradient-health)' }}
      aria-labelledby="cta-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="absolute top-0 left-1/4 rounded-full blur-[80px] pointer-events-none bg-white/5"
        style={{ width: 'clamp(16rem, 36vw, 36rem)', height: 'clamp(16rem, 36vw, 36rem)' }} />
      <div className="absolute bottom-0 right-1/4 rounded-full blur-[80px] pointer-events-none bg-accent/10"
        style={{ width: 'clamp(14rem, 28vw, 28rem)', height: 'clamp(14rem, 28vw, 28rem)' }} />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-6">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/15 rounded-full backdrop-blur-sm">
            <Shield size={12} className="text-emerald-300" />
            <span className="text-[10px] md:text-[11px] font-semibold text-white tracking-wide uppercase">Today Is a Fine Day to Start</span>
          </div>

          <h2
            id="cta-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.15] tracking-tight"
          >
            Your Future Self <span className="text-white/75">Will Thank You for This</span>
          </h2>

          <p className="text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed line-clamp-2 md:line-clamp-none mb-6">
            Five minutes today for a clearer picture of your health tomorrow. No commitment, just a starting point.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2 md:pt-4">
            <Link
              to="/ai-health-assessment"
              className="group inline-flex items-center gap-2 px-5 py-3 md:px-6 md:py-3.5 rounded-xl text-xs md:text-[13px] font-semibold bg-white text-brand-700 hover:bg-white/95 transition-all duration-200 hover:-translate-y-px"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
            >
              Get My Free Assessment
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/medical-professional-portal"
              className="inline-flex items-center gap-2 px-5 py-3 md:px-6 md:py-3.5 rounded-xl text-xs md:text-[13px] font-semibold text-white border border-white/20 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-200"
            >
              <Users size={14} />
              For Healthcare Providers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
