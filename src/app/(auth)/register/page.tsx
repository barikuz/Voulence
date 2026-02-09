'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Eye,
    EyeOff,
    Wallet,
    Mail,
    Lock,
    User,
    ArrowRight,
    CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const roles = [
    {
        id: 'freelancer',
        title: 'Freelancer',
        description: 'Find jobs and get paid securely',
        icon: '💼',
    },
    {
        id: 'employer',
        title: 'Employer',
        description: 'Post jobs and hire talent',
        icon: '🏢',
    },
];

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        router.push('/dashboard');
    };

    const handleWalletRegister = async () => {
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
                    {step === 1 && (
                        <>
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold mb-2">Create your account</h1>
                                <p className="text-[rgb(var(--muted-foreground))]">
                                    Choose your role to get started
                                </p>
                            </div>

                            <div className="space-y-3 mb-6">
                                {roles.map((role) => (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => setFormData((prev) => ({ ...prev, role: role.id }))}
                                        className={cn(
                                            'w-full p-4 rounded-xl border-2 text-left transition-all',
                                            formData.role === role.id
                                                ? 'border-primary-500 bg-primary-500/10'
                                                : 'border-[rgb(var(--border))] hover:border-primary-500/50'
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl">{role.icon}</span>
                                            <div className="flex-1">
                                                <p className="font-semibold">{role.title}</p>
                                                <p className="text-sm text-[rgb(var(--muted-foreground))]">
                                                    {role.description}
                                                </p>
                                            </div>
                                            {formData.role === role.id && (
                                                <CheckCircle className="h-5 w-5 text-primary-500" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <Button
                                variant="primary"
                                className="w-full"
                                disabled={!formData.role}
                                onClick={() => setStep(2)}
                                rightIcon={<ArrowRight className="h-4 w-4" />}
                            >
                                Continue
                            </Button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold mb-2">Sign up as {formData.role}</h1>
                                <p className="text-[rgb(var(--muted-foreground))]">
                                    Connect your wallet or use email
                                </p>
                            </div>

                            {/* Quick Wallet Signup */}
                            <Button
                                variant="outline"
                                className="w-full h-14 justify-start gap-4 mb-4"
                                onClick={handleWalletRegister}
                                isLoading={isLoading}
                            >
                                <div className="h-8 w-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
                                    <Wallet className="h-4 w-4 text-primary-500" />
                                </div>
                                <span>Quick sign up with wallet</span>
                            </Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[rgb(var(--border))]" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-[rgb(var(--card))] px-4 text-[rgb(var(--muted-foreground))]">
                                        or continue with email
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Full Name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                    leftIcon={<User className="h-4 w-4" />}
                                    required
                                />
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
                                    placeholder="Create a password"
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
                                    hint="Must be at least 8 characters"
                                    required
                                />
                                <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
                                    Create Account
                                </Button>
                            </form>

                            <Button variant="ghost" className="w-full mt-4" onClick={() => setStep(1)}>
                                Back
                            </Button>
                        </>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary-500 hover:text-primary-400 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </Card>

                <p className="text-center text-xs text-[rgb(var(--muted-foreground))] mt-6">
                    By creating an account, you agree to our{' '}
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
