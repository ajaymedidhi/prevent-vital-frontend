import React from 'react';
import { HeadphonesIcon, MessageCircle, Clock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

const mockTickets = [
    { id: 'TIC-9042', subject: 'Login issue with mobile app', user: 'j.smith@example.com', priority: 'High', status: 'Open', time: '10 mins ago' },
    { id: 'TIC-9041', subject: 'How to update billing info?', user: 'alex.wong@acme.inc', priority: 'Low', status: 'Pending', time: '2 hours ago' },
    { id: 'TIC-9040', subject: 'Missing health metric data', user: 'sarah.jones@wellness.org', priority: 'Medium', status: 'Open', time: '5 hours ago' },
    { id: 'TIC-9039', subject: 'Corporate dashboard access', user: 'hr@infosys.com', priority: 'High', status: 'Resolved', time: '1 day ago' },
];

const Support = () => {
    return (
        <div className="space-y-6 lg:max-w-[1200px]">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Support Inbox</h2>
                    <p className="text-gray-500 mt-1">Review and resolve customer and corporate support inquiries.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 transition">
                    <MessageCircle size={16} /> Compose Message
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Folders</h3>
                        <div className="space-y-1">
                            <button className="w-full flex items-center justify-between px-3 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold text-sm transition">
                                <span className="flex items-center gap-2"><MessageCircle size={16} /> Unassigned</span>
                                <span className="bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full">12</span>
                            </button>
                            <button className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium text-sm transition">
                                <span className="flex items-center gap-2"><Clock size={16} /> Open & Pending</span>
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">5</span>
                            </button>
                            <button className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium text-sm transition">
                                <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Resolved</span>
                            </button>
                        </div>

                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-3">Priority</h3>
                        <div className="space-y-1">
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm transition">
                                <AlertTriangle size={16} /> High Priority
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div className="flex gap-2">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 mt-0.5" />
                                <span className="text-sm font-semibold text-gray-700">Select All</span>
                            </div>
                            <input className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64 bg-white" placeholder="Search tickets..." />
                        </div>

                        <div className="divide-y divide-gray-50">
                            {mockTickets.map((ticket, i) => (
                                <div key={i} className="p-4 flex gap-4 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                                    <div className="pt-1">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-gray-900 truncate">{ticket.subject}</span>
                                                <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full
                                                    ${ticket.priority === 'High' ? 'bg-red-100 text-red-700' : ''}
                                                    ${ticket.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : ''}
                                                    ${ticket.priority === 'Low' ? 'bg-green-100 text-green-700' : ''}
                                                `}>{ticket.priority}</span>
                                            </div>
                                            <span className="text-xs text-gray-400 whitespace-nowrap">{ticket.time}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-3">
                                            <span>{ticket.id}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className="truncate">{ticket.user}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className={`font-semibold
                                                ${ticket.status === 'Open' ? 'text-blue-600' : ''}
                                                ${ticket.status === 'Pending' ? 'text-amber-600' : ''}
                                                ${ticket.status === 'Resolved' ? 'text-emerald-600' : ''}
                                            `}>{ticket.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-100 transition">
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
