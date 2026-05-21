
import { ArrowRight, Shield, FileText } from 'lucide-react';

interface PartnerCTAProps {
    className?: string;
}

const PartnerCTA = ({ className = '' }: PartnerCTAProps) => {
    return (
        <section
            className={`section-padding relative overflow-hidden ${className}`}
            style={{ background: 'var(--gradient-health)' }}
            aria-labelledby="partner-cta-heading"
        >
            {/* Pattern overlay — same as homepage CTASection */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
                    backgroundSize: '28px 28px',
                }}
            />
            <div
                className="absolute top-0 left-1/4 rounded-full blur-[80px] pointer-events-none bg-white/5"
                style={{ width: 'clamp(16rem, 36vw, 36rem)', height: 'clamp(16rem, 36vw, 36rem)' }}
            />

            <div className="container-wide relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full backdrop-blur-sm">
                        <Shield size={13} className="text-emerald-300" />
                        <span className="text-xs font-semibold text-white/80 tracking-wide">Start Your Partnership</span>
                    </div>

                    <h2
                        id="partner-cta-heading"
                        className="text-fluid-4xl font-semibold text-white leading-[1.15] tracking-tight"
                    >
                        Ready to Partner{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
                            with Us?
                        </span>
                    </h2>

                    <p className="text-fluid-lg text-white/65 max-w-xl mx-auto leading-relaxed">
                        Let's discuss how we can work together to transform preventive healthcare.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        <button
                            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold bg-white transition-all duration-300 hover:-translate-y-px hover:shadow-lg"
                            style={{ color: 'hsl(var(--primary))' }}
                        >
                            Schedule a Call
                            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-all duration-300">
                            <FileText size={16} />
                            Download Partnership Guide
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnerCTA;
