'use client';

import { forwardRef, SelectHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    label?: string;
    error?: string;
    hint?: string;
    options: SelectOption[];
    placeholder?: string;
    variant?: 'default' | 'glass';
    leftIcon?: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            className,
            label,
            error,
            hint,
            options,
            placeholder,
            variant = 'default',
            leftIcon,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        const baseStyles = `
      h-12 px-4
      rounded-xl
      text-[rgb(var(--foreground))]
      appearance-none
      cursor-pointer
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

        const iconPadding = leftIcon ? 'pl-12' : '';

        return (
            <div className="inline-block space-y-2">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-[rgb(var(--foreground))]"
                    >
                        {label}
                    </label>
                )}
                <div className="inline-flex items-center relative">
                    {leftIcon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))] pointer-events-none">
                            {leftIcon}
                        </div>
                    )}
                    <select
                        ref={ref}
                        id={inputId}
                        className={cn(
                            baseStyles,
                            variants[variant],
                            errorStyles,
                            iconPadding,
                            'pr-8',
                            className
                        )}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(var(--muted-foreground))] pointer-events-none" />
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

Select.displayName = 'Select';

export { Select };
export type { SelectProps, SelectOption };
