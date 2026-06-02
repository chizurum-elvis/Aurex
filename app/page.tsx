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

            {/* 1. HERO CONTROLLER AREA */}
            <header className="min-h-[85vh] w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center relative pt-20">

                {/* Enhanced atmospheric terminal layout ambient glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[350px] bg-emerald-500/[0.04] blur-[140px] rounded-full pointer-events-none" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[400px] h-[150px] bg-violet-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

                {/* Core Product Badge Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/40 border border-zinc-800/80 text-[10px] sm:text-[11px] font-medium tracking-tight text-emerald-400/90 mb-8 backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-emerald-500 fill-emerald-500/10 shrink-0" />
                    <span className="font-mono tracking-wider uppercase">The Unified Commodities Terminal</span>
                </div>

                {/* IMMERSIVE TYPOGRAPHY */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-5xl leading-[1.1] bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-500 bg-clip-text text-transparent px-2 sm:px-0">
                    Real-time commodity data. <br className="hidden md:inline" />
                    Engineered for fast execution.
                </h1>

                {/* Expanded Subtext Block */}
                <p className="mt-8 text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl font-medium leading-relaxed px-4 sm:px-0">
                    Stream dynamic price matrices, track multi-source indexes, and evaluate asset cross-resistances instantly inside a sleek single-view interface.
                </p>

                {/* 🌟 FIX: Removed forced mobile block expanding. Uses "inline-flex" and "w-auto" to mirror the desktop look perfectly */}
                <div className="mt-10 inline-flex items-center justify-center transform transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]">
                    <div className="w-auto bg-zinc-900/40 rounded-xl p-1 border border-zinc-800/40 backdrop-blur-sm flex items-center justify-center">
                        <AuthControls
                            signInLabel="NONE"
                            signUpLabel="Open Terminal View"
                        />
                    </div>
                </div>

            </header>

            {/* 2. THE FEATURE SHOWCASE SYSTEM */}
            <div className="w-full bg-gradient-to-b from-transparent via-zinc-900/10 to-transparent border-y border-zinc-900/40">
                <FeatureShowcase />
            </div>

            <hr className="border-t border-zinc-900 w-full max-w-7xl mx-auto px-4 sm:px-6 opacity-60" />

            {/* 3. CONVERSION PIPELINE GRID LAYOUT */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center relative">
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[200px] bg-emerald-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-xl mx-auto flex flex-col items-center px-2 sm:px-0">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                        Speed up your market alignment.
                    </h3>
                    <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed mb-10 font-medium max-w-md">
                        Skip the bloated analytical suites. Get direct access to uncompromised index realities. Experience immediate setup functionality.
                    </p>

                    {/* 🌟 FIX: Applied matching alignment geometry to the footer conversion banner too */}
                    <div className="inline-flex items-center justify-center transform transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]">
                        <div className="w-auto bg-zinc-900/40 rounded-xl p-1 border border-zinc-800/40 backdrop-blur-sm flex items-center justify-center">
                            <AuthControls
                                signInLabel="NONE"
                                signUpLabel="Initialize Connection Matrix"
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