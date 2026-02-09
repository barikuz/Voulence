'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Briefcase,
    History,
    AlertTriangle,
    User,
    Plus,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/providers/sidebar-provider';

const sidebarLinks = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        name: 'My Jobs',
        href: '/dashboard/jobs',
        icon: Briefcase,
    },
    {
        name: 'Transactions',
        href: '/transactions',
        icon: History,
    },
    {
        name: 'Disputes',
        href: '/disputes',
        icon: AlertTriangle,
    },
    {
        name: 'Profile',
        href: '/profile',
        icon: User,
    },
];

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar } = useSidebar();

    return (
        <aside
            className={cn(
                'fixed left-0 top-16 bottom-0 z-30',
                'flex flex-col',
                'bg-[rgb(var(--card))] border-r border-[rgb(var(--border))]',
                'transition-all duration-300',
                isCollapsed ? 'w-20' : 'w-64',
                className
            )}
        >
            {/* Collapse Toggle */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] flex items-center justify-center hover:bg-primary-500/10 transition-colors z-10"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                {isCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                ) : (
                    <ChevronLeft className="h-4 w-4" />
                )}
            </button>

            <div className="flex-1 py-6 overflow-y-auto">
                {/* Create Job Button */}
                <div className={cn('px-4 mb-6', isCollapsed && 'px-3')}>
                    <Link href="/jobs/create">
                        <Button
                            variant="primary"
                            className={cn(
                                'w-full justify-center',
                                isCollapsed && 'px-0'
                            )}
                        >
                            <Plus className="h-5 w-5" />
                            {!isCollapsed && <span>Create Job</span>}
                        </Button>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1 px-3">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href ||
                            (link.href !== '/dashboard' && pathname.startsWith(link.href));
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    'flex items-center gap-3 px-3 py-3 rounded-xl',
                                    'transition-all duration-200',
                                    'group',
                                    isActive
                                        ? 'bg-primary-500/10 text-primary-500 neon-border'
                                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))]',
                                    isCollapsed && 'justify-center px-0'
                                )}
                            >
                                <Icon
                                    className={cn(
                                        'h-5 w-5 shrink-0',
                                        isActive && 'text-primary-500'
                                    )}
                                />
                                {!isCollapsed && (
                                    <span className="font-medium text-sm">{link.name}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section */}
            <div className={cn('p-4 border-t border-[rgb(var(--border))]', isCollapsed && 'p-3')}>
                {isCollapsed ? (
                    <div className="flex justify-center">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                            <span className="text-primary-500 font-bold text-sm">V</span>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 p-4 border border-primary-500/20">
                        <p className="text-sm font-medium mb-2">Need Help?</p>
                        <p className="text-xs text-[rgb(var(--muted-foreground))] mb-3">
                            Check our documentation or contact support.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                            Get Support
                        </Button>
                    </div>
                )}
            </div>
        </aside>
    );
}
