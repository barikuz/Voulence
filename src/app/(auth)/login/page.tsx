'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Wallet, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginMethod, setLoginMethod] = useState<'email' | 'wallet'>('wallet');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        router.push('/dashboard');
    };

    const handleWalletLogin = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 relative">
            {/* Background */}
            <div className="absolute inset-0 gradient-mesh opacity-50 pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">V</span>
                        </div>
                        <span className="text-2xl font-bold gradient-primary-text">Voulence</span>
                    </Link>
                </div>

                <Card variant="glass" padding="lg">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
                        <p className="text-[rgb(var(--muted-foreground))]">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Login Method Toggle */}
                    <div className="flex rounded-xl bg-[rgb(var(--secondary))] p-1 mb-6">
                        <button
                            type="button"
                            onClick={() => setLoginMethod('wallet')}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === 'wallet'
                                    ? 'bg-[rgb(var(--card))] shadow-sm'
                                    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                                }`}
                        >
                            Wallet
                        </button>
                        <button
                            type="button"
                            onClick={() => setLoginMethod('email')}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === 'email'
                                    ? 'bg-[rgb(var(--card))] shadow-sm'
                                    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                                }`}
                        >
                            Email
                        </button>
                    </div>

                    {loginMethod === 'wallet' ? (
                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                className="w-full h-14 justify-start gap-4"
                                onClick={handleWalletLogin}
                                isLoading={isLoading}
                            >
                                <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <Wallet className="h-4 w-4 text-purple-500" />
                                </div>
                                <span>Connect with Freighter</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full h-14 justify-start gap-4"
                                disabled={isLoading}
                            >
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Wallet className="h-4 w-4 text-blue-500" />
                                </div>
                                <span>Connect with LOBSTR</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full h-14 justify-start gap-4"
                                disabled={isLoading}
                            >
                                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                    <Wallet className="h-4 w-4 text-emerald-500" />
                                </div>
                                <span>Connect with Albedo</span>
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleEmailLogin} className="space-y-4">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                leftIcon={<Mail className="h-4 w-4" />}
                                required
                            />
                            <Input
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                leftIcon={<Lock className="h-4 w-4" />}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                }
                                required
                            />
                            <div className="flex justify-end">
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-primary-500 hover:text-primary-400"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
                                Sign In
                            </Button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="text-primary-500 hover:text-primary-400 font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </Card>

                <p className="text-center text-xs text-[rgb(var(--muted-foreground))] mt-6">
                    By continuing, you agree to our{' '}
                    <Link href="/terms" className="underline hover:text-[rgb(var(--foreground))]">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="underline hover:text-[rgb(var(--foreground))]">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
}
