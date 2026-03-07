import Assessment from "@/pages/customer/Assessment";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";

const AiHealthAssessmentPage = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <Helmet>
                <title>AI Health Assessment - PreventVital</title>
                <meta
                    name="description"
                    content="Take our comprehensive AI-driven health assessment to understand your cardiovascular, metabolic, and mental wellness profile."
                />
            </Helmet>

            <div className="bg-background min-h-screen">
                {isAuthenticated ? (
                    <Assessment />
                ) : (
                    <>
                        <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-12 lg:py-20">
                            <div className="container mx-auto px-4 text-center">
                                <h1 className="text-3xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-pink-500 pb-2">
                                    Vital Score Assessment
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                                    Discover your personal health score and receive tailored recommendations through our advanced predictive analytics engine.
                                </p>

                                <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-lg max-w-md mx-auto">
                                    <h3 className="text-xl font-bold mb-4">Authentication Required</h3>
                                    <p className="text-slate-500 mb-6">
                                        Please log in or create an account to take your personalized, medical-grade CVITAL assessment.
                                    </p>
                                    <div className="flex flex-col gap-4">
                                        <Link to="/login?redirect=ai-health-assessment" className="w-full py-3 bg-primary text-white font-bold rounded-xl text-center hover:bg-primary/90 transition-colors">
                                            Log In
                                        </Link>
                                        <Link to="/signup?redirect=ai-health-assessment" className="w-full py-3 bg-white border-2 border-primary/20 text-primary font-bold rounded-xl text-center hover:bg-primary/5 transition-colors">
                                            Create Account
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </>
    );
};

export default AiHealthAssessmentPage;
