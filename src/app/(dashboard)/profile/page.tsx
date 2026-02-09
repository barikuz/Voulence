'use client';

import { useState } from 'react';
import {
    User,
    Mail,
    MapPin,
    Briefcase,
    Star,
    Calendar,
    Edit2,
    Camera,
    Save,
    X,
    Plus,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { currentUser } from '@/data/mock-data';
import { formatDate, truncateAddress } from '@/lib/utils';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser.name,
        bio: currentUser.bio || '',
        location: currentUser.location || '',
        skills: currentUser.skills || [],
        newSkill: '',
    });

    const handleSave = async () => {
        // Simulate save
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsEditing(false);
    };

    const addSkill = () => {
        const skill = formData.newSkill.trim();
        if (skill && !formData.skills.includes(skill)) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, skill],
                newSkill: '',
            }));
        }
    };

    const removeSkill = (skill: string) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">Profile</h1>
                    <p className="text-[rgb(var(--muted-foreground))]">
                        Manage your public profile and settings.
                    </p>
                </div>
                {isEditing ? (
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => setIsEditing(false)} leftIcon={<X className="h-4 w-4" />}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave} leftIcon={<Save className="h-4 w-4" />}>
                            Save Changes
                        </Button>
                    </div>
                ) : (
                    <Button variant="outline" onClick={() => setIsEditing(true)} leftIcon={<Edit2 className="h-4 w-4" />}>
                        Edit Profile
                    </Button>
                )}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card variant="glass" padding="lg" className="lg:col-span-1">
                    <div className="text-center">
                        {/* Avatar */}
                        <div className="relative inline-block mb-4">
                            <Avatar src={currentUser.avatar} fallback={currentUser.name} size="xl" className="h-24 w-24" />
                            {isEditing && (
                                <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors">
                                    <Camera className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                className="text-center text-xl font-bold mb-1"
                            />
                        ) : (
                            <h2 className="text-xl font-bold mb-1">{currentUser.name}</h2>
                        )}
                        <p className="text-[rgb(var(--muted-foreground))]">@{currentUser.username}</p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 my-6 py-6 border-y border-[rgb(var(--border))]">
                            <div>
                                <p className="text-2xl font-bold">{currentUser.completedJobs}</p>
                                <p className="text-xs text-[rgb(var(--muted-foreground))]">Jobs</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold flex items-center justify-center gap-1">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    {currentUser.rating}
                                </p>
                                <p className="text-xs text-[rgb(var(--muted-foreground))]">Rating</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold capitalize">{currentUser.role}</p>
                                <p className="text-xs text-[rgb(var(--muted-foreground))]">Role</p>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-3 text-left">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                                {isEditing ? (
                                    <Input
                                        value={formData.location}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                                        placeholder="Location"
                                        className="flex-1"
                                    />
                                ) : (
                                    <span className="text-sm">{currentUser.location || 'Not specified'}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                                <span className="text-sm">Joined {formatDate(currentUser.joinedAt)}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Briefcase className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                                <span className="text-sm">{currentUser.walletAddress ? truncateAddress(currentUser.walletAddress, 6) : 'No wallet connected'}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Profile Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Bio */}
                    <Card variant="glass" padding="lg">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {isEditing ? (
                                <Textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                                    placeholder="Tell us about yourself..."
                                    className="min-h-[120px]"
                                />
                            ) : (
                                <p className="text-[rgb(var(--muted-foreground))]">
                                    {currentUser.bio || 'No bio added yet.'}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card variant="glass" padding="lg">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle>Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="flex flex-wrap gap-2">
                                {(isEditing ? formData.skills : currentUser.skills || []).map((skill) => (
                                    <Badge
                                        key={skill}
                                        variant="secondary"
                                        size="lg"
                                        className={isEditing ? 'cursor-pointer pr-2' : ''}
                                        onClick={isEditing ? () => removeSkill(skill) : undefined}
                                    >
                                        {skill}
                                        {isEditing && <X className="h-3 w-3 ml-1" />}
                                    </Badge>
                                ))}
                                {isEditing && (
                                    <div className="flex gap-2 w-full mt-2">
                                        <Input
                                            value={formData.newSkill}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, newSkill: e.target.value }))}
                                            placeholder="Add a skill"
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                            className="flex-1"
                                        />
                                        <Button variant="outline" onClick={addSkill} leftIcon={<Plus className="h-4 w-4" />}>
                                            Add
                                        </Button>
                                    </div>
                                )}
                            </div>
                            {(!currentUser.skills || currentUser.skills.length === 0) && !isEditing && (
                                <p className="text-[rgb(var(--muted-foreground))]">No skills added yet.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Wallet Settings */}
                    <Card variant="glass" padding="lg">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle>Wallet Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <div className="p-4 rounded-xl bg-[rgb(var(--secondary))]">
                                <p className="text-sm text-[rgb(var(--muted-foreground))] mb-1">Connected Wallet</p>
                                <p className="font-mono text-sm">
                                    {currentUser.walletAddress || 'No wallet connected'}
                                </p>
                            </div>
                            <Button variant="outline">
                                {currentUser.walletAddress ? 'Change Wallet' : 'Connect Wallet'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
