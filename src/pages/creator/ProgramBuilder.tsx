import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, UploadCloud, Video, FileText, Calendar, Clock, DollarSign, AlignLeft, Target, Upload, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STEPS = ['Program Details', 'Content Upload', 'Live Sessions', 'Review & Submit'];

const ProgramBuilder = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('0');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [modules, setModules] = useState<{ title: string, content: string, type: string }[]>([]);
    const [sessions, setSessions] = useState<{ title: string, duration: string, date: string }[]>([]);

    const addModule = () => {
        setModules([...modules, { title: 'New Module', content: '', type: 'video' }]);
    };

    const updateModule = (index: number, field: string, value: string) => {
        const newModules: any = [...modules];
        newModules[index][field] = value;
        setModules(newModules);
    };

    const addSession = () => {
        setSessions([...sessions, { title: 'Q&A Session', duration: '60', date: '' }]);
    };

    const updateSession = (index: number, field: string, value: string) => {
        const newSessions: any = [...sessions];
        newSessions[index][field] = value;
        setSessions(newSessions);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Mock API Call - Replace with real endpoint
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Actual API Call would look like:
            // await axios.post('/api/creator/programs', { title, price, description, category, modules, sessions }, { headers: { Authorization: `Bearer ${token}` } });

            navigate('/creator/dashboard');
        } catch (err) {
            console.error('Error submitting program for approval', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:max-w-[1000px] mx-auto pb-20">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Program Builder</h2>
                <p className="text-gray-500 mt-1">Create your content package and submit it for platform approval.</p>
            </div>

            {/* Step Progress Bar */}
            <div className="mb-10 relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
                <div className="absolute top-1/2 left-0 h-1 bg-pink-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}></div>
                <div className="flex justify-between relative z-10">
                    {STEPS.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-4 
                                ${idx < currentStep ? 'bg-pink-600 border-white text-white' :
                                    idx === currentStep ? 'bg-white border-pink-600 text-pink-600 shadow-md shadow-pink-200/50' :
                                        'bg-white border-gray-200 text-gray-400'}`}>
                                {idx < currentStep ? <Check size={18} /> : idx + 1}
                            </div>
                            <span className={`text-xs font-semibold mt-2 ${idx <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>{step}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 min-h-[400px]">

                {/* STEP 1: Details */}
                {currentStep === 0 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><AlignLeft size={20} /></div>
                            <h3 className="text-lg font-bold text-gray-900">Define Your Program</h3>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Program Title</label>
                                <input className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-shadow bg-gray-50/50 focus:bg-white"
                                    placeholder="e.g. 12-Week Transformative Yoga"
                                    value={title} onChange={e => setTitle(e.target.value)} required />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2"><Target size={14} className="text-gray-400" /> Category</label>
                                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-shadow bg-gray-50/50 focus:bg-white text-gray-700"
                                        value={category} onChange={e => setCategory(e.target.value)}>
                                        <option value="">Select Category</option>
                                        <option value="fitness">Fitness & Movement</option>
                                        <option value="nutrition">Nutrition & Diet</option>
                                        <option value="mental_wellness">Mental Wellness</option>
                                        <option value="chronic_care">Chronic Disease Management</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2"><DollarSign size={14} className="text-gray-400" /> Price (₹)</label>
                                    <input type="number" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-shadow bg-gray-50/50 focus:bg-white"
                                        placeholder="0.00"
                                        value={price} onChange={e => setPrice(e.target.value)} required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2"><AlignLeft size={14} className="text-gray-400" /> Full Description</label>
                                <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-shadow bg-gray-50/50 focus:bg-white min-h-[120px] resize-none"
                                    placeholder="Describe the outcomes and curriculum of your program..."
                                    value={description} onChange={e => setDescription(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: Content Modules */}
                {currentStep === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><UploadCloud size={20} /></div>
                                <h3 className="text-lg font-bold text-gray-900">Upload Content Modules</h3>
                            </div>
                            <Button onClick={addModule} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                                <PlusCircle size={16} className="mr-2" /> Add Module
                            </Button>
                        </div>

                        {modules.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                                <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500 font-medium">1</div>
                                <p className="font-semibold text-gray-700">No modules yet</p>
                                <p className="text-sm text-gray-500 mt-1 mb-4">Break your program into digestible weeks or topics.</p>
                                <Button onClick={addModule} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">Create First Module</Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {modules.map((mod, idx) => (
                                    <div key={idx} className="border border-gray-200 p-5 rounded-2xl bg-white shadow-sm hover:border-blue-300 transition-colors group">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold relative shrink-0">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <div className="flex gap-3">
                                                    <input className="flex-1 border-b border-gray-200 px-1 py-1 outline-none focus:border-blue-500 bg-transparent font-semibold text-gray-900 placeholder:font-normal placeholder:text-gray-400"
                                                        placeholder="Module Title (e.g. Week 1: Foundations)"
                                                        value={mod.title} onChange={e => updateModule(idx, 'title', e.target.value)} />
                                                    <select className="border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold text-gray-600 outline-none w-32 focus:border-blue-500 bg-gray-50"
                                                        value={mod.type} onChange={e => updateModule(idx, 'type', e.target.value)}>
                                                        <option value="video">Video</option>
                                                        <option value="article">Article</option>
                                                        <option value="pdf">PDF Resource</option>
                                                    </select>
                                                </div>

                                                {mod.type === 'video' ? (
                                                    <div className="relative">
                                                        <Video size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2 outline-none focus:border-blue-500 text-sm bg-gray-50/50"
                                                            placeholder="Paste Video URL (YouTube, Vimeo, Mux)"
                                                            value={mod.content} onChange={e => updateModule(idx, 'content', e.target.value)} />
                                                    </div>
                                                ) : (
                                                    <textarea className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 text-sm bg-gray-50/50 resize-none min-h-[80px]"
                                                        placeholder="Write or Paste your article content here..."
                                                        value={mod.content} onChange={e => updateModule(idx, 'content', e.target.value)} />
                                                )}
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
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Calendar size={20} /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Schedule Live Sessions</h3>
                                    <p className="text-sm text-gray-500">Optional cohort kick-offs or Q&A syncs.</p>
                                </div>
                            </div>
                            <Button onClick={addSession} variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                                <PlusCircle size={16} className="mr-2" /> Schedule Session
                            </Button>
                        </div>

                        {sessions.length === 0 ? (
                            <div className="text-center py-10 rounded-2xl bg-purple-50/30 border border-purple-100">
                                <p className="text-sm text-purple-600 font-medium">No live sessions scheduled. This will be a standard async program.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {sessions.map((sess, idx) => (
                                    <div key={idx} className="border border-purple-100 p-5 rounded-2xl bg-white shadow-sm flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                                            <Video className="text-purple-600 w-5 h-5" />
                                        </div>
                                        <div className="flex-1 grid grid-cols-12 gap-3">
                                            <div className="col-span-12 md:col-span-5">
                                                <input className="w-full border-b border-gray-200 px-2 py-1 outline-none focus:border-purple-500 font-semibold text-gray-900"
                                                    placeholder="Session Topic (e.g. Week 1 Check-in)"
                                                    value={sess.title} onChange={e => updateSession(idx, 'title', e.target.value)} />
                                            </div>
                                            <div className="col-span-6 md:col-span-4 relative">
                                                <Calendar size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type="datetime-local" className="w-full border border-gray-200 rounded-lg pl-8 pr-2 py-1.5 outline-none focus:border-purple-500 text-sm"
                                                    value={sess.date} onChange={e => updateSession(idx, 'date', e.target.value)} />
                                            </div>
                                            <div className="col-span-6 md:col-span-3 relative">
                                                <Clock size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type="number" className="w-full border border-gray-200 rounded-lg pl-8 pr-2 py-1.5 outline-none focus:border-purple-500 text-sm"
                                                    placeholder="Duration (mins)"
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
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                                <Upload size={28} className="ml-0.5" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Ready for Review</h3>
                            <p className="text-gray-500 mt-2 max-w-sm mx-auto text-sm">Your program will be submitted to Super Admins. Once approved, it will be published to the mobile app.</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 space-y-3 max-w-lg mx-auto border border-gray-200/60">
                            <div className="flex justify-between border-b border-gray-200 pb-3">
                                <span className="text-sm font-semibold text-gray-500">Program Title</span>
                                <span className="text-sm font-bold text-gray-900">{title || 'Untitled'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 py-3">
                                <span className="text-sm font-semibold text-gray-500">Content Count</span>
                                <span className="text-sm font-bold text-gray-900">{modules.length} Modules</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 py-3">
                                <span className="text-sm font-semibold text-gray-500">Live Sessions</span>
                                <span className="text-sm font-bold text-gray-900">{sessions.length} Scheduled</span>
                            </div>
                            <div className="flex justify-between pt-3">
                                <span className="text-sm font-semibold text-gray-500">Approval Workflow</span>
                                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wide">Pending Review</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200">
                <Button
                    variant="ghost"
                    className="text-gray-500 hover:text-gray-900"
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    disabled={currentStep === 0 || loading}
                >
                    Back
                </Button>

                {currentStep < STEPS.length - 1 ? (
                    <Button
                        onClick={() => setCurrentStep(prev => Math.min(STEPS.length - 1, prev + 1))}
                        className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl px-8"
                    >
                        Save & Continue <ChevronRight size={16} className="ml-2" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-8 font-bold shadow-lg shadow-green-600/20"
                    >
                        {loading ? 'Submitting...' : 'Submit to Super Admin'} <Check size={18} className="ml-2" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ProgramBuilder;
