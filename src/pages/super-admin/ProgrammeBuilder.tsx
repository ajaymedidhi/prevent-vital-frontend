import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Check, ChevronRight, ChevronLeft, AlignLeft, Target, DollarSign, FileText,
    UploadCloud, BookOpen, Calendar, Video, PlusCircle, Trash2, Loader2,
    Save, Send, Image as ImageIcon, Settings, ArrowLeft
} from 'lucide-react';
import superAdminApi from '../../admin-shared/services/superAdminApi';
import { VideoUploader, ThumbnailUploader, ResourceUploader } from '../../features/media';
import toast from 'react-hot-toast';

// ── Constants ──────────────────────────────────────────────────────────────────
const STEPS = ['Programme Details', 'Cover & Modules', 'Publishing', 'Review'];

const CATEGORIES = [
    { value: 'hypertension', label: 'Hypertension' },
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'cardiac', label: 'Cardiac' },
    { value: 'stress', label: 'Stress' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'metabolic', label: 'Metabolic' },
    { value: 'cardiovascular', label: 'Cardiovascular' },
    { value: 'respiratory', label: 'Respiratory' },
    { value: 'mental', label: 'Mental Health' },
    { value: 'musculoskeletal', label: 'Musculoskeletal' },
    { value: 'preventive', label: 'Preventive Care' },
];

type Module = {
    title: string;
    content: string;
    type: 'video' | 'article' | 'resource';
    duration: string;
    videoMediaId?: string;
    thumbnailMediaId?: string;
    resources: string[];
};

const emptyModule = (): Module => ({
    title: '', content: '', type: 'video', duration: '10', resources: []
});

// ── Component ──────────────────────────────────────────────────────────────────
const ProgrammeBuilder = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('edit');

    const [step, setStep] = useState(0);
    const [fetching, setFetching] = useState(false);
    const [saving, setSaving] = useState(false);

    // ── Step 1: Details ──────────────────────────────────────────────
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('hypertension');
    const [difficulty, setDifficulty] = useState('Beginner');
    const [durationWeeks, setDurationWeeks] = useState(4);
    const [totalSessions, setTotalSessions] = useState(12);
    const [price, setPrice] = useState('0');
    const [pricingType, setPricingType] = useState('free');
    const [tags, setTags] = useState('');

    // ── Step 2: Cover + Modules ──────────────────────────────────────
    const [coverImageMediaId, setCoverImageMediaId] = useState('');
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [modules, setModules] = useState<Module[]>([]);

    // ── Step 3: Publishing ───────────────────────────────────────────
    const [status, setStatus] = useState('draft');
    const [targetAudience, setTargetAudience] = useState('all');
    const [enrollmentRequired, setEnrollmentRequired] = useState(false);
    const [accessiblePlans, setAccessiblePlans] = useState(['free', 'premium', 'pro', 'family']);
    const [b2bAccessiblePlans, setB2bAccessiblePlans] = useState(['trial', 'standard', 'growth', 'enterprise']);

    // ── Load existing programme if editing ───────────────────────────
    useEffect(() => {
        if (!editId) return;
        const load = async () => {
            setFetching(true);
            try {
                const res = await superAdminApi.get('/programmes');
                const progs = res.data?.data?.programmes || res.data?.programmes || [];
                const prog = progs.find((p: any) => p._id === editId);
                if (prog) {
                    setTitle(prog.title || '');
                    setDescription(prog.description || '');
                    setCategory(prog.category || 'hypertension');
                    setDifficulty(prog.difficulty || 'Beginner');
                    setDurationWeeks(prog.durationWeeks || 4);
                    setTotalSessions(prog.totalSessions || 12);
                    setPrice(prog.price?.toString() || '0');
                    setPricingType(prog.pricingType || 'free');
                    setTags((prog.tags || []).join(', '));
                    setCoverImageMediaId(prog.coverImageMediaId?._id || prog.coverImageMediaId || '');
                    setCoverPreview(prog.coverImageMediaId?.signedUrl || null);
                    setStatus(prog.status || 'draft');
                    setTargetAudience(prog.targetAudience || 'all');
                    setEnrollmentRequired(prog.enrollmentRequired || false);
                    setAccessiblePlans(prog.accessiblePlans || ['free', 'premium', 'pro', 'family']);
                    setB2bAccessiblePlans(prog.b2bAccessiblePlans || ['trial', 'standard', 'growth', 'enterprise']);
                    setModules((prog.modules || []).map((m: any) => ({
                        title: m.title || '',
                        content: m.content || '',
                        type: m.contentType || 'video',
                        duration: m.duration?.toString() || '10',
                        videoMediaId: m.videoMediaId?._id || m.videoMediaId || undefined,
                        thumbnailMediaId: m.thumbnailMediaId?._id || m.thumbnailMediaId || undefined,
                        resources: (m.resources || []).map((r: any) => r._id || r),
                    })));
                }
            } catch {
                toast.error('Failed to load programme.');
            } finally {
                setFetching(false);
            }
        };
        load();
    }, [editId]);

    // ── Module helpers ────────────────────────────────────────────────
    const addModule = () => setModules(p => [...p, emptyModule()]);
    const removeModule = (i: number) => setModules(p => p.filter((_, idx) => idx !== i));
    const setField = (i: number, fields: Partial<Module>) =>
        setModules(p => p.map((m, idx) => idx === i ? { ...m, ...fields } : m));

    // ── Plan toggle helpers ───────────────────────────────────────────
    const togglePlan = (plan: string) =>
        setAccessiblePlans(p => p.includes(plan) ? p.filter(x => x !== plan) : [...p, plan]);
    const toggleB2bPlan = (plan: string) =>
        setB2bAccessiblePlans(p => p.includes(plan) ? p.filter(x => x !== plan) : [...p, plan]);

    // ── Save / Publish ────────────────────────────────────────────────
    const save = async (publishNow = false) => {
        if (!title.trim() || !category) {
            setStep(0);
            toast.error('Programme title and category are required.');
            return;
        }

        setSaving(true);
        try {
            const payload: any = {
                title,
                description,
                category,
                difficulty,
                durationWeeks,
                totalSessions,
                price: parseFloat(price) || 0,
                pricingType,
                tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
                status: publishNow ? 'published' : status,
                targetAudience,
                enrollmentRequired,
                accessiblePlans,
                b2bAccessiblePlans,
                modules: modules.map((m, i) => ({
                    title: m.title,
                    content: m.content,
                    contentType: m.type,
                    duration: parseInt(m.duration || '0'),
                    order: i,
                    ...(m.videoMediaId && { videoMediaId: m.videoMediaId }),
                    ...(m.thumbnailMediaId && { thumbnailMediaId: m.thumbnailMediaId }),
                    ...(m.resources?.length && { resources: m.resources }),
                })),
            };
            if (coverImageMediaId) payload.coverImageMediaId = coverImageMediaId;

            if (editId) {
                await superAdminApi.patch(`/programmes/${editId}`, payload);
            } else {
                await superAdminApi.post('/programmes', payload);
            }

            toast.success(publishNow ? 'Programme published!' : editId ? 'Programme updated!' : 'Programme saved!');
            navigate('/super-admin/programmes');
        } catch (err: any) {
            toast.error(err.message || 'Failed to save programme.');
        } finally {
            setSaving(false);
        }
    };

    if (fetching) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-gray-500 font-medium">Loading programme…</p>
        </div>
    );

    return (
        <div className="max-w-[900px] mx-auto pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <button onClick={() => navigate('/super-admin/programmes')}
                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-3 transition-colors">
                        <ArrowLeft size={15} /> Back to Programmes
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">{editId ? 'Edit Programme' : 'Programme Builder'}</h2>
                    <p className="text-gray-500 mt-1 text-sm">Create a complete programme with videos, resources, and access controls.</p>
                </div>
                <button onClick={() => save(false)} disabled={saving}
                    className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors disabled:opacity-50">
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Draft
                </button>
            </div>

            {/* Step indicator */}
            <div className="mb-10 relative">
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100" />
                <div className="absolute top-5 left-0 h-0.5 bg-blue-600 transition-all duration-500"
                    style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
                <div className="flex justify-between relative z-10">
                    {STEPS.map((s, i) => (
                        <button key={i} onClick={() => setStep(i)}
                            className="flex flex-col items-center gap-2 cursor-pointer group">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                                ${i < step ? 'bg-blue-600 border-blue-600 text-white' :
                                    i === step ? 'bg-white border-blue-600 text-blue-600 shadow-md' :
                                        'bg-white border-gray-200 text-gray-300'}`}>
                                {i < step ? <Check size={16} /> : i + 1}
                            </div>
                            <span className={`text-[11px] font-bold uppercase tracking-wider hidden sm:block transition-colors
                                ${i <= step ? 'text-gray-700' : 'text-gray-300'}`}>
                                {s.split(' ')[0]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 min-h-[400px]">

                {/* ── STEP 0: Programme Details ── */}
                {step === 0 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><AlignLeft size={20} /></div>
                            <div>
                                <h3 className="font-bold text-gray-900">Programme Details</h3>
                                <p className="text-xs text-gray-500">Set the core information for this programme.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Title <span className="text-red-500">*</span></label>
                                <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                                    placeholder="e.g. 8-Week Hypertension Control Programme"
                                    value={title} onChange={e => setTitle(e.target.value)} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><Target size={12} /> Category <span className="text-red-500">*</span></label>
                                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 bg-white"
                                        value={category} onChange={e => setCategory(e.target.value)}>
                                        {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Difficulty</label>
                                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 bg-white"
                                        value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5"><FileText size={12} className="inline mr-1" />Description</label>
                                <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 resize-none min-h-[120px] font-medium"
                                    placeholder="Describe the programme's goals, benefits, and clinical context…"
                                    value={description} onChange={e => setDescription(e.target.value)} />
                            </div>

                            <div className="grid grid-cols-4 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Weeks</label>
                                    <input type="number" min={1} className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-500 font-medium"
                                        value={durationWeeks} onChange={e => setDurationWeeks(Number(e.target.value) || 1)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Sessions</label>
                                    <input type="number" min={1} className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-500 font-medium"
                                        value={totalSessions} onChange={e => setTotalSessions(Number(e.target.value) || 1)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Pricing</label>
                                    <select className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-500 bg-white font-medium"
                                        value={pricingType} onChange={e => setPricingType(e.target.value)}>
                                        <option value="free">Free</option>
                                        <option value="subscription">Subscription</option>
                                        <option value="one-time">One-Time</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5"><DollarSign size={12} className="inline" /> Price (₹)</label>
                                    <input type="number" min={0} className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-500 font-medium"
                                        disabled={pricingType === 'free'} value={price} onChange={e => setPrice(e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Tags <span className="text-gray-400 font-normal normal-case">(comma-separated)</span></label>
                                <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 font-medium"
                                    placeholder="e.g. heart-health, post-surgery, seniors"
                                    value={tags} onChange={e => setTags(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                {/* ── STEP 1: Cover Image + Modules ── */}
                {step === 1 && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        {/* Cover Image */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600"><ImageIcon size={20} /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Cover Image</h3>
                                    <p className="text-xs text-gray-500">The main visual shown in the app programme listing.</p>
                                </div>
                            </div>
                            {coverPreview ? (
                                <div className="relative rounded-xl overflow-hidden border border-gray-200" style={{ height: 160 }}>
                                    <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                                    <button onClick={() => { setCoverImageMediaId(''); setCoverPreview(null); }}
                                        className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-1.5 text-red-500 shadow-md transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                    <div className="absolute bottom-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <Check size={10} /> Uploaded
                                    </div>
                                </div>
                            ) : (
                                <ThumbnailUploader
                                    programId={editId || undefined}
                                    onUploadComplete={(mediaId, signedUrl) => {
                                        setCoverImageMediaId(mediaId);
                                        setCoverPreview(signedUrl || null);
                                    }}
                                    onRemove={() => { setCoverImageMediaId(''); setCoverPreview(null); }}
                                    label="Upload Programme Cover Image"
                                />
                            )}
                        </div>

                        <hr className="border-gray-100" />

                        {/* Content Modules */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><UploadCloud size={20} /></div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Content Modules</h3>
                                        <p className="text-xs text-gray-500">Add videos, articles, or resources for each module.</p>
                                    </div>
                                </div>
                                <button onClick={addModule}
                                    className="flex items-center gap-2 text-sm font-bold px-4 py-2 border border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 transition-colors">
                                    <PlusCircle size={15} /> Add Module
                                </button>
                            </div>

                            {modules.length === 0 ? (
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center">
                                    <BookOpen size={32} className="mx-auto text-gray-200 mb-3" />
                                    <p className="text-sm font-semibold text-gray-400">No modules yet</p>
                                    <p className="text-xs text-gray-300 mt-1 mb-4">Structure your programme into chapters or weeks.</p>
                                    <button onClick={addModule}
                                        className="text-sm font-bold text-blue-600 border border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
                                        + Add First Module
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-5 max-h-[600px] overflow-y-auto pr-1">
                                    {modules.map((mod, idx) => (
                                        <div key={idx} className="border border-gray-100 rounded-xl p-5 group hover:border-blue-200 hover:shadow-sm transition-all relative bg-white">
                                            {/* Module header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center">{idx + 1}</span>
                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Module {idx + 1}</span>
                                                </div>
                                                <button onClick={() => removeModule(idx)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>

                                            {/* Title + Type + Duration row */}
                                            <div className="grid grid-cols-12 gap-3 mb-4">
                                                <div className="col-span-6">
                                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Title</label>
                                                    <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 font-medium"
                                                        placeholder="e.g. Introduction to Breathwork"
                                                        value={mod.title} onChange={e => setField(idx, { title: e.target.value })} />
                                                </div>
                                                <div className="col-span-3">
                                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Type</label>
                                                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white font-medium"
                                                        value={mod.type} onChange={e => setField(idx, { type: e.target.value as Module['type'] })}>
                                                        <option value="video">Video</option>
                                                        <option value="article">Article</option>
                                                        <option value="resource">Resource / PDF</option>
                                                    </select>
                                                </div>
                                                <div className="col-span-3">
                                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Duration (min)</label>
                                                    <input type="number" min={1} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 font-medium"
                                                        value={mod.duration} onChange={e => setField(idx, { duration: e.target.value })} />
                                                </div>
                                            </div>

                                            {/* Media upload based on type */}
                                            {mod.type === 'video' && (
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Video File</label>
                                                        <VideoUploader
                                                            programId={editId || undefined}
                                                            moduleIndex={idx}
                                                            onUploadComplete={(mediaId) => setField(idx, { videoMediaId: mediaId })}
                                                            onRemove={() => setField(idx, { videoMediaId: undefined })}
                                                            label="Upload Module Video"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Module Thumbnail <span className="text-gray-300 font-normal normal-case">(optional)</span></label>
                                                        <ThumbnailUploader
                                                            programId={editId || undefined}
                                                            onUploadComplete={(mediaId) => setField(idx, { thumbnailMediaId: mediaId })}
                                                            onRemove={() => setField(idx, { thumbnailMediaId: undefined })}
                                                            label="Upload Thumbnail"
                                                            compact
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {mod.type === 'resource' && (
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Resource File</label>
                                                    <ResourceUploader
                                                        programId={editId || undefined}
                                                        onUploadComplete={(mediaId) => setField(idx, { resources: [...(mod.resources || []), mediaId] })}
                                                        onRemove={() => setField(idx, { resources: [] })}
                                                        label="Upload PDF / Resource"
                                                    />
                                                </div>
                                            )}

                                            {/* Notes / content */}
                                            <div className="mt-3">
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                    {mod.type === 'article' ? 'Article Content' : 'Notes / Description'}
                                                </label>
                                                <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400 resize-none h-20 font-medium"
                                                    placeholder={mod.type === 'article' ? 'Write the article content for this module…' : 'Optional notes or summary for this module…'}
                                                    value={mod.content} onChange={e => setField(idx, { content: e.target.value })} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── STEP 2: Publishing & Access ── */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600"><Settings size={20} /></div>
                            <div>
                                <h3 className="font-bold text-gray-900">Publishing & Access Control</h3>
                                <p className="text-xs text-gray-500">Control who can see this programme and when it goes live.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
                                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 bg-white font-medium"
                                    value={status} onChange={e => setStatus(e.target.value)}>
                                    <option value="draft">Draft (not visible)</option>
                                    <option value="published">Published (live)</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Target Audience</label>
                                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 bg-white font-medium"
                                    value={targetAudience} onChange={e => setTargetAudience(e.target.value)}>
                                    <option value="all">All (B2B + B2C)</option>
                                    <option value="b2b">B2B Corporates Only</option>
                                    <option value="b2c">B2C Consumers Only</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* B2C Plans */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">B2C Consumer Plans</p>
                                <div className="space-y-2.5">
                                    {[
                                        { value: 'free', label: 'Free', color: 'text-gray-600' },
                                        { value: 'premium', label: 'Premium', color: 'text-blue-600' },
                                        { value: 'pro', label: 'Pro', color: 'text-amber-600' },
                                        { value: 'family', label: 'Family', color: 'text-purple-600' },
                                    ].map(plan => (
                                        <label key={plan.value} className="flex items-center gap-2.5 cursor-pointer">
                                            <input type="checkbox" checked={accessiblePlans.includes(plan.value)}
                                                onChange={() => togglePlan(plan.value)}
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className={`text-sm font-semibold ${plan.color}`}>{plan.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* B2B Plans */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">B2B Organisation Plans</p>
                                <div className="space-y-2.5">
                                    {[
                                        { value: 'trial', label: 'Trial', color: 'text-amber-600' },
                                        { value: 'standard', label: 'Standard', color: 'text-blue-600' },
                                        { value: 'growth', label: 'Growth', color: 'text-indigo-600' },
                                        { value: 'enterprise', label: 'Enterprise', color: 'text-purple-600' },
                                    ].map(plan => (
                                        <label key={plan.value} className="flex items-center gap-2.5 cursor-pointer">
                                            <input type="checkbox" checked={b2bAccessiblePlans.includes(plan.value)}
                                                onChange={() => toggleB2bPlan(plan.value)}
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className={`text-sm font-semibold ${plan.color}`}>{plan.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Enrollment toggle */}
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={enrollmentRequired}
                                    onChange={e => setEnrollmentRequired(e.target.checked)} className="sr-only peer" />
                                <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                            </label>
                            <div>
                                <p className="text-xs font-bold text-gray-700">Require Explicit Enrollment</p>
                                <p className="text-[11px] text-gray-400">Users must tap "Enroll" before accessing sessions.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── STEP 3: Review ── */}
                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="text-center py-6 bg-blue-50/30 rounded-2xl border border-blue-100">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                                <Send size={24} className="ml-0.5" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Review & Save</h3>
                            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">Check your programme details before saving or publishing.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Title', value: title || 'Untitled', icon: <FileText size={16} />, color: 'blue' },
                                { label: 'Category', value: CATEGORIES.find(c => c.value === category)?.label || category, icon: <Target size={16} />, color: 'purple' },
                                { label: 'Modules', value: `${modules.length} module${modules.length !== 1 ? 's' : ''}`, icon: <BookOpen size={16} />, color: 'indigo' },
                                { label: 'Duration', value: `${durationWeeks}w · ${totalSessions} sessions`, icon: <Calendar size={16} />, color: 'green' },
                                { label: 'Price', value: parseFloat(price) > 0 ? `₹${parseFloat(price).toLocaleString('en-IN')}` : 'Free', icon: <DollarSign size={16} />, color: 'amber' },
                                { label: 'Status', value: status.replace(/_/g, ' '), icon: <Settings size={16} />, color: status === 'published' ? 'green' : 'gray' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div className={`w-9 h-9 rounded-xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center shrink-0`}>{item.icon}</div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                                        <p className="text-sm font-bold text-gray-800 capitalize">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {coverPreview && (
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cover Image</p>
                                <div className="rounded-xl overflow-hidden border border-gray-100" style={{ height: 120 }}>
                                    <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
                <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    <ChevronLeft size={16} /> Previous
                </button>

                <div className="flex gap-3">
                    {step < STEPS.length - 1 ? (
                        <button onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
                            className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl shadow-sm transition-all">
                            Next <ChevronRight size={16} />
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button onClick={() => save(false)} disabled={saving}
                                className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-all">
                                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Draft
                            </button>
                            <button onClick={() => save(true)} disabled={saving}
                                className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm disabled:opacity-50 transition-all">
                                {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Publish Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProgrammeBuilder;
