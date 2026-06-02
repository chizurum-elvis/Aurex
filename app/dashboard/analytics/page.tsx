"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Calendar, Info, DollarSign, Percent } from "lucide-react";
import { ChartCanvasProps} from "@/types";


const DynamicChartCanvas = dynamic<ChartCanvasProps>(
    () => import("./ChartCanvas").then((mod) => mod.default),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-[360px] bg-zinc-900/10 animate-pulse rounded-2xl border border-zinc-900 flex items-center justify-center p-6">
                <span className="text-xs text-zinc-600 font-mono">Stream-syncing historical vector nodes...</span>
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

    // Async data-fetching connection pipeline targeting your Next.js route
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
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 space-y-6 antialiased">

            {/* 1. HEADER CONTAINER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-900 pb-5 gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-violet-500 uppercase tracking-wider mb-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Live Pattern-B Data Engine
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
                        Market Analytics
                    </h1>
                </div>

                {/* TIMEFRAME CONTROLLER */}
                <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-900 p-1 rounded-xl w-fit">
                    {["24H", "7D", "1M", "1Y"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setTimeframe(item)}
                            className={`text-xs font-medium px-3.5 py-1.5 rounded-lg transition ${
                                timeframe === item
                                    ? "bg-zinc-800 border border-zinc-700 text-zinc-100 shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-300"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* ASSET SELECTOR BAR */}
            <div className="flex items-center gap-2 bg-zinc-900/20 border border-zinc-900 p-3 rounded-xl w-fit">
                <span className="text-xs text-zinc-400 font-medium px-2">Active Tracker:</span>
                {["Gold", "Silver", "Crude Oil"].map((asset) => (
                    <button
                        key={asset}
                        onClick={() => setSelectedAsset(asset)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition ${
                            selectedAsset === asset
                                ? "bg-violet-600/20 border-violet-500 text-violet-400 font-semibold"
                                : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                        }`}
                    >
                        {asset}
                    </button>
                ))}
            </div>

            {/* 2. CORE KPIS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-zinc-500 text-xs font-medium uppercase tracking-wider">
                        <span>{selectedAsset} Price</span>
                        <DollarSign className="h-3.5 w-3.5 text-violet-500" />
                    </div>
                    <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono">
              ${chartData[chartData.length - 1]?.Price.toLocaleString() || "..."}
            </span>
                        <span className="text-xs font-mono text-emerald-400 flex items-center font-semibold">
              <ArrowUpRight className="h-3 w-3" /> +4.2%
            </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">Live weighting value index</p>
                </div>

                <div className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-zinc-500 text-xs font-medium uppercase tracking-wider">
                        <span>24h Moving Average</span>
                        <TrendingUp className="h-3.5 w-3.5 text-zinc-600" />
                    </div>
                    <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono">
              ${chartData[0]?.Price ? Math.round(chartData[0].Price * 0.98).toLocaleString() : "..."}
            </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">Smoothed support barrier threshold</p>
                </div>

                <div className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-zinc-500 text-xs font-medium uppercase tracking-wider">
                        <span>Trading Aggregation</span>
                        <Calendar className="h-3.5 w-3.5 text-zinc-600" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-mono">1,420M</span>
                        <span className="text-xs font-mono text-rose-500 flex items-center font-semibold">
              <ArrowDownRight className="h-3 w-3" /> -1.8%
            </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">Global matching transactional depth</p>
                </div>

                <div className="bg-zinc-900/20 border border-zinc-900 p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-zinc-500 text-xs font-medium uppercase tracking-wider">
                        <span>Volatility Index</span>
                        <Percent className="h-3.5 w-3.5 text-zinc-600" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-mono">12.4%</span>
                    </div>
                    <p className="text-[11px] text-zinc-500">Standard market deviation deviation factor</p>
                </div>
            </div>

            {/* 3. MAIN ANALYTICS VISUALIZATION PANEL */}
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setActiveMetric("Price")}
                            className={`text-sm font-semibold pb-4 -mb-4 transition relative ${
                                activeMetric === "Price" ? "text-violet-400 border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
                            }`}
                        >
                            Price Index Evolution
                        </button>
                        <button
                            onClick={() => setActiveMetric("volume")}
                            className={`text-sm font-semibold pb-4 -mb-4 transition relative ${
                                activeMetric === "volume" ? "text-violet-400 border-b-2 border-violet-500" : "text-zinc-500 hover:text-zinc-300"
                            }`}
                        >
                            Liquidity Velocity Flow
                        </button>
                    </div>
                    <span className="text-xs text-zinc-500 flex items-center gap-1.5 hidden sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Connected to proxy data pipe
          </span>
                </div>

                {/* Dynamic canvas loader fed directly from state */}
                {loading ? (
                    <div className="w-full h-[360px] bg-zinc-900/5 border border-zinc-900/40 rounded-xl flex items-center justify-center font-mono text-xs text-zinc-600 animate-pulse">
                        Fetching tracking matrices...
                    </div>
                ) : (
                    <DynamicChartCanvas activeMetric={activeMetric} data={chartData} />
                )}
            </div>
        </div>
    );
}