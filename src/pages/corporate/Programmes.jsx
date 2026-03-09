import { useState } from 'react'
import { BookOpen, Lock, Clock, BarChart3, Star, Users, ChevronRight, Zap, Search } from 'lucide-react'
import { Badge, Modal, SectionHeader, SearchInput } from '../../admin-shared/components/ui'
import { useAuthStore, useUIStore } from '../../admin-shared/store'
import { useNavigate } from 'react-router-dom'

const PROGRAMMES = [
  { id:1, name:'Hypertension Control', slug:'hypertension-control', category:'hypertension', description:'Evidence-based 30-day programme to manage blood pressure through lifestyle changes, diet, and daily monitoring routines.', duration:30, sessions:24, difficulty:'Beginner', rating:4.7, ratingCount:1230, colour:'#EF4444', icon:'🩺', available:['starter','growth','enterprise'], enrolled:218, completion:63, benefits:['Lower BP by 10-15 mmHg','Reduce medication dependence','DASH diet mastery'] },
  { id:2, name:'Diabetes Management', slug:'diabetes-management', category:'diabetes', description:'Comprehensive 45-day programme combining nutrition coaching, glucose monitoring habits, and physical activity.', duration:45, sessions:36, difficulty:'Intermediate', rating:4.8, ratingCount:2100, colour:'#F97316', icon:'💉', available:['starter','growth','enterprise'], enrolled:78, completion:10, benefits:['Reduce HbA1c by 0.5-1%','Better glucose control','Healthy eating habits'] },
  { id:3, name:'Cardiac Rehabilitation', slug:'cardiac-rehab', category:'cardiac', description:'Supervised 60-day cardiac recovery and prevention programme with graded exercise, stress management, and heart health education.', duration:60, sessions:48, difficulty:'Intermediate', rating:4.9, ratingCount:890, colour:'#DC2626', icon:'❤️', available:['growth','enterprise'], enrolled:0, completion:0, benefits:['Improve cardiac fitness','Reduce re-event risk','Heart-healthy habits'] },
  { id:4, name:'Stress & Mindfulness', slug:'stress-mindfulness', category:'stress', description:'Daily mindfulness, breathwork, and cognitive techniques to reduce workplace stress and anxiety.', duration:21, sessions:21, difficulty:'Beginner', rating:4.6, ratingCount:3400, colour:'#8B5CF6', icon:'🧘', available:['starter','growth','enterprise'], enrolled:234, completion:81, benefits:['Lower cortisol','Better sleep','Improved focus'] },
  { id:5, name:'Sleep Optimisation', slug:'sleep-optimisation', category:'sleep', description:'Science-backed 14-day programme using CBT-I techniques to improve sleep quality and duration.', duration:14, sessions:14, difficulty:'Beginner', rating:4.5, ratingCount:1800, colour:'#6366F1', icon:'🌙', available:['growth','enterprise'], enrolled:0, completion:0, benefits:['7-8hrs quality sleep','No sleep medications','Refreshed mornings'] },
  { id:6, name:'Active Lifestyle', slug:'active-lifestyle', category:'fitness', description:'Progressive 30-day movement programme from sedentary to 10,000 steps with guided workouts.', duration:30, sessions:30, difficulty:'Beginner', rating:4.4, ratingCount:4200, colour:'#10B981', icon:'🏃', available:['starter','growth','enterprise'], enrolled:156, completion:45, benefits:['10k steps daily','Weight management','More energy'] },
  { id:7, name:'Nutrition Reset', slug:'nutrition-reset', category:'nutrition', description:'21-day whole-foods nutrition reset with personalised meal plans, portion control, and cooking guidance.', duration:21, sessions:21, difficulty:'Beginner', rating:4.6, ratingCount:2700, colour:'#F59E0B', icon:'🥗', available:['growth','enterprise'], enrolled:89, completion:34, benefits:['Clean eating habits','Weight management','Better energy'] },
  { id:8, name:'Heart Health Premium', slug:'heart-health-premium', category:'cardiac', description:'Enterprise-grade comprehensive cardiovascular prevention programme combining all risk domains over 90 days.', duration:90, sessions:72, difficulty:'Advanced', rating:4.9, ratingCount:420, colour:'#EC4899', icon:'💗', available:['enterprise'], enrolled:0, completion:0, benefits:['Full CVITAL improvement','Multi-domain risk reduction','Physician liaison reports'] },
]

const CATS = ['All', 'hypertension', 'diabetes', 'cardiac', 'stress', 'sleep', 'fitness', 'nutrition']
const CAT_COLORS = { hypertension:'badge-red', diabetes:'badge-orange', cardiac:'badge-red', stress:'badge-purple', sleep:'badge-blue', fitness:'badge-green', nutrition:'badge-orange' }

function ProgrammeDetailModal({ prog, open, onClose }) {
  const { toast } = useUIStore()
  const navigate = useNavigate()
  if (!prog) return null
  const planBadge = prog.available.includes('enterprise') && !prog.available.includes('growth') ? 'Enterprise only' : prog.available.includes('growth') && !prog.available.includes('starter') ? 'Growth+' : 'All plans'

  return (
    <Modal open={open} onClose={onClose} title={prog.name} maxWidth="max-w-xl"
      footer={<>
        <button className="btn-secondary btn" onClick={onClose}>Close</button>
        <button className="btn-primary btn gap-2" onClick={() => { onClose(); navigate('/campaigns'); toast(`Creating campaign for ${prog.name}`,'success') }}>
          <Zap size={14}/> Create Campaign
        </button>
      </>}>
      <div className="space-y-5">
        <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: `${prog.colour}12`, border:`1px solid ${prog.colour}30` }}>
          <div className="text-5xl">{prog.icon}</div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge color="slate">{planBadge}</Badge>
              <Badge color="slate">{prog.difficulty}</Badge>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} className={i<=Math.floor(prog.rating)?'text-amber-400':'text-slate-200'} fill={i<=Math.floor(prog.rating)?'currentColor':'none'}/>)}
              <span className="text-xs text-slate-500 ml-1">{prog.rating} ({prog.ratingCount.toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{prog.description}</p>
        <div className="grid grid-cols-3 gap-3">
          {[['⏱️', prog.duration+' days', 'Duration'],['📋', prog.sessions+' sessions', 'Total Sessions'],['👥', prog.enrolled||'—', 'Your Enrolled']].map(([e,v,l]) => (
            <div key={l} className="bg-slate-50 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">{e}</div>
              <div className="font-semibold text-slate-800 text-sm">{v}</div>
              <div className="text-xs text-slate-500">{l}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Benefits</div>
          <div className="space-y-1.5">
            {prog.benefits.map(b => (
              <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:`${prog.colour}20` }}>
                  <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill={prog.colour}><path d="M1 5l3 3 5-5"/><path d="M1 5l3 3 5-5" stroke={prog.colour} strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                </div>
                {b}
              </div>
            ))}
          </div>
        </div>
        {prog.enrolled > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Organisation Completion Rate</div>
              <span className="text-xs font-bold text-slate-700">{prog.completion}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width:`${prog.completion}%`, background:prog.colour }} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default function ProgrammesPage() {
  const { org } = useAuthStore()
  const navigate = useNavigate()
  const { toast } = useUIStore()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [detail, setDetail] = useState(null)

  const plan = org?.plan || 'starter'
  const isAvail = (prog) => prog.available.includes(plan)

  const filtered = PROGRAMMES.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    if (cat !== 'All' && p.category !== cat) return false
    return true
  })

  const activeCount = PROGRAMMES.filter(p => isAvail(p) && p.enrolled > 0).length

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Programme Catalogue"
        description={`${activeCount} programmes active in your organisation`}
        action={
          <button className="btn-primary btn gap-2 text-sm" onClick={() => navigate('/campaigns')}>
            <Zap size={15}/> Create Campaign
          </button>
        }
      />

      {/* Plan notice */}
      {plan !== 'enterprise' && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <Lock size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Unlock more programmes with Enterprise</p>
            <p className="text-xs text-amber-600 mt-0.5">Your current {plan} plan includes up to {plan==='starter'?'2':'5'} programmes. Upgrade to access the full catalogue.</p>
          </div>
          <button onClick={() => navigate('/billing')} className="bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 hover:bg-amber-600 transition-colors">Upgrade</button>
        </div>
      )}

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search programmes..." className="w-64" />
        <div className="flex gap-1.5 flex-wrap">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${cat===c?'bg-blue-600 text-white':'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(prog => {
          const avail = isAvail(prog)
          return (
            <div key={prog.id}
              className={`card group transition-all duration-300 overflow-hidden cursor-pointer ${avail?'hover:shadow-card-hover hover:-translate-y-0.5':'opacity-60'}`}
              onClick={() => avail ? setDetail(prog) : null}>
              {/* Top colour bar */}
              <div className="h-1.5 w-full" style={{ background: prog.colour }} />
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">{prog.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`badge text-xs ${CAT_COLORS[prog.category]||'badge-slate'}`}>{prog.category}</span>
                      {!avail && <Badge color="orange"><Lock size={10}/> Locked</Badge>}
                      {prog.enrolled > 0 && <Badge color="green">Active</Badge>}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm leading-tight">{prog.name}</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{prog.description}</p>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Clock size={11}/>{prog.duration}d</span>
                  <span className="flex items-center gap-1"><BookOpen size={11}/>{prog.sessions} sessions</span>
                  <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" fill="currentColor"/>{prog.rating}</span>
                </div>

                {avail && prog.enrolled > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-500"><Users size={10} className="inline mr-1"/>{prog.enrolled} enrolled</span>
                      <span className="text-xs font-semibold text-slate-700">{prog.completion}% complete</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width:`${prog.completion}%`, background:prog.colour }} />
                    </div>
                  </div>
                )}

                {!avail ? (
                  <button onClick={() => navigate('/billing')} className="w-full py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5">
                    <Lock size={12}/> Upgrade to Unlock
                  </button>
                ) : (
                  <button className="w-full py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 group-hover:border-blue-300">
                    <ChevronRight size={12}/> View Details & Campaign
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <ProgrammeDetailModal prog={detail} open={!!detail} onClose={() => setDetail(null)} />
    </div>
  )
}
