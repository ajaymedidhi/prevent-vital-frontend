import { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'
import { Download, Calendar, TrendingUp, Users, Activity, BarChart3, Info } from 'lucide-react'
import { Tabs, Badge, SectionHeader } from '../../admin-shared/components/ui'
import { useUIStore } from '../../admin-shared/store'

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

// 12 months data
const monthlyEnrol = [
  {m:'Apr',enrolled:240,active:180,newJoin:18,sessions:1200},{m:'May',enrolled:258,active:196,newJoin:22,sessions:1380},
  {m:'Jun',enrolled:271,active:201,newJoin:16,sessions:1450},{m:'Jul',enrolled:283,active:215,newJoin:14,sessions:1520},
  {m:'Aug',enrolled:295,active:224,newJoin:15,sessions:1680},{m:'Sep',enrolled:306,active:231,newJoin:12,sessions:1720},
  {m:'Oct',enrolled:314,active:238,newJoin:10,sessions:1850},{m:'Nov',enrolled:320,active:242,newJoin:8,sessions:1900},
  {m:'Dec',enrolled:328,active:249,newJoin:9,sessions:1980},{m:'Jan',enrolled:334,active:253,newJoin:7,sessions:2020},
  {m:'Feb',enrolled:341,active:261,newJoin:8,sessions:2150},{m:'Mar',enrolled:347,active:268,newJoin:7,sessions:2280},
]

const programmeCompletion = [
  { name:'Hypertension Control', enrolled:218, completion:63, sessions:1820 },
  { name:'Stress & Mindfulness', enrolled:234, completion:81, sessions:2100 },
  { name:'Active Lifestyle', enrolled:156, completion:45, sessions:980 },
  { name:'Diabetes Management', enrolled:78, completion:10, sessions:420 },
  { name:'Nutrition Reset', enrolled:89, completion:34, sessions:610 },
]

const deptData = [
  { dept:'Engineering', enrolled:92, active:71, rate:77 },
  { dept:'Finance', enrolled:54, active:39, rate:72 },
  { dept:'HR', enrolled:38, active:31, rate:82 },
  { dept:'Sales', enrolled:67, active:48, rate:72 },
  { dept:'Operations', enrolled:59, active:41, rate:69 },
  { dept:'Product', enrolled:37, active:29, rate:78 },
]

const riskDist = [
  { name:'Low Risk', value:121, pct:35, color:'#10b981' },
  { name:'Moderate Risk', value:139, pct:40, color:'#f59e0b' },
  { name:'High Risk', value:62, pct:18, color:'#ef4444' },
  { name:'Very High Risk', value:25, pct:7, color:'#991b1b' },
]

const wellnessRadar = [
  { subject:'Activity', score:72 },
  { subject:'Nutrition', score:58 },
  { subject:'Sleep', score:63 },
  { subject:'Stress', score:69 },
  { subject:'Cardiac', score:74 },
  { subject:'Metabolic', score:61 },
]

const deviceBreakdown = [
  { name:'Apple Watch', value:52, color:'#374151' },
  { name:'Fitbit', value:38, color:'#ec4899' },
  { name:'BP Monitor', value:71, color:'#3b82f6' },
  { name:'Google Fit', value:29, color:'#10b981' },
  { name:'No Device', value:157, color:'#e2e8f0' },
]

export default function AnalyticsPage() {
  const [tab, setTab] = useState('overview')
  const [range, setRange] = useState('12m')
  const { toast } = useUIStore()

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
            <button className="btn-secondary btn gap-2 text-sm" onClick={() => toast('Export started','success')}>
              <Download size={15}/> Export Report
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
        { id:'overview', label:'Overview' },
        { id:'programmes', label:'Programmes' },
        { id:'wellness', label:'Wellness Trends' },
        { id:'devices', label:'Devices' },
      ]} />

      {tab === 'overview' && (
        <div className="space-y-5">
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'Enrolment Growth', value:'+29%', sub:'vs same period last year', color:'text-blue-600', bg:'bg-blue-50' },
              { label:'Avg Active Rate', value:'77%', sub:'industry avg: 61%', color:'text-emerald-600', bg:'bg-emerald-50' },
              { label:'Sessions This Month', value:'2,280', sub:'+15% vs last month', color:'text-purple-600', bg:'bg-purple-50' },
              { label:'Completion Rate', value:'54%', sub:'top quartile: 61%', color:'text-amber-600', bg:'bg-amber-50' },
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
                {[['#3b82f6','Enrolled'],['#10b981','Active'],['#f59e0b','New Joins']].map(([c,l]) => (
                  <span key={l} className="flex items-center gap-1.5"><span className="w-2.5 h-1.5 rounded-sm" style={{background:c}}/><span className="text-slate-500">{l}</span></span>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyEnrol} margin={{top:4,right:4,left:-20,bottom:0}}>
                <defs>
                  {[['enrolled','#3b82f6'],['active','#10b981'],['newJoin','#f59e0b']].map(([k,c]) => (
                    <linearGradient key={k} id={`g_${k}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={c} stopOpacity={0.15}/>
                      <stop offset="95%" stopColor={c} stopOpacity={0}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                <XAxis dataKey="m" tick={{fontSize:11,fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Area type="monotone" dataKey="enrolled" name="Enrolled" stroke="#3b82f6" strokeWidth={2} fill="url(#g_enrolled)" dot={false}/>
                <Area type="monotone" dataKey="active" name="Active" stroke="#10b981" strokeWidth={2} fill="url(#g_active)" dot={false}/>
                <Area type="monotone" dataKey="newJoin" name="New Joins" stroke="#f59e0b" strokeWidth={2} fill="url(#g_newJoin)" dot={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Dept breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 mb-5">Department Performance</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={deptData} margin={{top:0,right:0,left:-25,bottom:0}} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={false}/>
                  <XAxis dataKey="dept" tick={{fontSize:10,fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:10,fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="enrolled" name="Enrolled" fill="#3b82f6" radius={[4,4,0,0]} maxBarSize={28}/>
                  <Bar dataKey="active" name="Active" fill="#10b981" radius={[4,4,0,0]} maxBarSize={28}/>
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
                {riskDist.map(r => (
                  <div key={r.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{background:r.color}}/>
                        <span className="text-sm text-slate-700">{r.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{r.value} staff</span>
                        <span className="text-xs font-bold w-8 text-right" style={{color:r.color}}>{r.pct}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{width:`${r.pct}%`,background:r.color}}/>
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
              <BarChart data={programmeCompletion} layout="vertical" margin={{top:0,right:20,left:100,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={true} horizontal={false}/>
                <XAxis type="number" tick={{fontSize:11,fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                <YAxis dataKey="name" type="category" tick={{fontSize:11,fill:'#374151'}} axisLine={false} tickLine={false} width={120}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="enrolled" name="Enrolled" fill="#3b82f6" radius={[0,4,4,0]} maxBarSize={18}/>
                <Bar dataKey="completion" name="Completion %" fill="#10b981" radius={[0,4,4,0]} maxBarSize={18}/>
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
                  {programmeCompletion.map((p,i) => (
                    <tr key={i}>
                      <td><span className="font-semibold text-slate-800">{p.name}</span></td>
                      <td>{p.enrolled}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-blue-500" style={{width:`${p.completion}%`}}/>
                          </div>
                          <span className="text-sm font-semibold">{p.completion}%</span>
                        </div>
                      </td>
                      <td>{p.sessions.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${p.completion>=70?'badge-green':p.completion>=40?'badge-orange':'badge-red'}`}>
                          {p.completion>=70?'Excellent':p.completion>=40?'On Track':'Needs Attention'}
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
                <RadarChart data={wellnessRadar}>
                  <PolarGrid stroke="#e2e8f0"/>
                  <PolarAngleAxis dataKey="subject" tick={{fontSize:11,fill:'#64748b'}}/>
                  <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2}/>
                  <Tooltip content={<CustomTooltip/>}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 mb-1">Sessions Trend</h3>
              <p className="text-xs text-slate-500 mb-5">Total app sessions completed per month</p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={monthlyEnrol} margin={{top:4,right:4,left:-20,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                  <XAxis dataKey="m" tick={{fontSize:11,fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#8b5cf6" strokeWidth={2.5} dot={false} activeDot={{r:5,fill:'#8b5cf6'}}/>
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
                  <Pie data={deviceBreakdown} cx="50%" cy="50%" outerRadius={90} paddingAngle={2} dataKey="value" strokeWidth={0}>
                    {deviceBreakdown.map((d,i) => <Cell key={i} fill={d.color}/>)}
                  </Pie>
                  <Tooltip formatter={(v,n)=>[v,n]} contentStyle={{borderRadius:'12px',border:'1px solid #e2e8f0',fontSize:'12px'}}/>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {deviceBreakdown.map(d => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{background:d.color}}/>
                      <span className="text-sm text-slate-600">{d.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{width:`${(d.value/347)*100}%`,background:d.color}}/>
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
                  { label:'Staff with wearables', value:'55%', note:'190 of 347 enrolled', color:'text-emerald-600', bg:'bg-emerald-50' },
                  { label:'Avg sessions — wearable users', value:'18.4', note:'+62% vs non-wearable users', color:'text-blue-600', bg:'bg-blue-50' },
                  { label:'Completion rate — wearable users', value:'71%', note:'vs 42% for non-wearable', color:'text-purple-600', bg:'bg-purple-50' },
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
