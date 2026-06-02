'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useSidebarStore } from '@/lib/store';
import AuthControls from '@/components/AuthControls';
import Logo from '@/components/brand/Logo';

export default function Navbar() {
    const pathname = usePathname();
    const { isSignedIn } = useAuth();
    const { isSidebarOpen, toggleSidebar } = useSidebarStore();


    const logoHeight = 30;

    // Helper calculation to map path URLs to clean contextual title breadcrumbs
    const getPageTitle = () => {
        switch (pathname) {
            case '/dashboard': return 'Live Index Feed';
            case '/dashboard/analytics': return 'Historical Charts';
            case '/dashboard/watchlist': return 'My Watchlist';
            case '/dashboard/explore': return 'Explore';
            default: return '';
        }
    };

    const pageTitle = getPageTitle();

    // CRITICAL CHECK: Is the user currently looking at a dashboard route?
    const isInsideDashboard = pathname.startsWith('/dashboard');

    return (
        <nav className="fixed top-0 z-50 h-16 w-full border-b border-zinc-900 bg-zinc-950/80 px-6 backdrop-blur-md flex items-center justify-between text-zinc-100 select-none">

            {/* LEFT SECTION: Logo, Sidebar Controls, and Page Breadcrumbs */}
            <div className="flex items-center gap-4">
                {/* Dynamic Logo Path */}
                <Link href={isSignedIn ? "/dashboard" : "/"} className="flex items-center shrink-0 hover:opacity-90 transition-opacity">
                    {/* 🌟 3. Replace the raw <Image /> tags with your custom unified Logo element */}
                    <Logo height={logoHeight} />
                </Link>

                {/* Render this sub-navigation hub ONLY when inside the dashboard environment */}
                {isInsideDashboard && pageTitle && (
                    <div className="flex items-center gap-3 animate-fade-in">
                        {/* Visual Segment Splitter Line */}
                        <span className="h-4 w-px bg-zinc-800" />

                        {/* The Integrated Sidebar Open/Close Toggle Action Button */}
                        <button
                            onClick={toggleSidebar}
                            className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-800"
                            title={isSidebarOpen ? "Hide Sidebar Menu" : "Reveal Sidebar Menu"}
                        >
                            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                        </button>

                        {/* Live Context Page Breadcrumb Title */}
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 md:inline-block hidden">
                            / &nbsp; {pageTitle}
                        </span>
                    </div>
                )}
            </div>


            {/* RIGHT SECTION: Centralized Identity Authentication Management Controls */}
            <div>
                {!isInsideDashboard && <AuthControls />}
            </div>

        </nav>
    );
}