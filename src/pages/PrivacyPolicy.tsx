import React from 'react';
import { Shield, FileText, AlertTriangle, Lock, Activity, Globe, Scale } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-grow">
                {/* Colorful Hero Section */}
                <section className="pt-16 md:pt-24 pb-16 md:pb-24 bg-gradient-to-br from-primary/10 via-accent/10 to-background border-b border-primary/10 relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

                    <div className="container text-center max-w-4xl relative z-10">
                        <div className="inline-flex items-center justify-center p-4 bg-white/60 backdrop-blur-md rounded-2xl mb-8 shadow-sm text-accent border border-white/40">
                            <Shield className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-balance tracking-tight text-primary">
                            Privacy Policy
                        </h1>
                        <p className="text-lg md:text-xl text-primary/70 leading-relaxed text-balance max-w-2xl mx-auto font-medium">
                            How PreventalVital (gruentzig.ai Private Limited) collects, uses, shares, and protects your personal and health information.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="pt-8 md:pt-12 pb-16 md:pb-24">
                    <div className="container max-w-4xl">
                        {/* Legal Meta Data Box */}
                        <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12 flex flex-col sm:flex-row gap-6 items-start justify-between relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
                            <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
                                <FileText className="w-56 h-56 text-primary" />
                            </div>

                            <div className="relative z-10 w-full">
                                <div className="flex items-center gap-3 mb-6 border-b border-primary/10 pb-4">
                                    <Lock className="w-5 h-5 text-accent" />
                                    <h3 className="text-sm font-bold text-primary uppercase tracking-wider m-0">Document Information</h3>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 text-sm">
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Version</span><span className="font-bold text-foreground text-base">1.0</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Effective Date</span><span className="font-bold text-foreground text-base text-primary/80">March 1, 2026</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Company</span><span className="font-bold text-foreground text-base">gruentzig.ai Pvt Ltd</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Location</span><span className="font-bold text-foreground text-base">Hyderabad, India</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Contact</span><a href="mailto:info@preventvital.com" className="font-bold text-accent hover:text-primary transition-colors text-base">info@preventvital.com</a></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Website</span><a href="https://www.gruentzig.ai" target="_blank" rel="noopener noreferrer" className="font-bold text-accent hover:text-primary transition-colors text-base">www.gruentzig.ai</a></div>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none space-y-12 text-foreground/80">

                            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary p-6 rounded-r-2xl shadow-sm">
                                <p className="text-primary font-medium my-0 text-lg leading-relaxed">
                                    <strong className="font-bold text-primary">Important Notice:</strong> This Privacy Policy describes how PreventalVital Health Technologies collects, uses, shares, and protects your personal and health information when you use our mobile application, web platform, and associated services. By using PreventalVital, you consent to the practices described in this policy. Please read this carefully.
                                </p>
                            </div>

                            <section>
                                <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                                    <h2 className="text-3xl font-bold text-primary m-0">Information We Collect</h2>
                                </div>
                                <p className="mb-6 text-lg">We collect the following categories of information to provide and improve our cardiovascular health monitoring services:</p>

                                <div className="space-y-8">
                                    <div className="bg-white border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                                            1.1 Personal Identification Information
                                        </h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none pl-0 m-0">
                                            <li className="flex items-start gap-2"><span className="text-accent mt-1">•</span> Full name, date of birth, age, and biological sex</li>
                                            <li className="flex items-start gap-2"><span className="text-accent mt-1">•</span> Email address and mobile phone number</li>
                                            <li className="flex items-start gap-2"><span className="text-accent mt-1">•</span> Account credentials (encrypted passwords)</li>
                                            <li className="flex items-start gap-2"><span className="text-accent mt-1">•</span> Profile photograph (optional)</li>
                                            <li className="flex items-start gap-2"><span className="text-accent mt-1">•</span> Country and region of residence</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gradient-to-br from-accent/5 to-white border border-accent/20 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
                                            <Activity className="w-5 h-5" />
                                            1.2 Health and Medical Information
                                        </h3>
                                        <p className="mb-4 font-medium text-foreground/70">We collect sensitive health data that you voluntarily provide through our assessment questionnaire and connected devices. This includes:</p>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 list-none pl-0 m-0">
                                            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Cardiovascular risk assessment responses</li>
                                            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Blood pressure readings</li>
                                            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Heart rate and HRV</li>
                                            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Blood glucose and HbA1c levels</li>
                                            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Cholesterol, HDL, LDL, triglycerides</li>
                                            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Weight, BMI, body composition</li>
                                            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> SpO2 and respiratory rate</li>
                                            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Sleep duration and quality</li>
                                            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Physical activity & exercise history</li>
                                            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Medication adherence logs</li>
                                            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Dietary habits & smoking status</li>
                                            <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Symptoms and mental health indicators</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                                            1.3 Computed Health Scores & Device Data
                                        </h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none pl-0 m-0">
                                            <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> <span className="font-semibold text-foreground">CVITAL Score™</span> (proprietary cardiovascular vitality index, 0–100)</li>
                                            <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> <span className="font-semibold text-foreground">ASCVD 10-year risk</span> percentage (ACC/AHA methodology)</li>
                                            <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> <span className="font-semibold text-foreground">Apple HealthKit & Google Fit</span> activity metrics (with permission)</li>
                                            <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> <span className="font-semibold text-foreground">Bluetooth Devices</span> (BP monitors, continuous glucose monitors)</li>
                                        </ul>
                                    </div>

                                    <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl shadow-sm text-primary/90">
                                        <h3 className="text-xl font-bold text-primary mb-3">1.4 AI Chat Interactions</h3>
                                        <p className="m-0">When you interact with <strong>VITA AI</strong> (our Gemini-powered health assistant), we collect and store your conversation history to provide contextual, personalised responses. Conversations are associated with your account and may be reviewed for safety and quality improvement purposes.</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                                    <h2 className="text-3xl font-bold text-primary m-0">How We Use Your Information</h2>
                                </div>
                                <p className="mb-6 text-lg">We use your information exclusively for the purposes described below. <strong className="text-accent font-bold bg-accent/10 px-2 py-1 rounded">We do not sell your personal or health data to third parties.</strong></p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white border border-border p-6 rounded-2xl shadow-sm">
                                        <h3 className="text-xl font-bold text-primary mb-3">2.1 Primary Health Services</h3>
                                        <ul className="list-disc pl-5 space-y-2 marker:text-accent font-medium text-foreground/80">
                                            <li>Calculate your personalised CVITAL Score™</li>
                                            <li>Generate AI-powered health summaries</li>
                                            <li>Recommend relevant wellness programs</li>
                                            <li>Trigger clinical alerts for dangerous readings</li>
                                            <li>Generate reports for your physician</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white border border-border p-6 rounded-2xl shadow-sm">
                                        <h3 className="text-xl font-bold text-primary mb-3">2.2 Platform Improvement</h3>
                                        <ul className="list-disc pl-5 space-y-2 marker:text-accent font-medium text-foreground/80">
                                            <li>Analyse aggregated usage patterns</li>
                                            <li>Debug technical issues & optimise app performance</li>
                                            <li>Improve the accuracy of CVITAL Score™ calculations</li>
                                            <li>Enhance VITA AI responses based on patterns</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                                    <h2 className="text-3xl font-bold text-primary m-0">Data Sharing and Third Parties</h2>
                                </div>
                                <p className="mb-6">We share your data only in the following limited circumstances with trusted third-party providers who process data on our behalf under strict data processing agreements:</p>

                                <div className="overflow-x-auto rounded-2xl border border-primary/10 shadow-md mb-8">
                                    <table className="min-w-full divide-y divide-primary/10 text-sm text-left">
                                        <thead className="bg-primary text-white">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 font-bold uppercase tracking-wider">Provider</th>
                                                <th scope="col" className="px-6 py-4 font-bold uppercase tracking-wider">Service</th>
                                                <th scope="col" className="px-6 py-4 font-bold uppercase tracking-wider">Data Shared</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-border font-medium text-foreground/80">
                                            <tr className="hover:bg-primary/5 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap font-bold text-primary">MongoDB Atlas</td>
                                                <td className="px-6 py-4 whitespace-nowrap">Database hosting</td>
                                                <td className="px-6 py-4">All account & health data (encrypted)</td>
                                            </tr>
                                            <tr className="hover:bg-primary/5 transition-colors bg-secondary/30">
                                                <td className="px-6 py-4 whitespace-nowrap font-bold text-primary">Firebase / Twilio</td>
                                                <td className="px-6 py-4 whitespace-nowrap">Push / SMS Notifications</td>
                                                <td className="px-6 py-4">Tokens, Phone numbers</td>
                                            </tr>
                                            <tr className="hover:bg-primary/5 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap font-bold text-primary">Google Gemini AI</td>
                                                <td className="px-6 py-4 whitespace-nowrap">VITA AI chatbot</td>
                                                <td className="px-6 py-4">Health context, chat messages</td>
                                            </tr>
                                            <tr className="hover:bg-primary/5 transition-colors bg-secondary/30">
                                                <td className="px-6 py-4 whitespace-nowrap font-bold text-primary">Apple / Google Fit / Fitbit</td>
                                                <td className="px-6 py-4 whitespace-nowrap">Wearable APIs</td>
                                                <td className="px-6 py-4">Fitness data (with explicit permission)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">4</div>
                                    <h2 className="text-3xl font-bold text-primary m-0">Data Security</h2>
                                </div>
                                <p className="mb-6">We implement industry-standard security measures to protect your health data:</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center gap-3 bg-white border border-border p-4 rounded-xl shadow-sm">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0"><Lock className="w-5 h-5" /></div>
                                        <div><strong className="block text-primary">Encryption in transit & rest</strong><span className="text-sm">TLS 1.3 & AES-256 for MongoDB</span></div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white border border-border p-4 rounded-xl shadow-sm">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0"><Shield className="w-5 h-5" /></div>
                                        <div><strong className="block text-primary">Authentication & Access</strong><span className="text-sm">JWT tokens, bcrypt hashes, RBAC</span></div>
                                    </div>
                                </div>

                                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm">
                                    <div className="flex items-center gap-2 text-amber-900 mb-2">
                                        <AlertTriangle className="w-6 h-6" />
                                        <h4 className="font-bold text-lg m-0 text-amber-950">Security Incident Response</h4>
                                    </div>
                                    <p className="text-amber-900 m-0">
                                        In the event of a data breach affecting your personal health information, we will notify you within 72 hours via email at the address on your account, in accordance with applicable data protection laws.
                                    </p>
                                </div>
                            </section>

                            <section className="bg-primary text-primary-foreground p-8 rounded-3xl mt-12 shadow-xl shadow-primary/20">
                                <div className="flex items-center gap-3 mb-6">
                                    <Globe className="w-8 h-8 text-accent" />
                                    <h2 className="text-3xl font-bold text-white m-0 border-none pb-0">Your Rights and Choices</h2>
                                </div>
                                <p className="mb-6 text-primary-foreground/90 text-lg">Depending on your jurisdiction, you have the following rights regarding your personal data:</p>

                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0 m-0">
                                    <li className="bg-black/20 p-4 rounded-xl backdrop-blur-sm"><strong>Access & Portability:</strong> Request and export a copy of all personal and health data in a machine-readable format.</li>
                                    <li className="bg-black/20 p-4 rounded-xl backdrop-blur-sm"><strong>Correction & Deletion:</strong> Update inaccurate data or request deletion of your account and all associated health data.</li>
                                    <li className="bg-black/20 p-4 rounded-xl backdrop-blur-sm"><strong>Restriction & Objection:</strong> Limit processing or opt out of non-essential data processing (analytics, AI training).</li>
                                    <li className="bg-black/20 p-4 rounded-xl backdrop-blur-sm"><strong>Withdraw Consent:</strong> Revoke wearable data permissions at any time directly in Settings.</li>
                                </ul>
                                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                                    <p className="m-0 font-medium font-lg">To exercise your rights, contact us at: <a href="mailto:info@preventvital.com" className="text-accent hover:text-white underline transition-colors">info@preventvital.com</a></p>
                                </div>
                            </section>

                            <section className="pt-8">
                                <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">5</div>
                                    <h2 className="text-3xl font-bold text-primary m-0">Data Retention & AI Processing</h2>
                                </div>

                                <h3 className="text-xl font-bold text-primary mb-3 mt-6">Data Retention</h3>
                                <p className="mb-4">We retain health assessment data and daily vital logs for specific periods (up to 3 years) to analyze long-term health trends. VITA AI chat history is kept for 90 days, while deleted account data is purged after 30 days.</p>

                                <h3 className="text-xl font-bold text-primary mb-3 mt-8">AI and Automated Processing (VITA AI)</h3>
                                <p className="mb-4">Your CVITAL Score is calculated using a proprietary algorithm based on WHO-aligned clinical parameters. VITA AI uses Google Gemini 2.5 Flash to generate personalised health guidance.</p>

                                <div className="bg-destructive/5 border-l-4 border-destructive p-5 rounded-r-2xl mb-8 border border-destructive/20 shadow-sm mt-4">
                                    <p className="text-destructive font-medium m-0 flex items-start gap-3">
                                        <AlertTriangle className="w-6 h-6 shrink-0" />
                                        <span><strong className="font-bold">AI Disclaimer:</strong> VITA AI provides health information and guidance only. It is not a medical device, does not provide medical advice, and cannot replace a qualified healthcare professional. Always consult your doctor before making health or medication decisions.</span>
                                    </p>
                                </div>
                            </section>

                        </div>

                        <div className="mt-16 pt-8 border-t-2 border-primary/10 text-center text-sm text-primary/60 font-medium pb-12">
                            <p>This document constitutes the complete Privacy Policy of gruentzig.ai Private Limited.</p>
                            <p className="mt-2">Effective Date: March 1, 2026 | Version 1.0</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
