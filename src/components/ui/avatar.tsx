import { forwardRef, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    fallback?: string;
    status?: 'online' | 'offline' | 'away' | 'busy';
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
    (
        {
            className,
            src,
            alt = 'Avatar',
            size = 'md',
            fallback,
            status,
            ...props
        },
        ref
    ) => {
        const sizes = {
            xs: 'h-6 w-6 text-xs',
            sm: 'h-8 w-8 text-sm',
            md: 'h-10 w-10 text-base',
            lg: 'h-12 w-12 text-lg',
            xl: 'h-16 w-16 text-xl',
        };

        const statusColors = {
            online: 'bg-emerald-500',
            offline: 'bg-gray-400',
            away: 'bg-amber-500',
            busy: 'bg-red-500',
        };

        const statusSizes = {
            xs: 'h-1.5 w-1.5',
            sm: 'h-2 w-2',
            md: 'h-2.5 w-2.5',
            lg: 'h-3 w-3',
            xl: 'h-4 w-4',
        };

        const getInitials = (name: string) => {
            return name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        };

        return (
            <div className={cn('relative inline-flex shrink-0', sizes[size])}>
                {src ? (
                    <img
                        ref={ref}
                        src={src}
                        alt={alt}
                        className={cn(
                            'h-full w-full rounded-full object-cover',
                            'ring-2 ring-[rgb(var(--background))]',
                            className
                        )}
                        {...props}
                    />
                ) : (
                    <div
                        className={cn(
                            'flex h-full w-full items-center justify-center rounded-full',
                            'bg-gradient-to-br from-primary-500 to-accent-500',
                            'text-white font-semibold',
                            'ring-2 ring-[rgb(var(--background))]',
                            className
                        )}
                    >
                        {fallback ? (
                            getInitials(fallback)
                        ) : (
                            <User className="h-1/2 w-1/2" />
                        )}
                    </div>
                )}
                {status && (
                    <span
                        className={cn(
                            'absolute bottom-0 right-0 rounded-full',
                            'ring-2 ring-[rgb(var(--background))]',
                            statusColors[status],
                            statusSizes[size]
                        )}
                    />
                )}
            </div>
        );
    }
);

Avatar.displayName = 'Avatar';

interface AvatarGroupProps {
    children: React.ReactNode;
    max?: number;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function AvatarGroup({ children, max = 4, size = 'md' }: AvatarGroupProps) {
    const childArray = Array.isArray(children) ? children : [children];
    const visibleAvatars = childArray.slice(0, max);
    const remainingCount = childArray.length - max;

    const spacings = {
        xs: '-space-x-2',
        sm: '-space-x-2.5',
        md: '-space-x-3',
        lg: '-space-x-4',
        xl: '-space-x-5',
    };

    const sizes = {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
    };

    return (
        <div className={cn('flex items-center', spacings[size])}>
            {visibleAvatars}
            {remainingCount > 0 && (
                <div
                    className={cn(
                        'flex items-center justify-center rounded-full',
                        'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]',
                        'ring-2 ring-[rgb(var(--background))]',
                        'font-medium',
                        sizes[size]
                    )}
                >
                    +{remainingCount}
                </div>
            )}
        </div>
    );
}

export { Avatar };
export type { AvatarProps };
