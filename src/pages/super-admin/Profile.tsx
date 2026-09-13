import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Smartphone, Key, MapPin, Building, Save, Camera, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const Profile = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isSaving, setIsSaving] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Super Admin',
        email: user?.email || 'admin@preventvital.com',
        phone: '+91 9876543210',
        role: user?.role === 'super_admin' ? 'Super Admin' : (user?.role || 'Platform Owner'),
        location: 'Mumbai, India',
        department: 'Administration'
    });

    useEffect(() => {
        if (user) {
            setProfileData(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email,
                role: user.role === 'super_admin' ? 'Super Admin' : (user.role || prev.role)
            }));
        }
    }, [user]);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Profile updated successfully!");
        }, 800);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
            {/* Header Section */}
            <div className="relative">
                <div className="h-48 w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden shadow-lg">
                    {/* Decorative abstract elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300 opacity-20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
                </div>
                
                <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
                    <div className="relative group cursor-pointer">
                        <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-xl">
                            <div className="w-full h-full rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-5xl font-bold uppercase">
                                {profileData.name.charAt(0)}
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Camera className="text-white w-8 h-8" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{profileData.name}</h1>
                        <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                            <Shield className="w-4 h-4 text-blue-500" /> {profileData.role}
                        </p>
                    </div>
                </div>
                
                <div className="absolute -bottom-12 right-8">
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-gray-900/20 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                        {isSaving ? <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></span> : <Save className="w-4 h-4" />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="pt-20 grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column - Personal Info */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 transition-opacity group-hover:opacity-100"></div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 relative">
                            <User className="w-5 h-5 text-blue-500" /> Personal Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                                <input 
                                    type="text" 
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-gray-900 font-medium outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="email" 
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-11 pr-4 py-3 text-gray-900 font-medium outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="text" 
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-11 pr-4 py-3 text-gray-900 font-medium outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="text" 
                                        value={profileData.location}
                                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-11 pr-4 py-3 text-gray-900 font-medium outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</label>
                                <div className="relative">
                                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="text" 
                                        value={profileData.department}
                                        onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-11 pr-4 py-3 text-gray-900 font-medium outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Security & Preferences */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative">
                            <Key className="w-5 h-5 text-blue-400" /> Authentication
                        </h2>
                        
                        <div className="space-y-6 relative">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div>
                                    <p className="font-semibold">Password</p>
                                    <p className="text-xs text-slate-400 mt-1">Last changed 45 days ago</p>
                                </div>
                                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors">
                                    Update
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div>
                                    <p className="font-semibold">Two-Factor Auth</p>
                                    <p className="text-xs text-green-400 mt-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Enabled</p>
                                </div>
                                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors">
                                    Manage
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Active Sessions</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-2xl border border-blue-100 bg-blue-50/50">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Smartphone className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 text-sm">MacBook Pro - Chrome</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Mumbai, India • Current Session</p>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span>
                            </div>
                            
                            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    <Smartphone className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 text-sm">iPhone 14 Pro - Safari</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Delhi, India • 2 days ago</p>
                                </div>
                                <button className="text-xs font-semibold text-red-600 hover:text-red-700">Revoke</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
