'use client';

import { useState } from 'react';
import {
    ArrowUpRight,
    ArrowDownLeft,
    RefreshCcw,
    Scale,
    ExternalLink,
    Filter,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { cn, formatCurrency, formatDate, truncateAddress } from '@/lib/utils';
import { Transaction, TransactionType, TransactionStatus } from '@/types';

interface TransactionListProps {
    transactions: Transaction[];
    showFilters?: boolean;
    limit?: number;
}

const typeConfig: Record<TransactionType, { icon: typeof ArrowUpRight; label: string; color: string }> = {
    escrow_deposit: { icon: ArrowUpRight, label: 'Escrow Deposit', color: 'text-blue-500' },
    payment_release: { icon: ArrowDownLeft, label: 'Payment Release', color: 'text-emerald-500' },
    refund: { icon: RefreshCcw, label: 'Refund', color: 'text-amber-500' },
    dispute_resolution: { icon: Scale, label: 'Dispute Resolution', color: 'text-purple-500' },
};

const statusConfig: Record<TransactionStatus, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
    pending: { label: 'Pending', variant: 'warning' },
    completed: { label: 'Completed', variant: 'success' },
    failed: { label: 'Failed', variant: 'danger' },
};

export function TransactionList({
    transactions,
    showFilters = false,
    limit,
}: TransactionListProps) {
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredTransactions = transactions.filter((tx) => {
        if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
        if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
        return true;
    });

    const displayedTransactions = limit
        ? filteredTransactions.slice(0, limit)
        : filteredTransactions;

    return (
        <div className="space-y-4">
            {/* Filters */}
            {showFilters && (
                <div className="flex flex-wrap gap-4 items-center">
                    <Select
                        options={[
                            { value: 'all', label: 'All Types' },
                            { value: 'escrow_deposit', label: 'Escrow Deposits' },
                            { value: 'payment_release', label: 'Payment Releases' },
                            { value: 'refund', label: 'Refunds' },
                            { value: 'dispute_resolution', label: 'Dispute Resolutions' },
                        ]}
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        leftIcon={<Filter className="h-4 w-4" />}
                        className="w-48"
                    />
                    <Select
                        options={[
                            { value: 'all', label: 'All Status' },
                            { value: 'pending', label: 'Pending' },
                            { value: 'completed', label: 'Completed' },
                            { value: 'failed', label: 'Failed' },
                        ]}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-40"
                    />
                </div>
            )}

            {/* Transaction List */}
            {displayedTransactions.length === 0 ? (
                <Card variant="glass" padding="lg" className="text-center">
                    <p className="text-[rgb(var(--muted-foreground))]">
                        No transactions found
                    </p>
                </Card>
            ) : (
                <div className="space-y-3">
                    {displayedTransactions.map((tx) => {
                        const typeInfo = typeConfig[tx.type];
                        const statusInfo = statusConfig[tx.status];
                        const Icon = typeInfo.icon;

                        return (
                            <Card
                                key={tx.id}
                                variant="default"
                                padding="md"
                                hoverable
                                className="flex items-center gap-4"
                            >
                                {/* Icon */}
                                <div
                                    className={cn(
                                        'h-12 w-12 rounded-xl flex items-center justify-center shrink-0',
                                        'bg-[rgb(var(--secondary))]',
                                        typeInfo.color
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="font-medium truncate">{typeInfo.label}</p>
                                        <Badge variant={statusInfo.variant} size="sm">
                                            {statusInfo.label}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-[rgb(var(--muted-foreground))] truncate">
                                        {tx.jobTitle}
                                    </p>
                                </div>

                                {/* Amount & Date */}
                                <div className="text-right shrink-0">
                                    <p className="font-semibold">
                                        {tx.type === 'payment_release' || tx.type === 'refund' ? '+' : '-'}
                                        {formatCurrency(tx.amount, tx.currency)}
                                    </p>
                                    <p className="text-sm text-[rgb(var(--muted-foreground))]">
                                        {formatDate(tx.createdAt)}
                                    </p>
                                </div>

                                {/* Actions */}
                                {tx.txHash && (
                                    <a
                                        href={`https://stellar.expert/explorer/public/tx/${tx.txHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg hover:bg-[rgb(var(--secondary))] transition-colors"
                                        aria-label="View on explorer"
                                    >
                                        <ExternalLink className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                                    </a>
                                )}
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
