'use client';

import { useState } from 'react';
import {
    AlertTriangle,
    MessageSquare,
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    Scale,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import { Dispute, DisputeStatus, DisputeResolution } from '@/types';

interface DisputePanelProps {
    dispute: Dispute;
    userRole?: 'employer' | 'freelancer' | 'referee';
}

const statusConfig: Record<DisputeStatus, { label: string; variant: 'warning' | 'info' | 'success' | 'danger'; icon: typeof AlertTriangle }> = {
    open: { label: 'Open', variant: 'warning', icon: AlertTriangle },
    under_review: { label: 'Under Review', variant: 'info', icon: Clock },
    resolved: { label: 'Resolved', variant: 'success', icon: CheckCircle },
    escalated: { label: 'Escalated', variant: 'danger', icon: Scale },
};

const resolutionConfig: Record<DisputeResolution, { label: string; color: string }> = {
    employer_favor: { label: 'In favor of Employer', color: 'text-blue-500' },
    freelancer_favor: { label: 'In favor of Freelancer', color: 'text-emerald-500' },
    split: { label: 'Split Decision', color: 'text-amber-500' },
    pending: { label: 'Pending Decision', color: 'text-[rgb(var(--muted-foreground))]' },
};

export function DisputePanel({ dispute, userRole = 'employer' }: DisputePanelProps) {
    const [newEvidence, setNewEvidence] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const status = statusConfig[dispute.status];
    const StatusIcon = status.icon;
    const resolution = resolutionConfig[dispute.resolution];

    const handleSubmitEvidence = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setNewEvidence('');
    };

    return (
        <Card variant="glass" padding="none" className="overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[rgb(var(--border))]">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <StatusIcon className={cn('h-5 w-5', `text-${status.variant === 'warning' ? 'amber' : status.variant === 'info' ? 'blue' : status.variant === 'success' ? 'emerald' : 'red'}-500`)} />
                            <Badge variant={status.variant} dot pulse={dispute.status === 'open'}>
                                {status.label}
                            </Badge>
                        </div>
                        <h2 className="text-xl font-semibold mb-1">
                            Dispute: {dispute.jobTitle}
                        </h2>
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">
                            Opened on {formatDate(dispute.createdAt)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">Amount in Dispute</p>
                        <p className="text-2xl font-bold gradient-primary-text">
                            {formatCurrency(dispute.amount, dispute.currency)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <Tabs defaultValue="details">
                    <TabsList variant="underline" className="mb-6">
                        <TabsTrigger value="details" variant="underline">
                            Details
                        </TabsTrigger>
                        <TabsTrigger value="evidence" variant="underline">
                            Evidence
                        </TabsTrigger>
                        <TabsTrigger value="resolution" variant="underline">
                            Resolution
                        </TabsTrigger>
                    </TabsList>

                    {/* Details Tab */}
                    <TabsContent value="details">
                        <div className="space-y-6">
                            {/* Parties */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-[rgb(var(--secondary))]">
                                    <p className="text-sm text-[rgb(var(--muted-foreground))] mb-2">Employer</p>
                                    <div className="flex items-center gap-3">
                                        <Avatar src={dispute.employer.avatar} fallback={dispute.employer.name} size="md" />
                                        <div>
                                            <p className="font-medium">{dispute.employer.name}</p>
                                            <p className="text-sm text-[rgb(var(--muted-foreground))]">
                                                ⭐ {dispute.employer.rating}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-[rgb(var(--secondary))]">
                                    <p className="text-sm text-[rgb(var(--muted-foreground))] mb-2">Freelancer</p>
                                    <div className="flex items-center gap-3">
                                        <Avatar src={dispute.freelancer.avatar} fallback={dispute.freelancer.name} size="md" />
                                        <div>
                                            <p className="font-medium">{dispute.freelancer.name}</p>
                                            <p className="text-sm text-[rgb(var(--muted-foreground))]">
                                                ⭐ {dispute.freelancer.rating}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reason */}
                            <div>
                                <h3 className="font-medium mb-2 flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Dispute Reason
                                </h3>
                                <p className="text-[rgb(var(--muted-foreground))] p-4 rounded-xl bg-[rgb(var(--secondary))]">
                                    {dispute.reason}
                                </p>
                            </div>

                            {/* Referee (if assigned) */}
                            {dispute.referee && (
                                <div>
                                    <h3 className="font-medium mb-2 flex items-center gap-2">
                                        <Scale className="h-4 w-4" />
                                        Assigned Referee
                                    </h3>
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
                                        <Avatar src={dispute.referee.avatar} fallback={dispute.referee.name} size="md" />
                                        <div>
                                            <p className="font-medium">{dispute.referee.name}</p>
                                            <p className="text-sm text-[rgb(var(--muted-foreground))]">
                                                ⭐ {dispute.referee.rating} · {dispute.referee.completedJobs} resolved disputes
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    {/* Evidence Tab */}
                    <TabsContent value="evidence">
                        <div className="space-y-6">
                            {/* Employer Evidence */}
                            {dispute.employerEvidence && (
                                <div>
                                    <h3 className="font-medium mb-2 flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Employer&apos;s Evidence
                                    </h3>
                                    <p className="text-[rgb(var(--muted-foreground))] p-4 rounded-xl bg-[rgb(var(--secondary))]">
                                        {dispute.employerEvidence}
                                    </p>
                                </div>
                            )}

                            {/* Freelancer Evidence */}
                            {dispute.freelancerEvidence && (
                                <div>
                                    <h3 className="font-medium mb-2 flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Freelancer&apos;s Evidence
                                    </h3>
                                    <p className="text-[rgb(var(--muted-foreground))] p-4 rounded-xl bg-[rgb(var(--secondary))]">
                                        {dispute.freelancerEvidence}
                                    </p>
                                </div>
                            )}

                            {/* Submit New Evidence */}
                            {dispute.status !== 'resolved' && (
                                <div>
                                    <h3 className="font-medium mb-2">Submit Additional Evidence</h3>
                                    <Textarea
                                        value={newEvidence}
                                        onChange={(e) => setNewEvidence(e.target.value)}
                                        placeholder="Describe any additional evidence or context..."
                                        className="mb-3"
                                    />
                                    <Button
                                        onClick={handleSubmitEvidence}
                                        isLoading={isSubmitting}
                                        disabled={!newEvidence.trim()}
                                    >
                                        Submit Evidence
                                    </Button>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    {/* Resolution Tab */}
                    <TabsContent value="resolution">
                        <div className="space-y-6">
                            {dispute.status === 'resolved' ? (
                                <div className="text-center py-8">
                                    <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Dispute Resolved</h3>
                                    <p className={cn('text-lg font-medium', resolution.color)}>
                                        {resolution.label}
                                    </p>
                                    {dispute.resolvedAt && (
                                        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-2">
                                            Resolved on {formatDate(dispute.resolvedAt)}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Clock className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Awaiting Resolution</h3>
                                    <p className="text-[rgb(var(--muted-foreground))]">
                                        The referee is currently reviewing the evidence. You will be notified once a decision is made.
                                    </p>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Card>
    );
}
