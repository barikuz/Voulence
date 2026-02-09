'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Briefcase,
    Plus,
    Search,
    Filter,
    MoreVertical,
    ChevronDown,
    ChevronUp,
    Users,
    CheckCircle,
    Clock,
    FileText
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { StatsCard, StatsGrid } from '@/components/features/stats-card';
import { ProposalCard } from '@/components/features/proposal-card';
import {
    mockJobs,
    mockApplications,
    currentUser
} from '@/data/mock-data';
import { formatCurrency, formatRelativeTime, truncateText } from '@/lib/utils';
import { Job, JobApplication } from '@/types';

// Sub-component for individual job item with accordion behavior
function JobAccordionItem({ job, applications }: { job: Job, applications: JobApplication[] }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const statusColors = {
        open: 'success',
        in_progress: 'info',
        pending_review: 'warning',
        completed: 'primary',
        disputed: 'danger',
        cancelled: 'secondary',
        refunded: 'secondary',
    } as const;

    const statusLabels = {
        open: 'Open',
        in_progress: 'In Progress',
        pending_review: 'Under Review',
        completed: 'Completed',
        disputed: 'Disputed',
        cancelled: 'Cancelled',
        refunded: 'Refunded',
    } as const;

    return (
        <Card
            variant="glass"
            padding="none"
            className={`transition-all duration-300 overflow-hidden border-${isExpanded ? 'primary-500/30' : '[rgb(var(--border))]'}`}
        >
            <div
                className={`p-6 cursor-pointer hover:bg-[rgb(var(--secondary))]/30 transition-colors ${isExpanded ? 'bg-[rgb(var(--secondary))]/30' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center shrink-0 border border-white/5`}>
                            <Briefcase className="h-6 w-6 text-primary-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg truncate pr-2">{job.title}</h3>
                                <Badge variant={statusColors[job.status] as any} size="sm" dot>
                                    {statusLabels[job.status]}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-[rgb(var(--muted-foreground))]">
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    Posted {formatRelativeTime(job.createdAt)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Users className="h-3.5 w-3.5" />
                                    {applications.length} Proposal{applications.length !== 1 ? 's' : ''}
                                </span>
                                <span className="font-medium text-[rgb(var(--foreground))]">
                                    {formatCurrency(job.budget, job.currency)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:pl-4 md:border-l md:border-[rgb(var(--border))]">
                        <div className="flex flex-row items-center gap-2 w-full md:w-auto">
                            <Link href={`/jobs/${job.id}/edit`} onClick={(e) => e.stopPropagation()}>
                                <Button variant="outline" size="sm" className="w-full md:w-auto">
                                    Edit
                                </Button>
                            </Link>
                            <Link href={`/jobs/${job.id}`} onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm" className="w-full md:w-auto">
                                    View
                                </Button>
                            </Link>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                            className="p-1 hover:bg-[rgb(var(--secondary))] rounded-full transition-colors"
                        >
                            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                <ChevronDown className="h-5 w-5 text-[rgb(var(--muted-foreground))]" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Accordion Content (Proposals) */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="p-6 pt-0 border-t border-[rgb(var(--border))] bg-[rgb(var(--secondary))]/10">
                        <div className="flex items-center justify-between mb-4 mt-6">
                            <h4 className="font-medium text-sm text-[rgb(var(--muted-foreground))] uppercase tracking-wider">
                                Received Proposals ({applications.length})
                            </h4>
                        </div>

                        {applications.length === 0 ? (
                            <div className="text-center py-8 bg-[rgb(var(--card))] rounded-xl border border-[rgb(var(--border))] border-dashed">
                                <Users className="h-10 w-10 text-[rgb(var(--muted-foreground))] mx-auto mb-3 opacity-50" />
                                <p className="text-[rgb(var(--muted-foreground))]">No proposals received yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {applications.map((app) => (
                                    <ProposalCard
                                        key={app.id}
                                        application={app}
                                        onView={(id) => console.log('View proposal', id)}
                                        onAccept={(id) => console.log('Accept proposal', id)}
                                        onDecline={(id) => console.log('Decline proposal', id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default function MyJobsPage() {
    // Filter jobs for the current user (employer)
    const myJobs = mockJobs.filter(job => job.employer.id === currentUser.id);

    // Calculate stats
    const totalJobs = myJobs.length;
    const activeDetails = myJobs.filter(j => ['open', 'in_progress'].includes(j.status));
    const completedDetails = myJobs.filter(j => j.status === 'completed');
    const totalProposals = myJobs.reduce((acc, job) => {
        return acc + mockApplications.filter(app => app.jobId === job.id).length;
    }, 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">My Jobs</h1>
                    <p className="text-[rgb(var(--muted-foreground))]">
                        Manage your job postings and review proposals.
                    </p>
                </div>
                <Link href="/jobs/create">
                    <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                        Post New Job
                    </Button>
                </Link>
            </div>

            {/* Stats Overview */}
            <StatsGrid columns={4}>
                <StatsCard
                    title="Total Jobs"
                    value={totalJobs}
                    icon={<Briefcase className="h-5 w-5" />}
                    variant="glass"
                />
                <StatsCard
                    title="Active Jobs"
                    value={activeDetails.length}
                    icon={<CheckCircle className="h-5 w-5" />}
                    variant="glass"
                />
                <StatsCard
                    title="Completed"
                    value={completedDetails.length}
                    icon={<Clock className="h-5 w-5" />}
                    variant="glass"
                />
                <StatsCard
                    title="Total Proposals"
                    value={totalProposals}
                    icon={<Users className="h-5 w-5" />}
                    variant="glass"
                />
            </StatsGrid>

            {/* Main Content */}
            <div className="space-y-6">
                <Tabs defaultValue="all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <TabsList variant="pills">
                            <TabsTrigger value="all" variant="pills">All Jobs</TabsTrigger>
                            <TabsTrigger value="active" variant="pills">Active ({activeDetails.length})</TabsTrigger>
                            <TabsTrigger value="completed" variant="pills">Completed</TabsTrigger>
                            <TabsTrigger value="draft" variant="pills">Drafts</TabsTrigger>
                        </TabsList>

                        <div className="flex items-center gap-2">
                            <Input
                                leftIcon={<Search className="h-4 w-4" />}
                                placeholder="Search jobs..."
                                className="w-[200px] h-9 text-sm"
                            />
                            <Button variant="outline" size="sm" className="px-3">
                                <Filter className="h-4 w-4" />
                                <span>Filter</span>
                            </Button>
                        </div>
                    </div>

                    <TabsContent value="all" className="space-y-4">
                        {myJobs.length === 0 ? (
                            <EmptyState />
                        ) : (
                            myJobs.map(job => (
                                <JobAccordionItem
                                    key={job.id}
                                    job={job}
                                    applications={mockApplications.filter(app => app.jobId === job.id)}
                                />
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="active" className="space-y-4">
                        {activeDetails.length === 0 ? (
                            <EmptyState message="No active jobs found." />
                        ) : (
                            activeDetails.map(job => (
                                <JobAccordionItem
                                    key={job.id}
                                    job={job}
                                    applications={mockApplications.filter(app => app.jobId === job.id)}
                                />
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="completed" className="space-y-4">
                        {completedDetails.length === 0 ? (
                            <EmptyState message="No completed jobs yet." />
                        ) : (
                            completedDetails.map(job => (
                                <JobAccordionItem
                                    key={job.id}
                                    job={job}
                                    applications={mockApplications.filter(app => app.jobId === job.id)}
                                />
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="draft" className="space-y-4">
                        <EmptyState message="No draft jobs saved." />
                    </TabsContent>
                </Tabs>
            </div >
        </div >
    );
}

function EmptyState({ message = "No jobs found." }: { message?: string }) {
    return (
        <Card variant="glass" padding="lg" className="text-center py-16 border-dashed">
            <div className="h-16 w-16 rounded-full bg-[rgb(var(--secondary))] flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-[rgb(var(--muted-foreground))]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{message}</h3>
            <p className="text-[rgb(var(--muted-foreground))] mb-6 max-w-sm mx-auto">
                Get started by posting a new job opportunity for our community of freelancers.
            </p>
            <Link href="/jobs/create">
                <Button variant="primary">
                    Post a Job
                </Button>
            </Link>
        </Card>
    );
}
