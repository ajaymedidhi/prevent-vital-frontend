
import { Helmet } from 'react-helmet-async';
import TherapeuticInteractive from '@/components/therapeutic-programs/TherapeuticInteractive';

const TherapeuticProgramsPage = () => {
    return (
        <>
            <Helmet>
                <title>Therapeutic Programs Center | Yoga, Meditation & Wellness - PreventVital</title>
                <meta
                    name="description"
                    content="Explore PreventVital's evidence-based therapeutic programs: yoga therapy, meditation, breathwork, nutrition coaching, and mental health support. Disease-specific wellness programs designed by medical experts in India."
                />
                <meta
                    name="keywords"
                    content="therapeutic wellness programs, yoga therapy India, disease-specific yoga, meditation for health, breathwork pranayama, nutrition coaching, mental health support, preventvital therapeutic"
                />
                <link rel="canonical" href="https://preventvital.com/therapeutic-programs-center" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="PreventVital" />
                <meta property="og:url" content="https://preventvital.com/therapeutic-programs-center" />
                <meta property="og:title" content="Therapeutic Programs Center | Yoga, Meditation & Wellness - PreventVital" />
                <meta property="og:description" content="Evidence-based therapeutic programs: yoga therapy, meditation, breathwork, nutrition coaching, and mental health support designed by medical experts." />
                <meta property="og:image" content="https://preventvital.com/og-therapeutic.jpg" />
                <meta property="og:locale" content="en_IN" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@preventvital" />
                <meta name="twitter:title" content="Therapeutic Programs Center | Yoga, Meditation & Wellness - PreventVital" />
                <meta name="twitter:description" content="Evidence-based therapeutic programs: yoga therapy, meditation, breathwork, nutrition coaching, and mental health support." />
                <meta name="twitter:image" content="https://preventvital.com/og-therapeutic.jpg" />

                {/* JSON-LD */}
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "PreventVital Therapeutic Programs Center",
                    "description": "Evidence-based therapeutic wellness programs including yoga therapy, meditation, breathwork (pranayama), lifestyle and nutrition coaching, and mental health support for chronic disease management.",
                    "provider": {
                        "@type": "Organization",
                        "name": "PreventVital",
                        "url": "https://preventvital.com/"
                    },
                    "serviceType": ["Yoga Therapy", "Meditation", "Breathwork", "Nutrition Coaching", "Mental Health Support"],
                    "areaServed": { "@type": "Country", "name": "India" },
                    "url": "https://preventvital.com/therapeutic-programs-center",
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "Therapeutic Wellness Programs",
                        "itemListElement": [
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Yoga Therapy" } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Meditation & Mindfulness" } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Breathwork (Pranayama)" } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lifestyle & Nutrition Coaching" } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mental Health Support" } }
                        ]
                    }
                })}</script>
            </Helmet>
            <TherapeuticInteractive />
        </>
    );
};

export default TherapeuticProgramsPage;
