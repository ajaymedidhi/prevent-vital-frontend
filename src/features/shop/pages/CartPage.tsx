import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart, clearCart, updateQuantity } from '@/store/shopSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const CartPage = () => {
    const { cart, total } = useSelector((state: any) => state.shop);
    const dispatch        = useDispatch();
    const navigate        = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={36} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8 max-w-md text-center text-sm leading-relaxed">
                    Looks like you haven't added anything yet. Browse our premium collection to find what you need.
                </p>
                <Link
                    to="/shop"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-px"
                    style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-md)' }}
                >
                    Start Shopping
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container-wide section-padding-sm">
                <h1 className="font-bold text-foreground mb-8 flex items-center gap-3" style={{ fontSize: 'var(--fz-h1)' }}>
                    Your Cart
                    <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {cart.length} item{cart.length !== 1 ? 's' : ''}
                    </span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Cart items */}
                    <div className="lg:col-span-8 space-y-4">
                        {cart.map((item: any) => (
                            <div
                                key={item._id}
                                className="bg-card border border-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center animate-in slide-in-from-bottom-2 duration-500"
                            >
                                <div className="w-full h-40 sm:w-28 sm:h-28 bg-muted/30 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                                    <img
                                        src={item.images?.[0] || item.image || '/placeholder.png'}
                                        alt={item.name}
                                        className="w-full h-full object-contain p-2"
                                    />
                                </div>

                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                                                {item.category?.replace('_', ' ')}
                                            </p>
                                            <h3 className="font-bold text-foreground leading-tight truncate">{item.name}</h3>
                                        </div>
                                        <p className="font-bold text-foreground sm:hidden whitespace-nowrap">
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Unit Price: ₹{item.price.toLocaleString()}</p>
                                </div>

                                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                                    {/* Qty control */}
                                    <div className="flex items-center gap-2 bg-muted p-1 rounded-lg border border-border">
                                        <button
                                            className="w-7 h-7 flex items-center justify-center rounded-md bg-card text-foreground shadow-xs hover:text-primary disabled:opacity-40 transition-colors"
                                            onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={13} />
                                        </button>
                                        <span className="font-semibold text-foreground w-5 text-center text-sm">{item.quantity}</span>
                                        <button
                                            className="w-7 h-7 flex items-center justify-center rounded-md bg-card text-foreground shadow-xs hover:text-primary transition-colors"
                                            onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                                        >
                                            <Plus size={13} />
                                        </button>
                                    </div>

                                    <p className="font-bold text-foreground hidden sm:block min-w-[90px] text-right">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </p>

                                    <button
                                        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-colors"
                                        onClick={() => dispatch(removeFromCart(item._id))}
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end pt-2">
                            <button
                                className="text-sm font-semibold text-destructive hover:bg-destructive/8 px-4 py-2 rounded-lg transition-colors"
                                onClick={() => dispatch(clearCart())}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Order summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                            <h2 className="text-lg font-bold text-foreground mb-5">Order Summary</h2>

                            <div className="space-y-3 mb-5">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span className="text-foreground font-medium">₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Shipping</span>
                                    <span className="text-emerald-600 font-semibold">Free</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Tax</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <Separator className="my-5" />

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-foreground">Total</span>
                                <span className="text-2xl font-extrabold text-primary">₹{total.toLocaleString()}</span>
                            </div>

                            <button
                                className="group w-full py-4 rounded-xl text-sm font-bold text-primary-foreground flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-px"
                                style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-md)' }}
                                onClick={() => navigate('/checkout')}
                            >
                                Proceed to Checkout
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>

                            <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                                <ShieldCheck size={13} />
                                Secure Encrypted Payment
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
