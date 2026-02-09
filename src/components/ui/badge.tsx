import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: 'sm' | 'md' | 'lg';
    dot?: boolean;
    pulse?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            className,
            variant = 'default',
            size = 'md',
            dot = false,
            pulse = false,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = `
      inline-flex items-center gap-1.5
      font-medium rounded-full
      transition-colors duration-200
    `;

        const variants = {
            default: 'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]',
            primary: 'bg-primary-500/20 text-primary-400 border border-primary-500/30',
            secondary: 'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]',
            success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
            warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
            danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
            info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
            outline: 'bg-transparent border border-[rgb(var(--border))] text-[rgb(var(--foreground))]',
        };

        const sizes = {
            sm: 'px-2 py-0.5 text-xs',
            md: 'px-2.5 py-1 text-sm',
            lg: 'px-3 py-1.5 text-base',
        };

        const dotColors: Record<BadgeVariant, string> = {
            default: 'bg-[rgb(var(--muted-foreground))]',
            primary: 'bg-primary-400',
            secondary: 'bg-[rgb(var(--muted-foreground))]',
            success: 'bg-emerald-400',
            warning: 'bg-amber-400',
            danger: 'bg-red-400',
            info: 'bg-blue-400',
            outline: 'bg-[rgb(var(--foreground))]',
        };

        return (
            <span
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {dot && (
                    <span className="relative flex h-2 w-2">
                        {pulse && (
                            <span
                                className={cn(
                                    'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                                    dotColors[variant]
                                )}
                            />
                        )}
                        <span
                            className={cn(
                                'relative inline-flex h-2 w-2 rounded-full',
                                dotColors[variant]
                            )}
                        />
                    </span>
                )}
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps, BadgeVariant };
