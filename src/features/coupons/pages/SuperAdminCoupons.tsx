import { useCallback, useEffect, useState } from 'react';
import { Plus, RefreshCw, Pencil, Trash2, Users, X, ListChecks } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    AdminCoupon, CouponForm, CouponRedemptionRow, addCouponMember, createCoupon, deleteCoupon, errorMessage,
    listCouponRedemptions, listCoupons, removeCouponMember, updateCoupon,
} from '../api';

// Super-admin console for subscription coupon codes. A coupon comes off the price after the
// automatic launch offer, before GST. "Team members only" coupons work only for the emails on
// their list. Everything is validated and audit-logged by the backend.

const inr = (rupees: number) => `₹${rupees.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
const day = (yyyyMmDd: string) =>
    new Date(`${yyyyMmDd}T00:00:00+05:30`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const discountText = (c: CouponForm) => c.discountType === 'flat'
    ? `${inr(c.amountRupees || 0)} off`
    : `${c.percent}% off${c.maxDiscountRupees != null ? ` (max ${inr(c.maxDiscountRupees)})` : ''}`;

const validityText = (c: CouponForm) => {
    if (c.startsOn && c.validUntil) return `${day(c.startsOn)} – ${day(c.validUntil)}`;
    if (c.validUntil) return `Until ${day(c.validUntil)}`;
    if (c.startsOn) return `From ${day(c.startsOn)}`;
    return 'No end date';
};

const EMPTY_FORM: CouponForm = {
    code: '', description: '', discountType: 'flat', amountRupees: 100, percent: null, maxDiscountRupees: null,
    audience: 'allowlist', perUserLimit: 1, maxRedemptions: null, startsOn: null, validUntil: null, isActive: true,
};

const SuperAdminCoupons = () => {
    const [coupons, setCoupons] = useState<AdminCoupon[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [editing, setEditing] = useState<AdminCoupon | 'new' | null>(null);
    const [membersOf, setMembersOf] = useState<AdminCoupon | null>(null);
    const [usesOf, setUsesOf] = useState<AdminCoupon | null>(null);

    const load = useCallback(() => {
        setError(null);
        listCoupons()
            .then(setCoupons)
            .catch(e => setError(errorMessage(e, 'Could not load coupons.')));
    }, []);
    useEffect(load, [load]);

    const replace = (updated: AdminCoupon) =>
        setCoupons(list => (list || []).map(c => (c.id === updated.id ? updated : c)));

    const toggleActive = async (c: AdminCoupon, isActive: boolean) => {
        try {
            replace(await updateCoupon(c.id, { isActive }));
            toast.success(isActive ? `${c.code} switched on` : `${c.code} switched off`);
        } catch (e) {
            toast.error(errorMessage(e, 'Could not update the coupon.'));
        }
    };

    const remove = async (c: AdminCoupon) => {
        if (!window.confirm(`Delete ${c.code}? Customers will no longer be able to use it.`)) return;
        try {
            await deleteCoupon(c.id);
            setCoupons(list => (list || []).filter(x => x.id !== c.id));
            toast.success(`${c.code} deleted`);
        } catch (e) {
            toast.error(errorMessage(e, 'Could not delete the coupon.'));
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Coupons</h1>
                    <p className="text-slate-600 mt-1 text-sm max-w-3xl">
                        Codes customers enter at subscription checkout in the Android app. A coupon comes off the price after the
                        automatic launch offer and before GST (₹999 − ₹100 = ₹899 + GST). “Team members only” codes work only for
                        the emails you add to them.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={load}><RefreshCw size={16} className="mr-2" />Refresh</Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setEditing('new')}>
                        <Plus size={16} className="mr-2" />New coupon
                    </Button>
                </div>
            </div>

            {error ? (
                <div className="bg-white border border-red-200 rounded-xl p-6 text-center mt-4">
                    <p className="text-red-700 mb-3">{error}</p>
                    <Button variant="outline" onClick={load}><RefreshCw size={16} className="mr-2" />Try again</Button>
                </div>
            ) : !coupons ? (
                <div className="h-48 bg-white rounded-xl border border-slate-200 animate-pulse mt-4" />
            ) : coupons.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500 mt-4">
                    No coupons yet. Create one with “New coupon”.
                </div>
            ) : (
                <div className="mt-5 grid gap-3">
                    {coupons.map(c => (
                        <section key={c.id} className="bg-white rounded-xl border border-slate-200 p-4">
                            <div className="flex flex-wrap items-start gap-3">
                                <div className="flex-1 min-w-[220px]">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono text-lg font-bold text-slate-900">{c.code}</span>
                                        <Badge variant="outline" className={c.isActive ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'}>
                                            {c.isActive ? 'Active' : 'Off'}
                                        </Badge>
                                        <Badge variant="outline" className={c.audience === 'allowlist' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' : 'bg-slate-50 text-slate-700 border-slate-200'}>
                                            {c.audience === 'allowlist' ? `Team members only · ${c.allowedEmails.length}` : 'Anyone with the code'}
                                        </Badge>
                                    </div>
                                    {c.description && <p className="text-sm text-slate-600 mt-1">{c.description}</p>}
                                    <dl className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 text-sm">
                                        <div><dt className="text-slate-500">Discount</dt><dd className="font-medium text-slate-900">{discountText(c)}</dd></div>
                                        <div><dt className="text-slate-500">Used</dt><dd className="font-medium text-slate-900">
                                            {c.redemptionCount}{c.maxRedemptions != null ? ` of ${c.maxRedemptions}` : ''}
                                            {c.inCheckoutNow > 0 && <span className="text-slate-500 font-normal"> · {c.inCheckoutNow} in checkout</span>}
                                        </dd></div>
                                        <div><dt className="text-slate-500">Per customer</dt><dd className="font-medium text-slate-900">{c.perUserLimit == null ? 'Unlimited' : c.perUserLimit === 1 ? 'Once' : `${c.perUserLimit} times`}</dd></div>
                                        <div><dt className="text-slate-500">Valid</dt><dd className="font-medium text-slate-900">{validityText(c)}</dd></div>
                                    </dl>
                                    {c.audience === 'allowlist' && c.allowedEmails.length === 0 && (
                                        <p className="text-sm text-amber-700 mt-2">No team members yet, so nobody can use this code.</p>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <label className="flex items-center gap-2 text-sm text-slate-700 mr-1">
                                        <Switch checked={c.isActive} onCheckedChange={v => toggleActive(c, v)} aria-label={`${c.code} active`} />
                                        Active
                                    </label>
                                    {c.audience === 'allowlist' && (
                                        <Button size="sm" variant="outline" onClick={() => setMembersOf(c)}><Users size={14} className="mr-1.5" />Team members</Button>
                                    )}
                                    <Button size="sm" variant="outline" onClick={() => setUsesOf(c)}><ListChecks size={14} className="mr-1.5" />Uses</Button>
                                    <Button size="sm" variant="outline" onClick={() => setEditing(c)}><Pencil size={14} className="mr-1.5" />Edit</Button>
                                    {c.redemptionCount === 0 && (
                                        <Button size="sm" variant="outline" className="text-red-700 hover:text-red-800" onClick={() => remove(c)} aria-label={`Delete ${c.code}`}>
                                            <Trash2 size={14} />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            )}

            <CouponDialog
                coupon={editing}
                onClose={() => setEditing(null)}
                onSaved={(saved, isNew) => {
                    setCoupons(list => (isNew ? [saved, ...(list || [])] : (list || []).map(c => (c.id === saved.id ? saved : c))));
                    setEditing(null);
                    if (isNew && saved.audience === 'allowlist') setMembersOf(saved);
                }}
            />
            <MembersDialog coupon={membersOf} onClose={() => setMembersOf(null)} onChanged={c => { replace(c); setMembersOf(c); }} />
            <UsesDialog coupon={usesOf} onClose={() => setUsesOf(null)} />
        </div>
    );
};

// ─── Create / edit ───────────────────────────────────────────────────────────

type Draft = Record<keyof CouponForm, string | boolean>;
const toDraft = (c: CouponForm): Draft => ({
    code: c.code, description: c.description, discountType: c.discountType,
    amountRupees: c.amountRupees != null ? String(c.amountRupees) : '',
    percent: c.percent != null ? String(c.percent) : '',
    maxDiscountRupees: c.maxDiscountRupees != null ? String(c.maxDiscountRupees) : '',
    audience: c.audience,
    perUserLimit: c.perUserLimit != null ? String(c.perUserLimit) : '',
    maxRedemptions: c.maxRedemptions != null ? String(c.maxRedemptions) : '',
    startsOn: c.startsOn || '', validUntil: c.validUntil || '', isActive: c.isActive,
});
const fromDraft = (d: Draft): CouponForm => {
    const num = (v: string | boolean) => (v === '' ? null : Number(v));
    return {
        code: String(d.code), description: String(d.description),
        discountType: d.discountType as CouponForm['discountType'],
        amountRupees: num(d.amountRupees), percent: num(d.percent), maxDiscountRupees: num(d.maxDiscountRupees),
        audience: d.audience as CouponForm['audience'],
        perUserLimit: num(d.perUserLimit), maxRedemptions: num(d.maxRedemptions),
        startsOn: d.startsOn ? String(d.startsOn) : null, validUntil: d.validUntil ? String(d.validUntil) : null,
        isActive: Boolean(d.isActive),
    };
};

const CouponDialog = ({ coupon, onClose, onSaved }: {
    coupon: AdminCoupon | 'new' | null;
    onClose: () => void;
    onSaved: (c: AdminCoupon, isNew: boolean) => void;
}) => {
    const isNew = coupon === 'new';
    const [draft, setDraft] = useState<Draft>(toDraft(EMPTY_FORM));
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (coupon) setDraft(toDraft(coupon === 'new' ? EMPTY_FORM : coupon));
    }, [coupon]);

    const set = (key: keyof CouponForm) => (value: string | boolean) => setDraft(d => ({ ...d, [key]: value }));

    const save = async () => {
        if (!coupon) return;
        setBusy(true);
        try {
            const body = fromDraft(draft);
            const saved = isNew ? await createCoupon(body) : await updateCoupon((coupon as AdminCoupon).id, body);
            toast.success(isNew ? `${saved.code} created` : `${saved.code} saved`);
            onSaved(saved, isNew);
        } catch (e) {
            toast.error(errorMessage(e, 'Could not save the coupon.'));
        } finally {
            setBusy(false);
        }
    };

    const choice = (key: keyof CouponForm, value: string, label: string) => (
        <Button type="button" size="sm" variant={draft[key] === value ? 'default' : 'outline'}
            className={draft[key] === value ? 'bg-indigo-600 hover:bg-indigo-600' : ''}
            onClick={() => set(key)(value)} aria-pressed={draft[key] === value}>
            {label}
        </Button>
    );

    return (
        <Dialog open={!!coupon} onOpenChange={open => !open && onClose()}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isNew ? 'New coupon' : `Edit ${(coupon as AdminCoupon | null)?.code ?? ''}`}</DialogTitle>
                    <DialogDescription>Changes apply to future checkouts. Payments already made keep their price.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    {isNew && (
                        <div className="grid gap-1.5">
                            <Label htmlFor="coupon-code">Code</Label>
                            <Input id="coupon-code" value={String(draft.code)} onChange={e => set('code')(e.target.value.toUpperCase())}
                                placeholder="TEAM100" maxLength={30} className="font-mono" />
                            <p className="text-xs text-slate-500">3–30 letters, digits, - or _. Can’t be changed later.</p>
                        </div>
                    )}
                    <div className="grid gap-1.5">
                        <Label htmlFor="coupon-desc">Description (internal)</Label>
                        <Input id="coupon-desc" value={String(draft.description)} onChange={e => set('description')(e.target.value)}
                            placeholder="Internal team discount" maxLength={200} />
                    </div>

                    <div className="grid gap-1.5">
                        <Label>Discount</Label>
                        <div className="flex gap-2">{choice('discountType', 'flat', 'Flat amount')}{choice('discountType', 'percent', 'Percentage')}</div>
                        {draft.discountType === 'flat' ? (
                            <Input type="number" min={1} value={String(draft.amountRupees)} onChange={e => set('amountRupees')(e.target.value)}
                                aria-label="Discount amount in rupees" placeholder="Amount in ₹" />
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <Input type="number" min={1} max={99} value={String(draft.percent)} onChange={e => set('percent')(e.target.value)}
                                    aria-label="Percent off" placeholder="% off" />
                                <Input type="number" min={1} value={String(draft.maxDiscountRupees)} onChange={e => set('maxDiscountRupees')(e.target.value)}
                                    aria-label="Maximum discount in rupees" placeholder="Max ₹ (optional)" />
                            </div>
                        )}
                    </div>

                    <div className="grid gap-1.5">
                        <Label>Who can use it</Label>
                        <div className="flex gap-2 flex-wrap">{choice('audience', 'allowlist', 'Team members only')}{choice('audience', 'everyone', 'Anyone with the code')}</div>
                        {draft.audience === 'allowlist' && <p className="text-xs text-slate-500">Add team members’ emails after saving.</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-1.5">
                            <Label htmlFor="coupon-per-user">Uses per customer</Label>
                            <Input id="coupon-per-user" type="number" min={1} value={String(draft.perUserLimit)} onChange={e => set('perUserLimit')(e.target.value)} placeholder="Unlimited" />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="coupon-cap">Total uses</Label>
                            <Input id="coupon-cap" type="number" min={1} value={String(draft.maxRedemptions)} onChange={e => set('maxRedemptions')(e.target.value)} placeholder="No limit" />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="coupon-start">Starts on</Label>
                            <Input id="coupon-start" type="date" value={String(draft.startsOn)} onChange={e => set('startsOn')(e.target.value)} />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="coupon-end">Last valid day</Label>
                            <Input id="coupon-end" type="date" value={String(draft.validUntil)} onChange={e => set('validUntil')(e.target.value)} />
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 -mt-2">Leave blank for no limit. Dates are India time.</p>

                    <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-3">
                        <span className="font-medium text-slate-900">Active</span>
                        <Switch checked={Boolean(draft.isActive)} onCheckedChange={set('isActive')} aria-label="Active" />
                    </label>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={busy}>Cancel</Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={save} disabled={busy}>
                        {busy ? 'Saving…' : isNew ? 'Create coupon' : 'Save'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// ─── Team members ────────────────────────────────────────────────────────────

const MembersDialog = ({ coupon, onClose, onChanged }: {
    coupon: AdminCoupon | null;
    onClose: () => void;
    onChanged: (c: AdminCoupon) => void;
}) => {
    const [email, setEmail] = useState('');
    const [busy, setBusy] = useState(false);
    useEffect(() => { setEmail(''); }, [coupon?.id]);

    const add = async () => {
        if (!coupon || !email.trim()) return;
        setBusy(true);
        try {
            onChanged(await addCouponMember(coupon.id, email.trim()));
            setEmail('');
        } catch (e) {
            toast.error(errorMessage(e, 'Could not add this email.'));
        } finally {
            setBusy(false);
        }
    };

    const remove = async (address: string) => {
        if (!coupon) return;
        setBusy(true);
        try {
            onChanged(await removeCouponMember(coupon.id, address));
        } catch (e) {
            toast.error(errorMessage(e, 'Could not remove this email.'));
        } finally {
            setBusy(false);
        }
    };

    return (
        <Dialog open={!!coupon} onOpenChange={open => !open && onClose()}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Team members for {coupon?.code}</DialogTitle>
                    <DialogDescription>
                        Only these accounts can use the code. Use the email they sign in to PreventVital with.
                    </DialogDescription>
                </DialogHeader>
                <form className="flex gap-2" onSubmit={e => { e.preventDefault(); add(); }}>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" aria-label="Team member email" />
                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={busy || !email.trim()}>
                        <Plus size={16} className="mr-1" />Add
                    </Button>
                </form>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-lg">
                    {!coupon?.allowedEmails.length ? (
                        <p className="p-4 text-sm text-slate-500 text-center">No team members yet.</p>
                    ) : coupon.allowedEmails.map(address => (
                        <div key={address} className="flex items-center justify-between gap-3 px-3 py-2">
                            <div className="min-w-0">
                                <div className="text-sm text-slate-900 truncate">{address}</div>
                                {coupon.emailsWithoutAccount.includes(address) && (
                                    <div className="text-xs text-amber-700">No PreventVital account with this email yet</div>
                                )}
                            </div>
                            <Button size="sm" variant="ghost" disabled={busy} onClick={() => remove(address)} aria-label={`Remove ${address}`}>
                                <X size={16} />
                            </Button>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

// ─── Uses ────────────────────────────────────────────────────────────────────

const UsesDialog = ({ coupon, onClose }: { coupon: AdminCoupon | null; onClose: () => void }) => {
    const [rows, setRows] = useState<CouponRedemptionRow[] | null>(null);
    useEffect(() => {
        if (!coupon) return;
        setRows(null);
        listCouponRedemptions(coupon.id)
            .then(setRows)
            .catch(e => { toast.error(errorMessage(e, 'Could not load uses.')); setRows([]); });
    }, [coupon]);

    return (
        <Dialog open={!!coupon} onOpenChange={open => !open && onClose()}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Uses of {coupon?.code}</DialogTitle>
                    <DialogDescription>Paid uses, plus checkouts that are open right now. Latest 100.</DialogDescription>
                </DialogHeader>
                {!rows ? (
                    <div className="h-24 bg-slate-50 rounded-lg animate-pulse" />
                ) : rows.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-6">Not used yet.</p>
                ) : (
                    <div className="max-h-96 overflow-y-auto">
                        <table className="w-full text-sm">
                            <thead className="text-left text-slate-500">
                                <tr><th className="py-2 font-medium">Customer</th><th className="font-medium">Order</th><th className="font-medium">Discount</th><th className="font-medium">Status</th><th className="font-medium">When</th></tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {rows.map(r => (
                                    <tr key={r.id}>
                                        <td className="py-2">{r.user?.name || '—'}<div className="text-xs text-slate-500">{r.user?.email}</div></td>
                                        <td className="font-mono text-xs">{r.orderId || '—'}</td>
                                        <td>{inr(r.discountPaise / 100)}</td>
                                        <td><Badge variant="outline">{r.status === 'redeemed' ? 'Paid' : r.status === 'reserved' ? 'In checkout' : 'Abandoned'}</Badge></td>
                                        <td className="text-slate-600">{new Date(r.at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SuperAdminCoupons;
