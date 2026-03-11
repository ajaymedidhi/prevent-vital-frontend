import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
    Users, Activity, DollarSign, AlertCircle,
    RefreshCw, Brain, AlertTriangle, TrendingDown,
    Building2, Eye, Edit2, Zap, Plus, ChevronLeft, ChevronRight, Ban, CheckCircle2, X,
    History, Award, BookOpen, ArrowRight
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Modal } from '../../admin-shared/components/ui';
import toast from 'react-hot-toast';

// COLORS for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const mockTopOrgs = [
    { name: 'Infosys', seats: 450, engagement: 85 },
    { name: 'Wipro', seats: 320, engagement: 72 },
    { name: 'ApolloH', seats: 280, engagement: 92 },
    { name: 'HDFC', seats: 210, engagement: 65 },
    { name: 'TataM', seats: 190, engagement: 78 },
];

const SuperAdminDashboard = () => {
    const [stats, setStats] = useState<any>({
        users: { total: 0, growth: 0, active: 0 },
        revenue: { month: 0, arr: 0, growth: 0 },
        health: { programsActive: 0, criticalAlerts: 0 }
    });
    const [alerts, setAlerts] = useState<any[]>([]);
    const [realtimeMetrics, setRealtimeMetrics] = useState<any>({
        activeUsers: 0, activeSessions: 0, vitalsPerMinute: 0, apiResponseTime: 0, systemHealth: 0, databaseConnections: 0
    });
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [activeTab, setActiveTab] = useState('platform'); // 'platform', 'b2b', 'b2c'
    const [orgs, setOrgs] = useState<any[]>([]);
    const [isCreatingOrg, setIsCreatingOrg] = useState(false);
    const [newOrgData, setNewOrgData] = useState({
        name: '', companyDomain: '', adminFirstName: '', adminLastName: '',
        adminEmail: '', adminPhone: '', industry: '', plan: 'trial', seats: 50
    });
    const [b2cStats, setB2cStats] = useState<any>(null);
    const [b2cUsers, setB2cUsers] = useState<any[]>([]);
    const [analyticsData, setAnalyticsData] = useState<any>(null);
    const [predictions, setPredictions] = useState<any[]>([]);

    // Plan Management State
    const [isManagingOrgPlan, setIsManagingOrgPlan] = useState(false);
    const [managedOrg, setManagedOrg] = useState<any>(null);
    const [isManagingUserPlan, setIsManagingUserPlan] = useState(false);
    const [managedUser, setManagedUser] = useState<any>(null);
    const [planUpdateData, setPlanUpdateData] = useState({ plan: '', seats: 50 });

    // Org list: search, filter, pagination, view modal
    const [orgSearch, setOrgSearch] = useState('');
    const [orgStatusFilter, setOrgStatusFilter] = useState('all');
    const [orgPage, setOrgPage] = useState(1);
    const ORG_PAGE_SIZE = 6;
    const [viewingOrg, setViewingOrg] = useState<any>(null);

    const fetchDashboardData = async () => {
        try {
            const authHeader = { Authorization: `Bearer ${sessionStorage.getItem('token')}` };

            const [statsRes, analyticsRes, tenantsRes, b2cRes, b2cUsersRes, alertsRes, predictionsRes, healthRes] = await Promise.all([
                axios.get('/api/admin/stats', { headers: authHeader }).catch(() => null),
                axios.get('/api/super-admin/analytics', { headers: authHeader }).catch(() => null),
                axios.get('/api/super-admin/tenants', { headers: authHeader }).catch(() => null),
                axios.get('/api/super-admin/b2c-stats', { headers: authHeader }).catch(() => null),
                axios.get('/api/super-admin/users?role=customer', { headers: authHeader }).catch(() => null),
                axios.get('/api/super-admin/alerts', { headers: authHeader }).catch(() => null),
                axios.get('/api/super-admin/predictions', { headers: authHeader }).catch(() => null),
                axios.get('/api/super-admin/system-health', { headers: authHeader }).catch(() => null)
            ]);

            const statsData = statsRes?.data?.data;
            const analyticsPayload = analyticsRes?.data?.data;
            const b2cPayload = b2cRes?.data?.data;
            const tenantsPayload = tenantsRes?.data?.data;
            const b2cUsersPayload = b2cUsersRes?.data?.data?.users;
            const alertsPayload = alertsRes?.data?.data;
            const predictionsPayload = predictionsRes?.data?.data;
            const healthPayload = healthRes?.data?.data;

            if (statsData) {
                setStats({
                    users: {
                        total: statsData.users?.total || 0,
                        growth: statsData.users?.growth || 12.5,
                        active: statsData.users?.active || 0,
                    },
                    revenue: {
                        month: analyticsPayload?.mrr || 0,
                        arr: (analyticsPayload?.mrr || 0) * 12,
                        growth: 8.5
                    },
                    health: {
                        programsActive: analyticsPayload?.activeProgrammes || 0,
                        criticalAlerts: statsData.health?.criticalAlerts || 0
                    }
                });
            }

            if (tenantsPayload?.tenants) {
                setOrgs(tenantsPayload.tenants.map((t: any) => ({
                    id: t._id, name: t.companyName || t.name || 'Unknown', display: t.companyName || t.name || '?',
                    plan: t.subscriptionPlan || 'trial',
                    seats: t.maxUsers || 50, seatsUsed: t.employeeCount || 0,
                    status: t.status || (t.isActive ? 'active' : 'inactive'),
                    renewal: new Date(t.createdAt).toLocaleDateString(), industry: t.industry || 'Tech',
                    admin: t.adminEmail || 'Admin', revenue: '₹--', colour: '#007CC3'
                })));
            }

            if (b2cUsersPayload) {
                setB2cUsers(b2cUsersPayload);
            }

            // Always set analytics & b2c data (even if 0)
            setAnalyticsData(analyticsPayload || null);
            setB2cStats(b2cPayload || null);
            if (Array.isArray(alertsPayload)) setAlerts(alertsPayload);
            if (Array.isArray(predictionsPayload)) setPredictions(predictionsPayload);

            if (healthPayload) {
                setRealtimeMetrics({
                    activeUsers: healthPayload.activeUsers || 0,
                    activeSessions: healthPayload.activeSessions || 0,
                    vitalsPerMinute: healthPayload.vitalsPerMinute || 0,
                    apiResponseTime: healthPayload.apiResponseTime || 0,
                    systemHealth: healthPayload.systemHealth || 0,
                    databaseConnections: healthPayload.databaseConnections || 0
                });
            } else {
                setRealtimeMetrics({
                    activeUsers: analyticsPayload?.totalActiveUsers || 0,
                    activeSessions: 0,
                    vitalsPerMinute: 0,
                    apiResponseTime: 0,
                    systemHealth: 99.9,
                    databaseConnections: 5
                });
            }

        } catch (err) {
            console.error("Dashboard fetch err:", err);
        }
    };
    useEffect(() => {
        fetchDashboardData();
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
                            <h3 className="font-bold text-gray-800 mb-1">Platform Growth Trend</h3>
                            <p className="text-xs text-gray-400 mb-4">New B2B & B2C signups per month</p>
                            <div className="h-72">
                                {analyticsData?.monthlyGrowth?.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={analyticsData.monthlyGrowth.map((m: any) => ({ month: m.month, b2b: m.b2b, b2c: m.b2c }))}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                        >
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
                                            <Area type="monotone" dataKey="b2b" name="B2B Signups" stroke="#8884d8" fillOpacity={1} fill="url(#colorB2b)" />
                                            <Area type="monotone" dataKey="b2c" name="B2C Signups" stroke="#82ca9d" fillOpacity={1} fill="url(#colorB2c)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-400 text-sm">No growth data yet</div>
                                )}
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-1">Revenue Breakdown</h3>
                            <p className="text-xs text-gray-400 mb-4">B2B vs B2C from actual orders</p>
                            <div className="h-72">
                                {(() => {
                                    const b2bRev = analyticsData?.b2bRevenue || 0;
                                    const b2cRev = b2cStats?.b2cRevenue || 0;
                                    const other = 0;
                                    const total = b2bRev + b2cRev + other;
                                    const pieData = total > 0 ? [
                                        { name: 'B2B Revenue', value: Math.round(b2bRev) },
                                        { name: 'B2C Revenue', value: Math.round(b2cRev) },
                                    ] : [
                                        { name: 'No data yet', value: 1 }
                                    ];
                                    return (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%" cy="50%"
                                                    innerRadius={60} outerRadius={80}
                                                    paddingAngle={5} dataKey="value"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={total > 0 ? COLORS[index % COLORS.length] : '#e5e7eb'} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                    formatter={(value: any) => [`₹${(value / 100000).toFixed(2)}L`, '']}
                                                />
                                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent System Activity */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <History className="w-5 h-5 text-blue-500" />
                                Recent Activity
                            </h3>
                            <div className="space-y-4 flex-1">
                                {analyticsData?.recentActivity?.length > 0 ? (
                                    analyticsData.recentActivity.slice(0, 6).map((item: any, i: number) => (
                                        <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${item.action.includes('PUBLISH') ? 'bg-green-500' :
                                                item.action.includes('REJECT') ? 'bg-red-500' :
                                                    item.action.includes('LOGIN') ? 'bg-blue-400' : 'bg-gray-300'
                                                }`}></div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-[12px] text-gray-900 font-semibold line-clamp-1">
                                                    {item.action.replace(/_/g, ' ')}
                                                </div>
                                                <div className="flex justify-between items-center mt-0.5">
                                                    <span className="text-[10px] text-gray-500 truncate">
                                                        {item.user?.profile?.firstName || 'System'} • {item.resource}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 whitespace-nowrap">
                                                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                                        <History className="w-8 h-8 opacity-20 mb-2" />
                                        <p className="text-xs italic">No recent activity detected.</p>
                                    </div>
                                )}
                            </div>
                            <button className="mt-4 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                View Full Audit Trail <ArrowRight size={14} />
                            </button>
                        </div>

                        {/* Top Performing Creators */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-amber-500" />
                                Top Creators
                            </h3>
                            <div className="space-y-5">
                                {analyticsData?.topCreators?.length > 0 ? (
                                    analyticsData.topCreators.map((creator: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm">
                                                        {creator.name?.[0]?.toUpperCase() || 'C'}
                                                    </div>
                                                    {i === 0 && (
                                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[8px] text-white">🏆</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-[12px] text-gray-900">{creator.name}</div>
                                                    <div className="text-[10px] text-gray-500">{creator.email}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-gray-900 text-[12px]">{creator.totalEnrolled}</div>
                                                <div className="text-[10px] text-gray-400">Total Enrolled</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                                        <Users className="w-8 h-8 opacity-20 mb-2" />
                                        <p className="text-xs italic">No creator performance data yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Critical Health Alerts — real vitals from DB */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                                Critical Health Alerts
                                <span className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                                    {alerts.length > 0 ? `${alerts.length} Active` : 'None'}
                                </span>
                            </h3>
                            <div className="space-y-4">
                                {alerts.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400 text-sm">
                                        <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                        No critical alerts at this time
                                    </div>
                                ) : (
                                    alerts.slice(0, 5).map((alert: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                            <div>
                                                <p className="font-bold text-gray-900">{alert.userName}</p>
                                                <p className="text-sm text-gray-600">{alert.message}</p>
                                                <p className="text-xs text-gray-500 mt-1">{alert.value}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${alert.severity === 'critical' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                                    {alert.severity || 'WARNING'}
                                                </span>
                                                <button className="block mt-2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 transition">Take Action</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* AI Risk Predictions — real Prediction model data */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-500" />
                                AI Risk Predictions
                                <span className="ml-auto bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                                    {predictions.length > 0 ? `${predictions.filter((p: any) => p.probability >= 70).length} High Risk` : 'None'}
                                </span>
                            </h3>
                            <div className="space-y-4">
                                {predictions.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400 text-sm">
                                        <Brain className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                        No risk predictions available yet
                                    </div>
                                ) : (
                                    predictions.slice(0, 4).map((p: any, i: number) => (
                                        <div key={i} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100/50">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-bold text-gray-900">{p.userName}</p>
                                                    <p className="text-sm text-gray-600">{p.prediction}</p>
                                                </div>
                                                <span className={`text-2xl font-bold ${(p.probability || 0) >= 80 ? 'text-red-500' : (p.probability || 0) >= 60 ? 'text-amber-500' : 'text-purple-600'}`}>
                                                    {p.probability ? `${p.probability}%` : '—'}
                                                </span>
                                            </div>
                                            {p.factors?.length > 0 && (
                                                <div className="text-xs text-gray-500">Risk Factors: {Array.isArray(p.factors) ? p.factors.join(', ') : p.factors}</div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'b2b' && (
                <div className="space-y-5">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-amber-50 p-4 rounded-[18px]">
                            <div className="text-amber-500 text-[26px] font-serif leading-none">{orgs.length}</div>
                            <div className="text-gray-500 text-[12px] mt-1">Total Organisations</div>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-[18px]">
                            <div className="text-emerald-500 text-[26px] font-serif leading-none">{orgs.filter(o => o.status === 'active').length}</div>
                            <div className="text-gray-500 text-[12px] mt-1">Active Orgs</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-[18px]">
                            <div className="text-blue-600 text-[26px] font-serif leading-none">{orgs.reduce((acc, o) => acc + (o.seatsUsed || 0), 0).toLocaleString()}</div>
                            <div className="text-gray-500 text-[12px] mt-1">Total Staff Enrolled</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-[18px]">
                            <div className="text-purple-500 text-[26px] font-serif leading-none">₹{(((analyticsData?.b2bRevenue || 0) * 12) / 100000).toFixed(1)}L+</div>
                            <div className="text-gray-500 text-[12px] mt-1">Estimated ARR (B2B)</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-[18px] border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4">Top Performing B2B Organisations</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={orgs.sort((a, b) => (b.seatsUsed || 0) - (a.seatsUsed || 0)).slice(0, 5)}
                                        layout="vertical"
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#4b5563', fontWeight: 600 }} width={80} />
                                        <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="seatsUsed" name="Staff Enrolled" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
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
                                                { name: 'Active', value: orgs.filter(o => o.status === 'active').length },
                                                { name: 'Trial', value: orgs.filter(o => o.plan === 'trial').length },
                                                { name: 'Suspended', value: orgs.filter(o => o.status === 'suspended' || o.status === 'inactive').length },
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

                    {(() => {
                        const filtered = orgs.filter(o => {
                            const matchSearch = o.name.toLowerCase().includes(orgSearch.toLowerCase()) || (o.admin || '').toLowerCase().includes(orgSearch.toLowerCase());
                            const matchStatus = orgStatusFilter === 'all' || o.status === orgStatusFilter || (orgStatusFilter === 'trial' && o.plan === 'trial');
                            return matchSearch && matchStatus;
                        });
                        const totalPages = Math.max(1, Math.ceil(filtered.length / ORG_PAGE_SIZE));
                        const paged = filtered.slice((orgPage - 1) * ORG_PAGE_SIZE, orgPage * ORG_PAGE_SIZE);

                        const handleSuspend = async (org: any) => {
                            if (!confirm(`Suspend "${org.name}"? Their admin and employees will lose access.`)) return;
                            try {
                                const authHeader = { Authorization: `Bearer ${sessionStorage.getItem('token')}` };
                                await axios.patch(`/api/super-admin/tenants/${org.id}/status`, { status: 'suspended' }, { headers: authHeader });
                                toast.success(`${org.name} has been suspended.`);
                                fetchDashboardData();
                            } catch (err: any) {
                                toast.error(err.response?.data?.message || 'Failed to suspend org.');
                            }
                        };

                        const handleReactivate = async (org: any) => {
                            try {
                                const authHeader = { Authorization: `Bearer ${sessionStorage.getItem('token')}` };
                                await axios.patch(`/api/super-admin/tenants/${org.id}/status`, { status: 'active' }, { headers: authHeader });
                                toast.success(`${org.name} has been reactivated!`);
                                fetchDashboardData();
                            } catch (err: any) {
                                toast.error(err.response?.data?.message || 'Failed to reactivate org.');
                            }
                        };

                        const planBadge = (plan: string) => {
                            const m: Record<string, string> = {
                                trial: 'bg-amber-100 text-amber-700', standard: 'bg-blue-100 text-blue-700',
                                growth: 'bg-indigo-100 text-indigo-700', enterprise: 'bg-purple-100 text-purple-700'
                            };
                            return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${m[plan] || 'bg-gray-100 text-gray-600'}`}>{plan}</span>;
                        };

                        const statusBadge = (s: string) => {
                            const m: Record<string, string> = {
                                active: 'bg-green-100 text-green-700', suspended: 'bg-red-100 text-red-700',
                                inactive: 'bg-gray-200 text-gray-600'
                            };
                            return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${m[s] || 'bg-gray-100 text-gray-600'}`}>{s}</span>;
                        };

                        return (
                            <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-gray-100 flex gap-3 items-center">
                                    <input
                                        className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-800"
                                        placeholder="Search organisations…"
                                        value={orgSearch}
                                        onChange={e => { setOrgSearch(e.target.value); setOrgPage(1); }}
                                    />
                                    <select
                                        className="px-3 py-2 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-blue-500 text-gray-800 w-auto bg-white"
                                        value={orgStatusFilter}
                                        onChange={e => { setOrgStatusFilter(e.target.value); setOrgPage(1); }}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="trial">Trial</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="py-2.5 px-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Organisation</th>
                                            <th className="py-2.5 px-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Plan</th>
                                            <th className="py-2.5 px-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Seats</th>
                                            <th className="py-2.5 px-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Status</th>
                                            <th className="py-2.5 px-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Added</th>
                                            <th className="py-2.5 px-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paged.length === 0 ? (
                                            <tr><td colSpan={6} className="py-10 text-center text-sm text-gray-400">No organisations match your criteria.</td></tr>
                                        ) : paged.map((o) => (
                                            <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3.5 px-3.5 border-b border-gray-50">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-white text-[10px] font-extrabold bg-blue-600">
                                                            {(o.name || '?')[0].toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-[12px] text-gray-900">{o.name}</div>
                                                            <div className="text-[10px] text-gray-400">{o.admin || '—'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-3.5 border-b border-gray-50">{planBadge(o.plan)}</td>
                                                <td className="py-3.5 px-3.5 border-b border-gray-50">
                                                    <div className="flex items-center gap-2 text-[12px] text-gray-600">
                                                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden shrink-0">
                                                            <div className={`h-full rounded-full ${o.status === 'suspended' ? 'bg-red-400' : 'bg-blue-500'}`} style={{ width: `${Math.min(100, (o.seatsUsed / (o.seats || 1)) * 100)}%` }}></div>
                                                        </div>
                                                        {o.seatsUsed}/{o.seats}
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-3.5 border-b border-gray-50">{statusBadge(o.status)}</td>
                                                <td className="py-3.5 px-3.5 border-b border-gray-50 text-[11px] text-gray-500">{o.renewal}</td>
                                                <td className="py-3.5 px-3.5 border-b border-gray-50">
                                                    <div className="flex gap-1.5">
                                                        <button onClick={() => setViewingOrg(o)}
                                                            className="px-2 py-1 rounded-md border border-gray-200 bg-white text-[11px] font-semibold text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors inline-flex items-center gap-1">
                                                            <Eye size={12} /> View
                                                        </button>
                                                        <button onClick={() => {
                                                            setManagedOrg(o);
                                                            setPlanUpdateData({ plan: o.plan, seats: o.seats });
                                                            setIsManagingOrgPlan(true);
                                                        }}
                                                            className="px-2 py-1 rounded-md border border-gray-200 bg-white text-[11px] font-semibold text-gray-600 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors inline-flex items-center gap-1">
                                                            <Zap size={12} /> Plan
                                                        </button>
                                                        {o.status === 'suspended' ? (
                                                            <button onClick={() => handleReactivate(o)}
                                                                className="px-2 py-1 rounded-md border border-green-200 bg-white text-[11px] font-semibold text-green-600 hover:border-green-500 hover:bg-green-50 transition-colors inline-flex items-center gap-1">
                                                                <CheckCircle2 size={12} /> Reactivate
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => handleSuspend(o)}
                                                                className="px-2 py-1 rounded-md border border-red-100 bg-white text-[11px] font-semibold text-red-500 hover:border-red-400 hover:bg-red-50 transition-colors inline-flex items-center gap-1">
                                                                <Ban size={12} /> Suspend
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Pagination */}
                                <div className="p-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                    <span>Showing {paged.length} of {filtered.length} organisations</span>
                                    <div className="flex items-center gap-1">
                                        <button disabled={orgPage <= 1} onClick={() => setOrgPage(p => p - 1)}
                                            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                                            <ChevronLeft size={14} />
                                        </button>
                                        <span className="px-3 py-1 text-xs font-semibold">Page {orgPage} of {totalPages}</span>
                                        <button disabled={orgPage >= totalPages} onClick={() => setOrgPage(p => p + 1)}
                                            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}

            {activeTab === 'b2c' && (
                <div className="space-y-6">
                    {/* KPI Cards — real data from /api/super-admin/b2c-stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Total B2C Consumers</h3>
                            <div className="text-3xl font-bold text-blue-600">
                                {b2cStats ? (b2cStats.totalB2CUsers ?? 0).toLocaleString() : '—'}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Registered individual users</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Active Subscriptions</h3>
                            <div className="text-3xl font-bold text-emerald-600">
                                {b2cStats ? (b2cStats.activeSubscriptions ?? 0).toLocaleString() : '—'}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Non-free plan users</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Daily Active Users</h3>
                            <div className="text-3xl font-bold text-purple-600">
                                {b2cStats ? (b2cStats.dailyActiveUsers ?? 0).toLocaleString() : '—'}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">~15% of total (est)</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">B2C Revenue</h3>
                            <div className="text-3xl font-bold text-amber-600">
                                {b2cStats ? `₹${((b2cStats.b2cRevenue || 0) / 100000).toFixed(1)}L` : '—'}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Total from individual orders</p>
                        </div>
                    </div>

                    {/* Active Programmes Mix — real top programmes from analytics */}
                    <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm p-6 mb-6">
                        <h3 className="font-bold text-gray-800 mb-4">Top Programmes by Enrollment</h3>
                        {analyticsData?.topProgrammes?.length > 0 ? (
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={analyticsData.topProgrammes.map((p: any) => ({ name: p.title, users: p.enrolledCount }))}
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

                    <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Consumer Base Management</h3>
                                <p className="text-xs text-gray-500">Manage individual B2C subscriptions and access levels.</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white">
                                        <th className="py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">User</th>
                                        <th className="py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Plan</th>
                                        <th className="py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Joined</th>
                                        <th className="py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {b2cUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-8 text-center text-gray-400 text-sm">No individual consumers found.</td>
                                        </tr>
                                    ) : b2cUsers.map((u: any) => (
                                        <tr key={u._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-3 px-4 border-b border-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs uppercase">
                                                        {(u.profile?.firstName?.[0] || u.email[0])}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-[12px] text-gray-900">{u.profile?.firstName} {u.profile?.lastName}</div>
                                                        <div className="text-[10px] text-gray-400">{u.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 border-b border-gray-50">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${u.subscription?.plan === 'platinum' ? 'bg-purple-100 text-purple-700' : u.subscription?.plan === 'gold' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {u.subscription?.plan || 'free'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 border-b border-gray-50 text-[11px] text-gray-500">
                                                {new Date(u.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4 border-b border-gray-50 text-right">
                                                <button
                                                    onClick={() => {
                                                        setManagedUser(u);
                                                        setPlanUpdateData({ plan: u.subscription?.plan || 'free', seats: 0 });
                                                        setIsManagingUserPlan(true);
                                                    }}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-1 text-[11px] font-bold">
                                                    <Zap size={14} /> Change Plan
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <Modal open={isCreatingOrg} onClose={() => { setIsCreatingOrg(false); setNewOrgData({ name: '', companyDomain: '', adminFirstName: '', adminLastName: '', adminEmail: '', adminPhone: '', industry: '', plan: 'trial', seats: 50 }); }} title="Provision New Organisation" maxWidth="max-w-2xl"
                footer={<>
                    <button className="btn-secondary btn" onClick={() => setIsCreatingOrg(false)}>Cancel</button>
                    <button className="btn-primary btn" onClick={async () => {
                        try {
                            const authHeader = { Authorization: `Bearer ${sessionStorage.getItem('token')}` };
                            const domainSlug = (newOrgData.companyDomain || newOrgData.name)
                                .replace(/https?:\/\//, '').replace(/\.com.*/, '')
                                .toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
                            const payload = {
                                name: newOrgData.name,
                                adminEmail: newOrgData.adminEmail,
                                adminName: `${newOrgData.adminFirstName} ${newOrgData.adminLastName}`.trim(),
                                adminMobile: newOrgData.adminPhone,
                                domain: domainSlug,
                                industry: newOrgData.industry,
                                plan: newOrgData.plan,
                                seats: newOrgData.seats,
                                status: 'active'
                            };
                            await axios.post('/api/super-admin/tenants', payload, { headers: authHeader });
                            toast.success(`"${newOrgData.name}" provisioned successfully!`);
                            fetchDashboardData();
                            setIsCreatingOrg(false);
                            setNewOrgData({ name: '', companyDomain: '', adminFirstName: '', adminLastName: '', adminEmail: '', adminPhone: '', industry: '', plan: 'trial', seats: 50 });
                        } catch (err: any) {
                            console.error('Error provisioning org:', err.response?.data || err.message);
                            toast.error(err.response?.data?.message || 'Failed to provision organisation.');
                        }
                    }}>
                        Provision Organisation
                    </button>
                </>}>
                <div className="space-y-6">
                    {/* Section: Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">1</span>
                            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Company Information</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Legal Company Name <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g., Policybazaar Insurance Brokers Pvt. Ltd."
                                    value={newOrgData.name}
                                    onChange={e => setNewOrgData(prev => ({ ...prev, name: e.target.value }))} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    Company Domain <span className="text-red-500">*</span>
                                    <span className="ml-1.5 text-blue-400 text-[10px] font-normal">(used to derive email &amp; subdomain)</span>
                                </label>
                                <div className="relative">
                                    <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="policybazaar.com"
                                        value={newOrgData.companyDomain}
                                        onChange={e => {
                                            const raw = e.target.value.toLowerCase().trim();
                                            const domain = raw.replace(/https?:\/\//, '').replace(/\/$/, '');
                                            const slug = domain.split('.')[0].replace(/[^a-z0-9]/g, '');
                                            setNewOrgData(prev => ({
                                                ...prev,
                                                companyDomain: raw,
                                                adminEmail: prev.adminEmail === '' || prev.adminEmail === `admin@${prev.companyDomain.split('.')[0].replace(/[^a-z0-9]/g, '')}.com`
                                                    ? `admin@${domain}`
                                                    : prev.adminEmail,
                                            }));
                                        }}
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">Subdomain will be: <span className="font-mono text-blue-500">{(newOrgData.companyDomain || newOrgData.name).replace(/https?:\/\//, '').split('.')[0].toLowerCase().replace(/[^a-z0-9]/g, '') || 'company'}.preventvital.com</span></p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Industry / Vertical</label>
                                <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                    value={newOrgData.industry} onChange={e => setNewOrgData(prev => ({ ...prev, industry: e.target.value }))}>
                                    <option value="">Select industry…</option>
                                    <option value="banking">Banking &amp; Finance</option>
                                    <option value="insurance">Insurance</option>
                                    <option value="healthcare">Healthcare &amp; Pharma</option>
                                    <option value="it">Information Technology</option>
                                    <option value="manufacturing">Manufacturing</option>
                                    <option value="retail">Retail &amp; E-commerce</option>
                                    <option value="education">Education</option>
                                    <option value="government">Government / PSU</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-100" />

                    {/* Section: Admin Contact */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">2</span>
                            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Corporate Admin Contact</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">First Name <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Rajesh" value={newOrgData.adminFirstName}
                                    onChange={e => setNewOrgData(prev => ({ ...prev, adminFirstName: e.target.value }))} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Last Name <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Kumar" value={newOrgData.adminLastName}
                                    onChange={e => setNewOrgData(prev => ({ ...prev, adminLastName: e.target.value }))} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    Admin Email <span className="text-red-500">*</span>
                                    <span className="ml-1.5 text-blue-400 text-[10px] font-normal">(auto-derived · editable)</span>
                                </label>
                                <input type="email" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="admin@policybazaar.com"
                                    value={newOrgData.adminEmail}
                                    onChange={e => setNewOrgData(prev => ({ ...prev, adminEmail: e.target.value }))} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Admin Phone <span className="text-gray-400 font-normal">(optional)</span></label>
                                <input type="tel" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="+91 98765 43210" value={newOrgData.adminPhone}
                                    onChange={e => setNewOrgData(prev => ({ ...prev, adminPhone: e.target.value }))} />
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-100" />

                    {/* Section: Plan */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">3</span>
                            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Subscription Plan</p>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                { value: 'trial', label: 'Trial', price: '₹0', seats: 10, color: 'amber' },
                                { value: 'standard', label: 'Standard', price: '₹25k/mo', seats: 50, color: 'blue' },
                                { value: 'growth', label: 'Growth', price: '₹55k/mo', seats: 250, color: 'indigo' },
                                { value: 'enterprise', label: 'Enterprise', price: '₹1.5L+/mo', seats: 500, color: 'purple' },
                            ].map(p => {
                                const sel = newOrgData.plan === p.value;
                                const border: Record<string, string> = { amber: 'border-amber-400', blue: 'border-blue-500', indigo: 'border-indigo-500', purple: 'border-purple-500' };
                                const bg: Record<string, string> = { amber: 'bg-amber-50', blue: 'bg-blue-50', indigo: 'bg-indigo-50', purple: 'bg-purple-50' };
                                const txt: Record<string, string> = { amber: 'text-amber-700', blue: 'text-blue-700', indigo: 'text-indigo-700', purple: 'text-purple-700' };
                                return (
                                    <button key={p.value} type="button"
                                        onClick={() => setNewOrgData(prev => ({ ...prev, plan: p.value, seats: p.seats }))}
                                        className={`p-3 rounded-xl border-2 text-left transition-all ${sel ? `${border[p.color]} ${bg[p.color]}` : 'border-gray-100 hover:border-gray-200 bg-gray-50'}`}>
                                        <div className={`text-xs font-bold mb-1 ${sel ? txt[p.color] : 'text-gray-700'}`}>{p.label}</div>
                                        <div className="text-[11px] text-gray-500 font-mono">{p.price}</div>
                                        <div className="text-[10px] text-gray-400 mt-1">{p.seats} seats</div>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-3">
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Seat Limit</label>
                            <input type="number" min={1} className="w-32 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={newOrgData.seats}
                                onChange={e => setNewOrgData(prev => ({ ...prev, seats: parseInt(e.target.value) || 10 }))} />
                            <span className="ml-2 text-xs text-gray-400">licensed users</span>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Change B2B Plan Modal */}
            <Modal open={isManagingOrgPlan} onClose={() => setIsManagingOrgPlan(false)} title={`Change Plan: ${managedOrg?.name}`} maxWidth="max-w-md"
                footer={<>
                    <button className="btn-secondary btn" onClick={() => setIsManagingOrgPlan(false)}>Cancel</button>
                    <button className="btn-primary btn" onClick={async () => {
                        try {
                            const authHeader = { Authorization: `Bearer ${sessionStorage.getItem('token')}` };
                            await axios.patch(`/api/super-admin/tenants/${managedOrg.id}/plan`, planUpdateData, { headers: authHeader });
                            toast.success(`Plan updated to ${planUpdateData.plan} for ${managedOrg?.name}.`);
                            fetchDashboardData();
                            setIsManagingOrgPlan(false);
                        } catch (err: any) { toast.error(err.response?.data?.message || 'Failed to update plan.'); }
                    }}>Update Plan</button>
                </>}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Select New Plan</label>
                        <select className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white" value={planUpdateData.plan} onChange={e => setPlanUpdateData({ ...planUpdateData, plan: e.target.value })}>
                            <option value="trial">Trial (Limited Access)</option>
                            <option value="standard">Standard (50 Seats)</option>
                            <option value="growth">Growth (250 Seats)</option>
                            <option value="enterprise">Enterprise (500+ Seats)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Maximum Seats</label>
                        <input type="number" className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={planUpdateData.seats} onChange={e => setPlanUpdateData({ ...planUpdateData, seats: parseInt(e.target.value) })} />
                    </div>
                </div>
            </Modal>

            {/* Change B2C Plan Modal */}
            <Modal open={isManagingUserPlan} onClose={() => setIsManagingUserPlan(false)} title={`Manage Subscription: ${managedUser?.email}`} maxWidth="max-w-md"
                footer={<>
                    <button className="btn-secondary btn" onClick={() => setIsManagingUserPlan(false)}>Cancel</button>
                    <button className="btn-primary btn" onClick={async () => {
                        try {
                            const authHeader = { Authorization: `Bearer ${sessionStorage.getItem('token')}` };
                            await axios.patch(`/api/super-admin/users/${managedUser._id}/plan`, { plan: planUpdateData.plan }, { headers: authHeader });
                            toast.success(`Subscription updated to ${planUpdateData.plan} for ${managedUser?.email}.`);
                            fetchDashboardData();
                            setIsManagingUserPlan(false);
                        } catch (err: any) { toast.error(err.response?.data?.message || 'Failed to update subscription.'); }
                    }}>Update Subscription</button>
                </>}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Subscription Tier</label>
                        <select className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white" value={planUpdateData.plan} onChange={e => setPlanUpdateData({ ...planUpdateData, plan: e.target.value })}>
                            <option value="free">Free Tier</option>
                            <option value="silver">Silver Tier</option>
                            <option value="gold">Gold Tier</option>
                            <option value="platinum">Platinum (VIP)</option>
                        </select>
                    </div>
                    <p className="text-[11px] text-gray-500 italic">Plan changes will take effect immediately for the user.</p>
                </div>
            </Modal>

            {/* View Org Detail Modal */}
            <Modal open={!!viewingOrg} onClose={() => setViewingOrg(null)} title={viewingOrg?.name || 'Organisation Details'} maxWidth="max-w-lg"
                footer={<button className="btn-secondary btn" onClick={() => setViewingOrg(null)}>Close</button>}>
                {viewingOrg && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-0.5">Company Name</p>
                                <p className="text-sm font-semibold text-gray-800">{viewingOrg.name}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-0.5">Admin Email</p>
                                <p className="text-sm text-gray-700">{viewingOrg.admin || '—'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-0.5">Industry</p>
                                <p className="text-sm text-gray-700 capitalize">{viewingOrg.industry || '—'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-0.5">Status</p>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${viewingOrg.status === 'active' ? 'bg-green-100 text-green-700' :
                                    viewingOrg.status === 'suspended' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-600'
                                    }`}>{viewingOrg.status}</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-0.5">Subscription Plan</p>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${viewingOrg.plan === 'enterprise' ? 'bg-purple-100 text-purple-700' :
                                    viewingOrg.plan === 'growth' ? 'bg-indigo-100 text-indigo-700' :
                                        viewingOrg.plan === 'standard' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                                    }`}>{viewingOrg.plan}</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-0.5">Seat Capacity</p>
                                <p className="text-sm text-gray-700">{viewingOrg.seatsUsed} / {viewingOrg.seats} used</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-0.5">Provisioned On</p>
                                <p className="text-sm text-gray-700">{viewingOrg.renewal}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

        </div>
    );
};

export default SuperAdminDashboard;
