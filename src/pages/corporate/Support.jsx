// ══════════════════════════════════════════════════════════════════════════════
// Support.jsx
// ══════════════════════════════════════════════════════════════════════════════
import { useState } from 'react'
import { HeadphonesIcon, Plus, MessageCircle, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react'
import { Badge, Modal, SectionHeader, Tabs } from '../../admin-shared/components/ui'
import { useUIStore } from '../../admin-shared/store'

const TICKETS = [
  { id:1, num:'TKT-P7K2M', subject:'Unable to export analytics report to Excel', cat:'technical', priority:'medium', status:'in_progress', created:'Feb 28, 2026', lastUpdate:'1 day ago', messages:3 },
  { id:2, num:'TKT-R9X4Q', subject:'Invoice INV-2026-001 GST number correction needed', cat:'billing', priority:'high', status:'resolved', created:'Jan 8, 2026', lastUpdate:'Jan 10, 2026', messages:5 },
  { id:3, num:'TKT-L3B8N', subject:'How to configure SSO with Azure AD?', cat:'technical', priority:'low', status:'closed', created:'Dec 15, 2025', lastUpdate:'Dec 18, 2025', messages:7 },
]

const STATUS_COLORS = { open:'badge-red', in_progress:'badge-orange', pending_info:'badge-orange', resolved:'badge-green', closed:'badge-slate' }
const STATUS_LABELS = { open:'Open', in_progress:'In Progress', pending_info:'Pending Info', resolved:'Resolved', closed:'Closed' }

export function SupportPage() {
  const [tab, setTab] = useState('tickets')
  const [createOpen, setCreateOpen] = useState(false)
  const { toast } = useUIStore()

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader title="Support" description="Get help from the gruentzig.ai team"
        action={<button className="btn-primary btn gap-2 text-sm" onClick={() => setCreateOpen(true)}><Plus size={14}/>New Ticket</button>} />

      <Tabs active={tab} onChange={setTab} tabs={[
        { id:'tickets', label:'My Tickets', count:TICKETS.length },
        { id:'account', label:'Account Manager' },
        { id:'faq', label:'Help Centre' },
      ]} />

      {tab === 'tickets' && (
        <div className="space-y-3">
          {TICKETS.map(t => (
            <div key={t.id} className="card p-5 hover:shadow-card-hover transition-all cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${t.status==='open'?'bg-red-500':t.status==='in_progress'?'bg-orange-400':'bg-emerald-400'}`}/>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{t.subject}</div>
                      <div className="text-xs text-slate-400 mt-0.5">#{t.num} · {t.created}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`badge ${t.priority==='high'?'badge-red':t.priority==='medium'?'badge-orange':'badge-slate'} text-xs capitalize`}>{t.priority}</span>
                      <span className={`badge ${STATUS_COLORS[t.status]} text-xs`}>{STATUS_LABELS[t.status]}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                    <span className="badge badge-slate text-xs capitalize">{t.cat}</span>
                    <span><MessageCircle size={10} className="inline mr-1"/>{t.messages} messages</span>
                    <span><Clock size={10} className="inline mr-1"/>Updated {t.lastUpdate}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0 mt-1"/>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'account' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Your Account Manager</h3>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">KM</div>
              <div>
                <div className="font-semibold text-slate-900 text-lg">Kavitha Menon</div>
                <div className="text-slate-500 text-sm">Enterprise Account Manager</div>
                <div className="text-xs text-slate-400 mt-1">gruentzig.ai Private Limited</div>
              </div>
            </div>
            {[['📧','kavitha.menon@gruentzig.ai','Email'],['📞','+91 98765 00123','Direct Line'],['🕐','Mon–Sat 9am–7pm IST','Availability']].map(([e,v,l]) => (
              <div key={l} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors mb-1">
                <span className="text-lg">{e}</span>
                <div><div className="text-sm font-medium text-slate-800">{v}</div><div className="text-xs text-slate-400">{l}</div></div>
              </div>
            ))}
            <button onClick={() => toast('Scheduling link opened','info')} className="btn-primary btn w-full justify-center mt-4">Schedule a Call</button>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Quick Contact</h3>
            <div className="space-y-3">
              <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Subject</label><input className="input" placeholder="What can we help with?" /></div>
              <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Message</label><textarea className="input" rows={5} placeholder="Describe your question or request..."/></div>
              <button onClick={() => toast('Message sent to Kavitha','success')} className="btn-primary btn w-full justify-center">Send Message</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'faq' && (
        <div className="space-y-3">
          {[
            { q:'How do employees enrol in the corporate wellness programme?', a:'Employees download the PreventalVital app and enter your organisation\'s invite code (INFY2026) during setup. Alternatively, you can send bulk invite emails from the Staff section.' },
            { q:'Can I see individual employee health scores?', a:'No. The corporate portal only shows aggregate, anonymised data to protect employee privacy. Groups smaller than 5 employees show "Insufficient data".' },
            { q:'How do I set up SSO for my organisation?', a:'Go to Settings → API & Integrations → SSO Configuration. You\'ll need your SAML 2.0 IdP metadata XML. Our team can assist — raise a support ticket for guided setup.' },
            { q:'What happens to data when a staff member leaves?', a:'De-link the employee from the corporate account (Staff → Delink). Their data is pseudonymised after 30 days and purged after 90 days as per DPDPA requirements.' },
            { q:'Can I add more seats mid-subscription?', a:'Yes — go to Billing → Add Seats. Additional seats are prorated for the remaining contract period and billed immediately.' },
          ].map((f,i) => (
            <details key={i} className="card p-5 group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-semibold text-slate-800 text-sm pr-4">{f.q}</span>
                <ChevronDown size={16} className="text-slate-400 flex-shrink-0 group-open:rotate-180 transition-transform"/>
              </summary>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      )}

      {createOpen && (
        <div className="modal-overlay" onClick={e => e.target===e.currentTarget && setCreateOpen(false)}>
          <div className="modal-box max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-display text-lg">New Support Ticket</h3>
              <button onClick={() => setCreateOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Category</label>
                  <select className="input"><option>Technical</option><option>Billing</option><option>Account</option><option>Programme</option><option>Privacy</option></select></div>
                <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Priority</label>
                  <select className="input"><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></div>
              </div>
              <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Subject</label><input className="input" placeholder="Brief description of your issue"/></div>
              <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Description</label><textarea className="input" rows={5} placeholder="Describe the issue in detail..."/></div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center justify-end gap-3">
              <button className="btn-secondary btn" onClick={() => setCreateOpen(false)}>Cancel</button>
              <button className="btn-primary btn" onClick={() => { toast('Ticket created! We\'ll respond within 4 hours.','success'); setCreateOpen(false) }}>Submit Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default SupportPage

// ══════════════════════════════════════════════════════════════════════════════
// OrgProfile.jsx — White-label branding & organisation setup
// ══════════════════════════════════════════════════════════════════════════════
export function OrgProfilePage() {
  const { toast } = useUIStore()
  const [colour, setColour] = useState('#2563eb')
  const [step, setStep] = useState(3)

  const steps = ['Organisation Info','Branding','Contact Details','Email Domains','Preview']

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader title="Organisation Profile" description="Configure your white-label portal identity and branding" />

      {/* Onboarding stepper */}
      <div className="card p-5">
        <div className="flex items-center gap-2">
          {steps.map((s,i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${i+1<step?'bg-emerald-500 text-white':i+1===step?'bg-blue-600 text-white':'bg-slate-100 text-slate-400'}`}>
                {i+1<step?<CheckCircle size={14}/>:i+1}
              </div>
              <span className={`text-xs font-medium hidden md:block ${i+1<=step?'text-slate-700':'text-slate-400'}`}>{s}</span>
              {i<steps.length-1 && <div className={`flex-1 h-0.5 rounded ${i+1<step?'bg-emerald-400':'bg-slate-200'}`}/>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Branding & White-Label</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Organisation Display Name</label>
                <input className="input" defaultValue="Infosys" />
                <p className="text-xs text-slate-400 mt-1">Shown in portal header, emails, and reports</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Company Logo</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                  <div className="text-3xl mb-2">📸</div>
                  <p className="text-sm font-medium text-slate-600">Drop logo here or click to browse</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, SVG, JPG · Min 200×200px · Max 2MB</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Brand Accent Colour</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={colour} onChange={e => setColour(e.target.value)}
                    className="w-12 h-10 rounded-lg cursor-pointer border border-slate-200 p-0.5" />
                  <input className="input flex-1 font-mono" value={colour} onChange={e => setColour(e.target.value)} placeholder="#2563eb" />
                  <div className="w-10 h-10 rounded-lg border border-slate-200 flex-shrink-0" style={{background:colour}}/>
                </div>
                <p className="text-xs text-slate-400 mt-1">Applied to portal header, buttons, charts, and email templates</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Login Page Welcome Message</label>
                <textarea className="input" rows={2} defaultValue="Welcome to Infosys Wellness Hub — Your health is our priority." maxLength={300}/>
                <p className="text-xs text-slate-400 mt-1">Shown below your logo on the login screen. Max 300 chars.</p>
              </div>
            </div>
            <button onClick={() => toast('Branding saved successfully!','success')} className="btn-primary btn mt-5">Save Branding</button>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Email Domain Auto-Linking</h3>
            <p className="text-sm text-slate-500 mb-4">Employees who sign up with these email domains will be auto-prompted to join your organisation.</p>
            <div className="space-y-2">
              {['infosys.com','infosys.co.in'].map(d => (
                <div key={d} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <CheckCircle size={14} className="text-emerald-600 flex-shrink-0"/>
                  <span className="text-sm font-mono font-medium text-emerald-800 flex-1">{d}</span>
                  <button onClick={() => toast('Domain removed','success')} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input className="input flex-1 font-mono text-sm" placeholder="newdomain.com" />
                <button onClick={() => toast('Domain added','success')} className="btn-primary btn text-sm">Add</button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview panel */}
        <div className="space-y-4">
          <div className="card p-5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Live Preview</h4>
            {/* Mini portal preview */}
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <div className="p-3 flex items-center gap-2" style={{background:colour}}>
                <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center text-white text-xs font-bold">I</div>
                <span className="text-white text-xs font-semibold">Infosys Wellness Hub</span>
              </div>
              <div className="p-3 bg-slate-50">
                <div className="space-y-1.5">
                  {['Dashboard','Staff','Campaigns','Analytics'].map(n => (
                    <div key={n} className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-200 transition-colors cursor-pointer">
                      <div className="w-2 h-2 rounded-sm" style={{background:colour+'60'}}/>
                      <span className="text-xs text-slate-600">{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">Preview updates as you customise</p>
          </div>

          <div className="card p-5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Portal Access</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-slate-50">
                <div className="text-xs text-slate-500 mb-0.5">Subdomain</div>
                <div className="font-mono text-sm font-semibold text-blue-600">infosys.preventvital.com</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50">
                <div className="text-xs text-slate-500 mb-0.5">Invite Code</div>
                <div className="font-mono text-sm font-bold tracking-widest text-slate-800">INFY2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
