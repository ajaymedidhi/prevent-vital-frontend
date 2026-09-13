import React, { useState, useEffect } from 'react';
import {
    Calculator, FileText, Download, Activity, FileSpreadsheet,
    CreditCard, Calendar, BarChart3, TrendingUp, Search, RefreshCw, AlertCircle,
    IndianRupee, PieChart, ArrowUpRight, ArrowDownRight, Sparkles
} from 'lucide-react';
import { Badge } from '../../admin-shared/components/ui';
import toast from 'react-hot-toast';
import superAdminApi from '../../admin-shared/services/superAdminApi';

const GSTManagement = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'weekly' | 'monthly' | 'transactions' | 'invoices' | 'refunds'>('dashboard');
    const [loading, setLoading] = useState(true);
    
    // Generate last 6 months for dropdown
    const getRecentMonths = () => {
        const months = [];
        const d = new Date();
        for (let i = 0; i < 6; i++) {
            months.push(d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
            d.setMonth(d.getMonth() - 1);
        }
        return months;
    };
    const [selectedMonth, setSelectedMonth] = useState(getRecentMonths()[0]);
    const recentMonths = getRecentMonths();

    
    // State for data
    const [dashboardData, setDashboardData] = useState<any>({ ytdTaxableRevenue: 0, totalGstCollected: 0, pendingFilings: 0, refundsProcessed: 0 });
    const [weeklyData, setWeeklyData] = useState<any>({ totalInvoices: 0, taxableRevenue: 0, cgst: 0, sgst: 0, igst: 0, refunds: 0, netGst: 0 });
    const [monthlyTransactions, setMonthlyTransactions] = useState<any[]>([]);
    const [transactionsLedger, setTransactionsLedger] = useState<any[]>([]);
    const [invoicesData, setInvoicesData] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, [activeTab, selectedMonth]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'dashboard') {
                const res = await superAdminApi.get('/gst/dashboard');
                setDashboardData(res.data || { ytdTaxableRevenue: 0, totalGstCollected: 0, pendingFilings: 0, refundsProcessed: 0 });
            } else if (activeTab === 'weekly') {
                const res = await superAdminApi.get('/gst/weekly');
                setWeeklyData(res.data || { totalInvoices: 0, taxableRevenue: 0, cgst: 0, sgst: 0, igst: 0, refunds: 0, netGst: 0 });
            } else if (activeTab === 'monthly') {
                const res = await superAdminApi.get(`/gst/monthly?month=${encodeURIComponent(selectedMonth)}`);
                setMonthlyTransactions(res.data || []);
            } else if (activeTab === 'transactions') {
                const res = await superAdminApi.get('/gst/transactions');
                setTransactionsLedger(res.data || []);
            } else if (activeTab === 'invoices') {
                const res = await superAdminApi.get('/gst/invoices');
                setInvoicesData(res.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch GST data", err);
            toast.error("Failed to load data.");
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        let dataToExport: any[] = [];
        let filename = 'export.csv';

        if (activeTab === 'monthly') {
            dataToExport = monthlyTransactions;
            filename = `monthly_gst_${selectedMonth.replace(' ', '_')}.csv`;
        } else if (activeTab === 'transactions') {
            dataToExport = transactionsLedger;
            filename = 'gst_transactions.csv';
        } else if (activeTab === 'invoices') {
            dataToExport = invoicesData.map(inv => ({ ...inv, invoiceUrl: inv.invoiceUrl || 'N/A' }));
            filename = 'invoices.csv';
        } else {
            toast.error(`Export not supported for ${activeTab} tab.`);
            return;
        }

        if (dataToExport.length === 0) {
            toast.error('No data to export.');
            return;
        }

        const headers = Object.keys(dataToExport[0]);
        const csvRows = [];
        
        // Add headers
        csvRows.push(headers.join(','));
        
        // Add data rows
        for (const row of dataToExport) {
            const values = headers.map(header => {
                const val = row[header];
                // Escape quotes and wrap in quotes to handle commas within values
                const escaped = ('' + (val || '')).replace(/"/g, '""');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }
        
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`Exported ${filename}`);
    };

    const [refundsData, setRefundsData] = useState<any[]>([]);

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: Activity },
        { id: 'weekly', label: 'Weekly Report', icon: BarChart3 },
        { id: 'monthly', label: 'Monthly Report', icon: FileSpreadsheet },
        { id: 'transactions', label: 'GST Transactions', icon: Calculator },
        { id: 'invoices', label: 'Invoices', icon: FileText },
        { id: 'refunds', label: 'Refunds / CN', icon: CreditCard },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">GST & Tax</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage taxation, internal monitoring, and month-end GST reporting data.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleExport} className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-3 py-2 rounded-xl text-sm font-medium shadow-sm transition-colors">
                        <Download size={15} /> Export Data (CSV)
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit overflow-x-auto max-w-full hide-scrollbar">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        <tab.icon size={14} />{tab.label}
                    </button>
                ))}
            </div>

            {/* --- DASHBOARD TAB --- */}
            {activeTab === 'dashboard' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'YTD Taxable Revenue', value: `₹${((dashboardData?.ytdTaxableRevenue || 0) / 100000).toFixed(2)}L`, icon: TrendingUp, color: 'blue' },
                            { label: 'Total GST Collected', value: `₹${((dashboardData?.totalGstCollected || 0) / 100000).toFixed(2)}L`, icon: Calculator, color: 'indigo' },
                            { label: 'Pending Filings (Mo)', value: dashboardData?.pendingFilings || 0, icon: AlertCircle, color: 'amber' },
                            { label: 'Refunds Processed', value: `₹${((dashboardData?.refundsProcessed || 0) / 1000).toFixed(0)}k`, icon: CreditCard, color: 'red' },
                        ].map((kpi, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1">{kpi.label}</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{loading ? '-' : kpi.value}</h3>
                                </div>
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-${kpi.color}-50 text-${kpi.color}-600`}>
                                    <kpi.icon size={22} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-[18px] border border-gray-100 p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-2">GST Workflow Status</h3>
                        <p className="text-sm text-gray-500 mb-4">Every payment automatically records a transaction. Use the Weekly report for founder visibility and the Monthly report for your CA/Accounts team.</p>
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="text-center">
                                <div className="text-sm font-bold text-gray-700">Payment</div>
                                <div className="text-xs text-gray-400">Auto-recorded</div>
                            </div>
                            <div className="hidden md:block text-gray-300">→</div>
                            <div className="text-center">
                                <div className="text-sm font-bold text-gray-700">Weekly Report</div>
                                <div className="text-xs text-gray-400">Internal Monitoring</div>
                            </div>
                            <div className="hidden md:block text-gray-300">→</div>
                            <div className="text-center">
                                <div className="text-sm font-bold text-gray-700">Monthly Report</div>
                                <div className="text-xs text-gray-400">Accounts/CA</div>
                            </div>
                            <div className="hidden md:block text-gray-300">→</div>
                            <div className="text-center">
                                <div className="text-sm font-bold text-blue-600">GSTR-1 / 3B</div>
                                <div className="text-xs text-blue-400">GST Portal Filing</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- WEEKLY REPORT TAB --- */}
            {activeTab === 'weekly' && (
                <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-[24px] border border-indigo-100/50 shadow-xl overflow-hidden relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400/10 to-teal-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

                    <div className="relative p-8 border-b border-white/50 backdrop-blur-sm flex flex-wrap gap-4 items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Sparkles className="w-5 h-5 text-indigo-500" />
                                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700">Weekly Performance</h3>
                            </div>
                            <p className="text-sm text-indigo-900/60 font-medium">For founder monitoring and revenue reconciliation. Not for GST filing.</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-indigo-100/50">
                            <Activity className="w-4 h-4 text-indigo-600" />
                            <span className="text-sm font-bold text-indigo-900">Last 7 Days</span>
                        </div>
                    </div>
                    
                    <div className="relative p-8">
                        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                            
                            {/* Left Column: Primary Metrics */}
                            <div className="space-y-4">
                                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                                            <CreditCard className="w-4 h-4 text-emerald-500" />
                                            Taxable Revenue
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="text-4xl font-black text-gray-900">
                                        ₹{(weeklyData?.taxableRevenue || 0).toLocaleString()}
                                    </div>
                                </div>

                                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                                            <FileText className="w-4 h-4 text-blue-500" />
                                            Total Invoices
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="text-4xl font-black text-gray-900">
                                        {weeklyData?.totalInvoices || 0}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Tax Breakdown */}
                            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-1 border border-white shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
                                <div className="bg-white rounded-[20px] p-6 h-full">
                                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                                        <PieChart className="w-5 h-5 text-indigo-600" />
                                        <h4 className="font-bold text-gray-900 text-lg">Tax Breakdown</h4>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                            <span className="text-gray-600 font-medium">CGST</span>
                                            <span className="font-bold text-gray-900">₹{(weeklyData?.cgst || 0).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                            <span className="text-gray-600 font-medium">SGST</span>
                                            <span className="font-bold text-gray-900">₹{(weeklyData?.sgst || 0).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                            <span className="text-gray-600 font-medium">IGST</span>
                                            <span className="font-bold text-gray-900">₹{(weeklyData?.igst || 0).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-red-50/50 border border-red-100/50">
                                            <span className="text-red-600 font-medium flex items-center gap-2">
                                                <ArrowDownRight className="w-4 h-4" />
                                                Refunds
                                            </span>
                                            <span className="font-bold text-red-600">-₹{(weeklyData?.refunds || 0).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-5 border-t border-gray-100">
                                        <div className="flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl text-white shadow-md">
                                            <span className="font-bold text-lg">Net GST</span>
                                            <span className="font-black text-2xl">₹{(weeklyData?.netGst || 0).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MONTHLY REPORT TAB --- */}
            {activeTab === 'monthly' && (
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900">Monthly GST Report</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Source data for Accounts/CA to prepare GSTR-1 & GSTR-3B.</p>
                        </div>
                        <select 
                            value={selectedMonth} 
                            onChange={e => setSelectedMonth(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg px-3 py-2 outline-none"
                        >
                            {recentMonths.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Invoice #</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Type</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">GSTIN</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">State (POS)</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Taxable</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">CGST</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">SGST</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">IGST</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {monthlyTransactions.map((tx, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="py-3 px-5 text-sm font-mono text-gray-700">{tx.id}</td>
                                        <td className="py-3 px-5 text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</td>
                                        <td className="py-3 px-5 text-sm font-medium">
                                            <Badge color={tx.type === 'B2B' ? 'blue' : 'gray'}>{tx.type}</Badge>
                                        </td>
                                        <td className="py-3 px-5 text-xs text-gray-500 font-mono">{tx.gstin}</td>
                                        <td className="py-3 px-5 text-sm text-gray-700">{tx.state}</td>
                                        <td className="py-3 px-5 text-sm text-right font-medium text-gray-900">₹{tx.taxable?.toLocaleString()}</td>
                                        <td className="py-3 px-5 text-sm text-right text-gray-600">{tx.cgst > 0 ? `₹${tx.cgst.toLocaleString()}` : '-'}</td>
                                        <td className="py-3 px-5 text-sm text-right text-gray-600">{tx.sgst > 0 ? `₹${tx.sgst.toLocaleString()}` : '-'}</td>
                                        <td className="py-3 px-5 text-sm text-right text-gray-600">{tx.igst > 0 ? `₹${tx.igst.toLocaleString()}` : '-'}</td>
                                    </tr>
                                ))}
                                {monthlyTransactions.length === 0 && (
                                    <tr><td colSpan={9} className="py-6 text-center text-sm text-gray-500">No transactions found</td></tr>
                                )}
                                {monthlyTransactions.length > 0 && (
                                    <tr className="bg-gray-50 font-bold">
                                        <td colSpan={5} className="py-3 px-5 text-right text-gray-900">Total</td>
                                        <td className="py-3 px-5 text-right text-gray-900">₹{monthlyTransactions.reduce((acc, curr) => acc + (curr.taxable || 0), 0).toLocaleString()}</td>
                                        <td className="py-3 px-5 text-right text-gray-900">₹{monthlyTransactions.reduce((acc, curr) => acc + (curr.cgst || 0), 0).toLocaleString()}</td>
                                        <td className="py-3 px-5 text-right text-gray-900">₹{monthlyTransactions.reduce((acc, curr) => acc + (curr.sgst || 0), 0).toLocaleString()}</td>
                                        <td className="py-3 px-5 text-right text-gray-900">₹{monthlyTransactions.reduce((acc, curr) => acc + (curr.igst || 0), 0).toLocaleString()}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- TRANSACTIONS TAB --- */}
            {activeTab === 'transactions' && (
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900">GST Transactions Ledger</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Source of truth for all recorded GST transactions.</p>
                        </div>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input placeholder="Search transactions..." className="pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white focus:border-blue-500 transition-all" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Invoice #</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Payment ID</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Type</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Value</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Taxable</th>
                                    <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total GST</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {transactionsLedger.map((tx, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="py-3.5 px-5 font-mono text-sm text-gray-700">{tx.id}</td>
                                        <td className="py-3.5 px-5 font-mono text-xs text-gray-400">{tx.paymentId}</td>
                                        <td className="py-3.5 px-5"><Badge color={tx.type === 'B2B' ? 'blue' : 'gray'}>{tx.type}</Badge></td>
                                        <td className="py-3.5 px-5 text-sm font-semibold">₹{(tx.totalValue || 0).toLocaleString()}</td>
                                        <td className="py-3.5 px-5 text-sm text-gray-600">₹{(tx.taxable || 0).toLocaleString()}</td>
                                        <td className="py-3.5 px-5 text-sm text-blue-600 font-medium">₹{(tx.totalGst || 0).toLocaleString()}</td>
                                    </tr>
                                ))}
                                {transactionsLedger.length === 0 && (
                                    <tr><td colSpan={6} className="py-6 text-center text-sm text-gray-500">No transactions found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- INVOICES TAB --- */}
            {activeTab === 'invoices' && (
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between">
                        <h3 className="font-bold text-gray-900">Generated Invoices</h3>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Invoice #</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">GST Portion</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="py-3 px-5 text-right text-[10px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {invoicesData.map(inv => (
                                <tr key={inv.id} className="hover:bg-gray-50/60 transition-colors">
                                    <td className="py-4 px-5 font-mono text-sm text-gray-700">{inv.id}</td>
                                    <td className="py-4 px-5 text-sm font-medium text-gray-900">{inv.customer}</td>
                                    <td className="py-4 px-5 font-semibold text-gray-800 text-sm">₹{(inv.amount || 0).toLocaleString()}</td>
                                    <td className="py-4 px-5 text-sm text-gray-500">₹{(inv.gst || 0).toLocaleString()}</td>
                                    <td className="py-4 px-5 text-sm text-gray-500">{new Date(inv.date).toLocaleDateString()}</td>
                                    <td className="py-4 px-5 text-right">
                                        {inv.invoiceUrl ? (
                                            <a href={inv.invoiceUrl} target="_blank" rel="noopener noreferrer" className="inline-block p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Download size={15} />
                                            </a>
                                        ) : (
                                            <span className="text-xs text-gray-400">No PDF</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {invoicesData.length === 0 && (
                                <tr><td colSpan={6} className="py-6 text-center text-sm text-gray-500">No invoices found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- REFUNDS TAB --- */}
            {activeTab === 'refunds' && (
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-wrap gap-3 items-center justify-between">
                        <h3 className="font-bold text-gray-900">Refunds & Credit Notes</h3>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Credit Note #</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Original Invoice</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Refund Amount</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">GST Adj.</th>
                                <th className="py-3 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {refundsData.map(ref => (
                                <tr key={ref.id} className="hover:bg-gray-50/60 transition-colors">
                                    <td className="py-4 px-5 font-mono text-sm text-gray-700">{ref.id}</td>
                                    <td className="py-4 px-5 font-mono text-xs text-gray-400">{ref.invoiceRef}</td>
                                    <td className="py-4 px-5 text-sm font-medium text-gray-900">{ref.customer}</td>
                                    <td className="py-4 px-5 font-semibold text-red-600 text-sm">-₹{ref.amount.toLocaleString()}</td>
                                    <td className="py-4 px-5 text-sm text-gray-500">-₹{ref.gstRefund.toLocaleString()}</td>
                                    <td className="py-4 px-5 text-sm text-gray-500">{ref.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GSTManagement;
