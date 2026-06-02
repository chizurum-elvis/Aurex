"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { toggleWatchlistItem } from "@/lib/utils/watchlistService";
import { MarketTableProps, CommodityRow } from "@/types";

export default function MarketExploreTable({ initialCommodities, userPinnedIds }: MarketTableProps) {
    const [pinnedIds, setPinnedIds] = useState<string[]>(userPinnedIds);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handlePinClick = async (commodityId: string) => {
        setLoadingId(commodityId);
        const result = await toggleWatchlistItem(commodityId);

        if (result.success) {
            if (result.action === "added") {
                setPinnedIds((prev) => [...prev, commodityId]);
            } else if (result.action === "removed") {
                setPinnedIds((prev) => prev.filter((id) => id !== commodityId));
            }
        }
        setLoadingId(null);
    };

    return (
        <div className="w-full text-zinc-100">

            {/* ========================================================================= */}
            {/* 1. MOBILE-ONLY VIEW: Restructures data into clean, stackable macro cards    */}
            {/* ========================================================================= */}
            <div className="block sm:hidden space-y-2.5 p-1">
                {initialCommodities.map((asset) => {
                    const isPinned = pinnedIds.includes(asset._id);
                    const isMutating = loadingId === asset._id;

                    return (
                        <div
                            key={asset._id}
                            className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-4 flex items-center justify-between gap-4 transition active:bg-zinc-900/40"
                        >
                            <div className="flex flex-col gap-1 truncate">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-zinc-200 font-bold tracking-tight text-sm">
                                        {asset.ticker}
                                    </span>
                                    <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md uppercase font-mono font-medium">
                                        {asset.category}
                                    </span>
                                </div>
                                <span className="text-zinc-500 text-xs truncate max-w-[180px]">
                                    {asset.name}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 shrink-0">
                                <span className="font-mono font-bold text-sm text-zinc-100">
                                    ${asset.currentPrice.toLocaleString()}
                                </span>

                                <button
                                    onClick={() => handlePinClick(asset._id)}
                                    disabled={isMutating}
                                    className={`transition-all transform p-2 rounded-lg bg-zinc-900/60 border border-zinc-900 active:scale-95 ${
                                        isPinned
                                            ? "text-amber-400 opacity-100 border-amber-500/20 bg-amber-500/[0.02]"
                                            : "text-zinc-500 opacity-80"
                                    } ${isMutating ? "animate-pulse" : ""}`}
                                >
                                    <Star className="h-4 w-4" fill={isPinned ? "currentColor" : "none"} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ========================================================================= */}
            {/* 2. TABLET & DESKTOP VIEW: Traditional enterprise tabular market terminal    */}
            {/* ========================================================================= */}
            <div className="hidden sm:block bg-zinc-900/20 border border-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="border-b border-zinc-900 text-xs text-zinc-500 uppercase tracking-wider font-mono font-semibold bg-zinc-950/40">
                        <th className="p-4 w-14 text-center">Pin</th>
                        <th className="p-4">Asset</th>
                        <th className="p-4">Category</th>
                        <th className="p-4 text-right">Live Price</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/60 text-sm">
                    {initialCommodities.map((asset) => {
                        const isPinned = pinnedIds.includes(asset._id);
                        const isMutating = loadingId === asset._id;

                        return (
                            <tr key={asset._id} className="hover:bg-zinc-900/10 transition group">
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => handlePinClick(asset._id)}
                                        disabled={isMutating}
                                        className={`transition-all transform active:scale-95 ${
                                            isPinned
                                                ? "text-amber-400 opacity-100"
                                                : "text-zinc-600 hover:text-zinc-400 opacity-40 group-hover:opacity-100"
                                        } ${isMutating ? "animate-pulse" : ""}`}
                                    >
                                        <Star className="h-4 w-4" fill={isPinned ? "currentColor" : "none"} />
                                    </button>
                                </td>
                                <td className="p-4 font-medium">
                                    <span className="font-mono text-zinc-200 font-bold mr-2">{asset.ticker}</span>
                                    <span className="text-zinc-400 text-xs hidden md:inline-block">{asset.name}</span>
                                    <span className="text-zinc-400 text-xs inline-block md:hidden max-w-[120px] truncate vertical-middle">{asset.name}</span>
                                </td>
                                <td className="p-4 text-zinc-500 text-xs font-medium">{asset.category}</td>
                                <td className="p-4 text-right font-mono font-semibold text-zinc-200">
                                    ${asset.currentPrice.toLocaleString()}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

        </div>
    );
}