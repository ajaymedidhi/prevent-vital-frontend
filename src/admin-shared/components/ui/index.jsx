import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Loader2 } from 'lucide-react'
import { useUIStore } from '../../store'

// ── Toast system ─────────────────────────────────────────────────────────────
export function ToastContainer() {
  const { toasts, removeToast } = useUIStore()
  if (!toasts.length) return null

  const icons = {
    success: <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle size={16} className="text-red-500 flex-shrink-0" />,
    warning: <AlertTriangle size={16} className="text-orange-500 flex-shrink-0" />,
    info: <Info size={16} className="text-blue-500 flex-shrink-0" />,
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl shadow-modal px-4 py-3 min-w-72 max-w-sm animate-slide-in-right">
          {icons[t.type] || icons.info}
          <span className="text-sm text-slate-700 font-medium flex-1">{t.message}</span>
          <button onClick={() => removeToast(t.id)} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg', footer }) {
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`modal-box ${maxWidth}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-display text-lg text-slate-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center justify-end gap-3">{footer}</div>}
      </div>
    </div>
  )
}

// ── Badge ─────────────────────────────────────────────────────────────────────
export function Badge({ children, color = 'blue' }) {
  const map = { blue: 'badge-blue', green: 'badge-green', red: 'badge-red', orange: 'badge-orange', purple: 'badge-purple', slate: 'badge-slate' }
  return <span className={`badge ${map[color] || 'badge-slate'}`}>{children}</span>
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />
}

export function CardSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-24 mb-2" />
      <Skeleton className="h-3 w-40" />
    </div>
  )
}

export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        <Icon size={28} className="text-slate-400" />
      </div>
      <h3 className="font-semibold text-slate-700 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-5">{description}</p>
      {action}
    </div>
  )
}

// ── Confirm dialog ────────────────────────────────────────────────────────────
export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', danger = false, loading = false }) {
  return (
    <Modal open={open} onClose={onClose} title={title}
      footer={<>
        <button className="btn-secondary btn" onClick={onClose}>Cancel</button>
        <button className={danger ? 'btn-danger btn' : 'btn-primary btn'} onClick={onConfirm} disabled={loading}>
          {loading && <Loader2 size={14} className="animate-spin" />}
          {confirmLabel}
        </button>
      </>}
    >
      <p className="text-sm text-slate-600">{message}</p>
    </Modal>
  )
}

// ── Progress ring ─────────────────────────────────────────────────────────────
export function ProgressRing({ value, max = 100, size = 64, strokeWidth = 6, color = '#2563eb' }) {
  const r = (size - strokeWidth) / 2
  const cx = size / 2, cy = size / 2
  const circ = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const dash = circ * pct

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.7s cubic-bezier(0.4,0,0.2,1)' }} />
    </svg>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub, icon: Icon, iconBg = 'bg-blue-100', iconColor = 'text-blue-600', trend, trendLabel, delay = 0 }) {
  const trendPos = trend > 0
  return (
    <div className="stat-card animate-slide-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={20} className={iconColor} />
        </div>
        {trend !== undefined && (
          <span className={`badge text-xs font-semibold ${trendPos ? 'badge-green' : 'badge-red'}`}>
            {trendPos ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="font-display text-3xl text-slate-900 mb-1">{value}</div>
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</div>
      {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
      {trendLabel && <div className={`text-xs mt-1 ${trendPos ? 'text-emerald-600' : 'text-red-500'}`}>{trendLabel}</div>}
    </div>
  )
}

// ── Wellness badge ────────────────────────────────────────────────────────────
const WELLNESS = {
  active: { label: 'Active', dot: 'status-active', badge: 'badge-green' },
  engaged: { label: 'Engaged', dot: 'status-engaged', badge: 'badge-blue' },
  drifting: { label: 'Drifting', dot: 'status-drifting', badge: 'badge-orange' },
  inactive: { label: 'Inactive', dot: 'status-inactive', badge: 'badge-red' },
  not_started: { label: 'Not Started', dot: 'status-not_started', badge: 'badge-slate' },
}
export function WellnessBadge({ status }) {
  const w = WELLNESS[status] || WELLNESS.not_started
  return (
    <span className={`badge ${w.badge}`}>
      <span className={`status-dot ${w.dot}`} />
      {w.label}
    </span>
  )
}

// ── Plan badge ────────────────────────────────────────────────────────────────
export function PlanBadge({ plan }) {
  const map = {
    enterprise: { label: 'Enterprise', color: 'purple' },
    premium: { label: 'Premium', color: 'purple' },
    growth: { label: 'Growth', color: 'blue' },
    standard: { label: 'Standard', color: 'green' },
    starter: { label: 'Starter', color: 'green' },
    trial: { label: 'Trial', color: 'orange' },
  }
  const p = map[plan] || map.trial
  return <Badge color={p.color}>{p.label}</Badge>
}

// ── Avatar ────────────────────────────────────────────────────────────────────
export function Avatar({ name = '', src, size = 'md' }) {
  const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' }
  const initials = name.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase()
  const colours = ['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500', 'bg-cyan-500']
  const bg = colours[name.charCodeAt(0) % colours.length]

  if (src) return <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover ring-2 ring-white`} />
  return (
    <div className={`${sizes[size]} ${bg} rounded-full flex items-center justify-center font-semibold text-white ring-2 ring-white flex-shrink-0`}>
      {initials}
    </div>
  )
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
      {tabs.map(t => (
        <button key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${active === t.id ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}>
          {t.label}
          {t.count !== undefined && (
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${active === t.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'}`}>
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ── Search input ──────────────────────────────────────────────────────────────
export function SearchInput({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-9 w-full" />
    </div>
  )
}

// ── Section header ────────────────────────────────────────────────────────────
export function SectionHeader({ title, description, action }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="font-display text-2xl text-slate-900">{title}</h2>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  )
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────
export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-1">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-slate-300">/</span>}
          <span className={i === items.length - 1 ? 'text-slate-800 font-medium' : 'text-slate-400'}>{item}</span>
        </span>
      ))}
    </nav>
  )
}
