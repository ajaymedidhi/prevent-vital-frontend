import { useCallback, useEffect, useState } from 'react';
import { RefreshCw, Search, Play, ShieldCheck, ShieldX, Wallet as WalletIcon, AlertTriangle, Check, X, Copy, Link2, UserPlus, UserMinus } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    AdminPayoutAccount, AdminReferral, AdminWithdrawal, LedgerEntry, Member, ProgramSetup, ReferralProgram, Summary, TeamMember, TeamTotals,
    addTeamMember, adjustWallet, errorMessage, listTeam, getProgram, getSummary, getWallet, inr, listMembers, listPayoutAccounts, listReferrals,
    listWithdrawals, reconcileWallet, referralAction, reviewPayoutAccount, runJobs, updateMember, updateProgram, withdrawalAction,
} from '../api';

// Super-admin console for Refer & Earn: program switch and rollout (pilot → public), member
// allowlist and blocks, referral review, KYC review, withdrawals/payouts, wallet ledger and
// reconciliation. Every action here is enforced and audit-logged by the backend.

const STATUS_STYLE: Record<string, string> = {
    attributed: 'bg-slate-50 text-slate-700 border-slate-200',
    pending: 'bg-amber-50 text-amber-800 border-amber-200',
    on_hold: 'bg-orange-50 text-orange-800 border-orange-200',
    review: 'bg-purple-50 text-purple-800 border-purple-200',
    confirmed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    reversed: 'bg-red-50 text-red-700 border-red-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
    approved: 'bg-blue-50 text-blue-800 border-blue-200',
    processing: 'bg-blue-50 text-blue-800 border-blue-200',
    processed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    failed: 'bg-red-50 text-red-700 border-red-200',
    cancelled: 'bg-slate-50 text-slate-700 border-slate-200',
    verified: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    not_submitted: 'bg-slate-50 text-slate-600 border-slate-200',
};
const StatusBadge = ({ status }: { status: string }) => (
    <Badge variant="outline" className={STATUS_STYLE[status] || ''}>{status.replace(/_/g, ' ')}</Badge>
);
const date = (iso?: string) => (iso ? new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—');

const SuperAdminReferrals = () => {
    const [walletUser, setWalletUser] = useState<string | null>(null);
    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900">Refer & Earn</h1>
            <p className="text-slate-600 mt-1 text-sm max-w-3xl">
                Members earn a reward when someone they refer buys their first paid plan. Rewards stay pending for the hold period,
                then become withdrawable. Moving from the core-team pilot to everyone is the rollout setting below; no release is needed.
            </p>
            <Tabs defaultValue="overview" className="mt-5">
                <TabsList className="flex-wrap h-auto">
                    <TabsTrigger value="overview">Overview & settings</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="referrals">Referrals</TabsTrigger>
                    <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                    <TabsTrigger value="kyc">Bank & PAN</TabsTrigger>
                </TabsList>
                <TabsContent value="overview"><Overview /></TabsContent>
                <TabsContent value="team"><Team onWallet={setWalletUser} /></TabsContent>
                <TabsContent value="members"><Members onWallet={setWalletUser} /></TabsContent>
                <TabsContent value="referrals"><Referrals /></TabsContent>
                <TabsContent value="withdrawals"><Withdrawals onWallet={setWalletUser} /></TabsContent>
                <TabsContent value="kyc"><Kyc /></TabsContent>
            </Tabs>
            <WalletDialog userId={walletUser} onClose={() => setWalletUser(null)} />
        </div>
    );
};

// ─── Overview & settings ─────────────────────────────────────────────────────

const NUMBER_FIELDS: { key: keyof ReferralProgram; label: string; rupees?: boolean; hint?: string }[] = [
    { key: 'rewardPaise', label: 'Reward per referral (₹)', rupees: true },
    { key: 'teamRewardPaise', label: 'Core-team reward per referral (₹)', rupees: true, hint: 'Replaces the reward above for allowlisted members' },
    { key: 'refereeDiscountPaise', label: 'Discount for core-team referrals (₹)', rupees: true, hint: 'Off the referred friend’s first Pro annual plan; 0 = off' },
    { key: 'minWithdrawalPaise', label: 'Minimum withdrawal (₹)', rupees: true },
    { key: 'maxWithdrawalPaise', label: 'Maximum per withdrawal (₹)', rupees: true },
    { key: 'holdDays', label: 'Hold period (days)', hint: 'Pending → available' },
    { key: 'attributionWindowDays', label: 'Code entry window (days after sign-up)', hint: '0 = no limit; codes still need no earlier paid plan' },
    { key: 'maxRewardsPerReferrerPerMonth', label: 'Rewards per member per 30 days', hint: 'Above this, referrals go to review' },
    { key: 'maxAttributionsPerReferrerPerDay', label: 'Sign-ups per code per day', hint: 'Above this, referrals go to review' },
];

const Overview = () => {
    const [program, setProgram] = useState<ReferralProgram | null>(null);
    const [setup, setSetup] = useState<ProgramSetup | null>(null);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [draft, setDraft] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    const load = useCallback(() => {
        setError(null);
        Promise.all([getProgram(), getSummary()])
            .then(([p, s]) => {
                setProgram(p.program);
                setSetup(p.setup);
                setSummary(s);
                setDraft(Object.fromEntries(NUMBER_FIELDS.map(f => [f.key, String(f.rupees ? (p.program[f.key] as number) / 100 : p.program[f.key])])));
            })
            .catch(e => setError(errorMessage(e, 'Could not load the referral programme.')));
    }, []);
    useEffect(load, [load]);

    const save = async (changes: Partial<ReferralProgram>, confirmText?: string) => {
        if (confirmText && !window.confirm(confirmText)) return;
        setBusy(true);
        try {
            setProgram(await updateProgram(changes));
            toast.success('Saved');
        } catch (e) {
            toast.error(errorMessage(e, 'Could not save.'));
        } finally {
            setBusy(false);
        }
    };

    const saveNumbers = () => {
        if (!program) return;
        const changes: Record<string, number> = {};
        for (const f of NUMBER_FIELDS) {
            const n = Number(draft[f.key]);
            if (!Number.isFinite(n)) return toast.error(`${f.label} must be a number`);
            const value = f.rupees ? Math.round(n * 100) : Math.round(n);
            if (value !== program[f.key]) changes[f.key] = value;
        }
        if (!Object.keys(changes).length) return toast('Nothing changed');
        save(changes, 'Apply these rule changes? They affect future referrals and withdrawals, not rewards already credited.');
    };

    const jobs = async () => {
        setBusy(true);
        try {
            const r = await runJobs();
            toast.success(`Done. Confirmed ${r.confirmMatured?.confirmed ?? 0}, repaired ${(r.repairReferrals?.fixed ?? 0) + (r.repairWithdrawals?.fixed ?? 0)}.`);
            load();
        } catch (e) {
            toast.error(errorMessage(e, 'Jobs failed.'));
        } finally {
            setBusy(false);
        }
    };

    if (error) return <ErrorBox message={error} onRetry={load} />;
    if (!program || !summary || !setup) return <div className="h-48 bg-white rounded-xl border border-slate-200 animate-pulse mt-4" />;

    const r = summary.referrals;
    const w = summary.withdrawals;
    return (
        <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Stat label="Pilot members" value={summary.allowlistedMembers} />
                <Stat label="Sign-ups via code" value={Object.values(r).reduce((s, x) => s + (x?.count || 0), 0)} />
                <Stat label="Rewards pending" value={inr((r.pending?.rewardPaise || 0) + (r.on_hold?.rewardPaise || 0))} sub={`${(r.pending?.count || 0) + (r.on_hold?.count || 0)} referrals`} />
                <Stat label="Rewards confirmed" value={inr(r.confirmed?.rewardPaise)} sub={`${r.confirmed?.count || 0} referrals`} />
                <Stat label="Wallet balances" value={inr(summary.wallets?.availablePaise)} sub="available, all members" />
                <Stat label="Paid out" value={inr(summary.wallets?.paidOutPaise)} />
                <Stat label="Needs review" value={(r.review?.count || 0) + (w.review?.count || 0) + summary.kycPending} sub="referrals, withdrawals, KYC" warn={(r.review?.count || 0) + (w.review?.count || 0) + summary.kycPending > 0} />
                <Stat label="Payouts stuck" value={summary.payoutsNeedingAttention} sub="ambiguous, retries exhausted" warn={summary.payoutsNeedingAttention > 0} />
            </div>

            <section className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="font-semibold text-slate-900">Programme</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-3">
                        <span>
                            <span className="font-medium text-slate-900 block">Programme enabled</span>
                            <span className="text-sm text-slate-600">Off: nobody can refer or apply codes. Existing balances stay withdrawable.</span>
                        </span>
                        <Switch checked={program.enabled} disabled={busy} aria-label="Programme enabled"
                            onCheckedChange={v => save({ enabled: v }, v ? 'Turn Refer & Earn on?' : 'Turn Refer & Earn off for everyone?')} />
                    </label>
                    <div className="rounded-lg border border-slate-200 p-3">
                        <span className="font-medium text-slate-900 block">Who can refer</span>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {(['CORE_TEAM_ONLY', 'ALL_ELIGIBLE_USERS'] as const).map(mode => (
                                <Button key={mode} size="sm" disabled={busy || program.rolloutMode === mode}
                                    variant={program.rolloutMode === mode ? 'default' : 'outline'}
                                    className={program.rolloutMode === mode ? 'bg-indigo-600 hover:bg-indigo-600' : ''}
                                    onClick={() => save({ rolloutMode: mode }, mode === 'ALL_ELIGIBLE_USERS'
                                        ? 'Open Refer & Earn to every customer account? Blocked members stay excluded.'
                                        : 'Limit Refer & Earn to allowlisted members? Others keep their balance but stop getting new rewards.')}>
                                    {mode === 'CORE_TEAM_ONLY' ? 'Core team (allowlist)' : 'All eligible users'}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-3">
                        <span>
                            <span className="font-medium text-slate-900 block">Referrers need a paid plan</span>
                            <span className="text-sm text-slate-600">A member's code works only while they have an active paid plan, core team included.</span>
                        </span>
                        <Switch checked={program.referrerRequiresPaidPlan} disabled={busy} aria-label="Referrers need a paid plan"
                            onCheckedChange={v => save({ referrerRequiresPaidPlan: v })} />
                    </label>
                    <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-3">
                        <span>
                            <span className="font-medium text-slate-900 block">Approve each withdrawal</span>
                            <span className="text-sm text-slate-600">Recommended during the pilot.</span>
                        </span>
                        <Switch checked={program.withdrawalRequiresApproval} disabled={busy} aria-label="Approve each withdrawal"
                            onCheckedChange={v => save({ withdrawalRequiresApproval: v })} />
                    </label>
                    <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-3">
                        <span>
                            <span className="font-medium text-slate-900 block">RazorpayX payouts</span>
                            <span className="text-sm text-slate-600">
                                {setup.razorpayxConfigured ? 'Credentials configured.' : 'Not configured on the server; approved withdrawals wait.'}
                            </span>
                        </span>
                        <Switch checked={program.payoutsEnabled} disabled={busy} aria-label="RazorpayX payouts"
                            onCheckedChange={v => save({ payoutsEnabled: v }, v ? 'Send approved withdrawals to RazorpayX? Real money moves if live keys are configured.' : undefined)} />
                    </label>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {NUMBER_FIELDS.map(f => (
                        <div key={f.key}>
                            <Label htmlFor={`rp-${f.key}`}>{f.label}</Label>
                            <Input id={`rp-${f.key}`} inputMode="decimal" value={draft[f.key] ?? ''} onChange={e => setDraft(d => ({ ...d, [f.key]: e.target.value }))} />
                            {f.hint && <p className="text-xs text-slate-500 mt-1">{f.hint}</p>}
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                    <Button onClick={saveNumbers} disabled={busy} className="bg-indigo-600 hover:bg-indigo-700">Save rules</Button>
                    <Button variant="outline" onClick={jobs} disabled={busy}><Play size={15} className="mr-1.5" />Run maintenance jobs</Button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                    Maintenance confirms matured rewards, retries ambiguous payouts with the same idempotency key, polls payout and bank checks, and repairs interrupted ledger writes. Safe to run any time.
                </p>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="font-semibold text-slate-900">Server setup</h2>
                <ul className="mt-3 space-y-1.5 text-sm">
                    <SetupItem ok={setup.kycEncryptionConfigured} label="REFERRAL_ENCRYPTION_KEY (needed to accept bank & PAN details)" />
                    <SetupItem ok={setup.razorpayxConfigured} label="RazorpayX API keys and account number" />
                    <SetupItem ok={setup.razorpayxWebhookConfigured} label="RAZORPAYX_WEBHOOK_SECRET (payout status updates)" />
                </ul>
            </section>
        </div>
    );
};

const SetupItem = ({ ok, label }: { ok: boolean; label: string }) => (
    <li className="flex items-center gap-2">
        {ok ? <Check size={16} className="text-emerald-600" aria-label="Configured" /> : <X size={16} className="text-red-600" aria-label="Missing" />}
        <span className={ok ? 'text-slate-700' : 'text-slate-900 font-medium'}>{label}</span>
    </li>
);

const Stat = ({ label, value, sub, warn }: { label: string; value: string | number; sub?: string; warn?: boolean }) => (
    <div className={`bg-white rounded-xl border p-4 ${warn ? 'border-amber-300' : 'border-slate-200'}`}>
        <div className="text-xs font-medium text-slate-600">{label}</div>
        <div className="text-xl font-bold text-slate-900 mt-1">{value}</div>
        {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
    </div>
);

const ErrorBox = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
    <div className="bg-white border border-red-200 rounded-xl p-6 text-center mt-4">
        <p className="text-red-700 mb-3">{message}</p>
        <Button variant="outline" onClick={onRetry}><RefreshCw size={16} className="mr-2" />Try again</Button>
    </div>
);

const Empty = ({ text }: { text: string }) => <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500 mt-4">{text}</div>;

// ─── Team ────────────────────────────────────────────────────────────────────
// The core-team pilot: who can refer, their codes, and how their referrals are doing.

const copy = async (text: string, what: string) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success(`${what} copied`);
    } catch {
        toast.error(`Could not copy. ${what}: ${text}`);
    }
};

const Team = ({ onWallet }: { onWallet: (id: string) => void }) => {
    const [members, setMembers] = useState<TeamMember[] | null>(null);
    const [totals, setTotals] = useState<TeamTotals | null>(null);
    const [limited, setLimited] = useState(false);
    const [program, setProgram] = useState<ReferralProgram | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [adding, setAdding] = useState(false);
    const [addError, setAddError] = useState<string | null>(null);
    const [busyId, setBusyId] = useState<string | null>(null);

    const load = useCallback(() => {
        setError(null);
        Promise.all([listTeam(), getProgram()])
            .then(([team, p]) => { setMembers(team.members); setTotals(team.totals); setLimited(team.limited); setProgram(p.program); })
            .catch(e => setError(errorMessage(e, 'Could not load the team.')));
    }, []);
    useEffect(load, [load]);

    const add = async (e: React.FormEvent) => {
        e.preventDefault();
        const value = email.trim();
        if (!value || adding) return;
        setAdding(true);
        setAddError(null);
        try {
            const { member, alreadyMember } = await addTeamMember(value);
            toast.success(alreadyMember ? `${member.email} is already on the team` : `Added ${member.email}. Code ${member.code}`);
            setEmail('');
            load();
        } catch (err) {
            setAddError(errorMessage(err, 'Could not add this member.'));
        } finally {
            setAdding(false);
        }
    };

    const createCode = async (m: TeamMember) => {
        if (!m.email || busyId) return;
        setBusyId(m._id);
        try {
            const { member } = await addTeamMember(m.email);
            setMembers(list => (list || []).map(x => (x._id === m._id ? member : x)));
        } catch (err) {
            toast.error(errorMessage(err, 'Could not create a code.'));
        } finally {
            setBusyId(null);
        }
    };

    const remove = async (m: TeamMember) => {
        if (busyId || !window.confirm(`Remove ${m.name || m.email} from the team? They stop earning new rewards; their wallet and existing referrals are kept.`)) return;
        setBusyId(m._id);
        try {
            await updateMember(m._id, { eligible: false });
            toast.success('Removed from the team');
            load();
        } catch (err) {
            toast.error(errorMessage(err, 'Could not remove this member.'));
        } finally {
            setBusyId(null);
        }
    };

    if (error) return <ErrorBox message={error} onRetry={load} />;

    return (
        <div className="mt-4 space-y-4">
            {program && !program.enabled && (
                <div className="flex gap-2 items-start bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-sm">
                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                    <span>The programme is switched off, so team members can't see Refer & Earn in the app yet. Turn it on under Overview & settings.</span>
                </div>
            )}

            {totals && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <Stat label="Team members" value={totals.members} />
                    <Stat label="People referred" value={totals.referrals} />
                    <Stat label="Subscribed" value={totals.subscribed} sub="bought a first paid plan" />
                    <Stat label="Rewards earned" value={inr(totals.earnedPaise)} sub="confirmed" />
                    <Stat label="Rewards pending" value={inr(totals.pendingPaise)} sub="in the hold period" />
                </div>
            )}

            <form onSubmit={add} className="bg-white rounded-xl border border-slate-200 p-4">
                <Label htmlFor="team-email" className="text-sm font-semibold text-slate-900">Add a team member</Label>
                <p className="text-xs text-slate-500 mt-0.5">They need a PreventVital account first. Adding them gives them a referral code straight away.</p>
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                    <Input
                        id="team-email"
                        type="email"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setAddError(null); }}
                        placeholder="name@example.com"
                        autoComplete="off"
                        aria-invalid={!!addError}
                        aria-describedby={addError ? 'team-email-error' : undefined}
                    />
                    <Button type="submit" disabled={adding || !email.trim()}>
                        <UserPlus size={16} className="mr-1.5" />{adding ? 'Adding…' : 'Add to team'}
                    </Button>
                </div>
                {addError && <p id="team-email-error" className="text-sm text-red-700 mt-2">{addError}</p>}
            </form>

            {members == null ? <div className="h-40 bg-white rounded-xl border border-slate-200 animate-pulse" />
                : members.length === 0 ? <Empty text="No team members yet. Add someone by email above." />
                : (
                    <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 text-slate-600 text-left">
                                <tr>
                                    <th className="p-3">Member</th><th className="p-3">Referral code</th><th className="p-3">Referred</th>
                                    <th className="p-3">Subscribed</th><th className="p-3">Earned</th><th className="p-3">Pending</th><th className="p-3">Available</th><th className="p-3" />
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(m => (
                                    <tr key={m._id} className="border-t border-slate-100 align-top">
                                        <td className="p-3">
                                            <div className="font-medium text-slate-900">{m.name || '—'}</div>
                                            <div className="text-slate-500">{m.email || m.phone}</div>
                                            {m.blocked && <Badge variant="outline" className={`${STATUS_STYLE.rejected} mt-1`}>Blocked</Badge>}
                                            {!m.paidPlan && (
                                                <Badge variant="outline" className={`${STATUS_STYLE.review} mt-1`} title="While &quot;Referrers need a paid plan&quot; is on, their code doesn’t work">
                                                    No paid plan
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {m.code ? (
                                                <div className="flex items-center gap-1">
                                                    <span className="font-mono font-semibold text-slate-900">{m.code}</span>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => copy(m.code!, 'Code')} aria-label={`Copy code ${m.code}`}><Copy size={14} /></Button>
                                                    {m.shareLink && <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => copy(m.shareLink!, 'Link')} aria-label={`Copy share link for ${m.code}`}><Link2 size={14} /></Button>}
                                                </div>
                                            ) : m.email ? (
                                                <Button size="sm" variant="outline" disabled={busyId === m._id} onClick={() => createCode(m)}>Create code</Button>
                                            ) : <span className="text-slate-500">Assigned when they open Refer & Earn</span>}
                                        </td>
                                        <td className="p-3">{m.referrals.total}{m.referrals.lastReferralAt && <div className="text-xs text-slate-500">last {date(m.referrals.lastReferralAt)}</div>}</td>
                                        <td className="p-3">{m.referrals.subscribed}<div className="text-xs text-slate-500">{m.referrals.confirmed} confirmed</div></td>
                                        <td className="p-3">{inr(m.wallet.lifetimeEarnedPaise)}</td>
                                        <td className="p-3">{inr(m.wallet.pendingPaise)}</td>
                                        <td className={`p-3 ${m.wallet.availablePaise < 0 ? 'text-red-700' : ''}`}>{inr(m.wallet.availablePaise)}</td>
                                        <td className="p-3 whitespace-nowrap text-right">
                                            <Button size="sm" variant="ghost" onClick={() => onWallet(m._id)}><WalletIcon size={15} className="mr-1" />Wallet</Button>
                                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" disabled={busyId === m._id} onClick={() => remove(m)}>
                                                <UserMinus size={15} className="mr-1" />Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            {limited && <p className="text-xs text-slate-500">Showing the first 200 team members.</p>}
        </div>
    );
};

// ─── Members ─────────────────────────────────────────────────────────────────

const Members = ({ onWallet }: { onWallet: (id: string) => void }) => {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [rows, setRows] = useState<Member[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(() => {
        setError(null);
        setRows(null);
        listMembers(query).then(setRows).catch(e => setError(errorMessage(e, 'Could not load members.')));
    }, [query]);
    useEffect(load, [load]);

    const update = async (m: Member, body: { eligible?: boolean; blocked?: boolean; blockedReason?: string }) => {
        try {
            await updateMember(m._id, body);
            setRows(list => (list || []).map(x => (x._id === m._id ? { ...x, referral: { ...x.referral, ...body } } : x)));
        } catch (e) {
            toast.error(errorMessage(e, 'Could not update.'));
        }
    };
    const block = (m: Member) => {
        const reason = window.prompt(`Why block ${m.name || m.email} from Refer & Earn? (kept in the audit log)`);
        if (reason) update(m, { blocked: true, blockedReason: reason });
    };

    return (
        <div className="mt-4">
            <form className="flex gap-2" onSubmit={e => { e.preventDefault(); setQuery(search.trim()); }}>
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a user by email, name, phone or code to add them" aria-label="Search users" />
                <Button type="submit" variant="outline"><Search size={16} className="mr-1.5" />Search</Button>
                {query && <Button type="button" variant="ghost" onClick={() => { setSearch(''); setQuery(''); }}>Clear</Button>}
            </form>
            <p className="text-xs text-slate-500 mt-2">{query ? 'Search results. Switch "Pilot access" on to add someone to the core-team pilot.' : 'Everyone on the allowlist, blocked, or with a referral code.'}</p>
            {error ? <ErrorBox message={error} onRetry={load} /> : rows == null ? <div className="h-40 bg-white rounded-xl border border-slate-200 animate-pulse mt-4" /> : rows.length === 0 ? <Empty text="No members found." /> : (
                <div className="overflow-x-auto mt-3 bg-white rounded-xl border border-slate-200">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600 text-left">
                            <tr><th className="p-3">User</th><th className="p-3">Code</th><th className="p-3">Referrals</th><th className="p-3">Available</th><th className="p-3">Pilot access</th><th className="p-3">Status</th><th className="p-3" /></tr>
                        </thead>
                        <tbody>
                            {rows.map(m => (
                                <tr key={m._id} className="border-t border-slate-100">
                                    <td className="p-3"><div className="font-medium text-slate-900">{m.name || '—'}</div><div className="text-slate-500">{m.email || m.phone}</div></td>
                                    <td className="p-3 font-mono">{m.referral.code || '—'}</td>
                                    <td className="p-3">{m.referrals.total} <span className="text-slate-500">({m.referrals.rewarded} rewarded)</span></td>
                                    <td className="p-3">{inr(m.wallet?.availablePaise)}</td>
                                    <td className="p-3"><Switch checked={m.referral.eligible} onCheckedChange={v => update(m, { eligible: v })} aria-label={`Pilot access for ${m.email}`} /></td>
                                    <td className="p-3">
                                        {m.referral.blocked
                                            ? <div><Badge variant="outline" className={STATUS_STYLE.rejected}>Blocked</Badge>{m.referral.blockedReason && <div className="text-xs text-slate-500 mt-1">{m.referral.blockedReason}</div>}</div>
                                            : <Badge variant="outline">{m.role}</Badge>}
                                    </td>
                                    <td className="p-3 whitespace-nowrap text-right">
                                        <Button size="sm" variant="ghost" onClick={() => onWallet(m._id)}><WalletIcon size={15} className="mr-1" />Wallet</Button>
                                        {m.referral.blocked
                                            ? <Button size="sm" variant="outline" onClick={() => update(m, { blocked: false })}>Unblock</Button>
                                            : <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => block(m)}>Block</Button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

// ─── Referrals ───────────────────────────────────────────────────────────────

const REFERRAL_FILTERS = ['review', 'pending', 'on_hold', 'confirmed', 'attributed', 'reversed', 'rejected', ''];
const REASON_LABEL: Record<string, string> = {
    monthly_cap: 'Over monthly reward cap', attribution_velocity: 'Many sign-ups in a day',
    referrer_ineligible: 'Referrer not eligible at purchase', same_phone: 'Same phone as referrer',
};

const Referrals = () => {
    const [status, setStatus] = useState('review');
    const [rows, setRows] = useState<AdminReferral[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(() => {
        setError(null);
        setRows(null);
        listReferrals(status || undefined).then(setRows).catch(e => setError(errorMessage(e, 'Could not load referrals.')));
    }, [status]);
    useEffect(load, [load]);

    const act = async (r: AdminReferral, action: 'approve' | 'reject' | 'reverse') => {
        const note = action === 'approve'
            ? window.prompt('Note (optional)') ?? undefined
            : window.prompt(action === 'reverse' ? 'Why reverse this reward? Any credited amount will be taken back.' : 'Why reject this referral?');
        if (action !== 'approve' && !note) return;
        try {
            await referralAction(r._id, action, note);
            toast.success('Done');
            load();
        } catch (e) {
            toast.error(errorMessage(e, 'Could not update.'));
        }
    };

    return (
        <div className="mt-4">
            <Filters value={status} options={REFERRAL_FILTERS} onChange={setStatus} />
            {error ? <ErrorBox message={error} onRetry={load} /> : rows == null ? <div className="h-40 bg-white rounded-xl border border-slate-200 animate-pulse mt-4" /> : rows.length === 0 ? <Empty text="Nothing here." /> : (
                <ul className="space-y-3 mt-3">
                    {rows.map(r => (
                        <li key={r._id} className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4 flex-wrap items-start">
                            <div className="flex-1 min-w-[260px] text-sm">
                                <div className="flex gap-2 items-center flex-wrap"><StatusBadge status={r.status} /><span className="text-slate-500">code <span className="font-mono">{r.code}</span> · {r.source}</span></div>
                                <div className="mt-2"><span className="text-slate-500">Referrer:</span> <span className="font-medium text-slate-900">{r.referrer?.name}</span> <span className="text-slate-500">{r.referrer?.email || r.referrer?.phone}</span></div>
                                <div><span className="text-slate-500">Referred:</span> <span className="font-medium text-slate-900">{r.referee?.name}</span> <span className="text-slate-500">{r.referee?.email || r.referee?.phone}</span></div>
                                <div className="text-slate-500 mt-1">
                                    Joined {date(r.attributedAt)}
                                    {r.convertedAt && <> · paid {r.planId} {inr(r.paymentAmountPaise)} on {date(r.convertedAt)}</>}
                                    {r.rewardPaise ? <> · reward {inr(r.rewardPaise)}</> : null}
                                    {r.status === 'pending' && r.matureAt && <> · available {date(r.matureAt)}</>}
                                </div>
                                {r.reviewReasons?.length ? (
                                    <div className="mt-1 text-purple-800 flex items-center gap-1.5"><AlertTriangle size={14} />{r.reviewReasons.map(x => REASON_LABEL[x] || x).join(', ')}</div>
                                ) : null}
                                {r.reversalReason && <div className="mt-1 text-red-700">{r.reversalReason}</div>}
                                {r.razorpayPaymentId && <div className="mt-1 text-xs text-slate-400 font-mono">{r.razorpayPaymentId}</div>}
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {r.status === 'review' && <Button size="sm" variant="outline" className="text-emerald-700 border-emerald-200" onClick={() => act(r, 'approve')}><ShieldCheck size={15} className="mr-1" />Approve</Button>}
                                {['review', 'attributed'].includes(r.status) && <Button size="sm" variant="outline" className="text-red-600 border-red-200" onClick={() => act(r, 'reject')}><ShieldX size={15} className="mr-1" />Reject</Button>}
                                {['pending', 'on_hold', 'confirmed'].includes(r.status) && <Button size="sm" variant="outline" className="text-red-600 border-red-200" onClick={() => act(r, 'reverse')}>Reverse reward</Button>}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const Filters = ({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) => (
    <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter by status">
        {options.map(o => (
            <Button key={o || 'all'} size="sm" variant={value === o ? 'default' : 'outline'} className={value === o ? 'bg-indigo-600 hover:bg-indigo-600' : ''} onClick={() => onChange(o)}>
                {o ? o.replace(/_/g, ' ') : 'all'}
            </Button>
        ))}
    </div>
);

// ─── Withdrawals ─────────────────────────────────────────────────────────────

const WITHDRAWAL_FILTERS = ['review', 'approved', 'processing', 'attention', 'processed', 'failed', 'reversed', 'rejected', 'cancelled', ''];

const Withdrawals = ({ onWallet }: { onWallet: (id: string) => void }) => {
    const [status, setStatus] = useState('review');
    const [rows, setRows] = useState<AdminWithdrawal[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(() => {
        setError(null);
        setRows(null);
        listWithdrawals(status || undefined).then(setRows).catch(e => setError(errorMessage(e, 'Could not load withdrawals.')));
    }, [status]);
    useEffect(load, [load]);

    const act = async (w: AdminWithdrawal, action: 'approve' | 'reject' | 'retry') => {
        let note: string | undefined;
        if (action === 'reject') {
            note = window.prompt('Why reject this withdrawal? The amount goes back to their wallet.') || undefined;
            if (!note) return;
        }
        if (action === 'approve' && !window.confirm(`Approve ${inr(w.amountPaise)} to ${w.payoutAccount?.accountMasked || 'their bank'}?`)) return;
        try {
            await withdrawalAction(w._id, action, note);
            toast.success('Done');
            load();
        } catch (e) {
            toast.error(errorMessage(e, 'Could not update.'));
        }
    };

    return (
        <div className="mt-4">
            <Filters value={status} options={WITHDRAWAL_FILTERS} onChange={setStatus} />
            {status === 'attention' && <p className="text-xs text-slate-600 mt-2">Payouts whose create request had no clear answer (timeout or server error). Check the RazorpayX dashboard before retrying; retries reuse the same idempotency key, so they can't pay twice.</p>}
            {error ? <ErrorBox message={error} onRetry={load} /> : rows == null ? <div className="h-40 bg-white rounded-xl border border-slate-200 animate-pulse mt-4" /> : rows.length === 0 ? <Empty text="Nothing here." /> : (
                <ul className="space-y-3 mt-3">
                    {rows.map(w => (
                        <li key={w._id} className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4 flex-wrap items-start">
                            <div className="flex-1 min-w-[260px] text-sm">
                                <div className="flex gap-2 items-center flex-wrap"><span className="text-lg font-bold text-slate-900">{inr(w.amountPaise)}</span><StatusBadge status={w.status} />{w.payoutStatus && <span className="text-xs text-slate-500">RazorpayX: {w.payoutStatus}</span>}</div>
                                <div className="mt-1"><span className="font-medium text-slate-900">{w.user?.name}</span> <span className="text-slate-500">{w.user?.email || w.user?.phone}</span></div>
                                <div className="text-slate-500">
                                    To {w.payoutAccount?.accountMasked || `••${w.accountLast4}`} {w.payoutAccount?.ifsc} · {w.payoutAccount?.accountHolderName}
                                    {w.payoutAccount && !w.payoutAccount.verified && <span className="text-red-700"> · KYC no longer verified</span>}
                                </div>
                                <div className="text-slate-500">Requested {date(w.createdAt)}{w.attempts ? ` · ${w.attempts} attempt(s)` : ''}{w.utr ? ` · UTR ${w.utr}` : ''}</div>
                                {w.payoutId && <div className="text-xs text-slate-400 font-mono">{w.payoutId}</div>}
                                {w.lastError && <div className="text-red-700 mt-1">{w.lastError}</div>}
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <Button size="sm" variant="ghost" onClick={() => onWallet(w.user._id)}><WalletIcon size={15} className="mr-1" />Wallet</Button>
                                {w.status === 'review' && <Button size="sm" variant="outline" className="text-emerald-700 border-emerald-200" onClick={() => act(w, 'approve')}>Approve</Button>}
                                {['review', 'approved'].includes(w.status) && <Button size="sm" variant="outline" className="text-red-600 border-red-200" onClick={() => act(w, 'reject')}>Reject</Button>}
                                {['processing', 'approved'].includes(w.status) && <Button size="sm" variant="outline" onClick={() => act(w, 'retry')}><RefreshCw size={15} className="mr-1" />{w.payoutId ? 'Check status' : 'Retry send'}</Button>}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// ─── Bank & PAN review ───────────────────────────────────────────────────────

const Kyc = () => {
    const [pendingOnly, setPendingOnly] = useState(true);
    const [rows, setRows] = useState<AdminPayoutAccount[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(() => {
        setError(null);
        setRows(null);
        listPayoutAccounts(pendingOnly ? 'pending' : undefined).then(setRows).catch(e => setError(errorMessage(e, 'Could not load bank details.')));
    }, [pendingOnly]);
    useEffect(load, [load]);

    const review = async (a: AdminPayoutAccount, which: 'pan' | 'bank', result: 'verified' | 'failed') => {
        let reason: string | undefined;
        if (result === 'failed') {
            reason = window.prompt(`Why did the ${which === 'pan' ? 'PAN' : 'bank account'} fail? The user sees this.`) || undefined;
            if (!reason) return;
        }
        try {
            await reviewPayoutAccount(a.user._id, { [which]: result, reason });
            toast.success('Saved');
            load();
        } catch (e) {
            toast.error(errorMessage(e, 'Could not save.'));
        }
    };

    return (
        <div className="mt-4">
            <label className="flex items-center gap-2 text-sm text-slate-700"><Switch checked={pendingOnly} onCheckedChange={setPendingOnly} aria-label="Pending only" />Awaiting verification only</label>
            <p className="text-xs text-slate-500 mt-2 max-w-3xl">
                PAN is verified by hand until a PAN verification provider is connected: check that the PAN name matches the account holder and,
                where a penny drop ran, the name the bank returned. Full PAN and account numbers are never shown here.
            </p>
            {error ? <ErrorBox message={error} onRetry={load} /> : rows == null ? <div className="h-40 bg-white rounded-xl border border-slate-200 animate-pulse mt-4" /> : rows.length === 0 ? <Empty text="Nothing awaiting verification." /> : (
                <ul className="space-y-3 mt-3">
                    {rows.map(a => (
                        <li key={a.user?._id} className="bg-white rounded-xl border border-slate-200 p-4 text-sm">
                            <div className="flex gap-2 items-center flex-wrap"><span className="font-medium text-slate-900">{a.user?.name}</span><span className="text-slate-500">{a.user?.email || a.user?.phone}</span>
                                {a.flags.map(f => <Badge key={f} variant="outline" className="bg-red-50 text-red-700 border-red-200">{f === 'pan_shared' ? 'PAN used on another account' : f === 'bank_shared' ? 'Bank account used on another account' : f}</Badge>)}
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3 mt-3">
                                <div className="rounded-lg border border-slate-200 p-3">
                                    <div className="flex items-center justify-between"><span className="font-medium">PAN</span><StatusBadge status={a.panStatus} /></div>
                                    <div className="mt-1 text-slate-700">{a.panMasked} · {a.panName}</div>
                                    {a.panStatus === 'pending' && <div className="flex gap-2 mt-2"><Button size="sm" variant="outline" onClick={() => review(a, 'pan', 'verified')}>Verify</Button><Button size="sm" variant="outline" className="text-red-600" onClick={() => review(a, 'pan', 'failed')}>Fail</Button></div>}
                                </div>
                                <div className="rounded-lg border border-slate-200 p-3">
                                    <div className="flex items-center justify-between"><span className="font-medium">Bank account</span><StatusBadge status={a.bankStatus} /></div>
                                    <div className="mt-1 text-slate-700">{a.accountMasked} · {a.ifsc} · {a.accountHolderName}</div>
                                    {a.bankRegisteredName && <div className="text-slate-500">Bank says: {a.bankRegisteredName}{a.bankVerifiedBy ? ` (${a.bankVerifiedBy.replace('_', ' ')})` : ''}</div>}
                                    {a.bankStatus === 'pending' && <div className="flex gap-2 mt-2"><Button size="sm" variant="outline" onClick={() => review(a, 'bank', 'verified')}>Verify</Button><Button size="sm" variant="outline" className="text-red-600" onClick={() => review(a, 'bank', 'failed')}>Fail</Button></div>}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// ─── Wallet ledger ───────────────────────────────────────────────────────────

const WalletDialog = ({ userId, onClose }: { userId: string | null; onClose: () => void }) => {
    const [data, setData] = useState<{ name: string; balances: Record<string, number>; entries: LedgerEntry[] } | null>(null);
    const [check, setCheck] = useState<{ problems: string[]; cacheMismatch: string[] } | null>(null);
    const [adjust, setAdjust] = useState({ rupees: '', reason: '' });

    const load = useCallback(() => {
        if (!userId) return;
        setData(null);
        setCheck(null);
        getWallet(userId)
            .then(w => setData({ name: w.user?.name || w.user?.email || userId, balances: w.balances as unknown as Record<string, number>, entries: w.entries }))
            .catch(e => toast.error(errorMessage(e, 'Could not load the wallet.')));
    }, [userId]);
    useEffect(load, [load]);

    const reconcile = async () => {
        if (!userId) return;
        try {
            setCheck(await reconcileWallet(userId));
        } catch (e) {
            toast.error(errorMessage(e, 'Reconcile failed.'));
        }
    };

    const submitAdjust = async () => {
        if (!userId) return;
        const paise = Math.round(Number(adjust.rupees) * 100);
        if (!Number.isFinite(paise) || paise === 0) return toast.error('Enter a non-zero amount (negative to debit)');
        if (adjust.reason.trim().length < 5) return toast.error('Give a reason');
        if (!window.confirm(`${paise > 0 ? 'Credit' : 'Debit'} ${inr(Math.abs(paise))} ${paise > 0 ? 'to' : 'from'} this wallet?`)) return;
        try {
            await adjustWallet(userId, { amountPaise: paise, reason: adjust.reason.trim(), requestId: crypto.randomUUID() });
            setAdjust({ rupees: '', reason: '' });
            toast.success('Adjusted');
            load();
        } catch (e) {
            toast.error(errorMessage(e, 'Adjustment failed.'));
        }
    };

    return (
        <Dialog open={userId != null} onOpenChange={o => !o && onClose()}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>Wallet{data ? `: ${data.name}` : ''}</DialogTitle></DialogHeader>
                {!data ? <div className="h-32 bg-slate-50 rounded animate-pulse" /> : (
                    <div className="space-y-4 text-sm">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {(['availablePaise', 'pendingPaise', 'reservedPaise', 'paidOutPaise'] as const).map(k => (
                                <div key={k} className="rounded-lg border border-slate-200 p-2"><div className="text-xs text-slate-500">{k.replace('Paise', '')}</div><div className="font-bold">{inr(data.balances[k])}</div></div>
                            ))}
                        </div>
                        <div className="flex gap-2 items-center flex-wrap">
                            <Button size="sm" variant="outline" onClick={reconcile}>Check ledger consistency</Button>
                            {check && (check.problems.length || check.cacheMismatch.length
                                ? <span className="text-red-700">{[...check.problems, ...check.cacheMismatch.map(m => `cached ${m} was out of date (now fixed)`)].join('; ')}</span>
                                : <span className="text-emerald-700">Ledger is consistent.</span>)}
                        </div>
                        <div className="rounded-lg border border-slate-200 p-3">
                            <div className="font-medium mb-2">Manual adjustment</div>
                            <div className="grid sm:grid-cols-[140px_1fr_auto] gap-2">
                                <Input inputMode="decimal" placeholder="₹ (− to debit)" value={adjust.rupees} onChange={e => setAdjust(a => ({ ...a, rupees: e.target.value }))} aria-label="Amount in rupees" />
                                <Input placeholder="Reason (audit-logged)" value={adjust.reason} onChange={e => setAdjust(a => ({ ...a, reason: e.target.value }))} aria-label="Reason" />
                                <Button size="sm" onClick={submitAdjust}>Apply</Button>
                            </div>
                        </div>
                        <table className="w-full">
                            <thead className="text-left text-slate-500"><tr><th className="py-1">#</th><th>When</th><th>Entry</th><th className="text-right">Available after</th><th className="text-right">Pending after</th></tr></thead>
                            <tbody>
                                {data.entries.map(e => (
                                    <tr key={e._id} className="border-t border-slate-100">
                                        <td className="py-1.5 text-slate-500">{e.seq}</td>
                                        <td className="text-slate-500 whitespace-nowrap pr-2">{date(e.createdAt)}</td>
                                        <td><span className="font-mono text-xs">{e.type}</span> {inr(e.amountPaise)}<div className="text-xs text-slate-500">{e.description}</div></td>
                                        <td className="text-right">{inr(e.balanceAfter.availablePaise)}</td>
                                        <td className="text-right">{inr(e.balanceAfter.pendingPaise)}</td>
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

export default SuperAdminReferrals;
