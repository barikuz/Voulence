'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Clock,
    DollarSign,
    Calendar,
    Users,
    MapPin,
    Star,
    Share2,
    Heart,
    Flag,
    Send,
    CheckCircle,
    AlertTriangle,
    ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Modal, ModalFooter } from '@/components/ui/modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { mockJobs, mockApplications, currentUser } from '@/data/mock-data';
import { formatCurrency, formatDate, formatRelativeTime, truncateAddress } from '@/lib/utils';
import { JobStatus } from '@/types';

const statusConfig: Record<JobStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' }> = {
    open: { label: 'Open for Applications', variant: 'success' },
    in_progress: { label: 'In Progress', variant: 'info' },
    pending_review: { label: 'Pending Review', variant: 'warning' },
    completed: { label: 'Completed', variant: 'primary' },
    disputed: { label: 'Disputed', variant: 'danger' },
    cancelled: { label: 'Cancelled', variant: 'secondary' },
    refunded: { label: 'Refunded', variant: 'secondary' },
};

export default function JobDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [proposal, setProposal] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const job = mockJobs.find((j) => j.id === params.id);
    const jobApplications = mockApplications.filter((a) => a.jobId === params.id);

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card variant="glass" padding="lg" className="text-center max-w-md">
                    <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Job Not Found</h2>
                    <p className="text-[rgb(var(--muted-foreground))] mb-4">
                        The job you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <Link href="/jobs">
                        <Button>Browse Jobs</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    const status = statusConfig[job.status];

    const handleApply = async () => {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsApplyModalOpen(false);
        setProposal('');
        setBidAmount('');
        // Show success message
    };

    return (
        <div className="min-h-screen py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                    className="mb-6"
                >
                    Back to Jobs
                </Button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Header */}
                        <Card variant="glass" padding="lg">
                            <div className="flex flex-wrap gap-3 mb-4">
                                <Badge variant={status.variant} dot pulse={job.status === 'open'}>
                                    {status.label}
                                </Badge>
                                <Badge variant="secondary">
                                    {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                                </Badge>
                            </div>

                            <h1 className="text-2xl lg:text-3xl font-bold mb-4">{job.title}</h1>

                            <div className="flex flex-wrap gap-6 text-sm text-[rgb(var(--muted-foreground))]">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>Posted {formatRelativeTime(job.createdAt)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Deadline: {formatDate(job.deadline)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>{job.applicantsCount} applicants</span>
                                </div>
                            </div>
                        </Card>

                        {/* Job Details Tabs */}
                        <Card variant="glass" padding="lg">
                            <Tabs defaultValue="description">
                                <TabsList variant="underline" className="mb-6">
                                    <TabsTrigger value="description" variant="underline">
                                        Description
                                    </TabsTrigger>
                                    <TabsTrigger value="skills" variant="underline">
                                        Skills Required
                                    </TabsTrigger>
                                    {job.status !== 'open' && job.freelancer && (
                                        <TabsTrigger value="progress" variant="underline">
                                            Progress
                                        </TabsTrigger>
                                    )}
                                </TabsList>

                                <TabsContent value="description">
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-[rgb(var(--foreground))] whitespace-pre-wrap">
                                            {job.description}
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="skills">
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills.map((skill) => (
                                            <Badge key={skill} variant="secondary" size="lg">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </TabsContent>

                                {job.freelancer && (
                                    <TabsContent value="progress">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <Avatar src={job.freelancer.avatar} fallback={job.freelancer.name} size="lg" />
                                                <div>
                                                    <p className="font-medium">{job.freelancer.name}</p>
                                                    <p className="text-sm text-[rgb(var(--muted-foreground))]">
                                                        Assigned Freelancer
                                                    </p>
                                                </div>
                                            </div>
                                            {job.escrowAddress && (
                                                <div className="p-4 rounded-xl bg-[rgb(var(--secondary))]">
                                                    <p className="text-sm text-[rgb(var(--muted-foreground))] mb-1">
                                                        Escrow Contract
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <code className="text-sm">{truncateAddress(job.escrowAddress, 8)}</code>
                                                        <a
                                                            href={`https://stellar.expert/explorer/public/contract/${job.escrowAddress}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary-500 hover:text-primary-400"
                                                        >
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>
                                )}
                            </Tabs>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Budget Card */}
                        <Card variant="gradient" padding="lg">
                            <div className="text-center mb-6">
                                <p className="text-sm text-[rgb(var(--muted-foreground))] mb-1">Budget</p>
                                <p className="text-4xl font-bold gradient-primary-text">
                                    {formatCurrency(job.budget, job.currency)}
                                </p>
                            </div>

                            {job.status === 'open' && (
                                <div className="space-y-3">
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                        onClick={() => setIsApplyModalOpen(true)}
                                    >
                                        Apply for this Job
                                    </Button>
                                    <Button
                                        variant={isSaved ? 'secondary' : 'outline'}
                                        className="w-full"
                                        onClick={() => setIsSaved(!isSaved)}
                                        leftIcon={<Heart className={isSaved ? 'fill-current' : ''} />}
                                    >
                                        {isSaved ? 'Saved' : 'Save Job'}
                                    </Button>
                                </div>
                            )}

                            <div className="mt-6 pt-6 border-t border-[rgb(var(--border))] flex justify-center gap-4">
                                <Button variant="ghost" size="sm">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <Flag className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>

                        {/* Employer Card */}
                        <Card variant="glass" padding="lg">
                            <h3 className="font-semibold mb-4">About the Employer</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar src={job.employer.avatar} fallback={job.employer.name} size="lg" />
                                <div>
                                    <p className="font-medium">{job.employer.name}</p>
                                    <p className="text-sm text-[rgb(var(--muted-foreground))]">
                                        @{job.employer.username}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[rgb(var(--muted-foreground))]">Rating</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        <span className="font-medium">{job.employer.rating}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[rgb(var(--muted-foreground))]">Jobs Posted</span>
                                    <span className="font-medium">{job.employer.completedJobs}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[rgb(var(--muted-foreground))]">Member Since</span>
                                    <span className="font-medium">{formatDate(job.employer.joinedAt)}</span>
                                </div>
                                {job.employer.location && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-[rgb(var(--muted-foreground))]">Location</span>
                                        <span className="font-medium flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {job.employer.location}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <Link href={`/profile/${job.employer.username}`}>
                                <Button variant="outline" className="w-full mt-4">
                                    View Profile
                                </Button>
                            </Link>
                        </Card>

                        {/* Escrow Info */}
                        <Card variant="glass" padding="md">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">Secure Escrow Payment</p>
                                    <p className="text-xs text-[rgb(var(--muted-foreground))]">
                                        Funds are locked in a smart contract until work is approved
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            <Modal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                title="Apply for this Job"
                description="Submit your proposal and bid amount"
                size="lg"
                variant="glass"
            >
                <div className="space-y-4">
                    <Textarea
                        label="Your Proposal"
                        placeholder="Describe your experience, approach, and why you're the best fit for this job..."
                        value={proposal}
                        onChange={(e) => setProposal(e.target.value)}
                        className="min-h-[150px]"
                    />
                    <Input
                        label="Your Bid Amount (XLM)"
                        type="number"
                        placeholder={`Budget: ${job.budget} XLM`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        hint="You can bid lower or higher than the budget"
                    />
                </div>
                <ModalFooter>
                    <Button variant="ghost" onClick={() => setIsApplyModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleApply}
                        isLoading={isSubmitting}
                        disabled={!proposal.trim() || !bidAmount}
                        leftIcon={<Send className="h-4 w-4" />}
                    >
                        Submit Application
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
