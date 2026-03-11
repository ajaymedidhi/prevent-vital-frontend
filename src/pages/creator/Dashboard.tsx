import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
    Video, ThumbsUp, Eye, FileText, Plus, Users,
    Clock, CalendarDays, ArrowRight, MessageCircle, AlertCircle,
    CheckCircle2, Loader2, Send, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import creatorApi from '../../admin-shared/services/creatorApi';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from '../../admin-shared/components/ui';

const CreatorDashboard = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState<any>({
        totalViews: 0,
        totalLikes: 0,
        totalContent: 0,
        activeStudents: 0
    });
    const [programs, setPrograms] = useState<any[]>([]);
    const [earnings, setEarnings] = useState<any>({ total: 0, thisMonth: 0 });
    const [loading, setLoading] = useState(true);
    const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        try {
            const [progRes, earnRes] = await Promise.all([
                creatorApi.get('/programs'),
                creatorApi.get('/earnings')
            ]);

            const myPrograms = progRes.data?.programs || [];
            setPrograms(myPrograms);
            setEarnings(earnRes.data?.earnings || { total: 0, thisMonth: 0 });

            // Basic analytics aggregation local for now
            const totalEnrolled = myPrograms.reduce((sum: number, p: any) => sum + (p.enrollmentCount || 0), 0);
            setAnalytics(prev => ({
                ...prev,
                totalContent: myPrograms.length,
                activeStudents: totalEnrolled
            }));
        } catch (err) {
            console.error('Failed to fetch creator data:', err);
            toast.error('Failed to load dashboard data.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const handleInviteToReview = async (progId: string) => {
        try {
            await creatorApi.post(`/programs/${progId}/submit`);
            toast.success('Program submitted for approval!');
            fetchDashboardData();
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to submit program.');
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'published': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'pending_approval': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'needs_improvement': return 'bg-orange-50 text-orange-700 border-orange-200';
            case 'draft': return 'bg-gray-100 text-gray-600 border-gray-200';
            default: return 'bg-gray-50 text-gray-500 border-gray-100';
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-pink-600 animate-spin" />
        </div>
    );

    return (
        <div className="space-y-6 lg:max-w-[1200px] animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Creator Studio</h2>
                    <p className="text-gray-500 mt-1">Welcome back, {user?.name}. Manage your health programs and track impact.</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => navigate('/creator/programs/new')}
                        className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white shadow-md shadow-pink-900/20 border-0 rounded-xl px-6 h-11 text-sm font-bold tracking-wide">
                        <Plus size={18} className="mr-2" /> CREATE NEW PROGRAM
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Platform Earnings', value: `₹${earnings.total.toLocaleString()}`, icon: <ThumbsUp className="w-5 h-5" />, color: 'pink', trend: 'Lifetime' },
                    { label: 'Active Students', value: analytics.activeStudents, icon: <Users className="w-5 h-5" />, color: 'purple', trend: 'Enrolled' },
                    { label: 'Published Programs', value: programs.filter(p => p.status === 'published').length, icon: <CheckCircle2 className="w-5 h-5" />, color: 'blue', trend: 'Live' },
                    { label: 'Total Content', value: analytics.totalContent, icon: <FileText className="w-5 h-5" />, color: 'amber', trend: 'Created' },
                ].map((k, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative overflow-hidden group">
                        <div className={`absolute -right-4 -top-4 w-20 h-20 bg-${k.color}-50 rounded-full opacity-50 blur-2xl group-hover:opacity-80 transition-opacity`}></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-3 bg-${k.color}-50 text-${k.color}-600 rounded-xl`}>{k.icon}</div>
                            <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">{k.trend}</span>
                        </div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wide relative z-10">{k.label}</h3>
                        <div className="mt-2 relative z-10">
                            <p className="text-2xl font-black text-gray-900">{k.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Content List & Approval Flow */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden xl:col-span-2 flex flex-col">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/10">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">My Programs</h3>
                            <p className="text-sm text-gray-500 mt-1">Monitor the lifecycle of your curriculum.</p>
                        </div>
                    </div>

                    {programs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                <BookOpen size={24} />
                            </div>
                            <h4 className="font-bold text-gray-900">No programs found</h4>
                            <p className="text-sm text-gray-500 mt-1 max-w-xs">You haven't created any programs yet. Start building your legacy today.</p>
                            <Button onClick={() => navigate('/creator/programs/new')} variant="outline" className="mt-6 border-pink-200 text-pink-600 rounded-xl">Create Program</Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Program Details</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Pricing</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {programs.map((prog) => (
                                        <tr key={prog._id} className="hover:bg-gray-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900 text-sm">{prog.title}</div>
                                                <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-2">
                                                    <span className="capitalize">{prog.category}</span>
                                                    <span>•</span>
                                                    <span>{prog.durationWeeks} weeks</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-bold text-gray-700">₹{prog.price.toLocaleString()}</div>
                                                <div className="text-[10px] text-gray-400 capitalize">{prog.pricingType}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1.5 items-start">
                                                    <span className={`px-2.5 py-1 text-[10px] font-black rounded-full uppercase tracking-wider border ${getStatusStyle(prog.status)}`}>
                                                        {prog.status.replace('_', ' ')}
                                                    </span>
                                                    {prog.status === 'needs_improvement' && prog.suggestions && (
                                                        <button onClick={() => setSelectedFeedback(prog.suggestions)}
                                                            className="text-[10px] font-bold text-orange-600 flex items-center gap-1 hover:underline">
                                                            <MessageCircle size={10} /> View Feedback
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {(prog.status === 'draft' || prog.status === 'needs_improvement') && (
                                                        <button onClick={() => handleInviteToReview(prog._id)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Submit for Approval">
                                                            <Send size={16} />
                                                        </button>
                                                    )}
                                                    <button onClick={() => navigate(`/creator/programs/new?edit=${prog._id}`)}
                                                        className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition" title="Edit">
                                                        <FileText size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Sidebar: Tips & Stats */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-gray-900 to-pink-900 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                        <div className="absolute right-0 bottom-0 opacity-10">
                            <Plus size={120} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Creator Tip</h3>
                        <p className="text-sm text-pink-100/80 leading-relaxed mb-4">Complete all modules and add clear high-quality videos to speed up the approval process by 2x.</p>
                        <button className="text-xs font-bold bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-xl backdrop-blur-sm">LEARN BEST PRACTICES</button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 text-md mb-4 flex items-center gap-2">
                            <Clock className="text-blue-500" size={18} /> Approval Pipeline
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: 'In Review', count: programs.filter(p => p.status === 'pending_approval').length, color: 'text-amber-600', bg: 'bg-amber-50' },
                                { label: 'Needs Revisions', count: programs.filter(p => p.status === 'needs_improvement').length, color: 'text-orange-600', bg: 'bg-orange-50' },
                                { label: 'Ready to Publish', count: programs.filter(p => p.status === 'draft').length, color: 'text-gray-600', bg: 'bg-gray-50' }
                            ].map((item, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border border-gray-100 transition-all ${item.count > 0 ? 'border-l-4 border-l-current' : ''} ${item.color}`}>
                                    <span className="text-xs font-bold uppercase tracking-wide">{item.label}</span>
                                    <span className="text-lg font-black">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Modal */}
            <Modal open={!!selectedFeedback} onClose={() => setSelectedFeedback(null)} title="Superadmin Feedback" maxWidth="max-w-md">
                <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex gap-4">
                        <AlertCircle className="text-orange-600 shrink-0" size={24} />
                        <div>
                            <h4 className="font-bold text-orange-900 text-sm">Suggested Improvements</h4>
                            <p className="text-sm text-orange-800/80 mt-1 leading-relaxed whitespace-pre-wrap">{selectedFeedback}</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 text-center italic">Address these items and re-submit your program for another review.</p>
                    <Button onClick={() => setSelectedFeedback(null)} className="w-full bg-gray-900 text-white rounded-xl py-6">Got it, thanks!</Button>
                </div>
            </Modal>
        </div>
    );
};

export default CreatorDashboard;
