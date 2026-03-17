import { useState, useEffect } from 'react'
import { BookOpen, Lock, Clock, BarChart3, Star, Users, ChevronRight, Zap, Search } from 'lucide-react'
import { Badge, Modal, SectionHeader, SearchInput, EmptyState } from '../../admin-shared/components/ui'
import { useAuthStore, useUIStore } from '../../admin-shared/store'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../admin-shared/services/api'



const CATS = ['All', 'hypertension', 'diabetes', 'cardiac', 'stress', 'sleep', 'fitness', 'nutrition']
const CAT_COLORS = { hypertension: 'badge-red', diabetes: 'badge-orange', cardiac: 'badge-red', stress: 'badge-purple', sleep: 'badge-blue', fitness: 'badge-green', nutrition: 'badge-orange' }

function ProgrammeDetailModal({ prog, open, onClose }) {
  const { toast } = useUIStore()
  const navigate = useNavigate()
  const { tenantId } = useParams()
  if (!prog) return null
  const planBadge = prog.availableOn?.includes('enterprise') && !prog.availableOn?.includes('growth') ? 'Enterprise only' : prog.availableOn?.includes('growth') && !prog.availableOn?.includes('starter') ? 'Growth+' : 'All plans'

  return (
    <Modal open={open} onClose={onClose} title={prog.name} maxWidth="max-w-xl"
      footer={<>
        <button className="btn-secondary btn" onClick={onClose}>Close</button>
        <button className="btn-primary btn gap-2" onClick={() => { 
          navigate('../campaigns'); 
          onClose(); 
          toast(`Creating campaign for ${prog.name}`, 'success'); 
        }}>
          <Zap size={14} /> Create Campaign
        </button>
      </>}>
      <div className="space-y-5">
        <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: `${prog.colour}12`, border: `1px solid ${prog.colour}30` }}>
          <div className="text-5xl">{prog.icon}</div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge color="slate">{planBadge}</Badge>
              <Badge color="slate">{prog.difficulty}</Badge>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} className={i <= Math.floor(prog.rating || 0) ? 'text-amber-400' : 'text-slate-200'} fill={i <= Math.floor(prog.rating || 0) ? 'currentColor' : 'none'} />)}
              <span className="text-xs text-slate-500 ml-1">{prog.rating || 0} ({(prog.ratingCount || 0).toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{prog.description}</p>
        <div className="grid grid-cols-3 gap-3">
          {[['⏱️', prog.duration + ' days', 'Duration'], ['📋', prog.sessions + ' sessions', 'Total Sessions'], ['👥', prog.enrolled || '—', 'Your Enrolled']].map(([e, v, l]) => (
            <div key={l} className="bg-slate-50 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">{e}</div>
              <div className="font-semibold text-slate-800 text-sm">{v}</div>
              <div className="text-xs text-slate-500">{l}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Benefits</div>
            <div className="space-y-1.5">
              {(prog.benefits?.length ? prog.benefits : (prog.tags && prog.tags.length ? prog.tags : ['Wellness coaching', 'Progress tracking', 'Health insights'])).map(b => (
                <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${prog.colour || '#3B7BF8'}20` }}>
                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill={prog.colour}><path d="M1 5l3 3 5-5" /><path d="M1 5l3 3 5-5" stroke={prog.colour} strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
                  </div>
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Access Requirement</div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-sm font-medium text-slate-800 mb-1 capitalize">{planBadge}</div>
              <p className="text-[10px] text-slate-500 leading-tight">Requires {(prog.availableOn || []).join(', ') || 'enterprise'} plan subscriptions or higher.</p>
            </div>
          </div>
        </div>

        {prog.modules?.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Programme Modules</div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {prog.modules.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 hvr-translate-x">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-100 text-blue-600 text-[10px] font-bold">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-800 truncate">{m.title}</div>
                    <div className="text-[10px] text-slate-500">{m.duration ? `${m.duration} mins` : 'Self-paced'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {prog.enrolled > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Organisation Completion Rate</div>
              <span className="text-xs font-bold text-slate-700">{prog.completion}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${prog.completion}%`, background: prog.colour }} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default function ProgrammesPage() {
  const { user, org } = useAuthStore()
  const navigate = useNavigate()
  const { tenantId } = useParams()
  const { toast } = useUIStore()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [detail, setDetail] = useState(null)

  const [programmes, setProgrammes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const res = await api.get('/programmes')
        if (res.success && res.programmes) {
          setProgrammes(res.programmes)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProgrammes()
  }, [])

  const activePlan = org?.plan || 'trial'
  const isAvail = (prog) => {
    if (['enterprise', 'premium'].includes(activePlan)) return true
    if (activePlan === 'growth') return prog.availableOn?.includes('growth') || prog.availableOn?.includes('standard') || prog.availableOn?.includes('starter')
    return prog.availableOn?.includes('standard') || prog.availableOn?.includes('starter')
  }

  const filtered = programmes.filter(p => {
    if (search && !p.title?.toLowerCase().includes(search.toLowerCase())) return false
    if (cat !== 'All' && p.category !== cat) return false
    return true
  })

  const activeCount = programmes.length

  if (loading) return <div className="p-8 text-center animate-pulse text-slate-400">Loading programmes...</div>

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Programme Catalogue"
        description={`${activeCount} programmes active in your organisation`}
        action={
          <button className="btn-primary btn gap-2 text-sm" onClick={() => navigate(`/corporate/${tenantId}/campaigns`)}>
            <Zap size={15} /> Create Campaign
          </button>
        }
      />

      {/* Plan notice */}
      {activePlan !== 'enterprise' && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <Lock size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Unlock more programmes with Enterprise</p>
            <p className="text-xs text-amber-600 mt-0.5">Your current {activePlan} plan includes up to {['standard', 'starter'].includes(activePlan) ? '2' : activePlan === 'growth' ? '5' : '0'} programmes. Upgrade to access the full catalogue.</p>
          </div>
          <button onClick={() => navigate(`/corporate/${tenantId}/billing`)} className="bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 hover:bg-amber-600 transition-colors">Upgrade</button>
        </div>
      )}

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search programmes..." className="w-64" />
        <div className="flex gap-1.5 flex-wrap">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${cat === c ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-64 skeleton rounded-2xl" />)
        ) : filtered.length === 0 ? (
          <div className="col-span-full">
            <EmptyState 
              icon={BookOpen} 
              title="No programmes found" 
              description="No wellness programmes match your current filters or organisation plan." 
            />
          </div>
        ) : (
          filtered.map(prog => {
            const avail = isAvail(prog)
            return (
              <div key={prog._id || prog.id}
                className={`card group transition-all duration-300 overflow-hidden cursor-pointer ${avail ? 'hover:shadow-card-hover hover:-translate-y-0.5' : 'opacity-60'}`}
                onClick={() => avail ? setDetail(prog) : null}>
                {/* Top colour bar */}
                <div className="h-1.5 w-full" style={{ background: prog.colour || '#3b82f6' }} />
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl">{prog.icon || '📚'}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`badge text-xs ${CAT_COLORS[prog.category] || 'badge-slate'}`}>{prog.category || 'General'}</span>
                        {!avail && <Badge color="orange"><Lock size={10} /> Locked</Badge>}
                        {prog.enrolled > 0 && <Badge color="green">Active</Badge>}
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm leading-tight">{prog.title}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{prog.description}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><Clock size={11} />{prog.duration}d</span>
                    <span className="flex items-center gap-1"><BookOpen size={11} />{prog.sessions} sessions</span>
                    <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" fill="currentColor" />{prog.rating || 0}</span>
                  </div>

                  {avail && prog.enrolled > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500"><Users size={10} className="inline mr-1" />{prog.enrolled} enrolled</span>
                        <span className="text-xs font-semibold text-slate-700">{prog.completion}% complete</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${prog.completion}%`, background: prog.colour }} />
                      </div>
                    </div>
                  )}

                  {!avail ? (
                    <button onClick={(e) => { e.stopPropagation(); navigate('../billing') }} className="w-full py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5">
                      <Lock size={12} /> Upgrade to Unlock
                    </button>
                  ) : (
                    <button onClick={() => setDetail(prog)} className="w-full py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 group-hover:border-blue-300">
                      <ChevronRight size={12} /> View Details & Campaign
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      <ProgrammeDetailModal prog={detail} open={!!detail} onClose={() => setDetail(null)} />
    </div>
  )
}
