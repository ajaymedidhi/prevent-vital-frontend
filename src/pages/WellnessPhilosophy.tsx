import { Flower2, Wind, Brain, Apple, Smile } from "lucide-react";
import { Helmet } from "react-helmet-async";

const components = [
    {
        icon: Flower2,
        title: "Yoga Therapy",
        description: "Disease-specific yoga protocols designed to improve flexibility, strength, and physiological function."
    },
    {
        icon: Brain,
        title: "Meditation & Mindfulness",
        description: "Guided practices to reduce stress, improve focus, and promote mental clarity and emotional balance."
    },
    {
        icon: Wind,
        title: "Breathwork (Pranayama)",
        description: "Controlled breathing techniques to regulate the nervous system and enhance respiratory health."
    },
    {
        icon: Apple,
        title: "Lifestyle & Nutrition",
        description: "Personalized dietary and lifestyle coaching to support your body's natural healing processes."
    },
    {
        icon: Smile,
        title: "Mental Health Support",
        description: "Compassionate support to address anxiety, depression, and the psychological aspects of chronic disease."
    }
];

const WellnessPhilosophy = () => {
    return (
        <>
        <Helmet>
            <title>Wellness Philosophy | Holistic Health Rooted in Science - PreventVital</title>
            <meta
                name="description"
                content="Explore PreventVital's wellness philosophy: integrating yoga therapy, meditation, breathwork (pranayama), nutrition, and mental health support with evidence-based medicine for complete holistic health."
            />
            <meta
                name="keywords"
                content="holistic wellness philosophy, yoga therapy, meditation for wellness, breathwork health, preventive wellness India, holistic health approach, traditional medicine modern science"
            />
            <link rel="canonical" href="https://preventvital.com/wellness-philosophy" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="PreventVital" />
            <meta property="og:url" content="https://preventvital.com/wellness-philosophy" />
            <meta property="og:title" content="Wellness Philosophy | Holistic Health Rooted in Science - PreventVital" />
            <meta property="og:description" content="PreventVital integrates yoga, meditation, breathwork, nutrition, and mental health support with modern medicine for complete holistic health." />
            <meta property="og:image" content="https://preventvital.com/og-wellness.jpg" />
            <meta property="og:locale" content="en_IN" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@preventvital" />
            <meta name="twitter:title" content="Wellness Philosophy | Holistic Health Rooted in Science - PreventVital" />
            <meta name="twitter:description" content="Integrating yoga, meditation, breathwork, nutrition, and mental health support with modern medicine." />
            <meta name="twitter:image" content="https://preventvital.com/og-wellness.jpg" />
        </Helmet>
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="section-padding bg-section-alt">
                    <div className="container text-center max-w-4xl">
                        <h1 className="font-bold mb-6 text-balance" style={{ fontSize: 'var(--fz-h1-sm)' }}>
                            Holistic Wellness, Rooted in Science & Tradition
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
                            We integrate time-tested ancient wellness practices with modern medical science to provide a truly holistic approach to health.
                        </p>
                    </div>
                </section>

                {/* Components Grid */}
                <section className="section-padding">
                    <div className="container">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {components.map((item, index) => (
                                <div key={index} className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group">
                                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                                        <item.icon className="w-7 h-7 text-accent" />
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
        </>
    );
};

export default WellnessPhilosophy;
