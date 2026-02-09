// Job Types
export type JobStatus =
    | 'open'
    | 'in_progress'
    | 'pending_review'
    | 'completed'
    | 'disputed'
    | 'cancelled'
    | 'refunded';

export type JobCategory =
    | 'development'
    | 'design'
    | 'writing'
    | 'marketing'
    | 'video'
    | 'audio'
    | 'translation'
    | 'consulting'
    | 'other';

export interface Job {
    id: string;
    title: string;
    description: string;
    category: JobCategory;
    budget: number;
    currency: string;
    deadline: string;
    createdAt: string;
    status: JobStatus;
    employer: User;
    freelancer?: User;
    skills: string[];
    escrowAddress?: string;
    applicantsCount: number;
}

// User Types
export type UserRole = 'employer' | 'freelancer' | 'referee';

export interface User {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    walletAddress?: string;
    role: UserRole;
    rating: number;
    completedJobs: number;
    joinedAt: string;
    bio?: string;
    skills?: string[];
    location?: string;
}

// Transaction Types
export type TransactionType =
    | 'escrow_deposit'
    | 'payment_release'
    | 'refund'
    | 'dispute_resolution';

export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
    id: string;
    type: TransactionType;
    status: TransactionStatus;
    amount: number;
    currency: string;
    from: string;
    to: string;
    jobId: string;
    jobTitle: string;
    createdAt: string;
    txHash?: string;
}

// Dispute Types
export type DisputeStatus = 'open' | 'under_review' | 'resolved' | 'escalated';

export type DisputeResolution =
    | 'employer_favor'
    | 'freelancer_favor'
    | 'split'
    | 'pending';

export interface Dispute {
    id: string;
    jobId: string;
    jobTitle: string;
    employer: User;
    freelancer: User;
    referee?: User;
    status: DisputeStatus;
    resolution: DisputeResolution;
    reason: string;
    employerEvidence?: string;
    freelancerEvidence?: string;
    amount: number;
    currency: string;
    createdAt: string;
    resolvedAt?: string;
}

// Wallet Types
export interface WalletState {
    isConnected: boolean;
    address: string | null;
    balance: number;
    isConnecting: boolean;
    error: string | null;
}

// Application Types
export interface JobApplication {
    id: string;
    jobId: string;
    freelancer: User;
    proposal: string;
    bidAmount: number;
    deliveryTime: number;
    createdAt: string;
    status: 'pending' | 'accepted' | 'rejected';
}

// Notification Types
export type NotificationType =
    | 'job_application'
    | 'job_accepted'
    | 'payment_received'
    | 'dispute_opened'
    | 'dispute_resolved'
    | 'deadline_reminder';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    link?: string;
}
