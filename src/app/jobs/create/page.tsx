'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    ArrowRight,
    DollarSign,
    Calendar,
    Tag,
    FileText,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'writing', label: 'Writing' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'video', label: 'Video Production' },
    { value: 'audio', label: 'Audio' },
    { value: 'translation', label: 'Translation' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'other', label: 'Other' },
];

const popularSkills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Figma', 'UI Design',
    'Solidity', 'Rust', 'Smart Contracts', 'SEO', 'Content Writing',
    'Video Editing', 'Motion Graphics', 'WordPress', 'AWS',
];

const steps = [
    { id: 1, name: 'Basic Info', icon: FileText },
    { id: 2, name: 'Requirements', icon: Tag },
    { id: 3, name: 'Budget & Timeline', icon: DollarSign },
    { id: 4, name: 'Review', icon: CheckCircle },
];

export default function CreateJobPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        skills: [] as string[],
        customSkill: '',
        budget: '',
        deadline: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const updateFormData = (field: string, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const toggleSkill = (skill: string) => {
        const current = formData.skills;
        if (current.includes(skill)) {
            updateFormData('skills', current.filter((s) => s !== skill));
        } else if (current.length < 10) {
            updateFormData('skills', [...current, skill]);
        }
    };

    const addCustomSkill = () => {
        const skill = formData.customSkill.trim();
        if (skill && !formData.skills.includes(skill) && formData.skills.length < 10) {
            updateFormData('skills', [...formData.skills, skill]);
            updateFormData('customSkill', '');
        }
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};

        switch (step) {
            case 1:
                if (!formData.title.trim()) newErrors.title = 'Title is required';
                if (!formData.category) newErrors.category = 'Category is required';
                if (!formData.description.trim()) newErrors.description = 'Description is required';
                if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
                break;
            case 2:
                if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
                break;
            case 3:
                if (!formData.budget || Number(formData.budget) <= 0) newErrors.budget = 'Valid budget is required';
                if (!formData.deadline) newErrors.deadline = 'Deadline is required';
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, 4));
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        if (!validateStep(3)) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        router.push('/dashboard');
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <Input
                            label="Job Title"
                            placeholder="e.g., Build a DeFi Dashboard with Stellar Integration"
                            value={formData.title}
                            onChange={(e) => updateFormData('title', e.target.value)}
                            error={errors.title}
                        />
                        <Select
                            label="Category"
                            options={categories}
                            value={formData.category}
                            onChange={(e) => updateFormData('category', e.target.value)}
                            placeholder="Select a category"
                            error={errors.category}
                        />
                        <Textarea
                            label="Job Description"
                            placeholder="Describe the job requirements, deliverables, and any specific details freelancers should know..."
                            value={formData.description}
                            onChange={(e) => updateFormData('description', e.target.value)}
                            error={errors.description}
                            hint={`${formData.description.length}/50 minimum characters`}
                            className="min-h-[200px]"
                        />
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-3">
                                Required Skills ({formData.skills.length}/10)
                            </label>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {popularSkills.map((skill) => (
                                    <button
                                        key={skill}
                                        type="button"
                                        onClick={() => toggleSkill(skill)}
                                        className={cn(
                                            'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                                            formData.skills.includes(skill)
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-primary-500/20'
                                        )}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                            {errors.skills && (
                                <p className="text-sm text-[rgb(var(--destructive))]">{errors.skills}</p>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Input
                                placeholder="Add custom skill"
                                value={formData.customSkill}
                                onChange={(e) => updateFormData('customSkill', e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
                                className="flex-1"
                            />
                            <Button variant="outline" onClick={addCustomSkill} disabled={!formData.customSkill.trim()}>
                                Add
                            </Button>
                        </div>

                        {formData.skills.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Selected Skills</label>
                                <div className="flex flex-wrap gap-2">
                                    {formData.skills.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant="primary"
                                            className="cursor-pointer"
                                            onClick={() => toggleSkill(skill)}
                                        >
                                            {skill} ×
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <Input
                            label="Budget (XLM)"
                            type="number"
                            placeholder="Enter amount in XLM"
                            value={formData.budget}
                            onChange={(e) => updateFormData('budget', e.target.value)}
                            error={errors.budget}
                            leftIcon={<DollarSign className="h-4 w-4" />}
                            hint="Funds will be held in escrow until job completion"
                        />
                        <Input
                            label="Deadline"
                            type="date"
                            value={formData.deadline}
                            onChange={(e) => updateFormData('deadline', e.target.value)}
                            error={errors.deadline}
                            leftIcon={<Calendar className="h-4 w-4" />}
                            hint="Freelancer must complete work before this date"
                        />
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="rounded-xl bg-[rgb(var(--secondary))] p-6 space-y-4">
                            <div>
                                <p className="text-sm text-[rgb(var(--muted-foreground))]">Job Title</p>
                                <p className="font-semibold">{formData.title}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[rgb(var(--muted-foreground))]">Category</p>
                                <p className="font-semibold capitalize">{formData.category}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[rgb(var(--muted-foreground))]">Description</p>
                                <p className="text-sm">{formData.description}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[rgb(var(--muted-foreground))]">Skills Required</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {formData.skills.map((skill) => (
                                        <Badge key={skill} variant="secondary">{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-[rgb(var(--muted-foreground))]">Budget</p>
                                    <p className="font-semibold text-xl gradient-primary-text">{formData.budget} XLM</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[rgb(var(--muted-foreground))]">Deadline</p>
                                    <p className="font-semibold">{formData.deadline}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">Important</p>
                                    <p className="text-sm text-[rgb(var(--muted-foreground))]">
                                        Once you post this job, {formData.budget} XLM will be transferred to the escrow
                                        smart contract. Funds will be released to the freelancer upon your approval.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen py-8">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        leftIcon={<ArrowLeft className="h-4 w-4" />}
                        className="mb-4"
                    >
                        Back
                    </Button>
                    <h1 className="text-2xl lg:text-3xl font-bold">Post a New Job</h1>
                    <p className="text-[rgb(var(--muted-foreground))]">
                        Fill out the details below to create your job listing
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between relative">
                        {/* Progress Line */}
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-[rgb(var(--border))]" />
                        <div
                            className="absolute top-5 left-0 h-0.5 bg-primary-500 transition-all duration-300"
                            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                        />

                        {steps.map((step) => {
                            const Icon = step.icon;
                            const isActive = step.id === currentStep;
                            const isCompleted = step.id < currentStep;

                            return (
                                <div key={step.id} className="relative flex flex-col items-center">
                                    <div
                                        className={cn(
                                            'h-10 w-10 rounded-full flex items-center justify-center z-10 transition-all',
                                            isCompleted
                                                ? 'bg-primary-500 text-white'
                                                : isActive
                                                    ? 'bg-primary-500 text-white neon-glow'
                                                    : 'bg-[rgb(var(--secondary))] text-[rgb(var(--muted-foreground))]'
                                        )}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle className="h-5 w-5" />
                                        ) : (
                                            <Icon className="h-5 w-5" />
                                        )}
                                    </div>
                                    <span
                                        className={cn(
                                            'mt-2 text-xs font-medium',
                                            isActive || isCompleted
                                                ? 'text-[rgb(var(--foreground))]'
                                                : 'text-[rgb(var(--muted-foreground))]'
                                        )}
                                    >
                                        {step.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Form Card */}
                <Card variant="glass" padding="lg">
                    {renderStep()}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgb(var(--border))]">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            leftIcon={<ArrowLeft className="h-4 w-4" />}
                        >
                            Back
                        </Button>

                        {currentStep === 4 ? (
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                                isLoading={isSubmitting}
                                className="min-w-[160px]"
                            >
                                Post Job & Fund Escrow
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                onClick={handleNext}
                                rightIcon={<ArrowRight className="h-4 w-4" />}
                            >
                                Continue
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
