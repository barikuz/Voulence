'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TabsContextType {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
    defaultValue: string;
    children: ReactNode;
    className?: string;
    onChange?: (value: string) => void;
}

export function Tabs({ defaultValue, children, className, onChange }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultValue);

    const handleSetActiveTab = (value: string) => {
        setActiveTab(value);
        onChange?.(value);
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab: handleSetActiveTab }}>
            <div className={cn('w-full', className)}>{children}</div>
        </TabsContext.Provider>
    );
}

interface TabsListProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'pills' | 'underline';
}

export function TabsList({ children, className, variant = 'default' }: TabsListProps) {
    const variants = {
        default: `
      flex gap-1 p-1
      bg-[rgb(var(--secondary))] rounded-xl
    `,
        pills: `
      flex gap-2
    `,
        underline: `
      flex gap-6
      border-b border-[rgb(var(--border))]
    `,
    };

    return (
        <div
            className={cn(variants[variant], className)}
            role="tablist"
            aria-orientation="horizontal"
        >
            {children}
        </div>
    );
}

interface TabsTriggerProps {
    value: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    variant?: 'default' | 'pills' | 'underline';
}

export function TabsTrigger({
    value,
    children,
    className,
    disabled = false,
    variant = 'default',
}: TabsTriggerProps) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsTrigger must be used within Tabs');

    const { activeTab, setActiveTab } = context;
    const isActive = activeTab === value;

    const variants = {
        default: cn(
            'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            isActive
                ? 'bg-[rgb(var(--card))] text-[rgb(var(--foreground))] shadow-sm'
                : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
        ),
        pills: cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            isActive
                ? 'bg-primary-500 text-white neon-glow'
                : 'bg-[rgb(var(--secondary))] text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--secondary))]/80'
        ),
        underline: cn(
            'px-1 pb-3 text-sm font-medium transition-all duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            'border-b-2 -mb-px',
            isActive
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:border-[rgb(var(--border))]'
        ),
    };

    return (
        <button
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${value}`}
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
            onClick={() => setActiveTab(value)}
            className={cn(
                variants[variant],
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
        >
            {children}
        </button>
    );
}

interface TabsContentProps {
    value: string;
    children: ReactNode;
    className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsContent must be used within Tabs');

    const { activeTab } = context;

    if (activeTab !== value) return null;

    return (
        <div
            role="tabpanel"
            id={`tabpanel-${value}`}
            tabIndex={0}
            className={cn(
                'mt-4 focus:outline-none',
                'animate-in fade-in duration-200',
                className
            )}
        >
            {children}
        </div>
    );
}
