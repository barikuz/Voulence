'use client';

import Link from 'next/link';
import { Clock, DollarSign, Users, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { cn, formatCurrency, formatRelativeTime, truncateText } from '@/lib/utils';
import { Job, JobStatus } from '@/types';

interface JobCardProps {
    job: Job;
    variant?: 'default' | 'compact';
}

const statusConfig: Record<JobStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' }> = {
    open: { label: 'Open', variant: 'success' },
    in_progress: { label: 'In Progress', variant: 'info' },
    pending_review: { label: 'Pending Review', variant: 'warning' },
    completed: { label: 'Completed', variant: 'primary' },
    disputed: { label: 'Disputed', variant: 'danger' },
    cancelled: { label: 'Cancelled', variant: 'secondary' },
    refunded: { label: 'Refunded', variant: 'secondary' },
};

export function JobCard({ job, variant = 'default' }: JobCardProps) {
    const status = statusConfig[job.status];

    if (variant === 'compact') {
        return (
            <Link href={`/jobs/${job.id}`} className="block">
                <Card
                    variant="default"
                    hoverable
                    padding="md"
                    className="group"
                >
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate group-hover:text-primary-500 transition-colors">
                                {job.title}
                            </h3>
                            <p className="text-sm text-[rgb(var(--muted-foreground))]">
                                {formatCurrency(job.budget, job.currency)}
                            </p>
                        </div>
                        <Badge variant={status.variant} dot>
                            {status.label}
                        </Badge>
                    </div>
                </Card>
            </Link>
        );
    }

    return (
        <Link href={`/jobs/${job.id}`}>
            <Card
                variant="glass"
                hoverable
                padding="lg"
                className="group h-full flex flex-col"
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                        <Badge variant={status.variant} dot pulse={job.status === 'open'} className="mb-2">
                            {status.label}
                        </Badge>
                        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary-500 transition-colors">
                            {job.title}
                        </h3>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[rgb(var(--muted-foreground))] line-clamp-2 mb-4 flex-1">
                    {truncateText(job.description, 130)}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 3).map((skill) => (
                        <span
                            key={skill}
                            className="text-xs px-2 py-1 rounded-full bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]"
                        >
                            {skill}
                        </span>
                    ))}
                    {job.skills.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-[rgb(var(--secondary))] text-[rgb(var(--muted-foreground))]">
                            +{job.skills.length - 3}
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-[rgb(var(--border))] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-sm">
                            <DollarSign className="h-4 w-4 text-primary-500" />
                            <span className="font-semibold">{formatCurrency(job.budget, job.currency)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))]">
                            <Clock className="h-4 w-4" />
                            <span>{formatRelativeTime(job.createdAt)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))]">
                        <Users className="h-4 w-4" />
                        <span>{job.applicantsCount}</span>
                    </div>
                </div>

                {/* Employer Info */}
                <div className="mt-4 pt-4 border-t border-[rgb(var(--border))] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar
                            src={job.employer.avatar}
                            fallback={job.employer.name}
                            size="sm"
                        />
                        <div>
                            <p className="text-sm font-medium">{job.employer.name}</p>
                            <p className="text-xs text-[rgb(var(--muted-foreground))]">
                                ⭐ {job.employer.rating} · {job.employer.completedJobs} jobs
                            </p>
                        </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[rgb(var(--muted-foreground))] group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>
            </Card>
        </Link>
    );
}
