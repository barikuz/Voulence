'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import { SidebarProvider, useSidebar } from '@/providers/sidebar-provider';

function DashboardContent({ children }: { children: ReactNode }) {
    const { isCollapsed } = useSidebar();

    return (
        <div className="min-h-screen">
            {/* Fixed Sidebar - below header */}
            <Sidebar className="hidden lg:flex" />

            {/* Content Area - dynamically responds to sidebar state */}
            <div
                className={`
                    min-h-screen flex flex-col
                    transition-all duration-300 ease-in-out
                    ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
                `}
            >
                <main className="flex-1 p-8">
                    {children}
                </main>
                <Footer forceShow />
            </div>
        </div>
    );
}

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <SidebarProvider>
            <DashboardContent>{children}</DashboardContent>
        </SidebarProvider>
    );
}
