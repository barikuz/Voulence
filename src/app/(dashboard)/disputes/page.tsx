'use client';

import Link from 'next/link';
import { AlertTriangle, CheckCircle, Clock, Scale } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DisputePanel } from '@/components/features/dispute-panel';
import { mockDisputes } from '@/data/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { DisputeStatus } from '@/types';

const statusConfig: Record<DisputeStatus, { label: string; variant: 'warning' | 'info' | 'success' | 'danger'; icon: typeof AlertTriangle }> = {
    open: { label: 'Open', variant: 'warning', icon: AlertTriangle },
    under_review: { label: 'Under Review', variant: 'info', icon: Clock },
    resolved: { label: 'Resolved', variant: 'success', icon: CheckCircle },
    escalated: { label: 'Escalated', variant: 'danger', icon: Scale },
};

export default function DisputesPage() {
    const activeDisputes = mockDisputes.filter((d) => d.status !== 'resolved');
    const resolvedDisputes = mockDisputes.filter((d) => d.status === 'resolved');

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold">Disputes</h1>
                <p className="text-[rgb(var(--muted-foreground))]">
                    Manage and track dispute resolutions for your jobs.
                </p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['open', 'under_review', 'escalated', 'resolved'].map((status) => {
                    const config = statusConfig[status as DisputeStatus];
                    const count = mockDisputes.filter((d) => d.status === status).length;
                    const Icon = config.icon;
                    return (
                        <Card key={status} variant="glass" padding="md">
                            <div className="flex items-center gap-3">
                                <div className={`h-10 w-10 rounded-xl bg-${config.variant === 'warning' ? 'amber' : config.variant === 'success' ? 'emerald' : config.variant === 'danger' ? 'red' : 'blue'}-500/10 flex items-center justify-center`}>
                                    <Icon className={`h-5 w-5 text-${config.variant === 'warning' ? 'amber' : config.variant === 'success' ? 'emerald' : config.variant === 'danger' ? 'red' : 'blue'}-500`} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{count}</p>
                                    <p className="text-xs text-[rgb(var(--muted-foreground))]">{config.label}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Disputes List */}
            <Tabs defaultValue="active">
                <TabsList variant="pills" className="mb-6">
                    <TabsTrigger value="active" variant="pills">
                        Active ({activeDisputes.length})
                    </TabsTrigger>
                    <TabsTrigger value="resolved" variant="pills">
                        Resolved ({resolvedDisputes.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="active">
                    {activeDisputes.length === 0 ? (
                        <Card variant="glass" padding="lg" className="text-center py-12">
                            <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No Active Disputes</h3>
                            <p className="text-[rgb(var(--muted-foreground))]">
                                You don&apos;t have any ongoing disputes. Great job!
                            </p>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {activeDisputes.map((dispute) => (
                                <DisputePanel key={dispute.id} dispute={dispute} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="resolved">
                    {resolvedDisputes.length === 0 ? (
                        <Card variant="glass" padding="lg" className="text-center py-12">
                            <Scale className="h-12 w-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No Resolved Disputes</h3>
                            <p className="text-[rgb(var(--muted-foreground))]">
                                Your resolved disputes will appear here.
                            </p>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {resolvedDisputes.map((dispute) => (
                                <DisputePanel key={dispute.id} dispute={dispute} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
