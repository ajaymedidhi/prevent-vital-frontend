import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import StoreHero from '../components/StoreHero';
import { Product } from '@/store/shopSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { Filter } from 'lucide-react';

const categories = ['All', 'Wearables', 'Test Kits', 'Supplements'];

const CatalogPage = () => {
    const [products,         setProducts]         = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [userRegion,       setUserRegion]       = useState<string>('IN');
    const [loading,          setLoading]          = useState(true);
    const [error,            setError]            = useState('');
    const [activeCategory,   setActiveCategory]   = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/shop/products');
                setProducts(res.data.data.products);
                setFilteredProducts(res.data.data.products);
                setUserRegion(res.data.userRegion);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;
        if (activeCategory !== 'All') {
            result = result.filter(p =>
                p.category.toLowerCase() === activeCategory.toLowerCase().replace(/ /g, '_')
            );
        }
        setFilteredProducts(result);
    }, [activeCategory, products]);

    if (error) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center px-4">
                <div className="text-center bg-destructive/5 border border-destructive/20 rounded-2xl p-10 max-w-md">
                    <h3 className="font-bold text-lg text-foreground mb-2">Something went wrong</h3>
                    <p className="text-muted-foreground text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <StoreHero />

            <div className="container-wide pb-16">
                {/* Filter bar */}
                <div className="flex items-center gap-3 mb-8 mt-8 overflow-x-auto no-scrollbar pb-1">
                    <Filter size={18} className="text-muted-foreground flex-shrink-0" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border whitespace-nowrap ${
                                activeCategory === cat
                                    ? 'text-primary-foreground border-primary'
                                    : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                            }`}
                            style={activeCategory === cat ? { background: 'hsl(var(--primary))' } : {}}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {[...Array(8)].map((_, i) => (
                            <Skeleton key={i} className="h-[340px] w-full rounded-2xl bg-muted" />
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredProducts.map(product => (
                            <div key={product._id} className="animate-in fade-in zoom-in-95 duration-500 h-full">
                                <ProductCard product={product} userRegion={userRegion} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <h3 className="text-lg font-bold text-foreground mb-2">No products found</h3>
                        <button
                            className="mt-2 text-sm font-semibold text-primary hover:underline"
                            onClick={() => setActiveCategory('All')}
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CatalogPage;
