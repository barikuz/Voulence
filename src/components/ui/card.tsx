import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'neon' | 'outline' | 'gradient';
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            variant = 'default',
            hoverable = false,
            padding = 'md',
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'rounded-2xl transition-all duration-300';

        const variants = {
            default: `
        bg-[rgb(var(--card))]
        border border-[rgb(var(--border))]
        shadow-sm
      `,
            glass: `
        glass
        shadow-lg
      `,
            neon: `
        bg-[rgb(var(--card))]
        border-2 border-primary-500/50
        neon-glow
      `,
            outline: `
        bg-transparent
        border-2 border-[rgb(var(--border))]
      `,
            gradient: `
        bg-gradient-to-br from-primary-500/10 to-accent-500/10
        border border-primary-500/20
        shadow-lg
      `,
        };

        const paddings = {
            none: '',
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8',
        };

        const hoverStyles = hoverable
            ? `
        cursor-pointer
        hover:scale-[1.02]
        hover:shadow-xl
        hover:border-primary-500/30
      `
            : '';

        return (
            <div
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    paddings[padding],
                    hoverStyles,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> { }

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex flex-col space-y-1.5', className)}
            {...props}
        />
    )
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> { }

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn(
                'text-xl font-semibold leading-tight tracking-tight',
                className
            )}
            {...props}
        />
    )
);

CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> { }

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('text-sm text-[rgb(var(--muted-foreground))]', className)}
            {...props}
        />
    )
);

CardDescription.displayName = 'CardDescription';

interface CardContentProps extends HTMLAttributes<HTMLDivElement> { }

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('', className)} {...props} />
    )
);

CardContent.displayName = 'CardContent';

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> { }

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex items-center pt-4', className)}
            {...props}
        />
    )
);

CardFooter.displayName = 'CardFooter';

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
};
export type { CardProps };
