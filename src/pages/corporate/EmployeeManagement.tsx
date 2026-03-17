import { useState } from 'react'
import { Users, UserPlus, Download, Upload, Filter, ChevronDown, Mail, Trash2, Building2, MapPin, Smartphone, CheckCircle, X, Copy, QrCode, RefreshCw } from 'lucide-react'
import { SearchInput, WellnessBadge, Avatar, Modal, Badge, EmptyState, SectionHeader, Tabs } from '../../admin-shared/components/ui'
import { useUIStore } from '../../admin-shared/store'
import api from '../../admin-shared/services/api'
import { useEffect } from 'react'

const MOCK_STAFF = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma0@infosys.com', empId: 'EMP1000', dept: 'Engineering', location: 'Hyderabad HQ', linkedAt: '2026-01-10', programmes: 3, sessions: 42, status: 'active', devices: ['apple_watch'], lastActive: '1h ago', profilePct: 95 },
  { id: 2, name: 'Priya Patel', email: 'priya.patel1@infosys.com', empId: 'EMP1001', dept: 'Human Resources', location: 'Hyderabad HQ', linkedAt: '2026-01-12', programmes: 2, sessions: 38, status: 'active', devices: [], lastActive: '3h ago', profilePct: 88 },
  { id: 3, name: 'Rohit Kumar', email: 'rohit.kumar2@infosys.com', empId: 'EMP1002', dept: 'Finance', location: 'Hyderabad HQ', linkedAt: '2026-01-15', programmes: 1, sessions: 35, status: 'engaged', devices: ['bp_monitor'], lastActive: '2d ago', profilePct: 72 },
  { id: 4, name: 'Sneha Singh', email: 'sneha.singh3@infosys.com', empId: 'EMP1003', dept: 'Sales & Marketing', location: 'Mumbai', linkedAt: '2026-01-18', programmes: 2, sessions: 29, status: 'engaged', devices: ['fitbit'], lastActive: '5d ago', profilePct: 80 },
  { id: 5, name: 'Arjun Reddy', email: 'arjun.reddy4@infosys.com', empId: 'EMP1004', dept: 'Engineering', location: 'Hyderabad HQ', linkedAt: '2026-01-20', programmes: 0, sessions: 0, status: 'drifting', devices: [], lastActive: '18d ago', profilePct: 45 },
  { id: 6, name: 'Meera Nair', email: 'meera.nair5@infosys.com', empId: 'EMP1005', dept: 'Operations', location: 'Pune', linkedAt: '2026-01-22', programmes: 1, sessions: 12, status: 'drifting', devices: [], lastActive: '20d ago', profilePct: 62 },
  { id: 7, name: 'Kiran Iyer', email: 'kiran.iyer6@infosys.com', empId: 'EMP1006', dept: 'Product', location: 'Bangalore', linkedAt: '2026-01-25', programmes: 0, sessions: 0, status: 'inactive', devices: [], lastActive: '38d ago', profilePct: 30 },
  { id: 8, name: 'Divya Gupta', email: 'divya.gupta7@infosys.com', empId: 'EMP1007', dept: 'Finance', location: 'Hyderabad HQ', linkedAt: '2026-01-28', programmes: 1, sessions: 8, status: 'inactive', devices: [], lastActive: '42d ago', profilePct: 55 },
  { id: 9, name: 'Vikram Verma', email: 'vikram.verma8@infosys.com', empId: 'EMP1008', dept: 'Engineering', location: 'Hyderabad HQ', linkedAt: '2026-02-01', programmes: 2, sessions: 25, status: 'active', devices: ['google_fit'], lastActive: '1d ago', profilePct: 78 },
  { id: 10, name: 'Ananya Menon', email: 'ananya.menon9@infosys.com', empId: 'EMP1009', dept: 'HR', location: 'Hyderabad HQ', linkedAt: '2026-02-03', programmes: 3, sessions: 33, status: 'active', devices: ['apple_watch', 'bp_monitor'], lastActive: '6h ago', profilePct: 92 },
]

const DEPTS = ['All Departments', 'Engineering', 'Finance', 'Human Resources', 'Sales & Marketing', 'Operations', 'Product']
const STATUSES = ['All Status', 'active', 'engaged', 'drifting', 'inactive']

function StaffProfileModal({ staff, open, onClose }) {
  if (!staff) return null
  const deviceLabel = { apple_watch: 'Apple Watch', fitbit: 'Fitbit', bp_monitor: 'BP Monitor', google_fit: 'Google Fit', cgm: 'CGM' }
  return (
    <Modal open={open} onClose={onClose} title="Staff Profile" maxWidth="max-w-xl">
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <Avatar name={staff.name} size="xl" />
          <div>
            <h3 className="font-semibold text-lg text-slate-900">{staff.name}</h3>
            <p className="text-sm text-slate-500">{staff.empId} · {staff.dept}</p>
            <WellnessBadge status={staff.status} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Email', value: staff.email },
            { label: 'Location', value: staff.location },
            { label: 'Joined', value: new Date(staff.linkedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
            { label: 'Last Active', value: staff.lastActive },
            { label: 'Programmes Enrolled', value: staff.programmes },
            { label: 'Sessions Completed', value: staff.sessions },
          ].map(f => (
            <div key={f.label} className="bg-slate-50 rounded-xl p-3">
              <div className="text-xs text-slate-500 mb-0.5">{f.label}</div>
              <div className="text-sm font-semibold text-slate-800">{f.value}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Profile Completeness</div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${staff.profilePct}%` }} />
            </div>
            <span className="text-sm font-semibold text-slate-700">{staff.profilePct}%</span>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Connected Devices</div>
          {staff.devices.length ? (
            <div className="flex flex-wrap gap-2">
              {staff.devices.map(d => <Badge key={d} color="blue">{deviceLabel[d] || d}</Badge>)}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No devices connected</p>
          )}
        </div>
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
          ⚠️ Individual health scores and vital readings are not visible in the corporate portal to protect employee privacy.
        </div>
      </div>
    </Modal>
  )
}

function InviteModal({ open, onClose, onAdded }: any) {
  const [tab, setTab] = useState('individual')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [dept, setDept] = useState('')
  const [bulkText, setBulkText] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useUIStore()
  const inviteCode = 'INFY2026'

  const send = async () => {
    if (tab === 'individual') {
      if (!email || !name) return toast('Name and Email required', 'error');
      try {
        setLoading(true);
        const res = await api.post('/staff', { name, email, department: dept || 'Unassigned' });
        if (res.success) {
          toast(`Added ${name} successfully! Temp password: ${res.credentials.tempPassword}`, 'success')
          setEmail('');
          setName('');
          setDept('');
          if (onAdded) onAdded();
          onClose();
        }
      } catch (err: any) {
        toast(err.message || 'Failed to add staff', 'error');
      } finally {
        setLoading(false);
      }
    } else {
      toast('Invite sent successfully!', 'success')
      setEmail(''); onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Invite Staff Members" maxWidth="max-w-lg"
      footer={<>
        <button className="btn-secondary btn" onClick={onClose} disabled={loading}>Cancel</button>
        <button className="btn-primary btn" onClick={send} disabled={loading}>{loading ? 'Sending...' : 'Send Invites'}</button>
      </>}>
      <div className="space-y-5">
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {['individual', 'bulk', 'code'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${tab === t ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              {t === 'code' ? 'Invite Code' : t === 'bulk' ? 'Bulk Upload' : 'Individual'}
            </button>
          ))}
        </div>

        {tab === 'individual' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Employee Name</label>
              <input className="input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Employee Email</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="employee@organisation.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department (Optional)</label>
              <input className="input" type="text" value={dept} onChange={e => setDept(e.target.value)} placeholder="Engineering" />
            </div>
          </div>
        )}

        {tab === 'bulk' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Paste Email Addresses</label>
              <textarea className="input font-mono text-xs" rows={6} value={bulkText} onChange={e => setBulkText(e.target.value)}
                placeholder="employee1@infosys.com&#10;employee2@infosys.com&#10;employee3@infosys.com" />
              <p className="text-xs text-slate-400 mt-1">{bulkText.split('\n').filter(e => e.trim()).length} emails detected</p>
            </div>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all">
              <Upload size={20} className="mx-auto text-slate-400 mb-2" />
              <p className="text-sm text-slate-600 font-medium">Drop CSV file here</p>
              <p className="text-xs text-slate-400 mt-1">or click to browse · Name, Email columns required</p>
            </div>
          </div>
        )}

        {tab === 'code' && (
          <div className="space-y-4">
            <div className="bg-slate-950 rounded-2xl p-6 text-center">
              <p className="text-slate-400 text-xs mb-3 uppercase tracking-wider">Corporate Invite Code</p>
              <p className="font-mono text-4xl font-bold tracking-[0.3em] text-white mb-4">{inviteCode}</p>
              <div className="flex gap-2 justify-center">
                <button onClick={() => { navigator.clipboard.writeText(inviteCode); toast('Copied!', 'success') }}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                  <Copy size={14} /> Copy Code
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                  <QrCode size={14} /> Download QR
                </button>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
              Share this code with employees. They enter it during PreventalVital app onboarding to link to <strong>Infosys</strong>'s wellness programme.
            </div>
            <button className="btn-secondary btn w-full justify-center text-sm gap-2">
              <RefreshCw size={14} /> Regenerate Code
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

function AssignDeptModal({ open, onClose, onAssign, departments }: any) {
  const [selectedDept, setSelectedDept] = useState('')
  return (
    <Modal open={open} onClose={onClose} title="Assign Department" maxWidth="max-w-md"
      footer={<>
        <button className="btn-secondary btn" onClick={onClose}>Cancel</button>
        <button className="btn-primary btn" onClick={() => { onAssign(selectedDept); onClose(); }} disabled={!selectedDept}>Assign</button>
      </>}>
      <div className="space-y-4">
        <p className="text-sm text-slate-500">Select a department to assign to the selected staff members.</p>
        <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)} className="input w-full">
          <option value="">Select Department</option>
          {departments.filter((d: string) => d !== 'All Departments').map((d: string) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
    </Modal>
  )
}

export default function StaffPage() {
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All Departments')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [selected, setSelected] = useState<string[]>([])
  const [profileStaff, setProfileStaff] = useState(null)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [deptModalOpen, setDeptModalOpen] = useState(false)
  const [tab, setTab] = useState('all')
  const { toast } = useUIStore()

  const [staffList, setStaffList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchStaff = async () => {
    try {
      const res = await api.get('/staff?limit=100');
      if (res.success) {
        setStaffList(res.staff || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStaff();
  }, [])

  const filtered = staffList.filter(s => {
    const name = s.name || s.profile?.firstName + ' ' + s.profile?.lastName;
    if (search && !name?.toLowerCase().includes(search.toLowerCase()) && !s.email?.toLowerCase().includes(search.toLowerCase()) && !s?.employeeId?.toLowerCase().includes(search.toLowerCase())) return false
    if (dept !== 'All Departments' && s.department !== dept) return false
    const sStatus = s.engagementData?.wellnessStatus || s.status;
    if (statusFilter !== 'All Status' && sStatus !== statusFilter) return false
    if (tab === 'active' && !['active', 'engaged'].includes(sStatus)) return false
    if (tab === 'attention' && !['drifting', 'inactive'].includes(sStatus)) return false
    return true
  })

  const toggleSelect = (userId: string) => setSelected(prev => prev.includes(userId) ? prev.filter(x => x !== userId) : [...prev, userId])
  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(s => s.userId))

  const handleNudge = async (userId: string) => {
    try {
      const res = await api.post('/staff/nudge', { userIds: [userId] });
      if (res.success) toast('Nudge sent successfully', 'success');
    } catch (err: any) {
      toast(err.message || 'Failed to send nudge', 'error');
    }
  }

  const handleBulkNudge = async () => {
    try {
      const res = await api.post('/staff/nudge', { userIds: selected });
      if (res.success) {
        toast(`Nudge sent to ${selected.length} staff`, 'success');
        setSelected([]);
      }
    } catch (err: any) {
      toast(err.message || 'Failed to send nudges', 'error');
    }
  }

  const handleBulkDelink = async () => {
    if (!window.confirm(`Are you sure you want to delink ${selected.length} staff members?`)) return;
    try {
      const res = await api.post('/staff/bulk-delink', { userIds: selected });
      if (res.success) {
        toast(`${selected.length} staff members delinked`, 'success');
        setSelected([]);
        fetchStaff();
      }
    } catch (err: any) {
      toast(err.message || 'Failed to delink staff', 'error');
    }
  }

  const handleBulkAssignDept = async (department: string) => {
    try {
      const res = await api.post('/staff/bulk-assign-dept', { userIds: selected, department });
      if (res.success) {
        toast(`Assigned ${department} to ${selected.length} staff`, 'success');
        setSelected([]);
        fetchStaff();
      }
    } catch (err: any) {
      toast(err.message || 'Failed to assign department', 'error');
    }
  }

  const deviceLabel = { apple_watch: '🍎', fitbit: '⌚', bp_monitor: '🩺', google_fit: '📱', cgm: '💉' }

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Staff Management"
        description="Manage enrolled employees and track engagement"
        action={
          <div className="flex gap-2">
            <button className="btn-secondary btn gap-2 text-sm" onClick={() => toast('Export started', 'success')}>
              <Download size={15} /> Export
            </button>
            <button className="btn-primary btn gap-2 text-sm" onClick={() => setInviteOpen(true)}>
              <UserPlus size={15} /> Invite Staff
            </button>
          </div>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Enrolled', value: staffList.length, color: 'text-blue-600' },
          { label: 'Active This Week', value: staffList.filter(s => ['active', 'engaged'].includes(s.engagementData?.wellnessStatus || s.status)).length, color: 'text-emerald-600' },
          { label: 'Need Attention', value: staffList.filter(s => ['drifting', 'inactive', 'not_started'].includes(s.engagementData?.wellnessStatus)).length, color: 'text-orange-500' },
          { label: 'Seats Available', value: '—', color: 'text-slate-600' },
        ].map((s, i) => (
          <div key={i} className="card p-4">
            <div className={`font-display text-2xl ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs + Filters */}
      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <Tabs
            active={tab} onChange={setTab}
            tabs={[
              { id: 'all', label: 'All Staff', count: staffList.length },
              { id: 'active', label: 'Active', count: staffList.filter(s => ['active', 'engaged'].includes(s.engagementData?.wellnessStatus || s.status)).length },
              { id: 'attention', label: 'Need Attention', count: staffList.filter(s => ['drifting', 'inactive', 'not_started'].includes(s.engagementData?.wellnessStatus)).length },
            ]}
          />
          <div className="flex items-center gap-2">
            <SearchInput value={search} onChange={setSearch} placeholder="Search by name, email, ID..." className="w-64" />
            <select value={dept} onChange={e => setDept(e.target.value)} className="input w-auto text-sm">
              {DEPTS.map(d => <option key={d}>{d}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input w-auto text-sm capitalize">
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Bulk actions */}
        {selected.length > 0 && (
          <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl animate-fade-in">
            <span className="text-sm font-semibold text-blue-700">{selected.length} selected</span>
            <div className="flex gap-2 ml-auto">
              <button className="btn btn-sm btn-secondary gap-1.5" onClick={handleBulkNudge}>
                <Mail size={12} /> Send Nudge
              </button>
              <button className="btn btn-sm btn-secondary gap-1.5" onClick={() => setDeptModalOpen(true)}>
                <Building2 size={12} /> Assign Dept
              </button>
              <button className="btn btn-sm btn-danger gap-1.5" onClick={handleBulkDelink}>
                <Trash2 size={12} /> Delink
              </button>
              <button onClick={() => setSelected([])} className="btn btn-sm btn-ghost">
                <X size={12} />
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-10">
                  <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll} className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer" />
                </th>
                <th>Employee</th>
                <th>Department</th>
                <th>Wellness Status</th>
                <th>Programmes</th>
                <th>Devices</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="py-16 text-center text-slate-400 text-sm">No staff found matching your filters</td></tr>
              ) : filtered.map(s => (
                <tr key={s.userId} className={selected.includes(s.userId) ? 'bg-blue-50' : ''}>
                  <td>
                    <input type="checkbox" checked={selected.includes(s.userId)} onChange={() => toggleSelect(s.userId)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer" />
                  </td>
                  <td>
                    <button className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity" onClick={() => setProfileStaff(s)}>
                      <Avatar name={s.name} size="sm" />
                      <div>
                        <div className="font-semibold text-slate-800 text-sm hover:text-blue-600">{s.name}</div>
                        <div className="text-xs text-slate-400">{s.employeeId || 'N/A'} · {s.email}</div>
                      </div>
                    </button>
                  </td>
                  <td>
                    <div className="text-sm text-slate-700">{s.department || 'Unassigned'}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={10} />{s.location || 'Remote'}</div>
                  </td>
                  <td><WellnessBadge status={s.engagementData?.wellnessStatus || s.status} /></td>
                  <td>
                    <span className="font-semibold text-slate-800">{s.engagementData?.programmesEnrolled || 0}</span>
                    <span className="text-slate-400 text-xs"> enrolled</span>
                  </td>
                  <td>
                    <div className="flex gap-1 flex-wrap">
                      {s.devices?.length ? s.devices.map((d: any) => (
                        // @ts-ignore
                        <span key={d} title={d} className="text-base">{deviceLabel[d] || '📱'}</span>
                      )) : <span className="text-slate-300 text-xs">—</span>}
                    </div>
                  </td>
                  <td className="text-xs text-slate-500">{s.lastActive || 'Never'}</td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => setProfileStaff(s)} className="btn btn-sm btn-ghost text-xs">View</button>
                      <button onClick={() => handleNudge(s.userId)} className="btn btn-sm btn-ghost text-xs text-blue-600">Nudge</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">Showing {filtered.length} of {staffList.length} staff members</p>
          <div className="flex gap-1">
            {[1, 2, 3, '...', 12].map((p, i) => (
              <button key={i} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === 1 ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      <StaffProfileModal staff={profileStaff} open={!!profileStaff} onClose={() => setProfileStaff(null)} />
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} onAdded={fetchStaff} />
      <AssignDeptModal open={deptModalOpen} onClose={() => setDeptModalOpen(false)} onAssign={handleBulkAssignDept} departments={DEPTS} />
    </div >
  )
}
