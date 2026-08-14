import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    HeartPulse,
    ShieldCheck,
    Sparkles,
    Target,
    Users,
} from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { conditionPrograms } from '@/constants/conditionPrograms';

const howItWorks = [
    {
        title: 'Free VITAL Assessment',
        description: 'Complete a quick clinical assessment to establish your baseline risk profile.',
    },
    {
        title: 'Personalized Program Plan',
        description: 'Get matched to a program and session plan based on your specific risk factors.',
    },
    {
        title: 'Guided Weekly Sessions',
        description: 'Follow structured yoga, breathwork, nutrition, and physiotherapy sessions with progress tracking.',
    },
    {
        title: 'Reassess & Adjust',
        description: 'Retake your VITAL assessment to track improvement and adjust your plan over time.',
    },
];

const ProgramDetail = () => {
    const { id } = useParams<{ id: string }>();
    const program = conditionPrograms.find((p) => p.id === id);

    if (!program) {
        return <Navigate to="/disease-prevention-programs" replace />;
    }

    const relatedPrograms = conditionPrograms.filter((p) => p.id !== program.id).slice(0, 3);

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{program.title} Program | PreventVital</title>
                <meta name="description" content={program.tagline} />
                <link rel="canonical" href={`https://preventvital.com/disease-prevention-programs/${program.id}`} />
            </Helmet>

            {/* ── HERO ── */}
            <section className="relative w-full overflow-hidden">
                <div className="relative h-72 md:h-[26rem] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 z-10" />
                    <img
                        src={program.image}
                        alt={program.alt}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 z-20 flex items-end">
                        <div className="container-wide pb-10">
                            <Link
                                to="/disease-prevention-programs"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white mb-4 transition-colors"
                            >
                                <ArrowLeft size={15} />
                                All Programs
                            </Link>
                            <h1 className="text-fluid-3xl font-bold text-white tracking-tight max-w-2xl mb-3">
                                {program.title}
                            </h1>
                            <p className="text-white/85 max-w-xl leading-relaxed" style={{ fontSize: 'var(--fz-base)' }}>
                                {program.tagline}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="section-padding-sm bg-background">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-14">

                            {/* Overview */}
                            <div>
                                <h2 className="text-fluid-xl font-bold text-foreground mb-3">About this program</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {program.overview}
                                </p>
                            </div>

                            {/* Who it's for */}
                            <div>
                                <h2 className="text-fluid-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Users size={18} className="text-primary" />
                                    Who this program is for
                                </h2>
                                <ul className="space-y-3">
                                    {program.whoItsFor.map((item) => (
                                        <li key={item} className="flex items-start gap-2.5 text-muted-foreground leading-relaxed">
                                            <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* How it works */}
                            <div>
                                <h2 className="text-fluid-xl font-bold text-foreground mb-5 flex items-center gap-2">
                                    <Sparkles size={18} className="text-primary" />
                                    How the program works
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {howItWorks.map((step, index) => (
                                        <div key={step.title} className="flex gap-3 p-4 rounded-xl border border-border bg-card">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-foreground mb-1">{step.title}</h3>
                                                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Curriculum */}
                            <div>
                                <h2 className="text-fluid-xl font-bold text-foreground mb-5 flex items-center gap-2">
                                    <Target size={18} className="text-primary" />
                                    Program curriculum
                                </h2>
                                <div className="space-y-4">
                                    {program.curriculum.map((phase, index) => (
                                        <div key={phase.phase} className="relative pl-8">
                                            {index !== program.curriculum.length - 1 && (
                                                <div className="absolute left-[7px] top-6 bottom-[-1rem] w-px bg-border" />
                                            )}
                                            <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-primary" />
                                            <div className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
                                                {phase.phase}
                                            </div>
                                            <h3 className="text-sm font-bold text-foreground mb-1.5">{phase.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{phase.focus}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* What's included */}
                            <div>
                                <h2 className="text-fluid-xl font-bold text-foreground mb-4">What's included</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {program.includes.map((item) => (
                                        <div key={item} className="flex items-center gap-2 p-3 rounded-lg bg-muted/60 border border-border/60">
                                            <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                                            <span className="text-sm font-medium text-foreground">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Outcomes + risk factors */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <h2 className="text-fluid-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                        <HeartPulse size={17} className="text-primary" />
                                        What to expect
                                    </h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {program.outcomeFocus}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-fluid-lg font-bold text-foreground mb-3">Risk factors addressed</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {program.riskFactors.map((factor) => (
                                            <span
                                                key={factor}
                                                className="text-xs font-semibold px-2.5 py-1.5 bg-muted text-muted-foreground rounded-md border border-border/60 uppercase tracking-wide"
                                            >
                                                {factor}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* FAQs */}
                            <div>
                                <h2 className="text-fluid-xl font-bold text-foreground mb-2">Frequently asked questions</h2>
                                <Accordion type="single" collapsible className="w-full">
                                    {program.faqs.map((faq, index) => (
                                        <AccordionItem key={faq.question} value={`faq-${index}`}>
                                            <AccordionTrigger className="text-left text-sm font-semibold text-foreground">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>

                        {/* Sidebar summary card */}
                        <div className="lg:col-span-1">
                            <div
                                className="sticky top-24 bg-card border border-border rounded-2xl p-6 space-y-5"
                                style={{ boxShadow: 'var(--shadow-md)' }}
                            >
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Clock size={16} />
                                    <span>{program.duration} program</span>
                                </div>

                                <div className="pt-1 border-t border-border/60">
                                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 pt-4">
                                        Includes
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {program.includes.map((item) => (
                                            <span
                                                key={item}
                                                className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full font-medium"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    to="/ai-health-assessment"
                                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
                                    style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-sm)' }}
                                >
                                    Start Free Assessment
                                    <ArrowRight size={16} />
                                </Link>

                                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                                    Take the free VITAL assessment to see if this program is right for you.
                                </p>

                                <div className="flex items-start gap-2 pt-4 border-t border-border/60 text-xs text-muted-foreground leading-relaxed">
                                    <ShieldCheck size={15} className="flex-shrink-0 mt-0.5" />
                                    <span>
                                        This program supports lifestyle management alongside — not instead of — medical
                                        care. Consult your doctor before starting, especially with an existing diagnosis.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── RELATED PROGRAMS ── */}
            <section className="section-padding-sm bg-section-alt/30">
                <div className="container-wide">
                    <h2 className="text-fluid-xl font-bold text-foreground mb-6">Other programs you may consider</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPrograms.map((related) => (
                            <Link
                                key={related.id}
                                to={`/disease-prevention-programs/${related.id}`}
                                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="relative h-36 overflow-hidden">
                                    <img
                                        src={related.image}
                                        alt={related.alt}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                        {related.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                        {related.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProgramDetail;
