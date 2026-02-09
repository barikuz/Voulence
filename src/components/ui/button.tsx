import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'neon' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-xl
      transition-all duration-300 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:pointer-events-none
      active:scale-[0.98]
    `;

        const variants = {
            primary: `
        bg-gradient-to-r from-primary-500 to-accent-500
        text-white
        hover:from-primary-600 hover:to-accent-600
        hover:shadow-lg hover:shadow-primary-500/25
        focus-visible:ring-primary-500
      `,
            secondary: `
        bg-[rgb(var(--secondary))]
        text-[rgb(var(--secondary-foreground))]
        hover:bg-[rgb(var(--secondary))]/80
        focus-visible:ring-[rgb(var(--secondary))]
      `,
            ghost: `
        bg-transparent
        text-[rgb(var(--foreground))]
        hover:bg-[rgb(var(--secondary))]
        focus-visible:ring-[rgb(var(--secondary))]
      `,
            outline: `
        bg-transparent
        border-2 border-[rgb(var(--border))]
        text-[rgb(var(--foreground))]
        hover:bg-[rgb(var(--secondary))]
        hover:border-primary-500
        focus-visible:ring-primary-500
      `,
            neon: `
        bg-transparent
        border-2 border-primary-500
        text-primary-400
        neon-glow
        hover:bg-primary-500/10
        hover:neon-glow-strong
        focus-visible:ring-primary-500
      `,
            destructive: `
        bg-[rgb(var(--destructive))]
        text-[rgb(var(--destructive-foreground))]
        hover:bg-[rgb(var(--destructive))]/90
        focus-visible:ring-[rgb(var(--destructive))]
      `,
        };

        const sizes = {
            sm: 'h-9 px-4 text-sm',
            md: 'h-11 px-6 text-base',
            lg: 'h-14 px-8 text-lg',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                ) : (
                    leftIcon
                )}
                {children}
                {!isLoading && rightIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
