import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import {
    LayoutDashboard,
    Video,
    PlayCircle,
    BarChart3,
    Settings,
    LogOut,
    CheckCircle,
    PlusCircle,
    Users
} from 'lucide-react';

const NAV_OVERVIEW = [
    { path: '/creator/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/creator/programs', label: 'Content Manager', icon: Video },
    { path: '/creator/programs/new', label: 'Create Program', icon: PlusCircle, badge: 'New' },
    { path: '/creator/live', label: 'Live Sessions', icon: PlayCircle },
];

const NAV_ANALYTICS = [
    { path: '/creator/earnings', label: 'Earnings & Progress', icon: BarChart3 },
    { path: '/creator/community', label: 'My Community', icon: Users },
];

function NavItem({ path, icon: Icon, label, badge }: any) {
    const location = useLocation();
    const isActive = location.pathname === path || (path !== '/creator/dashboard' && location.pathname.startsWith(path));

    return (
        <Link to={path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer select-none ${isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}>
            <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
            <span className="flex-1 text-sm">{label}</span>
            {badge && (
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full text-center">
                    {badge}
                </span>
            )}
        </Link>
    );
}

const CreatorLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    React.useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const getCurrentLabel = () => {
        const allNavs = [...NAV_OVERVIEW, ...NAV_ANALYTICS];
        const activeItem = allNavs.find(i => location.pathname.includes(i.path) && i.path !== '/creator/dashboard');
        return activeItem ? activeItem.label : 'Dashboard';
    };

    return (
        <div className="flex min-h-screen font-sans text-gray-900 bg-gray-50/50" style={{ background: '#f8f9fa' }}>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-64 bg-[#0F172A] text-white flex flex-col fixed h-full z-40 transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
            `}>
                <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center text-white p-1">
                        <img
                            src="/images/logo-new.png"
                            alt="PreventVital Logo"
                            className="w-full h-full object-contain filter brightness-0 invert"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-white font-bold text-[14px] truncate tracking-tight">PreventVital</div>
                        <div className="text-pink-400 text-[11px] uppercase tracking-wider font-bold">Creator Studio</div>
                    </div>
                    <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-4 px-3 flex flex-col gap-6">
                    <div>
                        <div className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Creation</div>
                        <div className="space-y-1">
                            {NAV_OVERVIEW.map(item => <NavItem key={item.path} {...item} />)}
                        </div>
                    </div>

                    <div>
                        <div className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Performance</div>
                        <div className="space-y-1">
                            {NAV_ANALYTICS.map(item => <NavItem key={item.path} {...item} />)}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-white/10 bg-[#0B1120]">
                    <NavItem path="/creator/settings" icon={Settings} label="Studio Settings" />
                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-red-400 hover:bg-white/5 w-full transition-colors mt-2">
                        <LogOut size={18} className="flex-shrink-0" />
                        <span className="flex-1 text-left">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-hidden">
                {/* Header Navbar */}
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight hidden sm:block">
                            {getCurrentLabel()}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="hidden md:flex items-center gap-2 bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-full">
                            <CheckCircle size={14} className="text-pink-600" />
                            <span className="text-[11px] font-bold text-pink-700 uppercase tracking-wide">Studio Online</span>
                        </div>
                        <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900 leading-tight">Creator</p>
                                <p className="text-[11px] font-medium text-gray-500">Coach Profile</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-sm">
                                CR
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreatorLayout;
