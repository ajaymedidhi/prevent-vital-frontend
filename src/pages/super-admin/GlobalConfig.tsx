import React, { useState, useEffect } from 'react';
import { AlertCircle, Activity, Heart, DollarSign } from 'lucide-react';
import superAdminApi from '../../admin-shared/services/superAdminApi';
import toast from 'react-hot-toast';

interface Thresholds {
    systolic: { high: number; low: number };
    diastolic: { high: number; low: number };
    heartRate: { high: number; low: number };
}

interface PricingPlan {
    id: string;
    name: string;
    monthlyPrice: number;
    annualPrice?: number;
    seats?: number;
    features: string[];
}

interface PricingPlans {
    b2c: PricingPlan[];
    b2b: PricingPlan[];
}

const GlobalConfig = () => {
    const [thresholds, setThresholds] = useState<Thresholds>({
        systolic: { high: 140, low: 90 },
        diastolic: { high: 90, low: 60 },
        heartRate: { high: 100, low: 60 }
    });
    const [pricing, setPricing] = useState<PricingPlans>({ b2c: [], b2b: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllConfigs();
    }, []);

    const fetchAllConfigs = async () => {
        setLoading(true);
        try {
            const [thresholdsRes, pricingRes] = await Promise.all([
                superAdminApi.get('/config/who-thresholds').catch(() => null),
                superAdminApi.get('/config/pricing-plans').catch(() => null)
            ]);

            if (thresholdsRes?.data?.config?.value) {
                setThresholds(thresholdsRes.data.config.value);
            }
            if (pricingRes?.data?.config?.value) {
                setPricing(pricingRes.data.config.value);
            }
        } catch (err) {
            console.error('Error fetching configs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            await Promise.all([
                superAdminApi.patch('/config', {
                    key: 'who-thresholds',
                    value: thresholds
                }),
                superAdminApi.patch('/config', {
                    key: 'pricing-plans',
                    value: pricing
                })
            ]);
            toast.success('Configuration updated successfully!');
        } catch (err) {
            toast.error('Error updating configuration.');
        }
    };

    // Helper to safely update nested state
    const handleThresholdChange = (category: keyof Thresholds, type: 'high' | 'low', val: string) => {
        setThresholds(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [type]: parseInt(val) || 0
            }
        }));
    };

    const handlePricingChange = (type: 'b2c' | 'b2b', index: number, field: keyof PricingPlan, val: any) => {
        const newPricing = { ...pricing };
        newPricing[type] = [...newPricing[type]];
        newPricing[type][index] = { ...newPricing[type][index], [field]: val };
        setPricing(newPricing);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-20 z-10">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Platform Configuration</h2>
                    <p className="text-gray-500 text-sm">Manage global thresholds and subscription models across B2B and B2C.</p>
                </div>
                <button onClick={handleUpdate} className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">
                    Save Changes
                </button>
            </div>

            {/* B2C Pricing Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-green-600 bg-green-50 p-1 rounded-lg" />
                    B2C Subscription Plans
                </h2>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-8">
                    <div className="flex items-start gap-4">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-amber-800 tracking-tight">Financial Guardrails</p>
                            <p className="text-xs text-amber-700 mt-1 leading-relaxed">Adjusting prices will only affect new subscribers. Active subscriptions billing cycles remain unchanged until expiration or manual update.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pricing.b2c.map((plan, idx) => (
                        <div key={plan.id} className="border border-gray-100 rounded-2xl p-5 bg-gray-50/30 hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                            <div className="flex justify-between items-center mb-5">
                                <span className="font-bold text-lg text-gray-800">{plan.name}</span>
                                <span className="text-[10px] bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-widest ring-1 ring-green-200">Live</span>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1.5 ml-1">Monthly (₹)</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded-xl p-2.5 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all group-hover:border-indigo-200"
                                        value={plan.monthlyPrice}
                                        onChange={(e) => handlePricingChange('b2c', idx, 'monthlyPrice', parseInt(e.target.value) || 0)}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1.5 ml-1">Annual (₹)</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded-xl p-2.5 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all group-hover:border-indigo-200"
                                        value={plan.annualPrice || 0}
                                        onChange={(e) => handlePricingChange('b2c', idx, 'annualPrice', parseInt(e.target.value) || 0)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* B2B Pricing Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Heart className="w-6 h-6 text-indigo-600 bg-indigo-50 p-1 rounded-lg" />
                    B2B Corporate Plans
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {pricing.b2b.map((plan, idx) => (
                        <div key={plan.id} className="border border-gray-100 rounded-2xl p-5 bg-gray-50/30 hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                            <div className="flex justify-between items-center mb-5">
                                <span className="font-bold text-gray-800">{plan.name}</span>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ring-1 ${plan.id === 'trial' ? 'bg-amber-100 text-amber-700 ring-amber-200' : 'bg-blue-100 text-blue-700 ring-blue-200'}`}>
                                    {plan.id}
                                </span>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1.5 ml-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded-xl p-2.5 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        value={plan.monthlyPrice}
                                        onChange={(e) => handlePricingChange('b2b', idx, 'monthlyPrice', parseInt(e.target.value) || 0)}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1.5 ml-1">Seating Capacity</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-200 rounded-xl p-2.5 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        value={plan.seats || 0}
                                        onChange={(e) => handlePricingChange('b2b', idx, 'seats', parseInt(e.target.value) || 0)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* WHO Thresholds Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <Activity className="w-6 h-6 text-red-500 bg-red-50 p-1 rounded-lg" />
                    WHO Medical Thresholds
                </h3>
                <p className="text-sm text-gray-500 mb-8">Set safety triggers for automated health alerts across the platform.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Systolic */}
                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-5">
                        <h4 className="font-bold text-gray-700 flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-400"></span>
                            Systolic BP
                        </h4>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">High (mmHg)</label>
                            <input
                                type="number"
                                className="w-full border border-gray-200 bg-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold transition-all"
                                value={thresholds.systolic.high}
                                onChange={(e) => handleThresholdChange('systolic', 'high', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Low (mmHg)</label>
                            <input
                                type="number"
                                className="w-full border border-gray-200 bg-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold transition-all"
                                value={thresholds.systolic.low}
                                onChange={(e) => handleThresholdChange('systolic', 'low', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Diastolic */}
                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-5">
                        <h4 className="font-bold text-gray-700 flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                            Diastolic BP
                        </h4>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">High (mmHg)</label>
                            <input
                                type="number"
                                className="w-full border border-gray-200 bg-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold transition-all"
                                value={thresholds.diastolic.high}
                                onChange={(e) => handleThresholdChange('diastolic', 'high', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Low (mmHg)</label>
                            <input
                                type="number"
                                className="w-full border border-gray-200 bg-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold transition-all"
                                value={thresholds.diastolic.low}
                                onChange={(e) => handleThresholdChange('diastolic', 'low', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Heart Rate */}
                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-5">
                        <h4 className="font-bold text-gray-700 flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                            Heart Rate
                        </h4>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">High (bpm)</label>
                            <input
                                type="number"
                                className="w-full border border-gray-200 bg-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold transition-all"
                                value={thresholds.heartRate.high}
                                onChange={(e) => handleThresholdChange('heartRate', 'high', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Low (bpm)</label>
                            <input
                                type="number"
                                className="w-full border border-gray-200 bg-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold transition-all"
                                value={thresholds.heartRate.low}
                                onChange={(e) => handleThresholdChange('heartRate', 'low', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalConfig;
