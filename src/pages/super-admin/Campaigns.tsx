import React, { useState } from 'react';
import { Megaphone, Plus, Search, Filter, MoreVertical, Play, Pause, Send } from 'lucide-react';
import { Modal } from '../../admin-shared/components/ui';

const Campaigns = () => {
    const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
    const [campaigns, setCampaigns] = useState([
        { id: 1, name: 'Q3 Onboarding Nudge', type: 'Email', status: 'Active', target: 'Inactive Users < 30 Days', sent: '12,045', conversion: '18.2%' },
        { id: 2, name: 'Cardio Pro Launch', type: 'Push', status: 'Completed', target: 'All B2C Users', sent: '45,210', conversion: '24.5%' },
        { id: 3, name: 'Corporate Wellness Renewal', type: 'Email', status: 'Draft', target: 'B2B Admins (Expiring)', sent: '-', conversion: '-' },
        { id: 4, name: 'Weekly Activity Summary', type: 'In-App', status: 'Active', target: 'All Users', sent: '89,400', conversion: '42.1%' }
    ]);
    const [newCampaign, setNewCampaign] = useState({ name: '', targetAudience: 'all_b2c', type: 'email', message: '' });

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Campaigns Hub</h2>
                    <p className="text-sm text-gray-500 mt-1">Orchestrate platform-wide and targeted health engagements.</p>
                </div>
                <button
                    onClick={() => setIsCreatingCampaign(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Create Campaign
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">Total Campaigns</p>
                        <h3 className="text-3xl font-bold text-gray-900">24</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Megaphone size={24} />
                    </div>
                </div>
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">Active Reach</p>
                        <h3 className="text-3xl font-bold text-gray-900">142k</h3>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <Send size={24} />
                    </div>
                </div>
                <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">Avg. Conversion</p>
                        <h3 className="text-3xl font-bold text-gray-900">21.4%</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                        <Activity size={24} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input type="text" placeholder="Search campaigns..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 w-full sm:w-auto">
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-800 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-500">Campaign Name</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-500">Status</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-500">Audience</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-500">Sent</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-500">Conv. Rate</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {campaigns.map(camp => (
                                <tr key={camp.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">{camp.name}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{camp.type}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider 
                                            ${camp.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                camp.status === 'Draft' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'}`}>
                                            {camp.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{camp.target}</td>
                                    <td className="px-6 py-4 font-medium">{camp.sent}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-800">{camp.conversion}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal open={isCreatingCampaign} onClose={() => setIsCreatingCampaign(false)} title="Create New Campaign" maxWidth="max-w-xl"
                footer={<>
                    <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors" onClick={() => setIsCreatingCampaign(false)}>Cancel</button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors flex items-center gap-2"
                        onClick={() => {
                            setCampaigns([{ id: Date.now(), ...newCampaign, status: 'Active', target: newCampaign.targetAudience.replace('_', ' ').toUpperCase(), sent: '0', conversion: '0%' }, ...campaigns]);
                            setIsCreatingCampaign(false);
                            setNewCampaign({ name: '', targetAudience: 'all_b2c', type: 'email', message: '' });
                        }}
                    >
                        <Play size={16} fill="currentColor" /> Launch Campaign
                    </button>
                </>}>
                <div className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Campaign Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="e.g., Monthly Activity Nudge"
                            value={newCampaign.name}
                            onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Target Audience</label>
                            <select
                                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all"
                                value={newCampaign.targetAudience}
                                onChange={(e) => setNewCampaign({ ...newCampaign, targetAudience: e.target.value })}
                            >
                                <option value="all_users">All Platform Users</option>
                                <option value="all_b2c">All B2C Consumers</option>
                                <option value="all_b2b">All B2B Employees</option>
                                <option value="inactive_30d">Inactive (&gt;30 Days)</option>
                                <option value="hr_admins">Corporate HR Admins</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Delivery Channel</label>
                            <select
                                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all"
                                value={newCampaign.type}
                                onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value })}
                            >
                                <option value="email">Email Blast</option>
                                <option value="push">Push Notification</option>
                                <option value="in-app">In-App Modal</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Message Content / Payload</label>
                        <textarea
                            className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px] resize-y transition-all"
                            placeholder="Draft your compelling health message here..."
                            value={newCampaign.message}
                            onChange={(e) => setNewCampaign({ ...newCampaign, message: e.target.value })}
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-2 flex justify-between">
                            <span>Supports Markdown syntax</span>
                            <span>{newCampaign.message.length} chars</span>
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

// Activity icon mock since it's used in Campaigns but not imported initially
const Activity = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

export default Campaigns;
