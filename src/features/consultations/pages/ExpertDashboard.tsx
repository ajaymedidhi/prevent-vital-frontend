import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Video, ChevronRight, RefreshCw, CalendarClock, CalendarDays, ClipboardEdit, CheckCircle2,
    ShieldCheck, ShieldAlert, Clock, Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ExpertConsultation, ExpertProfile, canJoinNow, errorMessage, fmtDateTime, getMyExpertProfile, getSchedule,
} from '../api';

// Landing page for /expert: what's next, today's calls, and calls still waiting for notes.
// Built from the same endpoints as Schedule/Availability; no extra patient data is exposed here.

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MIN = 60000;

const istDay = (t: string | number) => new Date(t).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
const fmtTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });
const endOf = (c: ExpertConsultation) => new Date(c.date).getTime() + c.durationMinutes * MIN;

const startsIn = (c: ExpertConsultation, now: number) => {
    const diff = new Date(c.date).getTime() - now;
    if (diff <= 0) return now < endOf(c) ? 'In progress' : 'Time has passed';
    const mins = Math.ceil(diff / MIN);
    if (mins < 60) return `Starts in ${mins} min`;
    const h = Math.floor(mins / 60);
    if (h < 24) return `Starts in ${h} h${mins % 60 ? ` ${mins % 60} min` : ''}`;
    return `Starts in ${Math.round(h / 24)} day${Math.round(h / 24) === 1 ? '' : 's'}`;
};

const Stat = ({ icon: Icon, label, value, tone }: { icon: typeof Clock; label: string; value: number; tone: string }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tone}`}><Icon size={20} /></div>
        <div>
            <div className="text-2xl font-bold text-slate-900 leading-none">{value}</div>
            <div className="text-xs text-slate-500 mt-1">{label}</div>
        </div>
    </div>
);

const Row = ({ c, now, hint }: { c: ExpertConsultation; now: number; hint?: string }) => {
    const joinable = canJoinNow(c, now);
    return (
        <li className="flex items-center gap-3 py-3">
            <div className="w-16 text-sm font-semibold text-slate-700 flex-shrink-0">{fmtTime(c.date)}</div>
            <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-900 truncate">
                    {c.patient.name}{c.patient.age != null && `, ${c.patient.age}`}
                </div>
                <div className="text-xs text-slate-500">
                    {hint ?? `${c.durationMinutes} min`}{c.shareHealthSummary ? ' · Health summary shared' : ''}
                </div>
            </div>
            {joinable && (
                <Button asChild size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    <Link to={`/expert/consultations/${c._id}/call`}><Video size={14} className="mr-1.5" />Join</Link>
                </Button>
            )}
            <Link to={`/expert/consultations/${c._id}`} className="p-1.5 text-slate-400 hover:text-slate-700" aria-label="Open details">
                <ChevronRight size={18} />
            </Link>
        </li>
    );
};

const ExpertDashboard = () => {
    const [profile, setProfile] = useState<ExpertProfile | null>(null);
    const [upcoming, setUpcoming] = useState<ExpertConsultation[] | null>(null);
    const [past, setPast] = useState<ExpertConsultation[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [now, setNow] = useState(Date.now());

    const load = () => {
        setError(null);
        Promise.all([getMyExpertProfile(), getSchedule('upcoming'), getSchedule('past')])
            .then(([p, u, pa]) => { setProfile(p); setUpcoming(u); setPast(pa); })
            .catch(e => setError(errorMessage(e, 'Could not load your dashboard.')));
    };
    useEffect(load, []);

    // Same cadence as Schedule: tick the clock and pick up new bookings every minute.
    useEffect(() => {
        const t = setInterval(() => {
            setNow(Date.now());
            getSchedule('upcoming').then(setUpcoming).catch(() => {});
        }, MIN);
        return () => clearInterval(t);
    }, []);

    if (error) {
        return (
            <div className="bg-white border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-700 mb-3">{error}</p>
                <Button variant="outline" onClick={load}><RefreshCw size={16} className="mr-2" />Try again</Button>
            </div>
        );
    }
    if (!profile || !upcoming || !past) {
        return (
            <div className="space-y-4">
                <div className="h-8 w-64 bg-slate-200 rounded animate-pulse" />
                <div className="h-40 bg-white rounded-xl border border-slate-200 animate-pulse" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map(i => <div key={i} className="h-20 bg-white rounded-xl border border-slate-200 animate-pulse" />)}
                </div>
            </div>
        );
    }

    const today = istDay(now);
    const weekAhead = now + 7 * 24 * 60 * MIN;
    const scheduled = upcoming.filter(c => c.status === 'scheduled');
    const next = scheduled.find(c => endOf(c) + 15 * MIN > now) || null;
    const todays = upcoming.filter(c => istDay(c.date) === today);
    const thisWeek = scheduled.filter(c => new Date(c.date).getTime() <= weekAhead && new Date(c.date).getTime() >= now);
    // Calls that have ended but are still "scheduled": the expert owes notes or a no-show.
    const awaitingNotes = [...upcoming, ...past]
        .filter(c => c.status === 'scheduled' && endOf(c) < now)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const monthKey = today.slice(0, 7);
    const completedThisMonth = [...upcoming, ...past]
        .filter(c => c.status === 'completed' && istDay(c.date).startsWith(monthKey)).length;

    const verified = profile.verification?.status === 'verified' && profile.isActive;
    const weeklyMinutes = profile.availability.reduce((sum, w) => {
        const [sh, sm] = w.start.split(':').map(Number);
        const [eh, em] = w.end.split(':').map(Number);
        return sum + Math.max(0, eh * 60 + em - (sh * 60 + sm));
    }, 0);
    const activeDays = [1, 2, 3, 4, 5, 6, 0].filter(d => profile.availability.some(w => w.dayOfWeek === d));
    const greetingHour = Number(new Date(now).toLocaleString('en-IN', { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' }));
    const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening';

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">{greeting}, {profile.displayName}</h1>
                <p className="text-slate-600 mt-1">
                    {todays.length === 0 ? 'No consultations today.' : `${todays.length} consultation${todays.length === 1 ? '' : 's'} today.`}
                    {' '}Times are India Standard Time.
                </p>
            </div>

            {/* Next consultation */}
            {next ? (
                <section className={`rounded-xl border p-5 ${canJoinNow(next, now) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200'}`}>
                    <div className={`text-xs font-semibold uppercase tracking-wide ${canJoinNow(next, now) ? 'text-indigo-100' : 'text-indigo-600'}`}>
                        Next consultation · {startsIn(next, now)}
                    </div>
                    <div className="mt-2 flex items-start gap-4 flex-wrap">
                        <div className="flex-1 min-w-[220px]">
                            <div className="text-xl font-bold">
                                {next.patient.name}{next.patient.age != null && `, ${next.patient.age} yrs`}
                            </div>
                            <div className={`text-sm mt-0.5 ${canJoinNow(next, now) ? 'text-indigo-100' : 'text-slate-600'}`}>
                                {fmtDateTime(next.date)} · {next.durationMinutes} min video call
                            </div>
                            <div className={`text-sm mt-3 ${canJoinNow(next, now) ? 'text-white' : 'text-slate-700'}`}>
                                {next.notes ? <>“{next.notes.length > 180 ? `${next.notes.slice(0, 180)}…` : next.notes}”</> : <span className="opacity-70">No note from the patient.</span>}
                            </div>
                            <div className={`text-xs mt-2 flex items-center gap-1.5 ${canJoinNow(next, now) ? 'text-indigo-100' : 'text-slate-500'}`}>
                                {next.shareHealthSummary ? <ShieldCheck size={14} /> : <Lock size={14} />}
                                {next.shareHealthSummary ? 'Health summary shared — review it before the call' : 'Health summary not shared'}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {canJoinNow(next, now) ? (
                                <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50">
                                    <Link to={`/expert/consultations/${next._id}/call`}><Video size={18} className="mr-2" />Join call</Link>
                                </Button>
                            ) : (
                                <span className="text-xs text-slate-500 self-center">Join opens 10 min before</span>
                            )}
                            <Button asChild size="lg" variant="outline" className={canJoinNow(next, now) ? 'bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white' : ''}>
                                <Link to={`/expert/consultations/${next._id}`}>Prepare</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="bg-white rounded-xl border border-slate-200 p-6 text-slate-600">
                    No upcoming consultations.{' '}
                    {verified
                        ? 'Patients book from the PreventVital app using your weekly availability.'
                        : 'Patients can book you once your profile is verified and active.'}
                </section>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Stat icon={CalendarClock} label="Today" value={todays.length} tone="bg-indigo-50 text-indigo-600" />
                <Stat icon={CalendarDays} label="Next 7 days" value={thisWeek.length} tone="bg-sky-50 text-sky-600" />
                <Stat icon={ClipboardEdit} label="Awaiting notes" value={awaitingNotes.length} tone={awaitingNotes.length ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'} />
                <Stat icon={CheckCircle2} label="Completed this month" value={completedThisMonth} tone="bg-emerald-50 text-emerald-600" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex items-center justify-between mb-1">
                            <h2 className="font-semibold text-slate-900">Today</h2>
                            <Link to="/expert/schedule" className="text-sm font-medium text-indigo-700 hover:underline">Full schedule</Link>
                        </div>
                        {todays.length === 0 ? (
                            <p className="text-sm text-slate-500 py-3">Nothing booked for today.</p>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {todays.map(c => (
                                    <Row key={c._id} c={c} now={now} hint={c.status === 'scheduled' ? undefined : c.status === 'no_show' ? 'No-show' : 'Completed'} />
                                ))}
                            </ul>
                        )}
                    </section>

                    {awaitingNotes.length > 0 && (
                        <section className="bg-white rounded-xl border border-amber-200 p-5">
                            <h2 className="font-semibold text-slate-900">Awaiting notes</h2>
                            <p className="text-sm text-slate-500">These calls have ended. Add notes for the patient, or mark them as a no-show.</p>
                            <ul className="divide-y divide-slate-100 mt-1">
                                {awaitingNotes.slice(0, 5).map(c => <Row key={c._id} c={c} now={now} hint={fmtDateTime(c.date)} />)}
                            </ul>
                        </section>
                    )}
                </div>

                <section className="bg-white rounded-xl border border-slate-200 p-5 h-fit">
                    <div className="flex items-center gap-3">
                        {profile.photoUrl ? (
                            <img src={profile.photoUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                                {profile.displayName.charAt(0)}
                            </div>
                        )}
                        <div className="min-w-0">
                            <div className="font-semibold text-slate-900 truncate">{profile.displayName}</div>
                            <div className="text-sm text-slate-500 truncate">{profile.title || profile.specialty || profile.expertType}</div>
                        </div>
                    </div>
                    <div className="mt-4">
                        {verified ? (
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200"><ShieldCheck size={12} className="mr-1" />Verified · bookable</Badge>
                        ) : (
                            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200"><ShieldAlert size={12} className="mr-1" />Not bookable yet</Badge>
                        )}
                    </div>
                    <dl className="mt-4 space-y-2 text-sm">
                        <div className="flex justify-between gap-2"><dt className="text-slate-500">Consultation length</dt><dd className="font-medium text-slate-900">{profile.slotMinutes} min</dd></div>
                        <div className="flex justify-between gap-2"><dt className="text-slate-500">Weekly hours</dt><dd className="font-medium text-slate-900">{Math.round(weeklyMinutes / 6) / 10} h</dd></div>
                        <div className="flex justify-between gap-2"><dt className="text-slate-500">Days</dt><dd className="font-medium text-slate-900 text-right">{activeDays.length ? activeDays.map(d => DAYS_SHORT[d]).join(', ') : '—'}</dd></div>
                    </dl>
                    {profile.availability.length === 0 && (
                        <p className="text-sm text-amber-800 bg-amber-50 rounded-lg p-3 mt-4">You haven't set any hours, so patients have no slots to book.</p>
                    )}
                    <Button asChild variant="outline" className="w-full mt-4">
                        <Link to="/expert/availability"><Clock size={16} className="mr-2" />Edit availability</Link>
                    </Button>
                </section>
            </div>
        </div>
    );
};

export default ExpertDashboard;
