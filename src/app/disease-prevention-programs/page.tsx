
import DiseaseProgramsInteractive from "@/components/disease-prevention-programs/DiseaseProgramsInteractive";
import { Helmet } from "react-helmet-async";

const DiseasePreventionProgramsPage = () => {
    return (
        <>
            <Helmet>
                <title>Disease Prevention Programs | Diabetes, Cardiac & More - PreventVital</title>
                <meta name="description" content="AI-powered disease prevention programs for diabetes, hypertension, cardiac health, obesity, and more. Evidence-based medical protocols designed by specialists. Start your prevention journey today." />
                <meta name="keywords" content="disease prevention programs India, diabetes prevention, hypertension management, cardiac health program, AI health programs, chronic disease prevention, preventvital programs" />
                <link rel="canonical" href="https://preventvital.com/disease-prevention-programs" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="PreventVital" />
                <meta property="og:url" content="https://preventvital.com/disease-prevention-programs" />
                <meta property="og:title" content="Disease Prevention Programs | Diabetes, Cardiac & More - PreventVital" />
                <meta property="og:description" content="AI-powered disease prevention programs for diabetes, hypertension, cardiac health, obesity, and more. Evidence-based medical protocols." />
                <meta property="og:image" content="https://preventvital.com/og-programs.jpg" />
                <meta property="og:locale" content="en_IN" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@preventvital" />
                <meta name="twitter:title" content="Disease Prevention Programs | Diabetes, Cardiac & More - PreventVital" />
                <meta name="twitter:description" content="AI-powered disease prevention programs for diabetes, hypertension, cardiac health, and more." />
                <meta name="twitter:image" content="https://preventvital.com/og-programs.jpg" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "name": "PreventVital Disease Prevention Programs",
                    "description": "AI-powered disease prevention programs designed by medical specialists",
                    "url": "https://preventvital.com/disease-prevention-programs",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Diabetes Prevention Program" },
                        { "@type": "ListItem", "position": 2, "name": "Hypertension Management Program" },
                        { "@type": "ListItem", "position": 3, "name": "Cardiac Health Program" },
                        { "@type": "ListItem", "position": 4, "name": "Obesity & Metabolic Syndrome Program" },
                        { "@type": "ListItem", "position": 5, "name": "Mental Wellness Program" }
                    ]
                })}</script>
            </Helmet>
            <DiseaseProgramsInteractive />
        </>
    );
};

export default DiseasePreventionProgramsPage;
