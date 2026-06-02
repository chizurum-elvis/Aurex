"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import FeatureShowcase from "@/components/marketing/FeatureShowcase";
import AuthControls from "@/components/AuthControls";

export default function HomePage() {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            router.push("/dashboard");
        }
    }, [isSignedIn, isLoaded, router]);

    if (!isLoaded || isSignedIn) {
        return <div className="min-h-screen bg-zinc-950" />;
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-emerald-500/30 overflow-x-hidden flex flex-col">

            <Navbar />

            {/* Hero Header Space */}
            {/* 🌟 SPACING ADJUSTMENT: Optimized padding top (pt-28 sm:pt-36) to prevent navigation overlaps across layout-shifts */}
            <main className="flex-1 relative pt-28 sm:pt-36 pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
                {/* Responsive blur background container */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-[650px] h-[200px] sm:h-[240px] bg-emerald-500/[0.03] blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800/60 text-[10px] sm:text-[11px] font-medium tracking-tight text-emerald-400/90 mb-6 backdrop-blur-sm">
                    <Sparkles className="h-3 w-3 text-emerald-500 fill-emerald-500/10 shrink-0" />
                    <span>The Unified Commodities Terminal</span>
                </div>

                {/* 🌟 TYPE RIGGING: text-3xl standard baseline prevents vertical word layout collapsing on extra-small viewports */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.15] sm:leading-[1.12] bg-gradient-to-b from-zinc-50 via-zinc-200 to-zinc-500 bg-clip-text text-transparent px-2 sm:px-0">
                    Real-time commodity data. <br className="hidden sm:inline" />
                    Engineered for fast execution.
                </h1>

                <p className="mt-5 text-xs sm:text-sm text-zinc-400 max-w-xl font-medium leading-relaxed px-4 sm:px-0">
                    Stream dynamic price matrices, track multi-source indexes, and evaluate asset cross-resistances instantly inside a sleek single-view interface.
                </p>
            </main>

            {/* Responsive Visual Slide Gallery Deck */}
            <div className="w-full overflow-hidden">
                <FeatureShowcase />
            </div>

            <hr className="border-t border-zinc-900 w-full max-w-7xl mx-auto px-4 sm:px-6 opacity-60" />

            {/* Bottom Conversion Row */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center relative">
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[400px] h-[180px] bg-emerald-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-xl mx-auto flex flex-col items-center px-2 sm:px-0">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
                        Speed up your market alignment.
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8 font-medium max-w-md">
                        Skip the bloated analytical suites. Get direct access to uncompromised index realities. Experience immediate setup functionality.
                    </p>

                    {/* 🌟 ACTION INTERFACE COMPRESSION BLOCK: Isolates the authentication triggers safely */}
                    <div className="w-full max-w-xs sm:max-w-none flex justify-center transform transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]">
                        <div className="w-full sm:w-auto bg-zinc-900/40 rounded-xl p-1 border border-zinc-800/40 backdrop-blur-sm">
                            <AuthControls
                                signInLabel="NONE"
                                signUpLabel="Open Terminal View"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Area */}
            <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-zinc-900/40 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono tracking-tight text-zinc-600 gap-2 sm:gap-0">
                <span>AUREX SYSTEMS INC © 2026</span>
                <span className="tracking-widest sm:tracking-tight">LATENCY OPTIMIZED ENGINE</span>
            </footer>

        </div>
    );
}