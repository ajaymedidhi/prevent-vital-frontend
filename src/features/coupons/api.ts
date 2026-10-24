import axios from 'axios';
import { store } from '@/store';

// Subscription coupon administration — backend /api/super-admin/coupons/* (couponAdminController.js).
// Amounts are in rupees here (the backend stores paise). Dates are India-time calendar days;
// validUntil is the last day the code works.

export type CouponAudience = 'everyone' | 'allowlist';

export interface CouponForm {
    code: string;
    description: string;
    discountType: 'flat' | 'percent';
    amountRupees: number | null;
    percent: number | null;
    maxDiscountRupees: number | null;
    audience: CouponAudience;
    perUserLimit: number | null; // null = unlimited
    maxRedemptions: number | null; // null = no total cap
    startsOn: string | null; // YYYY-MM-DD
    validUntil: string | null; // YYYY-MM-DD, inclusive
    isActive: boolean;
}

export interface AdminCoupon extends CouponForm {
    id: string;
    allowedEmails: string[];
    emailsWithoutAccount: string[];
    redemptionCount: number;
    inCheckoutNow: number;
    createdAt: string;
    updatedAt: string;
}

export interface CouponRedemptionRow {
    id: string;
    status: 'redeemed' | 'reserved' | 'expired';
    discountPaise: number;
    at: string;
    user?: { email: string; name: string };
    orderId?: string;
    amountPaise?: number;
}

const BASE = '/api/super-admin/coupons';
const auth = () => ({ headers: { Authorization: `Bearer ${store.getState().auth.token}` } });
export const errorMessage = (e: unknown, fallback: string): string =>
    (axios.isAxiosError(e) && e.response?.data?.message) || fallback;

export const listCoupons = async (): Promise<AdminCoupon[]> => (await axios.get(BASE, auth())).data.data;
export const createCoupon = async (body: CouponForm): Promise<AdminCoupon> => (await axios.post(BASE, body, auth())).data.data;
export const updateCoupon = async (id: string, body: Partial<CouponForm>): Promise<AdminCoupon> =>
    (await axios.patch(`${BASE}/${id}`, body, auth())).data.data;
export const deleteCoupon = async (id: string): Promise<void> => { await axios.delete(`${BASE}/${id}`, auth()); };
export const addCouponMember = async (id: string, email: string): Promise<AdminCoupon> =>
    (await axios.post(`${BASE}/${id}/members`, { email }, auth())).data.data;
export const removeCouponMember = async (id: string, email: string): Promise<AdminCoupon> =>
    (await axios.delete(`${BASE}/${id}/members/${encodeURIComponent(email)}`, auth())).data.data;
export const listCouponRedemptions = async (id: string): Promise<CouponRedemptionRow[]> =>
    (await axios.get(`${BASE}/${id}/redemptions`, auth())).data.data;
