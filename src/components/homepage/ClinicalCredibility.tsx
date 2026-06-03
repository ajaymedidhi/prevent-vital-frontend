import { ShieldCheck, FileCheck, Building2, Lock } from 'lucide-react';

const cards = [
  {
    icon: Lock,
    iconColor: 'text-primary',
    iconBg: 'bg-primary/8 ring-primary/15',
    title: 'Enterprise Security',
    description: 'ISO 27001 Certified & HIPAA Compliant. Your health data is always protected.',
    stat: '100%',
    statLabel: 'Data Protection',
    statColor: 'text-primary',
  },
  {
    icon: FileCheck,
    iconColor: 'text-accent',
    iconBg: 'bg-accent/8 ring-accent/15',
    title: 'Research Backed',
    description: 'Algorithms validated by peer-reviewed studies from leading medical institutions.',
    stat: '15+',
    statLabel: 'Publications',
    statColor: 'text-accent',
  },
  {
    icon: Building2,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50 ring-blue-100',
    title: 'Medical Partners',
    description: 'Collaborating with top hospitals across India for evidence-based prevention.',
    stat: '50+',
    statLabel: 'Hospitals',
    statColor: 'text-blue-600',
  },
];

// Temporarily hidden as per client request.
// Metrics will be updated and re-enabled once official numbers are finalized.
const ClinicalCredibility = () => null;

// const ClinicalCredibility = () => (
//   <section className="section-padding bg-background relative overflow-hidden">
//     {/* Background */}
//     <div className="absolute inset-0 z-0 opacity-[0.025]"
//       style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
//     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] pointer-events-none bg-primary/5"
//       style={{ width: 'clamp(18rem, 40vw, 34rem)', height: 'clamp(18rem, 40vw, 34rem)' }} />
// 
//     <div className="container-wide relative z-10">
// 
//       {/* Section header */}
//       <div className="text-center mb-14 space-y-4">
//         <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/6 border border-primary/15 rounded-full">
//           <ShieldCheck size={14} className="text-primary" />
//           <span className="text-xs font-semibold text-primary uppercase tracking-widest">Clinical Excellence</span>
//         </div>
//         <h2
//           id="clinical-credibility"
//           className="text-fluid-4xl font-semibold text-foreground tracking-tight text-balance"
//         >
//           Built on{' '}
//           <span className="gradient-text-soft">Trust & Science</span>
//         </h2>
//         <p className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//           Clinically validated by top institutions and secured by world-class standards.
//         </p>
//       </div>
// 
//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
//         {cards.map(({ icon: Icon, iconColor, iconBg, title, description, stat, statLabel, statColor }) => (
//           <div
//             key={title}
//             className="group bg-card border border-border rounded-2xl p-7 md:p-8 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
//             style={{ boxShadow: 'var(--shadow-sm)' }}
//           >
//             <div>
//               <div className={`w-12 h-12 ${iconBg} ring-1 ${iconColor} rounded-xl flex items-center justify-center mb-6`}>
//                 <Icon size={24} strokeWidth={2} />
//               </div>
//               <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
//               <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
//             </div>
// 
//             <div className="mt-8 pt-6 border-t border-border/60">
//               <div className={`text-fluid-4xl font-bold ${statColor}`}>{stat}</div>
//               <div className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-wider">{statLabel}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

export default ClinicalCredibility;
