import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    variant?: 'default' | 'glass';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type = 'text',
            label,
            error,
            hint,
            leftIcon,
            rightIcon,
            variant = 'default',
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        const baseStyles = `
      w-full h-12 px-4
      rounded-xl
      text-[rgb(var(--foreground))]
      placeholder:text-[rgb(var(--muted-foreground))]
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

        const variants = {
            default: `
        bg-[rgb(var(--card))]
        border border-[rgb(var(--border))]
        hover:border-primary-500/50
      `,
            glass: `
        glass
        border border-[rgba(var(--glass-border))]
        hover:border-primary-500/30
      `,
        };

        const errorStyles = error
            ? 'border-[rgb(var(--destructive))] focus:ring-[rgb(var(--destructive))]'
            : '';

        const iconPadding = {
            left: leftIcon ? 'pl-12' : '',
            right: rightIcon ? 'pr-12' : '',
        };

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-[rgb(var(--foreground))]"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        type={type}
                        id={inputId}
                        className={cn(
                            baseStyles,
                            variants[variant],
                            errorStyles,
                            iconPadding.left,
                            iconPadding.right,
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-sm text-[rgb(var(--destructive))]">{error}</p>
                )}
                {hint && !error && (
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">{hint}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
