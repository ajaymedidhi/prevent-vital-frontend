import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setCredentials } from '../../store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    HeartPulse, PlayCircle, ShieldCheck, ChevronRight, Activity,
    TrendingUp, Home, ShoppingBag, Settings, Star, Zap,
    LogOut, User, Bell, Search, Plus, Play, Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CustomerDashboard = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('home'); // 'home', 'programs', 'shop', 'settings'
    const [selectedVideo, setSelectedVideo] = useState<any>(null);
    const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);
    const [vitalForm, setVitalForm] = useState({
        bloodPressureSys: '',
        bloodPressureDia: '',
        heartRate: '',
        glucose: '',
        spo2: '',
        weight: ''
    });

    const handleVitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVitalForm({ ...vitalForm, [e.target.name]: e.target.value });
    };

    const handleVitalSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
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
                const token = localStorage.getItem('token');
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

    const sampleVideos = [
        {
            id: 1,
            title: "Morning Mobility Routine",
            duration: "10 min",
            category: "Yoga",
            thumbnail: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop",
            type: 'youtube',
            videoId: "klmBssEYkdU"
        },
        {
            id: 2,
            title: "How the Heart Actually Pumps",
            duration: "5 min",
            category: "Education",
            thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
            type: 'youtube',
            videoId: "H04d3rJCLCE"
        },
        {
            id: 3,
            title: "Stress Relief Meditation",
            duration: "15 min",
            category: "Mindfulness",
            thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop",
            type: 'youtube',
            videoId: "SlhBgt2deyk"
        },
    ];

    const programs = [
        { id: 1, title: 'Cardio Health Pro', category: 'Heart', users: '12.5k', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80', description: 'Advanced cardiovascular strengthening.' },
        { id: 2, title: 'Diabetes Management', category: 'Chronic', users: '8.2k', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80', description: 'Lifestyle and nutritional control for type 2.' },
        { id: 3, title: 'Mindfulness & Stress', category: 'Mental', users: '24k', image: 'https://images.unsplash.com/photo-1536622432212-4b6a8367b237?auto=format&fit=crop&q=80', description: 'Stress reduction through meditation.' },
    ];

    const products = [
        { id: 1, name: 'Premium Heart Kit', price: '₹4,999', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80' },
        { id: 2, name: 'VITA Supplements', price: '₹1,299', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80' },
    ];

    const renderHome = () => (
        <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                        <Button
                            onClick={() => setActiveTab('shop')}
                            variant="outline"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl px-6 backdrop-blur-sm"
                        >
                            Shop Vital Gear
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
            </div>

            {/* Recommended Content */}
            <div className="pt-4">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="font-serif text-2xl font-black text-gray-900">Recommended</h3>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Curated for your profile</p>
                    </div>
                    <Button variant="ghost" className="text-blue-600 font-bold text-sm">See all <ChevronRight className="ml-1 w-4 h-4" /></Button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {sampleVideos.map((video) => (
                        <div key={video.id} className="min-w-[260px] group cursor-pointer" onClick={() => setSelectedVideo(video)}>
                            <div className="aspect-video rounded-[24px] overflow-hidden relative shadow-lg">
                                <img src={video.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                        <Play className="w-5 h-5 text-white fill-white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                                    {video.duration}
                                </div>
                            </div>
                            <div className="mt-3 px-1">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{video.category}</span>
                                <h4 className="text-sm font-bold text-gray-900 mt-1 line-clamp-1">{video.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderPrograms = () => (
        <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 font-serif">Vital Programs</h1>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">Full Access Granted</p>
                </div>
                <div className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1.5">
                    <Zap className="w-3 h-3 fill-emerald-700" /> All Unlocked
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {programs.map((program) => (
                    <Card key={program.id} className="rounded-[24px] border-none shadow-sm overflow-hidden bg-white group hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-48 h-48 relative overflow-hidden">
                                <img src={program.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">
                                    {program.category}
                                </div>
                            </div>
                            <CardContent className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-black text-gray-900">{program.title}</h3>
                                        <div className="flex items-center gap-1 text-amber-500">
                                            <Star className="w-3 h-3 fill-amber-500" />
                                            <span className="text-xs font-bold">4.9</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{program.description}</p>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"></div>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 capitalize">{program.users} Enrolled</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button className="flex-1 bg-blue-600 rounded-xl font-bold py-5">
                                        <PlayCircle className="w-4 h-4 mr-2" /> Start Program
                                    </Button>
                                    <Button variant="outline" className="rounded-xl border-gray-200 text-gray-400 hover:text-blue-600">
                                        <Info className="w-5 h-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );

    const renderShop = () => (
        <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 font-serif">Lifestyle Shop</h1>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">Curated Vitality Gear</p>
                </div>
                <Button variant="ghost" className="bg-gray-100 rounded-xl h-12 w-12 flex items-center justify-center p-0">
                    <Search className="w-5 h-5 text-gray-500" />
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="group">
                        <div className="aspect-square rounded-[24px] overflow-hidden relative shadow-sm bg-gray-50 border border-gray-100 mb-3">
                            <img src={product.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="" />
                            <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all scale-0 group-hover:scale-100">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
                        <p className="text-blue-600 font-black text-sm mt-0.5">{product.price}</p>
                    </div>
                ))}
            </div>

            <Card className="rounded-[28px] border-none bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white overflow-hidden relative group cursor-pointer mt-8 shadow-xl">
                <div className="relative z-10 w-2/3">
                    <h3 className="text-xl font-black mb-2 leading-tight">VITA Starter Kit arrives in 3 days</h3>
                    <p className="text-xs text-indigo-100 opacity-80 mb-4">Complete your toolkit for 100% telemetry coverage.</p>
                    <Button className="bg-white text-indigo-600 font-bold rounded-xl text-xs h-9 px-4 hover:bg-white/90">View Order</Button>
                </div>
                <ShoppingBag className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-700" />
            </Card>
        </div>
    );

    const renderSettings = () => (
        <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
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

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="max-w-[1400px] mx-auto px-4 pt-6">
                {/* Standard Page Content based on Tab */}
                {activeTab === 'home' && renderHome()}
                {activeTab === 'programs' && renderPrograms()}
                {activeTab === 'shop' && renderShop()}
                {activeTab === 'settings' && renderSettings()}
            </div>

            {/* Premium Mobile Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-t border-gray-100 z-50 flex justify-around items-center px-4 h-20 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] pb-2">
                {[
                    { id: 'home', icon: Home, label: 'Home' },
                    { id: 'programs', icon: PlayCircle, label: 'Vital-P' },
                    { id: 'shop', icon: ShoppingBag, label: 'Store' },
                    { id: 'settings', icon: Settings, label: 'Console' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="flex flex-col items-center gap-1.5 transition-all w-16 group relative"
                    >
                        <div className={`p-2 rounded-xl transition-all duration-300 ${activeTab === tab.id ? 'bg-blue-600 shadow-lg shadow-blue-200 -translate-y-1' : 'text-gray-400 group-hover:text-blue-500'}`}>
                            <tab.icon size={22} className={activeTab === tab.id ? 'text-white' : ''} />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-tight transition-all ${activeTab === tab.id ? 'text-blue-600 opacity-100' : 'text-gray-400 opacity-60'}`}>
                            {tab.label}
                        </span>
                    </button>
                ))}
            </nav>

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
        </div>
    );
};

export default CustomerDashboard;
