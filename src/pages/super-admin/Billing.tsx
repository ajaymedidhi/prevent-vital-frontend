import React, { useState, useEffect } from 'react';
import {
    CreditCard, FileText, Download, Building2, Users, TrendingUp, AlertCircle, CheckCircle2,
    Search, Plus, Loader2, Zap, Star, Shield, Crown, RefreshCw, ChevronDown
} from 'lucide-react';
import { Modal, Badge } from '../../admin-shared/components/ui';
import superAdminApi from '../../admin-shared/services/superAdminApi';
import axios from 'axios';
import toast from 'react-hot-toast';

// ─── Plan Definitions ──────────────────────────────────────────────────────────
const B2B_PLANS: Record<string, { label: string; price: string; seats: number; color: string; icon: any }> = {
    trial: { label: 'Trial', price: '₹0 / mo', seats: 10, color: 'amber', icon: Star },
    standard: { label: 'Standard', price: '₹25,000 / mo', seats: 50, color: 'blue', icon: Shield },
    growth: { label: 'Growth', price: '₹55,000 / mo', seats: 250, color: 'indigo', icon: Zap },
    enterprise: { label: 'Enterprise', price: '₹1,50,000+ / mo', seats: 500, color: 'purple', icon: Crown },
};

const B2C_PLANS: Record<string, { label: string; price: string; color: string; icon: any }> = {
    free: { label: 'Free', price: '₹0 / mo', color: 'gray', icon: Star },
    silver: { label: 'Silver', price: '₹299 / mo', color: 'slate', icon: Shield },
    gold: { label: 'Gold', price: '₹799 / mo', color: 'amber', icon: Zap },
    platinum: { label: 'Platinum', price: '₹1,499 / mo', color: 'purple', icon: Crown },
};

const planBadge = (plan: string, type: 'b2b' | 'b2c') => {
    const defs = type === 'b2b' ? B2B_PLANS : B2C_PLANS;
    const p = defs[plan];
    if (!p) return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 uppercase">{plan || 'free'}</span>;
    const colorMap: Record<string, string> = {
        amber: 'bg-amber-100 text-amber-700', blue: 'bg-blue-100 text-blue-700',
        indigo: 'bg-indigo-100 text-indigo-700', purple: 'bg-purple-100 text-purple-700',
        gray: 'bg-gray-100 text-gray-600', slate: 'bg-slate-100 text-slate-700',
    };
    return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${colorMap[p.color]}`}>{p.label}</span>;
};

// ────────────────────────────────────────────────────────────────────────────────

const Billing = () => {
    const [activeTab, setActiveTab] = useState<'b2b' | 'b2c' | 'invoices'>('b2b');

    // B2B state
    const [orgs, setOrgs] = useState<any[]>([]);
    const [orgsLoading, setOrgsLoading] = useState(true);
    const [orgSearch, setOrgSearch] = useState('');
    const [changingOrg, setChangingOrg] = useState<any>(null);
    const [orgPlanForm, setOrgPlanForm] = useState({ plan: '', seats: 50 });
    const [isUpdatingOrg, setIsUpdatingOrg] = useState(false);

    // B2C state
    const [b2cUsers, setB2cUsers] = useState<any[]>([]);
    const [b2cLoading, setB2cLoading] = useState(true);
    const [userSearch, setUserSearch] = useState('');
    const [changingUser, setChangingUser] = useState<any>(null);
    const [userPlanForm, setUserPlanForm] = useState({ plan: '' });
    const [isUpdatingUser, setIsUpdatingUser] = useState(false);

    // Invoice state
    const [invoices, setInvoices] = useState<any[]>([]);
    const [invoicesLoading, setInvoicesLoading] = useState(false);
    const [invoiceSearch, setInvoiceSearch] = useState('');
    const [isIssuing, setIsIssuing] = useState(false);

    const authHeader = { Authorization: `Bearer ${sessionStorage.getItem('token')}` };

    const fetchOrgs = async () => {
        try {
            setOrgsLoading(true);
            const res = await superAdminApi.get('/tenants');
            setOrgs(res.data?.tenants || []);
        } catch (err) {
            toast.error('Failed to load organisations');
        } finally {
            setOrgsLoading(false);
        }
    };

    const fetchB2cUsers = async () => {
        try {
            setB2cLoading(true);
            const res = await superAdminApi.get('/users?customerType=individual');
            setB2cUsers(res.data?.users || res.users || []);
        } catch (err) {
            toast.error('Failed to load consumers');
        } finally {
            setB2cLoading(false);
        }
    };

    const fetchInvoices = async () => {
        try {
            setInvoicesLoading(true);
            const res = await superAdminApi.get('/invoices');
            setInvoices(res.data?.orders || res.orders || []);
        } catch (err) {
            console.error(err);
        } finally {
            setInvoicesLoading(false);
        }
    };

    useEffect(() => {
        fetchOrgs();
        fetchB2cUsers();
        fetchInvoices();
    }, []);

    const updateOrgPlan = async () => {
        if (!changingOrg) return;
        try {
            setIsUpdatingOrg(true);
            await axios.patch(`/api/super-admin/tenants/${changingOrg._id}/plan`, orgPlanForm, { headers: authHeader });
            toast.success(`Plan updated to "${B2B_PLANS[orgPlanForm.plan]?.label || orgPlanForm.plan}" for ${changingOrg.name}`);
            fetchOrgs();
            setChangingOrg(null);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Update failed');
        } finally {
            setIsUpdatingOrg(false);
        }
    };

    const updateUserPlan = async () => {
        if (!changingUser) return;
        try {
            setIsUpdatingUser(true);
            await axios.patch(`/api/super-admin/users/${changingUser._id}/plan`, { plan: userPlanForm.plan }, { headers: authHeader });
            toast.success(`Subscription updated to "${B2C_PLANS[userPlanForm.plan]?.label || userPlanForm.plan}"`);
            fetchB2cUsers();
            setChangingUser(null);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Update failed');
        } finally {
            setIsUpdatingUser(false);
        }
    };

    const filteredOrgs = orgs.filter(o =>
        (o.name || '').toLowerCase().includes(orgSearch.toLowerCase()) ||
        (o.adminEmail || '').toLowerCase().includes(orgSearch.toLowerCase())
    );

    const filteredUsers = b2cUsers.filter(u =>
        (u.email || '').toLowerCase().includes(userSearch.toLowerCase()) ||
        (u.profile?.firstName || '').toLowerCase().includes(userSearch.toLowerCase())
    );

    const filteredInvoices = invoices.filter(inv =>
        inv.orderId?.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
        inv.userId?.email?.toLowerCase().includes(invoiceSearch.toLowerCase())
    );

    // KPIs
    const trialOrgs = orgs.filter(o => o.subscriptionPlan === 'trial').length;
    const paidOrgs = orgs.filter(o => ['standard', 'growth', 'enterprise'].includes(o.subscriptionPlan)).length;
    const paidUsers = b2cUsers.filter(u => u.subscription?.plan !== 'free').length;
    const totalRevenue = invoices
        .filter(i => ['completed', 'paid'].includes(i.orderStatus))
        .reduce((acc, i) => acc + (i.pricing?.total || 0), 0);

    const tabs = [
        { id: 'b2b', label: 'B2B Organisations', icon: Building2 },
        { id: 'b2c', label: 'B2C Consumers', icon: Users },
        { id: 'invoices', label: 'Invoices', icon: FileText },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Subscriptions & Billing</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage plans for organisations and individual consumers across the platform.</p>
                </div>
                <button onClick={() => Promise.all([fetchOrgs(), fetchB2cUsers(), fetchInvoices()])}
                    className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-3 py-2 rounded-xl text-sm font-medium shadow-sm transition-colors">
                    <RefreshCw size={15} /> Refresh
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Revenue', value: `₹${(totalRevenue / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'blue' },
                    { label: 'Paid B2B Orgs', value: paidOrgs, icon: Building2, color: 'indigo' },
                    { label: 'Trial Orgs', value: trialOrgs, icon: AlertCircle, color: 'amber' },
                    { label: 'Paid Consumers', value: paidUsers, icon: CheckCircle2, color: 'green' },
                ].map((kpi, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">{kpi.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
                        </div>
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-${kpi.color}-50 text-${kpi.color}-600`}>
                            <kpi.icon size={22} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        <tab.icon size={14} />{tab.label}
                    </button>
                ))}
            </div>

            {/* B2B Tab */}
            {activeTab === 'b2b' && (
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900">Organisation Subscriptions</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Manage and upgrade plans for corporate tenants.</p>
                        </div>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input placeholder="Search orgs..." value={orgSearch} onChange={e => setOrgSearch(e.target.value)}
                                className="pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white focus:border-blue-500 transition-all" />
                        </div>
                    </div>

                    {/* Plan Summary Bar */}
                    <div className="grid grid-cols-4 border-b border-gray-100">
                        {Object.entries(B2B_PLANS).map(([key, plan]) => {
                            const count = orgs.filter(o => o.subscriptionPlan === key).length;
                            return (
                                <div key={key} className="p-4 text-center border-r border-gray-100 last:border-0">
                                    <p className="text-xs text-gray-500 mb-1">{plan.label}</p>
                                    <p className="text-xl font-bold text-gray-900">{count}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{plan.price}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Organisation</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Plan</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Seats</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orgsLoading ? (
                                    <tr><td colSpan={5} className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin text-blue-400 mx-auto" /></td></tr>
                                ) : filteredOrgs.length === 0 ? (
                                    <tr><td colSpan={5} className="py-10 text-center text-sm text-gray-400">No organisations found.</td></tr>
                                ) : filteredOrgs.map(org => (
                                    <tr key={org._id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="py-3.5 px-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-black">
                                                    {org.name?.[0]?.toUpperCase() || '?'}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-sm text-gray-900">{org.name}</div>
                                                    <div className="text-xs text-gray-400">{org.adminEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-5">{planBadge(org.subscriptionPlan || 'trial', 'b2b')}</td>
                                        <td className="py-3.5 px-5 text-sm text-gray-600">{org.maxUsers || '—'}</td>
                                        <td className="py-3.5 px-5">
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${org.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {org.status || 'active'}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-5 text-right">
                                            <button onClick={() => { setChangingOrg(org); setOrgPlanForm({ plan: org.subscriptionPlan || 'trial', seats: org.maxUsers || 50 }); }}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors">
                                                <Zap size={12} /> Change Plan
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* B2C Tab */}
            {activeTab === 'b2c' && (
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900">Consumer Subscriptions</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Manage individual app user subscription tiers.</p>
                        </div>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input placeholder="Search users..." value={userSearch} onChange={e => setUserSearch(e.target.value)}
                                className="pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white focus:border-blue-500 transition-all" />
                        </div>
                    </div>

                    {/* Plan Summary Bar */}
                    <div className="grid grid-cols-4 border-b border-gray-100">
                        {Object.entries(B2C_PLANS).map(([key, plan]) => {
                            const count = b2cUsers.filter(u => (u.subscription?.plan || 'free') === key).length;
                            return (
                                <div key={key} className="p-4 text-center border-r border-gray-100 last:border-0">
                                    <p className="text-xs text-gray-500 mb-1">{plan.label}</p>
                                    <p className="text-xl font-bold text-gray-900">{count}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{plan.price}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">User</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Plan</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Joined</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {b2cLoading ? (
                                    <tr><td colSpan={4} className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin text-blue-400 mx-auto" /></td></tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr><td colSpan={4} className="py-10 text-center text-sm text-gray-400">No individual consumers found.</td></tr>
                                ) : filteredUsers.map(u => (
                                    <tr key={u._id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="py-3.5 px-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-black uppercase">
                                                    {u.profile?.firstName?.[0] || u.email?.[0] || '?'}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-sm text-gray-900">{u.profile?.firstName} {u.profile?.lastName}</div>
                                                    <div className="text-xs text-gray-400">{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-5">{planBadge(u.subscription?.plan || 'free', 'b2c')}</td>
                                        <td className="py-3.5 px-5 text-xs text-gray-500">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                                        <td className="py-3.5 px-5 text-right">
                                            <button onClick={() => { setChangingUser(u); setUserPlanForm({ plan: u.subscription?.plan || 'free' }); }}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors">
                                                <Zap size={12} /> Update Plan
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Invoices Tab */}
            {activeTab === 'invoices' && (
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between">
                        <h3 className="font-bold text-gray-900">Payment Records</h3>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input placeholder="Search invoices..." value={invoiceSearch} onChange={e => setInvoiceSearch(e.target.value)}
                                    className="pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white focus:border-blue-500 transition-all" />
                            </div>
                            <button onClick={() => setIsIssuing(true)}
                                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors">
                                <Plus size={13} /> Manual Invoice
                            </button>
                        </div>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Invoice #</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="py-3 px-5 text-right text-[10px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {invoicesLoading ? (
                                <tr><td colSpan={6} className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin text-blue-400 mx-auto" /></td></tr>
                            ) : filteredInvoices.length === 0 ? (
                                <tr><td colSpan={6} className="py-10 text-center text-sm text-gray-400">No invoices found.</td></tr>
                            ) : filteredInvoices.map(inv => (
                                <tr key={inv._id || inv.orderId} className="hover:bg-gray-50/60 transition-colors">
                                    <td className="py-4 px-5 font-mono text-sm text-gray-700">{inv.orderId}</td>
                                    <td className="py-4 px-5 text-sm">
                                        <div className="font-medium text-gray-900">{inv.userId?.profile?.companyName || inv.userId?.email || 'Individual'}</div>
                                    </td>
                                    <td className="py-4 px-5 font-semibold text-gray-800 text-sm">₹{(inv.pricing?.total || 0).toLocaleString()}</td>
                                    <td className="py-4 px-5 text-sm text-gray-500">{new Date(inv.createdAt).toLocaleDateString()}</td>
                                    <td className="py-4 px-5">
                                        {['paid', 'completed'].includes(inv.orderStatus) ?
                                            <Badge color="green">Paid</Badge> : inv.orderStatus === 'pending' ?
                                                <Badge color="yellow">Pending</Badge> :
                                                <Badge color="red">Overdue</Badge>
                                        }
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Download size={15} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ── Org Plan Modal ── */}
            <Modal open={!!changingOrg} onClose={() => setChangingOrg(null)}
                title={`Change Plan: ${changingOrg?.name}`} maxWidth="max-w-lg"
                footer={<>
                    <button className="btn-secondary btn" onClick={() => setChangingOrg(null)}>Cancel</button>
                    <button className="btn-primary btn" onClick={updateOrgPlan} disabled={isUpdatingOrg}>
                        {isUpdatingOrg ? <Loader2 size={14} className="animate-spin" /> : 'Confirm Update'}
                    </button>
                </>}>
                <div className="space-y-5">
                    <p className="text-sm text-gray-500">Select a new subscription tier for this organisation. Changes take effect immediately.</p>

                    {/* Plan Cards */}
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(B2B_PLANS).map(([key, plan]) => {
                            const Icon = plan.icon;
                            const isSelected = orgPlanForm.plan === key;
                            const colorBorder: Record<string, string> = { amber: 'border-amber-400', blue: 'border-blue-500', indigo: 'border-indigo-500', purple: 'border-purple-500' };
                            const colorBg: Record<string, string> = { amber: 'bg-amber-50', blue: 'bg-blue-50', indigo: 'bg-indigo-50', purple: 'bg-purple-50' };
                            const colorText: Record<string, string> = { amber: 'text-amber-600', blue: 'text-blue-600', indigo: 'text-indigo-600', purple: 'text-purple-600' };
                            return (
                                <button key={key} onClick={() => setOrgPlanForm(prev => ({ ...prev, plan: key, seats: plan.seats }))}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${isSelected ? `${colorBorder[plan.color]} ${colorBg[plan.color]}` : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>
                                    <div className={`flex items-center gap-2 mb-2 font-bold text-sm ${isSelected ? colorText[plan.color] : 'text-gray-700'}`}>
                                        <Icon size={14} /> {plan.label}
                                    </div>
                                    <div className="text-[11px] text-gray-500 font-mono">{plan.price}</div>
                                    <div className="text-[10px] text-gray-400 mt-1">Up to {plan.seats} seats</div>
                                </button>
                            );
                        })}
                    </div>

                    {orgPlanForm.plan && (
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Custom Seat Limit</label>
                            <input type="number" className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-400 outline-none" value={orgPlanForm.seats}
                                onChange={e => setOrgPlanForm(prev => ({ ...prev, seats: parseInt(e.target.value) }))} />
                            <p className="text-[10px] text-gray-400 mt-1">Override the default seat limit for this tenant.</p>
                        </div>
                    )}
                </div>
            </Modal>

            {/* ── B2C Plan Modal ── */}
            <Modal open={!!changingUser} onClose={() => setChangingUser(null)}
                title={`Manage Subscription: ${changingUser?.email}`} maxWidth="max-w-lg"
                footer={<>
                    <button className="btn-secondary btn" onClick={() => setChangingUser(null)}>Cancel</button>
                    <button className="btn-primary btn" onClick={updateUserPlan} disabled={isUpdatingUser}>
                        {isUpdatingUser ? <Loader2 size={14} className="animate-spin" /> : 'Confirm Update'}
                    </button>
                </>}>
                <div className="space-y-5">
                    <p className="text-sm text-gray-500">Select a new subscription tier for this consumer.</p>

                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(B2C_PLANS).map(([key, plan]) => {
                            const Icon = plan.icon;
                            const isSelected = userPlanForm.plan === key;
                            const colorBorder: Record<string, string> = { gray: 'border-gray-400', slate: 'border-slate-400', amber: 'border-amber-400', purple: 'border-purple-500' };
                            const colorBg: Record<string, string> = { gray: 'bg-gray-100', slate: 'bg-slate-50', amber: 'bg-amber-50', purple: 'bg-purple-50' };
                            const colorText: Record<string, string> = { gray: 'text-gray-700', slate: 'text-slate-600', amber: 'text-amber-600', purple: 'text-purple-600' };
                            return (
                                <button key={key} onClick={() => setUserPlanForm({ plan: key })}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${isSelected ? `${colorBorder[plan.color]} ${colorBg[plan.color]}` : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>
                                    <div className={`flex items-center gap-2 mb-2 font-bold text-sm ${isSelected ? colorText[plan.color] : 'text-gray-700'}`}>
                                        <Icon size={14} /> {plan.label}
                                    </div>
                                    <div className="text-[11px] text-gray-500 font-mono">{plan.price}</div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700 border border-blue-100">
                        Plan changes apply immediately. No proration applied for individual consumer accounts.
                    </div>
                </div>
            </Modal>

            {/* ── Issue Manual Invoice Modal ── */}
            <Modal open={isIssuing} onClose={() => setIsIssuing(false)} title="Issue Manual Invoice" maxWidth="max-w-md"
                footer={<>
                    <button className="btn-secondary btn" onClick={() => setIsIssuing(false)}>Cancel</button>
                    <button className="btn-primary btn" onClick={() => { toast.success('Invoice issued (demo mode)'); setIsIssuing(false); }}>Generate Invoice</button>
                </>}>
                <div className="space-y-4">
                    <p className="text-sm text-gray-500">Create a custom invoice outside of the standard billing cycle.</p>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Select Organisation</label>
                        <select className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            {orgs.map(o => <option key={o._id} value={o._id}>{o.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Amount (₹)</label>
                        <input type="number" className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                        <textarea className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" rows={3} placeholder="e.g. Custom integration setup fee" />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Billing;
