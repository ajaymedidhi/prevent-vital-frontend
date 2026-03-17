import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Megaphone, Plus, Calendar, Users, Target, TrendingUp, Pause, Play, Copy, Trash2, Filter } from 'lucide-react'
import { Badge, Modal, SectionHeader, Tabs, EmptyState } from '../../admin-shared/components/ui'
import { useUIStore } from '../../admin-shared/store'

import api from '../../admin-shared/services/api'

const STATUS_COLORS = { active:'badge-green', completed:'badge-blue', paused:'badge-orange', draft:'badge-slate', cancelled:'badge-red' }

function CampaignCard({ c, onView }) {
  const { toast } = useUIStore()
  const stats = c.stats || {}
  const prog = c.programmeId || {}
  const isGoalMet = (stats.enrolmentPct || 0) >= (c.enrolmentGoal || 0)

  return (
    <div className="card p-5 hover:shadow-card-hover transition-all duration-200 group">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background:`${c.programmeId?.colour || '#3b82f6'}15` }}>
          {c.programmeId?.icon || '📅'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-900 text-sm leading-tight">{c.name}</h3>
            <span className={`badge ${STATUS_COLORS[c.status]} flex-shrink-0`}>{c.status}</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{c.programmeId?.name} · {c.targetAudience?.type === 'all' ? 'All Staff' : 'Custom Segment'}</p>
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
            <span className="text-xs font-bold text-slate-800">{stats.enrolmentPct || 0}%</span>
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700 relative" style={{ width:`${c.stats?.enrolmentPct || 0}%`, background:c.programmeId?.colour || '#3b82f6' }}>
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-slate-400">{c.stats?.enrolled || 0}/{c.stats?.targetCount || 0} enrolled</span>
          <span className="text-xs text-slate-400">Goal: {c.enrolmentGoal}%</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[['Active',c.stats?.active || 0,'#10b981'],['Completed',c.stats?.completed || 0,'#3b82f6'],['Dropped',c.stats?.dropped || 0,'#ef4444']].map(([l,v,col]) => (
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

function CreateCampaignModal({ open, onClose, programs = [], onCreated }) {
  const { toast } = useUIStore()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ programmeId: '', name: '', audience: 'all', departments: [], startDate: '', endDate: '', enrolmentGoal: 75 })

  const handleCreate = async () => {
    if (!form.programmeId) return toast('Please select a programme', 'error')
    if (!form.name) return toast('Please enter a campaign name', 'error')
    if (!form.startDate || !form.endDate) return toast('Please select dates', 'error')

    setLoading(true)
    try {
      const res = await api.post('/campaigns', {
        ...form,
        targetAudience: { type: form.audience, departments: form.audience === 'custom' ? form.departments : [] }
      })
      if (res.success) {
        toast('Campaign created and launched! 🚀', 'success')
        onCreated?.()
        onClose()
        setStep(1)
        setForm({ programmeId: '', name: '', audience: 'all', departments: [], startDate: '', endDate: '', enrolmentGoal: 75 })
      } else {
        toast(res.message || 'Failed to create campaign', 'error')
      }
    } catch (err) {
      toast(err.message || 'An error occurred', 'error')
    } finally {
      setLoading(false)
    }
  }

  const selectedProg = programs.find(p => p._id === form.programmeId)

  return (
    <Modal open={open} onClose={onClose} title={`Create Campaign — Step ${step}/3`} maxWidth="max-w-xl"
      footer={<>
        {step > 1 && <button className="btn-secondary btn" onClick={() => setStep(s => s - 1)}>Back</button>}
        <div className="flex-1" />
        <button className="btn-secondary btn" onClick={onClose}>Cancel</button>
        {step < 3
          ? <button className="btn-primary btn" onClick={() => setStep(s => s + 1)} disabled={step === 1 && !form.programmeId}>Next →</button>
          : <button className="btn-primary btn gap-2" onClick={handleCreate} disabled={loading}>
            {loading ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Megaphone size={14} />}
            Launch Campaign
          </button>
        }
      </>}>
      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${s <= step ? 'bg-blue-600' : 'bg-slate-200'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 mb-3">Select Programme</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {programs.map(p => (
              <button key={p._id} onClick={() => setForm(f => ({ ...f, programmeId: p._id, name: `${p.name} — ${new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}` }))}
                className={`w-full p-3.5 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${form.programmeId === p._id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{p.name}</div>
                  <div className="text-xs text-slate-500 capitalize">{p.category} · {p.duration} days</div>
                </div>
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
            <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder={`${selectedProg?.name} — March 2026`} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Start Date</label>
              <input type="date" className="input" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">End Date</label>
              <input type="date" className="input" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Target Audience</label>
            <select className="input" value={form.audience} onChange={e => setForm(f => ({ ...f, audience: e.target.value }))}>
              <option value="all">All Staff</option>
              <option value="custom">Custom Department Selection</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enrolment Goal: <span className="text-blue-600">{form.enrolmentGoal}%</span></label>
            <input type="range" min={20} max={100} step={5} value={form.enrolmentGoal} onChange={e => setForm(f => ({ ...f, enrolmentGoal: +e.target.value }))}
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
              <div className="flex justify-between"><span className="text-slate-500">Programme</span><span className="font-medium">{selectedProg?.name || '—'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Name</span><span className="font-medium">{form.name || 'Auto-named'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Audience</span><span className="font-medium capitalize">{form.audience === 'all' ? 'All Staff' : form.audience}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Goal</span><span className="font-medium">{form.enrolmentGoal}% enrolment</span></div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Message (Preview)</label>
            <textarea className="input" rows={4} readOnly value={`🎯 Exciting news! We're launching the ${selectedProg?.name || 'wellness'} programme. Join today and start your journey to better health!`} />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-700">Automated Nudges</p>
            {[['Day 3 nudge', 'Sent to staff who haven\'t enrolled yet'], ['Week 2 check-in', 'Progress reminder for enrolled staff'], ['Week 4 mid-point', 'Completion encouragement']].map(([l, d]) => (
              <label key={l} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked disabled className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                <div><div className="text-sm font-medium text-slate-700">{l}</div><div className="text-xs text-slate-400">{d}</div></div>
              </label>
            ))}
          </div>
        </div>
      )}
    </Modal>
  )
}

function CampaignDetailModal({ campaign: c, open, onClose }) {
  if (!c) return null
  const stats = c.stats || {}
  const prog = c.programmeId || {}
  const isGoalMet = (stats.enrolmentPct || 0) >= (c.enrolmentGoal || 0)

  return (
    <Modal open={open} onClose={onClose} title={c.name} maxWidth="max-w-2xl">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[['Enrolled',stats.enrolled || 0,'#3b82f6'],['Active',stats.active || 0,'#10b981'],['Completed',stats.completed || 0,'#8b5cf6'],['Dropped',stats.dropped || 0,'#ef4444']].map(([l,v,col]) => (
            <div key={l} className="rounded-xl p-4 text-center" style={{ background:`${col}10`, border:`1px solid ${col}30` }}>
              <div className="text-2xl font-display font-bold" style={{ color:col }}>{v}</div>
              <div className="text-xs text-slate-500 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Enrolment Progress</span>
            <span className="text-sm font-bold" style={{ color:prog.colour || '#3b82f6' }}>{stats.enrolmentPct || 0}% of {c.enrolmentGoal || 0}% goal</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width:`${stats.enrolmentPct || 0}%`, background:prog.colour || '#3b82f6' }} />
          </div>
          <div className="flex items-center justify-between mt-1 text-xs text-slate-400">
            <span>{stats.enrolled || 0} of {stats.targetCount || 0} staff enrolled</span>
            <span>{(stats.targetCount || 0) - (stats.enrolled || 0)} remaining</span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Completion Rate</span>
            <span className="text-sm font-bold text-blue-600">{stats.completionPct || 0}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width:`${stats.completionPct || 0}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[['Programme',prog.name || '---'],['Audience',c.targetAudience?.type === 'all' ? 'All Staff' : 'Custom Segment'],['Start',new Date(c.startDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})],['End',new Date(c.endDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})]].map(([l,v]) => (
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
  const { tenantId } = useParams()
  const [tab, setTab] = useState('all')
  const [campaigns, setCampaigns] = useState([])
  const [progs, setProgs] = useState([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [detailCampaign, setDetailCampaign] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const [cRes, pRes] = await Promise.all([
          api.get('/campaigns'),
          api.get('/programmes')
        ])
        if (cRes.success) setCampaigns(cRes.campaigns || [])
        if (pRes.success) setProgs(pRes.programmes || [])
      } catch (err) { console.error(err) }
      finally { setLoading(false) }
    }
    fetch()
  }, [])

  const filtered = campaigns.filter(c => {
    if (tab === 'active') return c.status === 'active'
    if (tab === 'completed') return c.status === 'completed'
    return true
  })

  const stats = [
    { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length, color: 'text-emerald-600' },
    { label: 'Total Staff Targeted', value: campaigns.reduce((acc, c) => acc + (c.stats?.targetCount || 0), 0), color: 'text-blue-600' },
    { label: 'Avg Enrolment Rate', value: campaigns.length ? Math.round(campaigns.reduce((acc, c) => acc + (c.stats?.enrolmentPct || 0), 0) / campaigns.length) + '%' : '0%', color: 'text-purple-600' },
    { label: 'Total Enrolled', value: campaigns.reduce((acc, c) => acc + (c.stats?.enrolled || 0), 0), color: 'text-slate-700' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Wellness Campaigns"
        description="Launch and track time-bound wellness initiatives for your workforce"
        action={
          <button className="btn-primary btn gap-2 text-sm" onClick={() => setCreateOpen(true)}>
            <Plus size={15} /> New Campaign
          </button>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="card p-4">
            <div className={`font-display text-2xl ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4">
        <Tabs active={tab} onChange={setTab} tabs={[
          { id: 'all', label: 'All Campaigns', count: campaigns.length },
          { id: 'active', label: 'Active', count: campaigns.filter(c => c.status === 'active').length },
          { id: 'completed', label: 'Completed', count: campaigns.filter(c => c.status === 'completed').length }
        ]} />
      </div>

      {/* Campaign cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          [0, 1, 2].map(i => <div key={i} className="h-64 skeleton rounded-2xl" />)
        ) : filtered.length === 0 ? (
          <div className="col-span-full">
            <EmptyState icon={Megaphone} title="No campaigns found" description="Create your first wellness campaign to start engaging your staff." />
          </div>
        ) : (
          filtered.map(c => <CampaignCard key={c._id} c={c} onView={setDetailCampaign} />)
        )}

        {/* Create new card */}
        <div className="card p-5 border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 min-h-64 group"
          onClick={() => setCreateOpen(true)}>
          <div className="w-12 h-12 rounded-xl bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
            <Plus size={24} className="text-blue-600 transition-transform group-hover:scale-110" />
          </div>
          <div className="text-center">
            <div className="font-semibold text-slate-900">Start New Campaign</div>
            <div className="text-xs text-slate-500 mt-1 max-w-[150px]">Select a wellness programme to begin</div>
          </div>
        </div>
      </div>

      <CreateCampaignModal open={createOpen} onClose={() => setCreateOpen(false)} programs={progs} onCreated={() => {
        // Refresh campaigns
        api.get('/campaigns').then(res => { if (res.success) setCampaigns(res.campaigns) })
      }} />
      {detailCampaign && <CampaignDetailModal campaign={detailCampaign} open={!!detailCampaign} onClose={() => setDetailCampaign(null)} />}
    </div>
  )
}
