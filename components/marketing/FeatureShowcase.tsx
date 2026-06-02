"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Activity, BarChart3, Star, Compass, Terminal } from "lucide-react";

const FEATURES = [
    {
        id: "live-feed",
        title: "Live Index Feed",
        badge: "Real-Time Core",
        icon: Activity,
        fileName: "/Live_Index_Feed.png",
        description: "Stream dynamic price matrices and track multi-source asset indexes simultaneously.",
        details: "Engineered with sub-millisecond updates to ensure execution-ready precision across global commodity vectors without interface latency."
    },
    {
        id: "charts",
        title: "Historical Charts",
        badge: "Deep Analytics",
        icon: BarChart3,
        fileName: "/Historical_Charts.png",
        description: "Evaluate asset cross-resistances over custom historical baselines.",
        details: "Uncover deep technical patterns with institutional-grade visualization tools structured for asset comparisons and volatility profiling."
    },
    {
        id: "watchlist",
        title: "My Watchlist",
        badge: "Personal Hub",
        icon: Star,
        fileName: "/Watchlist_Page.png",
        description: "Isolate, monitor, and curate high-priority asset categories.",
        details: "Build a highly focused command view. Filter the noise out of the broader market to track individual liquidity movements instantly."
    },
    {
        id: "explore",
        title: "Explore Markets",
        badge: "Global Discovery",
        icon: Compass,
        fileName: "/Explore.png",
        description: "Discover emerging commodities and spot market opportunities globally.",
        details: "A comprehensive map of macro-trends. Dig into structural shifts across primary energy sectors, soft materials, and precious physical assets."
    }
];

export default function FeatureShowcase() {
    const [activeTab, setActiveTab] = useState(FEATURES[0]);

    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative">
            <div className="absolute top-1/3 left-1/4 w-full max-w-[500px] h-[250px] bg-emerald-500/[0.02] blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-2xl mb-12 sm:b-16 text-center mx-auto mt-6">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    Built for modern operations.
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium px-2 sm:px-0">
                    A granular view into physical and synthetic market pricing. Switch views seamlessly to control your terminal workspace context.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                {/* Left Control Column */}
                {/* 🌟 LAYOUT ADJUSTMENT: Automatically switches to a swipeable horizontal layout rail on small viewports */}
                <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 w-full overflow-x-auto pb-3 lg:pb-0 scrollbar-none flex-nowrap shrink-0 px-1 lg:px-0">
                    {FEATURES.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab.id === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item)}
                                className={`text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 group relative select-none shrink-0 w-[270px] sm:w-[320px] lg:w-full ${
                                    isActive
                                        ? "bg-zinc-900/60 border-zinc-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]"
                                        : "bg-transparent border-transparent hover:bg-zinc-900/20"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {/* 🌟 BOUNDARY SHIELDING: Explicit box bounds protect icon element scaling */}
                                    <div className={`h-8 w-8 min-w-[32px] rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                                        isActive
                                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                            : "bg-zinc-900 border-zinc-800 text-zinc-500 group-hover:text-zinc-300"
                                    }`}>
                                        <Icon className="w-4 h-4 shrink-0" />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase block mb-0.5">
                                            {item.badge}
                                        </span>
                                        <span className={`text-xs sm:text-sm font-semibold transition-colors block truncate ${
                                            isActive ? "text-zinc-100" : "text-zinc-400 group-hover:text-zinc-200"
                                        }`}>
                                            {item.title}
                                        </span>
                                    </div>
                                </div>

                                {/* 🌟 SMOOTH TEXT FOLDERS: Max height animations handle smooth vertical transitions on desktop layouts */}
                                <div className={`hidden lg:grid transition-all duration-300 ease-in-out ${
                                    isActive ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0 pointer-events-none"
                                }`}>
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-medium text-zinc-300 leading-relaxed">
                                            {item.description}
                                        </p>
                                        <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">
                                            {item.details}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Right Dashboard Container Column */}
                <div className="lg:col-span-8 w-full relative">
                    {/* Dynamic highlight backing mask glow */}
                    <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/10 to-transparent rounded-2xl blur-md opacity-40 pointer-events-none" />

                    <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950 shadow-[0_0_50px_rgba(0,0,0,0.85)] overflow-hidden w-full">

                        {/* Window Chrome Header Layout */}
                        <div className="bg-zinc-900/20 border-b border-zinc-900/60 px-4 py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-1.5 shrink-0">
                                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                            </div>

                            <div className="bg-zinc-950 border border-zinc-900 px-3 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono tracking-tight text-zinc-500 flex items-center gap-1.5 min-w-0 max-w-[200px] sm:max-w-none truncate">
                                <Terminal className="h-2.5 w-2.5 text-zinc-600 shrink-0" />
                                <span className="truncate">aurex.app/{activeTab.id === "live-feed" ? "dashboard" : `dashboard/${activeTab.id.split("-")[0]}`}</span>
                            </div>

                            <div className="w-8 sm:w-12 shrink-0 hidden sm:block" />
                        </div>

                        {/* Viewport Canvas Wrapper Area */}
                        <div className="bg-zinc-950 aspect-[16/10] w-full relative overflow-hidden flex items-center justify-center p-1 sm:p-2 md:p-4">
                            <Image
                                src={activeTab.fileName}
                                alt={`Aurex platform - ${activeTab.title}`}
                                fill
                                priority
                                className="object-contain p-1.5 sm:p-3 md:p-4 transition-all duration-500 ease-out"
                                sizes="(max-w-7xl) 100vw, 800px"
                            />

                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none mix-blend-overlay" />
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}