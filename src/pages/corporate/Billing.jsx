import { useState, useEffect } from 'react'
import axios from 'axios'
import { CreditCard, Download, CheckCircle, TrendingUp, Calendar, Plus, RefreshCw, AlertCircle, Zap } from 'lucide-react'
import { Badge, Modal, SectionHeader, PlanBadge, Tabs } from '../../admin-shared/components/ui'
import { useAuthStore, useUIStore } from '../../admin-shared/store'

// Fallback plans if API fails
const FALLBACK_PLANS = [
  { id: 'standard', name: 'Standard', monthlyPrice: 25000, price: 25000, seats: 50, features: ['Up to 50 employees', '2 programmes', 'Standard reports'], color: '#6b7280' },
  { id: 'growth', name: 'Growth', monthlyPrice: 75000, price: 75000, seats: 250, features: ['Up to 250 employees', '5 programmes', 'Advanced analytics', 'VITA AI assistant'], color: '#3b82f6', popular: true },
  { id: 'premium', name: 'Premium', monthlyPrice: 125000, price: 125000, seats: 350, features: ['Up to 350 employees', 'All programmes', 'Priority support', 'Vita AI'], color: '#7c3aed' },
  { id: 'enterprise', name: 'Enterprise', monthlyPrice: 200000, price: 200000, seats: 500, features: ['Custom requirements', 'Dedicated account manager', 'SSO & HRMS', 'Unlimited programmes'], color: '#1e293b' },
]



export default function BillingPage() {
  const { org, setOrg } = useAuthStore()
  const [tab, setTab] = useState('overview')
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const [plans, setPlans] = useState([])
  const [invoices, setInvoices] = useState([])
  const [billingData, setBillingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useUIStore()

  const fetchBillingData = async () => {
    try {
      setLoading(true)
      const [resOverview, resInvoices, resPlans] = await Promise.all([
        axios.get('/api/corporate/billing/overview'),
        axios.get('/api/corporate/billing/invoices'),
        axios.get('/api/public/config/pricing-plans')
      ])

      if (resOverview.data.success) {
        setBillingData(resOverview.data)
      }
      if (resInvoices.data.success) {
        setInvoices(resInvoices.data.invoices || [])
      }
      if (resPlans.data?.data?.config?.value?.b2b) {
        setPlans(resPlans.data.data.config.value.b2b)
      }
    } catch (err) {
      console.error('Failed to fetch billing data:', err)
      toast('Failed to load billing information', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBillingData()
  }, [])

  const handleUpgrade = async (planId, seats) => {
    try {
      const res = await axios.post('/api/corporate/billing/upgrade', { plan: planId, seats })
      if (res.data.success) {
        toast(`Successfully upgraded to ${planId}!`, 'success')
        if (res.data.org) setOrg(res.data.org)
        fetchBillingData()
        setUpgradeOpen(false)
      }
    } catch (err) {
      toast(err.response?.data?.message || 'Upgrade failed', 'error')
    }
  }

  if (loading) return <div className="p-12 text-center text-slate-400 animate-pulse font-medium">Loading billing information...</div>

  const subscription = billingData?.subscription || org
  const daysToRenewal = subscription?.contractEnd ? Math.max(0, Math.ceil((new Date(subscription.contractEnd) - new Date()) / (1000 * 3600 * 24))) : 0
  const seatUsage = Math.round(((subscription?.seatsUsed || 0) / (subscription?.seats || 1)) * 100)

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
        { id: 'invoices', label: 'Invoices', count: invoices.length },
        { id: 'payment', label: 'Payment Methods' },
      ]} />

      {tab === 'overview' && (
        <div className="space-y-5">
          {/* Plan summary */}
          <div className="card p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <PlanBadge plan={subscription?.plan || 'trial'} />
                  <span className={`badge ${subscription?.status === 'active' ? 'badge-green' : 'badge-amber'}`}>
                    {subscription?.status?.toUpperCase() || 'TRIAL'}
                  </span>
                </div>
                <h2 className="font-display text-3xl text-white">{subscription?.plan?.toUpperCase() || 'FREE'} Plan</h2>
                <p className="text-slate-400 text-sm mt-1">
                  {subscription?.autoRenew ? 'Annual contract · Auto-renewal enabled' : 'Contract expires on ' + new Date(subscription?.contractEnd).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl text-white">₹{(billingData?.totalPaid || 0).toLocaleString('en-IN')}</div>
                <div className="text-slate-400 text-sm">total investment (incl. GST)</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-slate-400 text-xs mb-1">Seat Usage</div>
                <div className="font-semibold text-white mb-1">{subscription?.seatsUsed || 0} / {subscription?.seats || 0}</div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-blue-400 transition-all" style={{ width: `${Math.min(100, seatUsage)}%` }} />
                </div>
                <div className="text-xs text-slate-400 mt-1">{Math.max(0, (subscription?.seats || 0) - (subscription?.seatsUsed || 0))} seats available</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Renewal Date</div>
                <div className="font-semibold text-white">{subscription?.contractEnd ? new Date(subscription.contractEnd).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}</div>
                <div className="text-slate-400 text-xs mt-1">{daysToRenewal} days remaining</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Max Programmes</div>
                <div className="font-semibold text-white">{org?.maxProgrammes || (['standard', 'starter'].includes(subscription?.plan) ? 2 : subscription?.plan === 'growth' ? 5 : 'Unlimited')}</div>
                <div className="text-slate-400 text-xs mt-1">Current plan limit</div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Plus, label: 'Add Seats', desc: 'Add more seat capacity', onClick: () => setUpgradeOpen(true), color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: RefreshCw, label: 'Auto-Renew', desc: subscription?.autoRenew ? 'Currently enabled' : 'Disabled', onClick: () => toast('Auto-renewal updated', 'success'), color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: Download, label: 'Download History', desc: `Latest: ${invoices[0]?.invoiceNumber || 'None'}`, onClick: () => toast('Report generated', 'success'), color: 'text-purple-600', bg: 'bg-purple-50' },
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
            <h3 className="font-semibold text-slate-800 mb-4 capitalize">Included in Your {subscription?.plan} Plan</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(subscription?.features || {}).map(([key, val]) => (
                <div key={key} className={`flex items-center gap-2 text-sm ${val ? 'text-slate-700' : 'text-slate-400'}`}>
                  {val ? <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" /> : <AlertCircle size={14} className="text-slate-300 flex-shrink-0" />}
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
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
          {invoices.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Plan/Desc</th>
                  <th>Subtotal</th>
                  <th>GST</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv._id}>
                    <td>
                      <div className="font-mono text-xs text-blue-600 font-semibold">{inv.invoiceNumber}</div>
                    </td>
                    <td className="text-sm text-slate-700">
                      <div className="capitalize font-medium">{inv.plan} Plan</div>
                      <div className="text-xs text-slate-500">{inv.seats} Seats</div>
                    </td>
                    <td className="font-mono text-sm">₹{inv.subtotal?.toLocaleString('en-IN')}</td>
                    <td className="font-mono text-sm text-slate-500">₹{inv.gstAmount?.toLocaleString('en-IN')}</td>
                    <td className="font-mono text-sm font-semibold">₹{inv.total?.toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`badge ${inv.status === 'paid' ? 'badge-green' : 'badge-amber'}`}>
                        {inv.status === 'paid' && <CheckCircle size={10} />} {inv.status}
                      </span>
                    </td>
                    <td className="text-xs text-slate-500">{new Date(inv.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => toast('Invoice downloaded', 'success')} className="btn btn-sm btn-ghost text-xs gap-1">
                        <Download size={12} /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-slate-400">No invoices found.</div>
          )}
        </div>
      )}

      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} plans={plans} onUpgrade={handleUpgrade} currentPlan={subscription?.plan} />
    </div>
  )
}

function UpgradeModal({ open, onClose, plans, onUpgrade, currentPlan }) {
  const [selected, setSelected] = useState('enterprise')
  const [seats, setSeats] = useState(500)

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
        <button className="btn-primary btn gap-2" onClick={() => onUpgrade(selected, seats)}>
          <CreditCard size={14} /> Proceed to Upgrade ₹{total.toLocaleString('en-IN')}
        </button>
      </>}>
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          {currentPlans.map(p => (
            <button key={p.id} onClick={() => setSelected(p.id)}
              className={`relative p-4 rounded-xl border-2 text-left transition-all ${selected === p.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'} ${currentPlan === p.id ? 'ring-2 ring-emerald-500' : ''}`}>
              {p.popular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">Popular</span>}
              {currentPlan === p.id && <span className="absolute -top-2.5 right-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">Current</span>}
              <div className="font-bold text-slate-800 text-sm mb-0.5">{p.name || p.id}</div>
              <div className="text-xl font-display font-bold" style={{ color: p.color || '#3b82f6' }}>₹{((p.monthlyPrice || p.price || 0) / 1000).toFixed(0)}k<span className="text-xs font-normal text-slate-500">/mo</span></div>
              <div className="text-xs text-slate-500 mt-1">{p.seats || 'Custom'} seats</div>
            </button>
          ))}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Total Seats: <span className="text-blue-600">{seats}</span></label>
          <input type="range" min={10} max={1000} step={10} value={seats} onChange={e => setSeats(+e.target.value)} className="w-full accent-blue-600" />
          <div className="flex justify-between text-xs text-slate-400 mt-1"><span>10</span><span>500</span><span>1000</span></div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Invoice Preview</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">{plan?.name || plan?.id} Plan — Annual</span><span>₹{(plan?.price || plan?.monthlyPrice || 0).toLocaleString('en-IN')}</span></div>
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
