import React, { useState } from 'react';
import { CreditCard, FileText, Download, Building2, TrendingUp, AlertCircle, CheckCircle2, Search, Plus } from 'lucide-react';
import { Modal, Badge } from '../../admin-shared/components/ui';

const INVOICES = [
    { id: 'INV-2026-001', org: 'Infosys Limited', amount: '₹1,59,300', date: 'Mar 1, 2026', status: 'paid', plan: 'Enterprise' },
    { id: 'INV-2026-002', org: 'Wipro Technologies', amount: '₹55,200', date: 'Feb 15, 2026', status: 'paid', plan: 'Growth' },
    { id: 'INV-2026-003', org: 'Apollo Hospitals', amount: '₹95,400', date: 'Feb 1, 2026', status: 'overdue', plan: 'Enterprise' },
    { id: 'INV-2026-004', org: 'Tech Mahindra', amount: '₹42,000', date: 'Jan 20, 2026', status: 'paid', plan: 'Growth' },
];

const Billing = () => {
    const [invoices] = useState(INVOICES);
    const [isIssuing, setIsIssuing] = useState(false);
    const [isChangingPlan, setIsChangingPlan] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Billing & Invoices</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage platform subscriptions, invoicing, and revenue.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsChangingPlan(true)} className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors">
                        <CreditCard className="w-4 h-4" />
                        Change Tenant Plan
                    </button>
                    <button onClick={() => setIsIssuing(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors">
                        <Plus className="w-4 h-4" />
                        Issue Manual Invoice
                    </button>
                </div>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">Total ARR</p>
                        <h3 className="text-2xl font-bold text-gray-900">₹3.5M</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <TrendingUp size={24} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">Active Orgs</p>
                        <h3 className="text-2xl font-bold text-gray-900">4</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Building2 size={24} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">Overdue Invoices</p>
                        <h3 className="text-2xl font-bold text-red-600">1</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                        <AlertCircle size={24} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">Gateway Status</p>
                        <h3 className="text-2xl font-bold text-green-600">Healthy</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                        <CheckCircle2 size={24} />
                    </div>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">Recent Invoices</h3>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search invoices..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-blue-500 transition-all" />
                    </div>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50">
                            <th className="py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice ID</th>
                            <th className="py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Organisation</th>
                            <th className="py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Issued</th>
                            <th className="py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="py-3 px-5 text-xs text-right font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {invoices.map((inv) => (
                            <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-5 font-mono text-sm text-gray-700">{inv.id}</td>
                                <td className="py-4 px-5">
                                    <div className="font-medium text-gray-900 text-sm">{inv.org}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{inv.plan} Plan</div>
                                </td>
                                <td className="py-4 px-5 font-semibold text-gray-800 text-sm">{inv.amount}</td>
                                <td className="py-4 px-5 text-sm text-gray-600">{inv.date}</td>
                                <td className="py-4 px-5">
                                    {inv.status === 'paid' ?
                                        <Badge color="green">Paid</Badge> :
                                        <Badge color="red">Overdue</Badge>
                                    }
                                </td>
                                <td className="py-4 px-5 text-right">
                                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Download size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <Modal open={isIssuing} onClose={() => setIsIssuing(false)} title="Issue Manual Invoice" maxWidth="max-w-md"
                footer={<>
                    <button className="btn-secondary btn" onClick={() => setIsIssuing(false)}>Cancel</button>
                    <button className="btn-primary btn" onClick={() => setIsIssuing(false)}>Generate Invoice</button>
                </>}>
                <div className="space-y-4">
                    <p className="text-sm text-gray-500">Create a one-off custom invoice for a tenant, overriding their standard billing cycle.</p>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Select Tenant</label>
                        <select className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option>Infosys Limited</option>
                            <option>Wipro Technologies</option>
                            <option>Apollo Hospitals</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Amount (₹)</label>
                        <input type="number" className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Line Items / Description</label>
                        <textarea className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" rows={3} placeholder="e.g. Custom API integrations setup fee"></textarea>
                    </div>
                </div>
            </Modal>

            <Modal open={isChangingPlan} onClose={() => setIsChangingPlan(false)} title="Modify Tenant Subscription" maxWidth="max-w-md"
                footer={<>
                    <button className="btn-secondary btn" onClick={() => setIsChangingPlan(false)}>Cancel</button>
                    <button className="btn-primary btn" onClick={() => setIsChangingPlan(false)}>Update Plan</button>
                </>}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Select Tenant</label>
                        <select className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option>Infosys Limited</option>
                            <option>Wipro Technologies</option>
                            <option>Apollo Hospitals</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">New Plan Level</label>
                        <select className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                            <option>Standard (₹25k/mo)</option>
                            <option>Growth (₹55k/mo)</option>
                            <option>Enterprise (₹150k+/mo)</option>
                        </select>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3 text-sm text-amber-800 border border-amber-100 flex gap-2 items-start mt-2">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" />
                        <div>Changing the plan will immediately prorate their current billing cycle and issue a new invoice if upgrading.</div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Billing;
