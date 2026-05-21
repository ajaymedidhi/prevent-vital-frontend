import { Helmet } from 'react-helmet-async';

interface PageSEOProps {
    title: string;
    description: string;
    canonical: string;
    keywords?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    noindex?: boolean;
    jsonLd?: object | object[];
}

/**
 * Drop-in SEO component. Adds title, description, canonical, OG, Twitter,
 * and optional JSON-LD to any page. Keeps per-page SEO DRY and consistent.
 *
 * Usage:
 *   <PageSEO
 *     title="Shop | Health Products - PreventVital"
 *     description="..."
 *     canonical="https://preventvital.com/shop"
 *     ogImage="https://preventvital.com/og-shop.jpg"
 *   />
 */
const PageSEO = ({
    title,
    description,
    canonical,
    keywords,
    ogImage = 'https://preventvital.com/og-image.jpg',
    ogType = 'website',
    noindex = false,
    jsonLd,
}: PageSEOProps) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large'} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph */}
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content="PreventVital" />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@preventvital" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* JSON-LD structured data */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
                </script>
            )}
        </Helmet>
    );
};

export default PageSEO;
