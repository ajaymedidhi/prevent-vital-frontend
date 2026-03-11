import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Check, ChevronRight, UploadCloud, Video, FileText,
    Calendar, Clock, DollarSign, AlignLeft, Target,
    Upload, PlusCircle, Trash2, Loader2, Save, BookOpen, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import creatorApi from '../../admin-shared/services/creatorApi';
import toast from 'react-hot-toast';

const STEPS = ['Program Details', 'Content Upload', 'Live Sessions', 'Review & Submit'];

const ProgramBuilder = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('edit');

    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('0');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [modules, setModules] = useState<{ title: string, content: string, type: string, duration?: string }[]>([]);
    const [sessions, setSessions] = useState<{ title: string, duration: string, date: string }[]>([]);

    useEffect(() => {
        if (editId) {
            const fetchProgram = async () => {
                setFetching(true);
                try {
                    const res = await creatorApi.get(`/programs`);
                    const prog = res.data?.programs?.find((p: any) => p._id === editId);
                    if (prog) {
                        setTitle(prog.title || '');
                        setPrice(prog.price?.toString() || '0');
                        setDescription(prog.description || '');
                        setCategory(prog.category || '');
                        setModules(prog.modules?.map((m: any) => ({
                            title: m.title,
                            content: m.content,
                            type: m.contentType,
                            duration: m.duration?.toString()
                        })) || []);
                        setSessions(prog.sessions?.map((s: any) => ({
                            title: s.title,
                            duration: s.duration?.toString(),
                            date: s.date ? new Date(s.date).toISOString().slice(0, 16) : ''
                        })) || []);
                    }
                } catch (err) {
                    toast.error('Failed to load program for editing.');
                } finally {
                    setFetching(false);
                }
            };
            fetchProgram();
        }
    }, [editId]);

    const addModule = () => {
        setModules([...modules, { title: '', content: '', type: 'video', duration: '10' }]);
    };

    const removeModule = (idx: number) => {
        setModules(modules.filter((_, i) => i !== idx));
    };

    const updateModule = (index: number, field: string, value: string) => {
        const newModules: any = [...modules];
        newModules[index][field] = value;
        setModules(newModules);
    };

    const addSession = () => {
        setSessions([...sessions, { title: '', duration: '60', date: '' }]);
    };

    const removeSession = (idx: number) => {
        setSessions(sessions.filter((_, i) => i !== idx));
    };

    const updateSession = (index: number, field: string, value: string) => {
        const newSessions: any = [...sessions];
        newSessions[index][field] = value;
        setSessions(newSessions);
    };

    const handleSubmit = async (submitForApproval = false) => {
        if (!title.trim() || !category) {
            setCurrentStep(0);
            toast.error('Please fill in program title and category.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                title,
                price: parseFloat(price),
                description,
                category,
                modules: modules.map((m, i) => ({
                    title: m.title,
                    content: m.content,
                    contentType: m.type,
                    duration: parseInt(m.duration || '0'),
                    order: i
                })),
                sessions: sessions.map(s => ({
                    title: s.title,
                    date: s.date,
                    duration: parseInt(s.duration || '0')
                })),
                status: submitForApproval ? 'pending_approval' : 'draft'
            };

            if (editId) {
                await creatorApi.patch(`/programs/${editId}`, payload);
            } else {
                await creatorApi.post('/programs', payload);
            }

            toast.success(submitForApproval ? 'Program submitted for approval!' : 'Program saved as draft.');
            navigate('/creator/dashboard');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to save program.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <Loader2 className="w-10 h-10 text-pink-600 animate-spin" />
            <p className="text-gray-500 font-medium">Loading program details...</p>
        </div>
    );

    return (
        <div className="lg:max-w-[1000px] mx-auto pb-20 animate-in fade-in duration-500">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{editId ? 'Edit Program' : 'Program Builder'}</h2>
                    <p className="text-gray-500 mt-1">Design your curriculum and manage enrollment details.</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => handleSubmit(false)} variant="outline" disabled={loading} className="rounded-xl border-gray-200">
                        <Save size={16} className="mr-2" /> SAVE DRAFT
                    </Button>
                </div>
            </div>

            {/* Step Progress Bar */}
            <div className="mb-10 relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200/50 -z-10 -translate-y-1/2 rounded-full"></div>
                <div className="absolute top-1/2 left-0 h-1 bg-pink-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}></div>
                <div className="flex justify-between relative z-10">
                    {STEPS.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center group cursor-pointer" onClick={() => setCurrentStep(idx)}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-4 
                                ${idx < currentStep ? 'bg-pink-600 border-white text-white scale-90' :
                                    idx === currentStep ? 'bg-white border-pink-600 text-pink-600 shadow-lg shadow-pink-200/50 scale-110' :
                                        'bg-white border-gray-100 text-gray-300'}`}>
                                {idx < currentStep ? <Check size={18} /> : idx + 1}
                            </div>
                            <span className={`text-[10px] uppercase tracking-widest font-black mt-3 transition-colors ${idx <= currentStep ? 'text-gray-900' : 'text-gray-300'}`}>{step.split(' ')[0]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/40 border border-gray-100 p-8 min-h-[450px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50/30 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>

                {/* STEP 1: Details */}
                {currentStep === 0 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"><AlignLeft size={24} /></div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900">Program Essentials</h3>
                                <p className="text-sm text-gray-500">Set the foundation for your content.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="group">
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-pink-600 transition-colors">Program Identity</label>
                                <input className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-500 bg-gray-50/30 focus:bg-white transition-all text-lg font-bold placeholder:font-medium placeholder:text-gray-300"
                                    placeholder="e.g. 12-Week Transformative Yoga Flow"
                                    value={title} onChange={e => setTitle(e.target.value)} required />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Target size={14} /> Category</label>
                                    <select className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-500 bg-gray-50/30 focus:bg-white transition-all font-bold text-gray-700"
                                        value={category} onChange={e => setCategory(e.target.value)}>
                                        <option value="">Select Category</option>
                                        <option value="fitness">Fitness & Movement</option>
                                        <option value="nutrition">Nutrition & Diet</option>
                                        <option value="mental_wellness">Mental Wellness</option>
                                        <option value="chronic_care">Chronic Disease Management</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2"><DollarSign size={14} /> Enrollment Fee (₹)</label>
                                    <input type="number" className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-500 bg-gray-50/30 focus:bg-white transition-all font-bold"
                                        placeholder="0.00"
                                        value={price} onChange={e => setPrice(e.target.value)} required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2"><FileText size={14} /> Curriculum Overview</label>
                                <textarea className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-pink-500 bg-gray-50/30 focus:bg-white transition-all min-h-[150px] resize-none font-medium leading-relaxed"
                                    placeholder="Provide a compelling description of what students will achieve..."
                                    value={description} onChange={e => setDescription(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: Content Modules */}
                {currentStep === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"><UploadCloud size={24} /></div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900">Curriculum Modules</h3>
                                    <p className="text-sm text-gray-500">Add videos, articles, or resources.</p>
                                </div>
                            </div>
                            <Button onClick={addModule} variant="outline" className="rounded-xl border-blue-200 text-blue-700 hover:bg-blue-50 font-bold h-11 px-6">
                                <PlusCircle size={18} className="mr-2" /> ADD CHAPTER
                            </Button>
                        </div>

                        {modules.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-[28px] border-2 border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100 text-blue-100"><BookOpen size={40} /></div>
                                <h4 className="font-bold text-gray-900 text-lg">Empty Curriculum</h4>
                                <p className="text-sm text-gray-500 mt-2 max-w-xs text-center mb-8">Structure your course into modules or weeks to help students progress.</p>
                                <Button onClick={addModule} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-10 h-12 font-bold">Start Building</Button>
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {modules.map((mod, idx) => (
                                    <div key={idx} className="group border-2 border-gray-100 p-6 rounded-[24px] bg-white transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 relative">
                                        <button onClick={() => removeModule(idx)} className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                                        <div className="flex gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg shrink-0">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="flex-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Title</label>
                                                        <input className="w-full border-b-2 border-gray-100 px-0 py-2 outline-none focus:border-blue-500 bg-transparent font-bold text-gray-900"
                                                            placeholder="e.g. Introduction to Mindful Breathing"
                                                            value={mod.title} onChange={e => updateModule(idx, 'title', e.target.value)} />
                                                    </div>
                                                    <div className="w-full md:w-40">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Type</label>
                                                        <select className="w-full border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-600 outline-none focus:border-blue-500 bg-gray-50/50"
                                                            value={mod.type} onChange={e => updateModule(idx, 'type', e.target.value)}>
                                                            <option value="video">Video</option>
                                                            <option value="article">Article</option>
                                                            <option value="pdf">PDF Resource</option>
                                                        </select>
                                                    </div>
                                                    <div className="w-full md:w-32">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Mins</label>
                                                        <input type="number" className="w-full border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-blue-500 bg-gray-50/50"
                                                            value={mod.duration} onChange={e => updateModule(idx, 'duration', e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    {mod.type === 'video' ? (
                                                        <>
                                                            <Video size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                                                            <input className="w-full border-2 border-gray-50 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-blue-200 text-sm bg-gray-50/30 font-medium"
                                                                placeholder="Paste direct link (Vimeo, YouTube, AWS S3)..."
                                                                value={mod.content} onChange={e => updateModule(idx, 'content', e.target.value)} />
                                                        </>
                                                    ) : (
                                                        <textarea className="w-full border-2 border-gray-50 rounded-2xl p-4 outline-none focus:border-blue-200 text-sm bg-gray-50/30 font-medium min-h-[100px] resize-none"
                                                            placeholder="Enter content or paste document link..."
                                                            value={mod.content} onChange={e => updateModule(idx, 'content', e.target.value)} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 3: Live Sessions */}
                {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"><Calendar size={24} /></div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900">Virtual Classes</h3>
                                    <p className="text-sm text-gray-500">Scheduled live interactions for this cohort.</p>
                                </div>
                            </div>
                            <Button onClick={addSession} variant="outline" className="rounded-xl border-purple-200 text-purple-700 hover:bg-purple-50 font-bold h-11 px-6">
                                <Video size={18} className="mr-2" /> NEW SESSION
                            </Button>
                        </div>

                        {sessions.length === 0 ? (
                            <div className="bg-purple-50/20 rounded-[28px] border border-purple-100 p-8 text-center">
                                <p className="text-sm text-purple-600/70 font-bold uppercase tracking-wider">Note: This is an asynchronous self-paced program.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                                {sessions.map((sess, idx) => (
                                    <div key={idx} className="group border-2 border-gray-100 p-6 rounded-[24px] bg-white flex flex-col md:flex-row items-center gap-6 relative hover:border-purple-200 hover:shadow-lg transition-all">
                                        <button onClick={() => removeSession(idx)} className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                                        <div className="w-14 h-14 rounded-full bg-purple-50 border-2 border-purple-100 flex items-center justify-center shrink-0 text-purple-600 shadow-sm">
                                            <Video size={24} />
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
                                            <div className="md:col-span-6">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Topic</label>
                                                <input className="w-full border-b-2 border-gray-100 px-0 py-2 outline-none focus:border-purple-500 bg-transparent font-bold text-gray-900"
                                                    placeholder="e.g. Cohort Orientation & Q&A"
                                                    value={sess.title} onChange={e => updateSession(idx, 'title', e.target.value)} />
                                            </div>
                                            <div className="md:col-span-4 relative">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Date & Time</label>
                                                <input type="datetime-local" className="w-full border-2 border-gray-50 rounded-xl px-4 py-2.5 outline-none focus:border-purple-500 text-sm font-bold bg-gray-50/30"
                                                    value={sess.date} onChange={e => updateSession(idx, 'date', e.target.value)} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Dur (Min)</label>
                                                <input type="number" className="w-full border-2 border-gray-50 rounded-xl px-4 py-2.5 outline-none focus:border-purple-500 text-sm font-bold bg-gray-50/30"
                                                    value={sess.duration} onChange={e => updateSession(idx, 'duration', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 4: Review */}
                {currentStep === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="text-center bg-green-50/30 py-10 rounded-[40px] border border-green-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/50 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200 border-4 border-white animate-bounce-subtle">
                                <Send size={32} className="ml-1" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900">Submission Preview</h3>
                            <p className="text-gray-500 mt-2 max-w-sm mx-auto font-medium">Please review your program before sending it to the moderation team.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            {[
                                { label: 'Title', value: title || 'Untitled Program', icon: <FileText size={16} />, color: 'blue' },
                                { label: 'Modules', value: `${modules.length} Chapters`, icon: <BookOpen size={16} />, color: 'pink' },
                                { label: 'Live Sessions', value: `${sessions.length} Scheduled`, icon: <Calendar size={16} />, color: 'purple' },
                                { label: 'Enrollment Fee', value: `₹${parseFloat(price).toLocaleString()}`, icon: <DollarSign size={16} />, color: 'amber' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center gap-4 shadow-sm">
                                    <div className={`w-10 h-10 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center shrink-0`}>{item.icon}</div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                                        <p className="text-sm font-black text-gray-900">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-4 pt-4">
                            <p className="text-xs text-gray-400 text-center max-w-xs uppercase tracking-tighter font-black">By submitting, you agree to platform guidelines and content standards.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between mt-10 pt-6">
                <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-gray-900 font-bold rounded-xl h-12 px-6"
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    disabled={currentStep === 0 || loading}
                >
                    PREVIOUS
                </Button>

                <div className="flex gap-4">
                    {currentStep < STEPS.length - 1 ? (
                        <Button
                            onClick={() => setCurrentStep(prev => Math.min(STEPS.length - 1, prev + 1))}
                            className="bg-gray-900 hover:bg-black text-white rounded-2xl px-12 h-14 font-black tracking-widest shadow-xl shadow-gray-200 transition-all hover:translate-y-[-2px] active:scale-95"
                        >
                            NEXT STEP <ChevronRight size={18} className="ml-2" />
                        </Button>
                    ) : (
                        <div className="flex gap-4">
                            <Button
                                onClick={() => handleSubmit(false)}
                                disabled={loading}
                                variant="outline"
                                className="border-2 border-gray-200 text-gray-700 rounded-2xl px-8 h-14 font-black tracking-widest hover:bg-gray-50"
                            >
                                <Save size={20} className="mr-2" /> SAVE DRAFT
                            </Button>
                            <Button
                                onClick={() => handleSubmit(true)}
                                disabled={loading}
                                className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-2xl px-12 h-14 font-black tracking-widest shadow-xl shadow-pink-200 transition-all hover:translate-y-[-2px] active:scale-95"
                            >
                                {loading ? <Loader2 size={24} className="animate-spin" /> : <>SUBMIT FOR APPROVAL <Check size={20} className="ml-2" /></>}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProgramBuilder;
