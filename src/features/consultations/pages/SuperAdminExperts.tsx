import { useEffect, useState } from 'react';
import { Plus, Pencil, ShieldCheck, ShieldX, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    AdminExpert, ExpertProfileInput, ExpertType, adminCreateExpert, adminListExperts, adminSetActive,
    adminSetVerification, adminUpdateExpert, errorMessage,
} from '../api';

// Super-admin console for consultation experts: onboard (by the account's email), edit
// profile and credentials, verify/reject, activate/deactivate. Only active + verified
// experts appear in the app.

const TYPE_LABEL: Record<ExpertType, string> = { doctor: 'Doctor', nutritionist: 'Nutritionist', coach: 'Coach', other: 'Other' };
const STATUS_STYLE = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
};

interface FormState {
    email: string;
    expertType: ExpertType;
    displayName: string;
    title: string;
    specialty: string;
    qualifications: string;
    council: string;
    regNumber: string;
    photoUrl: string;
    bio: string;       // paragraphs separated by a blank line
    languages: string; // comma-separated
}

const EMPTY: FormState = {
    email: '', expertType: 'nutritionist', displayName: '', title: '', specialty: '', qualifications: '',
    council: '', regNumber: '', photoUrl: '', bio: '', languages: '',
};

const toForm = (e: AdminExpert): FormState => ({
    email: e.user?.email || '',
    expertType: e.expertType,
    displayName: e.displayName || '',
    title: e.title || '',
    specialty: e.specialty || '',
    qualifications: e.qualifications || '',
    council: e.registration?.council || '',
    regNumber: e.registration?.number || '',
    photoUrl: e.photoUrl || '',
    bio: (e.bio || []).join('\n\n'),
    languages: (e.languages || []).join(', '),
});

const toInput = (f: FormState): ExpertProfileInput => ({
    expertType: f.expertType,
    displayName: f.displayName,
    title: f.title,
    specialty: f.specialty,
    qualifications: f.qualifications,
    registration: { council: f.council, number: f.regNumber },
    photoUrl: f.photoUrl,
    bio: f.bio.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean),
    languages: f.languages.split(',').map(l => l.trim()).filter(Boolean),
});

const SuperAdminExperts = () => {
    const [experts, setExperts] = useState<AdminExpert[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [editing, setEditing] = useState<AdminExpert | 'new' | null>(null);
    const [form, setForm] = useState<FormState>(EMPTY);
    const [saving, setSaving] = useState(false);

    const load = () => {
        setError(null);
        adminListExperts().then(setExperts).catch(e => setError(errorMessage(e, 'Could not load experts.')));
    };
    useEffect(load, []);

    const replace = (e: AdminExpert, upcomingCount?: number) =>
        setExperts(list => (list || []).map(x => (x._id === e._id ? { ...e, upcomingCount: upcomingCount ?? x.upcomingCount } : x)));

    const openNew = () => { setForm(EMPTY); setEditing('new'); };
    const openEdit = (e: AdminExpert) => { setForm(toForm(e)); setEditing(e); };
    const set = (k: keyof FormState) => (v: string) => setForm(f => ({ ...f, [k]: v }));

    const save = async () => {
        setSaving(true);
        try {
            if (editing === 'new') {
                const created = await adminCreateExpert({ ...toInput(form), email: form.email });
                setExperts(list => [{ ...created, upcomingCount: 0 }, ...(list || [])]);
                toast.success('Expert added as pending. Verify them when their details are checked.');
            } else if (editing) {
                const { expert, message } = await adminUpdateExpert(editing._id, toInput(form));
                replace(expert);
                toast.success(message || 'Expert updated');
            }
            setEditing(null);
        } catch (e) {
            toast.error(errorMessage(e, 'Could not save.'));
        } finally {
            setSaving(false);
        }
    };

    const verify = async (e: AdminExpert) => {
        try {
            const r = await adminSetVerification(e._id, 'verified');
            replace(r.expert, r.upcomingCount);
            toast.success(`${e.displayName} is verified${e.isActive ? ' and bookable' : ''}`);
        } catch (err) {
            toast.error(errorMessage(err, 'Could not verify.'));
        }
    };

    const reject = async (e: AdminExpert) => {
        const note = window.prompt(`Reason for rejecting ${e.displayName}? (kept on their profile)`);
        if (!note) return;
        try {
            const r = await adminSetVerification(e._id, 'rejected', note);
            replace(r.expert, r.upcomingCount);
            if (r.upcomingCount) toast(`${r.upcomingCount} upcoming booking(s) remain with this expert.`, { icon: '⚠️' });
        } catch (err) {
            toast.error(errorMessage(err, 'Could not reject.'));
        }
    };

    const toggleActive = async (e: AdminExpert, isActive: boolean) => {
        try {
            const r = await adminSetActive(e._id, isActive);
            replace(r.expert, r.upcomingCount);
            if (!isActive && r.upcomingCount) {
                toast(`Hidden from the app. ${r.upcomingCount} upcoming booking(s) remain; they can still take place or be cancelled.`, { icon: '⚠️', duration: 6000 });
            }
        } catch (err) {
            toast.error(errorMessage(err, 'Could not update.'));
        }
    };

    const isDoctor = form.expertType === 'doctor';
    const canSave = form.displayName.trim() && (editing !== 'new' || form.email.trim());

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Consultation experts</h1>
                    <p className="text-slate-600 mt-1 text-sm max-w-2xl">
                        Patients can only see and book experts who are <strong>verified</strong> and <strong>active</strong>.
                        Doctors need qualifications and a medical council registration number before they can be verified.
                        To add someone, they first sign up with their email, then add them here.
                    </p>
                </div>
                <Button onClick={openNew} className="bg-indigo-600 hover:bg-indigo-700"><Plus size={16} className="mr-1.5" />Add expert</Button>
            </div>

            {error ? (
                <div className="bg-white border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-700 mb-3">{error}</p>
                    <Button variant="outline" onClick={load}><RefreshCw size={16} className="mr-2" />Try again</Button>
                </div>
            ) : experts == null ? (
                <div className="h-48 bg-white rounded-xl border border-slate-200 animate-pulse" />
            ) : experts.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500">No experts yet.</div>
            ) : (
                <ul className="space-y-3">
                    {experts.map(e => {
                        const status = e.verification?.status || 'pending';
                        const bookable = status === 'verified' && e.isActive;
                        return (
                            <li key={e._id} className="bg-white rounded-xl border border-slate-200 p-4 flex gap-4 items-start flex-wrap">
                                {e.photoUrl
                                    ? <img src={e.photoUrl} alt="" className="w-14 h-14 rounded-xl object-cover object-top bg-slate-100" />
                                    : <div className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center">{e.displayName.slice(0, 2).toUpperCase()}</div>}
                                <div className="flex-1 min-w-[220px]">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-slate-900">{e.displayName}</span>
                                        <Badge variant="outline">{TYPE_LABEL[e.expertType] || e.expertType}</Badge>
                                        <Badge variant="outline" className={STATUS_STYLE[status]}>{status[0].toUpperCase() + status.slice(1)}</Badge>
                                        {bookable && <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Bookable</Badge>}
                                    </div>
                                    <div className="text-sm text-slate-600 mt-1">{e.user?.email}</div>
                                    {(e.qualifications || e.registration?.number) && (
                                        <div className="text-sm text-slate-500 mt-0.5">
                                            {[e.qualifications, e.registration?.number && `Reg. ${e.registration.number}${e.registration.council ? ` (${e.registration.council})` : ''}`].filter(Boolean).join(' · ')}
                                        </div>
                                    )}
                                    {status === 'rejected' && e.verification?.note && (
                                        <div className="text-sm text-red-600 mt-1">Rejected: {e.verification.note}</div>
                                    )}
                                    <div className="text-xs text-slate-400 mt-1">{e.upcomingCount} upcoming booking{e.upcomingCount === 1 ? '' : 's'}</div>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {status !== 'verified' && (
                                        <Button size="sm" variant="outline" className="text-emerald-700 border-emerald-200 hover:bg-emerald-50" onClick={() => verify(e)}>
                                            <ShieldCheck size={15} className="mr-1" />Verify
                                        </Button>
                                    )}
                                    {status !== 'rejected' && (
                                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => reject(e)}>
                                            <ShieldX size={15} className="mr-1" />Reject
                                        </Button>
                                    )}
                                    <Button size="sm" variant="outline" onClick={() => openEdit(e)}><Pencil size={15} className="mr-1" />Edit</Button>
                                    <label className="flex items-center gap-2 text-sm text-slate-600 pl-1">
                                        <Switch checked={e.isActive} onCheckedChange={v => toggleActive(e, v)} aria-label="Active" />
                                        Active
                                    </label>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            <Dialog open={editing != null} onOpenChange={o => !o && setEditing(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editing === 'new' ? 'Add expert' : `Edit ${editing?.displayName ?? ''}`}</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {editing === 'new' && (
                            <div className="sm:col-span-2">
                                <Label htmlFor="ex-email">Account email</Label>
                                <Input id="ex-email" type="email" value={form.email} onChange={e => set('email')(e.target.value)} placeholder="The email they signed up with" />
                            </div>
                        )}
                        <div>
                            <Label htmlFor="ex-type">Type</Label>
                            <select id="ex-type" value={form.expertType} onChange={e => set('expertType')(e.target.value)} className="w-full h-10 border border-input rounded-md px-3 bg-background text-sm">
                                {Object.entries(TYPE_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="ex-name">Display name</Label>
                            <Input id="ex-name" value={form.displayName} onChange={e => set('displayName')(e.target.value)} placeholder="Dr. Rakesh Kumar" />
                        </div>
                        <div>
                            <Label htmlFor="ex-spec">Badge</Label>
                            <Input id="ex-spec" value={form.specialty} onChange={e => set('specialty')(e.target.value)} placeholder="Cardiologist" />
                        </div>
                        <div>
                            <Label htmlFor="ex-title">Title</Label>
                            <Input id="ex-title" value={form.title} onChange={e => set('title')(e.target.value)} placeholder="Senior Interventional Cardiologist" />
                        </div>
                        <div className="sm:col-span-2">
                            <Label htmlFor="ex-qual">Qualifications{isDoctor && ' *'}</Label>
                            <Input id="ex-qual" value={form.qualifications} onChange={e => set('qualifications')(e.target.value)} placeholder="MBBS, MD, DNB (Cardiology)" />
                        </div>
                        {isDoctor && (
                            <>
                                <div>
                                    <Label htmlFor="ex-council">Medical council *</Label>
                                    <Input id="ex-council" value={form.council} onChange={e => set('council')(e.target.value)} placeholder="Telangana State Medical Council" />
                                </div>
                                <div>
                                    <Label htmlFor="ex-reg">Registration number *</Label>
                                    <Input id="ex-reg" value={form.regNumber} onChange={e => set('regNumber')(e.target.value)} />
                                </div>
                                <p className="sm:col-span-2 text-xs text-slate-500 -mt-2">
                                    Check this number on the council's register (or the NMC Indian Medical Register) before verifying. It is shown to patients.
                                </p>
                            </>
                        )}
                        <div className="sm:col-span-2">
                            <Label htmlFor="ex-photo">Photo URL</Label>
                            <Input id="ex-photo" value={form.photoUrl} onChange={e => set('photoUrl')(e.target.value)} placeholder="https://…" />
                        </div>
                        <div className="sm:col-span-2">
                            <Label htmlFor="ex-bio">Bio</Label>
                            <Textarea id="ex-bio" rows={6} value={form.bio} onChange={e => set('bio')(e.target.value)} placeholder="Separate paragraphs with a blank line." />
                        </div>
                        <div className="sm:col-span-2">
                            <Label htmlFor="ex-lang">Languages</Label>
                            <Input id="ex-lang" value={form.languages} onChange={e => set('languages')(e.target.value)} placeholder="English, Telugu, Hindi" />
                        </div>
                    </div>
                    {editing && editing !== 'new' && editing.verification?.status === 'verified' && (
                        <p className="text-xs text-amber-700 bg-amber-50 rounded-md p-2">
                            Changing type, qualifications or registration sends this expert back to pending, and they'll be hidden from the app until re-verified.
                        </p>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                        <Button onClick={save} disabled={saving || !canSave} className="bg-indigo-600 hover:bg-indigo-700">
                            {saving ? 'Saving…' : editing === 'new' ? 'Add as pending' : 'Save'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SuperAdminExperts;
