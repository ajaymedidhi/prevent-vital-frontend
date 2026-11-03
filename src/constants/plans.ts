export const PLANS = [
    {
        id: 'free',
        name: 'Basic',
        monthlyPrice: 0,
        annualPrice: 0,
        icon: 'leaf',
        color: '#64748B',
        accentBg: '#F1F5F9',
        features: [
            'Basic health tracking',
            'VITAL score (1 assessment/month)',
            'Community access',
            '4 free wellness programs',
        ],
        buttonColor: '#64748B',
        buttonText: 'Current Plan',
        popular: false,
    },
    {
        id: 'pro',
        name: 'Individual',
        monthlyPrice: 0,
        annualPrice: 999,
        listPrice: 4999,
        gstExtra: true,
        icon: 'person',
        color: '#D97706',
        accentBg: '#FFFBEB',
        features: [
            'Everything in Free',
            'Advanced analytics & Unlimited assessments',
            'Wearable device sync',
            'AI health insights',
        ],
        buttonColor: '#D97706',
        buttonText: 'Upgrade to Individual',
        popular: true,
    },
    {
        id: 'family',
        name: 'Family',
        monthlyPrice: 0,
        annualPrice: 1999,
        icon: 'people',
        color: '#7C3AED',
        accentBg: '#F5F3FF',
        features: [
            'Everything in Individual',
            'Up to 4 family members',
            'Personal health coach',
            'Dedicated support line',
        ],
        buttonColor: '#7C3AED',
        buttonText: 'Upgrade to Family',
        popular: false,
    },
];

export type Plan = typeof PLANS[number];

export const getPlanConfig = (planId?: string | null): Plan => {
    let id = (planId || 'free').toLowerCase();
    if (id === 'basic') id = 'free';
    return PLANS.find(p => p.id === id) || PLANS[0];
};
