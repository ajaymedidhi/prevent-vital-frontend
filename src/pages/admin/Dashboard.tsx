import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Users, ShoppingCart, TrendingUp, AlertCircle, CheckCircle, Package, Activity, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RootState } from '../../store';

const revenueData = [
    { day: 'Mon', revenue: 4000 },
    { day: 'Tue', revenue: 3000 },
    { day: 'Wed', revenue: 5000 },
    { day: 'Thu', revenue: 4500 },
    { day: 'Fri', revenue: 6000 },
    { day: 'Sat', revenue: 2000 },
    { day: 'Sun', revenue: 3500 },
];

const recentOrders = [
    { id: 'ORD-2026-891', user: 'Sarah Jenkins', amount: '₹12,499', status: 'Processing', date: '2 mins ago' },
    { id: 'ORD-2026-890', user: 'Michael Chang', amount: '₹4,999', status: 'Shipped', date: '1 hr ago' },
    { id: 'ORD-2026-889', user: 'Dr. Anita Roy', amount: '₹24,000', status: 'Delivered', date: '3 hrs ago' },
    { id: 'ORD-2026-888', user: 'Apollo Clinics', amount: '₹1,50,000', status: 'Pending', date: '5 hrs ago' },
];

const AdminDashboard = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/api/admin/stats', {
                    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
                });
                setStats(res.data.data);
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
                // Fallback for demo if api fails
                setStats({
                    users: { total: 12450, growth: 12.5 },
                    orders: { pending: 45, processing: 12 },
                    health: { criticalAlerts: 3 },
                    revenue: { month: 85400, growth: 8.2 }, // mapped to 'month' in backend
                    topProgrammes: []
                });
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-6 lg:max-w-[1200px]">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back, {user?.name || 'Admin'} 👋</h2>
                    <p className="text-gray-500 mt-1">Here's your platform overview for today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-gray-50 transition">
                        <Calendar size={16} /> Last 7 Days
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 transition">
                        Full Report
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
                        <span className="text-green-600 font-bold text-xs bg-green-50 px-2.5 py-1 rounded-full">+12.5%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                    <div className="mt-2">
                        <p className="text-3xl font-bold text-gray-900">{stats?.users?.total?.toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl"><ShoppingCart className="w-6 h-6" /></div>
                        <span className="text-green-600 font-bold text-xs bg-green-50 px-2.5 py-1 rounded-full">+4.2%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Active Orders</h3>
                    <div className="mt-2">
                        <p className="text-3xl font-bold text-gray-900">{stats?.orders?.pending}</p>
                        <p className="text-xs text-gray-400 mt-1">{stats?.orders?.processing} processing</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
                        <span className="text-green-600 font-bold text-xs bg-green-50 px-2.5 py-1 rounded-full">+8.2%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Today's Revenue</h3>
                    <div className="mt-2">
                        {/* the backend model returns 'month' and 'today' for revenue, mapping here */}
                        <p className="text-3xl font-bold text-gray-900">₹{((stats?.revenue?.today || stats?.revenue?.month || 85400) / 1000).toFixed(1)}k</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-500 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-50 rounded-full opacity-50 blur-2xl pointer-events-none"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl"><AlertCircle className="w-6 h-6" /></div>
                        <span className="text-red-600 font-bold text-xs bg-red-50 px-2.5 py-1 rounded-full shrink-0">ACTION REQ</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium relative z-10">Critical Alerts</h3>
                    <div className="mt-2 relative z-10">
                        <p className="text-3xl font-bold text-gray-900">{stats?.health?.criticalAlerts}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 xl:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 text-lg">Weekly Revenue</h3>
                        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg px-3 py-1.5 outline-none">
                            <option>This Week</option>
                            <option>Last Week</option>
                        </select>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} tickFormatter={(value) => `₹${value / 1000}k`} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value: any) => [`₹${value}`, 'Revenue']}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 text-lg">Recent Orders</h3>
                        <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
                    </div>
                    <div className="flex-1 space-y-5">
                        {recentOrders.map((order, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                        <Package size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{order.user}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs text-slate-500">{order.id}</span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-xs text-slate-500">{order.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-gray-900">{order.amount}</div>
                                    <div className={`text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 inline-block
                                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : ''}
                                        ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : ''}
                                        ${order.status === 'Processing' ? 'bg-purple-100 text-purple-700' : ''}
                                        ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : ''}
                                    `}>
                                        {order.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition flex items-center justify-center gap-2">
                        Manage Orders <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Top Programmes Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Top Programmes by Enrollment</h3>
                {stats?.topProgrammes?.length > 0 ? (
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={stats.topProgrammes.map((p: any) => ({ name: p.title, users: p.enrolledCount }))}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#4b5563' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="users" name="Enrolled Users" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={60} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
                        No programme enrollment data yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
