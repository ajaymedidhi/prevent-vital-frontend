import React, { useState, useEffect, useCallback } from 'react';
import {
    CheckCircle2, AlertCircle, Eye, Loader2,
    BookOpen, User, Calendar, MessageSquare, History as HistoryIcon,
    Layers, Clock
} from 'lucide-react';
import { Modal } from '../../admin-shared/components/ui';
import superAdminApi from '../../admin-shared/services/superAdminApi';
import toast from 'react-hot-toast';

const Approvals = () => {
    const [approvals, setApprovals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProgram, setSelectedProgram] = useState<any>(null);
    const [isReviewing, setIsReviewing] = useState(false);
    const [suggestions, setSuggestions] = useState('');
    const [processing, setProcessing] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'queue' | 'history'>('queue');
    const [globalHistory, setGlobalHistory] = useState<any[]>([]);
    const [globalHistoryLoading, setGlobalHistoryLoading] = useState(false);

    const fetchApprovals = useCallback(async () => {
        setLoading(true);
        try {
            const res = await superAdminApi.get('/approvals');
            setApprovals(res.data?.approvals || []);
        } catch (err) {
            console.error('Failed to fetch approvals:', err);
            toast.error('Failed to load pending approvals.');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchHistory = async (progId: string) => {
        setHistoryLoading(true);
        try {
            const res = await superAdminApi.get(`/audit-logs?resource=Program&resourceId=${progId}`);
            setHistory(res.data?.data?.logs || []);
        } catch (err) {
            console.error('Failed to fetch history:', err);
        } finally {
            setHistoryLoading(false);
        }
    };

    const fetchGlobalHistory = useCallback(async () => {
        setGlobalHistoryLoading(true);
        try {
            const res = await superAdminApi.get('/audit-logs?resource=Program&limit=50');
            setGlobalHistory(res.data?.data?.logs || []);
        } catch (err) {
            console.error('Failed to fetch global history:', err);
        } finally {
            setGlobalHistoryLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'queue') {
            fetchApprovals();
        } else {
            fetchGlobalHistory();
        }
    }, [activeTab, fetchApprovals, fetchGlobalHistory]);

    const handleAction = async (status: string) => {
        if (!selectedProgram) return;

        if (status === 'needs_improvement' && !suggestions.trim()) {
            toast.error('Please provide suggestions for improvement.');
            return;
        }

        setProcessing(true);
        try {
            await superAdminApi.patch(`/programmes/${selectedProgram._id}/status`, {
                status,
                suggestions: status === 'needs_improvement' ? suggestions : undefined
            });

            toast.success(status === 'published' ? 'Program approved and published!' : 'Improvement request sent.');
            setIsReviewing(false);
            setSelectedProgram(null);
            setSuggestions('');
            fetchApprovals();
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to update status.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Program Approvals</h2>
                <p className="text-sm text-gray-500 mt-1">Review program submissions from content creators.</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl w-fit">
                <button
                    onClick={() => setActiveTab('queue')}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'queue' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Layers size={16} /> Review Queue
                    {approvals.length > 0 && (
                        <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-lg text-[10px]">
                            {approvals.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Clock size={16} /> Action History
                </button>
            </div>

            {loading || globalHistoryLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 size={28} className="animate-spin text-blue-500" />
                </div>
            ) : activeTab === 'queue' ? (
                approvals.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🎉</div>
                        <h3 className="text-gray-900 font-bold text-lg">All Caught Up!</h3>
                        <p className="text-gray-500 mt-2 max-w-xs mx-auto">There are no pending program submissions waiting for review at this moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {approvals.map((prog) => (
                            <div key={prog._id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                        <BookOpen size={24} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-gray-900 truncate">{prog.title}</h3>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                                            <span className="flex items-center gap-1.5"><User size={13} /> {prog.creator?.name || 'Unknown Creator'}</span>
                                            <span className="flex items-center gap-1.5"><Calendar size={13} /> Submitted {new Date(prog.updatedAt).toLocaleDateString()}</span>
                                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold uppercase text-[9px]">Pending Approval</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button onClick={() => { setSelectedProgram(prog); setIsReviewing(true); fetchHistory(prog._id); }}
                                        className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-2">
                                        <Eye size={14} /> Review Submission
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div className="space-y-4">
                    {globalHistory.length === 0 ? (
                        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <p className="text-gray-500">No approval history found.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-100">
                                    <tr>
                                        <th className="p-4">Action</th>
                                        <th className="p-4">Program</th>
                                        <th className="p-4">By</th>
                                        <th className="p-4">Feedback</th>
                                        <th className="p-4">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-xs">
                                    {globalHistory.map((h: any) => (
                                        <tr key={h._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${h.action.includes('PUBLISH') ? 'bg-green-100 text-green-700' :
                                                    h.action.includes('REJECT') ? 'bg-orange-100 text-orange-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {h.action.replace(/_/g, ' ')}
                                                </span>
                                            </td>
                                            <td className="p-4 font-bold text-gray-900">{h.details?.title || 'N/A'}</td>
                                            <td className="p-4">
                                                <div className="font-semibold text-gray-700">{h.user?.profile?.firstName || 'System'}</div>
                                                <div className="text-[10px] text-gray-400 capitalize">{h.user?.role?.replace(/_/g, ' ')}</div>
                                            </td>
                                            <td className="p-4 text-gray-500 max-w-xs truncate italic">
                                                {h.details?.suggestions ? `"${h.details.suggestions}"` : '-'}
                                            </td>
                                            <td className="p-4 text-gray-400">
                                                {new Date(h.timestamp).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Review Modal */}
            <Modal open={isReviewing} onClose={() => setIsReviewing(false)}
                title="Review Program Submission" maxWidth="max-w-2xl"
                footer={<div className="flex items-center justify-between w-full">
                    <button className="text-xs font-semibold text-gray-500 hover:text-gray-700" onClick={() => setIsReviewing(false)}>Cancel</button>
                    <div className="flex gap-3">
                        <button disabled={processing} onClick={() => handleAction('needs_improvement')}
                            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all flex items-center gap-2">
                            <AlertCircle size={16} /> Request Changes
                        </button>
                        <button disabled={processing} onClick={() => handleAction('published')}
                            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-green-600 text-white hover:bg-green-700 shadow-sm transition-all flex items-center gap-2">
                            <CheckCircle2 size={16} /> Approve & Publish
                        </button>
                    </div>
                </div>}>
                {selectedProgram && (
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                            <h4 className="font-bold text-gray-900 text-sm mb-2">Program Details</h4>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <p className="text-gray-400 mb-0.5 uppercase tracking-wide">Category</p>
                                    <p className="font-semibold text-gray-700 capitalize">{selectedProgram.category}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 mb-0.5 uppercase tracking-wide">Difficulty</p>
                                    <p className="font-semibold text-gray-700">{selectedProgram.difficulty}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 mb-0.5 uppercase tracking-wide">Duration</p>
                                    <p className="font-semibold text-gray-700">{selectedProgram.durationWeeks} Weeks ({selectedProgram.totalSessions} Sessions)</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 mb-0.5 uppercase tracking-wide">Pricing</p>
                                    <p className="font-semibold text-gray-700">₹{selectedProgram.price} ({selectedProgram.pricingType})</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 text-sm mb-2">Description</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{selectedProgram.description}</p>
                        </div>

                        {selectedProgram.modules?.length > 0 && (
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm mb-3">Content Modules ({selectedProgram.modules.length})</h4>
                                <div className="space-y-2">
                                    {selectedProgram.modules.map((m: any, i: number) => (
                                        <div key={i} className="p-3 rounded-xl border border-gray-100 text-xs flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px]">{i + 1}</span>
                                                <span className="font-bold text-gray-700">{m.title}</span>
                                            </div>
                                            <span className="text-gray-400">{m.duration ? `${m.duration} mins` : 'Async'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                            <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                                <HistoryIcon size={16} className="text-gray-400" /> Interaction History
                            </h4>
                            {historyLoading ? (
                                <div className="flex justify-center p-4">
                                    <Loader2 className="animate-spin text-gray-300" size={20} />
                                </div>
                            ) : history.length === 0 ? (
                                <p className="text-xs text-gray-400 italic text-center py-2">No prior interaction history for this program.</p>
                            ) : (
                                <div className="space-y-4">
                                    {history.map((h: any, i: number) => (
                                        <div key={h._id} className="relative pl-5 before:content-[''] before:absolute before:left-1 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200 last:before:hidden">
                                            <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white" />
                                            <div className="text-[11px]">
                                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                                    <span className="font-bold text-gray-600">{h.action.replace(/_/g, ' ')}</span>
                                                    <span>•</span>
                                                    <span>{new Date(h.timestamp).toLocaleString()}</span>
                                                </div>
                                                {h.details?.suggestions && (
                                                    <div className="bg-white p-2.5 rounded-lg border border-gray-100 text-gray-600 italic">
                                                        "{h.details.suggestions}"
                                                    </div>
                                                )}
                                                {!h.details?.suggestions && h.details?.newStatus && (
                                                    <p className="text-gray-500">Status changed to <span className="font-semibold text-gray-700">{h.details.newStatus}</span></p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <hr className="border-gray-100" />

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <MessageSquare size={16} className="text-blue-500" /> Feedback & Suggestions
                            </label>
                            <textarea className="w-full border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 min-h-[120px] transition-all"
                                placeholder="Explain why changes are needed or provide appreciation..."
                                value={suggestions} onChange={e => setSuggestions(e.target.value)} />
                            <p className="text-[10px] text-gray-400 mt-2 italic">Creator will see these suggestions if you request changes.</p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Approvals;
