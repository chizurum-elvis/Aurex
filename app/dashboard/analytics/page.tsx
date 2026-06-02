"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Calendar, DollarSign, Percent } from "lucide-react";
import { ChartCanvasProps } from "@/types";

const DynamicChartCanvas = dynamic<ChartCanvasProps>(
    () => import("./ChartCanvas").then((mod) => mod.default),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-[300px] sm:h-[360px] bg-zinc-900/10 animate-pulse rounded-2xl border border-zinc-900 flex items-center justify-center p-4">
                <span className="text-xs text-zinc-600 font-mono text-center">Stream-syncing historical vector nodes...</span>
            </div>
        )
    }
);

export default function AnalyticsPage() {
    const [timeframe, setTimeframe] = useState("7D");
    const [activeMetric, setActiveMetric] = useState("Price");
    const [chartData, setChartData] = useState<any[]>([]);
    const [selectedAsset, setSelectedAsset] = useState("Gold");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadChartData() {
            try {
                setLoading(true);
                const response = await fetch(`/api/prices/historical?asset=${selectedAsset}&timeframe=${timeframe}`);
                const result = await response.json();
                if (result.success && result.data) {
                    setChartData(result.data);
                }
            } catch (err) {
                console.error("Failed to query historical aggregation matrix:", err);
            } finally {
                setLoading(false);
            }
        }
        loadChartData();
    }, [timeframe, selectedAsset]);

    return (
        // 🌟 GUTTER NORMALIZATION: Fluid layout padding structure from mobile up to desktop grids
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-4 sm:p-6 space-y-6 antialiased selection:bg-violet-500/30">

            {/* 1. HEADER CONTAINER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-900 pb-5 gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-violet-500 uppercase tracking-wider mb-1">
                        <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                        Live Pattern-B Data Engine
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
                        Market Analytics
                    </h1>
                </div>

                {/* TIMEFRAME CONTROLLER */}
                <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-900 p-1 rounded-xl w-full sm:w-auto justify-between sm:justify-start shrink-0">
                    {["24H", "7D", "1M", "1Y"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setTimeframe(item)}
                            className={`text-xs font-medium px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-lg transition text-center flex-1 sm:flex-initial ${
                                timeframe === item
                                    ? "bg-zinc-800 border border-zinc-700 text-zinc-100 shadow-sm font-semibold"
                                    : "text-zinc-500 hover:text-zinc-300"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* ASSET SELECTOR BAR */}
            {/* 🌟 SCROLLABLE RAIL DESIGN: Keeps active option assets from breaking lines horizontally on narrow phone screens */}
            <div className="flex items-center gap-2 bg-zinc-900/20 border border-zinc-900 p-3 rounded-2xl w-full overflow-x-auto scrollbar-none flex-nowrap shrink-0">
                <span className="text-xs text-zinc-500 font-mono font-semibold uppercase tracking-wider pl-1 pr-2 shrink-0">
                    Tracker:
                </span>
                <div className="flex items-center gap-2 flex-nowrap">
                    {["Gold", "Silver", "Crude Oil"].map((asset) => (
                        <button
                            key={asset}
                            onClick={() => setSelectedAsset(asset)}
                            className={`text-xs font-medium px-4 py-2 sm:py-1.5 rounded-xl border transition whitespace-nowrap ${
                                selectedAsset === asset
                                    ? "bg-violet-600/20 border-violet-500 text-violet-400 font-semibold"
                                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                            }`}
                        >
                            {asset}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. CORE KPIS ROW */}
            {/* 🌟 RESPONSIVE METRIC LAYOUT SHIFTS: Progresses cleanly from a single stacked column up to 4 parallel grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-zinc-900/20 border border-zinc-900 p-4 sm:p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider font-mono">
                        <span className="truncate mr-2">{selectedAsset} Price</span>
                        <DollarSign className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                    </div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-zinc-100">
                            ${chartData[chartData.length - 1]?.Price.toLocaleString() || "..."}
                        </span>
                        <span className="text-xs font-mono text-emerald-400 flex items-center font-semibold shrink-0">
                            <ArrowUpRight className="h-3 w-3 shrink-0" /> +4.2%
                        </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-medium">Live weighting value index</p>
                </div>

                <div className="bg-zinc-900/20 border border-zinc-900 p-4 sm:p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider font-mono">
                        <span>24h Moving Avg</span>
                        <TrendingUp className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-zinc-100">
                            ${chartData[0]?.Price ? Math.round(chartData[0].Price * 0.98).toLocaleString() : "..."}
                        </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-medium">Smoothed support barrier threshold</p>
                </div>

                <div className="bg-zinc-900/20 border border-zinc-900 p-4 sm:p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider font-mono">
                        <span>Trading Aggregation</span>
                        <Calendar className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                    </div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-zinc-100">1,420M</span>
                        <span className="text-xs font-mono text-rose-500 flex items-center font-semibold shrink-0">
                            <ArrowDownRight className="h-3 w-3 shrink-0" /> -1.8%
                        </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-medium">Global transactional depth</p>
                </div>

                <div className="bg-zinc-900/20 border border-zinc-900 p-4 sm:p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider font-mono">
                        <span>Volatility Index</span>
                        <Percent className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-zinc-100">12.4%</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-medium">Standard deviation factor</p>
                </div>
            </div>

            {/* 3. MAIN ANALYTICS VISUALIZATION PANEL */}
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md space-y-6 w-full overflow-hidden">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4 gap-4 w-full">
                    {/* SCROLLABLE INTERACTIVE METRIC TOGGLES */}
                    <div className="flex items-center gap-6 overflow-x-auto scrollbar-none pb-1 -mb-5 flex-nowrap w-full sm:w-auto">
                        <button
                            onClick={() => setActiveMetric("Price")}
                            className={`text-xs sm:text-sm font-semibold pb-4 -mb-4 transition relative whitespace-nowrap tracking-tight ${
                                activeMetric === "Price" ? "text-violet-400 border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
                            }`}
                        >
                            Price Index Evolution
                        </button>
                        <button
                            onClick={() => setActiveMetric("volume")}
                            className={`text-xs sm:text-sm font-semibold pb-4 -mb-4 transition relative whitespace-nowrap tracking-tight ${
                                activeMetric === "volume" ? "text-violet-400 border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
                            }`}
                        >
                            Liquidity Velocity Flow
                        </button>
                    </div>
                    <span className="text-xs text-zinc-500 items-center gap-1.5 hidden md:flex shrink-0 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        Connected to proxy data pipe
                    </span>
                </div>

                {/* GRAPH FRAME ANCHOR BLOCK */}
                <div className="w-full pt-2">
                    {loading ? (
                        <div className="w-full h-[300px] sm:h-[360px] bg-zinc-900/5 border border-zinc-900/40 rounded-xl flex items-center justify-center font-mono text-xs text-zinc-600 animate-pulse p-4 text-center">
                            Fetching tracking matrices...
                        </div>
                    ) : (
                        <div className="w-full h-auto overflow-hidden">
                            <DynamicChartCanvas activeMetric={activeMetric} data={chartData} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}