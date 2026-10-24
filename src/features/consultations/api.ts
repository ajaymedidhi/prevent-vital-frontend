import axios from 'axios';
import { store } from '@/store';

// Expert side of live consultations — backend /api/consultations/* (consultationController.js).

export type JoinState = 'too_early' | 'open' | 'ended';
export type ConsultationStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show';

export interface AvailabilityWindow {
    dayOfWeek: number; // 0 = Sunday, IST
    start: string;     // "HH:MM" IST
    end: string;
}

export type ExpertType = 'doctor' | 'nutritionist' | 'coach' | 'other';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface ExpertProfile {
    _id: string;
    expertType: ExpertType;
    displayName: string;
    title?: string;
    specialty?: string;
    qualifications?: string;
    registration?: { council?: string; number?: string };
    bio?: string[];
    languages?: string[];
    photoUrl?: string;
    slotMinutes: number;
    availability: AvailabilityWindow[];
    isActive: boolean;
    verification: { status: VerificationStatus; verifiedAt?: string; note?: string };
}

// Super-admin listing row.
export interface AdminExpert extends ExpertProfile {
    user: { _id: string; email: string; profile?: { firstName?: string; lastName?: string } };
    upcomingCount: number;
    createdAt: string;
}

export type ExpertProfileInput = Partial<Pick<ExpertProfile,
    'expertType' | 'displayName' | 'title' | 'specialty' | 'qualifications' | 'registration' | 'bio' | 'languages' | 'photoUrl'>>;

export type VitalType = 'blood_pressure' | 'heart_rate' | 'blood_glucose' | 'spo2' | 'weight'
    | 'body_temperature' | 'respiratory_rate' | 'steps' | 'calories' | 'distance';

export interface VitalReading {
    vitalType: VitalType;
    value: number | string | { systolic?: number; diastolic?: number; [k: string]: unknown };
    unit: string;
    status: 'normal' | 'warning' | 'critical';
    timestamp: string;
    source: 'manual' | 'google_fit' | 'apple_health' | 'device';
}

// Only present when the patient's share switch covered vitals (app wording from 2026-10-11).
export interface SharedVitals {
    from: string;
    to: string;
    latest: VitalReading[];
    readings: VitalReading[]; // newest first, at most 300
}

export interface HealthSummary {
    vitalScore: number | null;
    ascvdRisk: number | null;
    vascularAge: number | null;
    age: number | null;
    gender: string | null;
    healthGoals: string[];
    vitals?: SharedVitals | null;
}

export interface ExpertConsultation {
    _id: string;
    date: string;
    durationMinutes: number;
    status: ConsultationStatus;
    notes?: string;
    expertNotes?: string;
    shareHealthSummary?: boolean;
    cancelledBy?: string;
    patient: { _id: string; name: string; age?: number | null }; // age only for doctors
    healthSummary?: HealthSummary | null;
    joinState: JoinState;
}

export interface JoinInfo {
    url: string;
    token: string;
    roomName: string;
    startsAt: string;
    endsAt: string;
}

const auth = () => ({ headers: { Authorization: `Bearer ${store.getState().auth.token}` } });
export const errorMessage = (e: any, fallback: string) => e?.response?.data?.message || fallback;

export const getMyExpertProfile = async (): Promise<ExpertProfile> =>
    (await axios.get('/api/consultations/expert/profile', auth())).data.data.expert;

export const updateMyAvailability = async (body: { availability?: AvailabilityWindow[]; slotMinutes?: number }): Promise<ExpertProfile> =>
    (await axios.patch('/api/consultations/expert/profile', body, auth())).data.data.expert;

export const getSchedule = async (range: 'upcoming' | 'past'): Promise<ExpertConsultation[]> =>
    (await axios.get(`/api/consultations/expert/schedule?range=${range}`, auth())).data.data.consultations;

export const getConsultation = async (id: string): Promise<ExpertConsultation> =>
    (await axios.get(`/api/consultations/expert/${id}`, auth())).data.data.consultation;

export const joinCall = async (id: string): Promise<JoinInfo> =>
    (await axios.post(`/api/consultations/${id}/join`, {}, auth())).data.data;

export const completeConsultation = async (id: string, expertNotes: string) =>
    (await axios.post(`/api/consultations/${id}/complete`, { expertNotes }, auth())).data.data.consultation;

export const markNoShow = async (id: string) =>
    (await axios.post(`/api/consultations/${id}/no-show`, {}, auth())).data.data.consultation;

export const cancelConsultation = async (id: string, reason?: string) =>
    (await axios.post(`/api/consultations/${id}/cancel`, { reason }, auth())).data.data.consultation;

// Same rule as the backend: the room opens 10 min early and closes 15 min after the end.
export const canJoinNow = (c: Pick<ExpertConsultation, 'date' | 'durationMinutes' | 'status'>, now = Date.now()) => {
    const start = new Date(c.date).getTime();
    return c.status === 'scheduled' && now >= start - 10 * 60000 && now <= start + (c.durationMinutes + 15) * 60000;
};

export const fmtDateTime = (iso: string) =>
    new Date(iso).toLocaleString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });

// ── Super admin: expert management (/api/super-admin/experts) ──

export const adminListExperts = async (): Promise<AdminExpert[]> =>
    (await axios.get('/api/super-admin/experts', auth())).data.data.experts;

export const adminCreateExpert = async (body: ExpertProfileInput & { email: string }): Promise<AdminExpert> =>
    (await axios.post('/api/super-admin/experts', body, auth())).data.data.expert;

export const adminUpdateExpert = async (id: string, body: ExpertProfileInput): Promise<{ expert: AdminExpert; message?: string }> => {
    const r = (await axios.patch(`/api/super-admin/experts/${id}`, body, auth())).data;
    return { expert: r.data.expert, message: r.message };
};

export const adminSetVerification = async (id: string, status: VerificationStatus, note?: string) =>
    (await axios.post(`/api/super-admin/experts/${id}/verification`, { status, note }, auth())).data.data as { expert: AdminExpert; upcomingCount: number };

export const adminSetActive = async (id: string, isActive: boolean) =>
    (await axios.patch(`/api/super-admin/experts/${id}/active`, { isActive }, auth())).data.data as { expert: AdminExpert; upcomingCount: number };
