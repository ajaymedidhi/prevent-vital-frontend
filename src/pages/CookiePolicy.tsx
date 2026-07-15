import React from 'react';
import { Cookie, FileText, Lock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const CookiePolicy = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Helmet>
                <title>Cookie Policy | How We Use Cookies - PreventVital</title>
                <meta name="description" content="PreventVital's Cookie Policy: how we use cookies and similar tracking technologies on our website and mobile app, and how you can manage your preferences." />
                <meta name="keywords" content="preventvital cookie policy, cookies, tracking technologies, website analytics, preventvital privacy" />
                <link rel="canonical" href="https://preventvital.com/cookie-policy" />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="PreventVital" />
                <meta property="og:url" content="https://preventvital.com/cookie-policy" />
                <meta property="og:title" content="Cookie Policy | PreventVital" />
                <meta property="og:description" content="How PreventVital uses cookies and similar technologies, and how to manage your preferences." />
                <meta property="og:image" content="https://preventvital.com/og-image.jpg" />
            </Helmet>
            <main className="flex-grow">
                {/* Colorful Hero Section */}
                <section className="pt-10 md:pt-14 pb-12 md:pb-16 bg-gradient-to-tr from-accent/10 via-primary/5 to-background border-b border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>

                    <div className="container text-center max-w-4xl relative z-10">
                        <div className="inline-flex items-center justify-center p-4 bg-white/60 backdrop-blur-md rounded-2xl mb-8 shadow-sm text-primary border border-white/40">
                            <Cookie className="w-10 h-10" />
                        </div>
                        <h1 className="font-bold mb-6 text-balance text-primary tracking-tight" style={{ fontSize: 'var(--fz-h1-sm)' }}>
                            Cookie Policy
                        </h1>
                        <p className="text-lg md:text-xl text-primary/70 leading-relaxed text-balance max-w-2xl mx-auto font-medium">
                            How we use cookies and similar technologies on our website and app, and how you can control them.
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
                                    <Lock className="w-5 h-5 text-primary" />
                                    <h3 className="text-sm font-bold text-accent uppercase tracking-wider m-0">Document Information</h3>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 text-sm">
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Version</span><span className="font-bold text-foreground text-base">1.0</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Effective Date</span><span className="font-bold text-foreground text-base text-accent/80">July 1, 2026</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Company</span><span className="font-bold text-foreground text-base">gruentzig.ai Pvt Ltd</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Location</span><span className="font-bold text-foreground text-base">Hyderabad, India</span></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Contact</span><a href="mailto:privacy@preventvital.com" className="font-bold text-primary hover:text-accent transition-colors text-base">privacy@preventvital.com</a></div>
                                    <div className="flex flex-col"><span className="text-muted-foreground mb-1 text-xs uppercase tracking-wider font-semibold">Website</span><a href="https://preventvital.com" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:text-accent transition-colors text-base">preventvital.com</a></div>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none space-y-8 text-foreground/80">

                            <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-l-4 border-accent p-6 rounded-r-2xl shadow-sm">
                                <p className="my-0 text-lg leading-relaxed text-foreground font-medium">
                                    This Cookie Policy explains how gruentzig.ai Private Limited ("PreventVital", "we", "our", "us") uses cookies and similar tracking technologies on preventvital.com and within the PreventVital mobile application, and how you can control them.
                                </p>
                            </div>

                            <section>
                                <h2 className="text-2xl font-bold text-accent mt-8 mb-4">1. What Are Cookies?</h2>
                                <p>Cookies are small text files placed on your device when you visit a website. They help the website remember your preferences, keep you logged in, and understand how the site is used. Similar technologies — such as local storage and mobile device identifiers — serve equivalent purposes on mobile apps, which do not use browser cookies.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-accent mt-8 mb-4">2. Cookies We Use on Our Website</h2>

                                <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Strictly Necessary Cookies</h3>
                                <p>These cookies are essential for the website to function and cannot be switched off. They are usually set in response to actions you take, such as logging in or filling in a form.</p>
                                <div className="overflow-x-auto mt-4 mb-6">
                                    <table className="min-w-full border-collapse border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-50 text-left">
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Purpose</th>
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Type</th>
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Duration</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            <tr>
                                                <td className="p-3 border border-gray-200">Session management &amp; authentication</td>
                                                <td className="p-3 border border-gray-200">First-party</td>
                                                <td className="p-3 border border-gray-200">Session / until logout</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Security (CSRF protection, fraud prevention)</td>
                                                <td className="p-3 border border-gray-200">First-party</td>
                                                <td className="p-3 border border-gray-200">Session</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 border border-gray-200">Cookie consent preference</td>
                                                <td className="p-3 border border-gray-200">First-party</td>
                                                <td className="p-3 border border-gray-200">12 months</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Analytics Cookies</h3>
                                <p>These cookies help us understand how visitors use our website so we can improve it. They collect information in an aggregated, anonymised form.</p>
                                <div className="overflow-x-auto mt-4 mb-6">
                                    <table className="min-w-full border-collapse border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-50 text-left">
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Provider</th>
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Purpose</th>
                                                <th className="p-3 border border-gray-200 font-semibold text-sm">Duration</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            <tr>
                                                <td className="p-3 border border-gray-200 font-medium">Google Analytics</td>
                                                <td className="p-3 border border-gray-200">Understand traffic, page views, and general usage patterns (anonymised)</td>
                                                <td className="p-3 border border-gray-200">Up to 14 months</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Cookies We Do Not Use</h3>
                                <p>We do not use third-party advertising or cross-site behavioural targeting cookies. We do not sell any data collected through cookies to advertisers or data brokers.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-accent mt-8 mb-4">3. Tracking Technologies in Our Mobile App</h2>
                                <p>The PreventVital mobile application does not use browser cookies. Instead, it uses:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Session tokens (JWT):</strong> Stored securely on-device to keep you logged in. These expire automatically and are not shared with third parties.</li>
                                    <li><strong>Device advertising identifiers (IDFA / GAID):</strong> Used only for aggregated, anonymised analytics — never for targeted advertising. You can reset or opt out of these identifiers at any time in your device's privacy settings.</li>
                                    <li><strong>Analytics SDKs (e.g. Firebase / Google Analytics for Firebase):</strong> Used to understand app usage and diagnose crashes, on an aggregated basis.</li>
                                </ul>
                                <p className="mt-4">Full detail on app data collection is available in our <a href="/privacy-policy" className="text-accent font-semibold hover:underline">Privacy Policy</a>.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-accent mt-8 mb-4">4. How to Manage Cookies</h2>
                                <p>You can control or delete cookies through your browser settings at any time:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Most browsers let you block or delete cookies via <em>Settings → Privacy</em></li>
                                    <li>Disabling strictly necessary cookies may prevent parts of our website (such as login) from working correctly</li>
                                    <li>Disabling analytics cookies does not affect your ability to use the website or app</li>
                                    <li>On mobile, you can reset or limit ad tracking identifiers in your device's system settings (iOS: Settings → Privacy → Tracking; Android: Settings → Privacy → Ads)</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-accent mt-8 mb-4">5. Changes to This Cookie Policy</h2>
                                <p>We may update this Cookie Policy from time to time to reflect changes in the technologies we use or for legal or regulatory reasons. We will update the effective date above when we do. Your continued use of our website or app after a change constitutes acceptance of the revised policy.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-accent mt-8 mb-4">6. Contact Us</h2>
                                <p>If you have questions about our use of cookies, contact us at:</p>
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
                                </div>
                            </section>

                            <section className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
                                <p className="mb-2"><strong>gruentzig.ai Private Limited</strong><br/>
                                PreventVital — AI-Powered Preventive Wellness<br/>
                                Hyderabad, Telangana, India<br/>
                                privacy@preventvital.com • https://preventvital.com/cookie-policy</p>
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

export default CookiePolicy;
