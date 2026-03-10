// ══════════════════════════════════════════════════════════════════════════════
// SuperAdmin.jsx
// ══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect, useCallback } from 'react'
import { Zap, Plus, Building2, Users, CreditCard, TrendingUp, Search, Edit2, Eye, Power, ChevronDown } from 'lucide-react'
import { Badge, Modal, SectionHeader, PlanBadge, Avatar, SearchInput } from '../../admin-shared/components/ui'
import { useAuthStore, useUIStore } from '../../admin-shared/store'
import superAdminApi from '../../admin-shared/services/superAdminApi'
import { useSelector } from 'react-redux'

function CreateOrgModal({ open, onClose, onSuccess }) {
  const { toast } = useUIStore()
  const [form, setForm] = useState({ name: '', displayName: '', slug: '', plan: 'growth', seats: 100, adminName: '', adminEmail: '', adminMobile: '', brandColor: '#3B7BF8' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.name) return toast('Legal Name is required.', 'error')
    if (!form.adminEmail) return toast('Work Email for the Admin is required to receive the password.', 'error')

    try {
      setLoading(true)
      await superAdminApi.post('/tenants', form)
      toast('Organisation created! Welcome email sent to admin.', 'success')
      if (onSuccess) onSuccess()
      onClose()
    } catch (err) {
      toast(err.message || 'Failed to create organisation', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Create Organisation" maxWidth="max-w-2xl"
      footer={<>
        <button className="btn-secondary btn" onClick={onClose} disabled={loading}>Cancel</button>
        <button className="btn-primary btn gap-2" onClick={handleSubmit} disabled={loading}>
          <Zap size={14} /> {loading ? 'Provisioning...' : 'Provision Organisation'}
        </button>
      </>}>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Legal Name</label><input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Infosys Limited" /></div>
        <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Display Name</label><input className="input" value={form.displayName} onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))} placeholder="Infosys" /></div>
        <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Portal Slug</label>
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
            <span className="px-3 text-xs text-slate-400 bg-slate-50 border-r border-slate-200 py-2.5 flex-shrink-0">preventvital.com/</span>
            <input className="flex-1 px-3 py-2.5 text-sm outline-none" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="infosys" />
          </div>
        </div>
        <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Plan</label>
          <select className="input" value={form.plan} onChange={e => setForm(f => ({ ...f, plan: e.target.value }))}>
            <option value="trial">Trial (30 days free)</option>
            <option value="starter">Starter — ₹5,000/yr</option>
            <option value="growth">Growth — ₹15,000/yr</option>
            <option value="enterprise">Enterprise — ₹35,000/yr</option>
          </select>
        </div>
        <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Licensed Seats</label><input type="number" className="input" value={form.seats} onChange={e => setForm(f => ({ ...f, seats: +e.target.value }))} /></div>
        <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Brand Colour</label>
          <div className="flex gap-2">
            <input type="color" value={form.brandColor} onChange={e => setForm(f => ({ ...f, brandColor: e.target.value }))} className="w-12 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5" />
            <input className="input flex-1 font-mono" value={form.brandColor} onChange={e => setForm(f => ({ ...f, brandColor: e.target.value }))} />
          </div>
        </div>
        <div className="col-span-2 pt-3 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">First Org Admin Account</p>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Full Name</label><input className="input" value={form.adminName} onChange={e => setForm(f => ({ ...f, adminName: e.target.value }))} placeholder="Priya Sharma" /></div>
            <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Work Email</label><input type="email" className="input" value={form.adminEmail} onChange={e => setForm(f => ({ ...f, adminEmail: e.target.value }))} placeholder="priya@company.com" /></div>
            <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Mobile</label><input className="input" value={form.adminMobile} onChange={e => setForm(f => ({ ...f, adminMobile: e.target.value }))} placeholder="+91 98765 43210" /></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">A temporary password will be auto-generated and emailed to the admin.</p>
        </div>
      </div>
    </Modal>
  )
}

export default function SuperAdminPage() {
  const { user } = useSelector((state) => state.auth);
  const admin = user;
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [createOpen, setCreateOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('platform') // 'platform', 'b2b', 'b2c'
  const { toast } = useUIStore()

  const [orgs, setOrgs] = useState([])
  const [stats, setStats] = useState(null)
  const [b2cStats, setB2cStats] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const [tenantsRes, statsRes, b2cRes] = await Promise.all([
        superAdminApi.get('/tenants'),
        superAdminApi.get('/stats'),
        superAdminApi.get('/b2c-stats')
      ])
      setOrgs(tenantsRes.data?.tenants || [])
      setStats(statsRes.data || null)
      setB2cStats(b2cRes.data || null)
    } catch (err) {
      toast('Failed to load dashboard data', 'error')
    }
  }, [toast])

  useEffect(() => {
    if (admin?.role === 'super_admin') {
      fetchData()
    }
  }, [admin, fetchData])

  if (admin?.role !== 'super_admin') return (
    <div className="flex items-center justify-center h-96 flex-col gap-4">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center"><Zap size={28} className="text-amber-600" /></div>
      <h2 className="font-display text-xl text-slate-800">Super Admin Access Required</h2>
      <p className="text-sm text-slate-500">This section is restricted to platform administrators.</p>
    </div>
  )

  const filtered = orgs.filter(o => {
    if (search && !o.name?.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center"><Zap size={14} className="text-white" /></div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Platform Admin</span>
          </div>
          <h1 className="font-display text-2xl text-slate-900">Super Admin Console</h1>
          <p className="text-sm text-slate-500 mt-1">Manage all organisations on the PreventalVital platform</p>
        </div>
        {activeTab === 'b2b' && (
          <button onClick={() => setCreateOpen(true)} className="btn-primary btn gap-2"><Plus size={15} />New Organisation</button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit mb-6">
        <button
          onClick={() => setActiveTab('platform')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'platform' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
          Platform Overview
        </button>
        <button
          onClick={() => setActiveTab('b2b')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'b2b' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
          B2B Organisations
        </button>
        <button
          onClick={() => setActiveTab('b2c')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'b2c' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
          B2C Consumers
        </button>
      </div>

      {activeTab === 'platform' && (
        <div className="space-y-6 animate-fade-in">
          {/* Platform stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Organisations', value: orgs.length, icon: '🏢', color: 'text-blue-600' },
              { label: 'Active Organisations', value: orgs.filter(o => o.status === 'active').length, icon: '✅', color: 'text-emerald-600' },
              { label: 'Total Platform Users', value: stats?.users?.total || 0, icon: '👥', color: 'text-purple-600' },
              { label: 'Platform Monthly Revenue', value: `₹${Math.round((stats?.revenue?.month || 0) / 1000)}k+`, icon: '💰', color: 'text-amber-600' },
            ].map(s => (
              <div key={s.label} className="card p-5">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className={`font-display text-3xl ${s.color}`}>{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'b2b' && (
        <div className="space-y-6 animate-fade-in">
          {/* Org table */}
          <div className="card overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-3 flex-wrap">
              <SearchInput value={search} onChange={setSearch} placeholder="Search organisations..." className="w-64" />
              <select className="input w-auto text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="trial">Trial</option>
                <option value="suspended">Suspended</option>
              </select>
              <span className="text-xs text-slate-400 ml-auto">{filtered.length} organisations</span>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Organisation</th>
                  <th>Plan</th>
                  <th>Seat Usage</th>
                  <th>Status</th>
                  <th>Renewal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => {
                  const brandColor = o.branding?.primaryColor || '#007CC3'
                  const display = o.name
                  const seatsUsed = o.usersCount || 0
                  const seats = o.maxUsers || 100
                  const renewalDate = o.contractEnd ? new Date(o.contractEnd).toLocaleDateString() : 'N/A'

                  return (
                    <tr key={o._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: brandColor }}>
                            {display?.[0]?.toUpperCase() || 'O'}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800 text-sm">{display}</div>
                            <div className="text-xs text-slate-400">{o.adminEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td><PlanBadge plan={o.subscriptionPlan || 'starter'} /></td>
                      <td>
                        <div className="text-xs mb-1">{seatsUsed}/{seats} <span className="text-slate-400">({Math.round((seatsUsed / seats) * 100)}%)</span></div>
                        <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.min((seatsUsed / seats) * 100, 100)}%` }} />
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${o.status === 'active' ? 'badge-green' : o.status === 'trial' ? 'badge-orange' : 'badge-red'}`}>{o.status}</span>
                      </td>
                      <td className="text-xs text-slate-500">{renewalDate}</td>
                      <td>
                        <div className="flex gap-1">
                          <button onClick={() => toast(`Viewing ${display}`, 'info')} className="btn btn-sm btn-ghost btn-icon" title="View">
                            <Eye size={13} />
                          </button>
                          <button onClick={() => toast(`Editing ${display}`, 'info')} className="btn btn-sm btn-ghost btn-icon" title="Edit">
                            <Edit2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'b2c' && (
        <div className="space-y-6 animate-fade-in">
          {/* B2C stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card p-5">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-display text-3xl text-blue-600">{b2cStats?.totalB2CUsers || 0}</div>
              <div className="text-xs text-slate-500 mt-0.5">Total Registered Consumers</div>
            </div>
            <div className="card p-5">
              <div className="text-2xl mb-2">🔥</div>
              <div className="font-display text-3xl text-emerald-600">{b2cStats?.activeSubscriptions || 0}</div>
              <div className="text-xs text-slate-500 mt-0.5">Active App Subscriptions</div>
            </div>
            <div className="card p-5">
              <div className="text-2xl mb-2">🏃</div>
              <div className="font-display text-3xl text-purple-600">{b2cStats?.dailyActiveUsers || 0}</div>
              <div className="text-xs text-slate-500 mt-0.5">Daily Active Users</div>
            </div>
            <div className="card p-5">
              <div className="text-2xl mb-2">💳</div>
              <div className="font-display text-3xl text-amber-600">₹{b2cStats?.b2cRevenue || 0}</div>
              <div className="text-xs text-slate-500 mt-0.5">B2C Total Revenue</div>
            </div>
          </div>

          <div className="card p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
              <Users size={28} className="text-blue-500" />
            </div>
            <h3 className="font-display text-xl text-slate-800 mb-2">B2C Consumers Dashboard</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Manage individual consumer app users, subscriptions, and platform telemetry.
            </p>
          </div>
        </div>
      )}

      <CreateOrgModal open={createOpen} onClose={() => setCreateOpen(false)} onSuccess={fetchData} />
    </div >
  )
}
