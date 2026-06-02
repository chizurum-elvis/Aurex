"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { toggleWatchlistItem } from "@/lib/utils/watchlistService";
import { MarketTableProps, CommodityRow} from "@/types";

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
        <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl overflow-hidden text-zinc-100">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="border-b border-zinc-900 text-xs text-zinc-500 uppercase tracking-wider font-mono font-semibold bg-zinc-950/40">
                    <th className="p-4 w-12 text-center">Pin</th>
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
                                        isPinned ? "text-amber-400 opacity-100" : "text-zinc-600 hover:text-zinc-400 opacity-40 group-hover:opacity-100"
                                    } ${isMutating ? "animate-pulse" : ""}`}
                                >
                                    <Star className="h-4 w-4" fill={isPinned ? "currentColor" : "none"} />
                                </button>
                            </td>
                            <td className="p-4 font-medium">
                                <span className="font-mono text-zinc-200 font-bold mr-2">{asset.ticker}</span>
                                <span className="text-zinc-400 text-xs">{asset.name}</span>
                            </td>
                            <td className="p-4 text-zinc-500 text-xs">{asset.category}</td>
                            <td className="p-4 text-right font-mono font-semibold">
                                ${asset.currentPrice.toLocaleString()}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}