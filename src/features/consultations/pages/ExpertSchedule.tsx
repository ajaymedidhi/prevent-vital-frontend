import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, ChevronRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExpertConsultation, canJoinNow, errorMessage, fmtDateTime, getSchedule } from '../api';

const STATUS_STYLE: Record<string, string> = {
    scheduled: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
    no_show: 'bg-slate-100 text-slate-600 border-slate-200',
};
const STATUS_LABEL: Record<string, string> = { scheduled: 'Scheduled', completed: 'Completed', cancelled: 'Cancelled', no_show: 'No-show' };

const ExpertSchedule = () => {
    const [range, setRange] = useState<'upcoming' | 'past'>('upcoming');
    const [items, setItems] = useState<ExpertConsultation[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [now, setNow] = useState(Date.now());

    const load = () => {
        setError(null);
        setItems(null);
        getSchedule(range).then(setItems).catch(e => setError(errorMessage(e, 'Could not load your schedule.')));
    };
    useEffect(load, [range]);

    // Refresh the list every minute so new bookings and Join buttons appear without reloading.
    useEffect(() => {
        const t = setInterval(() => {
            setNow(Date.now());
            if (range === 'upcoming') getSchedule('upcoming').then(setItems).catch(() => {});
        }, 60000);
        return () => clearInterval(t);
    }, [range]);

    return (
        <div>
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-900">Your consultations</h1>
                <Tabs value={range} onValueChange={v => setRange(v as 'upcoming' | 'past')}>
                    <TabsList>
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">Past</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {error ? (
                <div className="bg-white border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-700 mb-3">{error}</p>
                    <Button variant="outline" onClick={load}><RefreshCw size={16} className="mr-2" />Try again</Button>
                </div>
            ) : items == null ? (
                <div className="space-y-3">
                    {[0, 1, 2].map(i => <div key={i} className="h-20 bg-white rounded-xl border border-slate-200 animate-pulse" />)}
                </div>
            ) : items.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500">
                    {range === 'upcoming'
                        ? 'No upcoming consultations. Patients book from the PreventVital app using your availability.'
                        : 'No past consultations yet.'}
                </div>
            ) : (
                <ul className="space-y-3">
                    {items.map(c => {
                        const joinable = canJoinNow(c, now);
                        return (
                            <li key={c._id} className={`bg-white rounded-xl border p-4 flex items-center gap-4 ${joinable ? 'border-indigo-300 ring-2 ring-indigo-100' : 'border-slate-200'}`}>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-slate-900">{c.patient.name}{c.patient.age != null && `, ${c.patient.age}`}</span>
                                        <Badge variant="outline" className={STATUS_STYLE[c.status]}>{STATUS_LABEL[c.status]}</Badge>
                                        {c.shareHealthSummary && <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">Health summary shared</Badge>}
                                    </div>
                                    <div className="text-sm text-slate-600 mt-1">{fmtDateTime(c.date)} · {c.durationMinutes} min</div>
                                    {c.notes && <div className="text-sm text-slate-500 mt-1 truncate">“{c.notes}”</div>}
                                </div>
                                {joinable && (
                                    <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                                        <Link to={`/expert/consultations/${c._id}/call`}><Video size={16} className="mr-2" />Join</Link>
                                    </Button>
                                )}
                                <Link to={`/expert/consultations/${c._id}`} className="p-2 text-slate-400 hover:text-slate-700" aria-label="Open details">
                                    <ChevronRight size={20} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default ExpertSchedule;
