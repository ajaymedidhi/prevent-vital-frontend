
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/homepage/HeroSection';
import TrustIndicators from '@/components/homepage/TrustIndicators';
import WellnessJourney from '@/components/homepage/WellnessJourney';
import ConditionCards from '@/components/homepage/ConditionCards';
import PlatformDemo from '@/components/homepage/PlatformDemo';
import MeetVita from '@/components/homepage/MeetVita';
import WellnessTeamSection from '@/components/homepage/WellnessTeamSection';
import ClinicalCredibility from '@/components/homepage/ClinicalCredibility';
import TestimonialSection from '@/components/homepage/TestimonialSection';
import CTASection from '@/components/homepage/CTASection';
import FlowingDivider from '@/components/homepage/FlowingDivider';
import ProgramQuickNav from '@/components/homepage/ProgramQuickNav';
import ChatWithVitaButton from '@/components/homepage/ChatWithVitaButton';

const Index = () => {
    return (
        <>
            <Helmet>
                <title>PreventVital - India's AI-Powered Preventive Healthcare Platform</title>
                <meta
                    name="description"
                    content="Empowering you with AI-driven health predictions, personalized wellness plans, and disease prevention programs. India's leading preventive healthcare platform. Get your VITAL Score today."
                />
                <meta name="keywords" content="preventvital, AI health assessment, preventive healthcare India, VITAL score, health risk assessment, disease prevention, wellness platform, AI wellness" />
                <link rel="canonical" href="https://preventvital.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="PreventVital" />
                <meta property="og:url" content="https://preventvital.com/" />
                <meta property="og:title" content="PreventVital - India's AI-Powered Preventive Healthcare Platform" />
                <meta property="og:description" content="AI-driven health predictions, personalized wellness plans, and disease prevention programs. Get your VITAL Score today." />
                <meta property="og:image" content="https://preventvital.com/og-image.jpg" />
                <meta property="og:locale" content="en_IN" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@preventvital" />
                <meta name="twitter:title" content="PreventVital - India's AI-Powered Preventive Healthcare" />
                <meta name="twitter:description" content="AI-driven health predictions, personalized wellness plans, and disease prevention programs." />
                <meta name="twitter:image" content="https://preventvital.com/og-image.jpg" />
            </Helmet>

            <main className="landing-warmth min-h-screen bg-background text-foreground">
                <HeroSection />
                {/*
                // Temporarily hidden as per client request.
                // Metrics will be updated and re-enabled once official numbers are finalized.
                <TrustIndicators />
                */}
                <WellnessJourney />
                <PlatformDemo />
                <MeetVita />
                <ConditionCards />
                <FlowingDivider className="bg-background" />
                <WellnessTeamSection />
                {/*
                // Temporarily hidden as per client request.
                // Metrics will be updated and re-enabled once official numbers are finalized.
                <ClinicalCredibility />
                */}
                <TestimonialSection />
                <CTASection />
            </main>
            <ProgramQuickNav />
            <ChatWithVitaButton />
        </>
    );
};

export default Index;
