'use client';

import { Calendar, Clock, DollarSign, Star, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency, formatRelativeTime, truncateText } from '@/lib/utils';
import { JobApplication } from '@/types';

interface ProposalCardProps {
    application: JobApplication;
    onAccept?: (id: string) => void;
    onDecline?: (id: string) => void;
    onView?: (id: string) => void;
}

export function ProposalCard({
    application,
    onAccept,
    onDecline,
    onView,
}: ProposalCardProps) {
    const { freelancer, proposal, bidAmount, deliveryTime, createdAt, status } = application;

    return (
        <Card variant="glass" padding="md" className="group">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Freelancer Info */}
                <div className="flex-shrink-0 flex md:flex-col items-center md:items-start gap-4 md:w-48">
                    <div className="relative">
                        <Avatar
                            src={freelancer.avatar}
                            fallback={freelancer.name}
                            size="lg"
                            className="h-16 w-16"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-[rgb(var(--card))] rounded-full px-1.5 py-0.5 shadow-sm border border-[rgb(var(--border))] flex items-center gap-0.5">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold">{freelancer.rating}</span>
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="font-semibold text-lg hover:text-primary-500 transition-colors cursor-pointer">
                            {freelancer.name}
                        </h4>
                        <p className="text-xs text-[rgb(var(--muted-foreground))]">
                            @{freelancer.username}
                        </p>
                        <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
                            {freelancer.completedJobs} jobs completed
                        </p>
                    </div>
                </div>

                {/* Proposal Content */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgb(var(--secondary))] text-xs font-medium">
                                <Clock className="h-3 w-3" />
                                <span>{deliveryTime} days delivery</span>
                            </div>
                            {status === 'accepted' ? (
                                <Badge variant="success" dot>Accepted</Badge>
                            ) : status === 'rejected' ? (
                                <Badge variant="danger" dot>Declined</Badge>
                            ) : null}
                        </div>
                        <p className="text-xs text-[rgb(var(--muted-foreground))] flex-shrink-0">
                            {formatRelativeTime(createdAt)}
                        </p>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm text-[rgb(var(--foreground))] line-clamp-2 md:line-clamp-3">
                            {proposal}
                        </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-[rgb(var(--border))] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[rgb(var(--muted-foreground))]">Bid Amount:</span>
                            <span className="text-xl font-bold text-primary-500">
                                {formatCurrency(bidAmount)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onView?.(application.id)}
                            >
                                View Proposal
                            </Button>

                            {status === 'pending' && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10 hover:border-red-500/20"
                                        onClick={() => onDecline?.(application.id)}
                                    >
                                        Decline
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => onAccept?.(application.id)}
                                    >
                                        Accept
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
