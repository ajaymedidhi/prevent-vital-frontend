export const PLANS = [
    {
        id: 'free',
        name: 'Free',
        monthlyPrice: 0,
        annualPrice: 0,
        features: ['Basic Health Tracking', 'Community Access'],
        isPopular: false
    },
    {
        id: 'premium',
        name: 'Premium',
        monthlyPrice: 299,
        annualPrice: 2999,
        features: ['Basic Health Tracking', 'Community Access', 'Priority Support', 'Ad-free Experience'],
        isPopular: false
    },
    {
        id: 'pro',
        name: 'Pro',
        monthlyPrice: 499,
        annualPrice: 4999,
        features: ['All Premium Features', 'Advanced Analytics', '1 Free Consultation/mo', 'Device Sync'],
        isPopular: true
    },
    {
        id: 'family',
        name: 'Family',
        monthlyPrice: 999,
        annualPrice: 9999,
        features: ['All Pro Features', 'Unlimited Consultations', 'Family Plan (up to 4)', 'Personal Health Coach'],
        isPopular: false
    }
];
