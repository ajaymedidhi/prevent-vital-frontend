
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
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: 'var(--gradient-health)' }}
      aria-labelledby="cta-heading"
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Soft radial glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">

          {/* Overline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full backdrop-blur-sm">
            <Shield size={13} className="text-emerald-300" />
            <span className="text-xs font-semibold text-white/80 tracking-wide">Start Your Prevention Journey</span>
          </div>

          {/* Headline */}
          <h2
            id="cta-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[1.15] tracking-tight"
          >
            Take Control of Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
              Health Future Today
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-base md:text-lg text-white/65 max-w-xl mx-auto leading-relaxed">
            Join thousands of users who have transformed their health with AI-powered preventive care.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Link
              to="/ai-health-assessment"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold bg-white text-primary hover:bg-white/95 transition-all duration-200 hover:-translate-y-px"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
            >
              Start Free Assessment
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/medical-professional-portal"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-200"
            >
              <Users size={16} />
              For Healthcare Providers
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center space-y-1">
                <div className="flex justify-center mb-2">
                  <Icon size={16} className="text-white/40" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
                <div className="text-xs font-medium text-white/50 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
