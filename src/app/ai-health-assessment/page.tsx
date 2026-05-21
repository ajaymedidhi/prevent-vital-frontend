import Assessment from "@/pages/customer/Assessment";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Shield } from "lucide-react";

const AiHealthAssessmentPage = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <Helmet>
                <title>AI Health Assessment | CVITAL Score - PreventVital</title>
                <meta name="description" content="Take PreventVital's AI-powered health assessment to get your personalized CVITAL Score. Understand your cardiovascular, metabolic, and mental wellness profile. Science-backed health risk analysis in minutes." />
                <meta name="keywords" content="AI health assessment, CVITAL score, health risk assessment India, cardiovascular risk assessment, metabolic health test, online health assessment, preventvital assessment" />
                <link rel="canonical" href="https://preventvital.com/ai-health-assessment" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="PreventVital" />
                <meta property="og:url" content="https://preventvital.com/ai-health-assessment" />
                <meta property="og:title" content="AI Health Assessment | Get Your CVITAL Score - PreventVital" />
                <meta property="og:description" content="AI-powered health assessment: get your personalized CVITAL Score and understand your cardiovascular, metabolic, and mental wellness profile." />
                <meta property="og:image" content="https://preventvital.com/og-assessment.jpg" />
                <meta property="og:locale" content="en_IN" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@preventvital" />
                <meta name="twitter:title" content="AI Health Assessment | CVITAL Score - PreventVital" />
                <meta name="twitter:description" content="Get your personalized CVITAL Score. AI-powered cardiovascular, metabolic, and mental wellness assessment." />
                <meta name="twitter:image" content="https://preventvital.com/og-assessment.jpg" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "MedicalTest",
                    "name": "CVITAL Health Risk Assessment",
                    "description": "AI-powered comprehensive health risk assessment covering cardiovascular, metabolic, and mental wellness parameters.",
                    "usedToDiagnose": ["Cardiovascular Risk", "Metabolic Health Risk", "Mental Wellness"],
                    "provider": { "@type": "Organization", "name": "PreventVital", "url": "https://preventvital.com/" },
                    "url": "https://preventvital.com/ai-health-assessment"
                })}</script>
            </Helmet>

            <div className="bg-background min-h-screen">
                {isAuthenticated ? (
                    <Assessment />
                ) : (
                    <section
                        className="relative w-full overflow-hidden"
                        style={{ paddingTop: 'clamp(3rem, 2rem + 4vw, 6rem)', paddingBottom: 'clamp(3rem, 2rem + 4vw, 6rem)' }}
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

                        <div className="container-wide relative z-10 text-center">
                            <div className="space-y-6 mb-10">
                                <div className="flex justify-center">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-border rounded-full shadow-xs">
                                        <Sparkles size={13} className="text-accent" />
                                        <span className="text-xs font-semibold text-primary tracking-wide">AI-Powered Assessment</span>
                                    </div>
                                </div>

                                <h1
                                    className="font-semibold leading-[1.1] tracking-tight text-foreground text-balance mx-auto"
                                    style={{ fontSize: 'var(--fz-h1)', maxWidth: '18ch' }}
                                >
                                    Get Your{' '}
                                    <span className="gradient-text-soft">CVITAL™ Score</span>
                                </h1>

                                <p
                                    className="text-muted-foreground leading-relaxed mx-auto"
                                    style={{ fontSize: 'var(--fz-lg)', maxWidth: '48ch' }}
                                >
                                    Discover your personal health score and receive tailored recommendations through our advanced predictive analytics engine.
                                </p>
                            </div>

                            {/* Auth card */}
                            <div className="bg-card border border-border rounded-2xl p-8 max-w-sm mx-auto shadow-sm space-y-5">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                                    <Shield size={22} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">Authentication Required</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Please log in or create an account to take your personalized, medical-grade CVITAL assessment.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 pt-1">
                                    <Link
                                        to="/login?redirect=ai-health-assessment"
                                        className="group w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                                        style={{ background: 'hsl(var(--primary))' }}
                                    >
                                        Log In
                                        <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                    <Link
                                        to="/signup?redirect=ai-health-assessment"
                                        className="w-full inline-flex items-center justify-center py-3 rounded-xl text-sm font-semibold text-foreground border border-border hover:bg-muted transition-colors"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default AiHealthAssessmentPage;
