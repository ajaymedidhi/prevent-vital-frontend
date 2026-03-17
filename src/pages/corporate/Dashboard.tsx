import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Users, Activity, Target, CreditCard, TrendingUp, AlertTriangle, Zap, ChevronRight, Calendar, BarChart3 } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { StatCard, WellnessBadge, Avatar, Skeleton, CardSkeleton } from '../../admin-shared/components/ui';
import api from '../../admin-shared/services/api';

const WELLNESS_COLORS = { active: '#10b981', engaged: '#3b82f6', drifting: '#f59e0b', inactive: '#ef4444', not_started: '#94a3b8' }

const CustomTooltip = ({ active, payload, label }: any) => {
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
  // @ts-ignore
  const org = user?.corporateProfile?.department ? { displayName: user.corporateProfile.department, onboardingComplete: true, onboardingStep: 5 } : { displayName: 'Organisation', onboardingComplete: true, onboardingStep: 5 };

  const navigate = useNavigate()
  const { tenantId } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/analytics/dashboard');
        if (res.success) {
          setData(res);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-64 skeleton" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map(i => <CardSkeleton key={i} />)}
      </div>
    </div>
  )

  const currentHour = new Date().getHours();
  let greetingTime = 'evening';
  if (currentHour < 12) greetingTime = 'morning';
  else if (currentHour < 18) greetingTime = 'afternoon';

  const displayOrgName = data?.orgName || org?.displayName || 'Organisation';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">
            {new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date())}
          </p>
          <h1 className="font-display text-2xl text-slate-900 mt-0.5 capitalize">
            Good {greetingTime}, {displayOrgName} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">Here's your workforce wellness overview</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/corporate/${tenantId}/analytics`)} className="btn-secondary btn gap-2">
            <BarChart3 size={15} /> Full Analytics
          </button>
          <button onClick={() => navigate(`/corporate/${tenantId}/campaigns`)} className="btn-primary btn gap-2">
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
          <button onClick={() => navigate(`/corporate/${tenantId}/settings`)} className="bg-white text-blue-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors flex-shrink-0">
            Continue Setup →
          </button>
        </div>
      )}

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Staff Enrolled" 
          value={data?.kpis?.totalEnrolled || 0} 
          sub={`of ${data?.kpis?.seatsTotal || 0} seats`} 
          icon={Users}
          iconBg="bg-blue-100" 
          iconColor="text-blue-600" 
          delay={0} 
        />
        <StatCard 
          label="Active This Week" 
          value={data?.kpis?.activeThisWeek || 0} 
          sub={`${data?.kpis?.activeRate || 0}% engagement rate`} 
          icon={Activity}
          iconBg="bg-emerald-100" 
          iconColor="text-emerald-600" 
          delay={80} 
        />
        <StatCard 
          label="Active Campaigns" 
          value={data?.kpis?.activeCampaigns || 0} 
          sub="Currently running" 
          icon={Target}
          iconBg="bg-purple-100" 
          iconColor="text-purple-600" 
          delay={160} 
        />
        <StatCard
          label="Renewal In"
          value={data?.kpis?.contractEnd ? `${Math.ceil((new Date(data.kpis.contractEnd).getTime() - new Date().getTime()) / (1000 * 3600 * 24))}d` : 'N/A'}
          sub={`Seats Used: ${data?.kpis?.seatsUsed || 0}`}
          icon={CreditCard}
          iconBg="bg-amber-100" 
          iconColor="text-amber-600" 
          delay={240} 
        />
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
          {(() => {
            const trendData = (data?.monthlyTrend || []).map((t: any) => ({
              m: new Date(t.date).toLocaleString('default', { month: 'short' }),
              enrolled: t.metrics.totalEnrolled,
              active: t.metrics.activeThisWeek || Math.round(t.metrics.totalEnrolled * 0.8)
            }));
            
            if (trendData.length === 0) return <div className="h-[220px] flex items-center justify-center text-slate-400 text-sm">No trend data available yet</div>
            return (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEnrolled" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="m"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="enrolled"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorEnrolled)"
                    name="Total Enrolled"
                  />
                  <Area
                    type="monotone"
                    dataKey="active"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorActive)"
                    name="Weekly Active"
                  />
                </AreaChart>
              </ResponsiveContainer>
            );
          })()}
        </div>

        {/* Wellness distribution */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <h3 className="font-semibold text-slate-800 mb-1">Wellness Status</h3>
          <p className="text-xs text-slate-500 mb-4">{data?.kpis?.totalEnrolled || 0} enrolled staff</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={data?.wellnessDistribution?.map((d: any) => ({ name: d._id?.replace('_', ' ').charAt(0).toUpperCase() + d._id?.replace('_', ' ').slice(1), value: d.count, color: WELLNESS_COLORS[d._id as keyof typeof WELLNESS_COLORS] || WELLNESS_COLORS.not_started })) || []} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value" strokeWidth={0}>
                {(data?.wellnessDistribution || []).map((entry: any, i: number) => <Cell key={i} fill={WELLNESS_COLORS[entry._id as keyof typeof WELLNESS_COLORS] || WELLNESS_COLORS.not_started} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {(data?.wellnessDistribution || []).map((w: any) => {
              const color = WELLNESS_COLORS[w._id as keyof typeof WELLNESS_COLORS] || WELLNESS_COLORS.not_started;
              const name = w._id?.replace('_', ' ').charAt(0).toUpperCase() + w._id?.replace('_', ' ').slice(1);
              return (
                <div key={w._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-xs text-slate-600">{name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(w.count / (data?.kpis?.totalEnrolled || 1)) * 100}%`, background: color }} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 w-6 text-right">{w.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Department + Campaigns ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Department breakdown */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-800">Department Performance</h3>
            <button onClick={() => navigate(`/corporate/${tenantId}/employees`)} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3.5">
            {(data?.departmentBreakdown || []).slice(0, 6).map((d: any) => {
              const rate = d.enrolled > 0 ? Math.round((d.active / d.enrolled) * 100) : 0;
              return (
                <div key={d._id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-700 font-medium">{d._id}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{d.enrolled} enrolled</span>
                      <span className={`text-xs font-semibold ${rate >= 75 ? 'text-emerald-600' : rate >= 65 ? 'text-amber-600' : 'text-red-500'}`}>{rate}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-700"
                      style={{ width: `${Math.max(rate, 5)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active campaigns */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '250ms' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-800">Active Campaigns</h3>
            <button onClick={() => navigate(`/corporate/${tenantId}/campaigns`)} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Manage <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-4">
            {(data?.activeCampaignsList || []).map((c: any) => {
              const pct = c.stats?.enrolmentPct || 0;
              return (
                <div key={c._id} className="group p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
                  onClick={() => navigate(`/corporate/${tenantId}/campaigns`)}>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ background: c.programmeId?.colour || '#3b82f6' }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-slate-800 truncate">{c.name}</span>
                        <span className={`badge text-xs ${c.status === 'active' ? 'badge-green' : 'badge-slate'}`}>{c.status}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{c.programmeId?.name}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: c.programmeId?.colour || '#3b82f6' }} />
                        </div>
                        <span className="text-xs font-semibold text-slate-600 flex-shrink-0">{pct}% enrolled</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{c.stats?.enrolled || 0} of {c.stats?.targetCount || 0} staff</p>
                    </div>
                  </div>
                </div>
              )
            })}
            {(!data?.activeCampaignsList || data.activeCampaignsList.length === 0) && (
              <div className="text-center py-8">
                <p className="text-sm text-slate-400 italic">No active campaigns running</p>
              </div>
            )}
          </div>
          <button onClick={() => navigate(`/corporate/${tenantId}/campaigns`)} className="btn-primary btn w-full justify-center mt-4 text-sm">
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
            <button onClick={() => navigate(`/corporate/${tenantId}/employees`)} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              All staff <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {(data?.topEngagedStaff || []).map((s: any, i: number) => (
              <div key={s.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
                  #{i + 1}
                </div>
                <Avatar name={s.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800 truncate">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.dept} · {s.status}</div>
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
              { icon: '⚠️', title: '23 staff inactive 30+ days', desc: 'Consider sending an engagement nudge email.', action: 'Send Nudge', color: 'border-l-orange-400 bg-orange-50', onClick: () => navigate(`/corporate/${tenantId}/employees?wellnessStatus=inactive`) },
              { icon: '🎯', title: 'BP Control Drive at 63%', desc: 'Campaign goal is 75%. 47 staff still haven\'t enrolled.', action: 'View Campaign', color: 'border-l-blue-400 bg-blue-50', onClick: () => navigate(`/corporate/${tenantId}/campaigns`) },
              { icon: '💺', title: 'Seats at 69% capacity', desc: '347/500 seats used. Approaching 70% threshold.', action: 'Add Seats', color: 'border-l-emerald-400 bg-emerald-50', onClick: () => navigate(`/corporate/${tenantId}/billing`) },
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
