import { useState, useEffect } from 'react'
import axios from 'axios'
import { CreditCard, Download, CheckCircle, TrendingUp, Calendar, Plus, RefreshCw, AlertCircle, Zap } from 'lucide-react'
import { Badge, Modal, SectionHeader, PlanBadge, Tabs } from '../../admin-shared/components/ui'
import { useAuthStore, useUIStore } from '../../admin-shared/store'

const INVOICES = [
  { id: 1, num: 'INV-2026-002', date: '2026-03-01', period: 'Mar 2026', desc: '50 Additional Seats', subtotal: 10000, gst: 1800, total: 11800, status: 'paid', method: 'UPI', ref: 'UPI20260301' },
  { id: 2, num: 'INV-2026-001', date: '2026-01-05', period: 'Jan 2026 – Dec 2026', desc: 'Enterprise Plan + 500 Seats', subtotal: 135000, gst: 24300, total: 159300, status: 'paid', method: 'NEFT', ref: 'NEFT20260101' },
  { id: 3, num: 'INV-2025-003', date: '2025-01-10', period: 'Jan 2025 – Dec 2025', desc: 'Growth Plan + 300 Seats', subtotal: 75000, gst: 13500, total: 88500, status: 'paid', method: 'Card', ref: 'PAY202500103' },
]

// Fallback plans if API fails
const FALLBACK_PLANS = [
  { id: 'starter', name: 'Starter', monthlyPrice: 5000, price: 5000, seats: 'Up to 50', features: ['2 programmes', 'Basic analytics', 'Email support', 'Enrolment reports'], color: '#6b7280' },
  { id: 'growth', name: 'Growth', monthlyPrice: 15000, price: 15000, seats: 'Up to 200', features: ['5 programmes', 'Advanced analytics', 'VITA AI chatbot', 'Custom campaigns', 'Priority support'], color: '#3b82f6', popular: true },
  { id: 'enterprise', name: 'Enterprise', monthlyPrice: 35000, price: 35000, seats: 'Unlimited', features: ['All programmes', 'Full analytics suite', 'Complete AI features', 'SSO integration', 'HRMS connectors', 'Dedicated account manager', 'Custom programmes'], color: '#7c3aed' },
]

function UpgradeModal({ open, onClose, plans }) {
  const [selected, setSelected] = useState('enterprise')
  const [seats, setSeats] = useState(500)
  const { toast } = useUIStore()

  const currentPlans = plans.length > 0 ? plans : FALLBACK_PLANS
  const plan = currentPlans.find(p => p.id === selected) || currentPlans[0]

  const seatCost = seats * 200
  const subtotal = (plan?.monthlyPrice || plan?.price || 0) + seatCost
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  return (
    <Modal open={open} onClose={onClose} title="Upgrade Plan" maxWidth="max-w-2xl"
      footer={<>
        <button className="btn-secondary btn" onClick={onClose}>Cancel</button>
        <button className="btn-primary btn gap-2" onClick={() => { toast('Redirecting to payment gateway...', 'success'); onClose() }}>
          <CreditCard size={14} /> Proceed to Payment ₹{total.toLocaleString('en-IN')}
        </button>
      </>}>
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          {currentPlans.map(p => (
            <button key={p.id} onClick={() => setSelected(p.id)}
              className={`relative p-4 rounded-xl border-2 text-left transition-all ${selected === p.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
              {p.popular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">Popular</span>}
              <div className="font-bold text-slate-800 text-sm mb-0.5">{p.name}</div>
              <div className="text-xl font-display font-bold" style={{ color: p.color || '#3b82f6' }}>₹{((p.monthlyPrice || p.price) / 1000).toFixed(0)}k<span className="text-xs font-normal text-slate-500">/mo</span></div>
              <div className="text-xs text-slate-500 mt-1">{p.seats || 'Custom'} seats</div>
            </button>
          ))}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Seats: <span className="text-blue-600">{seats}</span></label>
          <input type="range" min={10} max={1000} step={10} value={seats} onChange={e => setSeats(+e.target.value)} className="w-full accent-blue-600" />
          <div className="flex justify-between text-xs text-slate-400 mt-1"><span>10</span><span>500</span><span>1000</span></div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Invoice Preview</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">{plan?.name} Plan — Annual</span><span>₹{plan?.price.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">{seats} Seats × ₹200</span><span>₹{seatCost.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">GST (18%)</span><span>₹{gst.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-200">
              <span>Total Due</span><span className="text-blue-600">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default function BillingPage() {
  const { org } = useAuthStore()
  const [tab, setTab] = useState('overview')
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [plans, setPlans] = useState([])
  const { toast } = useUIStore()

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get('/api/public/config/pricing-plans')
        if (res.data?.data?.config?.value?.b2b) {
          setPlans(res.data.data.config.value.b2b)
        }
      } catch (err) {
        console.error('Failed to fetch corporate plans:', err)
      }
    }
    fetchPlans()
  }, [])

  const daysToRenewal = 305
  const seatUsage = Math.round(((org?.seatsUsed || 347) / (org?.seats || 500)) * 100)

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Billing & Subscription"
        description="Manage your plan, seats, and payment history"
        action={
          <button className="btn-primary btn gap-2 text-sm" onClick={() => setUpgradeOpen(true)}>
            <Zap size={15} /> Upgrade / Add Seats
          </button>
        }
      />

      <Tabs active={tab} onChange={setTab} tabs={[
        { id: 'overview', label: 'Overview' },
        { id: 'invoices', label: 'Invoices', count: INVOICES.length },
        { id: 'payment', label: 'Payment Methods' },
      ]} />

      {tab === 'overview' && (
        <div className="space-y-5">
          {/* Plan summary */}
          <div className="card p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <PlanBadge plan={org?.plan || 'enterprise'} />
                  <span className="badge badge-green">Active</span>
                </div>
                <h2 className="font-display text-3xl text-white">{org?.plan?.toUpperCase() || 'ENTERPRISE'} Plan</h2>
                <p className="text-slate-400 text-sm mt-1">Annual contract · Auto-renewal enabled</p>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl text-white">₹{(org?.billingAmount || 159300).toLocaleString('en-IN')}</div>
                <div className="text-slate-400 text-sm">per year (incl. GST)</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-slate-400 text-xs mb-1">Seat Usage</div>
                <div className="font-semibold text-white mb-1">{org?.seatsUsed || 347} / {org?.seats || 500}</div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-blue-400 transition-all" style={{ width: `${seatUsage}%` }} />
                </div>
                <div className="text-xs text-slate-400 mt-1">{(org?.seats || 500) - (org?.seatsUsed || 347)} seats available</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Renewal Date</div>
                <div className="font-semibold text-white">Jan 1, 2027</div>
                <div className="text-slate-400 text-xs mt-1">{daysToRenewal} days remaining</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Contract Period</div>
                <div className="font-semibold text-white">Jan 2026 – Jan 2027</div>
                <div className="text-slate-400 text-xs mt-1">Annual contract</div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Plus, label: 'Add Seats', desc: 'Add more seat capacity', onClick: () => setUpgradeOpen(true), color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: RefreshCw, label: 'Auto-Renew', desc: 'Currently enabled', onClick: () => toast('Auto-renewal updated', 'success'), color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: Download, label: 'Download Invoice', desc: 'Latest: INV-2026-001', onClick: () => toast('Invoice downloaded', 'success'), color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map(a => (
              <button key={a.label} onClick={a.onClick} className="card p-5 text-left hover:shadow-card-hover transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.bg} mb-3 group-hover:scale-105 transition-transform`}>
                  <a.icon size={18} className={a.color} />
                </div>
                <div className="font-semibold text-slate-800 text-sm">{a.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{a.desc}</div>
              </button>
            ))}
          </div>

          {/* Feature list */}
          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Included in Your Plan</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'All 8 wellness programmes', 'Unlimited staff seats', 'Full analytics suite',
                'VITA AI assistant', 'Wearable device sync', 'PDF report generation',
                'Bulk staff import', 'SSO (SAML 2.0)', 'HRMS integrations (Darwinbox, Keka)',
                'Custom programme requests', 'Dedicated account manager', 'Priority support (2hr SLA)',
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'invoices' && (
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Invoice History</h3>
            <button onClick={() => toast('Bulk export started', 'success')} className="btn-secondary btn btn-sm gap-1.5">
              <Download size={13} /> Export All
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Period</th>
                <th>Description</th>
                <th>Subtotal</th>
                <th>GST (18%)</th>
                <th>Total</th>
                <th>Status</th>
                <th>Method</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map(inv => (
                <tr key={inv.id}>
                  <td>
                    <div className="font-mono text-xs text-blue-600 font-semibold">{inv.num}</div>
                    <div className="text-xs text-slate-400">{new Date(inv.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </td>
                  <td className="text-xs text-slate-600">{inv.period}</td>
                  <td className="text-sm text-slate-700 max-w-48 truncate">{inv.desc}</td>
                  <td className="font-mono text-sm">₹{inv.subtotal.toLocaleString('en-IN')}</td>
                  <td className="font-mono text-sm text-slate-500">₹{inv.gst.toLocaleString('en-IN')}</td>
                  <td className="font-mono text-sm font-semibold">₹{inv.total.toLocaleString('en-IN')}</td>
                  <td><span className="badge badge-green"><CheckCircle size={10} /> Paid</span></td>
                  <td className="text-xs text-slate-500">{inv.method}</td>
                  <td>
                    <button onClick={() => toast('Invoice downloaded', 'success')} className="btn btn-sm btn-ghost text-xs gap-1">
                      <Download size={12} /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'payment' && (
        <div className="space-y-5">
          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-5">Saved Payment Methods</h3>
            <div className="space-y-3">
              {[
                { type: 'NEFT/Bank Transfer', last4: 'HDFC Bank A/c ending 4821', default: true, icon: '🏦' },
                { type: 'Credit Card', last4: 'Visa ending 4242', default: false, icon: '💳' },
              ].map(m => (
                <div key={m.last4} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                  <span className="text-2xl">{m.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-800">{m.type}</div>
                    <div className="text-xs text-slate-500">{m.last4}</div>
                  </div>
                  {m.default && <span className="badge badge-green">Default</span>}
                  <button className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
                </div>
              ))}
              <button className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all w-full text-sm text-slate-500 hover:text-blue-600">
                <Plus size={16} /> Add Payment Method
              </button>
            </div>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">Enterprise clients can pay via NEFT/RTGS with 15-day payment terms. Contact your account manager to set up purchase order based billing.</p>
          </div>
        </div>
      )}

      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} plans={plans} />
    </div>
  )
}
