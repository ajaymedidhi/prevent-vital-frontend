import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Activity, Target, CreditCard, TrendingUp, AlertTriangle, Zap, ChevronRight, Calendar, BarChart3 } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { StatCard, WellnessBadge, Avatar, Skeleton, CardSkeleton } from '../../admin-shared/components/ui';
import axios from 'axios';

const WELLNESS_COLORS = { active: '#10b981', engaged: '#3b82f6', drifting: '#f59e0b', inactive: '#ef4444', not_started: '#94a3b8' }
const RISK_COLORS = ['#10b981', '#f59e0b', '#ef4444', '#991b1b']

// Mock rich data for demo
const monthlyData = [
  { month: 'Apr', enrolled: 240, active: 180, sessions: 1200 },
  { month: 'May', enrolled: 258, active: 196, sessions: 1380 },
  { month: 'Jun', enrolled: 271, active: 201, sessions: 1450 },
  { month: 'Jul', enrolled: 283, active: 215, sessions: 1520 },
  { month: 'Aug', enrolled: 295, active: 224, sessions: 1680 },
  { month: 'Sep', enrolled: 306, active: 231, sessions: 1720 },
  { month: 'Oct', enrolled: 314, active: 238, sessions: 1850 },
  { month: 'Nov', enrolled: 320, active: 242, sessions: 1900 },
  { month: 'Dec', enrolled: 328, active: 249, sessions: 1980 },
  { month: 'Jan', enrolled: 334, active: 253, sessions: 2020 },
  { month: 'Feb', enrolled: 341, active: 261, sessions: 2150 },
  { month: 'Mar', enrolled: 347, active: 268, sessions: 2280 },
]

const wellnessData = [
  { name: 'Active', value: 139, color: '#10b981' },
  { name: 'Engaged', value: 87, color: '#3b82f6' },
  { name: 'Drifting', value: 69, color: '#f59e0b' },
  { name: 'Inactive', value: 52, color: '#ef4444' },
]

const deptData = [
  { dept: 'Engineering', enrolled: 92, active: 71, rate: 77 },
  { dept: 'Finance', enrolled: 54, active: 39, rate: 72 },
  { dept: 'HR', enrolled: 38, active: 31, rate: 82 },
  { dept: 'Sales', enrolled: 67, active: 48, rate: 72 },
  { dept: 'Operations', enrolled: 59, active: 41, rate: 69 },
  { dept: 'Product', enrolled: 37, active: 29, rate: 78 },
]

const topStaff = [
  { name: 'Aarav Sharma', dept: 'Engineering', sessions: 42, streak: '28 day streak 🔥', status: 'active' },
  { name: 'Priya Patel', dept: 'HR', sessions: 38, streak: '21 day streak 🔥', status: 'active' },
  { name: 'Rohit Kumar', dept: 'Finance', sessions: 35, streak: '14 day streak', status: 'active' },
  { name: 'Ananya Reddy', dept: 'Product', sessions: 33, streak: '12 day streak', status: 'engaged' },
]

const campaigns = [
  { name: 'Q1 BP Control Drive', programme: 'Hypertension Control', enrolled: 218, target: 347, pct: 63, status: 'active', colour: '#ef4444' },
  { name: 'Diabetes Awareness', programme: 'Diabetes Management', enrolled: 78, target: 120, pct: 65, status: 'active', colour: '#f97316' },
  { name: 'Mindfulness at Work', programme: 'Stress & Mindfulness', enrolled: 234, target: 310, pct: 75, status: 'completed', colour: '#8b5cf6' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-900 rounded-xl px-3 py-2.5 border border-slate-700 shadow-xl">
      <p className="text-xs font-semibold text-slate-300 mb-1.5">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-400">{p.name}:</span>
          <span className="text-white font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function CorporateDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const org: any = { displayName: user?.corporateProfile?.department || 'Organisation', onboardingComplete: true, seats: 50 }; // Fallback until backend returns full org details

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => { setTimeout(() => setLoading(false), 600) }, [])

  if (loading) return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-64 skeleton" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map(i => <CardSkeleton key={i} />)}
      </div>
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">Monday, March 2, 2026</p>
          <h1 className="font-display text-2xl text-slate-900 mt-0.5">
            Good morning, {org?.displayName || 'Admin'} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">Here's your workforce wellness overview</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate('/analytics')} className="btn-secondary btn gap-2">
            <BarChart3 size={15} /> Full Analytics
          </button>
          <button onClick={() => navigate('/campaigns')} className="btn-primary btn gap-2">
            <Zap size={15} /> New Campaign
          </button>
        </div>
      </div>

      {/* ── Onboarding banner ─────────────────────────────────────────────── */}
      {org && !org.onboardingComplete && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 flex items-center gap-5 text-white">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Target size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="font-semibold">Complete your portal setup</div>
            <div className="text-blue-200 text-sm mt-0.5">You're {org.onboardingStep || 0}/5 steps done. Finish to unlock all features.</div>
            <div className="h-1.5 bg-white/20 rounded-full mt-2 max-w-xs overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${((org.onboardingStep || 0) / 5) * 100}%` }} />
            </div>
          </div>
          <button onClick={() => navigate('/org-profile')} className="bg-white text-blue-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors flex-shrink-0">
            Continue Setup →
          </button>
        </div>
      )}

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Staff Enrolled" value="347" sub={`of ${org?.seats || 500} seats`} icon={Users}
          iconBg="bg-blue-100" iconColor="text-blue-600" trend={4.2} trendLabel="+14 this month" delay={0} />
        <StatCard label="Active This Week" value="268" sub="77% engagement rate" icon={Activity}
          iconBg="bg-emerald-100" iconColor="text-emerald-600" trend={2.8} trendLabel="+7 from last week" delay={80} />
        <StatCard label="Active Campaigns" value="2" sub="1 completed this month" icon={Target}
          iconBg="bg-purple-100" iconColor="text-purple-600" delay={160} />
        <StatCard label="Renewal In" value="305d" sub="Auto-renewal on · Enterprise" icon={CreditCard}
          iconBg="bg-amber-100" iconColor="text-amber-600" delay={240} />
      </div>

      {/* ── Charts row ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Enrolment trend */}
        <div className="card p-6 lg:col-span-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-800">Enrolment & Activity Trend</h3>
              <p className="text-xs text-slate-500 mt-0.5">Last 12 months</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500" /><span className="text-slate-500">Enrolled</span></span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" /><span className="text-slate-500">Active</span></span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradEnrolled" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="enrolled" name="Enrolled" stroke="#3b82f6" strokeWidth={2} fill="url(#gradEnrolled)" dot={false} activeDot={{ r: 4, fill: '#3b82f6' }} />
              <Area type="monotone" dataKey="active" name="Active" stroke="#10b981" strokeWidth={2} fill="url(#gradActive)" dot={false} activeDot={{ r: 4, fill: '#10b981' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Wellness distribution */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <h3 className="font-semibold text-slate-800 mb-1">Wellness Status</h3>
          <p className="text-xs text-slate-500 mb-4">347 enrolled staff</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={wellnessData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value" strokeWidth={0}>
                {wellnessData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {wellnessData.map(w => (
              <div key={w.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: w.color }} />
                  <span className="text-xs text-slate-600">{w.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(w.value / 347) * 100}%`, background: w.color }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 w-6 text-right">{w.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Department + Campaigns ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Department breakdown */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-800">Department Breakdown</h3>
            <button onClick={() => navigate('/staff')} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3.5">
            {deptData.map(d => (
              <div key={d.dept}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-700 font-medium">{d.dept}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{d.enrolled} enrolled</span>
                    <span className={`text-xs font-semibold ${d.rate >= 75 ? 'text-emerald-600' : d.rate >= 65 ? 'text-amber-600' : 'text-red-500'}`}>{d.rate}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-700"
                    style={{ width: `${d.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active campaigns */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '250ms' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-800">Active Campaigns</h3>
            <button onClick={() => navigate('/campaigns')} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Manage <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-4">
            {campaigns.map(c => (
              <div key={c.name} className="group p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
                onClick={() => navigate('/campaigns')}>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ background: c.colour }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-slate-800 truncate">{c.name}</span>
                      <span className={`badge text-xs ${c.status === 'active' ? 'badge-green' : 'badge-slate'}`}>{c.status}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{c.programme}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.pct}%`, background: c.colour }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 flex-shrink-0">{c.pct}% enrolled</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{c.enrolled} of {c.target} staff</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/campaigns')} className="btn-primary btn w-full justify-center mt-4 text-sm">
            <Zap size={14} /> Launch New Campaign
          </button>
        </div>
      </div>

      {/* ── Top Engaged Staff + Alerts ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top engaged */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-800">Most Engaged Staff</h3>
            <button onClick={() => navigate('/staff')} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              All staff <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {topStaff.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
                  #{i + 1}
                </div>
                <Avatar name={s.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800 truncate">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.dept} · {s.streak}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-slate-800">{s.sessions}</div>
                  <div className="text-xs text-slate-400">sessions</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action alerts */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '350ms' }}>
          <h3 className="font-semibold text-slate-800 mb-5">Action Required</h3>
          <div className="space-y-3">
            {[
              { icon: '⚠️', title: '23 staff inactive 30+ days', desc: 'Consider sending an engagement nudge email.', action: 'Send Nudge', color: 'border-l-orange-400 bg-orange-50', onClick: () => navigate('/staff?wellnessStatus=inactive') },
              { icon: '🎯', title: 'BP Control Drive at 63%', desc: 'Campaign goal is 75%. 47 staff still haven\'t enrolled.', action: 'View Campaign', color: 'border-l-blue-400 bg-blue-50', onClick: () => navigate('/campaigns') },
              { icon: '💺', title: 'Seats at 69% capacity', desc: '347/500 seats used. Approaching 70% threshold.', action: 'Add Seats', color: 'border-l-emerald-400 bg-emerald-50', onClick: () => navigate('/billing') },
            ].map(a => (
              <div key={a.title} className={`p-4 rounded-xl border-l-2 ${a.color} flex gap-3 cursor-pointer hover:opacity-90 transition-opacity`} onClick={a.onClick}>
                <span className="text-xl flex-shrink-0">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800">{a.title}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{a.desc}</div>
                </div>
                <button className="text-xs font-semibold text-blue-600 flex-shrink-0 hover:text-blue-700">{a.action} →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
