import { useState } from 'react';
import { SharedVitals, VitalReading, VitalType } from '../api';

// Vitals the patient logged in the 90 days before the call, shown only when they shared them at booking.

const LABELS: Record<VitalType, string> = {
    blood_pressure: 'Blood pressure', heart_rate: 'Heart rate', blood_glucose: 'Blood sugar', spo2: 'SpO₂',
    weight: 'Weight', body_temperature: 'Temperature', respiratory_rate: 'Respiratory rate',
    steps: 'Steps', calories: 'Calories', distance: 'Distance',
};
const SOURCE: Record<VitalReading['source'], string> = {
    manual: 'Logged by patient', google_fit: 'Google Fit', apple_health: 'Apple Health', device: 'Device',
};
const STATUS_STYLE: Record<VitalReading['status'], string> = {
    normal: 'text-slate-900',
    warning: 'text-amber-700',
    critical: 'text-red-700',
};

export const formatVital = (r: Pick<VitalReading, 'value' | 'unit'>) => {
    const v = r.value;
    if (v && typeof v === 'object') {
        if (v.systolic != null && v.diastolic != null) return `${v.systolic}/${v.diastolic} ${r.unit}`;
        return Object.entries(v).map(([k, x]) => `${k}: ${x}`).join(', ');
    }
    return `${v} ${r.unit}`;
};

const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });

const SharedVitalsSection = ({ vitals }: { vitals: SharedVitals }) => {
    const types = vitals.latest.map(r => r.vitalType);
    const [type, setType] = useState<VitalType | null>(types[0] ?? null);

    if (vitals.readings.length === 0) {
        return <p className="text-sm text-slate-500">No vitals logged in the 90 days before this consultation.</p>;
    }
    const rows = vitals.readings.filter(r => r.vitalType === type);

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {vitals.latest.map(r => (
                    <button
                        key={r.vitalType}
                        onClick={() => setType(r.vitalType)}
                        className={`text-left rounded-lg p-3 border ${type === r.vitalType ? 'border-indigo-300 bg-indigo-50' : 'border-transparent bg-slate-50 hover:bg-slate-100'}`}
                    >
                        <div className="text-xs font-semibold text-slate-500 uppercase">{LABELS[r.vitalType] || r.vitalType}</div>
                        <div className={`text-lg font-bold mt-0.5 ${STATUS_STYLE[r.status]}`}>{formatVital(r)}</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                            {fmtDate(r.timestamp)}{r.status !== 'normal' && <span className={`ml-1 font-semibold ${STATUS_STYLE[r.status]}`}>· {r.status}</span>}
                        </div>
                    </button>
                ))}
            </div>

            {type && (
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                        <caption className="text-left font-medium text-slate-800 mb-2">
                            {LABELS[type]} history ({rows.length} reading{rows.length === 1 ? '' : 's'})
                        </caption>
                        <thead>
                            <tr className="text-left text-xs uppercase text-slate-500 border-b border-slate-200">
                                <th className="py-2 pr-4 font-semibold">When (IST)</th>
                                <th className="py-2 pr-4 font-semibold">Reading</th>
                                <th className="py-2 pr-4 font-semibold">Status</th>
                                <th className="py-2 font-semibold">Source</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rows.map((r, i) => (
                                <tr key={i}>
                                    <td className="py-2 pr-4 text-slate-600 whitespace-nowrap">{fmtDate(r.timestamp)}</td>
                                    <td className={`py-2 pr-4 font-medium whitespace-nowrap ${STATUS_STYLE[r.status]}`}>{formatVital(r)}</td>
                                    <td className={`py-2 pr-4 capitalize ${STATUS_STYLE[r.status]}`}>{r.status}</td>
                                    <td className="py-2 text-slate-500 whitespace-nowrap">{SOURCE[r.source] || r.source}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <p className="text-xs text-slate-400 mt-3">
                Readings from {fmtDate(vitals.from)} to {fmtDate(vitals.to)}. Patient-logged and wearable readings are not clinically verified.
            </p>
        </div>
    );
};

export default SharedVitalsSection;
