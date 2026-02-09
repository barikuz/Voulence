import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
    children: ReactNode;
    className?: string;
    columns?: 1 | 2 | 3 | 4;
    gap?: 'sm' | 'md' | 'lg';
}

export function BentoGrid({
    children,
    className,
    columns = 3,
    gap = 'md',
}: BentoGridProps) {
    const columnClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    const gapClasses = {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
    };

    return (
        <div
            className={cn(
                'grid',
                columnClasses[columns],
                gapClasses[gap],
                className
            )}
        >
            {children}
        </div>
    );
}

interface BentoItemProps {
    children: ReactNode;
    className?: string;
    span?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2;
}

export function BentoItem({
    children,
    className,
    span = 1,
    rowSpan = 1,
}: BentoItemProps) {
    const spanClasses = {
        1: '',
        2: 'md:col-span-2',
        3: 'md:col-span-2 lg:col-span-3',
        4: 'md:col-span-2 lg:col-span-4',
    };

    const rowSpanClasses = {
        1: '',
        2: 'row-span-2',
    };

    return (
        <div
            className={cn(
                spanClasses[span],
                rowSpanClasses[rowSpan],
                className
            )}
        >
            {children}
        </div>
    );
}

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'gradient';
    hoverable?: boolean;
}

export function BentoCard({
    children,
    className,
    variant = 'default',
    hoverable = true,
}: BentoCardProps) {
    const variants = {
        default: 'bg-[rgb(var(--card))] border border-[rgb(var(--border))]',
        glass: 'glass',
        gradient: 'bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/20',
    };

    return (
        <div
            className={cn(
                'rounded-2xl p-6',
                'transition-all duration-300',
                variants[variant],
                hoverable && 'hover:scale-[1.02] hover:shadow-xl cursor-pointer',
                className
            )}
        >
            {children}
        </div>
    );
}
