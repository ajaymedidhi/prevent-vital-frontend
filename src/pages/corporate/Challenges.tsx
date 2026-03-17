import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Activity, Zap, Plus, Search, BarChart3, Target, Flame, Users } from 'lucide-react'
import { Badge, Modal, SectionHeader, Tabs } from '../../admin-shared/components/ui'
import { useUIStore } from '../../admin-shared/store'
import api from '../../admin-shared/services/api'

export default function CorporateChallenges() {
    const [tab, setTab] = useState('active')
    const [challenges, setChallenges] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [createOpen, setCreateOpen] = useState(false)
    const [leaderboardOpen, setLeaderboardOpen] = useState(false)
    const [selectedChallenge, setSelectedChallenge] = useState(null)
    const [leaderboardData, setLeaderboardData] = useState(null)
    const { toast } = useUIStore()

    useEffect(() => {
        fetchChallenges()
    }, [])

    const fetchChallenges = async () => {
        try {
            setLoading(true)
            const res = await api.get('/challenges')
            if (res.success) {
                setChallenges(res.challenges || [])
            }
        } catch (err) {
            console.error(err)
            toast('Failed to load challenges', 'error')
        } finally {
            setLoading(false)
        }
    }

    const fetchLeaderboard = async (id) => {
        try {
            const res = await api.get(`/challenges/${id}/leaderboard`)
            if (res.success) {
                setLeaderboardData(res.leaderboard)
                setLeaderboardOpen(true)
            }
        } catch (err) {
            toast('Failed to load leaderboard', 'error')
        }
    }

    const handleCreate = async (formData) => {
        try {
            const res = await api.post('/challenges', formData)
            if (res.success) {
                toast('Challenge created successfully!', 'success')
                fetchChallenges()
                setCreateOpen(false)
            }
        } catch (err) {
            toast('Failed to create challenge', 'error')
        }
    }

    const filtered = challenges.filter(c => {
        if (tab === 'active' && c.status !== 'active') return false
        if (tab === 'completed' && c.status !== 'completed') return false
        if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false
        return true
    })

    // Mock data for initial empty state UX
    const MOCK_CHALLENGES = [
        { _id: '1', title: 'Q1 Fitness Sprint', type: 'sessions', status: 'active', startDate: new Date(), endDate: new Date(Date.now() + 86400000 * 14), targetType: 'department', stats: { totalParticipants: 156 } },
        { _id: '2', title: 'Hydration Heroes', type: 'water', status: 'active', startDate: new Date(), endDate: new Date(Date.now() + 86400000 * 7), targetType: 'individual', stats: { totalParticipants: 89 } }
    ]

    const displayChallenges = filtered.length > 0 ? filtered : (loading ? [] : MOCK_CHALLENGES)

    if (loading && challenges.length === 0) return <div className="p-12 text-center text-slate-400 animate-pulse">Loading challenges...</div>

    return (
        <div className="space-y-6 animate-fade-in">
            <SectionHeader
                title="Wellness Challenges"
                description="Drive engagement with inter-departmental and individual competitions."
                action={
                    <button onClick={() => setCreateOpen(true)} className="btn-primary btn gap-2">
                        <Plus size={16} /> Create Challenge
                    </button>
                }
            />

            <div className="flex flex-wrap items-center justify-between gap-4">
                <Tabs active={tab} onChange={setTab} tabs={[
                    { id: 'active', label: 'Active', count: displayChallenges.filter(c => c.status === 'active').length },
                    { id: 'completed', label: 'Completed' },
                    { id: 'draft', label: 'Drafts' },
                ]} />

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search challenges..."
                            className="input pl-9 h-9 w-64 text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayChallenges.map(c => (
                    <ChallengeCard
                        key={c._id}
                        challenge={c}
                        onViewLeaderboard={() => {
                            setSelectedChallenge(c)
                            fetchLeaderboard(c._id)
                        }}
                    />
                ))}

                {displayChallenges.length === 0 && (
                    <div className="col-span-full border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trophy size={24} className="text-slate-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800">No challenges found</h3>
                        <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">Create your first wellness challenge to boost morale and engagement.</p>
                        <button onClick={() => setCreateOpen(true)} className="btn btn-secondary mt-5 btn-sm">Create Now</button>
                    </div>
                )}
            </div>

            <CreateChallengeModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onSubmit={handleCreate}
            />

            <LeaderboardModal
                open={leaderboardOpen}
                onClose={() => setLeaderboardOpen(false)}
                challenge={selectedChallenge}
                data={leaderboardData}
            />
        </div>
    )
}

function ChallengeCard({ challenge, onViewLeaderboard }) {
    const typeIcons = {
        sessions: <Activity size={16} className="text-blue-500" />,
        steps: <Flame size={16} className="text-orange-500" />,
        mindfulness: <Zap size={16} className="text-purple-500" />,
        enrolment: <Trophy size={16} className="text-emerald-500" />,
    }

    const daysLeft = Math.ceil((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))

    return (
        <div className="card group hover:shadow-card-hover transition-all duration-300 overflow-hidden">
            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-white transition-colors border border-slate-100">
                        {typeIcons[challenge.type] || <Trophy size={16} className="text-amber-500" />}
                    </div>
                    <Badge color={challenge.status === 'active' ? 'emerald' : 'slate'}>
                        {challenge.status.toUpperCase()}
                    </Badge>
                </div>

                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors capitalize">{challenge.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{challenge.description || "Boost workforce health with this dynamic goal-oriented wellness challenge."}</p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-slate-50 rounded-xl p-2.5">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Participants</div>
                        <div className="text-sm font-bold text-slate-800">{challenge.stats?.totalParticipants || 0} staff</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2.5">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Time Left</div>
                        <div className="text-sm font-bold text-slate-800">
                            {daysLeft > 0 ? `${daysLeft} days` : 'Ended'}
                        </div>
                    </div>
                </div>

                <button
                    onClick={onViewLeaderboard}
                    className="w-full py-2.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                    <BarChart3 size={14} /> View Leaderboard
                </button>
            </div>
        </div>
    )
}

function CreateChallengeModal({ open, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'sessions',
        targetType: 'department',
        startDate: '',
        endDate: '',
        status: 'active'
    })

    if (!open) return null

    return (
        <Modal open={open} onClose={onClose} title="Create Wellness Challenge" size="lg">
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-5 p-2">
                <div>
                    <label className="label">Challenge Title</label>
                    <input
                        required
                        className="input"
                        placeholder="e.g. Summer Fitness Sprint"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="label">Description</label>
                    <textarea
                        className="input min-h-[80px]"
                        placeholder="Describe the goals and rewards..."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">Metric to Track</label>
                        <select
                            className="input"
                            value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option value="sessions">Session Completion</option>
                            <option value="steps">Step Count (Wearables)</option>
                            <option value="mindfulness">Mindfulness Minutes</option>
                            <option value="enrolment">Programme Enrolment</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Ranking Type</label>
                        <select
                            className="input"
                            value={formData.targetType}
                            onChange={e => setFormData({ ...formData, targetType: e.target.value })}
                        >
                            <option value="department">Inter-Departmental</option>
                            <option value="individual">Individual Leaderboard</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">Start Date</label>
                        <input
                            required
                            type="date"
                            className="input"
                            value={formData.startDate}
                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label">End Date</label>
                        <input
                            required
                            type="date"
                            className="input"
                            value={formData.endDate}
                            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <button type="button" onClick={onClose} className="btn btn-ghost flex-1">Cancel</button>
                    <button type="submit" className="btn btn-primary flex-1">Launch Challenge</button>
                </div>
            </form>
        </Modal>
    )
}

function LeaderboardModal({ open, onClose, challenge, data }) {
    const [viewType, setViewType] = useState('individual')

    if (!open || !challenge) return null

    const items = viewType === 'individual' ? (data?.individuals || []) : (data?.departments || [])

    return (
        <Modal open={open} onClose={onClose} title={`${challenge.title} Leaderboard`} size="xl">
            <div className="p-1">
                <div className="flex items-center justify-between mb-6 bg-slate-50 p-2 rounded-2xl">
                    <div className="flex gap-1">
                        <button
                            onClick={() => setViewType('individual')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewType === 'individual' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Individual
                        </button>
                        <button
                            onClick={() => setViewType('department')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewType === 'department' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Department
                        </button>
                    </div>
                    <div className="flex items-center gap-2 pr-2">
                        <Target size={14} className="text-slate-400" />
                        <span className="text-xs font-semibold text-slate-500">Metric: {challenge.type.replace('_', ' ')}</span>
                    </div>
                </div>

                <div className="space-y-2 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-amber-100 text-amber-600' : idx === 1 ? 'bg-slate-100 text-slate-600' : idx === 2 ? 'bg-orange-50 text-orange-600' : 'text-slate-400'}`}>
                                {idx + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-slate-800 truncate">{item.name}</div>
                                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{item.dept || 'Corporate Staff'}</div>
                            </div>

                            <div className="text-right">
                                <div className="text-sm font-black text-slate-900">{item.score.toLocaleString()}</div>
                                <div className="text-[10px] font-bold text-blue-500 uppercase">{challenge.type}</div>
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            <Users size={32} className="mx-auto mb-3 opacity-20" />
                            <p className="text-sm font-medium">Competition hasn't started yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
}
