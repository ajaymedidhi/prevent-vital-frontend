import { useState } from 'react'
import { Megaphone, Plus, Calendar, Users, Target, TrendingUp, Pause, Play, Copy, Trash2, Filter } from 'lucide-react'
import { Badge, Modal, SectionHeader, Tabs, EmptyState } from '../../admin-shared/components/ui'
import { useUIStore } from '../../admin-shared/store'

const CAMPAIGNS = [
  { id:1, name:'Q1 BP Control Drive', programme:'Hypertension Control', icon:'🩺', colour:'#EF4444', status:'active', startDate:'2026-01-15', endDate:'2026-03-31', audience:'All Staff', targetCount:347, enrolled:218, active:189, completed:42, dropped:12, enrolmentPct:63, completionPct:19, goal:75 },
  { id:2, name:'Diabetes Awareness Month', programme:'Diabetes Management', icon:'💉', colour:'#F97316', status:'active', startDate:'2026-02-01', endDate:'2026-04-30', audience:'Engineering, Finance', targetCount:120, enrolled:78, active:65, completed:8, dropped:5, enrolmentPct:65, completionPct:10, goal:80 },
  { id:3, name:'Mindfulness at Work — Dec', programme:'Stress & Mindfulness', icon:'🧘', colour:'#8B5CF6', status:'completed', startDate:'2025-12-01', endDate:'2026-01-01', audience:'All Staff', targetCount:310, enrolled:234, active:0, completed:189, dropped:45, enrolmentPct:75, completionPct:81, goal:60 },
  { id:4, name:'Q4 Active Lifestyle', programme:'Active Lifestyle', icon:'🏃', colour:'#10B981', status:'paused', startDate:'2025-10-01', endDate:'2025-12-31', audience:'Operations', targetCount:59, enrolled:41, active:0, completed:18, dropped:9, enrolmentPct:69, completionPct:44, goal:70 },
]

const STATUS_COLORS = { active:'badge-green', completed:'badge-blue', paused:'badge-orange', draft:'badge-slate', cancelled:'badge-red' }

function CampaignCard({ c, onView }) {
  const { toast } = useUIStore()
  const isGoalMet = c.enrolmentPct >= c.goal

  return (
    <div className="card p-5 hover:shadow-card-hover transition-all duration-200 group">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background:`${c.colour}15` }}>
          {c.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-900 text-sm leading-tight">{c.name}</h3>
            <span className={`badge ${STATUS_COLORS[c.status]} flex-shrink-0`}>{c.status}</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{c.programme} · {c.audience}</p>
        </div>
      </div>

      {/* Date range */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
        <Calendar size={11}/>
        {new Date(c.startDate).toLocaleDateString('en-IN',{day:'numeric',month:'short'})} —{' '}
        {new Date(c.endDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
      </div>

      {/* Enrolment progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-slate-600">Enrolment Progress</span>
          <div className="flex items-center gap-1.5">
            {isGoalMet && <span className="text-xs text-emerald-600 font-semibold">🎯 Goal Met!</span>}
            <span className="text-xs font-bold text-slate-800">{c.enrolmentPct}%</span>
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700 relative" style={{ width:`${c.enrolmentPct}%`, background:c.colour }}>
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-slate-400">{c.enrolled}/{c.targetCount} enrolled</span>
          <span className="text-xs text-slate-400">Goal: {c.goal}%</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[['Active',c.active,'#10b981'],['Completed',c.completed,'#3b82f6'],['Dropped',c.dropped,'#ef4444']].map(([l,v,col]) => (
          <div key={l} className="bg-slate-50 rounded-lg p-2 text-center">
            <div className="font-bold text-sm" style={{ color:col }}>{v}</div>
            <div className="text-xs text-slate-400">{l}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-slate-100">
        <button onClick={() => onView(c)} className="flex-1 btn btn-sm btn-secondary justify-center text-xs">View Details</button>
        {c.status === 'active' && (
          <button onClick={() => toast('Campaign paused','success')} className="btn btn-sm btn-ghost text-orange-500 btn-icon">
            <Pause size={14}/>
          </button>
        )}
        {c.status === 'paused' && (
          <button onClick={() => toast('Campaign resumed','success')} className="btn btn-sm btn-ghost text-emerald-500 btn-icon">
            <Play size={14}/>
          </button>
        )}
        <button onClick={() => toast('Campaign duplicated','success')} className="btn btn-sm btn-ghost btn-icon">
          <Copy size={14}/>
        </button>
      </div>
    </div>
  )
}

function CreateCampaignModal({ open, onClose }) {
  const { toast } = useUIStore()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ programme:'', name:'', audience:'all', departments:[], startDate:'', endDate:'', goal:75 })

  const PROGRAMMES = ['Hypertension Control','Diabetes Management','Stress & Mindfulness','Active Lifestyle','Nutrition Reset']

  const handleCreate = () => {
    toast('Campaign created and launched! 🚀','success')
    onClose(); setStep(1)
  }

  return (
    <Modal open={open} onClose={onClose} title={`Create Campaign — Step ${step}/3`} maxWidth="max-w-xl"
      footer={<>
        {step > 1 && <button className="btn-secondary btn" onClick={() => setStep(s=>s-1)}>Back</button>}
        <div className="flex-1" />
        <button className="btn-secondary btn" onClick={onClose}>Cancel</button>
        {step < 3
          ? <button className="btn-primary btn" onClick={() => setStep(s=>s+1)}>Next →</button>
          : <button className="btn-primary btn gap-2" onClick={handleCreate}><Megaphone size={14}/> Launch Campaign</button>
        }
      </>}>
      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {[1,2,3].map(s => (
          <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${s<=step?'bg-blue-600':'bg-slate-200'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 mb-3">Select Programme</h3>
          <div className="space-y-2">
            {PROGRAMMES.map(p => (
              <button key={p} onClick={() => setForm(f=>({...f, programme:p}))}
                className={`w-full p-3.5 rounded-xl border-2 text-left transition-all ${form.programme===p?'border-blue-500 bg-blue-50':'border-slate-200 hover:border-slate-300'}`}>
                <span className="text-sm font-semibold text-slate-800">{p}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 mb-3">Campaign Details</h3>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Campaign Name</label>
            <input className="input" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))}
              placeholder={`${form.programme} — March 2026`} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Start Date</label>
              <input type="date" className="input" value={form.startDate} onChange={e => setForm(f=>({...f,startDate:e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">End Date</label>
              <input type="date" className="input" value={form.endDate} onChange={e => setForm(f=>({...f,endDate:e.target.value}))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Target Audience</label>
            <select className="input" value={form.audience} onChange={e => setForm(f=>({...f,audience:e.target.value}))}>
              <option value="all">All Staff (347 employees)</option>
              <option value="engineering">Engineering (92)</option>
              <option value="finance">Finance (54)</option>
              <option value="hr">Human Resources (38)</option>
              <option value="sales">Sales & Marketing (67)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enrolment Goal: <span className="text-blue-600">{form.goal}%</span></label>
            <input type="range" min={20} max={100} step={5} value={form.goal} onChange={e => setForm(f=>({...f,goal:+e.target.value}))}
              className="w-full accent-blue-600" />
            <div className="flex justify-between text-xs text-slate-400 mt-1"><span>20%</span><span>100%</span></div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 mb-3">Communication & Nudges</h3>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Campaign Summary</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Programme</span><span className="font-medium">{form.programme||'—'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Name</span><span className="font-medium">{form.name||'Auto-named'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Audience</span><span className="font-medium capitalize">{form.audience==='all'?'All Staff':form.audience}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Goal</span><span className="font-medium">{form.goal}% enrolment</span></div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Launch Announcement Message</label>
            <textarea className="input" rows={4} placeholder={`🎯 Exciting news! We're launching the ${form.programme||'wellness'} programme. Join today and start your journey to better health!`} />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-700">Automated Nudges</p>
            {[['Day 3 nudge','Sent to staff who haven\'t enrolled yet'],['Week 2 check-in','Progress reminder for enrolled staff'],['Week 4 mid-point','Completion encouragement']].map(([l,d]) => (
              <label key={l} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                <div><div className="text-sm font-medium text-slate-700">{l}</div><div className="text-xs text-slate-400">{d}</div></div>
              </label>
            ))}
          </div>
        </div>
      )}
    </Modal>
  )
}

function CampaignDetailModal({ campaign, open, onClose }) {
  if (!campaign) return null
  return (
    <Modal open={open} onClose={onClose} title={campaign.name} maxWidth="max-w-2xl">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[['Enrolled',campaign.enrolled,'#3b82f6'],['Active',campaign.active,'#10b981'],['Completed',campaign.completed,'#8b5cf6'],['Dropped',campaign.dropped,'#ef4444']].map(([l,v,c]) => (
            <div key={l} className="rounded-xl p-4 text-center" style={{ background:`${c}10`, border:`1px solid ${c}30` }}>
              <div className="text-2xl font-display font-bold" style={{ color:c }}>{v}</div>
              <div className="text-xs text-slate-500 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Enrolment Progress</span>
            <span className="text-sm font-bold" style={{ color:campaign.colour }}>{campaign.enrolmentPct}% of {campaign.goal}% goal</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width:`${campaign.enrolmentPct}%`, background:campaign.colour }} />
          </div>
          <div className="flex items-center justify-between mt-1 text-xs text-slate-400">
            <span>{campaign.enrolled} of {campaign.targetCount} staff enrolled</span>
            <span>{campaign.targetCount - campaign.enrolled} remaining</span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Completion Rate</span>
            <span className="text-sm font-bold text-blue-600">{campaign.completionPct}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width:`${campaign.completionPct}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[['Programme',campaign.programme],['Audience',campaign.audience],['Start',new Date(campaign.startDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})],['End',new Date(campaign.endDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})]].map(([l,v]) => (
            <div key={l} className="bg-slate-50 rounded-xl p-3">
              <div className="text-xs text-slate-500 mb-0.5">{l}</div>
              <div className="text-sm font-semibold text-slate-800">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default function CampaignsPage() {
  const [tab, setTab] = useState('all')
  const [createOpen, setCreateOpen] = useState(false)
  const [detailCampaign, setDetailCampaign] = useState(null)

  const filtered = CAMPAIGNS.filter(c => {
    if (tab === 'active') return c.status === 'active'
    if (tab === 'completed') return c.status === 'completed'
    return true
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Wellness Campaigns"
        description="Launch and track time-bound wellness initiatives for your workforce"
        action={
          <button className="btn-primary btn gap-2 text-sm" onClick={() => setCreateOpen(true)}>
            <Plus size={15}/> New Campaign
          </button>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label:'Active Campaigns', value:2, color:'text-emerald-600' },
          { label:'Total Staff Targeted', value:'467', color:'text-blue-600' },
          { label:'Avg Enrolment Rate', value:'69%', color:'text-purple-600' },
          { label:'Sessions This Month', value:'2,280', color:'text-slate-700' },
        ].map((s,i) => (
          <div key={i} className="card p-4">
            <div className={`font-display text-2xl ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4">
        <Tabs active={tab} onChange={setTab} tabs={[
          { id:'all', label:'All Campaigns', count:4 },
          { id:'active', label:'Active', count:2 },
          { id:'completed', label:'Completed', count:1 },
        ]} />
      </div>

      {/* Campaign cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(c => <CampaignCard key={c.id} c={c} onView={setDetailCampaign} />)}

        {/* Create new card */}
        <div className="card p-5 border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 min-h-64 group"
          onClick={() => setCreateOpen(true)}>
          <div className="w-12 h-12 rounded-xl bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
            <Plus size={22} className="text-blue-600" />
          </div>
          <div className="text-center">
            <div className="font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">Launch New Campaign</div>
            <div className="text-xs text-slate-400 mt-1">Target staff with a wellness programme</div>
          </div>
        </div>
      </div>

      <CreateCampaignModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <CampaignDetailModal campaign={detailCampaign} open={!!detailCampaign} onClose={() => setDetailCampaign(null)} />
    </div>
  )
}
