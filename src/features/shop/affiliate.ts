// Amazon affiliate products (backend Product.source === 'amazon', managed at /admin/products).
// We don't sell them: no price, stock or cart. "Buy on Amazon" opens `affiliateUrl`, which
// carries the Associates tag. Mirrors the mobile app's src/utils/affiliate.ts.
import type { Product } from '@/store/shopSlice';

export const isAmazonProduct = (p: Pick<Product, 'source'>) => p.source === 'amazon';

// Required by the Amazon Associates agreement wherever these products are shown.
export const AMAZON_DISCLOSURE =
    'As an Amazon Associate, PreventVital earns from qualifying purchases. Price and availability are shown on Amazon.';

// Health goal ids a product can be tagged with (backend config/healthGoals.js, current ids only).
export const PRODUCT_GOALS = [
    { value: 'heart_health', label: 'Heart health' },
    { value: 'blood_pressure', label: 'Blood pressure' },
    { value: 'cholesterol', label: 'Cholesterol' },
    { value: 'diabetes_risk', label: 'Diabetes risk' },
    { value: 'healthy_weight', label: 'Healthy weight' },
    { value: 'physical_activity', label: 'Physical activity' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'stress', label: 'Stress' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'deaddiction', label: 'Quit smoking / alcohol' },
    { value: 'understand_health', label: 'Understand my health' }
];

export const goalLabel = (id: string) => PRODUCT_GOALS.find(g => g.value === id)?.label;

// Consumer trackers get a "not a medical device" note. BP monitors and ECG patches are
// left out on purpose: some of them are medical devices.
export const WEARABLE_CATEGORIES = ['device', 'smart_watch', 'fitness_tracker'];

// Admin descriptions are often pasted from Amazon, with footnote markers like "[1]".
export const cleanProductText = (text?: string) => (text || '').replace(/\[\d+\]/g, '').trim();

// Amazon listing titles are "Name - Variant | Feature, Feature, …" or just a comma list
// of features. Splits one into a title (if it has one) and short feature tags.
export const splitListingTitle = (text?: string): { title?: string; tags: string[] } => {
    const clean = cleanProductText(text);
    if (!clean) return { tags: [] };
    const [head, ...rest] = clean.split(/\s*\|\s*/);
    // "Tracker with Fitness, Heart Rate" → "Fitness", "Heart Rate".
    const toTags = (s: string) => s.split(/\s*,\s*/)
        .map((t, i) => (i === 0 ? t.replace(/^\w+ with\s+/i, '') : t).trim())
        .filter(t => t && t.length <= 40);
    if (rest.length) return { title: head, tags: toTags(rest.join(', ')) };
    const pieces = clean.split(/\s*,\s*/);
    if (pieces.length >= 3 && pieces.every(p => p.length <= 40)) return { tags: toTags(clean) };
    return { title: clean, tags: [] };
};

// Amazon's rules don't allow prices we type in ourselves, and pasted descriptions often
// contain them ("₹21,990/year"), so sentences with a rupee amount are dropped.
const PRICE_RE = /(₹|\bRs\.?\s?|\bINR\s?)\s?\d/i;
const dropPriceSentences = (text: string) =>
    text.split(/(?<=[.!?])\s+/).filter(s => !PRICE_RE.test(s)).join(' ').trim();

export interface ProductFeature { heading?: string; body: string }

// Pasted Amazon "About this item" bullets are one per line, usually "Heading: body".
export const parseProductFeatures = (text?: string): ProductFeature[] =>
    cleanProductText(text)
        .split(/\n+/)
        .map(line => line.trim())
        .filter(Boolean)
        .map(line => {
            const m = line.match(/^([^:.]{3,60}):\s+(.+)$/);
            const heading = m ? m[1].trim() : undefined;
            return { heading, body: dropPriceSentences(m ? m[2] : line) };
        })
        .filter(f => f.body);
