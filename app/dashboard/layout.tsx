'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { BarChart3, Star, TrendingUp, Settings, LogOut, Compass } from 'lucide-react';
import { useSidebarStore } from '@/lib/store';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IdentityProvider, useIdentity } from '@/context/IdentityContext';

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useUser();
    const { signOut } = useClerk();
    const { isSidebarOpen, toggleSidebar } = useSidebarStore();

    const { displayName } = useIdentity();

    const sidebarLinks = [
        { name: 'Live Index Feed', href: '/dashboard', icon: BarChart3 },
        { name: 'Historical Charts', href: '/dashboard/analytics', icon: TrendingUp },
        { name: 'Explore', href: '/dashboard/explore', icon: Compass },
        { name: 'My Watchlist', href: '/dashboard/watchlist', icon: Star },
    ];

    return (
        <div className="relative flex h-screen w-screen bg-zinc-950 text-zinc-50 pt-16 overflow-hidden">

            {/* 🌟 MOBILE OVERLAY BACKDROP: Darkens background when sidebar is open on small screens */}
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 top-16 bg-black/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
                />
            )}

            {/* SIDEBAR NAVIGATION PANEL */}
            <aside
                // 🌟 TAILWIND LAYER CHANGE: Swapped fixed left layouts for clear mobile breakpoints
                className={`fixed left-0 bottom-0 top-16 bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between transition-all duration-300 ease-in-out z-40 shrink-0 ${
                    isSidebarOpen
                        ? 'w-64 translate-x-0'
                        : 'w-64 -translate-x-full lg:w-0'
                }`}
            >
                {/* Top Links Section */}
                <div className="flex flex-col overflow-y-auto grow">
                    <div className="p-6 border-b border-zinc-900 min-w-[256px]">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-extrabold tracking-wider text-white">WORKSPACE PANELS</span>
                        </div>
                    </div>

                    <nav className="p-4 space-y-1 min-w-[256px]">
                        {sidebarLinks.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => {
                                        // 🌟 Mobile-first optimization: Close sidebar automatically when selecting a panel view line link
                                        if (window.innerWidth < 1024) toggleSidebar();
                                    }}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                                        isActive
                                            ? 'bg-zinc-900 text-white font-medium border border-zinc-800'
                                            : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                                    }`}
                                >
                                    <Icon className="w-4 h-4 shrink-0" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* BOTTOM PROFILE AREA */}
                <div className="p-4 border-t border-zinc-900 bg-zinc-950 min-w-[256px] shrink-0 pb-6">
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="w-full flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-zinc-900/60 border border-transparent hover:border-zinc-900 text-left transition-all group">
                                <div className="flex items-center gap-3 truncate">
                                    <img src={user?.imageUrl || 'https://via.placeholder.com/150'} alt="Avatar" className="w-8 h-8 rounded-full border border-zinc-800 shrink-0 object-cover" />
                                    <div className="flex flex-col truncate">
                                        <span className="text-xs font-semibold text-zinc-200 group-hover:text-white truncate">
                                            {displayName || 'User Account'}
                                        </span>
                                        <span className="text-[10px] text-zinc-500 truncate">
                                            {user?.primaryEmailAddress?.emailAddress}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        </PopoverTrigger>

                        <PopoverContent side="top" align="start" className="w-60 bg-zinc-950 border border-zinc-900 p-3 rounded-xl shadow-2xl space-y-3 z-50 mb-2">
                            <div>
                                <p className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-2 px-2">Account Profile</p>
                                <div className="flex items-center justify-between bg-zinc-900/40 border border-zinc-900 p-2 rounded-lg">
                                    <div className="flex items-center gap-2 truncate">
                                        <img src={user?.imageUrl || 'https://via.placeholder.com/150'} alt="Avatar" className="w-6 h-6 rounded-full object-cover border border-zinc-800" />
                                        <span className="text-xs font-semibold text-zinc-200 truncate">
                                            {displayName}
                                        </span>
                                    </div>
                                    <span className="inline-flex items-center gap-1 bg-emerald-950 border border-emerald-800 text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full select-none">
                                        <span className="h-1 w-1 rounded-full bg-emerald-400" /> Active
                                    </span>
                                </div>
                            </div>
                            <div className="h-px bg-zinc-900" />
                            <div className="space-y-0.5">
                                <Link href="/dashboard/settings" className="flex items-center gap-2.5 px-2 py-2 rounded-md text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
                                    <Settings className="w-3.5 h-3.5" /> Account Settings
                                </Link>
                                <button
                                    onClick={() => signOut({ redirectUrl: '/' })}
                                    className="w-full text-zinc-400 hover:text-red-400 flex items-center gap-2.5 px-2 py-2 rounded-md text-xs hover:bg-red-950/20 transition-colors cursor-pointer text-left"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </aside>

            {/* MAIN CONTENT CANVAS CONTAINER */}
            <div
                // 🌟 THE RESPONSIVE SPACING FIX: Utilizes `lg:pl-64` only for large desktop monitors.
                // On phones and mobile tablets, the content is full width (`pl-0`) to perfectly utilize space.
                className={`flex-1 flex flex-col h-full w-full overflow-hidden transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? 'lg:pl-64 pl-0' : 'pl-0'
                }`}
            >
                {/* 🌟 ADAPTIVE CONTENT INNER CANVAS: Changes view padding proportionally per device width scale */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-zinc-950">
                    {children}
                </main>
            </div>

        </div>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();

    const savedMetadataName = user?.publicMetadata?.customDisplayName as string;
    const activeGmailAddress = user?.primaryEmailAddress?.emailAddress;
    const standardProfileName = user?.fullName || user?.firstName;

    const dynamicClerkDefaultName = savedMetadataName || standardProfileName || activeGmailAddress || 'User Account';

    return (
        <IdentityProvider authDefaultName={dynamicClerkDefaultName} key={user?.id || 'anonymous'}>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </IdentityProvider>
    );
}