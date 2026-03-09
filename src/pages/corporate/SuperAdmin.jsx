// ══════════════════════════════════════════════════════════════════════════════
// SuperAdmin.jsx
// ══════════════════════════════════════════════════════════════════════════════
import { useState } from 'react'
import { Zap, Plus, Building2, Users, CreditCard, TrendingUp, Search, Edit2, Eye, Power, ChevronDown } from 'lucide-react'
import { Badge, Modal, SectionHeader, PlanBadge, Avatar, SearchInput } from '../../admin-shared/components/ui'
import { useAuthStore, useUIStore } from '../../admin-shared/store'

const ORGS = [
  { id: 1, name: 'Infosys Limited', display: 'Infosys', plan: 'enterprise', seats: 500, seatsUsed: 347, status: 'active', renewal: 'Jan 1, 2027', industry: 'IT/Software', admin: 'admin@infosys.com', revenue: '₹1,59,300', colour: '#007CC3' },
  { id: 2, name: 'Wipro Technologies', display: 'Wipro', plan: 'growth', seats: 200, seatsUsed: 156, status: 'active', renewal: 'Mar 15, 2027', industry: 'IT/Software', admin: 'hr@wipro.com', revenue: '₹55,200', colour: '#221F63' },
  { id: 3, name: 'Apollo Hospitals', display: 'Apollo', plan: 'enterprise', seats: 300, seatsUsed: 189, status: 'active', renewal: 'Jun 1, 2027', industry: 'Healthcare', admin: 'wellness@apollo.com', revenue: '₹95,400', colour: '#00529B' },
  { id: 4, name: 'HDFC Bank', display: 'HDFC', plan: 'growth', seats: 150, seatsUsed: 82, status: 'trial', renewal: 'Apr 1, 2026', industry: 'BFSI', admin: 'hr@hdfcbank.com', revenue: 'Trial', colour: '#004C8F' },
  { id: 5, name: 'Sun Pharma', display: 'Sun Pharma', plan: 'starter', seats: 50, seatsUsed: 38, status: 'active', renewal: 'Aug 30, 2026', industry: 'Pharma', admin: 'admin@sunpharma.com', revenue: '₹14,160', colour: '#FF6600' },
  { id: 6, name: 'Mahindra Group', display: 'Mahindra', plan: 'enterprise', seats: 400, seatsUsed: 212, status: 'suspended', renewal: 'Dec 31, 2025', industry: 'Manufacturing', admin: 'hr@mahindra.com', revenue: 'Suspended', colour: '#E03A00' },
]

function CreateOrgModal({ open, onClose }) {
  const { toast } = useUIStore()
  const [form, setForm] = useState({ name: '', displayName: '', slug: '', plan: 'growth', seats: 100, adminName: '', adminEmail: '', adminMobile: '', brandColor: '#3B7BF8' })

  return (
    <Modal open={open} onClose={onClose} title="Create Organisation" maxWidth="max-w-2xl"
      footer={<>
        <button className="btn-secondary btn" onClick={onClose}>Cancel</button>
        <button className="btn-primary btn gap-2" onClick={() => { toast('Organisation created! Welcome email sent to admin.', 'success'); onClose() }}>
          <Zap size={14} /> Provision Organisation
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

  if (!admin?.isSuperAdmin) return (
    <div className="flex items-center justify-center h-96 flex-col gap-4">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center"><Zap size={28} className="text-amber-600" /></div>
      <h2 className="font-display text-xl text-slate-800">Super Admin Access Required</h2>
      <p className="text-sm text-slate-500">This section is restricted to gruentzig.ai platform administrators.</p>
    </div>
  )

  const filtered = ORGS.filter(o => {
    if (search && !o.name.toLowerCase().includes(search.toLowerCase()) && !o.display.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    return true
  })

  const totalRevenue = ORGS.filter(o => o.status === 'active').reduce((sum, o) => sum + (parseFloat(o.revenue.replace(/[₹,]/g, '')) || 0), 0)

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
              { label: 'Total Organisations', value: 6, icon: '🏢', color: 'text-blue-600' },
              { label: 'Active Organisations', value: 4, icon: '✅', color: 'text-emerald-600' },
              { label: 'Total Staff Enrolled', value: '1,024', icon: '👥', color: 'text-purple-600' },
              { label: 'Est. Annual Revenue', value: `₹${Math.round(totalRevenue / 1000)}k+`, icon: '💰', color: 'text-amber-600' },
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
                  <th>Industry</th>
                  <th>Revenue</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: o.colour }}>
                          {o.display[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-sm">{o.display}</div>
                          <div className="text-xs text-slate-400">{o.admin}</div>
                        </div>
                      </div>
                    </td>
                    <td><PlanBadge plan={o.plan} /></td>
                    <td>
                      <div className="text-xs mb-1">{o.seatsUsed}/{o.seats} <span className="text-slate-400">({Math.round((o.seatsUsed / o.seats) * 100)}%)</span></div>
                      <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${(o.seatsUsed / o.seats) * 100}%` }} />
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${o.status === 'active' ? 'badge-green' : o.status === 'trial' ? 'badge-orange' : 'badge-red'}`}>{o.status}</span>
                    </td>
                    <td className="text-xs text-slate-500">{o.renewal}</td>
                    <td className="text-xs text-slate-600">{o.industry}</td>
                    <td className="text-sm font-semibold text-slate-800">{o.revenue}</td>
                    <td>
                      <div className="flex gap-1">
                        <button onClick={() => toast(`Viewing ${o.display}`, 'info')} className="btn btn-sm btn-ghost btn-icon" title="View">
                          <Eye size={13} />
                        </button>
                        <button onClick={() => toast(`Editing ${o.display}`, 'info')} className="btn btn-sm btn-ghost btn-icon" title="Edit">
                          <Edit2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
              <div className="font-display text-3xl text-blue-600">45.2k</div>
              <div className="text-xs text-slate-500 mt-0.5">Total Registered Consumers</div>
            </div>
            <div className="card p-5">
              <div className="text-2xl mb-2">🔥</div>
              <div className="font-display text-3xl text-emerald-600">12.5k</div>
              <div className="text-xs text-slate-500 mt-0.5">Active App Subscriptions</div>
            </div>
            <div className="card p-5">
              <div className="text-2xl mb-2">🏃</div>
              <div className="font-display text-3xl text-purple-600">8.1k</div>
              <div className="text-xs text-slate-500 mt-0.5">Daily Active Users</div>
            </div>
            <div className="card p-5">
              <div className="text-2xl mb-2">💳</div>
              <div className="font-display text-3xl text-amber-600">₹8.5L+</div>
              <div className="text-xs text-slate-500 mt-0.5">B2C MRR</div>
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

      <CreateOrgModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div >
  )
}
