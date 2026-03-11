import React, { useState, useEffect, useCallback } from 'react';
import {
    BookOpen, Clock, Star, Users, ChevronRight, Search, Plus, Loader2,
    MoreVertical, Edit2, Trash2, Eye, CheckCircle2, Archive, FileText,
    ChevronLeft, Filter, BarChart3, Zap
} from 'lucide-react';
import { Modal } from '../../admin-shared/components/ui';
import superAdminApi from '../../admin-shared/services/superAdminApi';
import toast from 'react-hot-toast';

// ── Constants ──────────────────────────────────────────────────────
const CATEGORIES = [
    { value: 'all', label: 'All Categories' },
    { value: 'hypertension', label: 'Hypertension', color: '#ef4444' },
    { value: 'diabetes', label: 'Diabetes', color: '#f97316' },
    { value: 'cardiac', label: 'Cardiac', color: '#dc2626' },
    { value: 'stress', label: 'Stress', color: '#8b5cf6' },
    { value: 'sleep', label: 'Sleep', color: '#6366f1' },
    { value: 'fitness', label: 'Fitness', color: '#22c55e' },
    { value: 'nutrition', label: 'Nutrition', color: '#eab308' },
    { value: 'metabolic', label: 'Metabolic', color: '#14b8a6' },
    { value: 'cardiovascular', label: 'Cardiovascular', color: '#e11d48' },
    { value: 'respiratory', label: 'Respiratory', color: '#0ea5e9' },
    { value: 'mental', label: 'Mental Health', color: '#a855f7' },
    { value: 'musculoskeletal', label: 'Musculoskeletal', color: '#d97706' },
    { value: 'preventive', label: 'Preventive Care', color: '#059669' },
];

const STATUS_COLORS: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-600',
    pending_approval: 'bg-amber-100 text-amber-700',
    needs_improvement: 'bg-orange-100 text-orange-700',
    published: 'bg-green-100 text-green-700',
    archived: 'bg-red-100 text-red-600',
};

const DIFFICULTY_COLORS: Record<string, string> = {
    Beginner: 'bg-emerald-100 text-emerald-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced: 'bg-red-100 text-red-700',
};

const CAT_COLOR = (cat: string) => CATEGORIES.find(c => c.value === cat)?.color || '#6b7280';

const CAT_EMOJI: Record<string, string> = {
    hypertension: '🫀', diabetes: '🩸', cardiac: '❤️', stress: '🧠', sleep: '😴',
    fitness: '💪', nutrition: '🥗', metabolic: '🔬', cardiovascular: '🫁',
    respiratory: '🌬️', mental: '🧘', musculoskeletal: '🦴', preventive: '🛡️',
};

const PAGE_SIZE = 9;

// ── Helper: empty form state ───────────────────────────────────────
const emptyForm = {
    title: '', description: '', category: 'hypertension', difficulty: 'Beginner',
    durationWeeks: 4, totalSessions: 12, price: 0, pricingType: 'free' as string,
    status: 'draft', targetAudience: 'all', tags: '',
    accessiblePlans: ['free', 'silver', 'gold', 'platinum'] as string[],
    b2bAccessiblePlans: ['trial', 'standard', 'growth', 'enterprise'] as string[],
    enrollmentRequired: false
};

// ── Main Component ─────────────────────────────────────────────────
const Programmes = () => {
    const [programmes, setProgrammes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);

    // Modals
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const [selectedProg, setSelectedProg] = useState<any>(null);
    const [formData, setFormData] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    // Active dropdown (for 3-dot menu)
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    // ── Fetch ───────────────────────────────────────────────────────
    const fetchProgrammes = useCallback(async () => {
        setLoading(true);
        try {
            const res = await superAdminApi.get('/programmes');
            const data = res.data?.data?.programmes || res.data?.programmes || [];
            setProgrammes(data);
        } catch (err) {
            console.error('Failed to fetch programmes:', err);
            toast.error('Failed to load programmes.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchProgrammes(); }, [fetchProgrammes]);

    // ── Filtered + Paginated ────────────────────────────────────────
    const filtered = programmes.filter(p => {
        if (search && !(p.title || '').toLowerCase().includes(search.toLowerCase())) return false;
        if (catFilter !== 'all' && p.category !== catFilter) return false;
        if (statusFilter !== 'all' && p.status !== statusFilter) return false;
        return true;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // ── KPI summary ─────────────────────────────────────────────────
    const totalProg = programmes.length;
    const published = programmes.filter(p => p.status === 'published').length;
    const drafts = programmes.filter(p => p.status === 'draft').length;
    const totalEnrolled = programmes.reduce((sum, p) => sum + (p.enrollmentCount || 0), 0);

    // ── Handlers ────────────────────────────────────────────────────
    const handleCreate = async () => {
        if (!formData.title || !formData.description) {
            toast.error('Title and description are required.');
            return;
        }
        setSaving(true);
        try {
            const payload = { ...formData, tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [] };
            await superAdminApi.post('/programmes', payload);
            toast.success('Programme created!');
            setIsCreating(false);
            setFormData(emptyForm);
            fetchProgrammes();
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to create programme.');
        } finally { setSaving(false); }
    };

    const handleUpdate = async () => {
        if (!selectedProg) return;
        setSaving(true);
        try {
            const payload = { ...formData, tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [] };
            await superAdminApi.patch(`/programmes/${selectedProg._id}`, payload);
            toast.success('Programme updated!');
            setIsEditing(false);
            setSelectedProg(null);
            fetchProgrammes();
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to update programme.');
        } finally { setSaving(false); }
    };

    const handleStatusChange = async (prog: any, newStatus: string) => {
        try {
            await superAdminApi.patch(`/programmes/${prog._id}/status`, { status: newStatus });
            toast.success(`"${prog.title}" ${newStatus === 'published' ? 'published' : newStatus === 'archived' ? 'archived' : 'moved to draft'}.`);
            setActiveMenu(null);
            fetchProgrammes();
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to change status.');
        }
    };

    const handleDelete = async (prog: any) => {
        if (!confirm(`Delete "${prog.title}"? This action cannot be undone.`)) return;
        try {
            await superAdminApi.delete(`/programmes/${prog._id}`);
            toast.success('Programme deleted.');
            setActiveMenu(null);
            fetchProgrammes();
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to delete programme.');
        }
    };

    const openEdit = (prog: any) => {
        setSelectedProg(prog);
        setFormData({
            title: prog.title, description: prog.description, category: prog.category,
            difficulty: prog.difficulty, durationWeeks: prog.durationWeeks || 4,
            totalSessions: prog.totalSessions || 12, price: prog.price || 0,
            pricingType: prog.pricingType || 'free', status: prog.status,
            targetAudience: prog.targetAudience || 'all',
            tags: (prog.tags || []).join(', '),
            accessiblePlans: prog.accessiblePlans || ['free', 'silver', 'gold', 'platinum'],
            b2bAccessiblePlans: prog.b2bAccessiblePlans || ['trial', 'standard', 'growth', 'enterprise'],
            enrollmentRequired: prog.enrollmentRequired || false
        });
        setIsEditing(true);
        setActiveMenu(null);
    };

    const openView = (prog: any) => {
        setSelectedProg(prog);
        setIsViewing(true);
        setActiveMenu(null);
    };

    // ── Form Fields (shared between Create & Edit) ──────────────────
    const renderForm = () => (
        <div className="space-y-5">
            {/* Section 1: Basics */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">1</span>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Programme Basics</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Title <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g., Diabetes Reversal Programme" value={formData.title}
                            onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Description <span className="text-red-500">*</span></label>
                        <textarea className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" rows={3}
                            placeholder="Describe the programme's medical and wellness benefits…"
                            value={formData.description}
                            onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Category <span className="text-red-500">*</span></label>
                        <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}>
                            {CATEGORIES.filter(c => c.value !== 'all').map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Difficulty</label>
                        <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            value={formData.difficulty} onChange={e => setFormData(p => ({ ...p, difficulty: e.target.value }))}>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Section 2: Schedule & Pricing */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">2</span>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Schedule & Pricing</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Duration (Weeks)</label>
                        <input type="number" min={1} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none"
                            value={formData.durationWeeks} onChange={e => setFormData(p => ({ ...p, durationWeeks: Number(e.target.value) || 1 }))} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Total Sessions</label>
                        <input type="number" min={1} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none"
                            value={formData.totalSessions} onChange={e => setFormData(p => ({ ...p, totalSessions: Number(e.target.value) || 1 }))} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Pricing Type</label>
                        <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none bg-white"
                            value={formData.pricingType} onChange={e => setFormData(p => ({ ...p, pricingType: e.target.value, price: e.target.value === 'free' ? 0 : p.price }))}>
                            <option value="free">Free</option>
                            <option value="subscription">Subscription</option>
                            <option value="one-time">One-Time Purchase</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Price (₹)</label>
                        <input type="number" min={0} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none"
                            value={formData.price} disabled={formData.pricingType === 'free'}
                            onChange={e => setFormData(p => ({ ...p, price: Number(e.target.value) }))} />
                    </div>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Section 3: Publishing */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">3</span>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Publishing & Targeting</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Initial Status</label>
                        <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none bg-white"
                            value={formData.status} onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}>
                            <option value="draft">Draft (not visible)</option>
                            <option value="published">Published (live)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Target Audience</label>
                        <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none bg-white"
                            value={formData.targetAudience} onChange={e => setFormData(p => ({ ...p, targetAudience: e.target.value }))}>
                            <option value="all">All (B2B + B2C)</option>
                            <option value="b2b">B2B Corporates Only</option>
                            <option value="b2c">B2C Consumers Only</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Tags <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                        <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none"
                            placeholder="e.g., heart-health, post-surgery, senior"
                            value={formData.tags} onChange={e => setFormData(p => ({ ...p, tags: e.target.value }))} />
                    </div>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Section 4: Plan Access Control */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">4</span>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Plan Access Control</p>
                </div>
                <p className="text-xs text-gray-400 mb-3">Select which subscription plans can access this programme. Only users with matching plans will see it in the app.</p>

                <div className="grid grid-cols-2 gap-4">
                    {/* B2C Plans */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-2">B2C Consumer Plans</label>
                        <div className="space-y-2">
                            {[
                                { value: 'free', label: 'Free', desc: 'All users', color: 'text-gray-600' },
                                { value: 'silver', label: 'Silver', desc: 'Basic paid', color: 'text-blue-600' },
                                { value: 'gold', label: 'Gold', desc: 'Premium', color: 'text-amber-600' },
                                { value: 'platinum', label: 'Platinum', desc: 'VIP', color: 'text-purple-600' },
                            ].map(plan => (
                                <label key={plan.value} className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox"
                                        checked={formData.accessiblePlans.includes(plan.value)}
                                        onChange={e => {
                                            const plans = e.target.checked
                                                ? [...formData.accessiblePlans, plan.value]
                                                : formData.accessiblePlans.filter(p => p !== plan.value);
                                            setFormData(p => ({ ...p, accessiblePlans: plans }));
                                        }}
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span className={`text-sm font-semibold ${plan.color}`}>{plan.label}</span>
                                    <span className="text-[10px] text-gray-400">— {plan.desc}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* B2B Plans */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-2">B2B Organisation Plans</label>
                        <div className="space-y-2">
                            {[
                                { value: 'trial', label: 'Trial', color: 'text-amber-600' },
                                { value: 'standard', label: 'Standard', color: 'text-blue-600' },
                                { value: 'growth', label: 'Growth', color: 'text-indigo-600' },
                                { value: 'enterprise', label: 'Enterprise', color: 'text-purple-600' },
                            ].map(plan => (
                                <label key={plan.value} className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox"
                                        checked={formData.b2bAccessiblePlans.includes(plan.value)}
                                        onChange={e => {
                                            const plans = e.target.checked
                                                ? [...formData.b2bAccessiblePlans, plan.value]
                                                : formData.b2bAccessiblePlans.filter(p => p !== plan.value);
                                            setFormData(p => ({ ...p, b2bAccessiblePlans: plans }));
                                        }}
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span className={`text-sm font-semibold ${plan.color}`}>{plan.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enrollment Required Toggle */}
                <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={formData.enrollmentRequired}
                            onChange={e => setFormData(p => ({ ...p, enrollmentRequired: e.target.checked }))}
                            className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <div>
                        <p className="text-xs font-semibold text-gray-700">Require Explicit Enrollment</p>
                        <p className="text-[10px] text-gray-400">Users must tap "Enroll" before accessing sessions (recommended for advanced programmes)</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // ── Render ──────────────────────────────────────────────────────
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Programme Catalogue</h1>
                    <p className="text-sm text-gray-500 mt-1">Create, manage and provision wellness programmes across all organisations and users.</p>
                </div>
                <button onClick={() => { setFormData(emptyForm); setIsCreating(true); }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors">
                    <Plus size={16} /> Create Programme
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'Total Programmes', value: totalProg, icon: <BookOpen size={18} className="text-blue-500" />, bg: 'bg-blue-50' },
                    { label: 'Published', value: published, icon: <CheckCircle2 size={18} className="text-green-500" />, bg: 'bg-green-50' },
                    { label: 'Drafts', value: drafts, icon: <FileText size={18} className="text-gray-400" />, bg: 'bg-gray-50' },
                    { label: 'Total Enrolled', value: totalEnrolled.toLocaleString(), icon: <Users size={18} className="text-indigo-500" />, bg: 'bg-indigo-50' },
                ].map(k => (
                    <div key={k.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${k.bg}`}>{k.icon}</div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{k.value}</div>
                        <div className="text-xs text-gray-500">{k.label}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-wrap gap-3 items-center shadow-sm">
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Search programmes…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                </div>
                <select className="px-3 py-2 border border-gray-200 rounded-xl text-[13px] outline-none bg-white focus:border-blue-400"
                    value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1); }}>
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <select className="px-3 py-2 border border-gray-200 rounded-xl text-[13px] outline-none bg-white focus:border-blue-400"
                    value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="pending_approval">Pending Approval</option>
                    <option value="needs_improvement">Needs Improvement</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                </select>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 size={28} className="animate-spin text-blue-500" />
                </div>
            ) : paged.length === 0 ? (
                <div className="text-center py-20 space-y-3">
                    <BookOpen size={40} className="mx-auto text-gray-300" />
                    <p className="text-sm text-gray-400">No programmes found matching your criteria.</p>
                    <button onClick={() => { setFormData(emptyForm); setIsCreating(true); }}
                        className="text-sm text-blue-600 font-semibold hover:underline">Create your first programme →</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {paged.map(prog => (
                        <div key={prog._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative">
                            {/* Category colour bar */}
                            <div className="h-1.5 w-full" style={{ background: CAT_COLOR(prog.category) }} />

                            <div className="p-5">
                                {/* Header Row */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                        <div className="text-2xl">{CAT_EMOJI[prog.category] || '📋'}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{
                                                    backgroundColor: CAT_COLOR(prog.category) + '18',
                                                    color: CAT_COLOR(prog.category)
                                                }}>{prog.category}</span>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${STATUS_COLORS[prog.status] || ''}`}>{prog.status}</span>
                                            </div>
                                            <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">{prog.title}</h3>
                                        </div>
                                    </div>

                                    {/* 3-dot menu */}
                                    <div className="relative">
                                        <button onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === prog._id ? null : prog._id); }}
                                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                                            <MoreVertical size={14} />
                                        </button>
                                        {activeMenu === prog._id && (
                                            <div className="absolute right-0 top-8 w-44 bg-white rounded-xl border border-gray-200 shadow-lg py-1.5 z-50 animate-in fade-in duration-150"
                                                onMouseLeave={() => setActiveMenu(null)}>
                                                <button onClick={() => openView(prog)}
                                                    className="w-full px-3.5 py-2 text-left text-[12px] font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2">
                                                    <Eye size={13} /> View Details
                                                </button>
                                                <button onClick={() => openEdit(prog)}
                                                    className="w-full px-3.5 py-2 text-left text-[12px] font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2">
                                                    <Edit2 size={13} /> Edit Programme
                                                </button>
                                                <hr className="my-1 border-gray-100" />
                                                {prog.status !== 'published' && (
                                                    <button onClick={() => handleStatusChange(prog, 'published')}
                                                        className="w-full px-3.5 py-2 text-left text-[12px] font-medium text-green-700 hover:bg-green-50 flex items-center gap-2">
                                                        <CheckCircle2 size={13} /> Publish
                                                    </button>
                                                )}
                                                {prog.status !== 'draft' && (
                                                    <button onClick={() => handleStatusChange(prog, 'draft')}
                                                        className="w-full px-3.5 py-2 text-left text-[12px] font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                                                        <FileText size={13} /> Move to Draft
                                                    </button>
                                                )}
                                                {prog.status !== 'archived' && (
                                                    <button onClick={() => handleStatusChange(prog, 'archived')}
                                                        className="w-full px-3.5 py-2 text-left text-[12px] font-medium text-orange-600 hover:bg-orange-50 flex items-center gap-2">
                                                        <Archive size={13} /> Archive
                                                    </button>
                                                )}
                                                <hr className="my-1 border-gray-100" />
                                                <button onClick={() => handleDelete(prog)}
                                                    className="w-full px-3.5 py-2 text-left text-[12px] font-medium text-red-600 hover:bg-red-50 flex items-center gap-2">
                                                    <Trash2 size={13} /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{prog.description}</p>

                                {/* Metadata chips */}
                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                                    <span className="flex items-center gap-1"><Clock size={11} /> {prog.durationWeeks}w</span>
                                    <span className="flex items-center gap-1"><BookOpen size={11} /> {prog.totalSessions} sessions</span>
                                    {(prog.averageRating || 0) > 0 && (
                                        <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" fill="currentColor" /> {prog.averageRating?.toFixed(1)}</span>
                                    )}
                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${DIFFICULTY_COLORS[prog.difficulty] || ''}`}>{prog.difficulty}</span>
                                </div>

                                {/* Enrollment bar */}
                                {(prog.enrollmentCount || 0) > 0 && (
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[11px] text-gray-500"><Users size={10} className="inline mr-1" />{prog.enrollmentCount} enrolled</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full" style={{ width: '60%', background: CAT_COLOR(prog.category) }} />
                                        </div>
                                    </div>
                                )}

                                {/* Pricing + audience */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-gray-800">
                                        {prog.price > 0 ? `₹${prog.price.toLocaleString()}` : 'Free'}
                                        {prog.pricingType === 'subscription' && <span className="text-gray-400 font-normal">/mo</span>}
                                    </span>
                                    <span className="text-[10px] text-gray-400 uppercase">{prog.targetAudience === 'all' ? 'B2B + B2C' : prog.targetAudience?.toUpperCase()}</span>
                                </div>

                                {/* View button */}
                                <button onClick={() => openView(prog)}
                                    className="w-full mt-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50">
                                    <ChevronRight size={12} /> View & Manage
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {!loading && filtered.length > PAGE_SIZE && (
                <div className="flex items-center justify-between text-xs text-gray-500 bg-white rounded-2xl border border-gray-100 px-5 py-3 shadow-sm">
                    <span>Showing {paged.length} of {filtered.length} programmes</span>
                    <div className="flex items-center gap-1">
                        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                            <ChevronLeft size={14} />
                        </button>
                        <span className="px-3 py-1 font-semibold">Page {page} of {totalPages}</span>
                        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}
                            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* ── Create Modal ───────────────────────────────────────── */}
            <Modal open={isCreating} onClose={() => setIsCreating(false)} title="Create New Programme" maxWidth="max-w-2xl"
                footer={<>
                    <button className="btn-secondary btn" onClick={() => setIsCreating(false)} disabled={saving}>Cancel</button>
                    <button className="btn-primary btn gap-2" onClick={handleCreate} disabled={saving}>
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                        {saving ? 'Creating…' : 'Create Programme'}
                    </button>
                </>}>
                {renderForm()}
            </Modal>

            {/* ── Edit Modal ─────────────────────────────────────────── */}
            <Modal open={isEditing} onClose={() => { setIsEditing(false); setSelectedProg(null); }} title={`Edit: ${selectedProg?.title || ''}`} maxWidth="max-w-2xl"
                footer={<>
                    <button className="btn-secondary btn" onClick={() => setIsEditing(false)} disabled={saving}>Cancel</button>
                    <button className="btn-primary btn gap-2" onClick={handleUpdate} disabled={saving}>
                        {saving ? <Loader2 size={14} className="animate-spin" /> : <Edit2 size={14} />}
                        {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                </>}>
                {renderForm()}
            </Modal>

            {/* ── View Detail Modal ──────────────────────────────────── */}
            <Modal open={isViewing} onClose={() => { setIsViewing(false); setSelectedProg(null); }}
                title={selectedProg?.title || 'Programme Details'} maxWidth="max-w-xl"
                footer={<>
                    <button className="btn-secondary btn" onClick={() => { setIsViewing(false); setSelectedProg(null); }}>Close</button>
                    <button className="btn-primary btn gap-2" onClick={() => { setIsViewing(false); openEdit(selectedProg); }}>
                        <Edit2 size={14} /> Edit Programme
                    </button>
                </>}>
                {selectedProg && (
                    <div className="space-y-5">
                        {/* Top banner */}
                        <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: CAT_COLOR(selectedProg.category) + '12', border: `1px solid ${CAT_COLOR(selectedProg.category)}30` }}>
                            <div className="text-5xl">{CAT_EMOJI[selectedProg.category] || '📋'}</div>
                            <div>
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{
                                        backgroundColor: CAT_COLOR(selectedProg.category) + '20',
                                        color: CAT_COLOR(selectedProg.category)
                                    }}>{selectedProg.category}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${STATUS_COLORS[selectedProg.status]}`}>{selectedProg.status}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${DIFFICULTY_COLORS[selectedProg.difficulty]}`}>{selectedProg.difficulty}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} className={i <= Math.floor(selectedProg.averageRating || 0) ? 'text-amber-400' : 'text-gray-200'} fill={i <= Math.floor(selectedProg.averageRating || 0) ? 'currentColor' : 'none'} />)}
                                    <span className="text-xs text-gray-500 ml-1">{selectedProg.averageRating?.toFixed(1) || '0.0'} ({selectedProg.reviewCount || 0} reviews)</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">{selectedProg.description}</p>

                        {/* Stats grid */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                ['⏱️', `${selectedProg.durationWeeks} weeks`, 'Duration'],
                                ['📋', `${selectedProg.totalSessions} sessions`, 'Sessions'],
                                ['👥', `${selectedProg.enrollmentCount || 0}`, 'Enrolled'],
                            ].map(([emoji, val, label]) => (
                                <div key={label as string} className="bg-gray-50 rounded-xl p-3 text-center">
                                    <div className="text-xl mb-1">{emoji}</div>
                                    <div className="font-semibold text-gray-800 text-sm">{val}</div>
                                    <div className="text-[10px] text-gray-500">{label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Meta info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-0.5">Pricing</p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {selectedProg.price > 0 ? `₹${selectedProg.price.toLocaleString()}` : 'Free'}
                                    <span className="font-normal text-gray-400 ml-1">({selectedProg.pricingType})</span>
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-0.5">Target Audience</p>
                                <p className="text-sm text-gray-700 uppercase">{selectedProg.targetAudience === 'all' ? 'B2B + B2C' : selectedProg.targetAudience}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-0.5">Created</p>
                                <p className="text-sm text-gray-700">{new Date(selectedProg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </div>
                            {(selectedProg.tags || []).length > 0 && (
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-0.5">Tags</p>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedProg.tags.map((t: string) => (
                                            <span key={t} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px] font-medium">#{t}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick actions */}
                        <div className="flex gap-2 pt-2 border-t border-gray-100">
                            {selectedProg.status !== 'published' && (
                                <button onClick={() => { handleStatusChange(selectedProg, 'published'); setIsViewing(false); }}
                                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors flex items-center justify-center gap-1.5">
                                    <CheckCircle2 size={13} /> Publish
                                </button>
                            )}
                            {selectedProg.status !== 'archived' && (
                                <button onClick={() => { handleStatusChange(selectedProg, 'archived'); setIsViewing(false); }}
                                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 transition-colors flex items-center justify-center gap-1.5">
                                    <Archive size={13} /> Archive
                                </button>
                            )}
                            <button onClick={() => { handleDelete(selectedProg); setIsViewing(false); }}
                                className="py-2 px-4 rounded-xl text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors flex items-center gap-1.5">
                                <Trash2 size={13} /> Delete
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Programmes;
