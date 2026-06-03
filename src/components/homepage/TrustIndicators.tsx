import { ShieldCheck, GraduationCap, Users } from 'lucide-react';

const indicators = [
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description: 'ISO 27001 Certified & HIPAA Compliant. Your health data is always protected.',
    value: '100%',
    label: 'Data Protection',
    color: 'text-primary',
    bg: 'bg-primary/6',
    ring: 'ring-primary/15',
  },
  {
    icon: GraduationCap,
    title: 'Research Backed',
    description: 'Algorithms validated by peer-reviewed studies from leading medical institutions.',
    value: '15+',
    label: 'Publications',
    color: 'text-accent',
    bg: 'bg-accent/8',
    ring: 'ring-accent/15',
  },
  {
    icon: Users,
    title: 'Medical Partners',
    description: 'Collaborating with top hospitals across India for evidence-based prevention.',
    value: '50+',
    label: 'Hospitals',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    ring: 'ring-blue-100',
  },
];

// Temporarily hidden as per client request.
// Metrics will be updated and re-enabled once official numbers are finalized.
const TrustIndicators = () => null;

// const TrustIndicators = () => (
//   <section className="section-padding-sm bg-background relative z-30">
//     {/* Subtle top divider gradient */}
//     <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
// 
//     <div className="container-wide">
//       {/* Section label */}
//       <p className="text-center text-[11px] font-bold text-muted-foreground uppercase tracking-[0.18em] mb-10">
//         Trusted & Certified Healthcare Platform
//       </p>
// 
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
//         {indicators.map(({ icon: Icon, title, description, value, label, color, bg, ring }) => (
//           <div
//             key={title}
//             className="group bg-card border border-border rounded-2xl p-6 hover:-translate-y-1.5 transition-all duration-300 flex flex-col relative overflow-hidden"
//             style={{ boxShadow: 'var(--shadow-sm)' }}
//           >
//             {/* Subtle top accent line */}
//             <div className={`absolute top-0 inset-x-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${bg}`} />
// 
//             <div className={`w-12 h-12 ${bg} ${ring} ring-1 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
//               <Icon size={24} strokeWidth={2} />
//             </div>
// 
//             <h3 className="text-md font-bold text-foreground mb-2 leading-tight">
//               {title}
//             </h3>
// 
//             <p className="text-xs text-muted-foreground mb-6 leading-relaxed flex-grow">
//               {description}
//             </p>
// 
//             <div className="pt-4 border-t border-border/50 flex items-baseline gap-2">
//               <span className="text-2xl font-extrabold text-foreground tracking-tight">
//                 {value}
//               </span>
//               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
//                 {label}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

export default TrustIndicators;
