'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  Clock,
  CheckCircle,
  Star,
  Wallet,
  Globe,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BentoGrid, BentoItem, BentoCard } from '@/components/layout/bento-grid';
import { JobCard } from '@/components/features/job-card';
import { mockJobs } from '@/data/mock-data';

const features = [
  {
    icon: Shield,
    title: 'Secure Escrow',
    description: 'Funds are held securely in smart contracts until work is completed and approved.',
  },
  {
    icon: Zap,
    title: 'Instant Payments',
    description: 'Get paid instantly via Stellar blockchain with minimal transaction fees.',
  },
  {
    icon: Users,
    title: 'Dispute Resolution',
    description: 'Fair and transparent dispute resolution with trusted referees.',
  },
  {
    icon: Clock,
    title: 'Auto-Refund',
    description: 'Automatic refunds if work isnt completed within the deadline.',
  },
];

export default function HomePage() {
  const featuredJobs = mockJobs.filter((job) => job.status === 'open').slice(0, 3);

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <Badge variant="primary" size="lg" className="mb-6">
              <Star className="h-4 w-4 mr-1" />
              Powered by Stellar Blockchain
            </Badge>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Secure Freelance Payments{' '}
              <span className="gradient-primary-text">Without the Trust Issues</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-[rgb(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
              Voulence uses blockchain-powered escrow to ensure freelancers get paid
              and employers get quality work. No middlemen, no delays.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Find Jobs
                </Button>
              </Link>
              <Link href="/jobs/create">
                <Button variant="outline" size="lg">
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Voulence?
            </h2>
            <p className="text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              Built for the modern freelance economy with security, speed, and fairness at its core.
            </p>
          </div>

          <BentoGrid columns={2} gap="lg">
            {features.map((feature, index) => (
              <BentoItem key={feature.title}>
                <BentoCard variant="glass">
                  <div className="h-12 w-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-[rgb(var(--muted-foreground))]">
                    {feature.description}
                  </p>
                </BentoCard>
              </BentoItem>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[rgb(var(--secondary))]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Simple, Secure Process
            </h2>
          </div>

          <div className="grid md:grid-cols-7 gap-0 items-start">
            {[
              { icon: Wallet, title: 'Connect Wallet', description: 'Link your Stellar wallet to get started' },
              { icon: Globe, title: 'Post or Apply', description: 'Create a job listing or apply to existing ones' },
              { icon: Lock, title: 'Secure Escrow', description: 'Funds are locked in smart contract escrow' },
              { icon: CheckCircle, title: 'Get Paid', description: 'Instant payment upon work approval' },
            ].map((item, index, arr) => (
              <>
                <div key={item.title} className="text-center">
                  <div className="mb-4">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white mx-auto neon-glow">
                      <item.icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    {item.description}
                  </p>
                </div>
                {index < arr.length - 1 && (
                  <div className="hidden md:flex items-center justify-center h-16">
                    <ArrowRight className="h-10 w-10 text-primary-500" />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Featured Jobs
              </h2>
            </div>
            <Link href="/jobs">
              <Button variant="ghost" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View All
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600" />
            <div className="absolute inset-0 gradient-mesh opacity-30" />
            <div className="relative px-8 py-16 md:py-24 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of freelancers and employers who trust Voulence for secure, instant payments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-primary-600 hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-300"
                  >
                    Create Account
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white/20 text-white hover:bg-white/30 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-300"
                  >
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
