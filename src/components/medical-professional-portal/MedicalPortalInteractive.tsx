
import { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import PatientCard from './PatientCard';
import AppointmentCard from './AppointmentCard';
import FeatureCard from './FeatureCard';
import ResearchCard from './ResearchCard';
import TestimonialCard from './TestimonialCard';
import {
    ShieldCheck,
    Home,
    Users,
    Calendar,
    GraduationCap,
    Video,
    UserPlus,
    FileBarChart,
    FileText,
    ArrowRight,
    Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Patient {
    id: number;
    name: string;
    age: number;
    condition: string;
    riskLevel: 'low' | 'medium' | 'high';
    lastVisit: string;
    nextAppointment: string;
    image: string;
    alt: string;
}

interface Appointment {
    id: number;
    patientName: string;
    time: string;
    type: string;
    status: 'scheduled' | 'in-progress' | 'completed';
}

interface Feature {
    icon: string;
    title: string;
    description: string;
    color: string;
}

interface Research {
    id: number;
    title: string;
    journal: string;
    date: string;
    category: string;
}

interface Testimonial {
    id: number;
    name: string;
    role: string;
    hospital: string;
    quote: string;
    image: string;
    alt: string;
}

export default function MedicalPortalInteractive() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'patients' | 'appointments' | 'research'>('dashboard');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    const stats = [
        { icon: 'users',    label: 'Active Patients',        value: '247', trend: '+12%', trendDirection: 'up'   as const },
        { icon: 'calendar', label: "Today's Appointments",   value: '18',  trend: '-2',   trendDirection: 'down' as const },
        { icon: 'medical',  label: 'Avg. Risk Reduction',    value: '38%', trend: '+5%',  trendDirection: 'up'   as const },
    ];

    const patients: Patient[] = [
        { id: 1, name: 'Rajesh Kumar',  age: 52, condition: 'Type 2 Diabetes',   riskLevel: 'medium', lastVisit: '15 Dec 2025', nextAppointment: '22 Dec 2025', image: "https://img.rocket.new/generatedImages/rocket_gen_img_120b5a424-1764871012824.png",  alt: 'Middle-aged Indian man' },
        { id: 2, name: 'Priya Sharma',  age: 45, condition: 'Hypertension',       riskLevel: 'low',    lastVisit: '18 Dec 2025', nextAppointment: '25 Dec 2025', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a6cc7b76-1763300209811.png",  alt: 'Indian woman in white coat' },
        { id: 3, name: 'Amit Patel',    age: 58, condition: 'Cardiac Risk',       riskLevel: 'high',   lastVisit: '19 Dec 2025', nextAppointment: '20 Dec 2025', image: "https://img.rocket.new/generatedImages/rocket_gen_img_18160d972-1763296688320.png",  alt: 'Senior Indian man' },
        { id: 4, name: 'Sneha Reddy',   age: 38, condition: 'Weight Management',  riskLevel: 'low',    lastVisit: '17 Dec 2025', nextAppointment: '24 Dec 2025', image: "https://img.rocket.new/generatedImages/rocket_gen_img_14e479cba-1763300676390.png",  alt: 'Young Indian woman' },
    ];

    const appointments: Appointment[] = [
        { id: 1, patientName: 'Rajesh Kumar',  time: '09:00 AM', type: 'Follow-up',     status: 'scheduled'   },
        { id: 2, patientName: 'Priya Sharma',  time: '10:30 AM', type: 'Consultation',  status: 'in-progress' },
        { id: 3, patientName: 'Amit Patel',    time: '11:45 AM', type: 'Emergency',     status: 'scheduled'   },
        { id: 4, patientName: 'Sneha Reddy',   time: '02:00 PM', type: 'Routine Check', status: 'scheduled'   },
        { id: 5, patientName: 'Vikram Singh',  time: '03:30 PM', type: 'Telemedicine',  status: 'scheduled'   },
    ];

    const features: Feature[] = [
        { icon: 'ChartBarIcon',          title: 'AI-Powered Risk Assessment', description: 'Advanced predictive analytics identify patient risks before symptoms appear, enabling proactive intervention strategies.', color: 'primary' },
        { icon: 'DevicePhoneMobileIcon', title: 'Real-Time Monitoring',       description: 'Continuous health data from wearables provides instant alerts for critical changes in patient vitals.',                     color: 'success' },
        { icon: 'DocumentTextIcon',      title: 'EHR Integration',            description: 'Seamless connectivity with existing electronic health records ensures comprehensive patient history access.',               color: 'accent'  },
        { icon: 'VideoCameraIcon',       title: 'Telemedicine Suite',         description: 'Secure video consultations with integrated prescription management and follow-up scheduling.',                               color: 'trust'   },
    ];

    const research: Research[] = [
        { id: 1, title: 'AI-Driven Diabetes Prevention: A 5-Year Longitudinal Study',              journal: 'Indian Journal of Medical Research',    date: 'Nov 2025', category: 'Diabetes'     },
        { id: 2, title: 'Predictive Analytics in Cardiac Risk Assessment: Clinical Validation',    journal: 'Journal of Preventive Cardiology',      date: 'Oct 2025', category: 'Cardiology'   },
        { id: 3, title: 'Integration of Yoga Therapy with Digital Health Monitoring',             journal: 'Complementary Medicine Research',       date: 'Sep 2025', category: 'Holistic Care' },
    ];

    const testimonials: Testimonial[] = [
        { id: 1, name: 'Dr. Anil Mehta',  role: 'Chief Cardiologist',  hospital: 'City Medical Center, Mumbai',  quote: 'PreventVital has transformed how I manage high-risk cardiac patients. The predictive alerts have prevented multiple emergency situations.', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe03ce7b-1763294977207.png", alt: 'Senior Indian male doctor' },
        { id: 2, name: 'Dr. Kavita Desai', role: 'Endocrinologist',    hospital: 'Fortis Healthcare, Delhi',     quote: 'The AI-powered insights help me personalize diabetes management plans with unprecedented precision. Patient outcomes have improved dramatically.',  image: "https://img.rocket.new/generatedImages/rocket_gen_img_100d9dcb9-1764892974318.png", alt: 'Indian female doctor' },
    ];

    const handleViewPatientDetails = (id: number) => alert(`Opening detailed records for Patient ID: ${id}`);
    const handleManageAppointment  = (id: number) => alert(`Managing appointment ID: ${id}`);

    if (!isReady) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-16 px-4">
                <div className="container-wide animate-pulse space-y-8">
                    <div className="h-12 bg-muted rounded-lg w-2/3" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => <div key={i} className="h-32 bg-muted rounded-xl" />)}
                    </div>
                </div>
            </div>
        );
    }

    const TabIcon = ({ icon, className }: { icon: string; className?: string }) => {
        switch (icon) {
            case 'HomeIcon':        return <Home        size={18} className={className} />;
            case 'UserGroupIcon':   return <Users       size={18} className={className} />;
            case 'CalendarIcon':    return <Calendar    size={18} className={className} />;
            case 'AcademicCapIcon': return <GraduationCap size={18} className={className} />;
            default: return null;
        }
    };

    const tabs = [
        { id: 'dashboard',   label: 'Dashboard',            icon: 'HomeIcon'        },
        { id: 'patients',    label: 'Patient Management',   icon: 'UserGroupIcon'   },
        { id: 'appointments',label: 'Appointments',         icon: 'CalendarIcon'    },
        { id: 'research',    label: 'Research & Education', icon: 'AcademicCapIcon' },
    ];

    return (
        <div className="min-h-screen bg-background">

            {/* ── HERO ── */}
            <section
                className="relative w-full overflow-hidden border-b border-border"
                style={{ paddingTop: 'clamp(2.5rem, 1.8rem + 2.5vw, 4rem)', paddingBottom: 'clamp(2rem, 1.5rem + 2vw, 3rem)' }}
                aria-labelledby="medical-portal-heading"
            >
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
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, hsl(var(--primary) / 0.08) 0%, transparent 70%)' }}
                />

                <div className="container-wide relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center space-y-4 mb-10"
                    >
                        <div className="flex justify-center">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-border rounded-full shadow-xs">
                                <Sparkles size={13} className="text-accent" />
                                <span className="text-xs font-semibold text-primary tracking-wide">Medical Professional Portal</span>
                            </div>
                        </div>

                        <h1
                            id="medical-portal-heading"
                            className="font-semibold leading-[1.15] tracking-tight text-foreground text-balance mx-auto"
                            style={{ fontSize: 'var(--fz-h1-sm)', maxWidth: '20ch' }}
                        >
                            Empower Your Practice with{' '}
                            <span className="gradient-text-soft">AI-Driven Patient Care</span>
                        </h1>

                        <p
                            className="text-muted-foreground leading-relaxed mx-auto"
                            style={{ fontSize: 'var(--fz-base)', maxWidth: '52ch' }}
                        >
                            Comprehensive patient management tools, clinical decision support, and telemedicine integration designed for modern healthcare professionals.
                        </p>
                    </motion.div>

                    {/* Stats grid */}
                    {/*
                    // Temporarily hidden as per client request.
                    // Metrics will be updated and re-enabled once official numbers are finalized.
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {stats.map((stat, index) => (
                            <StatsCard key={index} {...stat} />
                        ))}
                    </div>
                    */}
                </div>
            </section>

            {/* ── STICKY TABS ── */}
            <nav className="sticky top-[72px] z-40 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
                <div className="container-wide">
                    <div className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-foreground text-background shadow-sm'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                <TabIcon icon={tab.icon} className={activeTab === tab.id ? 'text-primary' : ''} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* ── CONTENT ── */}
            <main className="section-padding container-wide min-h-[600px]">

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="animate-fade-in-up">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left column */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Today's Schedule */}
                                <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                                    <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
                                        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                                            <Calendar size={18} className="text-primary" />
                                            Today's Schedule
                                        </h2>
                                        <button className="text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
                                            View Calendar
                                        </button>
                                    </div>
                                    <div className="divide-y divide-border">
                                        {appointments.slice(0, 3).map((appointment) => (
                                            <div key={appointment.id} className="group hover:bg-muted/30 transition-colors p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px] ring-2 ring-background shadow-sm">
                                                        {appointment.time}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-foreground text-sm">{appointment.patientName}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {appointment.type} ·{' '}
                                                            <span className={`capitalize ${appointment.status === 'in-progress' ? 'text-emerald-600 font-medium' : ''}`}>
                                                                {appointment.status}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleManageAppointment(appointment.id)}
                                                    className="px-4 py-2 bg-card border border-border text-foreground text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-muted shadow-sm"
                                                >
                                                    Manage
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 bg-muted/20 border-t border-border text-center">
                                        <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                            View all 18 appointments
                                        </button>
                                    </div>
                                </div>

                                {/* Platform Capabilities */}
                                <div>
                                    <h2 className="text-fluid-4xl font-bold text-foreground mb-6 tracking-tight">Platform Capabilities</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {features.map((feature, index) => (
                                            <FeatureCard key={index} feature={feature} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="space-y-6">
                                {/* Quick Actions */}
                                <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                                    <h2 className="text-base font-bold text-foreground mb-5">Quick Actions</h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { icon: Video,       label: 'Start Telemedicine', style: 'bg-primary/8 border-primary/15 text-primary'   },
                                            { icon: UserPlus,    label: 'Add Patient',         style: 'bg-emerald-50 border-emerald-100 text-emerald-600' },
                                            { icon: FileBarChart,label: 'Reports',             style: 'bg-amber-50 border-amber-100 text-amber-600'      },
                                            { icon: FileText,    label: 'Access EHR',          style: 'bg-accent/8 border-accent/15 text-accent'         },
                                        ].map(({ icon: Icon, label, style }) => (
                                            <button key={label} className={`p-4 rounded-xl border text-left hover:opacity-80 transition-all group ${style}`}>
                                                <Icon size={22} className="mb-3 group-hover:scale-110 transition-transform" />
                                                <span className="block text-xs font-bold text-foreground">{label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Critical Alerts */}
                                <div className="bg-foreground rounded-2xl text-background p-6 shadow-xl">
                                    <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                                        </span>
                                        Critical Alerts
                                    </h2>
                                    <div className="space-y-3">
                                        <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                                            <p className="text-xs font-semibold text-red-300 mb-1">High Risk Detected</p>
                                            <p className="text-xs text-white/60">Patient <span className="text-white font-bold">Amit Patel</span> approaching critical cardiac threshold.</p>
                                        </div>
                                        <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                                            <p className="text-xs font-semibold text-amber-300 mb-1">Missed Check-in</p>
                                            <p className="text-xs text-white/60">Patient <span className="text-white font-bold">Sneha Reddy</span> missed daily vitals log.</p>
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 py-2 text-xs font-bold text-white/40 hover:text-white/80 transition-colors border-t border-white/10 uppercase tracking-wider">
                                        View All Alerts
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Patients Tab */}
                {activeTab === 'patients' && (
                    <section className="animate-fade-in-up">
                        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                            <h2 className="text-fluid-4xl font-bold text-foreground tracking-tight">Patient Management</h2>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="Search patients..."
                                    className="px-4 py-2 border border-border rounded-lg text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
                                />
                                <button
                                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all"
                                    style={{ background: 'hsl(var(--primary))' }}
                                >
                                    Add New Patient
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {patients.map((patient) => (
                                <PatientCard key={patient.id} patient={patient} onViewDetails={handleViewPatientDetails} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                    <section className="animate-fade-in-up">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-fluid-4xl font-bold text-foreground tracking-tight">Appointment Management</h2>
                            <button
                                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all"
                                style={{ background: 'hsl(var(--primary))' }}
                            >
                                Schedule New
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {appointments.map((appointment) => (
                                <AppointmentCard key={appointment.id} appointment={appointment} onManage={handleManageAppointment} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Research Tab */}
                {activeTab === 'research' && (
                    <section className="animate-fade-in-up">
                        <h2 className="text-fluid-4xl font-bold text-foreground mb-10 pb-4 border-b border-border tracking-tight">
                            Research & Continuing Education
                        </h2>

                        <div className="mb-14">
                            <h3 className="text-base font-bold text-foreground mb-6 flex items-center gap-3">
                                <span className="w-1 h-5 bg-primary rounded-full" />
                                Latest Publications
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {research.map((item) => (
                                    <ResearchCard key={item.id} research={item} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-bold text-foreground mb-6 flex items-center gap-3">
                                <span className="w-1 h-5 bg-emerald-500 rounded-full" />
                                Peer Reviews
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {testimonials.map((testimonial) => (
                                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* ── CTA — matches homepage CTASection ── */}
            <section
                className="section-padding relative overflow-hidden"
                style={{ background: 'var(--gradient-health)' }}
                aria-labelledby="medical-cta-heading"
            >
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
                        backgroundSize: '28px 28px',
                    }}
                />
                <div
                    className="absolute top-0 left-1/4 rounded-full blur-[80px] pointer-events-none bg-white/5"
                    style={{ width: 'clamp(16rem, 36vw, 36rem)', height: 'clamp(16rem, 36vw, 36rem)' }}
                />

                <div className="container-wide relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full backdrop-blur-sm">
                            <ShieldCheck size={13} className="text-emerald-300" />
                            <span className="text-xs font-semibold text-white/80 tracking-wide">Join Our Medical Network</span>
                        </div>

                        <h2
                            id="medical-cta-heading"
                            className="text-fluid-4xl font-semibold text-white leading-[1.15] tracking-tight"
                        >
                            Ready to Transform{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
                                Your Practice?
                            </span>
                        </h2>

                        <p className="text-fluid-lg text-white/65 max-w-xl mx-auto leading-relaxed">
                            Join thousands of healthcare professionals using PreventVital to deliver superior patient outcomes through AI-powered preventive care.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <button
                                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold bg-white transition-all duration-300 hover:-translate-y-px hover:shadow-lg"
                                style={{ color: 'hsl(var(--primary))' }}
                            >
                                Request Demo
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-all duration-300">
                                Schedule Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
