'use client';

import { useState } from 'react';
import {
    Download,
    ArrowUpRight,
    ArrowDownLeft,
    RefreshCcw,
    Scale,
    Filter,
    Calendar,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StatsCard, StatsGrid } from '@/components/features/stats-card';
import { TransactionList } from '@/components/features/transaction-list';
import { mockTransactions } from '@/data/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function TransactionsPage() {
    const [dateRange, setDateRange] = useState('all');

    const totalIncoming = mockTransactions
        .filter((tx) => (tx.type === 'payment_release' || tx.type === 'refund') && tx.status === 'completed')
        .reduce((sum, tx) => sum + tx.amount, 0);

    const totalOutgoing = mockTransactions
        .filter((tx) => tx.type === 'escrow_deposit' && tx.status === 'completed')
        .reduce((sum, tx) => sum + tx.amount, 0);

    const pendingAmount = mockTransactions
        .filter((tx) => tx.status === 'pending')
        .reduce((sum, tx) => sum + tx.amount, 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">Transactions</h1>
                    <p className="text-[rgb(var(--muted-foreground))]">
                        View your payment history and transaction details.
                    </p>
                </div>
                <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
                    Export CSV
                </Button>
            </div>

            {/* Stats */}
            <StatsGrid columns={3}>
                <StatsCard
                    title="Total Incoming"
                    value={formatCurrency(totalIncoming)}
                    icon={<ArrowDownLeft className="h-5 w-5" />}
                    variant="gradient"
                />
                <StatsCard
                    title="Total Outgoing"
                    value={formatCurrency(totalOutgoing)}
                    icon={<ArrowUpRight className="h-5 w-5" />}
                />
                <StatsCard
                    title="Pending"
                    value={formatCurrency(pendingAmount)}
                    icon={<RefreshCcw className="h-5 w-5" />}
                />
            </StatsGrid>

            {/* Transaction List */}
            <Card variant="glass" padding="lg">
                <CardHeader className="p-0 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <CardTitle>Transaction History</CardTitle>
                        <Select
                            options={[
                                { value: 'all', label: 'All Time' },
                                { value: '7d', label: 'Last 7 Days' },
                                { value: '30d', label: 'Last 30 Days' },
                                { value: '90d', label: 'Last 90 Days' },
                            ]}
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            leftIcon={<Calendar className="h-4 w-4" />}
                            className="w-40"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <TransactionList transactions={mockTransactions} showFilters />
                </CardContent>
            </Card>
        </div>
    );
}
