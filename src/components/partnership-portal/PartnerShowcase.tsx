import { Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeInSection from '@/components/homepage/FadeInSection';

interface PartnerShowcaseProps {
    className?: string;
}

const PartnerShowcase = ({ className = '' }: PartnerShowcaseProps) => {
    return (
        <section className={`section-padding bg-section-alt/30 overflow-hidden ${className}`}>
            <div className="container-wide">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <FadeInSection>
                        <div className="relative rounded-3xl overflow-hidden border-4 border-card max-w-md" style={{ boxShadow: 'var(--shadow-lg)' }}>
                            <img
                                src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=900&q=80"
                                alt="Two partners in conversation at a meeting table"
                                loading="lazy"
                                className="w-full h-full object-cover aspect-[4/3]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3"
                                style={{ boxShadow: 'var(--shadow-md)' }}
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                    <Handshake size={18} />
                                </div>
                                <p className="text-xs text-foreground/80 leading-relaxed">
                                    A real relationship manager, not a support ticket queue.
                                </p>
                            </motion.div>
                        </div>
                    </FadeInSection>

                    <FadeInSection delay={0.1}>
                        <span className="inline-flex px-2.5 py-1 rounded-full bg-accent/8 text-accent text-[11px] font-bold uppercase tracking-wide mb-4">
                            How We Work Together
                        </span>
                        <h2 className="text-fluid-3xl font-bold text-foreground tracking-tight mb-4 leading-tight">
                            A Partnership, Not a Vendor Relationship
                        </h2>
                        <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'var(--fz-lg)' }}>
                            Every partner gets a named team on our side — for integration, for launch, and for the years after. You're building preventive care into your organization; we're not disappearing once the contract is signed.
                        </p>
                    </FadeInSection>
                </div>
            </div>
        </section>
    );
};

export default PartnerShowcase;
