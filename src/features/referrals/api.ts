import axios from 'axios';
import { store } from '@/store';

// Refer & Earn administration — backend /api/super-admin/referrals/* (referralAdminController.js).
// Money is integer paise; PAN and account numbers only ever arrive masked.

export type RolloutMode = 'CORE_TEAM_ONLY' | 'ALL_ELIGIBLE_USERS';
export type ReferralStatus = 'attributed' | 'pending' | 'on_hold' | 'review' | 'confirmed' | 'reversed' | 'rejected';
export type WithdrawalStatus = 'review' | 'approved' | 'processing' | 'processed' | 'failed' | 'reversed' | 'rejected' | 'cancelled';

export interface ReferralProgram {
    enabled: boolean;
    rolloutMode: RolloutMode;
    currency: string;
    rewardPaise: number;
    minWithdrawalPaise: number;
    maxWithdrawalPaise: number;
    holdDays: number;
    attributionWindowDays: number;
    qualifyingPlans: string[];
    maxRewardsPerReferrerPerMonth: number;
    maxAttributionsPerReferrerPerDay: number;
    withdrawalRequiresApproval: boolean;
    payoutsEnabled: boolean;
    termsVersion: string;
    updatedAt?: string;
}

export interface ProgramSetup {
    razorpayxConfigured: boolean;
    razorpayxWebhookConfigured: boolean;
    kycEncryptionConfigured: boolean;
}

export interface UserSummary { _id: string; name: string; email?: string; phone?: string }

export interface Balances {
    availablePaise: number;
    pendingPaise: number;
    reservedPaise: number;
    paidOutPaise: number;
    lifetimeEarnedPaise?: number;
}

export interface Member extends UserSummary {
    role: string;
    status: string;
    referral: { eligible: boolean; blocked: boolean; blockedReason?: string; code?: string };
    referrals: { total: number; rewarded: number };
    wallet: Balances | null;
}

// Core-team pilot member (GET /team). Balances come from the ledger, not the Wallet cache.
export interface TeamMember extends UserSummary {
    role: string;
    status: string;
    blocked: boolean;
    blockedReason?: string;
    code: string | null;
    shareLink: string | null;
    codeCreatedAt?: string;
    referrals: { total: number; subscribed: number; confirmed: number; lastReferralAt: string | null };
    wallet: Required<Balances>;
}

export interface TeamTotals {
    members: number;
    referrals: number;
    subscribed: number;
    earnedPaise: number;
    pendingPaise: number;
    availablePaise: number;
}

export interface AdminReferral {
    _id: string;
    referrer: UserSummary;
    referee: UserSummary;
    code: string;
    status: ReferralStatus;
    source: string;
    planId?: string;
    rewardPaise?: number;
    paymentAmountPaise?: number;
    razorpayPaymentId?: string;
    attributedAt: string;
    convertedAt?: string;
    matureAt?: string;
    reviewReasons?: string[];
    reversalReason?: string;
    reviewNote?: string;
}

export interface MaskedPayoutAccount {
    panStatus: string;
    panMasked?: string | null;
    panName?: string;
    bankStatus: string;
    accountHolderName?: string;
    accountMasked?: string | null;
    ifsc?: string;
    verified?: boolean;
    submittedAt?: string;
}

export interface AdminWithdrawal {
    _id: string;
    user: UserSummary;
    amountPaise: number;
    status: WithdrawalStatus;
    payoutId?: string;
    payoutStatus?: string;
    utr?: string;
    attempts: number;
    lastError?: string;
    nextAttemptAt?: string;
    accountLast4?: string;
    createdAt: string;
    payoutAccount: MaskedPayoutAccount | null;
}

export interface AdminPayoutAccount extends MaskedPayoutAccount {
    user: UserSummary;
    bankRegisteredName?: string;
    bankVerifiedBy?: string;
    panVerifiedBy?: string;
    flags: string[];
}

export interface LedgerEntry {
    _id: string;
    seq: number;
    type: string;
    amountPaise: number;
    delta: Balances;
    balanceAfter: Balances;
    description?: string;
    createdAt: string;
}

export interface Summary {
    referrals: Partial<Record<ReferralStatus, { count: number; rewardPaise: number }>>;
    withdrawals: Partial<Record<WithdrawalStatus, { count: number; amountPaise: number }>>;
    wallets: Balances | null;
    allowlistedMembers: number;
    kycPending: number;
    payoutsNeedingAttention: number;
}

const BASE = '/api/super-admin/referrals';
const auth = () => ({ headers: { Authorization: `Bearer ${store.getState().auth.token}` } });
export const errorMessage = (e: unknown, fallback: string): string =>
    (axios.isAxiosError(e) && e.response?.data?.message) || fallback;
export const inr = (paise = 0) => `₹${(paise / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

export const getProgram = async (): Promise<{ program: ReferralProgram; setup: ProgramSetup }> =>
    (await axios.get(`${BASE}/program`, auth())).data.data;
export const updateProgram = async (body: Partial<ReferralProgram>): Promise<ReferralProgram> =>
    (await axios.patch(`${BASE}/program`, body, auth())).data.data.program;
export const getSummary = async (): Promise<Summary> => (await axios.get(`${BASE}/summary`, auth())).data.data;

export const listTeam = async (): Promise<{ members: TeamMember[]; totals: TeamTotals; limited: boolean }> =>
    (await axios.get(`${BASE}/team`, auth())).data.data;
// Adds an existing account to the pilot by email and assigns its referral code (also used to
// create a code for a member who hasn't opened Refer & Earn yet).
export const addTeamMember = async (email: string): Promise<{ member: TeamMember; alreadyMember: boolean }> =>
    (await axios.post(`${BASE}/team`, { email }, auth())).data.data;

export const listMembers = async (search = ''): Promise<Member[]> =>
    (await axios.get(`${BASE}/members`, { ...auth(), params: search ? { search } : undefined })).data.data;
export const updateMember = async (userId: string, body: { eligible?: boolean; blocked?: boolean; blockedReason?: string }) =>
    (await axios.patch(`${BASE}/members/${userId}`, body, auth())).data.data;

export const listReferrals = async (status?: string): Promise<AdminReferral[]> =>
    (await axios.get(`${BASE}/list`, { ...auth(), params: status ? { status } : undefined })).data.data;
export const referralAction = async (id: string, action: 'approve' | 'reject' | 'reverse', note?: string) =>
    (await axios.post(`${BASE}/list/${id}/${action}`, { note }, auth())).data.data;

export const listWithdrawals = async (status?: string): Promise<AdminWithdrawal[]> =>
    (await axios.get(`${BASE}/withdrawals`, { ...auth(), params: status ? { status } : undefined })).data.data;
export const withdrawalAction = async (id: string, action: 'approve' | 'reject' | 'retry', note?: string) =>
    (await axios.post(`${BASE}/withdrawals/${id}/${action}`, { note }, auth())).data.data;

export const listPayoutAccounts = async (status?: 'pending'): Promise<AdminPayoutAccount[]> =>
    (await axios.get(`${BASE}/payout-accounts`, { ...auth(), params: status ? { status } : undefined })).data.data;
export const reviewPayoutAccount = async (userId: string, body: { pan?: 'verified' | 'failed'; bank?: 'verified' | 'failed'; reason?: string }) =>
    (await axios.post(`${BASE}/payout-accounts/${userId}/review`, body, auth())).data.data;

export const getWallet = async (userId: string): Promise<{ user: UserSummary; balances: Balances; entries: LedgerEntry[] }> =>
    (await axios.get(`${BASE}/wallets/${userId}`, auth())).data.data;
export const reconcileWallet = async (userId: string): Promise<{ balances: Balances; entries: number; problems: string[]; cacheMismatch: string[] }> =>
    (await axios.post(`${BASE}/wallets/${userId}/reconcile`, {}, auth())).data.data;
export const adjustWallet = async (userId: string, body: { amountPaise: number; reason: string; requestId: string }) =>
    (await axios.post(`${BASE}/wallets/${userId}/adjust`, body, auth())).data.data;

export const runJobs = async () => (await axios.post(`${BASE}/jobs/run`, {}, auth())).data.data;
