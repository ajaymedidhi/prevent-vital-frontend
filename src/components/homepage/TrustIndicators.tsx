import { Heart, ShieldCheck, GraduationCap, Users } from 'lucide-react';

const indicators = [
  { icon: Heart,         value: '95%',       label: 'Health Improvement',  color: 'text-rose-600',   bg: 'bg-rose-50',    ring: 'ring-rose-100',    glow: 'shadow-glow-red'   },
  { icon: ShieldCheck,   value: 'ISO 27001',  label: 'Certified Security',  color: 'text-primary',    bg: 'bg-primary/6',  ring: 'ring-primary/15',  glow: 'shadow-glow-brand' },
  { icon: GraduationCap, value: '200+',       label: 'Medical Experts',     color: 'text-accent',     bg: 'bg-accent/8',   ring: 'ring-accent/15',   glow: 'shadow-glow-teal'  },
  { icon: Users,         value: '10,000+',    label: 'Patients Served',     color: 'text-blue-600',   bg: 'bg-blue-50',    ring: 'ring-blue-100',    glow: ''                  },
];

const TrustIndicators = () => (
  <section className="section-padding-sm bg-background relative z-30">
    {/* Subtle top divider gradient */}
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    <div className="container-wide">
      {/* Section label */}
      <p className="text-center text-[11px] font-bold text-muted-foreground uppercase tracking-[0.18em] mb-10">
        Trusted by India's leading healthcare institutions
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {indicators.map(({ icon: Icon, value, label, color, bg, ring }) => (
          <div
            key={label}
            className="group bg-card border border-border rounded-2xl p-6 hover:-translate-y-1.5 transition-all duration-300 text-center relative overflow-hidden"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            {/* Subtle top accent line */}
            <div className={`absolute top-0 inset-x-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${bg}`} />

            <div className={`w-12 h-12 ${bg} ${ring} ring-1 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <Icon size={24} strokeWidth={2} />
            </div>
            <div className="text-fluid-3xl font-bold text-foreground mb-1.5 tracking-tight">
              {value}
            </div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustIndicators;
