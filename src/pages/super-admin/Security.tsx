import React, { useState } from 'react';
import { Shield, Lock, Eye, AlertTriangle, Key, Search, FileText, CheckCircle2 } from 'lucide-react';

const Security = () => {
    const [policies, setPolicies] = useState([
        { id: 1, name: 'Enforce MFA for all Admins', active: true, desc: 'Requires multi-factor authentication for Super, Platform, and Corporate Admins.' },
        { id: 2, name: 'Strict Session Timeouts', active: true, desc: 'Automatically logs out idle users after 15 minutes of inactivity.' },
        { id: 3, name: 'Restrict Concurrent Logins', active: false, desc: 'Prevents the same user account from being logged in on multiple devices simultaneously.' },
        { id: 4, name: 'Enforce Complex Passwords', active: true, desc: 'Requires minimum 12 chars, uppercase, lowercase, numbers, and symbols.' },
    ]);

    const togglePolicy = (id: number) => {
        setPolicies(policies.map(p => p.id === id ? { ...p, active: !p.active } : p));
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
                            {[
                                { date: '2023-10-27 14:32:01', actor: 'superadmin@gruentzig.ai', event: 'toggle_policy', resource: 'Policy: MFA', ip: '192.168.1.45', status: 'Success' },
                                { date: '2023-10-27 10:15:22', actor: 'john.doe@techcorp.com', event: 'login_attempt', resource: 'Auth: Login App', ip: '203.0.113.42', status: 'Failed: Invalid Password' },
                                { date: '2023-10-26 16:45:10', actor: 'system', event: 'schema_migration', resource: 'DB: Users', ip: 'internal', status: 'Success' },
                                { date: '2023-10-26 09:12:33', actor: 'hr@infosys.com', event: 'create_user', resource: 'User: jane.smith@infosys.com', ip: '104.28.19.11', status: 'Success' },
                                { date: '2023-10-25 22:01:00', actor: 'superadmin@gruentzig.ai', event: 'export_data', resource: 'Report: Billing Oct', ip: '192.168.1.45', status: 'Success' }
                            ].map((log, i) => (
                                <tr key={i} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-3 text-xs whitespace-nowrap">{log.date}</td>
                                    <td className="px-6 py-3 font-medium text-gray-800">{log.actor}</td>
                                    <td className="px-6 py-3"><span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{log.event}</span></td>
                                    <td className="px-6 py-3 text-gray-500">{log.resource}</td>
                                    <td className="px-6 py-3 font-mono text-xs">{log.ip}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-1.5">
                                            {log.status === 'Success' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                                            <span className={`text-xs font-medium ${log.status === 'Success' ? 'text-green-700' : 'text-red-600'}`}>{log.status}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Security;
