import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Users, Activity, DollarSign, AlertCircle,
    RefreshCw, Brain, AlertTriangle, TrendingDown,
    Building2, Eye, Edit2, Zap, Plus
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Modal } from '../../admin-shared/components/ui';

const platformGrowthData = [
    { month: 'Jan', b2b: 4000, b2c: 2400 },
    { month: 'Feb', b2b: 3000, b2c: 1398 },
    { month: 'Mar', b2b: 2000, b2c: 6800 },
    { month: 'Apr', b2b: 2780, b2c: 3908 },
    { month: 'May', b2b: 1890, b2c: 4800 },
    { month: 'Jun', b2b: 2390, b2c: 3800 },
    { month: 'Jul', b2b: 3490, b2c: 4300 },
];

const revenueBreakdownData = [
    { name: 'Enterprise (B2B)', value: 400 },
    { name: 'Growth (B2B)', value: 300 },
    { name: 'Direct (B2C)', value: 300 },
    { name: 'Other', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const activeProgrammesData = [
    { name: 'Cardio', users: 4000 },
    { name: 'Diabetes', users: 3000 },
    { name: 'Stress', users: 3000 },
    { name: 'Sleep', users: 2000 },
];

const topOrgsData = [
    { name: 'Infosys', engagement: 85 },
    { name: 'Wipro', engagement: 72 },
    { name: 'Apollo', engagement: 92 },
    { name: 'HDFC', engagement: 65 },
];

const INITIAL_ORGS = [
    { id: 1, name: 'Infosys Limited', display: 'Infosys', plan: 'enterprise', seats: 500, seatsUsed: 347, status: 'active', renewal: 'Jan 1, 2027', industry: 'IT/Software', admin: 'admin@infosys.com', revenue: '₹1,59,300', colour: '#007CC3' },
    { id: 2, name: 'Wipro Technologies', display: 'Wipro', plan: 'growth', seats: 200, seatsUsed: 156, status: 'active', renewal: 'Mar 15, 2027', industry: 'IT/Software', admin: 'hr@wipro.com', revenue: '₹55,200', colour: '#221F63' },
    { id: 3, name: 'Apollo Hospitals', display: 'Apollo', plan: 'enterprise', seats: 300, seatsUsed: 189, status: 'active', renewal: 'Jun 1, 2027', industry: 'Healthcare', admin: 'wellness@apollo.com', revenue: '₹95,400', colour: '#00529B' },
    { id: 4, name: 'HDFC Bank', display: 'HDFC', plan: 'growth', seats: 150, seatsUsed: 82, status: 'trial', renewal: 'Apr 1, 2026', industry: 'BFSI', admin: 'hr@hdfcbank.com', revenue: 'Trial', colour: '#004C8F' },
];

const SuperAdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [realtimeMetrics, setRealtimeMetrics] = useState<any>(null);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [activeTab, setActiveTab] = useState('platform'); // 'platform', 'b2b', 'b2c'
    const [orgs, setOrgs] = useState(INITIAL_ORGS);
    const [isCreatingOrg, setIsCreatingOrg] = useState(false);
    const [newOrgData, setNewOrgData] = useState({ name: '', adminEmail: '', domain: '', plan: 'standard' });

    useEffect(() => {
        // Mock data or fetch
        // In real app, fetch from /api/admin/stats
        setStats({
            users: { total: 12, growth: 12.5, active: 4 },
            revenue: { month: 40000, arr: 5000000, growth: 8.5 },
            health: { programsActive: 12, criticalAlerts: 1 }
        });
        setRealtimeMetrics({
            activeUsers: 4, activeSessions: 3, vitalsPerMinute: 20, apiResponseTime: 47, systemHealth: 99.9, databaseConnections: 5
        });
        setAlerts([
            { id: 1, userName: "Ramesh Kumar", message: "blood_pressure is warning", value: "145/90 mmHg", severity: "warning", timestamp: new Date() }
        ]);
    }, []);

    return (
        <div className="font-sans space-y-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="text-[28px] font-[800] text-gray-900 leading-tight tracking-tight font-serif">Super Admin Console ⚡</div>
                    <div className="text-gray-500 text-[13px] mt-1">Platform-wide organisation management — gruentzig.ai internal</div>
                </div>
                <button
                    onClick={() => setIsCreatingOrg(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-blue-700 transition">
                    + Provision Org
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit mb-6">
                <button
                    onClick={() => setActiveTab('platform')}
                    className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all ${activeTab === 'platform' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    Platform Overview
                </button>
                <button
                    onClick={() => setActiveTab('b2b')}
                    className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all ${activeTab === 'b2b' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    B2B Organisations
                </button>
                <button
                    onClick={() => setActiveTab('b2c')}
                    className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all ${activeTab === 'b2c' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    B2C Consumers
                </button>
            </div>

            {activeTab === 'platform' && (
                <div className="space-y-8">
                    {/* Real-time System Status Bar (Vibrant) */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse absolute"></div>
                                    <div className="w-3 h-3 bg-green-400 rounded-full opacity-50 animate-ping"></div>
                                </div>
                                <span className="font-bold text-lg tracking-wide">System Status: Operational</span>
                            </div>
                            <button
                                onClick={() => setAutoRefresh(!autoRefresh)}
                                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
                            >
                                <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                                <span className="text-sm font-medium">{autoRefresh ? 'Auto-refresh ON' : 'Paused'}</span>
                            </button>
                        </div>

                        {realtimeMetrics && (
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                {[
                                    { label: "Active Users", value: realtimeMetrics.activeUsers },
                                    { label: "Active Sessions", value: realtimeMetrics.activeSessions },
                                    { label: "Vitals/Min", value: realtimeMetrics.vitalsPerMinute },
                                    { label: "API Latency", value: `${realtimeMetrics.apiResponseTime}ms` },
                                    { label: "System Health", value: `${realtimeMetrics.systemHealth}%` },
                                    { label: "DB Connections", value: realtimeMetrics.databaseConnections },
                                ].map((metric, idx) => (
                                    <div key={idx} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                                        <div className="text-xs text-blue-100 font-medium uppercase tracking-wider mb-1 opacity-80">{metric.label}</div>
                                        <div className="text-xl font-bold">{metric.value ?? '-'}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between mb-4">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><Users className="w-6 h-6" /></div>
                                <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                            <div className="mt-1">
                                <p className="text-3xl font-bold text-gray-900">{stats?.users?.total || 0}</p>
                                <p className="text-xs text-gray-400 mt-1">{stats?.users?.active || 0} active now</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between mb-4">
                                <div className="p-3 bg-green-100 text-green-600 rounded-full"><DollarSign className="w-6 h-6" /></div>
                                <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-full">+8.5%</span>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3>
                            <div className="mt-1">
                                <p className="text-3xl font-bold text-gray-900">₹{((stats?.revenue?.month || 0) / 100000).toFixed(1)}L</p>
                                <p className="text-xs text-gray-400 mt-1">ARR: ₹{((stats?.revenue?.arr || 0) / 10000000).toFixed(2)}Cr</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between mb-4">
                                <div className="p-3 bg-purple-100 text-purple-600 rounded-full"><Activity className="w-6 h-6" /></div>
                                <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-full">+8.2%</span>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Active Programs</h3>
                            <div className="mt-1">
                                <p className="text-3xl font-bold text-gray-900">{stats?.health?.programsActive || 0}</p>
                                <p className="text-xs text-gray-400 mt-1">0 consultations</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500 hover:shadow-md transition-shadow">
                            <div className="flex justify-between mb-4">
                                <div className="p-3 bg-red-100 text-red-600 rounded-full"><AlertCircle className="w-6 h-6" /></div>
                                <span className="text-red-600 font-bold text-sm bg-red-50 px-2 py-1 rounded-full">ACTION REQ</span>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Critical Alerts</h3>
                            <div className="mt-1">
                                <p className="text-3xl font-bold text-gray-900">{stats?.health?.criticalAlerts || 0}</p>
                                <p className="text-xs text-gray-400 mt-1">Requires immediate attention</p>
                            </div>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                            <h3 className="font-bold text-gray-800 mb-4">Platform Growth Trend</h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={platformGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorB2b" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorB2c" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Legend verticalAlign="top" height={36} />
                                        <Area type="monotone" dataKey="b2b" name="B2B Users" stroke="#8884d8" fillOpacity={1} fill="url(#colorB2b)" />
                                        <Area type="monotone" dataKey="b2c" name="B2C Users" stroke="#82ca9d" fillOpacity={1} fill="url(#colorB2c)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4">Revenue Breakdown</h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={revenueBreakdownData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {revenueBreakdownData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                                Critical Health Alerts
                                <span className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">3 Active</span>
                            </h3>
                            <div className="space-y-4">
                                {alerts.map((alert: any, i: number) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                        <div>
                                            <p className="font-bold text-gray-900">{alert.userName}</p>
                                            <p className="text-sm text-gray-600">{alert.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{alert.value}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="bg-yellow-200 text-yellow-800 text-[10px] uppercase font-bold px-2 py-1 rounded">WARNING</span>
                                            <button className="block mt-2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 transition">Take Action</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-500" />
                                AI Risk Predictions
                                <span className="ml-auto bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">10 High Risk</span>
                            </h3>
                            <div className="space-y-4">
                                {/* Mock Item */}
                                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100/50">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-bold text-gray-900">Unknown</p>
                                            <p className="text-sm text-gray-600">Test Risk</p>
                                        </div>
                                        <span className="text-2xl font-bold text-purple-600">99%</span>
                                    </div>
                                    <div className="text-xs text-gray-500">Risk Factors: High BP, irregular heart rate...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'b2b' && (
                <div className="space-y-5">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-amber-50 p-4 rounded-[18px]">
                            <div className="text-amber-500 text-[26px] font-serif leading-none">6</div>
                            <div className="text-gray-500 text-[12px] mt-1">Total Organisations</div>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-[18px]">
                            <div className="text-emerald-500 text-[26px] font-serif leading-none">4</div>
                            <div className="text-gray-500 text-[12px] mt-1">Active Orgs</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-[18px]">
                            <div className="text-blue-600 text-[26px] font-serif leading-none">1,024</div>
                            <div className="text-gray-500 text-[12px] mt-1">Total Staff Enrolled</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-[18px]">
                            <div className="text-purple-500 text-[26px] font-serif leading-none">₹3.2L+</div>
                            <div className="text-gray-500 text-[12px] mt-1">Annual Revenue (ARR)</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-[18px] border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4">Top Performing B2B Organisations</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={topOrgsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#4b5563', fontWeight: 600 }} width={60} />
                                        <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="engagement" name="Engagement Score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-[18px] border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4">Subscription Distribution</h3>
                            <div className="h-64 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Active', value: 4 },
                                                { name: 'Trial', value: 1 },
                                                { name: 'Suspended', value: 1 },
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            <Cell fill="#10b981" />
                                            <Cell fill="#f59e0b" />
                                            <Cell fill="#ef4444" />
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex gap-3 items-center">
                            <input className="flex-1 px-3 py-2 border-1.5 border-gray-200 rounded-xl text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800" placeholder="Search organisations…" />
                            <select className="px-3 py-2 border-1.5 border-gray-200 rounded-xl text-[13px] outline-none focus:border-blue-500 text-gray-800 w-auto">
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Trial</option>
                                <option>Suspended</option>
                            </select>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-2.5 px-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Organisation</th>
                                    <th className="py-2.5 px-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Plan</th>
                                    <th className="py-2.5 px-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Seats Used</th>
                                    <th className="py-2.5 px-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Status</th>
                                    <th className="py-2.5 px-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Renewal</th>
                                    <th className="py-2.5 px-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orgs.map((o) => (
                                    <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-3.5 px-3.5 border-b border-gray-50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-white text-[10px] font-extrabold" style={{ backgroundColor: o.colour }}>
                                                    {o.display[0]}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-[12px] text-gray-900">{o.name}</div>
                                                    <div className="text-[10px] text-gray-400">{o.display.toLowerCase()}.preventvital.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-3.5 border-b border-gray-50">
                                            {o.plan === 'enterprise' && <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Enterprise</span>}
                                            {o.plan === 'growth' && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Growth</span>}
                                            {o.plan === 'trial' && <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Trial</span>}
                                        </td>
                                        <td className="py-3.5 px-3.5 border-b border-gray-50">
                                            <div className="flex items-center gap-2 text-[12px] text-gray-600">
                                                <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden shrink-0">
                                                    <div className={`h-full rounded-full ${o.status === 'suspended' ? 'bg-red-500' : (o.status === 'trial' ? 'bg-amber-500' : 'bg-blue-500')}`} style={{ width: `${(o.seatsUsed / o.seats) * 100}%` }}></div>
                                                </div>
                                                {o.seatsUsed}/{o.seats}
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-3.5 border-b border-gray-50">
                                            {o.status === 'active' && <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Active</span>}
                                            {o.status === 'trial' && <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Trial</span>}
                                            {o.status === 'suspended' && <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Suspended</span>}
                                        </td>
                                        <td className="py-3.5 px-3.5 border-b border-gray-50 text-[11px] text-gray-600">
                                            {o.status === 'suspended' ? '–' : o.renewal.split(' ').slice(0, 3).join(' ').replace(',', '')}
                                        </td>
                                        <td className="py-3.5 px-3.5 border-b border-gray-50">
                                            <div className="flex gap-1.5">
                                                <button className="px-2.5 py-1 rounded-md border border-gray-200 bg-white text-[11px] font-semibold text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">View</button>
                                                {o.status === 'suspended' ? (
                                                    <button className="px-2.5 py-1 rounded-md border border-green-200 bg-white text-[11px] font-semibold text-green-600 hover:border-green-500 hover:bg-green-50 transition-colors">Reactivate</button>
                                                ) : (
                                                    <button className="px-2.5 py-1 rounded-md border border-gray-200 bg-white text-[11px] font-semibold text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">Edit</button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'b2c' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Consumers</h3>
                            <div className="text-3xl font-bold text-blue-600">45.2k</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Active Subscriptions</h3>
                            <div className="text-3xl font-bold text-emerald-600">12.5k</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Daily Active Users</h3>
                            <div className="text-3xl font-bold text-purple-600">8.1k</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">B2C MRR</h3>
                            <div className="text-3xl font-bold text-amber-600">₹8.5L</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm p-6 mb-6">
                        <h3 className="font-bold text-gray-800 mb-4">Active Programmes Mix</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={activeProgrammesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#4b5563' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                    <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="users" name="Active Consumers" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={60} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                            <Users className="w-8 h-8 text-blue-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">B2C Consumer Management</h2>
                        <p className="text-gray-500">View individual consumer metrics, manage app subscriptions, and monitor telemetry data.</p>
                    </div>
                </div>
            )}

            <Modal open={isCreatingOrg} onClose={() => setIsCreatingOrg(false)} title="Provision New Organisation" maxWidth="max-w-xl"
                footer={<>
                    <button className="btn-secondary btn" onClick={() => setIsCreatingOrg(false)}>Cancel</button>
                    <button className="btn-primary btn" onClick={() => {
                        const newOrg = {
                            id: Date.now(),
                            name: newOrgData.name || 'New Organisation',
                            display: newOrgData.name ? newOrgData.name.split(' ')[0] : 'New',
                            plan: newOrgData.plan,
                            seats: newOrgData.plan === 'enterprise' ? 500 : 150,
                            seatsUsed: 0,
                            status: 'trial',
                            renewal: 'Jan 1, 2027',
                            industry: 'Other',
                            admin: newOrgData.adminEmail,
                            revenue: 'Trial',
                            colour: '#6366F1' // Default Indigo
                        };
                        setOrgs([newOrg, ...orgs]);
                        setIsCreatingOrg(false);
                        setNewOrgData({ name: '', adminEmail: '', domain: '', plan: 'standard' });
                    }}>
                        Provision Org
                    </button>
                </>}>
                <div className="space-y-4">
                    <p className="text-sm text-slate-500 mb-4">Set up a new B2B tenant space with dedicated corporate admin access and billing plan.</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                            <input type="text" className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Acme Corp" value={newOrgData.name} onChange={e => setNewOrgData({ ...newOrgData, name: e.target.value })} />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Email</label>
                            <input type="email" className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="admin@acme.com" value={newOrgData.adminEmail} onChange={e => setNewOrgData({ ...newOrgData, adminEmail: e.target.value })} />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Tenant Subdomain</label>
                            <div className="flex items-center">
                                <input type="text" className="flex-1 border border-slate-200 rounded-l-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="acme" value={newOrgData.domain} onChange={e => setNewOrgData({ ...newOrgData, domain: e.target.value })} />
                                <span className="bg-slate-50 border border-l-0 border-slate-200 rounded-r-lg p-2 text-sm text-slate-500">.preventvital.com</span>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Subscription Plan</label>
                            <select className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={newOrgData.plan} onChange={e => setNewOrgData({ ...newOrgData, plan: e.target.value })}>
                                <option value="standard">Standard (up to 50 seats)</option>
                                <option value="growth">Growth (up to 250 seats)</option>
                                <option value="enterprise">Enterprise (500+ seats)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default SuperAdminDashboard;
