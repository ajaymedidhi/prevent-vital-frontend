
import { Helmet } from 'react-helmet-async';
import PartnershipPortalInteractive from '@/components/partnership-portal/PartnershipPortalInteractive';

const PartnershipPortalPage = () => {
    return (
        <>
            <Helmet>
                <title>Partnership Portal | Corporate Wellness Partner - PreventVital</title>
                <meta
                    name="description"
                    content="Partner with PreventVital to deliver AI-powered preventive healthcare to your employees. Corporate wellness partnerships, white-label solutions, and B2B health programs for businesses in India."
                />
                <meta
                    name="keywords"
                    content="corporate wellness partnership, B2B healthcare, employee wellness program, corporate health partner, preventvital partnership, healthcare B2B India"
                />
                <link rel="canonical" href="https://preventvital.com/partnership-portal" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="PreventVital" />
                <meta property="og:url" content="https://preventvital.com/partnership-portal" />
                <meta property="og:title" content="Partnership Portal | Corporate Wellness Partner - PreventVital" />
                <meta property="og:description" content="Partner with PreventVital to deliver AI-powered preventive healthcare to your employees. Corporate wellness partnerships and B2B health programs." />
                <meta property="og:image" content="https://preventvital.com/og-partnership.jpg" />
                <meta property="og:locale" content="en_IN" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@preventvital" />
                <meta name="twitter:title" content="Partnership Portal | Corporate Wellness Partner - PreventVital" />
                <meta name="twitter:description" content="Partner with PreventVital to deliver AI-powered preventive healthcare to your employees." />
                <meta name="twitter:image" content="https://preventvital.com/og-partnership.jpg" />

                {/* JSON-LD */}
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "PreventVital Corporate Partnership Program",
                    "description": "B2B healthcare partnership program enabling businesses to offer AI-powered preventive healthcare and wellness programs to their employees.",
                    "provider": {
                        "@type": "Organization",
                        "name": "PreventVital",
                        "url": "https://preventvital.com/"
                    },
                    "serviceType": "Corporate Wellness Partnership",
                    "areaServed": { "@type": "Country", "name": "India" },
                    "url": "https://preventvital.com/partnership-portal"
                })}</script>
            </Helmet>
            <PartnershipPortalInteractive />
        </>
    );
};

export default PartnershipPortalPage;
