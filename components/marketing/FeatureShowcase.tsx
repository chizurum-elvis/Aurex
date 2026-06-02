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
        <section className="w-full max-w-7xl mx-auto px-6 py-20 relative">
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[250px] bg-emerald-500/[0.02] blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-2xl mb-16 text-center mx-auto mt-10">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    Built for modern operations.
                </h2>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-medium">
                    A granular view into physical and synthetic market pricing. Switch views seamlessly to control your terminal workspace context.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* Left Control Column */}
                <div className="lg:col-span-4 flex flex-col gap-3 w-full">
                    {FEATURES.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab.id === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item)}
                                className={`w-full text-left p-5 rounded-xl border transition-all duration-200 group relative select-none ${
                                    isActive
                                        ? "bg-zinc-900/60 border-zinc-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]"
                                        : "bg-transparent border-transparent hover:bg-zinc-900/20"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg border transition-colors ${
                                        isActive
                                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                            : "bg-zinc-900 border-zinc-800 text-zinc-500 group-hover:text-zinc-300"
                                    }`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                    <span className="text-[11px] font-mono font-bold tracking-wider text-zinc-500 uppercase block">
                      {item.badge}
                    </span>
                                        <span className={`text-sm font-semibold transition-colors ${
                                            isActive ? "text-zinc-100" : "text-zinc-400 group-hover:text-zinc-200"
                                        }`}>
                      {item.title}
                    </span>
                                    </div>
                                </div>

                                <div className={`grid transition-all duration-300 ease-in-out ${
                                    isActive ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
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
                    <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/10 to-transparent rounded-2xl blur-md opacity-40" />

                    <div className="relative rounded-xl border border-zinc-900 bg-zinc-950 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden">

                        {/* Window Chrome */}
                        <div className="bg-zinc-900/20 border-b border-zinc-900/60 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                            </div>

                            <div className="bg-zinc-950 border border-zinc-900 px-4 py-0.5 rounded-lg text-[10px] font-mono tracking-tight text-zinc-500 flex items-center gap-1.5">
                                <Terminal className="h-2.5 w-2.5 text-zinc-600" />
                                aurex.app/{activeTab.id === "live-feed" ? "dashboard" : `dashboard/${activeTab.id.split("-")[0]}`}
                            </div>

                            <div className="w-12" />
                        </div>

                        {/* Viewport Canvas Wrapper */}
                        {/* 🌟 FIX: Added an internal matte background (bg-zinc-950) to catch image boundaries gracefully */}
                        <div className="bg-zinc-950 aspect-[16/10] w-full relative overflow-hidden flex items-center justify-center">
                            <Image
                                src={activeTab.fileName}
                                alt={`Aurex platform - ${activeTab.title}`}
                                fill
                                priority
                                /* 🌟 FIX: Swapped object-cover to object-contain and added subtle padding to prevent clipping edge cut-offs */
                                className="object-contain p-2 md:p-4 transition-transform duration-500 ease-out"
                                sizes="(max-w-7xl) 100vw, 800px"
                            />

                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none mix-blend-overlay" />
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}