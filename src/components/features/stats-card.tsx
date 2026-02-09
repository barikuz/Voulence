import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: {
        value: number;
        period: string;
    };
    icon?: ReactNode;
    variant?: 'default' | 'glass' | 'gradient';
}

export function StatsCard({
    title,
    value,
    change,
    icon,
    variant = 'default',
}: StatsCardProps) {
    const variants = {
        default: 'bg-[rgb(var(--card))] border border-[rgb(var(--border))]',
        glass: 'glass',
        gradient: 'bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20',
    };

    const getTrendIcon = () => {
        if (!change) return null;
        if (change.value > 0) return <TrendingUp className="h-4 w-4" />;
        if (change.value < 0) return <TrendingDown className="h-4 w-4" />;
        return <Minus className="h-4 w-4" />;
    };

    const getTrendColor = () => {
        if (!change) return '';
        if (change.value > 0) return 'text-emerald-500';
        if (change.value < 0) return 'text-red-500';
        return 'text-[rgb(var(--muted-foreground))]';
    };

    return (
        <div
            className={cn(
                'rounded-2xl p-6',
                'transition-all duration-300',
                'hover:scale-[1.02] hover:shadow-lg',
                variants[variant]
            )}
        >
            <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-medium text-[rgb(var(--muted-foreground))]">
                    {title}
                </p>
                {icon && (
                    <div className="h-10 w-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                        {icon}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <p className="text-3xl font-bold">{value}</p>

                {change && (
                    <div className={cn('flex items-center gap-1.5 text-sm', getTrendColor())}>
                        {getTrendIcon()}
                        <span className="font-medium">
                            {change.value > 0 ? '+' : ''}{change.value}%
                        </span>
                        <span className="text-[rgb(var(--muted-foreground))]">
                            {change.period}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

interface StatsGridProps {
    children: ReactNode;
    columns?: 2 | 3 | 4;
}

export function StatsGrid({ children, columns = 4 }: StatsGridProps) {
    const columnClasses = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={cn('grid gap-4', columnClasses[columns])}>
            {children}
        </div>
    );
}
