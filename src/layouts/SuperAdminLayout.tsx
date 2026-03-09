import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import PermissionGuard from '../components/PermissionGuard';
import { PERMISSIONS } from '../config/rbacConfig';
import {
    LayoutDashboard, Users, BookOpen, Megaphone, BarChart3,
    CreditCard, Settings, Shield, HeadphonesIcon, LogOut, Zap,
    ChevronDown, User, Key, Menu, Bell, Search, X
} from 'lucide-react';
import { Avatar } from '../admin-shared/components/ui';

const NAV_MAIN = [
    { path: '/super-admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/super-admin/users', label: 'Staff', icon: Users, badge: '347' },
    { path: '/super-admin/programmes', label: 'Programmes', icon: BookOpen },
    { path: '/super-admin/campaigns', label: 'Campaigns', icon: Megaphone },
    { path: '/super-admin/analytics', label: 'Analytics', icon: BarChart3 },
];

const NAV_ADMIN = [
    { path: '/super-admin/billing', label: 'Billing', icon: CreditCard },
    { path: '/super-admin/settings', label: 'Settings', icon: Settings, permission: PERMISSIONS.MANAGE_PLATFORM },
    { path: '/super-admin/security', label: 'Security', icon: Shield },
    { path: '/super-admin/support', label: 'Support', icon: HeadphonesIcon },
];

const NAV_SUPER = [
    { path: '/super-admin/platform', label: 'Super Admin', icon: Zap, special: true },
];

function NavItem({ path, icon: Icon, label, badge, special, permission }: any) {
    const location = useLocation();
    const isActive = location.pathname.includes(path);

    const link = (
        <Link to={path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer select-none ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : special
                    ? 'border border-amber-500/20 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:text-amber-300'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}>
            <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
            <span className="flex-1 text-sm">{label}</span>
            {badge && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full text-center">
                    {badge}
                </span>
            )}
        </Link>
    );

    return permission ? (
        <PermissionGuard permission={permission}>
            {link}
        </PermissionGuard>
    ) : link;
}

const SuperAdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname.includes(path);

    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const [profileOpen, setProfileOpen] = React.useState(false);

    // Close sidebar on route change on mobile
    React.useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

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
                w-64 bg-[#0F172A] text-white flex flex-col fixed h-full z-40  transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
            `}>
                <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white p-1">
                        <img
                            src="/images/logo-new.png"
                            alt="PreventVital Logo"
                            className="w-full h-full object-contain filter brightness-0 invert"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-white font-bold text-[14px] truncate tracking-tight">gruentzig.ai</div>
                        <div className="text-slate-400 text-[11px]">Corporate Admin</div>
                    </div>
                    <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-hide">
                    <div className="px-3 mb-2 mt-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Overview</span>
                    </div>
                    {NAV_MAIN.map((item) => <NavItem key={item.path} {...item} />)}

                    <div className="px-3 mb-2 mt-6">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Administration</span>
                    </div>
                    {NAV_ADMIN.map((item) => <NavItem key={item.path} {...item} />)}

                    <div className="px-3 mb-2 mt-6">
                        <span className="text-[10px] font-bold text-amber-500/80 uppercase tracking-widest">Platform</span>
                    </div>
                    {NAV_SUPER.map((item) => <NavItem key={item.path} {...item} />)}
                </nav>

                {/* Subscription usage bar */}
                <div className="mx-3 mb-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] text-slate-400">Seat Usage</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-700"
                            style={{ width: `24%` }} />
                    </div>
                    <div className="mt-1.5 text-[10px] text-slate-500">
                        347 / 500 · Enterprise Plan
                    </div>
                </div>

                {/* Profile area */}
                <div className="border-t border-white/10 p-3 relative">
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                            S
                        </div>
                        <div className="flex-1 text-left min-w-0">
                            <div className="text-sm font-medium text-white truncate">Super Admin</div>
                            <div className="text-[11px] text-slate-400 truncate capitalize">Platform Admin</div>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {profileOpen && (
                        <div className="absolute bottom-full left-3 right-3 mb-1 bg-slate-800 border border-white/10 rounded-xl py-1.5 shadow-xl z-50">
                            <Link to="/super-admin/profile" onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                                <User size={14} /> My Profile
                            </Link>
                            <Link to="/super-admin/security" onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                                <Key size={14} /> Security
                            </Link>
                            <div className="h-px bg-white/10 my-1" />
                            <button onClick={handleLogout}
                                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
                                <LogOut size={14} /> Sign out
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu size={20} />
                        </button>

                        {/* Search */}
                        <div className="relative max-w-md w-full hidden md:block">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                placeholder="Search staff, campaigns, programmes..."
                                className="w-full pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-[13px] outline-none focus:border-blue-500 focus:bg-white transition-all text-gray-700"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                        </button>

                        <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-gray-200">
                            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                                S
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-gray-700">Super Admin</span>
                                <button onClick={handleLogout} className="text-xs font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default SuperAdminLayout;
