import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutDashboard, CalendarClock, Clock, LogOut, AlertTriangle } from 'lucide-react';
import { ExpertProfile, getMyExpertProfile } from '@/features/consultations/api';
import { performLogout, RootState } from '../store';
import { cn } from '@/lib/utils';

// Shell for /expert — nutritionists/clinicians taking live consultations.
const NAV = [
    { to: '/expert/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/expert/schedule', label: 'Schedule', icon: CalendarClock },
    { to: '/expert/availability', label: 'Availability', icon: Clock },
];

const ExpertLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((s: RootState) => s.auth.user);
    const [profile, setProfile] = useState<ExpertProfile | null>(null);

    useEffect(() => { getMyExpertProfile().then(setProfile).catch(() => {}); }, []);

    const status = profile?.verification?.status;
    const notice = !profile ? null
        : !profile.isActive ? 'Your profile is turned off, so patients can\'t book you. Contact the PreventVital team to turn it back on.'
        : status === 'pending' ? 'Your profile is waiting for verification by the PreventVital team. Patients can book you once it\'s verified. You can set your availability now.'
        : status === 'rejected' ? `Your profile wasn't verified${profile.verification.note ? `: ${profile.verification.note}` : ''}. Contact the PreventVital team.`
        : null;

    const handleLogout = async () => {
        await performLogout(dispatch);
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-4">
                    <div className="font-bold text-slate-900 whitespace-nowrap">
                        PreventVital <span className="text-indigo-600">Experts</span>
                    </div>
                    <nav className="flex gap-1 flex-1 overflow-x-auto">
                        {NAV.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) => cn(
                                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap',
                                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
                                )}
                            >
                                <Icon size={16} /> {label}
                            </NavLink>
                        ))}
                    </nav>
                    <span className="hidden sm:block text-sm text-slate-500 truncate max-w-[180px]">{user?.email}</span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-red-600 px-2 py-2"
                        aria-label="Log out"
                    >
                        <LogOut size={16} /> <span className="hidden sm:inline">Log out</span>
                    </button>
                </div>
            </header>
            {notice && (
                <div className="bg-amber-50 border-b border-amber-200">
                    <div className="max-w-5xl mx-auto px-4 py-3 flex gap-2 text-sm text-amber-900">
                        <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" /> {notice}
                    </div>
                </div>
            )}
            <main className="max-w-5xl mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
};

export default ExpertLayout;
