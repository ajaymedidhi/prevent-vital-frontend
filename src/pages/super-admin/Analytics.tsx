import React, { useState } from 'react';
import {
    BarChart3, Download, TrendingUp, Users,
    Activity, Building2, Calendar, ChevronDown
} from 'lucide-react';

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('Last 30 Days');

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Analytics Center</h2>
                    <p className="text-sm text-gray-500 mt-1">Deep dive into platform usage, engagement, and health outcomes.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-xl text-sm font-medium shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Quarter</option>
                            <option>Year to Date</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>

                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors z-0"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 mb-1">Total Active Users</p>
                            <h3 className="text-3xl font-bold text-gray-900">12,543</h3>
                            <div className="flex items-center gap-1 text-sm text-green-600 mt-2 font-medium">
                                <TrendingUp size={16} />
                                <span>+14.5% <span className="text-gray-400 text-xs font-normal">vs last period</span></span>
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-blue-600">
                            <Users size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors z-0"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 mb-1">Monthly Recurring Revenue</p>
                            <h3 className="text-3xl font-bold text-gray-900">₹4.2M</h3>
                            <div className="flex items-center gap-1 text-sm text-green-600 mt-2 font-medium">
                                <TrendingUp size={16} />
                                <span>+8.2% <span className="text-gray-400 text-xs font-normal">vs last period</span></span>
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-emerald-600">
                            <BarChart3 size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors z-0"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 mb-1">Active Programmes</p>
                            <h3 className="text-3xl font-bold text-gray-900">18</h3>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-2 font-medium">
                                <span>2 new <span className="text-gray-400 text-xs font-normal">this month</span></span>
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-purple-600">
                            <Activity size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full group-hover:bg-amber-100 transition-colors z-0"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 mb-1">B2B Organisations</p>
                            <h3 className="text-3xl font-bold text-gray-900">45</h3>
                            <div className="flex items-center gap-1 text-sm text-green-600 mt-2 font-medium">
                                <TrendingUp size={16} />
                                <span>+3 <span className="text-gray-400 text-xs font-normal">new tenants</span></span>
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-amber-600">
                            <Building2 size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Mock: User Growth */}
                <div className="bg-white rounded-[18px] shadow-sm border border-gray-100 p-6 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-gray-800">Platform User Growth</h3>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-xs text-gray-500">B2C</span></div>
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-purple-500"></div><span className="text-xs text-gray-500">B2B</span></div>
                        </div>
                    </div>
                    {/* CSS Mock Chart */}
                    <div className="h-64 flex items-end gap-2 sm:gap-4 pt-10 px-2 relative border-b border-gray-100">
                        {/* Grid lines */}
                        <div className="absolute left-0 right-0 top-0 h-px bg-gray-50"></div>
                        <div className="absolute left-0 right-0 top-1/4 h-px bg-gray-50"></div>
                        <div className="absolute left-0 right-0 top-2/4 h-px bg-gray-50"></div>
                        <div className="absolute left-0 right-0 top-3/4 h-px bg-gray-50"></div>

                        {/* Bars */}
                        {[35, 45, 30, 60, 55, 75, 65, 85, 80, 95].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end gap-1 relative group h-full pb-2">
                                <div className="w-full bg-purple-500 rounded-t-sm opacity-90 transition-all duration-300 group-hover:opacity-100 relative z-10" style={{ height: `${h * 0.4}%` }}></div>
                                <div className="w-full bg-blue-500 rounded-t-sm opacity-90 transition-all duration-300 group-hover:opacity-100 relative z-10" style={{ height: `${h * 0.6}%` }}></div>
                                {/* Tooltip */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">
                                    Total: {h * 120}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[10px] font-semibold text-gray-400 mt-3 px-2 uppercase tracking-widest">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                    </div>
                </div>

                {/* Right Column Metrics */}
                <div className="space-y-6">
                    {/* Programme Engagement */}
                    <div className="bg-white rounded-[18px] shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-800 mb-5">Top Programmes by Enrollment</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Cardio Health Pro', val: 85, color: 'bg-red-500', users: '3.2k' },
                                { name: 'Diabetes Management', val: 65, color: 'bg-orange-500', users: '2.1k' },
                                { name: 'Stress Reduction', val: 45, color: 'bg-purple-500', users: '1.5k' },
                                { name: 'Sleep Optimization', val: 30, color: 'bg-indigo-500', users: '980' },
                            ].map((prog, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="font-semibold text-gray-700">{prog.name}</span>
                                        <span className="text-gray-500 text-xs font-medium">{prog.users} users</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className={`${prog.color} h-2 rounded-full`} style={{ width: `${prog.val}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Regional/Demographic Stub */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[18px] shadow-lg border border-slate-700 p-6 text-white relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 text-white/5">
                            <Activity size={120} strokeWidth={1} />
                        </div>
                        <h3 className="font-bold text-lg mb-2 relative z-10">AI Diagnostic Insights</h3>
                        <p className="text-sm text-slate-400 mb-4 relative z-10">
                            The Gruentzig machine learning model has flagged an 8% increase in pre-hypertension indicators across the B2B tech sector cohort.
                        </p>
                        <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors border border-white/20 backdrop-blur-sm relative z-10">
                            View Model Report
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* App Engagement Funnel */}
                <div className="bg-white rounded-[18px] shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-6">User Funnel & Drop-off</h3>
                    <div className="space-y-5">
                        <div className="relative">
                            <div className="flex justify-between text-sm mb-1 z-10 relative">
                                <span className="font-bold text-gray-700">App Downloads</span>
                                <span className="font-bold text-gray-900">45,210</span>
                            </div>
                            <div className="w-full bg-blue-50 h-8 rounded-lg flex items-center overflow-hidden border border-blue-100">
                                <div className="bg-blue-500 h-full w-[100%]"></div>
                            </div>
                        </div>
                        <div className="relative pl-4">
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                            <div className="flex justify-between text-sm mb-1 z-10 relative">
                                <span className="font-bold text-gray-700 flex items-center gap-2">
                                    <div className="w-4 h-px bg-gray-300 -ml-4"></div>
                                    Account Creation
                                </span>
                                <span className="font-bold text-gray-900">32,805 <span className="text-xs text-gray-400 font-normal">(72%)</span></span>
                            </div>
                            <div className="w-full bg-indigo-50 h-8 rounded-lg flex items-center overflow-hidden border border-indigo-100">
                                <div className="bg-indigo-500 h-full w-[72%]"></div>
                            </div>
                        </div>
                        <div className="relative pl-8">
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 hidden"></div>
                            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>
                            <div className="flex justify-between text-sm mb-1 z-10 relative">
                                <span className="font-bold text-gray-700 flex items-center gap-2">
                                    <div className="w-4 h-px bg-gray-300 -ml-4"></div>
                                    Completed Assessment
                                </span>
                                <span className="font-bold text-gray-900">18,500 <span className="text-xs text-gray-400 font-normal">(56%)</span></span>
                            </div>
                            <div className="w-full bg-purple-50 h-8 rounded-lg flex items-center overflow-hidden border border-purple-100">
                                <div className="bg-purple-500 h-full w-[56%]"></div>
                            </div>
                        </div>
                        <div className="relative pl-12">
                            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>
                            <div className="flex justify-between text-sm mb-1 z-10 relative">
                                <span className="font-bold text-gray-700 flex items-center gap-2">
                                    <div className="w-4 h-px bg-gray-300 -ml-4"></div>
                                    Started Programme
                                </span>
                                <span className="font-bold text-gray-900">12,543 <span className="text-xs text-gray-400 font-normal">(67%)</span></span>
                            </div>
                            <div className="w-full bg-emerald-50 h-8 rounded-lg flex items-center overflow-hidden border border-emerald-100">
                                <div className="bg-emerald-500 h-full w-[67%]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[18px] shadow-sm border border-gray-100 p-6 flex items-center justify-center flex-col text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Calendar className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Detailed Cohort Analysis</h3>
                    <p className="text-gray-500 text-sm max-w-sm mb-6">
                        Unlock advanced retention capabilities and demographic breakdowns by exporting the raw dataset to your BI tool.
                    </p>
                    <button className="text-sm font-semibold text-blue-600 bg-blue-50 px-5 py-2.5 rounded-xl hover:bg-blue-100 transition-colors">
                        Configure BI Integration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
