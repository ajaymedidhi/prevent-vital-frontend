import { useState } from 'react'
import { User, Users, Key, Bell, Globe, Shield, Webhook, Building2, Plus, Trash2, Copy, Eye, EyeOff, CheckCircle, Edit2, X } from 'lucide-react'
import { Avatar, Badge, Modal, SectionHeader, Tabs } from '../../admin-shared/components/ui'
import { useAuthStore, useUIStore } from '../../admin-shared/store'

const ADMINS = [
  { id:1, name:'Priya Sharma', email:'admin@infosys.com', role:'org_admin', jobTitle:'Head of HR & Wellness', status:'active', lastLogin:'2 hours ago', mfa:true },
  { id:2, name:'Rajesh Kumar', email:'manager@infosys.com', role:'org_manager', jobTitle:'HR Manager', status:'active', lastLogin:'2 days ago', mfa:false, scope:['Engineering','Product'] },
  { id:3, name:'Sneha Patel', email:'finance@infosys.com', role:'billing_only', jobTitle:'Finance Controller', status:'active', lastLogin:'5 days ago', mfa:false },
  { id:4, name:'Amit Verma', email:'analyst@infosys.com', role:'hr_analyst', jobTitle:'HR Analyst', status:'invited', lastLogin:'Never', mfa:false },
]

const ROLE_LABELS = { org_admin:'Org Admin', org_manager:'Manager', org_viewer:'Viewer', hr_analyst:'HR Analyst', billing_only:'Billing Only' }
const ROLE_COLORS = { org_admin:'badge-red', org_manager:'badge-blue', org_viewer:'badge-slate', hr_analyst:'badge-green', billing_only:'badge-orange' }

function InviteAdminModal({ open, onClose }) {
  const { toast } = useUIStore()
  const [form, setForm] = useState({ name:'', email:'', role:'org_viewer', scopedDepts:[] })

  return (
    <Modal open={open} onClose={onClose} title="Invite Team Member" maxWidth="max-w-md"
      footer={<>
        <button className="btn-secondary btn" onClick={onClose}>Cancel</button>
        <button className="btn-primary btn" onClick={() => { toast('Invitation sent! They\'ll receive setup instructions.','success'); onClose() }}>
          Send Invitation
        </button>
      </>}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
          <input className="input" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} placeholder="Kavitha Nair" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Work Email</label>
          <input className="input" type="email" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} placeholder="kavitha@infosys.com" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Portal Role</label>
          <select className="input" value={form.role} onChange={e => setForm(f=>({...f,role:e.target.value}))}>
            <option value="org_manager">Manager — View & manage (scoped dept)</option>
            <option value="org_viewer">Viewer — Read-only access</option>
            <option value="hr_analyst">HR Analyst — Analytics & exports</option>
            <option value="billing_only">Billing Only — Invoices & payments</option>
          </select>
        </div>
        {form.role === 'org_manager' && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department Scope</label>
            <select multiple className="input h-28" onChange={e => setForm(f=>({...f,scopedDepts:[...e.target.selectedOptions].map(o=>o.value)}))}>
              {['Engineering','Finance','Human Resources','Sales & Marketing','Operations','Product'].map(d => <option key={d}>{d}</option>)}
            </select>
            <p className="text-xs text-slate-400 mt-1">Hold Ctrl/Cmd to select multiple. Leave empty for all departments.</p>
          </div>
        )}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-700">
          A temporary password will be generated and sent to {form.email || 'their email'}. They must reset it on first login.
        </div>
      </div>
    </Modal>
  )
}

export default function SettingsPage() {
  const { admin, updateAdmin } = useAuthStore()
  const { toast } = useUIStore()
  const [tab, setTab] = useState('profile')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [apiKeyVisible, setApiKeyVisible] = useState({})
  const [form, setForm] = useState({ name: admin?.name||'', jobTitle: admin?.jobTitle||'', mobile: admin?.mobile||'' })

  const API_KEYS = [
    { id:1, name:'Analytics Dashboard Integration', prefix:'pvk_4f2a', permissions:['read:analytics'], lastUsed:'2 hours ago', created:'Jan 15, 2026' },
    { id:2, name:'HRMS Sync (Darwinbox)', prefix:'pvk_8b1c', permissions:['read:enrolment','read:analytics'], lastUsed:'1 day ago', created:'Feb 3, 2026' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader title="Settings" description="Manage your account, team, integrations and preferences" />

      <Tabs active={tab} onChange={setTab} tabs={[
        { id:'profile', label:'My Profile' },
        { id:'team', label:'Team Members' },
        { id:'notifications', label:'Notifications' },
        { id:'api', label:'API & Integrations' },
      ]} />

      {tab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="card p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar name={form.name || admin?.name || ''} src={admin?.photo} size="xl" />
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <Edit2 size={12}/>
              </button>
            </div>
            <h3 className="font-semibold text-slate-900">{admin?.name}</h3>
            <p className="text-sm text-slate-500">{admin?.jobTitle || 'Admin'}</p>
            <span className={`badge mt-2 ${ROLE_COLORS[admin?.role]||'badge-slate'}`}>{ROLE_LABELS[admin?.role]||admin?.role}</span>
            <div className="mt-4 text-xs text-slate-400 space-y-1 w-full">
              <div className="flex items-center justify-between"><span>MFA</span><span className={admin?.mfaEnabled?'text-emerald-600 font-medium':'text-red-500 font-medium'}>{admin?.mfaEnabled?'Enabled':'Disabled'}</span></div>
              <div className="flex items-center justify-between"><span>Last login</span><span>Just now</span></div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <input className="input" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Job Title</label>
                  <input className="input" value={form.jobTitle} onChange={e => setForm(f=>({...f,jobTitle:e.target.value}))} placeholder="HR Manager" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <input className="input bg-slate-50" value={admin?.email} disabled />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mobile</label>
                  <input className="input" value={form.mobile} onChange={e => setForm(f=>({...f,mobile:e.target.value}))} placeholder="+91 98765 43210" />
                </div>
              </div>
              <button className="btn-primary btn mt-4" onClick={() => { updateAdmin(form); toast('Profile updated','success') }}>
                Save Changes
              </button>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Change Password</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Password</label>
                  <input type="password" className="input" placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">New Password</label>
                    <input type="password" className="input" placeholder="Min 12 characters" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm New Password</label>
                    <input type="password" className="input" placeholder="Repeat new password" />
                  </div>
                </div>
                <button className="btn-secondary btn" onClick={() => toast('Password changed. All other sessions terminated.','success')}>
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'team' && (
        <div className="space-y-5">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="font-semibold text-slate-800">Team Members</h3>
                <p className="text-xs text-slate-500 mt-0.5">{ADMINS.length} members · Portal access only</p>
              </div>
              <button onClick={() => setInviteOpen(true)} className="btn-primary btn gap-2 text-sm">
                <Plus size={14}/> Invite Member
              </button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Role</th>
                  <th>MFA</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ADMINS.map(a => (
                  <tr key={a.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Avatar name={a.name} size="sm" />
                        <div>
                          <div className="font-semibold text-slate-800 text-sm">{a.name}</div>
                          <div className="text-xs text-slate-400">{a.email}</div>
                          {a.scope && <div className="text-xs text-blue-500 mt-0.5">{a.scope.join(', ')}</div>}
                        </div>
                      </div>
                    </td>
                    <td><span className={`badge ${ROLE_COLORS[a.role]||'badge-slate'}`}>{ROLE_LABELS[a.role]||a.role}</span></td>
                    <td>
                      {a.mfa
                        ? <span className="flex items-center gap-1 text-xs text-emerald-600"><CheckCircle size={12}/>Enabled</span>
                        : <span className="text-xs text-slate-400">Disabled</span>}
                    </td>
                    <td><span className={`badge ${a.status==='active'?'badge-green':a.status==='invited'?'badge-orange':'badge-red'}`}>{a.status}</span></td>
                    <td className="text-xs text-slate-500">{a.lastLogin}</td>
                    <td>
                      <div className="flex gap-1">
                        {a.status === 'invited' && <button onClick={() => toast('Invite resent','success')} className="btn btn-sm btn-ghost text-xs text-blue-600">Resend</button>}
                        {a.role !== 'org_admin' && (
                          <button onClick={() => toast('Admin deactivated','success')} className="btn btn-sm btn-ghost text-xs text-red-500">Deactivate</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <InviteAdminModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
        </div>
      )}

      {tab === 'notifications' && (
        <div className="card p-6 space-y-6">
          <h3 className="font-semibold text-slate-800">Notification Preferences</h3>
          {[
            { cat:'Security', items:[{l:'New device login alert',d:'When your account is accessed from an unrecognised device',def:true,lock:true},{l:'Failed login attempts',d:'3+ consecutive failures',def:true,lock:true}] },
            { cat:'Subscription', items:[{l:'Renewal reminders',d:'30, 15, 7, and 1 day before renewal',def:true},{l:'Payment confirmation',d:'When payments succeed or fail',def:true}] },
            { cat:'Staff & Engagement', items:[{l:'New enrolment digest',d:'Daily summary of new staff who enrolled',def:true},{l:'Inactive staff alert',d:'Weekly alert for staff inactive 30+ days',def:true},{l:'Seat limit warnings',d:'At 80%, 90%, and 100% capacity',def:true}] },
            { cat:'Campaigns & Programmes', items:[{l:'Campaign milestone alerts',d:'When enrolment goals are reached',def:true},{l:'Programme completion updates',d:'Weekly campaign progress summary',def:false}] },
          ].map(section => (
            <div key={section.cat}>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{section.cat}</h4>
              <div className="space-y-3">
                {section.items.map(item => (
                  <label key={item.l} className={`flex items-start gap-3 ${item.lock?'cursor-not-allowed opacity-80':'cursor-pointer'} group`}>
                    <div className="relative mt-0.5">
                      <input type="checkbox" defaultChecked={item.def} disabled={item.lock}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer disabled:cursor-not-allowed" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-800 flex items-center gap-2">
                        {item.l}
                        {item.lock && <span className="badge badge-slate text-xs">Always On</span>}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.d}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="btn-primary btn" onClick={() => toast('Notification preferences saved','success')}>Save Preferences</button>
        </div>
      )}

      {tab === 'api' && (
        <div className="space-y-5">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-slate-800">API Keys</h3>
                <p className="text-xs text-slate-500 mt-0.5">Read-only access to your organisation's analytics data</p>
              </div>
              <button onClick={() => toast('API key created. Store it securely — it won\'t be shown again.','success')} className="btn-primary btn gap-2 text-sm">
                <Plus size={14}/> Generate Key
              </button>
            </div>
            <div className="space-y-3">
              {API_KEYS.map(k => (
                <div key={k.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 text-sm">{k.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                          {apiKeyVisible[k.id] ? `${k.prefix}_${'*'.repeat(32)}` : `${k.prefix}...`}
                        </code>
                        <button onClick={() => setApiKeyVisible(v=>({...v,[k.id]:!v[k.id]}))}>
                          {apiKeyVisible[k.id] ? <EyeOff size={12} className="text-slate-400"/> : <Eye size={12} className="text-slate-400"/>}
                        </button>
                        <button onClick={() => { navigator.clipboard?.writeText(k.prefix); toast('Copied','success') }}>
                          <Copy size={12} className="text-slate-400 hover:text-slate-600"/>
                        </button>
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {k.permissions.map(p => <span key={p} className="badge badge-blue text-xs font-mono">{p}</span>)}
                      </div>
                      <div className="text-xs text-slate-400 mt-1.5">Last used: {k.lastUsed} · Created: {k.created}</div>
                    </div>
                    <button onClick={() => toast('API key revoked','success')} className="btn btn-sm btn-ghost text-red-500 flex-shrink-0">
                      <Trash2 size={13}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-4">HRMS Integrations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name:'Darwinbox', connected:true, logo:'🏢' },
                { name:'Keka HR', connected:false, logo:'🔷' },
                { name:'GreytHR', connected:false, logo:'🟢' },
                { name:'SAP SuccessFactors', connected:false, logo:'🔵' },
                { name:'Workday', connected:false, logo:'🟡' },
                { name:'Zoho People', connected:false, logo:'🟠' },
              ].map(i => (
                <div key={i.name} className={`p-4 rounded-xl border-2 transition-all ${i.connected?'border-emerald-300 bg-emerald-50':'border-slate-200 hover:border-slate-300'}`}>
                  <div className="text-2xl mb-2">{i.logo}</div>
                  <div className="font-semibold text-slate-800 text-sm">{i.name}</div>
                  {i.connected
                    ? <span className="badge badge-green mt-2 block w-fit"><CheckCircle size={10}/>Connected</span>
                    : <button onClick={() => toast(`Connecting to ${i.name}...`,'info')} className="text-xs text-blue-600 hover:text-blue-700 font-semibold mt-2 block">Connect →</button>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
