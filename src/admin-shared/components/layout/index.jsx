import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import {
  LayoutDashboard, Users, BookOpen, Megaphone, BarChart3,
  CreditCard, Settings, Shield, HeadphonesIcon, Bell, Menu,
  LogOut, ChevronDown, Search, Building2, Star,
  Activity, Zap, X, User, Key, FileText
} from 'lucide-react'
import { useUIStore } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { logout as reduxLogout } from '../../../store'
import { Avatar } from '../ui'

const NAV_MAIN = [
  { to: '/corporate/TENANT_ID/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/corporate/TENANT_ID/employees', icon: Users, label: 'Staff', badge: null },
  { to: '/corporate/TENANT_ID/programmes', icon: BookOpen, label: 'Programmes' },
  { to: '/corporate/TENANT_ID/campaigns', icon: Megaphone, label: 'Campaigns' },
  { to: '/corporate/TENANT_ID/challenges', icon: Zap, label: 'Challenges', badge: 'New' },
  { to: '/corporate/TENANT_ID/analytics', icon: BarChart3, label: 'Analytics' },
]

const NAV_ADMIN = [
  { to: '/corporate/TENANT_ID/billing', icon: CreditCard, label: 'Billing' },
  { to: '/corporate/TENANT_ID/settings', icon: Settings, label: 'Settings' },
  { to: '/corporate/TENANT_ID/security', icon: Shield, label: 'Security' },
  { to: '/corporate/TENANT_ID/support', icon: HeadphonesIcon, label: 'Support' },
]

const NAV_SUPER = [
  { to: '/corporate/TENANT_ID/super-admin', icon: Zap, label: 'Super Admin', special: true },
]

function NavItem({ to, icon: Icon, label, badge, special, tenantId }) {
  const actualTo = to.replace('TENANT_ID', tenantId || 'default');
  return (
    <NavLink to={actualTo}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer select-none ${isActive ? 'bg-blue-600 text-white shadow-md' : special ? 'border border-amber-500/20 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:text-amber-300' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`
      }>
      {({ isActive }) => (
        <>
          <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
          <span className="flex-1 text-sm">{label}</span>
          {badge && (
            <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center">
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

export function Sidebar() {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const logout = () => dispatch(reduxLogout())
  const admin = user;
  const adminName = user?.profile?.firstName ? `${user.profile.firstName} ${user.profile?.lastName || ''}`.trim() : (user?.name || 'Admin');

  const org = { displayName: user?.corporateProfile?.department || 'Organisation', name: user?.corporateProfile?.department || 'Org', seats: 50, seatsUsed: 12 }

  const { sidebarOpen, toggleSidebar } = useUIStore()
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={toggleSidebar} />
      )}

      <aside className={`sidebar transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Header / Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          {org?.logo
            ? <img src={org.logo} alt={org?.name} className="w-8 h-8 rounded-lg object-contain bg-white/10 p-1" />
            : <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {(org?.name || 'P')[0]}
            </div>
          }
          <div className="flex-1 min-w-0">
            <div className="text-white font-semibold text-sm truncate">{org?.displayName || 'PreventalVital'}</div>
            <div className="text-slate-400 text-xs">Corporate Admin</div>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Nav scroll area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <div className="px-3 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overview</span>
          </div>
          {NAV_MAIN.map(n => <NavItem key={n.to} {...n} tenantId={user?.corporateId} />)}

          <div className="px-3 mt-5 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Administration</span>
          </div>
          {NAV_ADMIN.map(n => <NavItem key={n.to} {...n} tenantId={user?.corporateId} />)}

          {admin?.role === 'super_admin' && (
            <>
              <div className="px-3 mt-5 mb-2">
                <span className="text-xs font-semibold text-amber-500/70 uppercase tracking-wider">Platform</span>
              </div>
              {NAV_SUPER.map(n => <NavItem key={n.to} {...n} tenantId={user?.corporateId} />)}
            </>
          )}
        </div>

        {/* Subscription usage bar */}
        {org && (
          <div className="mx-3 mb-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-400">Seat Usage</span>
              <span className="text-xs font-semibold text-white">{org.seatsUsed}/{org.seats}</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-700"
                style={{ width: `${Math.min((org.seatsUsed / org.seats) * 100, 100)}%` }} />
            </div>
            <div className="mt-1.5 text-xs text-slate-500">
              {org.seats - org.seatsUsed} seats remaining
            </div>
          </div>
        )}

        {/* Profile area */}
        <div className="border-t border-white/10 p-3 relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
            <Avatar name={adminName} src={user?.photo} size="sm" />
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-medium text-white truncate">{adminName}</div>
              <div className="text-xs text-slate-400 truncate capitalize">{(user?.role || 'Admin').replace('_', ' ')}</div>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-1 bg-slate-800 border border-white/10 rounded-xl py-1.5 shadow-modal">
              <NavLink to={`/corporate/${user?.tenantId || user?.corporateId || 'default'}/settings`} onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                <User size={14} /> My Profile
              </NavLink>
              <NavLink to={`/corporate/${user?.tenantId || user?.corporateId || 'default'}/security`} onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                <Key size={14} /> Security
              </NavLink>
              <div className="h-px bg-white/10 my-1" />
              <button onClick={logout}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

// ── Top Header ────────────────────────────────────────────────────────────────
export function Header() {
  const { toggleSidebar, toggleNotif } = useUIStore()
  const { user } = useSelector(state => state.auth)
  const adminName = user?.profile?.firstName ? user.profile.firstName : (user?.name?.split(' ')[0] || 'Admin');
  const [unread] = useState(3)

  return (
    <header className="corp-header">

      <button onClick={toggleSidebar} className="lg:hidden btn-icon btn-ghost rounded-xl">
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-sm hidden md:block">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input placeholder="Search staff, campaigns..." className="input pl-9 h-9 text-sm" />
      </div>

      <div className="flex-1" />

      {/* Notifications */}
      <button onClick={toggleNotif} className="relative btn-icon btn-ghost rounded-xl">
        <Bell size={18} className="text-slate-600" />
        {unread > 0 && <span className="notif-dot" />}
      </button>

      {/* Admin info */}
      <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
        <Avatar name={adminName} src={user?.photo} size="sm" />
        <div className="hidden md:block">
          <div className="text-sm font-semibold text-slate-800 leading-none">{adminName}</div>
          <div className="text-xs text-slate-400 mt-0.5 capitalize">{(user?.role || 'Admin').replace('_', ' ')}</div>
        </div>
      </div>
    </header>
  )
}

// ── Notifications Panel ────────────────────────────────────────────────────────
export function NotificationsPanel() {
  const { notifOpen, toggleNotif } = useUIStore()
  const [notifs] = useState([
    { id: 1, cat: 'enrolment', title: '15 new staff enrolled', body: 'Great momentum on the BP Control Drive!', time: '5m ago', read: false, icon: '👥' },
    { id: 2, cat: 'billing', title: 'Invoice paid ₹1,59,300', body: 'Annual Enterprise plan payment confirmed.', time: '2h ago', read: false, icon: '✅' },
    { id: 3, cat: 'programme', title: 'Campaign 75% enrolled!', body: 'Q1 BP Control Drive ahead of target.', time: '4h ago', read: false, icon: '🎯' },
    { id: 4, cat: 'security', title: 'New device login', body: 'Chrome on Windows, Hyderabad IP.', time: '1d ago', read: true, icon: '🔐' },
    { id: 5, cat: 'staff', title: '23 staff inactive 30+ days', body: 'Consider sending an engagement nudge.', time: '1d ago', read: true, icon: '⚠️' },
  ])

  const catColors = { enrolment: 'border-l-blue-400', billing: 'border-l-emerald-400', programme: 'border-l-purple-400', security: 'border-l-orange-400', staff: 'border-l-red-400' }

  if (!notifOpen) return null
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={toggleNotif} />
      <div className="fixed top-16 right-4 w-96 bg-white rounded-2xl shadow-modal border border-slate-200 z-50 overflow-hidden animate-slide-in-right">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-semibold text-slate-900">Notifications</h3>
            <p className="text-xs text-slate-500 mt-0.5">3 unread messages</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Mark all read</button>
            <button onClick={toggleNotif} className="btn-icon btn-ghost btn-sm rounded-lg"><X size={14} /></button>
          </div>
        </div>
        <div className="overflow-y-auto max-h-96">
          {notifs.map(n => (
            <div key={n.id} className={`flex gap-3 px-4 py-3.5 border-l-2 ${catColors[n.cat] || 'border-l-slate-200'} ${!n.read ? 'bg-blue-50/40' : ''} hover:bg-slate-50 transition-colors cursor-pointer`}>
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-sm font-semibold text-slate-800 ${!n.read ? 'font-bold' : ''}`}>{n.title}</span>
                  {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{n.body}</p>
                <span className="text-xs text-slate-400 mt-1 block">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-slate-100">
          <NavLink to="#" onClick={toggleNotif} className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-1">
            View all notifications →
          </NavLink>
        </div>
      </div>
    </>
  )
}

// ── Main Layout ───────────────────────────────────────────────────────────────
export function Layout({ children }) {
  return (
    <div className="min-h-screen mesh-bg">
      <Sidebar />
      <Header />
      <NotificationsPanel />
      <main className="corp-main">
        <div className="p-6 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
