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
                <title>AI Health Assessment | VITAL Score - PreventVital</title>
                <meta name="description" content="Take PreventVital's AI-powered health assessment to get your personalized VITAL Score. Understand your cardiovascular, metabolic, and mental wellness profile. Science-backed health risk analysis in minutes." />
                <meta name="keywords" content="AI health assessment, VITAL score, health risk assessment India, cardiovascular risk assessment, metabolic health test, online health assessment, preventvital assessment" />
                <link rel="canonical" href="https://preventvital.com/ai-health-assessment" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="PreventVital" />
                <meta property="og:url" content="https://preventvital.com/ai-health-assessment" />
                <meta property="og:title" content="AI Health Assessment | Get Your VITAL Score - PreventVital" />
                <meta property="og:description" content="AI-powered health assessment: get your personalized VITAL Score and understand your cardiovascular, metabolic, and mental wellness profile." />
                <meta property="og:image" content="https://preventvital.com/og-assessment.jpg" />
                <meta property="og:locale" content="en_IN" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@preventvital" />
                <meta name="twitter:title" content="AI Health Assessment | VITAL Score - PreventVital" />
                <meta name="twitter:description" content="Get your personalized VITAL Score. AI-powered cardiovascular, metabolic, and mental wellness assessment." />
                <meta name="twitter:image" content="https://preventvital.com/og-assessment.jpg" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "MedicalTest",
                    "name": "VITAL Health Risk Assessment",
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
                        style={{ minHeight: 'clamp(560px, 78vh, 780px)' }}
                    >
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=2069&q=80"
                                alt=""
                                className="w-full h-full object-cover"
                                style={{ objectPosition: 'center 30%' }}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/45" />
                        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

                        <div
                            className="container-wide relative z-10 text-center flex flex-col justify-center h-full"
                            style={{ minHeight: 'clamp(560px, 78vh, 780px)', paddingTop: 'clamp(3rem, 2.5rem + 2vw, 4.5rem)', paddingBottom: 'clamp(2.5rem, 2rem + 2vw, 3.5rem)' }}
                        >
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-center">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                                        <Sparkles size={13} className="text-white" />
                                        <span className="text-xs font-semibold text-white tracking-wide">AI-Powered Assessment</span>
                                    </div>
                                </div>

                                <h1
                                    className="font-semibold leading-[1.15] tracking-tight text-white text-balance mx-auto"
                                    style={{ fontSize: 'var(--fz-h1-sm)', maxWidth: '18ch' }}
                                >
                                    Get Your <span style={{ color: '#5eead4' }}>VITAL™ Score</span>
                                </h1>

                                <p
                                    className="text-white/80 leading-relaxed mx-auto"
                                    style={{ fontSize: 'var(--fz-base)', maxWidth: '48ch' }}
                                >
                                    Discover your personal health score and receive tailored recommendations through our advanced predictive analytics engine.
                                </p>
                            </div>

                            {/* Auth card */}
                            <div className="bg-white/95 backdrop-blur-md border border-white/40 rounded-2xl p-8 max-w-sm mx-auto space-y-5" style={{ boxShadow: 'var(--shadow-xl)' }}>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                                    <Shield size={22} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">Authentication Required</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Please log in or create an account to take your personalized, medical-grade VITAL assessment.
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
