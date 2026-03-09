import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import {
    LayoutDashboard, Users, ShoppingCart, Calculator, AlertCircle,
    FileText, Settings, HeadphonesIcon, LogOut, ChevronDown, User, Key, Menu, Bell, Search, X
} from 'lucide-react';

const NAV_OVERVIEW = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/orders', label: 'Order Management', icon: ShoppingCart },
    { path: '/admin/risk-calculator', label: 'Risk Calculator', icon: Calculator },
    { path: '/admin/alerts', label: 'Critical Alerts', icon: AlertCircle, badge: '!' },
];

const NAV_TOOLS = [
    { path: '/admin/reports', label: 'Reports', icon: FileText },
];

const NAV_ADMIN = [
    { path: '/admin/settings', label: 'Settings', icon: Settings },
    { path: '/admin/support', label: 'Support', icon: HeadphonesIcon },
];

function NavItem({ path, icon: Icon, label, badge }: any) {
    const location = useLocation();
    const isActive = location.pathname.includes(path);

    return (
        <Link to={path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer select-none ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}>
            <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
            <span className="flex-1 text-sm">{label}</span>
            {badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full text-center">
                    {badge}
                </span>
            )}
        </Link>
    );
}

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const [profileOpen, setProfileOpen] = React.useState(false);

    // Close sidebar on route change on mobile
    React.useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const getCurrentLabel = () => {
        const allNavs = [...NAV_OVERVIEW, ...NAV_TOOLS, ...NAV_ADMIN];
        const activeItem = allNavs.find(i => location.pathname.includes(i.path));
        return activeItem?.label || 'Overview';
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
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white p-1">
                        <img
                            src="/images/logo-new.png"
                            alt="PreventVital Logo"
                            className="w-full h-full object-contain filter brightness-0 invert"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-white font-bold text-[14px] truncate tracking-tight">PreventVital</div>
                        <div className="text-slate-400 text-[11px] uppercase tracking-wider">Admin Console</div>
                    </div>
                    <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-hide">
                    <div className="px-3 mb-2 mt-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Overview</span>
                    </div>
                    {NAV_OVERVIEW.map((item) => <NavItem key={item.path} {...item} />)}

                    <div className="px-3 mb-2 mt-6">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tools</span>
                    </div>
                    {NAV_TOOLS.map((item) => <NavItem key={item.path} {...item} />)}

                    <div className="px-3 mb-2 mt-6">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Administration</span>
                    </div>
                    {NAV_ADMIN.map((item) => <NavItem key={item.path} {...item} />)}
                </nav>

                {/* Profile area */}
                <div className="border-t border-white/10 p-3 relative">
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                            AD
                        </div>
                        <div className="flex-1 text-left min-w-0">
                            <div className="text-sm font-medium text-white truncate">System Admin</div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                Healthy
                            </div>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {profileOpen && (
                        <div className="absolute bottom-full left-3 right-3 mb-1 bg-slate-800 border border-white/10 rounded-xl py-1.5 shadow-xl z-50">
                            <Link to="/admin/settings" onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                                <User size={14} /> My Profile
                            </Link>
                            <Link to="/admin/settings" onClick={() => setProfileOpen(false)}
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

                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                                {getCurrentLabel()}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative max-w-xs w-full hidden md:block mr-2">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                placeholder="Search..."
                                className="w-full pl-9 pr-4 py-1.5 bg-gray-50/50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-blue-500 focus:bg-white transition-all text-gray-700"
                            />
                        </div>

                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                        </button>

                        <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-gray-200">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                                AD
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-gray-700">Admin Mode</span>
                                <button onClick={handleLogout} className="text-xs font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
