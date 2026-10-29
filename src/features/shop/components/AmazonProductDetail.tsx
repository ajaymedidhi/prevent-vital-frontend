import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, ChevronDown, ChevronUp, ExternalLink, Info, Lock, RotateCcw, ShieldCheck,
    ShoppingBag, Tag, CheckCircle2, Share2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/store/shopSlice';
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
    AMAZON_DISCLOSURE, WEARABLE_CATEGORIES, cleanProductText, goalLabel, parseProductFeatures,
    splitListingTitle,
} from '../affiliate';

// Product page for an Amazon affiliate product (Product.source === 'amazon'). Same layout as
// the mobile app's AffiliateProductScreen. We don't sell it: "Buy on Amazon" opens the
// affiliate link in a new tab. No price is shown (Amazon only allows prices from its API).

const BRAND_GRADIENT = 'linear-gradient(135deg, #3A8AB5 0%, #51A6CB 28%, #9035A0 70%, #BF40A3 100%)';
const FEATURES_PREVIEW = 3;

const TRUST = [
    { icon: Lock, label: 'Secure checkout on Amazon', className: 'text-emerald-700' },
    { icon: RotateCcw, label: 'Returns as per Amazon', className: 'text-slate-600' },
    { icon: ShieldCheck, label: 'Picked by PreventVital', className: 'text-slate-600' },
];

// rel="sponsored" marks a paid link for search engines, as Google asks for affiliate links.
const AMAZON_LINK_REL = 'sponsored noopener noreferrer';

const BuyOnAmazon = ({ url, name, className = '' }: { url: string; name: string; className?: string }) => (
    <a
        href={url}
        target="_blank"
        rel={AMAZON_LINK_REL}
        aria-label={`Buy ${name} on Amazon (opens in a new tab)`}
        className={`flex items-center justify-center gap-2 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:-translate-y-px ${className}`}
        style={{ background: BRAND_GRADIENT }}
    >
        Buy on Amazon <ExternalLink size={18} />
    </a>
);

const SoldOnAmazonDialog = () => (
    <Dialog>
        <DialogTrigger asChild>
            <button className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-xl bg-slate-100/95 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500 text-white">
                    <ShoppingBag size={12} />
                </span>
                Sold on Amazon
                <Info size={15} className="text-slate-500" />
            </button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Sold on Amazon</DialogTitle>
                <DialogDescription asChild>
                    <div className="space-y-3 pt-2 text-sm leading-relaxed text-slate-600">
                        <p>PreventVital doesn’t sell this product and isn’t the seller, agent or stockist. It is listed and sold on Amazon.in by Amazon and its sellers.</p>
                        <p>Your order is placed, priced, delivered, returned and supported on Amazon under Amazon’s terms. For order or product issues, contact Amazon customer service.</p>
                        <p>As an Amazon Associate, PreventVital earns from qualifying purchases, at no extra cost to you.</p>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
);

const AmazonProductDetail = ({ product }: { product: Product }) => {
    const navigate = useNavigate();
    const images = product.images?.length ? product.images : (product.image ? [product.image] : []);
    const [selectedImage, setSelectedImage] = useState(images[0] || '/placeholder.png');
    const [showAllFeatures, setShowAllFeatures] = useState(false);

    const name = product.name;
    const listing = splitListingTitle(product.shortDescription);
    // A short admin name ("Google Fitbit") becomes the brand line over the listing title;
    // a long one is the title itself.
    const title = listing.title && name.length <= 30 ? listing.title : name;
    const brand = title !== name ? name : undefined;
    const features = parseProductFeatures(product.detailedDescription);
    const hasHeadings = features.some(f => f.heading);
    const visibleFeatures = showAllFeatures ? features : features.slice(0, FEATURES_PREVIEW);
    const goals = (product.healthGoals || []).map(goalLabel).filter(Boolean) as string[];
    const benefits = (product.benefits || []).map(cleanProductText).filter(Boolean);
    const isWearable = WEARABLE_CATEGORIES.includes(product.category);
    const url = product.affiliateUrl || '';

    const onShare = async () => {
        const shareUrl = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({ title: name, url: shareUrl });
            } else {
                await navigator.clipboard.writeText(shareUrl);
                toast.success('Link copied');
            }
        } catch {
            // Share sheet dismissed.
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-28 lg:pb-12">
            {/* Header: brand gradient, as on the app */}
            <div className="text-white" style={{ background: BRAND_GRADIENT }}>
                <div className="container-wide h-14 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white"
                    >
                        <ChevronLeft size={18} /> Back to Shop
                    </button>
                    <span className="font-extrabold tracking-tight">PreventVital Shop</span>
                    <button onClick={onShare} className="p-2 rounded-lg hover:bg-white/15" aria-label="Share">
                        <Share2 size={16} />
                    </button>
                </div>
                <div className="bg-slate-900/20 py-2 text-center text-[11px] font-extrabold tracking-wider">
                    PICKED BY PREVENTVITAL · SOLD &amp; DELIVERED BY AMAZON
                </div>
            </div>

            <div className="container-wide py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-14">
                    {/* LEFT: images */}
                    <div className="lg:sticky lg:top-24 self-start space-y-4">
                        <div className="relative aspect-square rounded-3xl bg-white overflow-hidden">
                            <SoldOnAmazonDialog />
                            <img src={selectedImage} alt={name} className="w-full h-full object-contain p-8" />
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-1">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-20 h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 bg-white ${
                                            selectedImage === img ? 'border-indigo-600' : 'border-transparent hover:border-slate-300'
                                        }`}
                                        aria-label={`Image ${idx + 1}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain p-2" />
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                            {TRUST.map(({ icon: Icon, label, className }) => (
                                <span key={label} className={`inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-semibold ${className}`}>
                                    <Icon size={15} /> {label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: details */}
                    <div className="space-y-5">
                        <div>
                            {brand && <p className="mb-1.5 text-sm font-extrabold uppercase tracking-wide text-slate-500">{brand}</p>}
                            <h1 className="text-2xl lg:text-3xl font-extrabold leading-tight text-slate-900">{title}</h1>
                            {listing.tags.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {listing.tags.map(t => (
                                        <span key={t} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">{t}</span>
                                    ))}
                                </div>
                            )}
                            <a
                                href={url}
                                target="_blank"
                                rel={AMAZON_LINK_REL}
                                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-2.5 text-sm font-bold text-indigo-700 hover:bg-indigo-100"
                            >
                                <Tag size={16} /> See today’s price &amp; offers on Amazon
                            </a>
                        </div>

                        <BuyOnAmazon url={url} name={name} className="hidden lg:flex h-14 text-base" />

                        {goals.length > 0 && (
                            <section className="rounded-2xl bg-white p-5">
                                <h2 className="mb-3 font-extrabold text-slate-900">Picked for these goals</h2>
                                <div className="flex flex-wrap gap-2">
                                    {goals.map(g => (
                                        <span key={g} className="rounded-lg bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-slate-800">{g}</span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {isWearable && (
                            <div className="flex gap-2 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
                                <Info size={18} className="mt-0.5 flex-shrink-0" />
                                Not a medical device. Its heart rate and sleep readings are estimates and don’t change your VITAL Score.
                            </div>
                        )}

                        {benefits.length > 0 && (
                            <section className="rounded-2xl bg-white p-5">
                                <h2 className="mb-3 font-extrabold text-slate-900">Highlights</h2>
                                <ul className="space-y-2">
                                    {benefits.map((b, i) => (
                                        <li key={i} className="flex gap-2 text-sm text-slate-700">
                                            <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-indigo-600" /> {b}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {features.length > 0 && (
                            <section className="rounded-2xl bg-white p-5">
                                <h2 className="mb-3 font-extrabold text-slate-900">{hasHeadings ? 'Key features' : 'About this product'}</h2>
                                <div className="divide-y divide-slate-100">
                                    {visibleFeatures.map((f, i) => (
                                        <div key={i} className="py-3 first:pt-0">
                                            {f.heading && <h3 className="mb-1 text-[15px] font-bold text-slate-900">{f.heading}</h3>}
                                            <p className="text-sm leading-relaxed text-slate-600">{f.body}</p>
                                        </div>
                                    ))}
                                </div>
                                {features.length > FEATURES_PREVIEW && (
                                    <button
                                        onClick={() => setShowAllFeatures(v => !v)}
                                        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-50 py-2.5 text-sm font-bold text-indigo-700 hover:bg-indigo-100"
                                    >
                                        {showAllFeatures ? 'Show fewer' : `Show all ${features.length} features`}
                                        {showAllFeatures ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>
                                )}
                            </section>
                        )}

                        <p className="text-xs leading-relaxed text-slate-500">{AMAZON_DISCLOSURE}</p>
                    </div>
                </div>
            </div>

            {/* Mobile sticky action bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-white/95 p-4 backdrop-blur-sm">
                <BuyOnAmazon url={url} name={name} className="h-12 text-sm" />
            </div>
        </div>
    );
};

export default AmazonProductDetail;
