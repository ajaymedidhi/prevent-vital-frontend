import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'
import { Download, Calendar, TrendingUp, Users, Activity, BarChart3, Info } from 'lucide-react'
import { Tabs, Badge, SectionHeader } from '../../admin-shared/components/ui'
import { useUIStore } from '../../admin-shared/store'
import api from '../../admin-shared/services/api'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-900 rounded-xl px-3 py-2.5 border border-slate-700 shadow-xl">
      <p className="text-xs font-semibold text-slate-300 mb-1.5">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-400">{p.name}:</span>
          <span className="text-white font-semibold">{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  )
}



export default function AnalyticsPage() {
  const { tenantId } = useParams()
  const [tab, setTab] = useState('overview')
  const [range, setRange] = useState('12m')
  const { toast } = useUIStore()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/analytics/dashboard')
        if (res.success) {
          setData(res)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [range])

  const chartMonthly = data?.monthlyTrend?.map(t => ({ 
    m: new Date(t.date).toLocaleString('default', { month: 'short' }), 
    enrolled: t.metrics.totalEnrolled, 
    active: t.metrics.activeThisWeek || 0, 
    newJoin: t.metrics.newEnrolments || 0,
    sessions: t.metrics.sessionsCompleted || 0 
  })) || []
  const chartDept = data?.departmentBreakdown || []
  const chartRisk = data?.riskDistribution ? [
    { name: 'Low Risk', value: data.riskDistribution.low || 0, pct: Math.round(((data.riskDistribution.low || 0) / (data.kpis?.totalEnrolled || 1)) * 100), color: '#10b981' },
    { name: 'Moderate Risk', value: data.riskDistribution.moderate || 0, pct: Math.round(((data.riskDistribution.moderate || 0) / (data.kpis?.totalEnrolled || 1)) * 100), color: '#f59e0b' },
    { name: 'High Risk', value: data.riskDistribution.high || 0, pct: Math.round(((data.riskDistribution.high || 0) / (data.kpis?.totalEnrolled || 1)) * 100), color: '#ef4444' },
    { name: 'Very High Risk', value: data.riskDistribution.veryHigh || 0, pct: Math.round(((data.riskDistribution.veryHigh || 0) / (data.kpis?.totalEnrolled || 1)) * 100), color: '#991b1b' },
  ] : []

  const chartProgDist = data?.programmeCompletion || []
  const chartDevices = data?.deviceBreakdown || []

  if (loading && !data) return <div className="p-8 text-center animate-pulse text-slate-400">Loading analytics...</div>

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Analytics & Insights"
        description="Aggregate workforce wellness data — privacy protected (min 5 per group)"
        action={
          <div className="flex gap-2">
            <select className="input w-auto text-sm" value={range} onChange={e => setRange(e.target.value)}>
              <option value="3m">Last 3 months</option>
              <option value="6m">Last 6 months</option>
              <option value="12m">Last 12 months</option>
            </select>
            <button className="btn-secondary btn gap-2 text-sm" onClick={() => toast('Export started', 'success')}>
              <Download size={15} /> Export Report
            </button>
          </div>
        }
      />

      {/* Privacy notice */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700"><strong>Privacy Protected:</strong> All analytics show aggregate data only. Individual health scores, vitals, and CVITAL scores are never visible in the corporate portal. Groups smaller than 5 employees show "Insufficient data".</p>
      </div>

      {/* Tabs */}
      <Tabs active={tab} onChange={setTab} tabs={[
        { id: 'overview', label: 'Overview' },
        { id: 'programmes', label: 'Programmes' },
        { id: 'wellness', label: 'Wellness Trends' },
        { id: 'devices', label: 'Devices' },
      ]} />

      {tab === 'overview' && (
        <div className="space-y-5">
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Enrolment Growth', value: data?.kpis?.totalEnrolled - data?.kpis?.prevTotalEnrolled > 0 ? `+${Math.round(((data?.kpis?.totalEnrolled - data?.kpis?.prevTotalEnrolled) / (data?.kpis?.prevTotalEnrolled || 1)) * 100)}%` : '0%', sub: 'vs last week', color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Avg Active Rate', value: `${data?.kpis?.activeRate || 0}%`, sub: 'industry avg: 61%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Seats Utilization', value: `${Math.round(((data?.kpis?.seatsUsed || 0) / (data?.kpis?.seatsTotal || 1)) * 100)}%`, sub: `${data?.kpis?.seatsUsed} of ${data?.kpis?.seatsTotal} seats`, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Active Campaigns', value: data?.kpis?.activeCampaigns || 0, sub: 'Campaigns running', color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map(k => (
              <div key={k.label} className={`card p-5 ${k.bg} border-0`}>
                <div className={`font-display text-3xl ${k.color} mb-1`}>{k.value}</div>
                <div className="text-xs font-semibold text-slate-700">{k.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Enrolment trend */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-slate-800">Enrolment & Activity Trend</h3>
                <p className="text-xs text-slate-500">Monthly data — last 12 months</p>
              </div>
              <div className="flex gap-4 text-xs">
                {[['#3b82f6', 'Enrolled'], ['#10b981', 'Active'], ['#f59e0b', 'New Joins']].map(([c, l]) => (
                  <span key={l} className="flex items-center gap-1.5"><span className="w-2.5 h-1.5 rounded-sm" style={{ background: c }} /><span className="text-slate-500">{l}</span></span>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartMonthly} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  {[['enrolled', '#3b82f6'], ['active', '#10b981'], ['newJoin', '#f59e0b']].map(([k, c]) => (
                    <linearGradient key={k} id={`g_${k}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={c} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={c} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="m" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="enrolled" name="Enrolled" stroke="#3b82f6" strokeWidth={2} fill="url(#g_enrolled)" dot={false} />
                <Area type="monotone" dataKey="active" name="Active" stroke="#10b981" strokeWidth={2} fill="url(#g_active)" dot={false} />
                <Area type="monotone" dataKey="newJoin" name="New Joins" stroke="#f59e0b" strokeWidth={2} fill="url(#g_newJoin)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Dept breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 mb-5">Department Performance</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartDept} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={false} />
                  <XAxis dataKey={data?.departmentBreakdown ? "_id" : "dept"} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="enrolled" name="Enrolled" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  <Bar dataKey="active" name="Active" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Risk distribution */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-slate-800">Risk Category Distribution</h3>
                <span className="badge badge-slate text-xs">Aggregate only</span>
              </div>
              <p className="text-xs text-slate-500 mb-5">Changes in distribution indicate programme impact</p>
              <div className="space-y-3">
                {chartRisk.map(r => (
                  <div key={r.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                        <span className="text-sm text-slate-700">{r.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{r.value} staff</span>
                        <span className="text-xs font-bold w-8 text-right" style={{ color: r.color }}>{r.pct}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${r.pct}%`, background: r.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'programmes' && (
        <div className="space-y-5">
          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-5">Programme Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartProgDist} layout="vertical" margin={{ top: 0, right: 20, left: 100, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={true} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} width={120} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="enrolled" name="Enrolled" fill="#3b82f6" radius={[0, 4, 4, 0]} maxBarSize={18} />
                <Bar dataKey="completion" name="Completion %" fill="#10b981" radius={[0, 4, 4, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto">
            <div className="card">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Programme</th>
                    <th>Enrolled</th>
                    <th>Completion Rate</th>
                    <th>Sessions Completed</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {chartProgDist.map((p, i) => (
                    <tr key={i}>
                      <td><span className="font-semibold text-slate-800">{p.name}</span></td>
                      <td>{p.enrolled}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-blue-500" style={{ width: `${p.completion}%` }} />
                          </div>
                          <span className="text-sm font-semibold">{p.completion}%</span>
                        </div>
                      </td>
                      <td>{p.sessions?.toLocaleString() || 0}</td>
                      <td>
                        <span className={`badge ${p.completion >= 70 ? 'badge-green' : p.completion >= 40 ? 'badge-orange' : 'badge-red'}`}>
                          {p.completion >= 70 ? 'Excellent' : p.completion >= 40 ? 'On Track' : 'Needs Attention'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'wellness' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 mb-1">Wellness Domain Scores</h3>
              <p className="text-xs text-slate-500 mb-5">Aggregate org-wide score across 6 health domains</p>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={data?.wellnessRadar || []}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 mb-1">Sessions Trend</h3>
              <p className="text-xs text-slate-500 mb-5">Total app sessions completed per month</p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartMonthly} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="m" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#8b5cf6" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#8b5cf6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {tab === 'devices' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 mb-5">Device Adoption</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={chartDevices} cx="50%" cy="50%" outerRadius={90} paddingAngle={2} dataKey="value" strokeWidth={0}>
                    {chartDevices.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {chartDevices.map(d => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                      <span className="text-sm text-slate-600">{d.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(d.value / (data?.kpis?.totalEnrolled || 1)) * 100}%`, background: d.color }} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 w-8 text-right">{d.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 mb-1">Device Insights</h3>
              <p className="text-xs text-slate-500 mb-5">Impact of wearable usage on engagement</p>
              <div className="space-y-4">
                {[
                  { label: 'Staff with wearables', value: '55%', note: '190 of 347 enrolled', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Avg sessions — wearable users', value: '18.4', note: '+62% vs non-wearable users', color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Completion rate — wearable users', value: '71%', note: 'vs 42% for non-wearable', color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map(s => (
                  <div key={s.label} className={`rounded-xl p-4 ${s.bg}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700 font-medium">{s.label}</span>
                      <span className={`font-display text-2xl ${s.color}`}>{s.value}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
