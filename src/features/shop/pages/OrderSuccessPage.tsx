import { useParams, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Download, Smartphone, ShoppingBag } from 'lucide-react';

const OrderSuccessPage = () => {
    const { orderId }              = useParams();
    const [searchParams]           = useSearchParams();
    const invoiceUrl               = searchParams.get('invoice');

    return (
        <div className="min-h-screen bg-background">
            <div className="container-wide section-padding text-center max-w-2xl mx-auto">

                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                        <CheckCircle className="text-emerald-600 w-10 h-10" />
                    </div>
                </div>

                <h1 className="font-extrabold text-foreground mb-4" style={{ fontSize: 'var(--fz-h1)' }}>
                    Order Confirmed!
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                    Thank you for your purchase. Your order ID is{' '}
                    <span className="font-mono font-semibold text-primary">{orderId}</span>.{' '}
                    Your device is on its way.
                </p>

                <div className="bg-card border border-border rounded-2xl p-8 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Smartphone size={22} className="text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2">Start Your Health Program</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        Download the PreventVital App now to pair your device and start tracking your vitals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            className="flex-1 h-12 px-6 rounded-xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-px"
                            style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-sm)' }}
                        >
                            <Smartphone size={16} />
                            Download for iOS
                        </button>
                        <button className="flex-1 h-12 px-6 rounded-xl text-sm font-semibold text-foreground border border-border flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                            <Smartphone size={16} />
                            Download for Android
                        </button>
                    </div>
                </div>

                {invoiceUrl && (
                    <a
                        href={invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mb-6"
                    >
                        <Download size={15} />
                        Download Tax Invoice
                    </a>
                )}

                <div className="mt-8">
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ShoppingBag size={15} />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
