import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setCredentials } from '../../store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    HeartPulse, PlayCircle, ShieldCheck, ChevronRight, Activity,
    TrendingUp, Home, ShoppingBag, Settings, Star, Zap,
    LogOut, User, Bell, Search, Plus, Play, Info, Lock,
    Clock, BookOpen, Crown, Loader2, Filter
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CustomerOrders from './Orders';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CustomerDashboard = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'home';
    const setActiveTab = (tab: string) => setSearchParams({ tab });

    const [selectedVideo, setSelectedVideo] = useState<any>(null);
    const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);

    // Programs state
    const [livePrograms, setLivePrograms] = useState<any[]>([]);
    const [programsLoading, setProgramsLoading] = useState(false);
    const [progSearch, setProgSearch] = useState('');
    const [progCat, setProgCat] = useState('all');
    const [selectedProgram, setSelectedProgram] = useState<any>(null);
    const [enrolling, setEnrolling] = useState<string | null>(null);
    const [stats, setStats] = useState<any>(null);
    const [assessmentHistory, setAssessmentHistory] = useState<any[]>([]); // New State
    const [loading, setLoading] = useState(false); // Added loading state

    const [activeProgram, setActiveProgram] = useState<any>(null);
    const [activeSession, setActiveSession] = useState(0);
    const [completedSessions, setCompletedSessions] = useState<number[]>([]);

    const userPlan = (user as any)?.subscription?.plan || 'free';

    const PLAN_COLORS: Record<string, string> = {
        free: 'bg-gray-100 text-gray-600',
        silver: 'bg-blue-100 text-blue-700',
        gold: 'bg-amber-100 text-amber-700',
        platinum: 'bg-purple-100 text-purple-700'
    };

    const CAT_EMOJI: Record<string, string> = {
        hypertension: '🫀', diabetes: '🩸', cardiac: '❤️', stress: '🧠', sleep: '😴',
        fitness: '💪', nutrition: '🥗', metabolic: '🔬', cardiovascular: '🫁',
        respiratory: '🌬️', mental: '🧘', musculoskeletal: '🦴', preventive: '🛡️',
    };

    const vitalForm_init = {
        bloodPressureSys: '',
        bloodPressureDia: '',
        heartRate: '',
        glucose: '',
        spo2: '',
        weight: ''
    };
    const [vitalForm, setVitalForm] = useState(vitalForm_init);

    const handleVitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVitalForm({ ...vitalForm, [e.target.name]: e.target.value });
    };

    const handleVitalSubmit = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const payload: any = {};
            if (vitalForm.bloodPressureSys && vitalForm.bloodPressureDia) {
                payload.bloodPressure = {
                    systolic: parseInt(vitalForm.bloodPressureSys),
                    diastolic: parseInt(vitalForm.bloodPressureDia)
                };
            }
            if (vitalForm.heartRate) payload.heartRate = parseInt(vitalForm.heartRate);
            if (vitalForm.glucose) payload.glucose = parseInt(vitalForm.glucose);
            if (vitalForm.spo2) payload.spo2 = parseInt(vitalForm.spo2);
            if (vitalForm.weight) payload.weight = parseFloat(vitalForm.weight);

            const res = await axios.post('/api/vitals', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.status === 'success') {
                const updatedUser = res.data.data.user;
                if (res.data.data.vitalScore) {
                    (updatedUser as any).vitalScore = res.data.data.vitalScore;
                }
                dispatch(setCredentials({ user: updatedUser, token }));
                setIsVitalsModalOpen(false);
                setVitalForm({
                    bloodPressureSys: '',
                    bloodPressureDia: '',
                    heartRate: '',
                    glucose: '',
                    spo2: '',
                    weight: ''
                });
            }
        } catch (err) {
            console.error("Failed to log vitals", err);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) return;
                const res = await axios.get('/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.data.user) {
                    const userData = res.data.data.user;
                    if (res.data.data.vitalScore) {
                        (userData as any).vitalScore = res.data.data.vitalScore;
                    }
                    dispatch(setCredentials({ user: userData, token }));
                }
            } catch (err) {
                console.error("Failed to sync profile", err);
            }
        };
        fetchProfile();
    }, [dispatch]);

    // Fetch programmes and assessment history from API
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setLoading(true);
            const token = sessionStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // Fetch live programs if tab is 'programs' or 'home'
                if (activeTab === 'programs' || activeTab === 'home') {
                    const progRes = await axios.get('/api/programs?limit=50', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setLivePrograms(progRes.data?.data?.programs || []);
                    setCompletedSessions((user as any)?.completedSessions || []);
                }

                // Fetch Assessment History when on 'home' tab
                if (activeTab === 'home') {
                    try {
                        const assessRes = await axios.get('/api/vitals/assessments', {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        setAssessmentHistory(assessRes.data?.data?.assessments || []);
                    } catch (err) {
                        console.error('Failed to fetch assessment history:', err);
                    }
                }

            } catch (err: any) {
                console.error('Dashboard error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [activeTab, user, dispatch]); // Added user and dispatch to dependencies

    const handleEnroll = async (programId: string) => {
        setEnrolling(programId);
        try {
            const token = sessionStorage.getItem('token');
            const res = await axios.post(`/api/programs/${programId}/enroll`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Refresh programs to update enrollment status
            const refreshRes = await axios.get('/api/programs?limit=50', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLivePrograms(refreshRes.data?.data?.programs || []);
        } catch (err: any) {
            console.error('Enrollment failed', err);
        }
        setEnrolling(null);
    };

    // ── Recommended Programs with YouTube Sessions (Demo for investors) ──
    const recommendedPrograms = [
        {
            id: 'rp-1',
            title: 'Guided Meditation',
            category: 'Mindfulness',
            emoji: '🧘',
            color: 'from-purple-500 to-indigo-600',
            bgLight: 'bg-purple-50',
            textColor: 'text-purple-600',
            description: 'Calm your mind with guided meditation sessions for stress relief and mental clarity.',
            duration: '4 weeks',
            difficulty: 'Beginner',
            sessions: [
                { title: '10-Minute Morning Meditation', duration: '10 min', videoId: 'inpok4MKVLM', thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&auto=format&fit=crop' },
                { title: 'Deep Sleep Meditation', duration: '20 min', videoId: 'aEqlQvczMJQ', thumbnail: 'https://images.unsplash.com/photo-1515894203077-9cd36032142f?w=400&auto=format&fit=crop' },
                { title: 'Stress Relief Body Scan', duration: '15 min', videoId: 'MIr3RsUWrdo', thumbnail: 'https://images.unsplash.com/photo-1544367563-eab5cbaf1dfe?w=400&auto=format&fit=crop' },
            ]
        },
        {
            id: 'rp-2',
            title: 'Pranayam Breathing',
            category: 'Breathing',
            emoji: '🌬️',
            color: 'from-teal-500 to-cyan-600',
            bgLight: 'bg-teal-50',
            textColor: 'text-teal-600',
            description: 'Ancient breathing techniques to boost oxygen levels, reduce anxiety, and improve lung function.',
            duration: '3 weeks',
            difficulty: 'Beginner',
            sessions: [
                { title: 'Anulom Vilom for Beginners', duration: '12 min', videoId: '8VwufJrUhic', thumbnail: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=400&auto=format&fit=crop' },
                { title: 'Kapalbhati Pranayam', duration: '10 min', videoId: 'DcUjhJTmHbg', thumbnail: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&auto=format&fit=crop' },
                { title: 'Bhramari (Bee Breath)', duration: '8 min', videoId: 'hJD0uFnylQo', thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop' },
            ]
        },
        {
            id: 'rp-3',
            title: 'Morning Exercise',
            category: 'Fitness',
            emoji: '💪',
            color: 'from-orange-500 to-red-500',
            bgLight: 'bg-orange-50',
            textColor: 'text-orange-600',
            description: 'Start your day with energizing workouts that improve cardiovascular health and build strength.',
            duration: '6 weeks',
            difficulty: 'Intermediate',
            sessions: [
                { title: '15-Min Full Body Workout', duration: '15 min', videoId: 'UBMk30rjy0o', thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop' },
                { title: 'Cardio HIIT for Heart Health', duration: '20 min', videoId: 'ml6cT4AZdqI', thumbnail: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&auto=format&fit=crop' },
                { title: 'Core Strength for Beginners', duration: '12 min', videoId: 'AnYl6Nmu9Qo', thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&auto=format&fit=crop' },
            ]
        },
        {
            id: 'rp-4',
            title: 'Yoga for Health',
            category: 'Yoga',
            emoji: '🧎',
            color: 'from-emerald-500 to-green-600',
            bgLight: 'bg-emerald-50',
            textColor: 'text-emerald-600',
            description: 'Holistic yoga practices combining asanas with breathing to improve flexibility and inner peace.',
            duration: '8 weeks',
            difficulty: 'All Levels',
            sessions: [
                { title: 'Sun Salutation (Surya Namaskar)', duration: '15 min', videoId: 'klmBssEYkdU', thumbnail: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?w=400&auto=format&fit=crop' },
                { title: 'Yoga for Back Pain Relief', duration: '20 min', videoId: 'XeXz8fIZDCE', thumbnail: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&auto=format&fit=crop' },
                { title: 'Evening Relaxation Yoga', duration: '18 min', videoId: 'COp7BR_Dvps', thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&auto=format&fit=crop' },
            ]
        },
    ];

    const [activeRecProgram, setActiveRecProgram] = useState<string | null>(null);



    const products = [
        { id: 1, name: 'Premium Heart Kit', price: '₹4,999', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80' },
        { id: 2, name: 'VITA Supplements', price: '₹1,299', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80' },
    ];

    const renderHome = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Super Admin Style Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[28px] p-8 shadow-xl text-white">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
                            <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Live Health Console</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-[800] mb-2 font-serif tracking-tight">
                        Welcome back, {user?.name?.split(' ')[0] || 'Member'}!
                    </h1>
                    <p className="text-blue-100 text-sm opacity-90 max-w-md leading-relaxed">
                        Your health telemetry is stable. You've maintained a <span className="text-white font-bold">{(user as any)?.gamification?.streaks?.current || 0}-day streak</span>.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-8">
                        <Button
                            onClick={() => navigate('/ai-health-assessment')}
                            className="bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl px-6"
                        >
                            <ShieldCheck className="mr-2 h-4 w-4" /> Run AI Assessment
                        </Button>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
            </div>

            {/* Metric Row - Super Admin Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Live Vitals */}
                <Card className="rounded-[22px] border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden bg-white">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Activity className="w-6 h-6" />
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setIsVitalsModalOpen(true)} className="text-blue-600 font-bold text-xs hover:bg-blue-50">
                                <Plus className="w-3 h-3 mr-1" /> Log
                            </Button>
                        </div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Telemetry Status</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 font-bold text-xl">{(user as any)?.latestVitals?.heartRate || '--'} <span className="text-xs text-gray-400 font-medium">BPM</span></span>
                                <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Optimal</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">BP</p>
                                    <p className="text-sm font-bold text-gray-900">
                                        {(user as any)?.latestVitals?.bloodPressure?.systolic || '--'}/{(user as any)?.latestVitals?.bloodPressure?.diastolic || '--'}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">SpO2</p>
                                    <p className="text-sm font-bold text-gray-900">{(user as any)?.latestVitals?.spo2 || '--'}%</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* AI Safety Score - Gauge Style */}
                <Card className="rounded-[22px] border-gray-100 shadow-sm hover:shadow-md transition-all bg-white relative overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-lg uppercase tracking-wider">AI Scanned</span>
                        </div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Safety Score</h3>

                        {(user as any)?.vitalScore ? (
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-4xl font-black text-gray-900">{(user as any).vitalScore.score}</span>
                                    <span className="text-xs font-bold text-gray-400 capitalize">/ 100 — {(user as any).vitalScore.status.label}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                                        style={{ width: `${(user as any).vitalScore.score}%` }}
                                    ></div>
                                </div>
                                <p className="mt-4 text-[11px] text-gray-500 italic bg-gray-50 p-2 rounded-lg border border-dashed border-gray-200">
                                    "{(user as any).vitalScore.recommendations?.[0]?.message || 'Keep monitoring for better insights.'}"
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-4 text-center">
                                <p className="text-xs text-gray-400 mb-4">Complete your assessment to unlock your safety score.</p>
                                <Button size="sm" className="bg-purple-600 rounded-lg text-xs font-bold">Start Now</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Wellness Journey */}
                <Card className="rounded-[22px] border-gray-100 shadow-sm hover:shadow-md transition-all bg-white">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-black text-amber-600">{(user as any)?.gamification?.points || 0} <span className="text-[10px] text-gray-400">XP</span></p>
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Wellness Journey</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-3 bg-amber-50/50 rounded-2xl border border-amber-100">
                                <span className="block text-xl font-bold text-gray-900">{(user as any)?.gamification?.streaks?.current || 0}</span>
                                <span className="text-[10px] font-bold text-amber-700 uppercase">Streak</span>
                            </div>
                            <div className="text-center p-3 bg-blue-50/50 rounded-2xl border border-blue-100">
                                <span className="block text-xl font-bold text-gray-900">12</span>
                                <span className="text-[10px] font-bold text-blue-700 uppercase">Badges</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* B2C Stats - Coming soon placeholder */}
                <Card className="rounded-[22px] border-dashed border-2 border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center p-6 text-center shadow-sm">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-700">Detailed Analytics</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Unlock comprehensive health insights by connecting your smartwatch.</p>
                </Card>
            </div>

            {/* AI Health Assessment History Panel */}
            <div className="mt-8">
                <div className="flex justify-between items-end mb-4 px-2">
                    <div>
                        <h2 className="text-xl font-black text-gray-900 font-serif">Assessment History</h2>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">AI Health Check Records</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/ai-health-assessment')} className="text-blue-600 font-bold hover:bg-blue-50">
                        Take Assessment <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>

                <Card className="rounded-[22px] border-gray-100 shadow-sm overflow-hidden bg-white">
                    <CardContent className="p-0">
                        {assessmentHistory.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 border border-blue-100/50">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">No Assessments Yet</h3>
                                <p className="text-sm text-gray-500 max-w-sm mt-2 mb-6">Take your first AI health assessment to establish your cardiovascular baseline and generate personalized insights.</p>
                                <Button onClick={() => navigate('/ai-health-assessment')} className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                                    Begin AI Assessment
                                </Button>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {assessmentHistory.map((assessment, idx) => {
                                    const date = new Date(assessment.completedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                                    const score = assessment.results?.cvitalScore || '--';
                                    const tierLabel = assessment.results?.cvitalTierDetails?.label || assessment.results?.cvitalTier || 'Unknown';
                                    const color = assessment.results?.cvitalTierDetails?.color || '#3b82f6';
                                    const ascvdRisk = assessment.results?.ascvdRisk || '--';

                                    return (
                                        <div key={assessment._id} className="p-5 hover:bg-gray-50/80 transition-colors flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-black/5"
                                                    style={{ backgroundColor: `${color}15`, color: color }}
                                                >
                                                    <HeartPulse className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-sm font-bold text-gray-900">CVITAL™ Score</h4>
                                                        <span
                                                            className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full"
                                                            style={{ backgroundColor: `${color}15`, color: color }}
                                                        >
                                                            {tierLabel}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" /> {date}
                                                        </span>
                                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                        <span>ASCVD Risk: <strong className="text-gray-700">{ascvdRisk !== '--' ? `${ascvdRisk}%` : 'N/A'}</strong></span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="text-right hidden sm:block">
                                                    <span className="text-2xl font-black" style={{ color: color }}>{score}</span>
                                                    <span className="text-gray-400 text-xs font-bold block -mt-1">/ 100</span>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Existing Health Modules sections... */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Health Modules */}
                <Card className="rounded-[22px] border-gray-100 shadow-sm hover:shadow-md transition-all bg-white">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                                <HeartPulse className="w-6 h-6" />
                            </div>
                            <Button variant="ghost" size="sm" className="text-blue-600 font-bold text-xs hover:bg-blue-50">
                                View All <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                        </div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Health Modules</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <p className="text-sm font-bold text-gray-900">Cardiovascular Health</p>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Activity className="w-4 h-4" />
                                </div>
                                <p className="text-sm font-bold text-gray-900">Metabolic Balance</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="rounded-[22px] border-gray-100 shadow-sm hover:shadow-md transition-all bg-white">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                                <Zap className="w-6 h-6" />
                            </div>
                            <Button variant="ghost" size="sm" className="text-blue-600 font-bold text-xs hover:bg-blue-50">
                                Customize <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                        </div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="rounded-xl h-auto py-3 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600">
                                <PlayCircle className="w-5 h-5 mb-1" />
                                <span className="text-xs font-bold">Start Program</span>
                            </Button>
                            <Button variant="outline" className="rounded-xl h-auto py-3 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600">
                                <HeartPulse className="w-5 h-5 mb-1" />
                                <span className="text-xs font-bold">Log Vitals</span>
                            </Button>
                            <Button variant="outline" className="rounded-xl h-auto py-3 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600">
                                <ShoppingBag className="w-5 h-5 mb-1" />
                                <span className="text-xs font-bold">Shop Products</span>
                            </Button>
                            <Button variant="outline" className="rounded-xl h-auto py-3 flex flex-col items-center justify-center text-gray-600 hover:text-blue-600">
                                <Settings className="w-5 h-5 mb-1" />
                                <span className="text-xs font-bold">Settings</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Premium Products */}
                <Card className="rounded-[22px] border-gray-100 shadow-sm hover:shadow-md transition-all bg-white">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <Button variant="ghost" size="sm" className="text-blue-600 font-bold text-xs hover:bg-blue-50">
                                View All <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                        </div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Premium Products</h3>
                        <div className="space-y-3">
                            {products.map(product => (
                                <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900">{product.name}</p>
                                        <p className="text-xs text-gray-500">{product.price}</p>
                                    </div>
                                    <Button size="sm" className="bg-blue-600 rounded-lg text-xs font-bold">Buy</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ── Recommended Programs for You ────────────────────────── */}
            <div className="pt-4">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="font-serif text-2xl font-black text-gray-900">Recommended Programs</h3>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Curated wellness sessions for you</p>
                    </div>
                    <Button variant="ghost" className="text-blue-600 font-bold text-sm" onClick={() => setActiveTab('programs')}>
                        Browse All <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                </div>

                {/* Program Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {recommendedPrograms.map(prog => {
                        const isExpanded = activeRecProgram === prog.id;
                        return (
                            <div key={prog.id} className="group">
                                {/* Program Card */}
                                <div
                                    onClick={() => setActiveRecProgram(isExpanded ? null : prog.id)}
                                    className={`rounded-[24px] overflow-hidden bg-white border shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg ${isExpanded ? 'border-blue-200 shadow-md ring-1 ring-blue-100' : 'border-gray-100'
                                        }`}
                                >
                                    {/* Gradient Header */}
                                    <div className={`bg-gradient-to-r ${prog.color} p-5 relative overflow-hidden`}>
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-3xl -mr-8 -mt-8"></div>
                                        <div className="relative z-10 flex items-center gap-3">
                                            <span className="text-4xl">{prog.emoji}</span>
                                            <div>
                                                <h4 className="text-lg font-black text-white leading-tight">{prog.title}</h4>
                                                <span className="text-white/70 text-[10px] font-bold uppercase tracking-wider">{prog.category}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-4">
                                        <p className="text-xs text-gray-500 leading-relaxed mb-3">{prog.description}</p>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${prog.bgLight} ${prog.textColor}`}>{prog.difficulty}</span>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
                                                <Clock className="w-2.5 h-2.5" /> {prog.duration}
                                            </span>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                                                {prog.sessions.length} Sessions
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">🆓 Free Access</span>
                                            <span className={`text-[10px] font-bold ${prog.textColor} flex items-center gap-1`}>
                                                {isExpanded ? 'Hide' : 'View'} Sessions <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Expandable Sessions */}
                                {isExpanded && (
                                    <div className="mt-3 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
                                        {prog.sessions.map((session, si) => (
                                            <div key={si}
                                                onClick={() => setSelectedVideo({ type: 'youtube', videoId: session.videoId, title: session.title })}
                                                className="flex gap-3 bg-white rounded-2xl p-3 border border-gray-100 hover:border-blue-200 hover:shadow-sm cursor-pointer transition-all group/s"
                                            >
                                                {/* Thumbnail */}
                                                <div className="w-28 h-20 rounded-xl overflow-hidden relative flex-shrink-0">
                                                    <img src={session.thumbnail} className="w-full h-full object-cover group-hover/s:scale-105 transition-transform duration-500" alt="" />
                                                    <div className="absolute inset-0 bg-black/20 group-hover/s:bg-black/40 transition-all flex items-center justify-center">
                                                        <div className="w-8 h-8 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/s:scale-110 transition-transform">
                                                            <Play className="w-3.5 h-3.5 text-white fill-white" />
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                                        {session.duration}
                                                    </div>
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 flex flex-col justify-center">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest ${prog.textColor}`}>Session {si + 1}</span>
                                                    <h5 className="text-sm font-bold text-gray-900 mt-0.5 leading-snug">{session.title}</h5>
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        <span className="text-[10px] text-gray-400 flex items-center gap-1"><Play className="w-2.5 h-2.5" /> Play Now</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const filteredPrograms = livePrograms.filter(p => {
        if (progSearch && !p.title?.toLowerCase().includes(progSearch.toLowerCase())) return false;
        if (progCat !== 'all' && p.category !== progCat) return false;
        return true;
    });

    const uniqueCats = ['all', ...Array.from(new Set(livePrograms.map((p: any) => p.category).filter(Boolean)))];

    const renderPrograms = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 font-serif">Vital Programs</h1>
                    <p className="text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${PLAN_COLORS[userPlan]}`}>
                            {userPlan === 'free' ? '🆓' : userPlan === 'platinum' ? '💎' : '⭐'} {userPlan} Plan
                        </span>
                    </p>
                </div>
                {userPlan === 'free' && (
                    <button onClick={() => navigate('/pricing')}
                        className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all">
                        <Crown className="w-3.5 h-3.5" /> Upgrade Plan
                    </button>
                )}
            </div>

            {/* Search + Category Filter */}
            <div className="space-y-3">
                <div className="relative">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                        placeholder="Search programmes…" value={progSearch} onChange={e => setProgSearch(e.target.value)} />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {uniqueCats.map(c => (
                        <button key={c as string} onClick={() => setProgCat(c as string)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all ${progCat === c ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
                                }`}>
                            {(c as string) === 'all' ? '🏷️ All' : `${CAT_EMOJI[c as string] || '📋'} ${c}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Programs Grid */}
            {programsLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
            ) : filteredPrograms.length === 0 ? (
                <div className="text-center py-16">
                    <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-sm text-gray-400">No programmes found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5">
                    {filteredPrograms.map((program: any) => {
                        const isLocked = program.locked;
                        const reqPlan = program.requiredPlan;

                        return (
                            <Card key={program._id} className={`rounded-[24px] border-none shadow-sm overflow-hidden bg-white group hover:shadow-xl transition-all duration-300 relative ${isLocked ? 'opacity-90' : ''
                                }`}>
                                {/* Lock overlay badge */}
                                {isLocked && (
                                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                                        <Lock className="w-3 h-3" /> {reqPlan?.charAt(0).toUpperCase() + reqPlan?.slice(1)}+ Only
                                    </div>
                                )}

                                <div className="flex flex-col md:flex-row">
                                    {/* Image */}
                                    <div className="w-full md:w-52 h-48 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-6xl">{CAT_EMOJI[program.category] || '📋'}</span>
                                        </div>
                                        {isLocked && (
                                            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
                                                <Lock className="w-10 h-10 text-white/60" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                                            {program.category}
                                        </div>
                                        {program.pricingType === 'free' && (
                                            <div className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase">
                                                Free
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <CardContent className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-black text-gray-900 leading-tight">{program.title}</h3>
                                                {(program.averageRating || 0) > 0 && (
                                                    <div className="flex items-center gap-1 text-amber-500 flex-shrink-0 ml-2">
                                                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                                                        <span className="text-xs font-bold">{program.averageRating?.toFixed(1)}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{program.description}</p>

                                            {/* Meta chips */}
                                            <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {program.durationWeeks}w</span>
                                                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {program.totalSessions} sessions</span>
                                                <span className="flex items-center gap-1 capitalize text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100">{program.difficulty}</span>
                                                {(program.enrollmentCount || 0) > 0 && (
                                                    <span className="flex items-center gap-1">👥 {program.enrollmentCount.toLocaleString()}</span>
                                                )}
                                            </div>

                                            {/* Plan access badges */}
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {(program.accessiblePlans || []).map((plan: string) => (
                                                    <span key={plan} className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${PLAN_COLORS[plan] || 'bg-gray-100 text-gray-500'}`}>
                                                        {plan}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex gap-3">
                                            {isLocked ? (
                                                <Button onClick={() => navigate('/pricing')}
                                                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-bold py-5 text-white">
                                                    <Crown className="w-4 h-4 mr-2" /> Upgrade to {reqPlan?.charAt(0).toUpperCase() + reqPlan?.slice(1)}
                                                </Button>
                                            ) : program.enrollmentRequired && program.enrollmentStatus === 'not_enrolled' ? (
                                                <Button
                                                    disabled={enrolling === program._id}
                                                    onClick={() => handleEnroll(program._id)}
                                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold py-5 text-white">
                                                    {enrolling === program._id ? (
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    ) : (
                                                        <Plus className="w-4 h-4 mr-2" />
                                                    )}
                                                    Enroll Now
                                                </Button>
                                            ) : (
                                                <Button className="flex-1 bg-blue-600 rounded-xl font-bold py-5"
                                                    onClick={() => { setActiveProgram(program); setActiveSession(0); setCompletedSessions([]); }}>
                                                    <PlayCircle className="w-4 h-4 mr-2" /> {program.enrollmentStatus === 'active' ? 'Continue' : 'Start Program'}
                                                </Button>
                                            )}
                                            <Button variant="outline" className="rounded-xl border-gray-200 text-gray-400 hover:text-blue-600"
                                                onClick={() => setSelectedProgram(program)}>
                                                <Info className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );

    const renderSettings = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-black text-gray-900 font-serif">Account Console</h1>

            <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-black">
                        {user?.name?.[0] || 'U'}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{user?.name || 'Member'}</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{user?.role?.replace('_', ' ') || 'Consumer'}</p>
                    </div>
                </div>

                <div className="p-2">
                    {[
                        { icon: User, label: 'Profile Intelligence', sub: 'Manage personal bio and demographics', color: 'text-blue-500 bg-blue-50' },
                        { icon: Bell, label: 'Alert Center', sub: 'Customize health notifications', color: 'text-purple-500 bg-purple-50' },
                        { icon: HeartPulse, label: 'Telemetry Sync', sub: 'Connect wearable and health apps', color: 'text-red-500 bg-red-50' },
                        { icon: ShieldCheck, label: 'Privacy & Security', sub: 'Manage encryption and access', color: 'text-emerald-500 bg-emerald-50' },
                    ].map((item, idx) => (
                        <button key={idx} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors rounded-2xl text-left group">
                            <div className={`w-11 h-11 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                <item.icon size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">{item.label}</p>
                                <p className="text-[11px] text-gray-400 font-medium">{item.sub}</p>
                            </div>
                            <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                        </button>
                    ))}
                    <div className="h-px bg-gray-50 mx-4 my-2" />
                    <button
                        onClick={() => dispatch({ type: 'LOGOUT' })}
                        className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-colors rounded-2xl text-left group"
                    >
                        <div className="w-11 h-11 bg-red-50 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <LogOut size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-red-600">Secure Sign Out</p>
                            <p className="text-[11px] text-red-300 font-medium">Terminate all active sessions safely</p>
                        </div>
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center gap-2 pt-4">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Prevent Vital Mobile — v2.4.0</p>
                <div className="flex gap-4">
                    <p className="text-[10px] font-bold text-blue-600 capitalize">Terms of Protocol</p>
                    <p className="text-[10px] font-bold text-blue-600 capitalize">Audit Log</p>
                </div>
            </div>
        </div>
    );

    // ── Programme Execution View ──────────────────────────────────────
    const generateSessions = (count: number) => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            title: `Session ${i + 1}`,
            subtitle: i === 0 ? 'Getting Started' : i < 3 ? 'Foundation Building' : i < count - 2 ? 'Deep Practice' : 'Mastery & Review',
            modules: [
                { type: 'video', title: 'Introduction & Overview', duration: '8 min', icon: '🎬', content: 'Video content will be available when cloud integration is complete. This module covers key concepts and theory.' },
                { type: 'exercise', title: 'Guided Practice', duration: '15 min', icon: '🏃', content: 'Follow along with the guided exercises. Track your vitals before and after for best results.' },
                { type: 'quiz', title: 'Knowledge Check', duration: '5 min', icon: '✅', content: 'Test your understanding with a quick assessment. Score 80% or higher to unlock the next session.' },
            ]
        }));
    };

    const renderProgramPlayer = () => {
        if (!activeProgram) return null;
        const sessions = generateSessions(activeProgram.totalSessions || 8);
        const current = sessions[activeSession] || sessions[0];
        const progress = Math.round(((completedSessions.length) / sessions.length) * 100);

        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
                {/* Hero */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[28px] p-7 shadow-xl text-white">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <button onClick={() => setActiveProgram(null)} className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-bold mb-4 transition-colors">
                            <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Back to Programs
                        </button>
                        <div className="flex items-center gap-4">
                            <span className="text-5xl">{CAT_EMOJI[activeProgram.category] || '📋'}</span>
                            <div>
                                <h1 className="text-2xl font-black leading-tight">{activeProgram.title}</h1>
                                <p className="text-blue-100 text-xs mt-1 opacity-80">{activeProgram.category} • {activeProgram.difficulty} • {activeProgram.durationWeeks} weeks</p>
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Overall Progress</span>
                                <span className="text-sm font-black">{progress}%</span>
                            </div>
                            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-400 to-green-300 rounded-full transition-all duration-700 ease-out"
                                    style={{ width: `${progress}%` }}></div>
                            </div>
                            <p className="text-[10px] text-blue-200 mt-1.5">{completedSessions.length} of {sessions.length} sessions completed</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Session Sidebar */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Sessions</h3>
                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
                            {sessions.map((session, idx) => {
                                const isCompleted = completedSessions.includes(idx);
                                const isCurrent = idx === activeSession;
                                const isLocked = idx > completedSessions.length && idx !== 0;

                                return (
                                    <button key={idx}
                                        onClick={() => !isLocked && setActiveSession(idx)}
                                        disabled={isLocked}
                                        className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 ${isCurrent ? 'bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-100' :
                                            isCompleted ? 'bg-emerald-50/60 border-emerald-100' :
                                                isLocked ? 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed' :
                                                    'bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm'
                                            }`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 ${isCurrent ? 'bg-blue-600 text-white' :
                                                isCompleted ? 'bg-emerald-500 text-white' :
                                                    isLocked ? 'bg-gray-200 text-gray-400' :
                                                        'bg-gray-100 text-gray-600'
                                                }`}>
                                                {isCompleted ? '✓' : isLocked ? <Lock className="w-3.5 h-3.5" /> : idx + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-bold truncate ${isCurrent ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-gray-700'}`}>
                                                    {session.title}
                                                </p>
                                                <p className="text-[10px] text-gray-400">{session.subtitle}</p>
                                            </div>
                                            {isCurrent && (
                                                <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-full uppercase animate-pulse">Live</span>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Current Session Header */}
                        <Card className="rounded-[22px] border-gray-100 shadow-sm bg-white overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-black text-gray-900">{current.title}</h2>
                                        <p className="text-xs text-gray-400 mt-0.5">{current.subtitle}</p>
                                    </div>
                                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${completedSessions.includes(activeSession) ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {completedSessions.includes(activeSession) ? '✓ Completed' : '● In Progress'}
                                    </span>
                                </div>

                                {/* Modules */}
                                <div className="space-y-3">
                                    {current.modules.map((module, mi) => (
                                        <div key={mi} className="group bg-gray-50 hover:bg-white rounded-2xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl flex-shrink-0 mt-0.5">{module.icon}</span>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-sm font-bold text-gray-900">{module.title}</h4>
                                                        <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                                                            <Clock className="w-3 h-3" /> {module.duration}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{module.content}</p>

                                                    {/* Placeholder Action */}
                                                    <div className="mt-3 flex items-center gap-2">
                                                        {module.type === 'video' && (
                                                            <div className="flex items-center gap-2 bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1.5 rounded-lg">
                                                                <Play className="w-3 h-3" /> Video Coming Soon
                                                            </div>
                                                        )}
                                                        {module.type === 'exercise' && (
                                                            <div className="flex items-center gap-2 bg-amber-50 text-amber-600 text-[10px] font-bold px-3 py-1.5 rounded-lg">
                                                                <Activity className="w-3 h-3" /> Interactive Exercise
                                                            </div>
                                                        )}
                                                        {module.type === 'quiz' && (
                                                            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-3 py-1.5 rounded-lg">
                                                                <ShieldCheck className="w-3 h-3" /> Assessment Ready
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Daily Health Tips */}
                        <Card className="rounded-[22px] border-gray-100 shadow-sm bg-white">
                            <CardContent className="p-6">
                                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">💡 Today's Health Tips</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[
                                        { emoji: '💧', tip: 'Stay hydrated — drink 8 glasses of water throughout the day', color: 'bg-blue-50 border-blue-100' },
                                        { emoji: '🧘', tip: 'Practice 5 minutes of deep breathing before each session', color: 'bg-purple-50 border-purple-100' },
                                        { emoji: '🥗', tip: 'Eat a balanced meal 1 hour before exercising', color: 'bg-emerald-50 border-emerald-100' },
                                        { emoji: '😴', tip: 'Aim for 7-8 hours of quality sleep tonight', color: 'bg-amber-50 border-amber-100' },
                                    ].map((item, i) => (
                                        <div key={i} className={`${item.color} border rounded-xl p-3 flex items-start gap-2.5`}>
                                            <span className="text-lg flex-shrink-0">{item.emoji}</span>
                                            <p className="text-xs text-gray-600 leading-relaxed">{item.tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upcoming: Live Sessions Placeholder */}
                        <Card className="rounded-[22px] border-dashed border-2 border-gray-200 bg-gray-50/50">
                            <CardContent className="p-6 text-center">
                                <div className="w-14 h-14 bg-indigo-100 rounded-2xl mx-auto flex items-center justify-center mb-3">
                                    <Play className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="text-sm font-black text-gray-700">Live Sessions Coming Soon</h3>
                                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">Interactive video classes with health experts and real-time vitals monitoring will be available after cloud integration.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Floating Bottom Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-4 z-30 shadow-2xl">
                    <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{CAT_EMOJI[activeProgram.category] || '📋'}</span>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{current.title}</p>
                                <p className="text-[10px] text-gray-400">{current.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm"
                                disabled={activeSession === 0}
                                onClick={() => setActiveSession(prev => Math.max(0, prev - 1))}
                                className="rounded-xl border-gray-200 text-xs font-bold">
                                <ChevronRight className="w-3.5 h-3.5 rotate-180 mr-1" /> Previous
                            </Button>
                            {completedSessions.includes(activeSession) ? (
                                <Button size="sm"
                                    disabled={activeSession >= sessions.length - 1}
                                    onClick={() => setActiveSession(prev => Math.min(sessions.length - 1, prev + 1))}
                                    className="rounded-xl bg-emerald-600 text-xs font-bold">
                                    Next Session <ChevronRight className="w-3.5 h-3.5 ml-1" />
                                </Button>
                            ) : (
                                <Button size="sm"
                                    onClick={() => {
                                        setCompletedSessions(prev => [...prev, activeSession]);
                                        if (activeSession < sessions.length - 1) {
                                            setTimeout(() => setActiveSession(prev => prev + 1), 500);
                                        }
                                    }}
                                    className="rounded-xl bg-blue-600 text-xs font-bold">
                                    Complete Session <Zap className="w-3.5 h-3.5 ml-1 fill-white" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="max-w-[1400px] mx-auto px-4 pt-6">
                {/* Standard Page Content based on Tab */}
                {activeProgram ? renderProgramPlayer() : (
                    <>
                        {activeTab === 'home' && renderHome()}
                        {activeTab === 'programs' && renderPrograms()}
                        {activeTab === 'orders' && <CustomerOrders />}
                        {activeTab === 'settings' && renderSettings()}
                    </>
                )}
            </div>

            {/* Vitals Input Modal */}
            <Dialog open={isVitalsModalOpen} onOpenChange={setIsVitalsModalOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-[28px] border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black font-serif">Update Health Vitals</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sys" className="text-xs font-bold uppercase text-gray-500">Systolic BP</Label>
                                <Input id="sys" name="bloodPressureSys" placeholder="120" value={vitalForm.bloodPressureSys} onChange={handleVitalChange} className="rounded-xl bg-gray-50 border-gray-100" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dia" className="text-xs font-bold uppercase text-gray-500">Diastolic BP</Label>
                                <Input id="dia" name="bloodPressureDia" placeholder="80" value={vitalForm.bloodPressureDia} onChange={handleVitalChange} className="rounded-xl bg-gray-50 border-gray-100" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="hr" className="text-xs font-bold uppercase text-gray-500">Heart Rate</Label>
                                <Input id="hr" name="heartRate" placeholder="72" value={vitalForm.heartRate} onChange={handleVitalChange} className="rounded-xl bg-gray-50 border-gray-100" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight" className="text-xs font-bold uppercase text-gray-500">Weight (kg)</Label>
                                <Input id="weight" name="weight" placeholder="70" value={vitalForm.weight} onChange={handleVitalChange} className="rounded-xl bg-gray-50 border-gray-100" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="glucose" className="text-xs font-bold uppercase text-gray-500">Glucose</Label>
                                <Input id="glucose" name="glucose" placeholder="100" value={vitalForm.glucose} onChange={handleVitalChange} className="rounded-xl bg-gray-50 border-gray-100" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="spo2" className="text-xs font-bold uppercase text-gray-500">SpO2 (%)</Label>
                                <Input id="spo2" name="spo2" placeholder="98" value={vitalForm.spo2} onChange={handleVitalChange} className="rounded-xl bg-gray-50 border-gray-100" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleVitalSubmit} className="w-full bg-blue-600 font-bold rounded-xl py-6">Save Vitals</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Video Player Modal */}
            <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none rounded-none md:rounded-[28px] shadow-2xl">
                    {selectedVideo && (
                        <div className="aspect-video w-full bg-black flex items-center justify-center">
                            {selectedVideo.type === 'youtube' ? (
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                                    title={selectedVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : null}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Programme Detail Modal */}
            <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
                <DialogContent className="max-w-lg rounded-[28px] border-none shadow-2xl p-0 overflow-hidden">
                    {selectedProgram && (
                        <>
                            {/* Top banner */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                <div className="flex items-center gap-4 relative z-10">
                                    <span className="text-5xl">{CAT_EMOJI[selectedProgram.category] || '📋'}</span>
                                    <div>
                                        <h2 className="text-xl font-black leading-tight">{selectedProgram.title}</h2>
                                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                                            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">{selectedProgram.category}</span>
                                            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{selectedProgram.difficulty}</span>
                                            {selectedProgram.locked && (
                                                <span className="bg-red-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                                    <Lock className="w-2.5 h-2.5" /> Locked
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-5">
                                <p className="text-sm text-gray-600 leading-relaxed">{selectedProgram.description}</p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        ['⏱️', `${selectedProgram.durationWeeks}w`, 'Duration'],
                                        ['📋', `${selectedProgram.totalSessions}`, 'Sessions'],
                                        ['👥', `${selectedProgram.enrollmentCount || 0}`, 'Enrolled'],
                                    ].map(([emoji, val, label]) => (
                                        <div key={label as string} className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
                                            <span className="text-xl">{emoji}</span>
                                            <p className="font-bold text-gray-900 text-sm mt-1">{val}</p>
                                            <p className="text-[10px] text-gray-400">{label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Plan access */}
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Available for Plans</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {(selectedProgram.accessiblePlans || []).map((plan: string) => (
                                            <span key={plan} className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${PLAN_COLORS[plan] || 'bg-gray-100 text-gray-500'} ${plan === userPlan ? 'ring-2 ring-blue-400' : ''}`}>
                                                {plan === userPlan ? `✓ ${plan} (your plan)` : plan}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">Pricing</p>
                                        <p className="text-lg font-black text-gray-900">
                                            {selectedProgram.price > 0 ? `₹${selectedProgram.price.toLocaleString()}` : 'Free'}
                                            {selectedProgram.pricingType === 'subscription' && <span className="text-xs text-gray-400 font-normal">/mo</span>}
                                        </p>
                                    </div>
                                    {(selectedProgram.averageRating || 0) > 0 && (
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <Star key={i} className={`w-4 h-4 ${i <= Math.floor(selectedProgram.averageRating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1">{selectedProgram.averageRating?.toFixed(1)}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Action */}
                                {selectedProgram.locked ? (
                                    <Button onClick={() => { setSelectedProgram(null); navigate('/pricing'); }}
                                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold py-6">
                                        <Crown className="w-4 h-4 mr-2" /> Upgrade to Unlock
                                    </Button>
                                ) : selectedProgram.enrollmentRequired && selectedProgram.enrollmentStatus === 'not_enrolled' ? (
                                    <Button disabled={enrolling === selectedProgram._id}
                                        onClick={() => { handleEnroll(selectedProgram._id); setSelectedProgram(null); }}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold py-6">
                                        {enrolling === selectedProgram._id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                                        Enroll in Programme
                                    </Button>
                                ) : (
                                    <Button className="w-full bg-blue-600 text-white rounded-xl font-bold py-6">
                                        <PlayCircle className="w-4 h-4 mr-2" /> {selectedProgram.enrollmentStatus === 'active' ? 'Continue Programme' : 'Start Programme'}
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

        </div >
    );
};

export default CustomerDashboard;
