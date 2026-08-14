import { motion } from 'framer-motion';
import { Heart, Activity, Clock, Shield, ChevronLeft, Info, ChevronRight, Flame } from 'lucide-react';

const ProductShowcase = () => {
    return (
        <div className="relative w-full h-[460px] flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[80%] bg-blue-500/20 blur-[100px] rounded-full mix-blend-multiply" />
                <div className="absolute w-[60%] h-[60%] bg-purple-500/20 blur-[80px] rounded-full mix-blend-multiply" />
            </div>

            {/* Main Phone Mockup */}
            <motion.div
                initial={{ y: 20, rotate: 6 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative z-10 w-[214px] h-[444px] bg-white rounded-[34px] border-[6px] border-zinc-800 shadow-2xl overflow-hidden"
                style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 -10px 30px -10px rgba(0,0,0,0.1), inset 0 0 0 2px rgba(255,255,255,0.5)',
                }}
            >
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[76px] h-[22px] bg-black rounded-full z-50 flex items-center justify-between px-2.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-zinc-800/80" />
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                </div>

                {/* Status Bar */}
                <div className="absolute top-0 w-full h-11 flex justify-between items-center px-5 pt-1 z-40 text-[10px] font-medium">
                    <span>9:41</span>
                    <div className="flex gap-1.5 items-center">
                        <Activity size={11} />
                        <Activity size={11} />
                        <Activity size={11} />
                    </div>
                </div>

                {/* App Content */}
                <div className="pt-11 px-4 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <ChevronLeft size={17} className="text-zinc-600" />
                        <span className="font-semibold text-sm">Your Vital Score</span>
                        <Info size={16} className="text-zinc-400" />
                    </div>

                    {/* Gauge Chart (Simplified) */}
                    <div className="relative flex flex-col items-center justify-center mb-5 mt-1.5">
                        <svg width="153" height="93" viewBox="0 0 180 110" className="overflow-visible">
                            <path d="M 20 100 A 70 70 0 0 1 160 100" fill="none" stroke="#f1f5f9" strokeWidth="16" strokeLinecap="round" />
                            <path d="M 20 100 A 70 70 0 0 1 120 30" fill="none" stroke="#3b82f6" strokeWidth="16" strokeLinecap="round" strokeDasharray="220" strokeDashoffset="40" />
                            <circle cx="20" cy="100" r="8" fill="white" className="shadow-sm" />
                            <circle cx="160" cy="100" r="8" fill="white" className="shadow-sm" />
                            <circle cx="120" cy="30" r="10" fill="white" stroke="#3b82f6" strokeWidth="4" />
                        </svg>
                        <div className="absolute top-6 flex flex-col items-center">
                            <span className="text-3xl font-bold tracking-tight text-zinc-900">68</span>
                            <span className="text-[10px] text-zinc-500 font-medium mt-0.5">Out of 100</span>
                        </div>
                    </div>

                    <div className="text-center mb-5">
                        <h3 className="text-sm font-semibold text-blue-600 mb-0.5">Your Vital Score is Good</h3>
                        <p className="text-[10px] text-zinc-500">Based on your recent assessment and vitals</p>
                    </div>

                    {/* Metrics List */}
                    <div className="space-y-2.5 mb-auto">
                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-zinc-600">VITAL Score</span>
                            <div className="flex items-center gap-2">
                                <div className="w-14 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                                    <div className="w-[68%] h-full bg-blue-500 rounded-full" />
                                </div>
                                <span className="w-6 text-right">68</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-zinc-600">ASCVD Risk</span>
                            <div className="flex items-center gap-2">
                                <div className="w-14 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                                    <div className="w-[10%] h-full bg-blue-400 rounded-full" />
                                </div>
                                <span className="w-6 text-right">0.1%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-zinc-600">Body Fat</span>
                            <div className="flex items-center gap-2">
                                <div className="w-14 h-1.5 bg-green-100 rounded-full overflow-hidden">
                                    <div className="w-[70%] h-full bg-green-500 rounded-full" />
                                </div>
                                <span className="w-6 text-right">24.1</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-zinc-600">Vascular Age</span>
                            <div className="flex items-center gap-2">
                                <div className="w-14 h-1.5 bg-purple-100 rounded-full overflow-hidden">
                                    <div className="w-[85%] h-full bg-purple-500 rounded-full" />
                                </div>
                                <span className="w-6 text-right">33</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Button */}
                    <button className="flex items-center justify-between w-full p-3 mt-4 bg-blue-50 text-blue-600 rounded-2xl mb-4">
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            <span className="text-[10px] font-semibold whitespace-nowrap">View Assessment History</span>
                        </div>
                        <ChevronRight size={12} />
                    </button>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-zinc-200 rounded-full" />
                </div>

                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
            </motion.div>

            {/* Floating Glass Cards */}
            {/* VITAL Score */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute left-0 top-[20%] z-20 bg-white/70 backdrop-blur-xl border border-white/40 p-3 rounded-2xl shadow-xl w-[119px]"
            >
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mb-2.5">
                    <Heart size={13} />
                </div>
                <div className="text-[10px] text-zinc-500 font-medium mb-0.5">VITAL Score</div>
                <div className="text-base font-bold text-zinc-900 mb-1.5">68<span className="text-xs font-medium text-zinc-400">/100</span></div>
                <div className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-bold rounded-md">
                    Good
                </div>
            </motion.div>

            {/* ASCVD Risk */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute right-0 top-[35%] z-20 bg-white/70 backdrop-blur-xl border border-white/40 p-3 rounded-2xl shadow-xl w-[119px]"
            >
                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mb-2.5">
                    <Shield size={13} />
                </div>
                <div className="text-[10px] text-zinc-500 font-medium mb-0.5">ASCVD Risk</div>
                <div className="text-base font-bold text-zinc-900 mb-1.5">0.1<span className="text-xs font-medium text-zinc-400">%</span></div>
                <div className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-bold rounded-md">
                    Low Risk
                </div>
            </motion.div>

            {/* Body Fat */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, y: [5, -5, 5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute left-3 bottom-[25%] z-20 bg-white/70 backdrop-blur-xl border border-white/40 p-3 rounded-2xl shadow-xl w-[119px]"
            >
                <div className="w-7 h-7 rounded-full bg-green-100 text-green-500 flex items-center justify-center mb-2.5">
                    <Activity size={13} />
                </div>
                <div className="text-[10px] text-zinc-500 font-medium mb-0.5">Body Fat</div>
                <div className="text-base font-bold text-zinc-900 mb-1.5">24.1<span className="text-xs font-medium text-zinc-400">%</span></div>
                <div className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-bold rounded-md">
                    Overfat
                </div>
            </motion.div>

            {/* Vascular Age */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, y: [-5, 5, -5] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                className="absolute right-3 bottom-[15%] z-20 bg-white/70 backdrop-blur-xl border border-white/40 p-3 rounded-2xl shadow-xl w-[119px]"
            >
                <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mb-2.5">
                    <Clock size={13} />
                </div>
                <div className="text-[10px] text-zinc-500 font-medium mb-0.5">Vascular Age</div>
                <div className="text-base font-bold text-zinc-900 mb-1.5">33<span className="text-xs font-medium text-zinc-400"> yrs</span></div>
                <div className="inline-flex items-center px-2 py-0.5 bg-orange-50 text-orange-600 text-[9px] font-bold rounded-md">
                    8 yrs faster
                </div>
            </motion.div>
        </div>
    );
};

export default ProductShowcase;
