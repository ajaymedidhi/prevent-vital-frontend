export interface User {
    id: string;
    name?: string;
    email: string;
    role: 'super_admin' | 'admin' | 'corporate_admin' | 'content_creator' | 'customer';
    customerType?: 'individual' | 'corporate';
    tenantId?: string;
    corporateId?: string;
    profile?: {
        firstName?: string;
        lastName?: string;
        gender?: 'male' | 'female' | 'other';
        dateOfBirth?: string;
        phoneNumber?: string;
        bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'Unknown';
        city?: string;
        country?: string;
        height?: number;
        weight?: number;
        bmi?: number;
        avatar?: string;
    };
    corporateProfile?: {
        department?: string;
        employeeId?: string;
        designation?: string;
    };
    privacySettings?: {
        dataSharing: boolean;
        marketingEmails: boolean;
        twoFactorEnabled: boolean;
    };
    subscriptionPlan?: 'free' | 'premium' | 'pro' | 'family';
    isVerified: boolean;
    status: 'active' | 'suspended';
    permissions: string[];
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}
