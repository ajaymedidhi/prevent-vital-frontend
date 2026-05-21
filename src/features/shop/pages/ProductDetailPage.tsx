import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, Product } from '@/store/shopSlice';
import { Badge } from '@/components/ui/badge';
import SpecsTable from '../components/SpecsTable';
import VitalsIcons from '../components/VitalsIcons';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "sonner";
import { ChevronLeft, Truck, ShieldCheck, HeartPulse, Star, ShoppingCart, Share2 } from 'lucide-react';

const ProductDetailPage = () => {
    const { slug }    = useParams();
    const navigate    = useNavigate();
    const dispatch    = useDispatch();
    const [product,       setProduct]       = useState<Product | null>(null);
    const [loading,       setLoading]       = useState(true);
    const [error,         setError]         = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/shop/products/${slug}`);
                setProduct(res.data.data.product);
                setSelectedImage(res.data.data.product.images?.[0] || res.data.data.product.image || '/placeholder.png');
            } catch {
                setError('Product not found');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) return (
        <div className="container-wide py-20">
            <Skeleton className="h-[600px] w-full rounded-3xl bg-muted" />
        </div>
    );

    if (error || !product) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <p className="text-xl font-bold text-foreground mb-4">{error || 'Product not found'}</p>
            <button
                onClick={() => navigate('/shop')}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground"
                style={{ background: 'hsl(var(--primary))' }}
            >
                Back to Shop
            </button>
        </div>
    );

    const discount = product.mrp && product.mrp > product.price
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : null;

    const addHandler = () => {
        dispatch(addToCart(product));
        toast.success("Added to Cart", { description: `${product.name} has been added.` });
    };

    return (
        <div className="min-h-screen bg-background pb-24 lg:pb-0">
            {/* Sticky breadcrumb */}
            <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-20">
                <div className="container-wide h-14 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ChevronLeft size={18} />
                        Back to Catalog
                    </button>
                    <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <Share2 size={16} />
                    </button>
                </div>
            </div>

            <div className="container-wide py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

                    {/* LEFT: Images */}
                    <div className="lg:sticky lg:top-24 self-start space-y-4">
                        <div className="aspect-[4/5] bg-muted/30 rounded-3xl overflow-hidden border border-border relative group">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
                            />
                            {discount && (
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-destructive hover:bg-destructive text-destructive-foreground border-none px-3 py-1 text-xs font-semibold rounded-full">
                                        {discount}% OFF
                                    </Badge>
                                </div>
                            )}
                        </div>

                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-1">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-20 h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all ${
                                            selectedImage === img
                                                ? 'border-primary ring-2 ring-primary/20 ring-offset-2 bg-muted/30'
                                                : 'border-border bg-muted/30 hover:border-primary/40'
                                        }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain p-2" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Details */}
                    <div className="space-y-7 py-2">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 flex-wrap">
                                <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-none px-3 py-1 text-xs uppercase tracking-wider font-semibold rounded-full">
                                    {product.category.replace('_', ' ')}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                                    <Star size={13} className="text-yellow-400 fill-yellow-400" />
                                    <span>4.9 (128 Reviews)</span>
                                </div>
                            </div>

                            <h1 className="font-extrabold text-foreground leading-tight" style={{ fontSize: 'var(--fz-h1)' }}>
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                                    {product.mrp && product.mrp > product.price && (
                                        <span className="text-lg text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
                                    )}
                                </div>
                                {product.stock > 0 ? (
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">In Stock</span>
                                ) : (
                                    <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-semibold rounded-full">Out of Stock</span>
                                )}
                            </div>
                        </div>

                        <div className="h-px bg-border" />

                        <p className="text-muted-foreground leading-relaxed text-sm">
                            {product.description || "Experience the future of health monitoring with our clinical-grade device. Designed for precision and ease of use, it integrates seamlessly with the PreventVital ecosystem to give you actionable insights."}
                        </p>

                        {product.supportedVitals && product.supportedVitals.length > 0 && (
                            <div className="bg-primary/5 rounded-2xl p-5 border border-primary/20">
                                <div className="flex items-center gap-2 mb-4 text-primary font-bold text-sm">
                                    <HeartPulse size={18} />
                                    Compatible Vitals
                                </div>
                                <VitalsIcons vitals={product.supportedVitals} />
                            </div>
                        )}

                        <button
                            className="w-full h-14 rounded-xl text-base font-bold text-primary-foreground flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                            style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-md)' }}
                            disabled={product.stock <= 0}
                            onClick={addHandler}
                        >
                            <ShoppingCart size={20} />
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                                <Truck size={22} className="text-primary flex-shrink-0" />
                                <div>
                                    <span className="block font-bold text-foreground text-sm">Free Shipping</span>
                                    <span className="text-xs text-muted-foreground">On orders over ₹999</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                                <ShieldCheck size={22} className="text-primary flex-shrink-0" />
                                <div>
                                    <span className="block font-bold text-foreground text-sm">2 Year Warranty</span>
                                    <span className="text-xs text-muted-foreground">Official Manufacturer</span>
                                </div>
                            </div>
                        </div>

                        {product.specs && product.specs.length > 0 && (
                            <div className="pt-4">
                                <h3 className="text-lg font-bold mb-5 text-foreground">Technical Specifications</h3>
                                <SpecsTable specs={product.specs} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile sticky action bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 border-t border-border backdrop-blur-sm p-4 z-30">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-muted-foreground text-xs font-semibold">Total Price</span>
                        <span className="text-2xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                    </div>
                    <button
                        className="flex-1 h-12 rounded-xl text-sm font-bold text-primary-foreground flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: 'hsl(var(--primary))' }}
                        disabled={product.stock <= 0}
                        onClick={addHandler}
                    >
                        <ShoppingCart size={18} />
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
