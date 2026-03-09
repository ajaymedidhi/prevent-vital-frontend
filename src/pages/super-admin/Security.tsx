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
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Security Command Center</h2>
                    <p className="text-sm text-gray-500 mt-1">Configure global security policies and monitor audit logs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors">
                        <FileText className="w-4 h-4" />
                        Export Audit Log
                    </button>
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors">
                        <AlertTriangle className="w-4 h-4" />
                        Lockdown Platform
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Global Policies Toggle */}
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Global Security Policies</h3>
                            <p className="text-xs text-gray-500">Changes apply to all tenants and users instantly.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {policies.map(policy => (
                            <div key={policy.id} className="flex justify-between items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-gray-50/80 transition-colors">
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm mb-1">{policy.name}</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed max-w-sm">{policy.desc}</p>
                                </div>
                                <button
                                    onClick={() => togglePolicy(policy.id)}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${policy.active ? 'bg-blue-600' : 'bg-gray-200'}`}
                                >
                                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${policy.active ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* API & Key Management */}
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                            <Key className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">API Gateway & Keys</h3>
                            <p className="text-xs text-gray-500">Manage external integration authentication.</p>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1">
                        <div className="border border-gray-200 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Production API Key</span>
                                <span className="text-[10px] uppercase font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full tracking-wider">Active</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="password" value="sk_live_94f83a..." readOnly className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-500 outline-none" />
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors border border-gray-200"><Eye size={18} /></button>
                            </div>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Webhook Signing Secret</span>
                                <span className="text-[10px] uppercase font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full tracking-wider">Active</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="password" value="whsec_884j..." readOnly className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-500 outline-none" />
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors border border-gray-200"><Eye size={18} /></button>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-4 py-2 border border-blue-200 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors">
                        Rotate Keys
                    </button>
                </div>
            </div>

            {/* Audit Log Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Recent Audit Logs</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <input type="text" placeholder="Search events..." className="w-full pl-8 pr-4 py-1.5 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
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
