
import MedicalPortalInteractive from "@/components/medical-professional-portal/MedicalPortalInteractive";
import { Helmet } from "react-helmet-async";

const MedicalProfessionalPortalPage = () => {
    return (
        <>
            <Helmet>
                <title>Medical Professional Portal | AI Clinical Tools - PreventVital</title>
                <meta
                    name="description"
                    content="PreventVital's medical professional portal: AI-driven patient health analytics, predictive risk assessment, telemedicine integration, and evidence-based preventive care protocols. Designed for doctors and healthcare providers in India."
                />
                <meta name="keywords" content="medical professional portal, AI clinical tools, doctor health analytics, telemedicine integration, patient risk assessment, preventive care for doctors, healthcare provider platform India" />
                <link rel="canonical" href="https://preventvital.com/medical-professional-portal" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="PreventVital" />
                <meta property="og:url" content="https://preventvital.com/medical-professional-portal" />
                <meta property="og:title" content="Medical Professional Portal | AI Clinical Tools - PreventVital" />
                <meta property="og:description" content="AI-driven patient health analytics, predictive risk assessment, and telemedicine integration for healthcare providers." />
                <meta property="og:image" content="https://preventvital.com/og-medical.jpg" />
                <meta property="og:locale" content="en_IN" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@preventvital" />
                <meta name="twitter:title" content="Medical Professional Portal | AI Clinical Tools - PreventVital" />
                <meta name="twitter:description" content="AI-driven patient analytics, predictive risk assessment, and telemedicine for healthcare providers." />
                <meta name="twitter:image" content="https://preventvital.com/og-medical.jpg" />
            </Helmet>

            <MedicalPortalInteractive />
        </>
    );
};

export default MedicalProfessionalPortalPage;
