// Mirrors the canonical tier cutoffs/labels/colors defined by the backend
// engine's getTierDetails (preventvital-backend/src/services/cvitalScoring.service.js)
// and the mobile app's src/utils/cvitalTier.ts. Keep all three in sync — do not
// re-derive separate bands per screen/client.

export type CvitalTier = 'excellent' | 'good' | 'moderate' | 'high';

export interface CvitalTierConfig {
    tier: CvitalTier;
    label: string;
    color: string;
    accent: string;
    range: string;
}

const TIER_BANDS: CvitalTierConfig[] = [
    { tier: 'excellent', label: 'Excellent', color: '#10d98a', accent: '#059669', range: '90 – 100' },
    { tier: 'good', label: 'Good', color: '#4ade80', accent: '#16a34a', range: '80 – 89' },
    { tier: 'moderate', label: 'Moderate Risk', color: '#f5c842', accent: '#ca8a04', range: '60 – 79' },
    { tier: 'high', label: 'High Risk', color: '#f04f4f', accent: '#b91c1c', range: '1 – 59' },
];

export const getCvitalTierConfig = (score: number): CvitalTierConfig => {
    if (score >= 90) return TIER_BANDS[0];
    if (score >= 80) return TIER_BANDS[1];
    if (score >= 60) return TIER_BANDS[2];
    return TIER_BANDS[3];
};

export const CVITAL_TIER_BANDS = TIER_BANDS;
