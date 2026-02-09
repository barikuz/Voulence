'use client';

import Link from 'next/link';
import {
    Briefcase,
    DollarSign,
    Clock,
    TrendingUp,
    ArrowRight,
    Plus,
    AlertTriangle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StatsCard, StatsGrid } from '@/components/features/stats-card';
import { JobCard } from '@/components/features/job-card';
import { TransactionList } from '@/components/features/transaction-list';
import { mockJobs, mockTransactions, mockDisputes, currentUser } from '@/data/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
    const userJobs = mockJobs.filter(
        (job) => job.employer.id === currentUser.id || job.freelancer?.id === currentUser.id
    );
    const activeJobs = userJobs.filter((job) => ['open', 'in_progress', 'pending_review'].includes(job.status));
    const recentTransactions = mockTransactions.slice(0, 5);
    const activeDisputes = mockDisputes.filter((d) => d.status !== 'resolved');

    const totalEarnings = mockTransactions
        .filter((tx) => tx.type === 'payment_release' && tx.status === 'completed')
        .reduce((sum, tx) => sum + tx.amount, 0);

    const totalSpent = mockTransactions
        .filter((tx) => tx.type === 'escrow_deposit' && tx.status === 'completed')
        .reduce((sum, tx) => sum + tx.amount, 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">
                        Welcome back, {currentUser.name.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-[rgb(var(--muted-foreground))]">
                        Here&apos;s what&apos;s happening with your jobs today.
                    </p>
                </div>
                <Link href="/jobs/create">
                    <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                        Post New Job
                    </Button>
                </Link>
            </div>

            {/* Active Disputes Alert */}
            {activeDisputes.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="font-medium">You have {activeDisputes.length} active dispute(s)</p>
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">
                            Please review and provide any requested evidence promptly.
                        </p>
                    </div>
                    <Link href="/disputes">
                        <Button variant="outline" size="sm">
                            View Disputes
                        </Button>
                    </Link>
                </div>
            )}

            {/* Stats */}
            <StatsGrid columns={4}>
                <StatsCard
                    title="Active Jobs"
                    value={activeJobs.length}
                    change={{ value: 12, period: 'vs last month' }}
                    icon={<Briefcase className="h-5 w-5" />}
                    variant="gradient"
                />
                <StatsCard
                    title="Total Earnings"
                    value={formatCurrency(totalEarnings)}
                    change={{ value: 8, period: 'vs last month' }}
                    icon={<TrendingUp className="h-5 w-5" />}
                />
                <StatsCard
                    title="Total Spent"
                    value={formatCurrency(totalSpent)}
                    icon={<DollarSign className="h-5 w-5" />}
                />
                <StatsCard
                    title="Pending Reviews"
                    value={userJobs.filter((j) => j.status === 'pending_review').length}
                    icon={<Clock className="h-5 w-5" />}
                />
            </StatsGrid>

            {/* Main Content Grid - 50/50 split */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Jobs Section */}
                <div>
                    <Card variant="glass" padding="none">
                        <CardHeader className="p-6 pb-0">
                            <div className="flex items-center justify-between">
                                <CardTitle>My Jobs</CardTitle>
                                <Link href="/dashboard/jobs">
                                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <Tabs defaultValue="active">
                                <TabsList variant="pills" className="mb-4">
                                    <TabsTrigger value="active" variant="pills">
                                        Active ({activeJobs.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="completed" variant="pills">
                                        Completed
                                    </TabsTrigger>
                                    <TabsTrigger value="all" variant="pills">
                                        All
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="active">
                                    {activeJobs.length === 0 ? (
                                        <div className="text-center py-8">
                                            <Briefcase className="h-12 w-12 text-[rgb(var(--muted-foreground))] mx-auto mb-3" />
                                            <p className="text-[rgb(var(--muted-foreground))]">No active jobs</p>
                                            <Link href="/jobs/create">
                                                <Button variant="outline" size="sm" className="mt-2">
                                                    Post a Job
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-4">
                                            {activeJobs.slice(0, 3).map((job) => (
                                                <JobCard key={job.id} job={job} variant="compact" />
                                            ))}
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="completed">
                                    <div className="flex flex-col gap-4">
                                        {userJobs
                                            .filter((j) => j.status === 'completed')
                                            .slice(0, 3)
                                            .map((job) => (
                                                <JobCard key={job.id} job={job} variant="compact" />
                                            ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="all">
                                    <div className="flex flex-col gap-4">
                                        {userJobs.slice(0, 3).map((job) => (
                                            <JobCard key={job.id} job={job} variant="compact" />
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Transactions Section */}
                <div>
                    <Card variant="glass" padding="none">
                        <CardHeader className="p-6 pb-0">
                            <div className="flex items-center justify-between">
                                <CardTitle>Recent Transactions</CardTitle>
                                <Link href="/transactions">
                                    <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 min-h-[400px]">
                            <TransactionList transactions={recentTransactions} limit={5} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
