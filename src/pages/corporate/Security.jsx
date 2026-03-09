import { useState } from 'react'
import { Shield, Monitor, Key, AlertTriangle, CheckCircle, X, Lock, Eye, Globe, Clock, Smartphone } from 'lucide-react'
import { Badge, SectionHeader, Tabs } from '../../admin-shared/components/ui'
import { useUIStore } from '../../admin-shared/store'

const AUDIT_LOGS = [
  { id:1, action:'Updated organisation profile', category:'settings', admin:'Priya Sharma', ip:'103.21.58.42', ua:'Chrome 122 / Windows', time:'2 hours ago', severity:'info' },
  { id:2, action:'Regenerated invite code', category:'settings', admin:'Priya Sharma', ip:'103.21.58.42', ua:'Chrome 122 / Windows', time:'3 hours ago', severity:'warning' },
  { id:3, action:'Invited sub-admin analyst@infosys.com', category:'settings', admin:'Priya Sharma', ip:'103.21.58.42', ua:'Chrome 122 / Windows', time:'1 day ago', severity:'info' },
  { id:4, action:'Created campaign: Q1 BP Control Drive', category:'campaign', admin:'Priya Sharma', ip:'103.21.58.42', ua:'Chrome 122 / Windows', time:'2 days ago', severity:'info' },
  { id:5, action:'Added 50 seats to subscription', category:'billing', admin:'Sneha Patel', ip:'49.207.91.12', ua:'Safari 17 / MacOS', time:'3 days ago', severity:'warning' },
  { id:6, action:'Admin login', category:'auth', admin:'Rajesh Kumar', ip:'152.58.77.211', ua:'Firefox 123 / Linux', time:'4 days ago', severity:'info' },
  { id:7, action:'Delinked staff member EMP1072', category:'staff', admin:'Priya Sharma', ip:'103.21.58.42', ua:'Chrome 122 / Windows', time:'5 days ago', severity:'warning' },
  { id:8, action:'Changed admin role: analyst → manager', category:'settings', admin:'Priya Sharma', ip:'103.21.58.42', ua:'Chrome 122 / Windows', time:'1 week ago', severity:'warning' },
]

const SESSIONS = [
  { id:1, device:'MacBook Pro', browser:'Chrome 122', os:'macOS Sonoma', ip:'103.21.58.42', location:'Hyderabad, IN', lastActive:'Now', current:true },
  { id:2, device:'iPhone 15', browser:'Safari Mobile', os:'iOS 17', ip:'157.48.92.11', location:'Hyderabad, IN', lastActive:'2 hours ago', current:false },
  { id:3, device:'Dell XPS', browser:'Chrome 121', os:'Windows 11', ip:'122.177.43.88', location:'Mumbai, IN', lastActive:'3 days ago', current:false },
]

const CAT_COLORS = { auth:'badge-blue', settings:'badge-slate', campaign:'badge-purple', billing:'badge-orange', staff:'badge-green', security:'badge-red' }
const SEV_COLORS = { info:'text-slate-500', warning:'text-orange-500', critical:'text-red-600' }

export default function SecurityPage() {
  const [tab, setTab] = useState('overview')
  const [filter, setFilter] = useState('all')
  const { toast } = useUIStore()

  const secScore = 72

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader title="Security & Compliance" description="Monitor access, audit actions, and manage security settings" />

      <Tabs active={tab} onChange={setTab} tabs={[
        { id:'overview', label:'Security Overview' },
        { id:'audit', label:'Audit Log', count:AUDIT_LOGS.length },
        { id:'sessions', label:'Active Sessions', count:SESSIONS.length },
        { id:'compliance', label:'Compliance' },
      ]} />

      {tab === 'overview' && (
        <div className="space-y-5">
          {/* Security score */}
          <div className="card p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/>
                  <circle cx="48" cy="48" r="40" fill="none" stroke={secScore>=80?'#10b981':secScore>=60?'#f59e0b':'#ef4444'} strokeWidth="8"
                    strokeDasharray={`${2*Math.PI*40*secScore/100} ${2*Math.PI*40*(1-secScore/100)}`} strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold text-white">{secScore}</span>
                  <span className="text-xs text-slate-400">/ 100</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-display text-2xl text-white">Security Score</h2>
                  <span className="badge badge-orange">{secScore>=80?'Excellent':secScore>=60?'Good':'Needs Attention'}</span>
                </div>
                <p className="text-slate-400 text-sm mb-3">Your portal security is in good shape. Enable MFA for all admins to reach 90+.</p>
                <div className="flex gap-3">
                  <button onClick={() => toast('MFA reminders sent to 2 admins','success')} className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">
                    Enforce MFA
                  </button>
                  <button onClick={() => setTab('sessions')} className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">
                    View Sessions
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon:Key, label:'Two-Factor Authentication', status:'Partial', detail:'2 of 4 admins have MFA enabled', color:'text-orange-500', bg:'bg-orange-50', action:'Enforce MFA' },
              { icon:Lock, label:'Password Policy', status:'Good', detail:'12+ char, mixed case, special required', color:'text-emerald-600', bg:'bg-emerald-50', action:'Configure' },
              { icon:Globe, label:'Active Sessions', status:'3 sessions', detail:'1 current, 2 other devices active', color:'text-blue-600', bg:'bg-blue-50', action:'Manage' },
              { icon:AlertTriangle, label:'Recent Alerts', status:'2 warnings', detail:'New device login + rate limit hit', color:'text-amber-600', bg:'bg-amber-50', action:'View All' },
            ].map(s => (
              <div key={s.label} className="card p-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.bg}`}>
                  <s.icon size={20} className={s.color}/>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-800">{s.label}</div>
                  <div className={`text-xs font-semibold ${s.color} mt-0.5`}>{s.status}</div>
                  <div className="text-xs text-slate-500">{s.detail}</div>
                </div>
                <button onClick={() => toast(`${s.action} action triggered`,'info')} className="btn btn-sm btn-secondary text-xs">{s.action}</button>
              </div>
            ))}
          </div>

          {/* Recent security events */}
          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Recent Security Events</h3>
            <div className="space-y-3">
              {[
                { icon:'🔐', title:'New login from unrecognised device', time:'2 hours ago', severity:'warning', detail:'Chrome 122, Windows · Hyderabad, IN' },
                { icon:'✅', title:'Successful login — Priya Sharma', time:'2 hours ago', severity:'info', detail:'Chrome 122 · 103.21.58.42' },
                { icon:'🔑', title:'Invite code regenerated', time:'3 hours ago', severity:'warning', detail:'Old code INFY2025 invalidated' },
                { icon:'🛡️', title:'MFA setup complete — Priya Sharma', time:'1 week ago', severity:'info', detail:'TOTP app configured successfully' },
              ].map(e => (
                <div key={e.title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="text-xl flex-shrink-0">{e.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-800">{e.title}</div>
                    <div className="text-xs text-slate-500">{e.detail}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-xs text-slate-400">{e.time}</span>
                    <span className={`badge text-xs ${e.severity==='warning'?'badge-orange':'badge-slate'}`}>{e.severity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'audit' && (
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
            <h3 className="font-semibold text-slate-800">Audit Trail</h3>
            <div className="flex gap-2">
              <select className="input w-auto text-sm" value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="auth">Authentication</option>
                <option value="settings">Settings</option>
                <option value="campaign">Campaigns</option>
                <option value="billing">Billing</option>
                <option value="staff">Staff</option>
              </select>
              <button onClick={() => toast('Audit log exported','success')} className="btn-secondary btn text-sm">Export CSV</button>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Admin</th>
                <th>Action</th>
                <th>Category</th>
                <th>IP Address</th>
                <th>Device</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT_LOGS.filter(l => filter === 'all' || l.category === filter).map(l => (
                <tr key={l.id}>
                  <td className="text-xs text-slate-500 font-mono">{l.time}</td>
                  <td className="text-sm font-medium text-slate-800">{l.admin}</td>
                  <td className="text-sm text-slate-700 max-w-64 truncate">{l.action}</td>
                  <td><span className={`badge ${CAT_COLORS[l.category]||'badge-slate'} text-xs`}>{l.category}</span></td>
                  <td className="font-mono text-xs text-slate-500">{l.ip}</td>
                  <td className="text-xs text-slate-500 max-w-40 truncate">{l.ua}</td>
                  <td><span className={`text-xs font-semibold ${SEV_COLORS[l.severity]}`}>{l.severity}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'sessions' && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700 flex items-center gap-3">
            <Monitor size={16} className="flex-shrink-0"/>
            All sessions listed below have access to your corporate admin portal. Terminate any session you don't recognise.
          </div>
          {SESSIONS.map(s => (
            <div key={s.id} className={`card p-5 flex items-center gap-4 ${s.current?'border-emerald-300':''}`}>
              <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                {s.device.includes('iPhone') ? <Smartphone size={20} className="text-slate-600"/> : <Monitor size={20} className="text-slate-600"/>}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-slate-800 text-sm">{s.device}</span>
                  {s.current && <span className="badge badge-green text-xs">Current Session</span>}
                </div>
                <div className="text-xs text-slate-500">{s.browser} · {s.os}</div>
                <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-3">
                  <span><Globe size={10} className="inline mr-1"/>{s.ip}</span>
                  <span>📍 {s.location}</span>
                  <span><Clock size={10} className="inline mr-1"/>{s.lastActive}</span>
                </div>
              </div>
              {!s.current && (
                <button onClick={() => toast('Session terminated','success')} className="btn btn-sm btn-danger gap-1.5">
                  <X size={12}/> Terminate
                </button>
              )}
            </div>
          ))}
          <button onClick={() => toast('All other sessions terminated','success')} className="btn-danger btn w-full justify-center">
            <X size={14}/> Terminate All Other Sessions
          </button>
        </div>
      )}

      {tab === 'compliance' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title:'DPDPA 2023', status:'Compliant', detail:'Digital Personal Data Protection Act, India', icon:'🇮🇳', color:'badge-green' },
              { title:'GDPR / UK GDPR', status:'Compliant', detail:'For EU/UK users (SCCs in place)', icon:'🇪🇺', color:'badge-green' },
              { title:'ISO 27001', status:'Certified', detail:'Information security management', icon:'🛡️', color:'badge-blue' },
              { title:'SOC 2 Type II', status:'Audited', detail:'Security, availability, confidentiality', icon:'✅', color:'badge-purple' },
            ].map(c => (
              <div key={c.title} className="card p-5 flex items-center gap-4">
                <span className="text-3xl">{c.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">{c.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{c.detail}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`badge ${c.color}`}>{c.status}</span>
                  <button onClick={() => toast('Certificate downloaded','success')} className="text-xs text-blue-600 hover:text-blue-700 font-medium">Download PDF</button>
                </div>
              </div>
            ))}
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Data Processing Agreement</h3>
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield size={18} className="text-blue-600"/>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-800 text-sm">DPA v2.1 — Accepted</div>
                <div className="text-xs text-slate-500 mt-0.5">Accepted by Priya Sharma on January 5, 2026</div>
                <div className="text-xs text-slate-500">Between gruentzig.ai Private Limited and Infosys Limited</div>
              </div>
              <button onClick={() => toast('DPA downloaded','success')} className="btn btn-sm btn-secondary">Download</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
