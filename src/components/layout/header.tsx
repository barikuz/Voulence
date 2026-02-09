'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Menu,
    X,
    Sun,
    Moon,
    Bell,
    Wallet,
    ChevronDown,
    LogOut,
    User,
    Settings,
    Home,
    Briefcase,
    LayoutDashboard,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/providers/theme-provider';
import { useWallet } from '@/providers/wallet-provider';
import { truncateAddress } from '@/lib/utils';
import { WalletModal } from '@/components/wallet/wallet-modal';

const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [walletModalOpen, setWalletModalOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const { isConnected, address, balance, disconnect } = useWallet();

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-[rgb(var(--background))] border-b border-[rgb(var(--border))]">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center neon-glow">
                                <span className="text-white font-bold text-lg">V</span>
                            </div>
                            <span className="text-xl font-bold gradient-primary-text">
                                Voulence
                            </span>
                        </Link>
                    </div>

                    {/* Right Side: Navigation + Wallet + Theme (Desktop) */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Desktop Navigation */}
                        <div className="flex items-center gap-1 mr-4">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href ||
                                    (item.href !== '/' && pathname.startsWith(item.href));
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                            isActive
                                                ? 'bg-primary-500/10 text-primary-500'
                                                : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))]'
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Notifications */}
                        {isConnected && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-10 w-10 p-0 rounded-full relative"
                                aria-label="Notifications"
                            >
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
                            </Button>
                        )}

                        {/* Wallet / Profile */}
                        {isConnected ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-[rgb(var(--secondary))] hover:bg-primary-500/10 transition-colors"
                                >
                                    <Avatar
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                                        size="sm"
                                        status="online"
                                    />
                                    <div className="hidden sm:flex flex-col items-start">
                                        <span className="text-sm font-medium">
                                            {truncateAddress(address || '', 4)}
                                        </span>
                                        <span className="text-xs text-primary-400">
                                            {balance.toLocaleString()} XLM
                                        </span>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                                </button>

                                {/* Profile Dropdown */}
                                {profileMenuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setProfileMenuOpen(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] shadow-xl z-50 py-2">
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-500/10 transition-colors"
                                                onClick={() => setProfileMenuOpen(false)}
                                            >
                                                <User className="h-4 w-4" />
                                                <span className="text-sm">Profile</span>
                                            </Link>
                                            <Link
                                                href="/dashboard"
                                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-500/10 transition-colors"
                                                onClick={() => setProfileMenuOpen(false)}
                                            >
                                                <Settings className="h-4 w-4" />
                                                <span className="text-sm">Dashboard</span>
                                            </Link>
                                            <div className="my-2 border-t border-[rgb(var(--border))]" />
                                            <button
                                                onClick={() => {
                                                    disconnect();
                                                    setProfileMenuOpen(false);
                                                }}
                                                className="flex items-center gap-3 px-4 py-2.5 w-full hover:bg-red-500/10 text-red-400 transition-colors"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span className="text-sm">Disconnect</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Button
                                variant="neon"
                                size="sm"
                                onClick={() => setWalletModalOpen(true)}
                                leftIcon={<Wallet className="h-4 w-4" />}
                            >
                                Connect Wallet
                            </Button>
                        )}

                        {/* Theme Toggle - Far Right */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleTheme}
                            className="h-10 w-10 p-0 rounded-full"
                            aria-label="Toggle theme"
                        >
                            {resolvedTheme === 'dark' ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>
                    </div>

                    {/* Mobile: Wallet + Theme + Menu Toggle */}
                    <div className="flex md:hidden items-center gap-2">
                        {/* Wallet Button (Mobile) */}
                        {!isConnected && (
                            <Button
                                variant="neon"
                                size="sm"
                                onClick={() => setWalletModalOpen(true)}
                                leftIcon={<Wallet className="h-4 w-4" />}
                            >
                                Connect
                            </Button>
                        )}

                        {/* Theme Toggle (Mobile) */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleTheme}
                            className="h-10 w-10 p-0 rounded-full"
                            aria-label="Toggle theme"
                        >
                            {resolvedTheme === 'dark' ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-10 w-10 p-0 rounded-full"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[rgb(var(--border))]">
                        <div className="flex flex-col gap-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href ||
                                    (item.href !== '/' && pathname.startsWith(item.href));
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                                            isActive
                                                ? 'bg-primary-500/10 text-primary-500'
                                                : 'text-[rgb(var(--muted-foreground))]'
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>

            {/* Wallet Modal */}
            <WalletModal
                isOpen={walletModalOpen}
                onClose={() => setWalletModalOpen(false)}
            />
        </header>
    );
}
