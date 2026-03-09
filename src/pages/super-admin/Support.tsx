import React, { useState } from 'react';
import { HeadphonesIcon, MessageSquare, Search, Filter, Mail, Phone, Calendar as CalendarIcon, Clock, ChevronRight, FileText } from 'lucide-react';

const Support = () => {
    const [tickets] = useState([
        { id: 'TKT-8954', subject: 'Billing cycle prorating issue', tenant: 'TechCorp Solutions', user: 'admin@techcorp.com', priority: 'High', status: 'Open', lastUpdated: '10 mins ago' },
        { id: 'TKT-8953', subject: 'Need help importing employees', tenant: 'Infosys Global', user: 'hr@infosys.com', priority: 'Medium', status: 'Pending', lastUpdated: '2 hours ago' },
        { id: 'TKT-8950', subject: 'Unable to view Cardio Programme', tenant: 'B2C User', user: 'sarah.m@gmail.com', priority: 'Low', status: 'Open', lastUpdated: '4 hours ago' },
        { id: 'TKT-8942', subject: 'API Webhook failing consistently', tenant: 'Acme Health', user: 'dev@acme.health', priority: 'Critical', status: 'Resolved', lastUpdated: '1 day ago' }
    ]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10 h-[calc(100vh-100px)] flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Global Support Inbox</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage tenant support tickets and platform escalations.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors">
                        <Phone className="w-4 h-4" /> Schedule Call
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors">
                        <MessageSquare className="w-4 h-4" /> Compose Message
                    </button>
                </div>
            </div>

            {/* Split layout: Inbox List vs Detail View */}
            <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">

                {/* Left: Ticket List */}
                <div className="w-full lg:w-1/3 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100 shrink-0 space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input type="text" placeholder="Search tickets..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50">
                                <Filter size={14} /> All Open
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50">
                                My Queue
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto w-full">
                        <div className="divide-y divide-gray-50">
                            {tickets.map(tkt => (
                                <button key={tkt.id} className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${tkt.id === 'TKT-8954' ? 'bg-blue-50/50 border-l-4 border-blue-600' : 'border-l-4 border-transparent'}`}>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-gray-500">{tkt.id}</span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {tkt.lastUpdated}</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{tkt.subject}</h4>
                                    <div className="flex justify-between items-center mt-2 text-xs">
                                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium truncate max-w-[120px]">{tkt.tenant}</span>
                                        <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wide text-[10px] 
                                            ${tkt.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                                tkt.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                                    tkt.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}
                                        `}>
                                            {tkt.priority}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Ticket Detail */}
                <div className="hidden lg:flex flex-1 flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 shrink-0">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">Billing cycle prorating issue</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span className="flex items-center gap-1.5"><Mail size={16} /> admin@techcorp.com</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="flex items-center gap-1.5"><CalendarIcon size={16} /> Opened Oct 27, 2023</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-wider">Open</span>
                            </div>
                        </div>
                        <div className="flex gap-4 border-t border-gray-100 pt-4 mt-2">
                            <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Tenant Details</span>
                                <span className="text-sm font-semibold text-gray-800">TechCorp Solutions</span>
                                <span className="block text-xs text-blue-600 hover:underline cursor-pointer">View CRM Profile</span>
                            </div>
                            <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Current Plan</span>
                                <span className="text-sm font-semibold text-gray-800">Gold Enterprise</span>
                                <span className="block text-xs text-gray-500">$999/mo</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/50">
                        {/* Conversation Thread */}
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">TC</div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100  rounded-tl-sm w-full">
                                <span className="text-xs font-bold text-gray-500 block mb-2">TechCorp Admin - 10:14 AM</span>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Hello, we recently upgraded from the Silver to the Gold plan mid-month. However, our latest invoice seems to have charged us the full amount for Gold without prorating the remaining days of the Silver plan we had already paid for.
                                    <br /><br />
                                    Could you please review invoice #INV-2023-149 and adjust accordingly?
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 flex-row-reverse">
                            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shrink-0">SA</div>
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 rounded-tr-sm w-full max-w-2xl">
                                <span className="text-xs font-bold text-blue-600 block mb-2">Super Admin (You) - Just now</span>
                                <p className="text-sm text-gray-800 leading-relaxed italic text-gray-500">
                                    Reply drafted...
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                        <textarea
                            className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none mb-3"
                            rows={3}
                            placeholder="Type your response to TechCorp Solutions..."
                        ></textarea>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><Mail size={18} /></button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><FileText size={18} /></button>
                            </div>
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors">
                                Send Reply <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
