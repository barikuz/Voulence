'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { JobCard } from '@/components/features/job-card';
import { SkeletonJobCard } from '@/components/ui/skeleton';
import { mockJobs } from '@/data/mock-data';
import { cn } from '@/lib/utils';

const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'writing', label: 'Writing' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'video', label: 'Video' },
    { value: 'audio', label: 'Audio' },
    { value: 'translation', label: 'Translation' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'other', label: 'Other' },
];

const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'budget-high', label: 'Budget: High to Low' },
    { value: 'budget-low', label: 'Budget: Low to High' },
    { value: 'deadline', label: 'Deadline: Soonest' },
];

const budgetRanges = [
    { value: 'all', label: 'Any Budget' },
    { value: '0-1000', label: 'Under 1,000 XLM' },
    { value: '1000-5000', label: '1,000 - 5,000 XLM' },
    { value: '5000-10000', label: '5,000 - 10,000 XLM' },
    { value: '10000+', label: '10,000+ XLM' },
];

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [budgetRange, setBudgetRange] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    const filteredJobs = useMemo(() => {
        let jobs = [...mockJobs];

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            jobs = jobs.filter(
                (job) =>
                    job.title.toLowerCase().includes(query) ||
                    job.description.toLowerCase().includes(query) ||
                    job.skills.some((skill) => skill.toLowerCase().includes(query))
            );
        }

        // Filter by category
        if (category !== 'all') {
            jobs = jobs.filter((job) => job.category === category);
        }

        // Filter by budget range
        if (budgetRange !== 'all') {
            jobs = jobs.filter((job) => {
                switch (budgetRange) {
                    case '0-1000':
                        return job.budget < 1000;
                    case '1000-5000':
                        return job.budget >= 1000 && job.budget < 5000;
                    case '5000-10000':
                        return job.budget >= 5000 && job.budget < 10000;
                    case '10000+':
                        return job.budget >= 10000;
                    default:
                        return true;
                }
            });
        }

        // Sort jobs
        switch (sortBy) {
            case 'oldest':
                jobs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case 'budget-high':
                jobs.sort((a, b) => b.budget - a.budget);
                break;
            case 'budget-low':
                jobs.sort((a, b) => a.budget - b.budget);
                break;
            case 'deadline':
                jobs.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
                break;
            default:
                jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return jobs;
    }, [searchQuery, category, sortBy, budgetRange]);

    const openJobs = filteredJobs.filter((job) => job.status === 'open');

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-b from-primary-500/10 to-transparent border-b border-[rgb(var(--border))]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                            Find Your Next <span className="gradient-primary-text">Opportunity</span>
                        </h1>
                        <p className="text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
                            Browse {openJobs.length} open jobs from verified employers with secure escrow payments
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <Input
                            placeholder="Search jobs by title, skills, or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            leftIcon={<Search className="h-5 w-5" />}
                            variant="glass"
                            className="h-14 text-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters Bar */}
                <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                    <div className="flex flex-wrap gap-3 items-center">
                        <Select
                            options={categories}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <Select
                            options={budgetRanges}
                            value={budgetRange}
                            onChange={(e) => setBudgetRange(e.target.value)}
                        />
                        <Select
                            options={sortOptions}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className="p-2"
                            aria-label="Grid view"
                        >
                            <Grid className="h-5 w-5" />
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className="p-2"
                            aria-label="List view"
                        >
                            <List className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Active Filters */}
                {(category !== 'all' || budgetRange !== 'all' || searchQuery) && (
                    <div className="flex flex-wrap gap-2 items-center mb-6">
                        <span className="text-sm text-[rgb(var(--muted-foreground))]">Active filters:</span>
                        {searchQuery && (
                            <Badge variant="primary" className="cursor-pointer" onClick={() => setSearchQuery('')}>
                                Search: {searchQuery} ×
                            </Badge>
                        )}
                        {category !== 'all' && (
                            <Badge variant="primary" className="cursor-pointer" onClick={() => setCategory('all')}>
                                {categories.find((c) => c.value === category)?.label} ×
                            </Badge>
                        )}
                        {budgetRange !== 'all' && (
                            <Badge variant="primary" className="cursor-pointer" onClick={() => setBudgetRange('all')}>
                                {budgetRanges.find((b) => b.value === budgetRange)?.label} ×
                            </Badge>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setSearchQuery('');
                                setCategory('all');
                                setBudgetRange('all');
                            }}
                            className="text-sm"
                        >
                            Clear all
                        </Button>
                    </div>
                )}

                {/* Results Count */}
                <p className="text-sm text-[rgb(var(--muted-foreground))] mb-6">
                    Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
                </p>

                {/* Jobs Grid/List */}
                {filteredJobs.length === 0 ? (
                    <Card variant="glass" padding="lg" className="text-center py-16">
                        <Search className="h-12 w-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                        <p className="text-[rgb(var(--muted-foreground))] mb-4">
                            Try adjusting your search or filter criteria
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery('');
                                setCategory('all');
                                setBudgetRange('all');
                            }}
                        >
                            Clear Filters
                        </Button>
                    </Card>
                ) : (
                    <div
                        className={cn(
                            'grid gap-6',
                            viewMode === 'grid'
                                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                : 'grid-cols-1'
                        )}
                    >
                        {filteredJobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                variant={viewMode === 'list' ? 'compact' : 'default'}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
