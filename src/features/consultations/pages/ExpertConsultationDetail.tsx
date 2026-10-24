import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Video, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    ExpertConsultation, canJoinNow, cancelConsultation, completeConsultation, errorMessage,
    fmtDateTime, getConsultation, markNoShow,
} from '../api';
import SharedVitalsSection from '../components/SharedVitalsSection';

const GOAL_LABELS: Record<string, string> = {
    heart_health: 'Heart health', blood_pressure: 'Blood pressure', cholesterol: 'Cholesterol',
    diabetes_risk: 'Diabetes risk', healthy_weight: 'Healthy weight', physical_activity: 'Physical activity',
    sleep: 'Sleep', stress: 'Stress', nutrition: 'Nutrition', deaddiction: 'Smoking / alcohol',
    understand_health: 'Understand my health',
};

const Stat = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-slate-50 rounded-lg p-3">
        <div className="text-xs font-semibold text-slate-500 uppercase">{label}</div>
        <div className="text-lg font-bold text-slate-900 mt-0.5">{value}</div>
    </div>
);

const ExpertConsultationDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [c, setC] = useState<ExpertConsultation | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [notes, setNotes] = useState('');
    const [saving, setSaving] = useState(false);

    const load = () => getConsultation(id!)
        .then(data => { setC(data); setNotes(data.expertNotes || ''); })
        .catch(e => setError(errorMessage(e, 'Could not load this consultation.')));
    useEffect(() => { load(); }, [id]);

    if (error) return <div className="bg-white border border-red-200 rounded-xl p-6 text-red-700">{error}</div>;
    if (!c) return <div className="h-64 bg-white rounded-xl border border-slate-200 animate-pulse" />;

    const started = new Date(c.date).getTime() <= Date.now();
    const joinable = canJoinNow(c);
    const hs = c.healthSummary;

    const run = async (fn: () => Promise<unknown>, done: string) => {
        setSaving(true);
        try {
            await fn();
            toast.success(done);
            await load();
        } catch (e) {
            toast.error(errorMessage(e, 'Something went wrong.'));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-5">
            <Link to="/expert/schedule" className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900">
                <ArrowLeft size={16} /> Schedule
            </Link>

            <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-[220px]">
                    <h1 className="text-2xl font-bold text-slate-900">
                        {c.patient.name}{c.patient.age != null && <span className="text-slate-500 font-medium">, {c.patient.age} yrs</span>}
                    </h1>
                    <p className="text-slate-600 mt-1">{fmtDateTime(c.date)} IST · {c.durationMinutes} min video call</p>
                    <p className="text-sm text-slate-500 mt-1 capitalize">Status: {c.status.replace('_', '-')}</p>
                </div>
                {joinable && (
                    <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                        <Link to={`/expert/consultations/${c._id}/call`}><Video size={18} className="mr-2" />Join call</Link>
                    </Button>
                )}
                {c.status === 'scheduled' && !started && (
                    <Button
                        variant="outline"
                        disabled={saving}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => {
                            if (window.confirm('Cancel this consultation? The patient will see it as cancelled and the slot is returned to their allowance.')) {
                                run(() => cancelConsultation(c._id), 'Consultation cancelled');
                            }
                        }}
                    >
                        Cancel
                    </Button>
                )}
            </div>

            <section className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="font-semibold text-slate-900 mb-2">What the patient wants to discuss</h2>
                <p className="text-slate-700 whitespace-pre-wrap">{c.notes || <span className="text-slate-400">No note left.</span>}</p>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="font-semibold text-slate-900 mb-3">Health summary</h2>
                {hs ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <Stat label="VITAL Score" value={hs.vitalScore != null ? `${Math.round(hs.vitalScore)}/100` : '—'} />
                            <Stat label="10-yr ASCVD risk" value={hs.ascvdRisk != null ? `${hs.ascvdRisk.toFixed(1)}%` : '—'} />
                            <Stat label="Vascular age" value={hs.vascularAge != null ? `${Math.round(hs.vascularAge)}` : '—'} />
                            <Stat label="Age / gender" value={[hs.age ?? '—', hs.gender ?? '—'].join(' / ')} />
                        </div>
                        {hs.healthGoals.length > 0 && (
                            <p className="text-sm text-slate-600 mt-3">
                                Focus: {hs.healthGoals.map(g => GOAL_LABELS[g] || g).join(', ')}
                            </p>
                        )}
                    </>
                ) : (
                    <p className="flex items-center gap-2 text-slate-500 text-sm">
                        <Lock size={14} /> The patient chose not to share their health summary for this consultation.
                    </p>
                )}
            </section>

            {hs && (
                <section className="bg-white rounded-xl border border-slate-200 p-5">
                    <h2 className="font-semibold text-slate-900 mb-3">Vitals</h2>
                    {hs.vitals ? (
                        <SharedVitalsSection vitals={hs.vitals} />
                    ) : (
                        <p className="flex items-center gap-2 text-slate-500 text-sm">
                            <Lock size={14} /> This booking was made before patients could share vitals, so only the summary above is shared.
                        </p>
                    )}
                </section>
            )}

            {started && c.status !== 'cancelled' && (
                <section className="bg-white rounded-xl border border-slate-200 p-5">
                    <h2 className="font-semibold text-slate-900 mb-1">Notes for the patient</h2>
                    <p className="text-sm text-slate-500 mb-3">The patient sees these in the app after you save. Keep to guidance; this is not a prescription.</p>
                    <Textarea value={notes} onChange={e => setNotes(e.target.value)} rows={6} maxLength={4000} placeholder="Key advice, next steps, follow-up…" />
                    <div className="flex gap-2 mt-3 flex-wrap">
                        <Button disabled={saving} onClick={() => run(() => completeConsultation(c._id, notes), c.status === 'completed' ? 'Notes updated' : 'Marked as completed')}>
                            {c.status === 'completed' ? 'Update notes' : 'Save notes & mark completed'}
                        </Button>
                        {c.status === 'scheduled' && (
                            <Button variant="outline" disabled={saving} onClick={() => run(() => markNoShow(c._id), 'Marked as no-show')}>
                                Patient didn't join
                            </Button>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ExpertConsultationDetail;
