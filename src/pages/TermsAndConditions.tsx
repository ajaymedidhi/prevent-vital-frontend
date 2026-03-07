import React from 'react';
import { Scale, Shield, AlertTriangle, FileText, Activity, HeartPulse } from 'lucide-react';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-grow">
                {/* Colorful Hero Section */}
                <section className="pt-16 md:pt-24 pb-16 md:pb-24 bg-gradient-to-tr from-accent/10 via-primary/5 to-background border-b border-primary/10 relative overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>

                    <div className="container text-center max-w-4xl relative z-10">
                        <div className="inline-flex items-center justify-center p-4 bg-white/60 backdrop-blur-md rounded-2xl mb-8 shadow-sm text-primary border border-white/40">
                            <Scale className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-balance text-primary tracking-tight">
                            Terms & Conditions
                        </h1>
                        <p className="text-lg md:text-xl text-primary/70 leading-relaxed text-balance max-w-2xl mx-auto font-medium">
                            The legal agreements and operational guidelines for using the PreventalVital platform and services.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="pt-8 md:pt-12 pb-16 md:pb-24">
                    <div className="container max-w-4xl">
                        {/* Legal Meta Data Box */}
                        <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12 flex flex-col sm:flex-row gap-6 items-start justify-between relative overflow-hidden group hover:border-accent/30 transition-all duration-300">
                            <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
                                <FileText className="w-56 h-56 text-accent" />
                            </div>

                            <div className="relative z-10 w-full">
                                <div className="flex items-center gap-3 mb-6 border-b border-primary/10 pb-4">
                                    <Shield className="w-5 h-5 text-primary" />
                                    <h3 className="text-sm font-bold text-accent uppercase tracking-wider m-0">LEGAL DOCUMENT INFORMATION</h3>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 text-sm">
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Version</span><span className="font-bold text-foreground text-base">1.0</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Effective Date</span><span className="font-bold text-foreground text-base text-accent/80">March 1, 2026</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Company</span><span className="font-bold text-foreground text-base">gruentzig.ai Pvt Ltd</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Location</span><span className="font-bold text-foreground text-base">Hyderabad, India</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Contact</span><a href="mailto:info@preventvital.com" className="font-bold text-primary hover:text-accent transition-colors text-base">info@preventvital.com</a></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Website</span><a href="https://www.gruentzig.ai" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:text-accent transition-colors text-base">www.gruentzig.ai</a></div>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none space-y-12 text-foreground/80">

                            <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-l-4 border-accent p-6 rounded-r-2xl shadow-sm">
                                <p className="text-accent-foreground font-medium my-0 text-lg leading-relaxed text-foreground">
                                    <strong className="font-bold text-accent">Please Read Carefully:</strong> These Terms and Conditions ("Terms") govern your access to and use of the PreventalVital application, website, and related services. By creating an account or using our services, you agree to be bound by these Terms. If you do not agree, do not use PreventalVital.
                                </p>
                            </div>

                            <section>
                                <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                                    <h2 className="text-3xl font-bold text-primary m-0">Acceptance of Terms</h2>
                                </div>
                                <p className="mb-6 text-lg">By downloading, installing, or using PreventalVital ("the App", "Platform", "Service"), you represent that:</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white border border-border p-4 rounded-xl shadow-sm flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">✓</div>
                                        <span className="font-medium">You are at least 18 years of age</span>
                                    </div>
                                    <div className="bg-white border border-border p-4 rounded-xl shadow-sm flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">✓</div>
                                        <span className="font-medium">You have the legal capacity to enter into a binding agreement</span>
                                    </div>
                                    <div className="bg-white border border-border p-4 rounded-xl shadow-sm flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">✓</div>
                                        <span className="font-medium">All information you provide is accurate, complete, and truthful</span>
                                    </div>
                                    <div className="bg-white border border-border p-4 rounded-xl shadow-sm flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">✓</div>
                                        <span className="font-medium">You are using the Service for personal health monitoring purposes only</span>
                                    </div>
                                </div>
                                <p className="font-medium text-foreground/70 bg-secondary p-4 rounded-xl">These Terms apply to all users including patients, healthcare professionals using the platform in an advisory capacity, and any administrator accounts.</p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                                    <h2 className="text-3xl font-bold text-primary m-0">Description of Services</h2>
                                </div>
                                <p className="mb-6 text-lg">PreventalVital provides the following health monitoring and wellness services:</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                            <HeartPulse className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-primary mb-2">CVITAL Score™ Assessment</h3>
                                        <p className="text-sm">A proprietary cardiovascular risk scoring system (0–100) calculated across five domains. The CVITAL Score is an informational tool and does not constitute a medical diagnosis.</p>
                                    </div>
                                    <div className="bg-white border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                                            <Activity className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-accent mb-2">ASCVD Risk Calculation</h3>
                                        <p className="text-sm">Implementation of the ACC/AHA 2013 Pooled Cohort Equations for estimating 10-year atherosclerotic cardiovascular disease risk. Provided for informational purposes only.</p>
                                    </div>
                                </div>

                                <div className="bg-primary/5 rounded-2xl p-6 mt-6 border border-primary/10">
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 list-none pl-0 m-0">
                                        <li><strong className="text-primary block mb-1">Wellness Programs</strong>Structured health improvement programs including diabetes management, hypertension control, and lifestyle modification.</li>
                                        <li><strong className="text-primary block mb-1">Wearable Integration</strong>Integration with Apple HealthKit, Google Fit, Fitbit, Bluetooth BP monitors, and Dexcom CGMs.</li>
                                        <li><strong className="text-primary block mb-1">VITA AI Health Assistant</strong>An AI health assistant powered by Google Gemini 2.5 Flash for personalised health guidance.</li>
                                        <li><strong className="text-primary block mb-1">Health Alerts</strong>Automated alert system that triggers for clinically significant readings via push, SMS, and email.</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                                    <h2 className="text-3xl font-bold text-primary m-0">Medical Disclaimer</h2>
                                </div>

                                <div className="bg-destructive text-destructive-foreground p-8 rounded-3xl shadow-xl shadow-destructive/20 relative overflow-hidden my-8">
                                    <div className="absolute top-0 right-0 p-8 opacity-20">
                                        <AlertTriangle className="w-48 h-48" />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-3">
                                            <AlertTriangle className="w-8 h-8 animate-pulse" />
                                            NOT MEDICAL ADVICE
                                        </h3>
                                        <p className="text-lg font-medium text-white/90 mb-6 leading-relaxed">
                                            PreventalVital is a health information and wellness platform. It is NOT a medical device, does NOT provide medical advice, and is NOT a substitute for professional medical care.
                                        </p>
                                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
                                            <p className="font-bold text-white mb-3">You must NOT:</p>
                                            <ul className="list-none pl-0 space-y-3 m-0 text-white/90">
                                                <li className="flex items-start gap-3"><span className="text-white font-bold opacity-50 mt-1">✗</span> Use PreventalVital as a substitute for consulting a qualified healthcare professional</li>
                                                <li className="flex items-start gap-3"><span className="text-white font-bold opacity-50 mt-1">✗</span> Make medication changes based solely on information from this platform</li>
                                                <li className="flex items-start gap-3"><span className="text-white font-bold opacity-50 mt-1">✗</span> Delay seeking emergency medical care based on app data or alerts</li>
                                                <li className="flex items-start gap-3"><span className="text-white font-bold opacity-50 mt-1">✗</span> Rely on VITA AI responses for clinical decision-making</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold text-primary/80 text-center bg-primary/5 p-4 rounded-xl border border-primary/10">
                                    If you are experiencing a medical emergency, call emergency services (999 / 112 / 911) immediately. Always consult your physician before making changes to your health management.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-3 mb-6 mt-12">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">4</div>
                                    <h2 className="text-3xl font-bold text-primary m-0">Acceptable Use & Intellectual Property</h2>
                                </div>

                                <div className="space-y-8">
                                    <div className="bg-white border border-border p-6 rounded-2xl shadow-sm">
                                        <h3 className="text-xl font-bold text-primary mb-3">Intellectual Property Rights</h3>
                                        <p className="mb-4 text-foreground/80">All content, features, algorithms, and technology (including the CVITAL Score™ algorithm and VITA AI system prompts) are the exclusive property of gruentzig.ai Private Limited.</p>
                                        <div className="bg-accent/10 text-accent-foreground p-4 rounded-xl text-sm font-medium border border-accent/20">
                                            You retain ownership of your personal health data, but grant us a limited licence to process it for providing our services.
                                        </div>
                                    </div>

                                    <div className="bg-white border border-border p-6 rounded-2xl shadow-sm">
                                        <h3 className="text-xl font-bold text-primary mb-3">Prohibited Activities</h3>
                                        <p className="mb-4 text-foreground/80">You agree to use PreventalVital only for lawful purposes. You must not:</p>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none pl-0 m-0 text-sm">
                                            <li className="flex items-start gap-2 text-destructive/80 font-medium"><span className="mt-0.5">⊗</span> Provide false or fabricated health data</li>
                                            <li className="flex items-start gap-2 text-destructive/80 font-medium"><span className="mt-0.5">⊗</span> Attempt to disrupt other users' accounts</li>
                                            <li className="flex items-start gap-2 text-destructive/80 font-medium"><span className="mt-0.5">⊗</span> Upload malicious code or use bots</li>
                                            <li className="flex items-start gap-2 text-destructive/80 font-medium"><span className="mt-0.5">⊗</span> Reverse-engineer the platform or algorithms</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-primary text-primary-foreground p-8 rounded-3xl mt-12 shadow-xl shadow-primary/20">
                                <Scale className="w-12 h-12 text-accent mb-6" />
                                <h2 className="text-3xl font-bold text-white mb-6 m-0 border-none pb-0">Limitation of Liability & Indemnification</h2>

                                <p className="mb-6 text-primary-foreground/90 text-lg font-medium leading-relaxed bg-black/20 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                                    <strong>DISCLAIMER OF WARRANTIES:</strong> PreventalVital is provided "as is" and "as available" without warranties of any kind. We do not warrant that calculations will be accurate or suitable for any specific medical purpose.
                                </p>

                                <h3 className="text-xl font-bold text-accent mb-4">You agree to indemnify us from claims arising from:</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0 m-0 text-white/90">
                                    <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Your violation of these Terms</li>
                                    <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Your use or misuse of the platform</li>
                                    <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> False or inaccurate health information you provide</li>
                                    <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Your violation of any applicable laws</li>
                                </ul>
                            </section>

                        </div>

                        <div className="mt-16 pt-8 border-t-2 border-primary/10 text-center text-sm text-primary/60 font-medium pb-12">
                            <p>By using PreventalVital, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. Last updated: March 1, 2026.</p>
                            <p className="mt-2">These Terms and Conditions constitute a binding legal agreement between you and gruentzig.ai Private Limited. Effective Date: March 1, 2026 | Version 1.0</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default TermsAndConditions;
