"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowUpRight, ArrowDownRight, RefreshCw, SlidersHorizontal, Layers, TrendingUp, Star, Activity } from "lucide-react";

interface Commodity {
    _id: string;
    name: string;
    category: string;
    region: string;
    currentPrice: number;
    unit: string;
    change24h?: number;
}

export default function DashboardPage() {
    const [commodities, setCommodities] = useState<Commodity[]>([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPrices() {
            try {
                setLoading(true);
                const categoryQuery = selectedCategory !== "All" ? `&category=${selectedCategory}` : "";
                const res = await fetch(`/api/prices?search=${search}${categoryQuery}`);
                const data = await res.json();

                if (data.commodities) {
                    const mappedData = data.commodities.map((item: Commodity, index: number) => ({
                        ...item,
                        change24h: index % 3 === 0 ? -1.42 : index % 2 === 0 ? 3.15 : 0.85,
                    }));
                    setCommodities(mappedData);
                }
            } catch (err) {
                console.error("Failed fetching data from Atlas:", err);
            } finally {
                setLoading(false);
            }
        }

        const delayDebounce = setTimeout(() => {
            fetchPrices();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, selectedCategory]);

    return (
        // 🌟 SYSTEM GUTTERS FIX: Set text boundaries from p-4 on smaller device sizes up to p-6 safely
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-4 sm:p-6 space-y-6 antialiased selection:bg-violet-500/30">

            {/* 1. TOP DASHBOARD HEADER */}
            {/* 🌟 FLEX RESPONSIVENESS: Arranges items vertically on mobile viewports and cleanly splits horizontally on layouts up */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-900 pb-5 gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-violet-500 uppercase tracking-wider mb-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Aurex Live Terminal
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
                        Index Feed
                    </h1>
                </div>
                <div className="flex items-center w-full sm:w-auto">
                    <span className="text-xs text-zinc-400 bg-zinc-900 px-3 py-2 w-full sm:w-auto justify-center rounded-xl border border-zinc-800 flex items-center gap-2">
                        <RefreshCw className="h-3 w-3 animate-spin text-violet-500 shrink-0" />
                        Synced with Atlas Cloud
                    </span>
                </div>
            </div>

            {/* 2. LIVE MARQUEE TICKER BANNER */}
            <div className="w-full bg-zinc-900/40 border border-zinc-900 rounded-xl p-4 overflow-hidden shadow-inner backdrop-blur-sm">
                <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
                    {commodities.map((item) => (
                        <div key={`ticker-${item._id}`} className="inline-flex items-center gap-2 text-sm border-r border-zinc-800 pr-8 shrink-0">
                            <span className="font-medium text-zinc-400">{item.name}</span>
                            <span className="font-mono font-semibold">${item.currentPrice.toLocaleString()}</span>
                            <span className={`inline-flex items-center gap-0.5 font-mono text-xs ${
                                (item.change24h || 0) >= 0 ? "text-emerald-500" : "text-rose-500"
                            }`}>
                                {(item.change24h || 0) >= 0 ? <ArrowUpRight className="h-3 w-3 shrink-0" /> : <ArrowDownRight className="h-3 w-3 shrink-0" />}
                                {Math.abs(item.change24h || 0)}%
                            </span>
                        </div>
                    ))}
                    {commodities.length === 0 && <span className="text-sm text-zinc-500">Loading live global indices...</span>}
                </div>
            </div>

            {/* 3. MACRO PERFORMANCE SUMMARY CARDS */}
            {/* 🌟 AUTO GRID ADJUSTMENT: Cards gracefully slide from 1 column to 3 columns depending on device layouts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-zinc-900/20 border border-zinc-900 p-4 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Tracked Assets</p>
                        <h3 className="text-2xl font-bold font-mono mt-1">{loading ? "..." : commodities.length}</h3>
                    </div>
                    <Activity className="h-8 w-8 text-violet-500/40 shrink-0" />
                </div>
                <div className="bg-zinc-900/20 border border-zinc-900 p-4 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Top Gainer</p>
                        <h3 className="text-2xl font-bold font-mono text-emerald-400 mt-1">Crude Oil</h3>
                    </div>
                    <TrendingUp className="h-8 w-8 text-emerald-500/40 shrink-0" />
                </div>
                <div className="bg-zinc-900/20 border border-zinc-900 p-4 rounded-xl flex items-center justify-between sm:col-span-2 md:col-span-1">
                    <div>
                        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Watchlist Size</p>
                        <h3 className="text-2xl font-bold font-mono text-violet-400 mt-1">4 Pins</h3>
                    </div>
                    <Star className="h-8 w-8 text-violet-500/40 shrink-0" />
                </div>
            </div>

            {/* 4. MAIN LAYOUT: LIVE INDEX GRID TERMINAL */}
            <div className="space-y-4 w-full">
                {/* INTERACTIVE CONTROLS */}
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-zinc-900/30 p-3 rounded-2xl border border-zinc-900 w-full">
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 shrink-0" />
                        <input
                            type="text"
                            placeholder="Filter live indexing data..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-zinc-950 text-sm pl-10 pr-4 py-2.5 sm:py-2 rounded-xl border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                        />
                    </div>

                    {/* 🌟 SWIPEABLE TRACKING TABS: Prevents layout stretching or text clipping on mobile displays */}
                    <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-none flex-nowrap shrink-0">
                        <SlidersHorizontal className="h-4 w-4 text-zinc-500 hidden lg:block shrink-0" />
                        {["All", "Metals", "Energy", "Agriculture"].map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`text-xs font-medium px-4 py-2 rounded-xl border transition whitespace-nowrap ${
                                    selectedCategory === category
                                        ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/10"
                                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* HIGH DENSITY DATA GRID TABLE */}
                {/* 🌟 CONTAINER GATE SYSTEM: Keeps table elements aligned, viewable, and self-contained internally */}
                <div className="bg-zinc-900/10 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md w-full">
                    <div className="overflow-x-auto w-full scrollbar-thin">
                        <table className="w-full text-left border-collapse min-w-[650px] sm:min-w-0">
                            <thead>
                            <tr className="border-b border-zinc-900 bg-zinc-900/40 text-zinc-500 text-xs font-semibold tracking-wider uppercase">
                                <th className="py-4 px-4 sm:px-6">Asset Name</th>
                                <th className="py-4 px-4 sm:px-6">Classification</th>
                                <th className="py-4 px-4 sm:px-6">Region Origin</th>
                                <th className="py-4 px-4 sm:px-6 text-right">Live Index Value</th>
                                <th className="py-4 px-4 sm:px-6 text-right">24h Variance</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900/50 text-sm">
                            {loading ? (
                                [...Array(4)].map((_, i) => (
                                    <tr key={`skeleton-${i}`} className="animate-pulse">
                                        <td colSpan={5} className="py-6 px-4 sm:px-6 h-12 bg-zinc-900/5" />
                                    </tr>
                                ))
                            ) : commodities.length > 0 ? (
                                commodities.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-zinc-900/30 transition-colors group cursor-pointer"
                                    >
                                        <td className="py-4 px-4 sm:px-6 font-semibold text-zinc-200 group-hover:text-violet-400 transition-colors">
                                            {item.name}
                                        </td>
                                        <td className="py-4 px-4 sm:px-6">
                                            <span className="inline-flex items-center gap-1 text-xs bg-zinc-900/80 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-md whitespace-nowrap">
                                                <Layers className="h-3 w-3 text-violet-500 shrink-0" />
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 sm:px-6 text-zinc-400 font-medium">
                                            {item.region}
                                        </td>
                                        <td className="py-4 px-4 sm:px-6 text-right font-mono font-bold text-zinc-100">
                                            ${item.currentPrice.toLocaleString()}
                                            <span className="text-[11px] text-zinc-500 font-normal block mt-0.5">per {item.unit || "Unit"}</span>
                                        </td>
                                        <td className="py-4 px-4 sm:px-6 text-right font-mono">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                                                (item.change24h || 0) >= 0
                                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                            }`}>
                                                {(item.change24h || 0) >= 0 ? "+" : ""}
                                                {item.change24h}%
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-zinc-500 font-medium">
                                        No active database entries matched your filtering targets.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}