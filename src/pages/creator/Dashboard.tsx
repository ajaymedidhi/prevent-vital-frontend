import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Video, ThumbsUp, Eye, FileText, Plus, Users, Clock, CalendarDays, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CreatorDashboard = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const [analytics, setAnalytics] = useState<any>({});
    const [content, setContent] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const mockContent = [
        { _id: '1', title: 'Beginner Yoga Sequence', type: 'video', status: 'Published', engagement: { views: 1240, likes: 320 }, createdAt: '2026-03-01T10:00:00Z' },
        { _id: '2', title: 'Cardio Core Burner', type: 'video', status: 'Pending Approval', engagement: { views: 0, likes: 0 }, createdAt: '2026-03-05T14:30:00Z' },
        { _id: '3', title: 'Nutrition 101 Guide', type: 'article', status: 'Draft', engagement: { views: 0, likes: 0 }, createdAt: '2026-03-07T09:15:00Z' }
    ];

    const upcomingSessions = [
        { id: 'SESS-001', title: 'Live Q&A: Intermittent Fasting', date: 'Today, 2:00 PM', participants: 45 },
        { id: 'SESS-002', title: 'Advanced HIIT Class', date: 'Tomorrow, 9:00 AM', participants: 120 }
    ];

    useEffect(() => {
        // Mock loading delay for visual
        setTimeout(() => {
            setAnalytics({ totalViews: 14500, totalLikes: 3200, totalContent: 12, activeStudents: 850 });
            setContent(mockContent);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-6 lg:max-w-[1200px]">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Creator Studio</h2>
                    <p className="text-gray-500 mt-1">Manage your programs, track engagement, and connect with your audience.</p>
                </div>
                <div className="flex gap-3">
                    <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white shadow-md shadow-pink-900/20 border-0 rounded-xl">
                        <Plus size={18} className="mr-2" /> CREATE NEW PROGRAM
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 blur-2xl pointer-events-none"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Eye className="w-6 h-6" /></div>
                        <span className="text-green-600 font-bold text-xs bg-green-50 px-2.5 py-1 rounded-full">+12%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium relative z-10">Total Views</h3>
                    <div className="mt-2 relative z-10">
                        <p className="text-3xl font-bold text-gray-900">{(analytics.totalViews / 1000).toFixed(1)}k</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-50 rounded-full opacity-50 blur-2xl pointer-events-none"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-pink-50 text-pink-600 rounded-xl"><ThumbsUp className="w-6 h-6" /></div>
                        <span className="text-green-600 font-bold text-xs bg-green-50 px-2.5 py-1 rounded-full">+5%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium relative z-10">Total Likes</h3>
                    <div className="mt-2 relative z-10">
                        <p className="text-3xl font-bold text-gray-900">{(analytics.totalLikes / 1000).toFixed(1)}k</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full opacity-50 blur-2xl pointer-events-none"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Users className="w-6 h-6" /></div>
                        <span className="text-purple-600 font-bold text-xs bg-purple-50 px-2.5 py-1 rounded-full shrink-0">ACTIVE</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium relative z-10">Active Students</h3>
                    <div className="mt-2 relative z-10">
                        <p className="text-3xl font-bold text-gray-900">{analytics.activeStudents}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full opacity-50 blur-2xl pointer-events-none"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><FileText className="w-6 h-6" /></div>
                        <span className="text-gray-600 font-bold text-xs bg-gray-100 px-2.5 py-1 rounded-full">TOTAL</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium relative z-10">Content Pieces</h3>
                    <div className="mt-2 relative z-10">
                        <p className="text-3xl font-bold text-gray-900">{analytics.totalContent}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Content List & Approval Flow */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden xl:col-span-2 flex flex-col">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">Recent Content Status</h3>
                            <p className="text-sm text-gray-500 mt-1">Track your program approvals and engagement.</p>
                        </div>
                        <button className="text-pink-600 text-sm font-semibold hover:underline">View Library</button>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Program Title</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {content.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{item.title}</div>
                                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                                <Clock size={12} /> Last edited {new Date(item.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium capitalize border
                                                ${item.type === 'video' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}
                                            `}>
                                                {item.type === 'video' ? <Video size={12} /> : <FileText size={12} />}
                                                {item.type}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide border
                                                ${item.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                                                ${item.status === 'Pending Approval' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                                ${item.status === 'Draft' ? 'bg-gray-100 text-gray-600 border-gray-200' : ''}
                                            `}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="text-gray-400 hover:text-pink-600 p-1.5 rounded-lg hover:bg-pink-50 transition" title="Edit">
                                                    <span className="text-xs font-bold">Edit</span>
                                                </button>
                                                {item.status === 'Draft' && (
                                                    <button className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition" title="Submit">
                                                        <span className="text-xs font-bold">Submit</span>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upcoming Live Sessions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                            <CalendarDays className="text-pink-500" size={20} /> Live Sessions
                        </h3>
                        <button className="text-gray-400 hover:text-pink-600 transition"><Plus size={18} /></button>
                    </div>
                    <div className="flex-1 space-y-4">
                        {upcomingSessions.map((session, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-pink-200 hover:shadow-sm transition group cursor-pointer bg-white">
                                <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 group-hover:bg-pink-100 transition">
                                    <Video size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{session.title}</h4>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                        <span className="flex items-center gap-1 font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md"><Clock size={12} /> {session.date}</span>
                                        <span className="flex items-center gap-1"><Users size={12} /> {session.participants} joiners</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition flex items-center justify-center gap-2">
                        Schedule Module <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatorDashboard;
