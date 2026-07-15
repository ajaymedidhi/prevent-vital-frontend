import React from 'react';
import { ShieldCheck, FileText, Lock, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const HipaaCompliance = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Helmet>
                <title>HIPAA Compliance | How We Safeguard Health Data - PreventVital</title>
                <meta name="description" content="PreventVital's approach to HIPAA-equivalent safeguards for health data: administrative, physical, and technical controls that protect your protected health information (PHI)." />
                <meta name="keywords" content="preventvital hipaa compliance, health data security, PHI protection, HIPAA equivalent safeguards, medical data security India" />
                <link rel="canonical" href="https://preventvital.com/hipaa-compliance" />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="PreventVital" />
                <meta property="og:url" content="https://preventvital.com/hipaa-compliance" />
                <meta property="og:title" content="HIPAA Compliance | PreventVital" />
                <meta property="og:description" content="How PreventVital safeguards protected health information with HIPAA-equivalent administrative, physical, and technical controls." />
                <meta property="og:image" content="https://preventvital.com/og-image.jpg" />
            </Helmet>
            <main className="flex-grow">
                {/* Colorful Hero Section */}
                <section className="pt-10 md:pt-14 pb-12 md:pb-16 bg-gradient-to-br from-primary/10 via-accent/10 to-background border-b border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

                    <div className="container text-center max-w-4xl relative z-10">
                        <div className="inline-flex items-center justify-center p-4 bg-white/60 backdrop-blur-md rounded-2xl mb-8 shadow-sm text-accent border border-white/40">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h1 className="font-bold mb-6 text-balance tracking-tight text-primary" style={{ fontSize: 'var(--fz-h1-sm)' }}>
                            HIPAA Compliance
                        </h1>
                        <p className="text-lg md:text-xl text-primary/70 leading-relaxed text-balance max-w-2xl mx-auto font-medium">
                            The administrative, physical, and technical safeguards we apply to protect your health information.
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
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Effective Date</span><span className="font-bold text-foreground text-base text-primary/80">July 1, 2026</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Company</span><span className="font-bold text-foreground text-base">gruentzig.ai Pvt Ltd</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Location</span><span className="font-bold text-foreground text-base">Hyderabad, India</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Privacy Contact</span><a href="mailto:privacy@preventvital.com" className="font-bold text-accent hover:text-primary transition-colors text-base">privacy@preventvital.com</a></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Website</span><a href="https://preventvital.com" target="_blank" rel="noopener noreferrer" className="font-bold text-accent hover:text-primary transition-colors text-base">preventvital.com</a></div>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none space-y-8 text-foreground/80">

                            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary p-6 rounded-r-2xl shadow-sm">
                                <p className="text-primary font-medium my-0 text-lg leading-relaxed">
                                    PreventVital is built on the same safeguarding principles as the U.S. Health Insurance Portability and Accountability Act (HIPAA) — even though PreventVital primarily operates in India under the Digital Personal Data Protection Act 2023 (DPDP Act). We apply HIPAA-equivalent administrative, physical, and technical controls to every piece of health information you share with us.
                                </p>
                            </div>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. Our Commitment</h2>
                                <p>Protected health information (PHI) — vitals, biometric readings, medical history, and any data that could identify your health status — receives the highest level of protection within our systems. This page summarises the safeguards we apply. It should be read alongside our <a href="/privacy-policy" className="text-accent font-semibold hover:underline">Privacy Policy</a>, which contains the full legal detail of how we collect, use, and protect your data.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. Administrative Safeguards</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>A designated Privacy and Security lead oversees our data protection programme</li>
                                    <li>Employees and contractors who handle health data undergo mandatory privacy and security training before access is granted</li>
                                    <li>Access to PHI is granted strictly on a need-to-know, least-privilege basis and is reviewed periodically</li>
                                    <li>Written data processing agreements are in place with every third-party processor that touches PHI (see our <a href="/privacy-policy" className="text-accent font-semibold hover:underline">Privacy Policy, Section 6</a>)</li>
                                    <li>A documented incident response plan governs how we detect, contain, and report security incidents</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. Physical Safeguards</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>All infrastructure runs on Google Cloud Platform data centres, which maintain independently audited physical security controls (biometric access, 24/7 monitoring, redundant power and network)</li>
                                    <li>PreventVital does not operate its own physical servers; no PHI is stored on local company hardware</li>
                                    <li>Workstations used by team members with data access are encrypted and protected by mandatory screen-lock and endpoint security policies</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. Technical Safeguards</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Encryption in transit:</strong> All data moving between your device and our servers is encrypted using TLS 1.3</li>
                                    <li><strong>Encryption at rest:</strong> All stored data, including health vitals and account information, is encrypted using AES-256</li>
                                    <li><strong>Authentication:</strong> Passwords are hashed with bcrypt; sessions are managed with short-lived JWT tokens; multi-factor authentication is mandatory for all internal access to production systems</li>
                                    <li><strong>Audit logging:</strong> Access to PHI-containing systems is logged and reviewed for anomalies</li>
                                    <li><strong>Data isolation:</strong> Health data is stored in access-controlled databases in the GCP Mumbai (asia-south1) region, separated from public-facing infrastructure</li>
                                    <li><strong>Vulnerability management:</strong> Periodic penetration testing and automated vulnerability scanning of production systems</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">5. Minimum Necessary Use</h2>
                                <p>We collect and process only the health information necessary to deliver the specific feature you are using — for example, calculating your CVITAL Score™ or powering a VITA AI conversation. We do not use PHI for advertising, sell it to data brokers, or share it with employers, insurers, or financial institutions. See <a href="/privacy-policy" className="text-accent font-semibold hover:underline">Privacy Policy, Section 4</a> for our full "what we will never do" commitments.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">6. Business Associates and Sub-processors</h2>
                                <p>Where PreventVital engages third-party service providers to process health data on our behalf (cloud hosting, database management, AI inference), each provider operates under a written agreement that restricts their use of PHI strictly to the services they provide us and requires them to maintain safeguards consistent with this policy.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">7. Breach Notification</h2>
                                <p>If a security incident is likely to result in a risk to your rights or the confidentiality of your health data, we will notify affected users without undue delay and, where required by applicable law, notify the relevant regulatory authority within the legally mandated timeframe. Full detail is available in <a href="/privacy-policy" className="text-accent font-semibold hover:underline">Privacy Policy, Section 7.5</a>.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">8. Your Rights Over Your Health Data</h2>
                                <p>You may request access to, correction of, or deletion of your health data at any time. Full instructions are in <a href="/privacy-policy" className="text-accent font-semibold hover:underline">Privacy Policy, Section 10</a>. To exercise these rights, contact us at <a href="mailto:privacy@preventvital.com" className="text-accent font-semibold hover:underline">privacy@preventvital.com</a>.</p>
                            </section>

                            <section className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm mt-12 mb-8">
                                <div className="flex items-center gap-2 text-amber-900 mb-3">
                                    <AlertTriangle className="w-6 h-6" />
                                    <h4 className="font-bold text-xl m-0 text-amber-950">Scope Note</h4>
                                </div>
                                <p className="text-amber-900 font-medium mb-0">
                                    PreventVital is an India-based company and is not a U.S. "covered entity" or "business associate" as those terms are defined under HIPAA. This page describes the HIPAA-equivalent safeguards we voluntarily apply because we believe health data deserves the highest standard of protection, regardless of jurisdiction. Our primary legal obligations for data protection are governed by India's DPDP Act 2023, as detailed in our <a href="/privacy-policy" className="underline">Privacy Policy</a>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">9. Contact</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6 bg-secondary/50 p-6 rounded-xl border border-border">
                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Company</p>
                                        <p className="font-medium">gruentzig.ai Private Limited</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Registered Address</p>
                                        <p className="font-medium">Hyderabad, Telangana, India</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Privacy Email</p>
                                        <a href="mailto:privacy@preventvital.com" className="font-medium text-accent hover:underline">privacy@preventvital.com</a>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Grievance Officer</p>
                                        <a href="mailto:grievance@preventvital.com" className="font-medium text-accent hover:underline">grievance@preventvital.com</a>
                                    </div>
                                </div>
                            </section>

                            <section className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
                                <p className="mb-2"><strong>gruentzig.ai Private Limited</strong><br/>
                                PreventVital — AI-Powered Preventive Wellness<br/>
                                Hyderabad, Telangana, India<br/>
                                privacy@preventvital.com • https://preventvital.com/hipaa-compliance</p>
                                <p>© 2026 gruentzig.ai Private Limited. All rights reserved.<br/>
                                Version 1.0 — Effective July 1, 2026</p>
                            </section>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HipaaCompliance;
