import React from 'react';
import { FileText, Download, Filter, Eye, Calendar, MoreVertical } from 'lucide-react';

const mockReports = [
    { id: 'REP-1029', name: 'Monthly User Engagement Matrix', type: 'Analytics', date: 'Mar 1, 2026', size: '2.4 MB', status: 'Ready' },
    { id: 'REP-1028', name: 'Q1 Revenue Consolidation', type: 'Financial', date: 'Feb 28, 2026', size: '4.1 MB', status: 'Ready' },
    { id: 'REP-1027', name: 'System Security Audit - Feb', type: 'Audit', date: 'Feb 26, 2026', size: '1.2 MB', status: 'Processing' },
    { id: 'REP-1026', name: 'B2B Tenant Growth YoY', type: 'Analytics', date: 'Feb 15, 2026', size: '3.8 MB', status: 'Ready' },
    { id: 'REP-1025', name: 'High-Risk Consumer Cohort Analysis', type: 'Clinical', date: 'Feb 10, 2026', size: '5.6 MB', status: 'Failed' },
];

const Reports = () => {
    return (
        <div className="space-y-6 lg:max-w-[1200px]">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">System Reports</h2>
                    <p className="text-gray-500 mt-1">Generate and export platform analytics and user reports.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-gray-50 transition">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 transition">
                        <FileText size={16} /> Create Report
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Recent Generated Reports</h3>
                    <div className="flex gap-2">
                        <input className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64" placeholder="Search reports..." />
                    </div>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Report Name</th>
                            <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Type</th>
                            <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Generated On</th>
                            <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Size</th>
                            <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">Status</th>
                            <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockReports.map((report, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors group border-b border-gray-50 last:border-0">
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg 
                                            ${report.type === 'Analytics' ? 'bg-blue-50 text-blue-600' : ''}
                                            ${report.type === 'Financial' ? 'bg-green-50 text-green-600' : ''}
                                            ${report.type === 'Audit' ? 'bg-purple-50 text-purple-600' : ''}
                                            ${report.type === 'Clinical' ? 'bg-rose-50 text-rose-600' : ''}
                                        `}>
                                            <FileText size={18} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">{report.name}</p>
                                            <p className="text-xs text-gray-500">{report.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="text-sm text-gray-600 font-medium">{report.type}</span>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                        <Calendar size={14} className="text-gray-400" />
                                        {report.date}
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="text-sm text-gray-500">{report.size}</span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold
                                        ${report.status === 'Ready' ? 'bg-green-100 text-green-700' : ''}
                                        ${report.status === 'Processing' ? 'bg-amber-100 text-amber-700' : ''}
                                        ${report.status === 'Failed' ? 'bg-red-100 text-red-700' : ''}
                                    `}>
                                        {report.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View">
                                            <Eye size={16} />
                                        </button>
                                        <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition" title="Download">
                                            <Download size={16} />
                                        </button>
                                        <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition" title="More Options">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;
