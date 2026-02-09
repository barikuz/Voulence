import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
    variant?: 'default' | 'circle' | 'text';
    width?: string | number;
    height?: string | number;
    lines?: number;
}

export function Skeleton({
    className,
    variant = 'default',
    width,
    height,
    lines = 1,
}: SkeletonProps) {
    const baseStyles = 'shimmer rounded-lg';

    const variants = {
        default: '',
        circle: 'rounded-full',
        text: 'h-4',
    };

    const style = {
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    };

    if (lines > 1) {
        return (
            <div className="space-y-3">
                {Array.from({ length: lines }).map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            baseStyles,
                            variants.text,
                            index === lines - 1 ? 'w-4/5' : 'w-full',
                            className
                        )}
                        style={style}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={cn(baseStyles, variants[variant], className)}
            style={style}
        />
    );
}

// Pre-built skeleton components for common use cases
export function SkeletonCard() {
    return (
        <div className="rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-6 space-y-4">
            <div className="flex items-center gap-4">
                <Skeleton variant="circle" width={48} height={48} />
                <div className="flex-1 space-y-2">
                    <Skeleton height={16} width="60%" />
                    <Skeleton height={12} width="40%" />
                </div>
            </div>
            <Skeleton lines={3} />
            <div className="flex gap-2">
                <Skeleton height={32} width={80} />
                <Skeleton height={32} width={80} />
            </div>
        </div>
    );
}

export function SkeletonJobCard() {
    return (
        <div className="rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-6 space-y-4">
            <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                    <Skeleton height={24} width="70%" />
                    <Skeleton height={16} width="40%" />
                </div>
                <Skeleton height={28} width={80} className="rounded-full" />
            </div>
            <Skeleton lines={2} />
            <div className="flex gap-2 flex-wrap">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} height={24} width={60} className="rounded-full" />
                ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-[rgb(var(--border))]">
                <Skeleton height={20} width={100} />
                <Skeleton height={20} width={80} />
            </div>
        </div>
    );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            <div className="flex gap-4 p-4 bg-[rgb(var(--secondary))] rounded-xl">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} height={16} className="flex-1" />
                ))}
            </div>
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={index}
                    className="flex gap-4 p-4 border border-[rgb(var(--border))] rounded-xl"
                >
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} height={16} className="flex-1" />
                    ))}
                </div>
            ))}
        </div>
    );
}
