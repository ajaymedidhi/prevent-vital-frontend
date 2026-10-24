import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { AvailabilityWindow, ExpertProfile, errorMessage, getMyExpertProfile, updateMyAvailability } from '../api';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ORDER = [1, 2, 3, 4, 5, 6, 0]; // show Monday first
const SLOT_OPTIONS = [15, 20, 30, 45, 60];

const ExpertAvailability = () => {
    const [profile, setProfile] = useState<ExpertProfile | null>(null);
    const [windows, setWindows] = useState<AvailabilityWindow[]>([]);
    const [slotMinutes, setSlotMinutes] = useState(30);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getMyExpertProfile()
            .then(p => { setProfile(p); setWindows(p.availability); setSlotMinutes(p.slotMinutes); })
            .catch(e => setError(errorMessage(e, 'Could not load your profile.')));
    }, []);

    const update = (idx: number, patch: Partial<AvailabilityWindow>) =>
        setWindows(ws => ws.map((w, i) => (i === idx ? { ...w, ...patch } : w)));
    const remove = (idx: number) => setWindows(ws => ws.filter((_, i) => i !== idx));
    const add = (dayOfWeek: number) => setWindows(ws => [...ws, { dayOfWeek, start: '10:00', end: '13:00' }]);

    const save = async () => {
        setSaving(true);
        try {
            const p = await updateMyAvailability({ availability: windows, slotMinutes });
            setProfile(p);
            setWindows(p.availability);
            toast.success('Availability saved');
        } catch (e) {
            toast.error(errorMessage(e, 'Could not save availability.'));
        } finally {
            setSaving(false);
        }
    };

    if (error) return <div className="bg-white border border-red-200 rounded-xl p-6 text-red-700">{error}</div>;
    if (!profile) return <div className="h-96 bg-white rounded-xl border border-slate-200 animate-pulse" />;

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Weekly availability</h1>
            <p className="text-slate-600 mt-1 mb-5">
                Times are India Standard Time. Patients can book these slots up to two weeks ahead, at least an hour in advance.
                Changing this doesn't affect consultations already booked.
            </p>

            <div className="bg-white rounded-xl border border-slate-200 p-5 mb-4 flex items-center gap-3 flex-wrap">
                <label htmlFor="slot" className="font-medium text-slate-800">Consultation length</label>
                <select
                    id="slot"
                    value={slotMinutes}
                    onChange={e => setSlotMinutes(Number(e.target.value))}
                    className="border border-slate-300 rounded-lg px-3 py-2 bg-white"
                >
                    {SLOT_OPTIONS.map(m => <option key={m} value={m}>{m} minutes</option>)}
                </select>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
                {ORDER.map(day => {
                    const dayWindows = windows.map((w, i) => ({ w, i })).filter(({ w }) => w.dayOfWeek === day);
                    return (
                        <div key={day} className="p-4 flex gap-4 flex-wrap items-start">
                            <div className="w-28 font-medium text-slate-800 pt-2">{DAYS[day]}</div>
                            <div className="flex-1 space-y-2 min-w-[240px]">
                                {dayWindows.length === 0 && <div className="text-slate-400 text-sm pt-2">Unavailable</div>}
                                {dayWindows.map(({ w, i }) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <input
                                            type="time"
                                            value={w.start}
                                            onChange={e => update(i, { start: e.target.value })}
                                            className="border border-slate-300 rounded-lg px-2 py-1.5"
                                            aria-label={`${DAYS[day]} start time`}
                                        />
                                        <span className="text-slate-400">to</span>
                                        <input
                                            type="time"
                                            value={w.end}
                                            onChange={e => update(i, { end: e.target.value })}
                                            className="border border-slate-300 rounded-lg px-2 py-1.5"
                                            aria-label={`${DAYS[day]} end time`}
                                        />
                                        <button onClick={() => remove(i)} className="p-2 text-slate-400 hover:text-red-600" aria-label="Remove time range">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => add(day)} className="text-indigo-700">
                                <Plus size={16} className="mr-1" /> Add hours
                            </Button>
                        </div>
                    );
                })}
            </div>

            <div className="mt-5 flex justify-end">
                <Button onClick={save} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700">
                    {saving ? 'Saving…' : 'Save availability'}
                </Button>
            </div>
        </div>
    );
};

export default ExpertAvailability;
