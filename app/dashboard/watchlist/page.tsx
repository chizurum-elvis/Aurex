"use client";

import React, { useState, useEffect } from "react";
import {
    Flame,
    Globe,
    Layers,
    ArrowUpRight,
    ArrowDownRight,
    EyeOff,
    Sparkles,
    RefreshCw
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { toggleWatchlistItem } from "@/lib/utils/watchlistService"; // Import the helper
import { WatchlistItem } from "@/types";


export default function WatchlistBentoGrid() {
    const [items, setItems] = useState<WatchlistItem[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>("ALL");
    const [loading, setLoading] = useState(true);

    async function fetchWatchlist() {
        try {
            setLoading(true);
            const res = await fetch("/api/watchlist");
            const result = await res.json();
            if (result.success && result.data) {
                setItems(result.data);
            }
        } catch (err) {
            console.error("Failed to fetch client database watchlist matrix:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const filteredItems = filterCategory === "ALL"
        ? items
        : items.filter(i => i.category.toUpperCase() === filterCategory);

    // ⚡ UPDATED: Makes the UI change state immediately, then updates MongoDB in the background
    const removeAsset = async (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));

        const result = await toggleWatchlistItem(id);
        if (!result.success) {
            // Re-fetch to pull back the correct state if the API request fails
            fetchWatchlist();
        }
    };

    const topGainer = [...items].sort((a, b) => b.change24h - a.change24h)[0];
    const highVolAsset = items.find(i => i.volatility === "High") || items[0];

    const goldAsset = items.find(i => i.ticker?.toUpperCase() === "GOLD" || i.name?.toLowerCase().includes("gold"));
    const energyAsset = items.find(i => i.category?.toUpperCase() === "ENERGY" || i.ticker?.toUpperCase() === "BRENT" || i.ticker?.toUpperCase() === "WTIOIL");

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center font-mono text-xs text-zinc-500 animate-pulse">
                Assembling database cluster view metrics...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 space-y-6 antialiased selection:bg-violet-500/30">

            {/* HEADER CONTROLS CONTAINER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-900 pb-5 gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-violet-400 uppercase tracking-wider mb-1">
                        <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                        Live Database Watchlist
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
                        Asset Watchlist
                    </h1>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1 bg-zinc-900/60 border border-zinc-900 p-1 rounded-xl">
                        {["ALL", "METALS", "ENERGY", "AGRICULTURE"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`text-xs font-medium px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                                    filterCategory === cat
                                        ? "bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm"
                                        : "text-zinc-500 hover:text-zinc-300"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={fetchWatchlist}
                        className="p-2.5 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-200 transition"
                        title="Refresh Ingestion Data Frame"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* ASYMMETRICAL BENTO BOX STRUCTURE ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">

                {/* COMPONENT A: GOLD MACRO BOX */}
                {goldAsset && (
                    <div className="md:col-span-2 md:row-span-2 bg-gradient-to-b from-zinc-900/40 to-zinc-900/10 border border-zinc-900 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-zinc-800/80 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-violet-600/10 transition-all duration-300" />

                        <div className="flex items-start justify-between z-10">
                            <div className="space-y-1">
                <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                  Macro Anchor
                </span>
                                <h3 className="text-xl font-bold tracking-tight text-zinc-100 mt-2">{goldAsset.name}</h3>
                                <p className="text-xs text-zinc-500">{goldAsset.region || "Global"} Clearing Index</p>
                            </div>
                            <button onClick={() => removeAsset(goldAsset.id)} className="text-zinc-600 hover:text-rose-400 transition p-1.5 hover:bg-zinc-900 rounded-lg">
                                <EyeOff className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-end z-10">
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-zinc-500 block">Database Spot Price</span>
                                <span className="text-3xl font-bold font-mono tracking-tight text-zinc-50">${goldAsset.currentPrice.toLocaleString()}</span>
                                <span className={`text-xs font-mono flex items-center font-semibold mt-1 ${goldAsset.change24h >= 0 ? "text-emerald-400" : "text-rose-500"}`}>
                  {goldAsset.change24h >= 0 ? <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> : <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />}
                                    {goldAsset.change24h}% <span className="text-zinc-600 ml-1.5">(Session)</span>
                </span>
                            </div>

                            <div className="h-20 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={goldAsset.sparkline}>
                                        <defs>
                                            <linearGradient id="goldSpark" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="val" stroke="#f59e0b" strokeWidth={2} fill="url(#goldSpark)" dot={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {/* COMPONENT B: PRIMARY ENERGY ASSET */}
                {energyAsset && (
                    <div className="md:col-span-1 md:row-span-2 bg-zinc-900/20 border border-zinc-900 rounded-3xl p-5 flex flex-col justify-between hover:border-zinc-800 transition-all duration-200 shadow-md group">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-xl w-fit text-red-400">
                                    <Flame className="h-4 w-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-zinc-200">{energyAsset.name}</h4>
                                    <p className="text-[11px] text-zinc-500 font-mono">{energyAsset.ticker} Spot Feed</p>
                                </div>
                            </div>
                            <button onClick={() => removeAsset(energyAsset.id)} className="text-zinc-600 hover:text-rose-400 p-1 transition">
                                <EyeOff className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="h-12 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={energyAsset.sparkline}>
                                        <Area type="monotone" dataKey="val" stroke="#ef4444" strokeWidth={1.5} fill="none" dot={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div>
                                <div className="text-2xl font-bold font-mono text-zinc-100">${energyAsset.currentPrice.toLocaleString()}</div>
                                <div className={`text-xs font-mono flex items-center font-medium mt-0.5 ${energyAsset.change24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                                    {energyAsset.change24h >= 0 ? <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" /> : <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />}
                                    {energyAsset.change24h}%
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* COMPONENT C: SIDEBAR ANALYTICS SYNC METRIC */}
                <div className="md:col-span-1 md:row-span-2 bg-zinc-900/40 border border-zinc-900 border-dashed rounded-3xl p-5 flex flex-col justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-2.5">
                            <Layers className="h-3.5 w-3.5 text-violet-500" />
                            Database Analytics
                        </div>

                        <div className="space-y-1.5">
                            <span className="text-[11px] text-zinc-500 block font-medium">Top Velocity Momentum</span>
                            <div className="flex items-center justify-between bg-zinc-950/60 border border-zinc-900/60 p-2.5 rounded-xl">
                                <span className="text-xs font-bold text-zinc-300 font-mono">{topGainer?.ticker || "None"}</span>
                                <span className="text-xs font-mono text-emerald-400 font-semibold">+{topGainer?.change24h || 0}%</span>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <span className="text-[11px] text-zinc-500 block font-medium">High Volatility Risk node</span>
                            <div className="flex items-center justify-between bg-zinc-950/60 border border-zinc-900/60 p-2.5 rounded-xl">
                                <span className="text-xs font-bold text-zinc-300 font-mono">{highVolAsset?.ticker || "None"}</span>
                                <span className="text-[10px] bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-md font-mono font-medium border border-rose-500/10">
                  {highVolAsset?.volatility || "Medium"} Risk
                </span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-900 text-[11px] text-zinc-500 flex items-center gap-2 font-mono">
                        <Globe className="h-3.5 w-3.5 text-zinc-600" />
                        Tracking {filteredItems.length} active global assets
                    </div>
                </div>

                {/* COMPONENT D: DYNAMIC DATA LOOP FOR ALL OTHER TRACKED COMMODITIES */}
                {filteredItems.map((asset) => {
                    if (asset.id === goldAsset?.id || asset.id === energyAsset?.id) return null;
                    const isPositive = asset.change24h >= 0;

                    return (
                        <div key={asset.id} className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-4 flex flex-col justify-between hover:border-zinc-800/80 transition shadow-sm relative group">
                            <div className="flex items-center justify-between">
                                <div>
                  <span className="text-xs font-bold font-mono tracking-tight text-zinc-200 group-hover:text-violet-400 transition">
                    {asset.ticker}
                  </span>
                                    <span className="text-[10px] text-zinc-500 ml-2 font-medium hidden lg:inline-block">
                    {asset.category}
                  </span>
                                </div>
                                <button onClick={() => removeAsset(asset.id)} className="text-zinc-700 hover:text-rose-400 transition p-0.5 opacity-0 group-hover:opacity-100 duration-150">
                                    <EyeOff className="h-3 w-3" />
                                </button>
                            </div>

                            <div className="flex items-end justify-between mt-2">
                                <div>
                                    <div className="text-lg font-bold font-mono tracking-tight text-zinc-100">${asset.currentPrice.toLocaleString()}</div>
                                    <div className={`text-[11px] font-mono font-semibold flex items-center ${isPositive ? "text-emerald-400" : "text-rose-500"}`}>
                                        {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                        {isPositive ? "+" : ""}{asset.change24h}%
                                    </div>
                                </div>

                                <div className="h-8 w-16 opacity-70 group-hover:opacity-100 transition duration-200">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={asset.sparkline}>
                                            <Area type="monotone" dataKey="val" stroke={isPositive ? "#34d399" : "#f43f5e"} fill="none" strokeWidth={1.5} dot={false} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}