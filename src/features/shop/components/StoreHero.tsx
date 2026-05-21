import { Truck, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    { icon: Truck,       title: 'Free Shipping',    desc: 'On orders over ₹1,999' },
    { icon: ShieldCheck, title: 'Secure Payment',   desc: '100% protected'         },
    { icon: Award,       title: 'Quality Assured',  desc: 'Medical-grade products' },
];

const StoreHero = () => (
    <section
        className="relative w-full overflow-hidden"
        style={{ paddingTop: 'clamp(3rem, 2rem + 4vw, 6rem)', paddingBottom: 'clamp(2.5rem, 1.5rem + 3vw, 5rem)' }}
    >
        {/* Same bg layers as every other hero */}
        <div className="absolute inset-0 healthcare-mesh" />
        <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
                backgroundImage: `
                    linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
            }}
        />
        <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, hsl(var(--primary) / 0.08) 0%, transparent 70%)' }}
        />

        <div className="container-wide relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
            >
                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-border rounded-full shadow-xs">
                        <Sparkles size={13} className="text-accent" />
                        <span className="text-xs font-semibold text-primary tracking-wide">Official Store</span>
                    </div>
                </div>

                <h1
                    className="font-semibold leading-[1.1] tracking-tight text-foreground text-balance mx-auto"
                    style={{ fontSize: 'var(--fz-h1)', maxWidth: '20ch' }}
                >
                    Premium Health Tech{' '}
                    <span className="gradient-text-soft">For a Better You</span>
                </h1>

                <p
                    className="text-muted-foreground leading-relaxed mx-auto"
                    style={{ fontSize: 'var(--fz-lg)', maxWidth: '50ch' }}
                >
                    Discover clinical-grade wearables, advanced supplements, and home testing kits curated by medical experts.
                </p>
            </motion.div>

            {/* Features bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 pt-10 border-t border-border/50">
                {features.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-center justify-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon size={18} className="text-primary" />
                        </div>
                        <div className="text-left">
                            <p className="font-semibold text-foreground text-sm">{title}</p>
                            <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default StoreHero;
