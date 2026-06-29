import React from 'react';
import { Shield, FileText, Lock, Globe, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Helmet>
                <title>Privacy Policy | How We Protect Your Health Data - PreventVital</title>
                <meta name="description" content="PreventVital's Privacy Policy version 2.0: learn how we collect, use, and protect your personal and health data. DPDP Act, GDPR, Google Play and Apple App Store compliant." />
                <meta name="keywords" content="preventvital privacy policy, health data protection, DPDP Act, GDPR, medical data security, health information protection" />
                <link rel="canonical" href="https://preventvital.com/privacy-policy" />
            </Helmet>
            <main className="flex-grow">
                {/* Colorful Hero Section */}
                <section className="pt-10 md:pt-14 pb-12 md:pb-16 bg-gradient-to-br from-primary/10 via-accent/10 to-background border-b border-primary/10 relative overflow-hidden">
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
                            AI-Powered Preventive Wellness — Your Health. Your Data. Our Commitment.
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
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Version</span><span className="font-bold text-foreground text-base">2.0</span></div>
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
                                    <strong className="font-bold text-primary">Health Data Warning:</strong> PreventVital collects, processes, and stores sensitive health and medical information. We treat this data with the highest level of care and protection. This application is intended for general wellness and preventive health monitoring only and is not a substitute for professional medical advice, diagnosis, or treatment.
                                </p>
                            </div>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">1. Introduction and Scope</h2>
                                <p>PreventVital (“PreventVital,” “we,” “our,” or “us”) is a preventive health and wellness application developed and operated by gruentzig.ai Private Limited, a company incorporated under the laws of India, with its registered office in Hyderabad, Telangana. This Privacy Policy (“Policy”) explains in detail how we collect, use, process, store, share, and protect your personal data and health information when you use the PreventVital mobile application and related services (collectively, the “Service”).</p>
                                <p>This Policy applies to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>All users who download and use the PreventVital application on Android (Google Play Store) or iOS (Apple App Store) devices</li>
                                    <li>Visitors to our website at preventvital.com</li>
                                    <li>Any person who contacts us for support or inquiries</li>
                                </ul>
                                <p className="mt-4">By installing the PreventVital application, creating an account, or using any of our features, you acknowledge that you have read, understood, and agreed to the practices described in this Policy. If you do not agree, you must discontinue use of the Service and uninstall the application.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">2. Definitions</h2>
                                <p>For the purposes of this Privacy Policy, the following terms have the meanings set out below:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Personal Data:</strong> Any information relating to an identified or identifiable natural person, including but not limited to name, email address, phone number, date of birth, and device identifiers.</li>
                                    <li><strong>Health Data / Sensitive Personal Data:</strong> Data pertaining to the physical or mental health of an individual, including but not limited to blood pressure readings, blood glucose levels, cholesterol levels, heart rate, BMI, weight, sleep patterns, and step counts. This constitutes “sensitive personal data” under India’s Digital Personal Data Protection Act 2023 (DPDP Act) and “special categories of personal data” under the GDPR.</li>
                                    <li><strong>VITA AI:</strong> PreventVital’s AI-powered wellness assistant, powered by Google Gemini API, which provides personalised health feedback, alerts, and recommendations based on your data.</li>
                                    <li><strong>CVITAL Score™:</strong> PreventVital’s proprietary algorithmic health score calculated from your submitted vital metrics to provide an indicative overview of your cardiovascular and metabolic wellness.</li>
                                    <li><strong>Data Fiduciary:</strong> Under India’s DPDP Act, gruentzig.ai Private Limited, in its capacity as the entity that determines the purpose and means of processing your personal data.</li>
                                    <li><strong>Data Principal:</strong> Under India’s DPDP Act, you as the individual to whom the personal data relates.</li>
                                    <li><strong>Processing:</strong> Any operation performed on personal data, including collection, storage, use, disclosure, sharing, transfer, or deletion.</li>
                                    <li><strong>Consent:</strong> A freely given, specific, informed, and unambiguous indication of the Data Principal’s wishes by which they, by a statement or by a clear affirmative action, signify agreement to the processing of their personal data.</li>
                                    <li><strong>Google Play Policy:</strong> Google LLC’s Developer Programme Policies applicable to applications distributed via the Google Play Store, including the User Data policy and Sensitive App Permissions policy.</li>
                                    <li><strong>Apple HealthKit:</strong> Apple Inc.’s framework that allows PreventVital to read and write health and fitness data to and from Apple Health on iOS and iPadOS devices, subject to Apple’s HealthKit entitlement guidelines.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">3. Information We Collect</h2>
                                <p>We collect information that is necessary to provide you with a personalised, safe, and effective preventive wellness experience. We do not collect information beyond what is required to operate the Service. The categories of information we collect are described below.</p>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Account and Identity Information</h3>
                                <p>When you register for a PreventVital account, we collect:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Full name</li>
                                    <li>Email address</li>
                                    <li>Mobile phone number (for OTP-based authentication and account security)</li>
                                    <li>Date of birth and age (to provide age-appropriate wellness insights)</li>
                                    <li>Biological sex (male, female, or prefer not to say — used for accurate physiological calculations)</li>
                                    <li>Country of residence</li>
                                    <li>Encrypted password (stored using bcrypt hashing; we never store your plaintext password)</li>
                                    <li>JWT (JSON Web Token) session tokens for secure authenticated sessions</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Health, Vitals, and Medical Metrics</h3>
                                <p>This is the core data category in PreventVital. You may manually enter or sync the following health metrics:</p>
                                
                                <h4 className="text-lg font-medium mt-4 mb-2">3.2.1 Manually Entered Vitals</h4>
                                <ul className="list-disc pl-6 space-y-2 mb-4">
                                    <li>Blood pressure (systolic and diastolic mmHg)</li>
                                    <li>Blood glucose levels (mg/dL or mmol/L, fasting and post-meal)</li>
                                    <li>Total cholesterol, LDL, HDL, and triglycerides (mg/dL)</li>
                                    <li>Body weight and BMI</li>
                                    <li>Resting heart rate (manual entry)</li>
                                    <li>Medication logs (if you choose to enter them)</li>
                                    <li>Symptom logs and wellness notes</li>
                                </ul>

                                <h4 className="text-lg font-medium mt-4 mb-2">3.2.2 Data from Integrated Platforms</h4>
                                <p>With your explicit consent, PreventVital may receive the following data from Apple HealthKit (iOS) or Google Fit / Health Connect (Android):</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Heart rate and heart rate variability (HRV)</li>
                                    <li>Daily step count and physical activity minutes</li>
                                    <li>Sleep duration and sleep quality data</li>
                                    <li>Resting energy and active energy expenditure</li>
                                    <li>Workout and exercise session data</li>
                                </ul>

                                <div className="bg-primary/5 p-4 rounded-lg my-6 text-sm font-medium border-l-4 border-primary">
                                    <strong>Important:</strong> Data obtained from Apple HealthKit will never be used for advertising purposes, sold to data brokers, or shared with third parties for marketing. HealthKit data is used solely to enhance your in-app wellness experience, as required by Apple’s HealthKit guidelines.
                                </div>

                                <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Wellness Programme and Activity Data</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Wellness programme enrolment history</li>
                                    <li>Programme participation and progress logs</li>
                                    <li>Exercise adherence and completion records</li>
                                    <li>Goal-setting data and milestones achieved</li>
                                    <li>Programme-specific questionnaire responses</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">3.4 VITA AI Conversational Data</h3>
                                <p>When you interact with VITA AI, our conversational wellness assistant:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Your messages, queries, and inputs to the AI assistant</li>
                                    <li>AI-generated responses and health feedback provided to you</li>
                                    <li>Conversation session timestamps and session identifiers</li>
                                    <li>Context data from your health metrics used to personalise AI responses</li>
                                </ul>
                                <p className="mt-4">VITA AI conversations are processed using the Google Gemini API. Your conversation data is transmitted to Google’s servers for inference only. Please refer to Section 6 (Data Sharing) for details on our arrangement with Google.</p>

                                <h3 className="text-xl font-semibold mt-6 mb-3">3.5 Device and Technical Information</h3>
                                <p>We automatically collect certain technical information to ensure the application functions correctly and to maintain security:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Device type, model, manufacturer, and operating system version</li>
                                    <li>Mobile network information (carrier, connection type — Wi-Fi or cellular)</li>
                                    <li>IP address (used for fraud prevention and geographic compliance; not stored long-term)</li>
                                    <li>Device advertising ID (if applicable; used for analytics only, not for targeted advertising)</li>
                                    <li>Application version number</li>
                                    <li>Crash reports and error logs (collected via automated crash reporting)</li>
                                    <li>Screen navigation and session duration telemetry (for UX improvement)</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">3.6 Permissions We Request</h3>
                                <p>The PreventVital application requests the following device permissions. Each permission is optional where noted and serves a specific purpose:</p>
                                <div className="overflow-x-auto mt-4">
                                    <table className="min-w-full border-collapse border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-50 text-left">
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Permission</th>
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Purpose</th>
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Required / Optional</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            <tr>
                                                <td className="p-3 border border-gray-200">Internet Access</td>
                                                <td className="p-3 border border-gray-200">Core app functionality, API communication, AI processing</td>
                                                <td className="p-3 border border-gray-200 font-medium">Required</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Apple HealthKit / Google Health Connect</td>
                                                <td className="p-3 border border-gray-200">Sync biometric and activity data from your device health platforms</td>
                                                <td className="p-3 border border-gray-200">Optional</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Camera</td>
                                                <td className="p-3 border border-gray-200">Scan wellness documents or prescription uploads (if applicable)</td>
                                                <td className="p-3 border border-gray-200">Optional</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Storage / File Access</td>
                                                <td className="p-3 border border-gray-200">Save exported health reports to your device</td>
                                                <td className="p-3 border border-gray-200">Optional</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Notifications (Push)</td>
                                                <td className="p-3 border border-gray-200">Send health alerts, abnormal vital warnings, programme reminders</td>
                                                <td className="p-3 border border-gray-200">Optional</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Biometric Authentication</td>
                                                <td className="p-3 border border-gray-200">Fingerprint or Face ID for secure app login</td>
                                                <td className="p-3 border border-gray-200">Optional</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Background App Refresh (iOS)</td>
                                                <td className="p-3 border border-gray-200">Periodic sync of health data from HealthKit</td>
                                                <td className="p-3 border border-gray-200">Optional</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">4. How We Use Your Information</h2>
                                <p>We process your personal data and health information only for specific, explicit, and legitimate purposes. The legal basis for processing under applicable laws is indicated for each purpose.</p>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-2">4.1 Providing Core Application Services</h3>
                                <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Legal Basis: Performance of contract / your consent</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Calculate and display your CVITAL Score™ based on submitted vital metrics</li>
                                    <li>Generate personalised health dashboards, trend charts, and progress visualisations</li>
                                    <li>Send automated health alerts when vitals fall outside clinically relevant reference ranges</li>
                                    <li>Power VITA AI conversations and deliver AI-generated wellness recommendations</li>
                                    <li>Enable enrolment in and tracking of wellness programmes</li>
                                    <li>Sync health data from Apple HealthKit and Google Fit / Health Connect</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-2">4.2 Account Management and Security</h3>
                                <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Legal Basis: Performance of contract / legitimate interest</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Create and manage your user account</li>
                                    <li>Authenticate your identity securely via OTP and JWT tokens</li>
                                    <li>Enable biometric login (if you activate this feature)</li>
                                    <li>Send transactional communications: password reset, OTP, account verification</li>
                                    <li>Detect and prevent fraud, abuse, and unauthorised access</li>
                                    <li>Enforce our Terms of Service</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-2">4.3 Service Improvement and Analytics</h3>
                                <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Legal Basis: Legitimate interest (analytics are aggregated and anonymised)</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Analyse aggregate, de-identified usage patterns to improve feature design</li>
                                    <li>Conduct crash diagnostics and resolve application bugs</li>
                                    <li>Perform A/B testing on features using anonymised cohort data</li>
                                    <li>Measure application performance and technical reliability</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-2">4.4 Communications and Notifications</h3>
                                <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Legal Basis: Your consent (you may withdraw at any time)</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Push notifications for health alerts, vital warnings, and programme milestones</li>
                                    <li>In-app notifications about new features or programme updates</li>
                                    <li>Transactional email communications related to your account</li>
                                </ul>
                                <p className="mt-4">We do not send promotional, marketing, or advertising communications without your explicit opt-in consent. You may opt out of non-essential communications at any time through your in-app notification settings.</p>

                                <h3 className="text-xl font-semibold mt-6 mb-2">4.5 Legal and Regulatory Compliance</h3>
                                <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Legal Basis: Legal obligation</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Comply with applicable laws, including India’s DPDP Act 2023</li>
                                    <li>Respond to lawful requests from courts, regulators, or government authorities</li>
                                    <li>Resolve disputes and enforce our agreements</li>
                                    <li>Maintain audit logs as required by applicable data protection regulations</li>
                                </ul>

                                <div className="bg-red-50 p-6 rounded-xl border border-red-200 mt-8 shadow-sm">
                                    <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                                        <AlertTriangle className="w-6 h-6" />
                                        What We Will Never Do
                                    </h3>
                                    <p className="text-red-900 mb-4 font-medium">We make the following unconditional commitments regarding your health data:</p>
                                    <ul className="list-disc pl-6 space-y-3 text-red-900/80 font-medium">
                                        <li>We will <strong>NEVER</strong> sell your personal data or health information to any third party</li>
                                        <li>We will <strong>NEVER</strong> use your health data for advertising targeting or behavioural profiling</li>
                                        <li>We will <strong>NEVER</strong> share your identifiable health data with employers, insurers, or financial institutions</li>
                                        <li>We will <strong>NEVER</strong> use Apple HealthKit data for advertising or user profiling</li>
                                        <li>We will <strong>NEVER</strong> use your data in ways that are incompatible with the purposes stated in this Policy without obtaining fresh consent</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">5. Artificial Intelligence and Automated Processing</h2>
                                <p>PreventVital uses artificial intelligence and automated processing to deliver personalised wellness insights. This section explains how AI is used and what it means for your data.</p>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-3">5.1 VITA AI — Our Wellness Assistant</h3>
                                <p>VITA AI is powered by the Google Gemini API, a large language model (LLM) developed by Google LLC. When you interact with VITA AI:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Your message, along with relevant contextual health data from your profile, is transmitted to Google’s Gemini API over an encrypted TLS 1.3 connection</li>
                                    <li>Google’s servers process the input and return a response, which is displayed to you within the app</li>
                                    <li>Conversation content may be retained by us for up to 12 months to provide conversational continuity and improve response quality</li>
                                    <li>Google’s processing of data through the Gemini API is governed by Google’s API Terms of Service and its Privacy Policy</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">5.2 CVITAL Score™ Algorithm</h3>
                                <p>Your CVITAL Score™ is computed by a proprietary algorithm that analyses multiple health metrics to produce a composite wellness indicator. This is an automated calculation. The score is informational and wellness-oriented only; it is not a medical diagnosis. You are not subject to any legally significant decisions based solely on your CVITAL Score™.</p>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-3">5.3 Automated Health Alerts</h3>
                                <p>PreventVital may generate automated alerts when your submitted vitals deviate significantly from standard reference ranges (e.g., blood pressure readings above 180/120 mmHg, blood glucose readings indicating potential hypoglycaemia). These alerts are generated algorithmically and are provided for informational purposes. They do not constitute a medical diagnosis. You are always encouraged to consult a qualified healthcare professional for medical advice.</p>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-3">5.4 Your Rights Regarding Automated Processing</h3>
                                <p>You have the right to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Request human review of any decision that has significantly affected you based on automated processing</li>
                                    <li>Opt out of certain automated processing features by adjusting your in-app settings</li>
                                    <li>Contact us at privacy@preventvital.com to raise concerns about automated decisions</li>
                                </ul>
                            </section>
                            
                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">6. Data Sharing and Disclosure</h2>
                                <p>We do not sell, rent, or trade your personal data. We share your information only in the limited circumstances described below, and only with parties who are legally and contractually obligated to protect it.</p>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-3">6.1 Service Providers and Data Processors</h3>
                                <p>We engage third-party service providers who process your data on our behalf, under written data processing agreements, for specific technical purposes only:</p>
                                <div className="overflow-x-auto mt-4 mb-6">
                                    <table className="min-w-full border-collapse border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-50 text-left">
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Provider</th>
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Service</th>
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Data Involved</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            <tr>
                                                <td className="p-3 border border-gray-200 font-medium">Google Cloud Platform (GCP)</td>
                                                <td className="p-3 border border-gray-200">Cloud infrastructure, database hosting, storage</td>
                                                <td className="p-3 border border-gray-200">All data — stored in GCP India (Mumbai) region</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200 font-medium">MongoDB Atlas (on GCP)</td>
                                                <td className="p-3 border border-gray-200">Managed database cluster</td>
                                                <td className="p-3 border border-gray-200">Health data, profile data, credentials (encrypted)</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200 font-medium">Google Gemini API</td>
                                                <td className="p-3 border border-gray-200">AI language model for VITA AI</td>
                                                <td className="p-3 border border-gray-200">Conversation inputs and relevant health context</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200 font-medium">Google Cloud Run</td>
                                                <td className="p-3 border border-gray-200">Containerised application servers</td>
                                                <td className="p-3 border border-gray-200">Request and response data (stateless; not stored)</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200 font-medium">Google Cloud Storage</td>
                                                <td className="p-3 border border-gray-200">Media and document storage</td>
                                                <td className="p-3 border border-gray-200">Profile assets, exported reports</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200 font-medium">Firebase / Google Analytics</td>
                                                <td className="p-3 border border-gray-200">Crash reporting and usage analytics</td>
                                                <td className="p-3 border border-gray-200">Anonymised device and usage data</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h3 className="text-xl font-semibold mt-6 mb-3">6.2 Legal Disclosures</h3>
                                <p>We may disclose your personal data when required or permitted by law:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>In response to a court order, subpoena, or legally binding request from a government or regulatory authority</li>
                                    <li>To protect the rights, property, or safety of PreventVital, our users, or the public</li>
                                    <li>To detect, investigate, or prevent fraud or illegal activities</li>
                                    <li>In connection with legal proceedings to which we are a party</li>
                                </ul>
                                <p className="mt-4">In all such cases, we will disclose only the minimum data necessary, and where legally permitted, we will notify you of the disclosure.</p>

                                <h3 className="text-xl font-semibold mt-6 mb-3">6.3 Business Transfers</h3>
                                <p>If gruentzig.ai Private Limited undergoes a merger, acquisition, restructuring, or sale of assets, your personal data may be transferred as part of that transaction. We will notify you via email or in-app notification before your data is transferred and becomes subject to a different privacy policy. You will have the right to request deletion of your data before such transfer occurs.</p>

                                <h3 className="text-xl font-semibold mt-6 mb-3">6.4 Sharing with Your Consent</h3>
                                <p>We may share your data with third parties other than those described above if you give us explicit, informed consent to do so. For example, you may choose to share a health report with your doctor or healthcare provider via the app’s export functionality. In such cases, you retain full control.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">7. Data Storage, Infrastructure, and Security</h2>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-3">7.1 Storage Infrastructure</h3>
                                <p>All PreventVital user data is stored on Google Cloud Platform (GCP), with primary data residency in the GCP Mumbai (asia-south1) region, located in India. This ensures compliance with India’s data localisation requirements under applicable laws.</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Application servers:</strong> Containerised microservices deployed on Google Cloud Run with strict Identity and Access Management (IAM) policies</li>
                                    <li><strong>Database:</strong> MongoDB Atlas cluster hosted within the GCP Mumbai region, with automated backups and point-in-time recovery</li>
                                    <li><strong>Media and documents:</strong> Stored in private, access-controlled Google Cloud Storage buckets, not publicly accessible</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">7.2 Encryption Standards</h3>
                                <p>We apply industry-standard encryption throughout our infrastructure:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>In Transit:</strong> All data transmitted between your device and our servers is encrypted using TLS 1.3 (Transport Layer Security)</li>
                                    <li><strong>At Rest:</strong> All data stored in our databases and cloud storage is encrypted using AES-256 (Advanced Encryption Standard with 256-bit keys)</li>
                                    <li><strong>Passwords:</strong> User passwords are never stored in plaintext. They are hashed using bcrypt with a dynamic cost factor, making them resistant to brute-force attacks</li>
                                    <li><strong>API Keys and Secrets:</strong> All third-party API keys and internal secrets are stored in Google Cloud Secret Manager, not in application code</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">7.3 Access Controls</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Access to production systems is restricted to authorised personnel on a strict need-to-know basis</li>
                                    <li>All internal access is logged and audited</li>
                                    <li>Multi-factor authentication (MFA) is mandatory for all team members accessing production environments</li>
                                    <li>Regular access reviews are conducted to ensure least-privilege principles</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">7.4 Additional Security Measures</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Penetration testing and vulnerability assessments conducted periodically</li>
                                    <li>Automated threat monitoring and intrusion detection</li>
                                    <li>Security incident response plan in place with defined escalation procedures</li>
                                    <li>Regular security training for all staff handling personal data</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">7.5 Breach Notification</h3>
                                <p>In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Notify the relevant data protection authority (e.g., India’s Data Protection Board) within 72 hours of becoming aware of the breach, where required by law</li>
                                    <li>Notify affected users without undue delay where the breach is likely to result in a high risk to your rights and freedoms</li>
                                    <li>Provide details of the nature of the breach, the data affected, and the steps we are taking to address it</li>
                                </ul>
                            </section>
                            
                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">8. Data Retention</h2>
                                <p>We retain your personal data only for as long as is necessary to fulfil the purposes described in this Policy, or as required by applicable laws. The following retention schedule applies:</p>
                                
                                <div className="overflow-x-auto mt-4 mb-6">
                                    <table className="min-w-full border-collapse border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-50 text-left">
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Data Category</th>
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Retention Period</th>
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Basis</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            <tr>
                                                <td className="p-3 border border-gray-200">Account and profile data</td>
                                                <td className="p-3 border border-gray-200 font-medium">For the duration of your account, plus 30 days after deletion request</td>
                                                <td className="p-3 border border-gray-200">Contract performance</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Health vitals and metrics</td>
                                                <td className="p-3 border border-gray-200 font-medium">For the duration of your account, plus 30 days after deletion</td>
                                                <td className="p-3 border border-gray-200">Contract / consent</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">VITA AI conversations</td>
                                                <td className="p-3 border border-gray-200 font-medium">12 months from each conversation date</td>
                                                <td className="p-3 border border-gray-200">Legitimate interest</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Crash logs and error telemetry</td>
                                                <td className="p-3 border border-gray-200 font-medium">90 days</td>
                                                <td className="p-3 border border-gray-200">Legitimate interest</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Usage analytics (anonymised)</td>
                                                <td className="p-3 border border-gray-200 font-medium">Up to 3 years (aggregated, non-identifiable)</td>
                                                <td className="p-3 border border-gray-200">Legitimate interest</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Legal hold / compliance data</td>
                                                <td className="p-3 border border-gray-200 font-medium">As required by applicable law (typically 7 years for financial/tax records)</td>
                                                <td className="p-3 border border-gray-200">Legal obligation</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Backup data</td>
                                                <td className="p-3 border border-gray-200 font-medium">Retained in encrypted backups for up to 90 days after deletion</td>
                                                <td className="p-3 border border-gray-200">Operational necessity</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p>After the applicable retention period, your data will be securely deleted or irreversibly anonymised. Deletion of account records from our active systems occurs within 30 days of your deletion request; backup purging occurs within 90 days.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">9. International Data Transfers</h2>
                                <p>PreventVital primarily stores and processes your data within India (GCP Mumbai region). However, certain technical operations may involve data transfers to other countries, specifically:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Google Gemini API (AI Processing):</strong> When you use VITA AI, your conversation data and relevant health context are transmitted to Google’s servers, which may be located in the United States or other countries. Google LLC is certified under applicable international data transfer frameworks.</li>
                                    <li><strong>Crash Reporting / Analytics:</strong> Anonymised crash and usage data may be processed on Google’s globally distributed infrastructure.</li>
                                </ul>
                                <p className="mt-4">Where data is transferred outside India, we ensure that appropriate safeguards are in place as required by the DPDP Act 2023 and other applicable laws. These safeguards include:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Standard Contractual Clauses (SCCs) or equivalent contractual protections with our processors</li>
                                    <li>Transfers only to countries that provide an adequate level of data protection</li>
                                    <li>Encryption of all data in transit using TLS 1.3</li>
                                </ul>
                                <p className="mt-4"><strong>For users in the European Economic Area (EEA):</strong> If you access PreventVital from the EEA, your data may be transferred to India, which does not have a formal EU adequacy decision. We rely on Standard Contractual Clauses approved by the European Commission to lawfully transfer your data.</p>
                            </section>
                            
                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">10. Your Privacy Rights</h2>
                                <p>We respect your rights as a Data Principal under India’s DPDP Act 2023 and, where applicable, as a Data Subject under the GDPR. You may exercise the following rights:</p>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-2">10.1 Right of Access</h3>
                                <p>You have the right to request a copy of the personal data we hold about you, including your health metrics, profile data, and VITA AI conversation history. We will provide a machine-readable export (JSON format) within 30 days of your verified request.</p>

                                <h3 className="text-xl font-semibold mt-6 mb-2">10.2 Right to Correction</h3>
                                <p>If any personal data we hold about you is inaccurate or incomplete, you have the right to request correction. You may update most profile information directly in the app settings. For data you cannot edit yourself, contact us and we will correct it within 15 business days.</p>

                                <h3 className="text-xl font-semibold mt-6 mb-2">10.3 Right to Erasure (Account Deletion)</h3>
                                <p>You have the right to request permanent deletion of your account and all associated personal data. Upon a verified deletion request:</p>
                                <ul className="list-disc pl-6 space-y-2 mb-4">
                                    <li>Your active account records will be deleted within 30 days</li>
                                    <li>Your data will be purged from backup systems within 90 days</li>
                                    <li>Data that we are legally required to retain (e.g., for tax or compliance purposes) will be retained for only the legally mandated period in a secure, access-restricted archive</li>
                                </ul>
                                <p className="text-sm font-medium bg-secondary p-3 rounded-lg"><strong>How to delete your account:</strong> Go to Settings → Account → Delete Account within the app, or email us at privacy@preventvital.com with the subject “Account Deletion Request.”</p>

                                <h3 className="text-xl font-semibold mt-6 mb-2">10.4 Right to Data Portability</h3>
                                <p>You have the right to receive a structured, commonly used, machine-readable copy of your personal data (in JSON or CSV format) to transfer to another service. Submit a portability request at privacy@preventvital.com.</p>

                                <h3 className="text-xl font-semibold mt-6 mb-2">10.5 Right to Withdraw Consent</h3>
                                <p>Where processing is based on your consent, you may withdraw consent at any time without affecting the lawfulness of processing before withdrawal. You can:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Revoke HealthKit/Health Connect integration permissions in your device settings</li>
                                    <li>Turn off push notifications in your device settings or in-app notification preferences</li>
                                    <li>Delete your account to withdraw all consent-based processing</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-2">10.6 Right to Restrict Processing</h3>
                                <p>You may request that we restrict processing of your personal data in certain circumstances, for example if you contest the accuracy of your data, pending verification.</p>

                                <h3 className="text-xl font-semibold mt-6 mb-2">10.7 Right to Object (GDPR — EEA Users)</h3>
                                <p>If you are located in the EEA, you have the right to object to processing of your personal data based on our legitimate interests. We will cease such processing unless we can demonstrate compelling legitimate grounds that override your interests.</p>

                                <h3 className="text-xl font-semibold mt-6 mb-2">10.8 Right to Lodge a Complaint</h3>
                                <p>You have the right to lodge a complaint with the relevant supervisory authority:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>India:</strong> The Data Protection Board of India (once constituted under the DPDP Act 2023)</li>
                                    <li><strong>EEA users:</strong> Your local data protection authority (e.g., ICO in the UK, CNIL in France)</li>
                                </ul>

                                <p className="mt-4">To exercise any of the above rights, contact our Privacy Team at privacy@preventvital.com. We will respond within 30 days. We may request identity verification before processing your request.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">11. Children’s Privacy</h2>
                                <p>PreventVital is designed for adults aged 18 years and above. We do not knowingly collect personal data from individuals under the age of 18.</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>If you are under 18, you must not use PreventVital or provide any personal information to us</li>
                                    <li>Parents and guardians should supervise their children’s use of digital health applications</li>
                                    <li>If we become aware that we have inadvertently collected personal data from a person under the age of 18, we will take immediate steps to delete that information from our systems</li>
                                    <li>If you believe that a child under 18 has provided personal information to us, please contact us immediately at privacy@preventvital.com</li>
                                </ul>
                                <p className="mt-4">Where users are between 13 and 18 years of age in jurisdictions where this is legally permissible, a parent or legal guardian must provide verifiable consent before the minor may use the Service. We reserve the right to request proof of age at any time.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">12. Google Play Store Compliance</h2>
                                <p>This section addresses the specific requirements of Google LLC’s Developer Programme Policies for applications distributed on the Google Play Store, including the User Data, Permissions, and Health & Fitness policies.</p>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-3">12.1 Prominent Disclosure</h3>
                                <p>In accordance with Google Play’s User Data policy, we provide the following prominent disclosures:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>PreventVital collects personal data including health and fitness information as described in this Policy</li>
                                    <li>Data is shared with Google (as our cloud infrastructure and AI provider) and is not sold to third parties</li>
                                    <li>Health permissions (HealthKit / Health Connect) are used solely for in-app wellness features</li>
                                    <li>A link to this Privacy Policy is accessible within the app and on the Google Play Store listing</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">12.2 Sensitive Permissions</h3>
                                <p>PreventVital uses the following sensitive permissions as classified by Google Play:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>READ_HEALTH_DATA and WRITE_HEALTH_DATA</strong> (Health Connect — Android): Used to read biometric and activity data you choose to sync. This data is used solely within the app to enhance your health profile and is never used for advertising.</li>
                                    <li><strong>POST_NOTIFICATIONS:</strong> Used to send health alerts and wellness reminders. You can revoke this permission in device settings.</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">12.3 Data Safety Section</h3>
                                <p>Our Google Play Data Safety declaration reflects the information in this Policy. In summary:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Data collected:</strong> Personal info (name, email, phone), Health & fitness data, App activity, Device identifiers</li>
                                    <li><strong>Data shared:</strong> With Google (infrastructure and AI — as a processor), not with third parties for advertising</li>
                                    <li><strong>Security practices:</strong> Data is encrypted in transit and at rest</li>
                                    <li><strong>User data deletion:</strong> Supported — users may request deletion in-app or by email</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">13. Apple App Store and HealthKit Compliance</h2>
                                <p>This section addresses the requirements of Apple Inc.’s App Store Review Guidelines, specifically for applications that access Apple HealthKit data.</p>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-3">13.1 HealthKit Data Usage</h3>
                                <p>PreventVital accesses Apple HealthKit data only with your explicit permission through Apple’s standard permission prompt. The following rules govern our use of HealthKit data:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>HealthKit data is used ONLY to provide and improve health and fitness features within PreventVital</li>
                                    <li>HealthKit data will NOT be used for advertising or user profiling</li>
                                    <li>HealthKit data will NOT be shared with third parties except as strictly necessary to provide our Service (i.e., with our cloud infrastructure provider, Google Cloud, under strict data processing terms)</li>
                                    <li>HealthKit data will NOT be sold to data brokers or any other parties</li>
                                    <li>HealthKit data will NOT be used for any purpose not disclosed to the user</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">13.2 HealthKit Permissions Requested</h3>
                                <p>PreventVital requests read permission for the following HealthKit data types (with your explicit consent):</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Heart Rate</li>
                                    <li>Step Count</li>
                                    <li>Sleep Analysis</li>
                                    <li>Active Energy Burned</li>
                                    <li>Resting Heart Rate</li>
                                    <li>Heart Rate Variability (HRV)</li>
                                </ul>
                                <p className="mt-4">You may revoke HealthKit permissions at any time by going to your iPhone’s <strong>Settings → Privacy & Security → Health → PreventVital.</strong></p>

                                <h3 className="text-xl font-semibold mt-6 mb-3">13.3 Privacy Nutrition Label</h3>
                                <p>Our Apple App Store Privacy Nutrition Label reflects the disclosures in this Policy. Data linked to your identity: Health & Fitness, Contact Info. Data not linked to your identity: Diagnostics.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">14. Account Deletion — Complete Procedure</h2>
                                <p>In compliance with Google Play’s Account Deletion policy and Apple’s App Store guidelines, PreventVital provides a clear and accessible mechanism to permanently delete your account and all associated data.</p>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-3">14.1 How to Delete Your Account</h3>
                                <p className="font-semibold text-primary">Method 1 — In-App (Recommended):</p>
                                <ul className="list-disc pl-6 space-y-2 mb-4">
                                    <li>Open PreventVital</li>
                                    <li>Tap on your Profile icon (bottom right)</li>
                                    <li>Go to Settings → Account → Delete Account</li>
                                    <li>Read the deletion confirmation screen and confirm your identity</li>
                                    <li>Tap “Permanently Delete My Account”</li>
                                </ul>
                                
                                <p className="font-semibold text-primary">Method 2 — Via Email:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Email privacy@preventvital.com from your registered email address</li>
                                    <li>Use the subject line: “Account Deletion Request — [your registered email]”</li>
                                    <li>We will verify your identity and confirm deletion within 5 business days</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">14.2 What Happens When You Delete Your Account</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Your account is deactivated immediately upon confirmation</li>
                                    <li>All personal data, health metrics, VITA AI conversations, and programme history are permanently deleted from active databases within 30 days</li>
                                    <li>Data is purged from encrypted backup systems within 90 days</li>
                                    <li>You will receive an email confirmation once deletion is complete</li>
                                    <li><strong className="text-destructive">Deletion is permanent and irreversible. You will not be able to recover your health data after deletion.</strong></li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">14.3 Data Retained After Deletion</h3>
                                <p>Limited data may be retained after account deletion only where required by law:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Transaction or payment records (if applicable) for the legally required period</li>
                                    <li>Anonymised, aggregated analytics data that cannot be linked back to you</li>
                                    <li>Data subject to a legal hold or ongoing regulatory investigation</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">15. Cookies, Tracking Technologies, and Analytics</h2>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-3">15.1 Mobile Application</h3>
                                <p>The PreventVital mobile application does not use browser cookies. We use the following tracking technologies in the app:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Device advertising identifiers (IDFA on iOS, GAID on Android):</strong> Used only for aggregate analytics, not for targeted advertising. You may reset or opt out of advertising identifiers in your device settings.</li>
                                    <li><strong>Session tokens (JWT):</strong> Used to maintain your authenticated session securely. These are stored in device secure storage and expire automatically.</li>
                                    <li><strong>Analytics SDKs:</strong> We may use Google Analytics for Firebase or equivalent tools to collect anonymised usage statistics.</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">15.2 Website (preventvital.com)</h3>
                                <p>Our website may use cookies and similar technologies for:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Essential cookies:</strong> Required for website functionality (session management, security)</li>
                                    <li><strong>Analytics cookies:</strong> Google Analytics to understand website traffic and usage (anonymised)</li>
                                </ul>
                                <p className="mt-4">You can manage cookies through your browser settings. Opting out of analytics cookies does not affect your use of the website.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">16. India Digital Personal Data Protection Act 2023 (DPDP Act) — Specific Provisions</h2>
                                <p>PreventVital is operated by gruentzig.ai Private Limited, incorporated in India and subject to the Digital Personal Data Protection Act 2023 (the “DPDP Act”). This section sets out our specific obligations and your rights under this Act.</p>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-3">16.1 Our Role as Data Fiduciary</h3>
                                <p>gruentzig.ai Private Limited acts as the Data Fiduciary for all personal data processed through PreventVital. As Data Fiduciary, we are responsible for determining the purpose and means of processing your personal data and for ensuring that processing is lawful, fair, and transparent.</p>

                                <h3 className="text-xl font-semibold mt-6 mb-3">16.2 Lawful Bases for Processing</h3>
                                <p>Under the DPDP Act, we process your personal data on the following lawful bases:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Consent:</strong> For processing sensitive personal data (health metrics), VITA AI interactions, and optional features such as HealthKit integration. You provide explicit consent at account registration and when enabling specific features.</li>
                                    <li><strong>Legitimate Use:</strong> For certain processing activities where processing is necessary and expected in the context of providing our Service, such as account security and fraud prevention.</li>
                                    <li><strong>Legal Obligation:</strong> Where processing is required to comply with applicable Indian laws.</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">16.3 Consent Management</h3>
                                <p>Under the DPDP Act:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Your consent must be freely given, specific, informed, and unambiguous</li>
                                    <li>We obtain consent through clear, plain-language consent notices before collecting sensitive data</li>
                                    <li>You may withdraw consent at any time</li>
                                    <li>Withdrawal of consent will not affect the lawfulness of processing based on consent before its withdrawal</li>
                                    <li>Where we process data of children (under 18), we obtain verifiable parental consent</li>
                                </ul>

                                <h3 className="text-xl font-semibold mt-6 mb-3">16.4 Grievance Redressal</h3>
                                <p>In compliance with the DPDP Act, we have designated a Grievance Officer to address complaints relating to personal data processing. See Section 19 for contact details.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">17. European Users — GDPR Compliance</h2>
                                <p>If you access PreventVital from the European Economic Area (EEA), United Kingdom, or Switzerland, this section sets out your additional rights under the General Data Protection Regulation (GDPR) and UK GDPR.</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Data Controller:</strong> gruentzig.ai Private Limited acts as Data Controller for EEA users’ personal data.</li>
                                    <li><strong>Legal Bases:</strong> We process your data under Article 6(1)(a) (consent), Article 6(1)(b) (contract performance), Article 6(1)(c) (legal obligation), and Article 6(1)(f) (legitimate interests). Health data is processed under Article 9(2)(a) (explicit consent).</li>
                                    <li><strong>Data Subject Rights:</strong> As set out in Section 10, you have the rights of access, rectification, erasure, restriction, portability, and objection. You also have the right not to be subject to solely automated decision-making (Article 22).</li>
                                    <li><strong>Supervisory Authority:</strong> You have the right to lodge a complaint with your local data protection authority.</li>
                                    <li><strong>Retention:</strong> We adhere to the principle of data minimisation and retain data only for as long as necessary (see Section 8).</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">18. Changes to This Privacy Policy</h2>
                                <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational reasons. When we make material changes to this Policy:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>We will update the “Effective Date” at the top of this document</li>
                                    <li>We will notify you via a prominent in-app notification and/or email to your registered address at least 30 days before the changes take effect</li>
                                    <li>For changes involving new or expanded collection of sensitive health data, we will obtain fresh consent before processing your data under the new terms</li>
                                </ul>
                                <p className="mt-4">Your continued use of PreventVital after the effective date of any updated Policy constitutes your acceptance of the revised terms. If you do not agree with the updated Policy, you must stop using the Service and may delete your account.</p>
                                <p className="mt-4">Previous versions of this Privacy Policy are available upon request by contacting privacy@preventvital.com.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mt-8 mb-4">19. Contact Information and Grievance Officer</h2>
                                
                                <h3 className="text-xl font-semibold mt-6 mb-3">19.1 Privacy Enquiries</h3>
                                <p>For questions, concerns, or requests relating to this Privacy Policy or your personal data:</p>
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
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Support Email</p>
                                        <a href="mailto:socialmedia@preventvital.com" className="font-medium text-accent hover:underline">socialmedia@preventvital.com</a>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Response Time</p>
                                        <p className="font-medium">We will respond to all privacy requests within 30 days</p>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold mt-6 mb-3">19.2 Grievance Officer (India — DPDP Act)</h3>
                                <p>In accordance with applicable Indian data protection regulations, we have appointed a Grievance Officer to address complaints and concerns regarding the processing of your personal data:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6 bg-secondary/50 p-6 rounded-xl border border-border">
                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Role</p>
                                        <p className="font-medium">Grievance Officer — Data Protection</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Organisation</p>
                                        <p className="font-medium">gruentzig.ai Private Limited</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                                        <a href="mailto:grievance@preventvital.com" className="font-medium text-accent hover:underline">grievance@preventvital.com</a>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Response Time</p>
                                        <p className="font-medium">Complaints acknowledged within 48 hours; resolved within 30 days</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Postal Address</p>
                                        <p className="font-medium">Attention: Grievance Officer, gruentzig.ai Private Limited, Hyderabad, Telangana, India</p>
                                    </div>
                                </div>
                                <p>If you are not satisfied with our response, you may escalate your complaint to the Data Protection Board of India (once constituted) or the relevant regulatory authority in your jurisdiction.</p>
                            </section>

                            <section className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm mt-12 mb-8">
                                <div className="flex items-center gap-2 text-amber-900 mb-3">
                                    <AlertTriangle className="w-6 h-6" />
                                    <h4 className="font-bold text-xl m-0 text-amber-950">20. Medical Disclaimer and Limitation of Liability</h4>
                                </div>
                                <p className="text-amber-900 font-medium mb-4">
                                    PreventVital is a wellness and preventive health monitoring application. It is <strong>NOT a medical device</strong> and should NOT be used as a substitute for professional medical advice, diagnosis, or treatment.
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-amber-900/90 mb-4">
                                    <li>The CVITAL Score™, VITA AI responses, health alerts, and all other outputs from PreventVital are informational in nature and are not medical diagnoses or clinical recommendations</li>
                                    <li>Always consult a qualified healthcare professional before making any health-related decisions</li>
                                    <li>Do not disregard or delay seeking professional medical advice because of information received through PreventVital</li>
                                    <li>In the event of a medical emergency, contact your local emergency services (in India: 112) immediately</li>
                                </ul>
                                <p className="text-amber-900 font-medium italic">
                                    gruentzig.ai Private Limited makes no warranties, express or implied, regarding the accuracy, completeness, or fitness for purpose of any health information provided through PreventVital. To the fullest extent permitted by applicable law, we disclaim liability for any harm arising from reliance on information provided by the application.
                                </p>
                            </section>
                            
                            <section className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
                                <p className="mb-2"><strong>gruentzig.ai Private Limited</strong><br/>
                                PreventVital — AI-Powered Preventive Wellness<br/>
                                Hyderabad, Telangana, India<br/>
                                privacy@preventvital.com • https://preventvital.com/privacy-policy</p>
                                <p>© 2026 gruentzig.ai Private Limited. All rights reserved.<br/>
                                Version 2.0 — Effective July 1, 2026</p>
                                <p className="mt-2 opacity-50">Confidential — Version 2.0 | Effective: July 1, 2026</p>
                            </section>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
