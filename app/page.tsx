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
        <main className="flex-1 relative pt-36 pb-12 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[650px] h-[240px] bg-emerald-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800/60 text-[11px] font-medium tracking-tight text-emerald-400/90 mb-6">
            <Sparkles className="h-3 w-3 text-emerald-500 fill-emerald-500/10" />
            <span>The Unified Commodities Terminal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.12] bg-gradient-to-b from-zinc-50 via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Real-time commodity data. <br />
            Engineered for fast execution.
          </h1>

          <p className="mt-6 text-xs sm:text-sm text-zinc-400 max-w-xl font-medium leading-relaxed">
            Stream dynamic price matrices, track multi-source indexes, and evaluate asset cross-resistances instantly inside a sleek single-view interface.
          </p>
        </main>

        {/* Responsive Visual Slide Gallery Deck */}
        <FeatureShowcase />

        <hr className="border-t border-zinc-900 w-full max-w-7xl mx-auto px-6 opacity-60" />

        {/* Bottom Conversion Row */}
        <section className="w-full max-w-7xl mx-auto px-6 py-24 text-center relative">
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[400px] h-[180px] bg-emerald-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-xl mx-auto flex flex-col items-center">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
              Speed up your market alignment.
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8 font-medium">
              Skip the bloated analytical suites. Get direct access to uncompromised index realities. Experience immediate setup functionality.
            </p>

            {/* 🌟 FIX: Passing the custom label override prop exclusively for this layout zone */}
            <div className="bg-zinc-900/40  transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]">
              <AuthControls
                  signInLabel="NONE"
                  signUpLabel="Open Terminal View"
              />
            </div>
          </div>
        </section>

        <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-zinc-900/40 flex items-center justify-between text-[10px] font-mono tracking-tight text-zinc-600">
          <span>AUREX SYSTEMS INC © 2026</span>
          <span>LATENCY OPTIMIZED ENGINE</span>
        </footer>

      </div>
  );
}