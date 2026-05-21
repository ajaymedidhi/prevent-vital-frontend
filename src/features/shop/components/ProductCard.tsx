import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import RegionBadge from './RegionBadge';
import { Product } from '@/store/shopSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/shopSlice';
import { toast } from "sonner";
import { ShoppingCart, Heart, Star } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    userRegion: string;
}

const ProductCard = ({ product, userRegion }: ProductCardProps) => {
    const dispatch  = useDispatch();
    const mainImage = product.images?.[0] || product.image || '/placeholder.png';

    const getBadge = () => {
        if (product.stock <= 5 && product.stock > 0) return { label: 'Limited',     color: 'bg-orange-500' };
        if (product.category === 'wearables')         return { label: 'Best Seller', color: 'bg-primary'    };
        if (product.category === 'test_kits')         return { label: 'Premium',     color: 'bg-accent'     };
        return null;
    };

    const getHealthTag = () => {
        switch (product.category) {
            case 'wearables':   return { label: '❤️ Supports Heart Health',    color: 'text-rose-600 bg-rose-50 border-rose-100'       };
            case 'test_kits':   return { label: '🔬 Know Your Risk Profile',   color: 'text-primary bg-primary/5 border-primary/15'    };
            case 'supplements': return { label: '💊 Supports Metabolic Health',color: 'text-emerald-600 bg-emerald-50 border-emerald-100' };
            default:            return { label: '🛡️ Supports Wellness',        color: 'text-accent bg-accent/5 border-accent/15'       };
        }
    };

    const badge     = getBadge();
    const healthTag = getHealthTag();
    const discount  = product.mrp && product.mrp > product.price
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : null;

    return (
        <Card className="group relative border border-border shadow-sm hover:shadow-md transition-all duration-300 bg-card rounded-2xl overflow-hidden flex flex-col h-full">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-muted/30">
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    {badge && (
                        <Badge className={`${badge.color} hover:${badge.color} text-primary-foreground border-none px-2.5 py-0.5 text-xs font-medium rounded-full shadow-sm`}>
                            {badge.label}
                        </Badge>
                    )}
                    {discount && (
                        <Badge className="bg-destructive hover:bg-destructive text-destructive-foreground border-none px-2.5 py-0.5 text-xs font-medium rounded-full shadow-sm">
                            {discount}% OFF
                        </Badge>
                    )}
                </div>

                <button className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-destructive hover:bg-background transition-colors shadow-sm">
                    <Heart size={15} />
                </button>

                <Link to={`/products/${product.slug || product._id}`} className="block w-full h-full">
                    <img
                        src={mainImage}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
                    />
                </Link>

                {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                        <Badge variant="outline" className="text-muted-foreground border-border bg-background/80 px-3 py-1 text-xs uppercase tracking-wider font-bold">
                            Out of Stock
                        </Badge>
                    </div>
                )}
            </div>

            {/* Info */}
            <CardContent className="p-4 flex-1 flex flex-col">
                <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                    {product.category.replace('_', ' ')}
                </p>

                <Link to={`/products/${product.slug || product._id}`} className="block mb-2">
                    <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center gap-1 mb-2">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium text-muted-foreground">4.8</span>
                </div>

                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border mb-3 ${healthTag.color}`}>
                    {healthTag.label}
                </span>

                <div className="mt-auto flex items-center justify-between gap-2">
                    <div>
                        <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                        {product.mrp && product.mrp > product.price && (
                            <span className="ml-1.5 text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
                        )}
                    </div>

                    <button
                        className="h-8 px-4 rounded-lg text-xs font-semibold text-primary-foreground flex items-center gap-1.5 transition-all hover:opacity-90 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                        style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-sm)' }}
                        disabled={product.stock <= 0}
                        onClick={e => {
                            e.preventDefault();
                            dispatch(addToCart(product));
                            toast.success('Added to Cart', {
                                description: `${product.name} is now in your cart.`,
                                duration: 2000,
                            });
                        }}
                    >
                        <ShoppingCart size={13} /> Add
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
