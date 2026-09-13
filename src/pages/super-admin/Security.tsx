import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, AlertTriangle, Key, Search, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import superAdminApi from '../../admin-shared/services/superAdminApi';
import toast from 'react-hot-toast';

const Security = () => {
    const [loading, setLoading] = useState(true);
    const [auditLogs, setAuditLogs] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [policies, setPolicies] = useState([
        { id: 1, name: 'Enforce MFA for all Admins', active: true, desc: 'Requires multi-factor authentication for Super, Platform, and Corporate Admins.' },
        { id: 2, name: 'Strict Session Timeouts', active: true, desc: 'Automatically logs out idle users after 15 minutes of inactivity.' },
        { id: 3, name: 'Restrict Concurrent Logins', active: false, desc: 'Prevents the same user account from being logged in on multiple devices simultaneously.' },
        { id: 4, name: 'Enforce Complex Passwords', active: true, desc: 'Requires minimum 12 chars, uppercase, lowercase, numbers, and symbols.' },
    ]);

    useEffect(() => {
        const fetchSecurityData = async () => {
            try {
                const [logsRes, configRes] = await Promise.all([
                    superAdminApi.get(`/audit-logs?page=${page}&limit=10`),
                    superAdminApi.get('/config/security-policies').catch(() => null) // Ignore 404 if not seeded
                ]);

                if (logsRes.data?.logs) {
                    setAuditLogs(logsRes.data.logs);
                    setTotalPages(logsRes.totalPages || 1);
                }

                if (configRes?.data?.config?.value) {
                    setPolicies(configRes.data.config.value);
                }
            } catch (err) {
                console.error("Error fetching security data:", err);
                toast.error("Failed to load security commands");
            } finally {
                setLoading(false);
            }
        };

        fetchSecurityData();
    }, [page]);

    const togglePolicy = async (id: number) => {
        const updatedPolicies = policies.map(p => p.id === id ? { ...p, active: !p.active } : p);
        setPolicies(updatedPolicies); // Optimistic UI update

        try {
            await superAdminApi.patch('/config', {
                key: 'security-policies',
                value: updatedPolicies
            });
            toast.success("Security policy updated");
        } catch (err) {
            toast.error("Failed to update policy");
            // Revert on fail
            setPolicies(policies);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-12">
            {/* Header Section with Glassmorphism */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-3xl p-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 opacity-20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
                            <Shield className="w-4 h-4 text-blue-300" />
                            <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider">System Security</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Security Command Center</h2>
                        <p className="text-blue-200 font-medium max-w-xl">Configure global security policies, monitor audit logs, and manage API gateways across all tenants.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg backdrop-blur-sm transition-all hover:-translate-y-0.5">
                            <FileText className="w-4 h-4" />
                            Export Audit Log
                        </button>
                        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all hover:-translate-y-0.5">
                            <AlertTriangle className="w-4 h-4" />
                            Lockdown Platform
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Global Policies Toggle */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 transition-opacity group-hover:opacity-100"></div>
                    
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-white">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Global Security Policies</h3>
                            <p className="text-xs font-medium text-gray-500 mt-1">Changes apply to all tenants and users instantly.</p>
                        </div>
                    </div>
                    <div className="space-y-4 relative">
                        {policies.map(policy => (
                            <div key={policy.id} className={`flex justify-between items-start gap-4 p-5 rounded-2xl border transition-all duration-300 ${policy.active ? 'bg-blue-50/50 border-blue-100 shadow-[0_4px_12px_rgb(59,130,246,0.05)]' : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50'}`}>
                                <div>
                                    <h4 className={`font-bold text-sm mb-1 ${policy.active ? 'text-blue-900' : 'text-gray-800'}`}>{policy.name}</h4>
                                    <p className={`text-xs leading-relaxed max-w-sm ${policy.active ? 'text-blue-700/70' : 'text-gray-500'}`}>{policy.desc}</p>
                                </div>
                                <button
                                    onClick={() => togglePolicy(policy.id)}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${policy.active ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20' : 'bg-gray-200'}`}
                                >
                                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out ${policy.active ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* API & Key Management */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 transition-opacity group-hover:opacity-100"></div>

                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-sm border border-white">
                            <Key className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">API Gateway & Keys</h3>
                            <p className="text-xs font-medium text-gray-500 mt-1">Manage external integration authentication.</p>
                        </div>
                    </div>

                    <div className="space-y-5 flex-1 relative">
                        <div className="border border-gray-100 bg-gray-50/50 rounded-2xl p-5 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                    <Lock className="w-3.5 h-3.5" /> Production API Key
                                </span>
                                <span className="text-[10px] uppercase font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full tracking-wider shadow-sm">Active</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="password" value="sk_live_94f83a..." readOnly className="flex-1 text-sm bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-600 font-mono outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" />
                                <button className="bg-white hover:bg-gray-50 text-gray-600 p-2.5 rounded-xl transition-all border border-gray-200 shadow-sm hover:shadow active:scale-95"><Eye size={18} /></button>
                            </div>
                        </div>
                        <div className="border border-gray-100 bg-gray-50/50 rounded-2xl p-5 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                    <Shield className="w-3.5 h-3.5" /> Webhook Secret
                                </span>
                                <span className="text-[10px] uppercase font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full tracking-wider shadow-sm">Active</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="password" value="whsec_884j..." readOnly className="flex-1 text-sm bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-600 font-mono outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" />
                                <button className="bg-white hover:bg-gray-50 text-gray-600 p-2.5 rounded-xl transition-all border border-gray-200 shadow-sm hover:shadow active:scale-95"><Eye size={18} /></button>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-6 py-3 border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-xl text-sm font-bold hover:from-indigo-100 hover:to-blue-100 transition-all shadow-sm relative z-10">
                        Rotate Keys
                    </button>
                </div>
            </div>

            {/* Audit Log Table */}
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Recent Audit Logs</h3>
                        <p className="text-xs font-medium text-gray-500 mt-1">Platform-wide historical tracking of administrative actions.</p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input type="text" placeholder="Search events..." className="w-72 pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-800 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Timestamp</th>
                                <th className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Actor</th>
                                <th className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Event</th>
                                <th className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Resource</th>
                                <th className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">IP Address</th>
                                <th className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {auditLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">No audit logs found.</td>
                                </tr>
                            ) : auditLogs.map((log, i) => (
                                <tr key={log._id || i} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-3 text-xs whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                                    <td className="px-6 py-3 font-medium text-gray-800">{log.user?.email || 'System'}</td>
                                    <td className="px-6 py-3"><span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{log.action || log.event}</span></td>
                                    <td className="px-6 py-3 text-gray-500">{log.resource}</td>
                                    <td className="px-6 py-3 font-mono text-xs">{log.ip}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-1.5">
                                            {(log.status === 'Success' || !log.status) ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                                            <span className={`text-xs font-medium ${(log.status === 'Success' || !log.status) ? 'text-green-700' : 'text-red-600'}`}>{log.status || 'Success'}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {auditLogs.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-xs text-gray-500 font-medium">
                            Showing page <span className="text-gray-900 font-bold">{page}</span> of <span className="text-gray-900 font-bold">{totalPages}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-white hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-white hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Security;
