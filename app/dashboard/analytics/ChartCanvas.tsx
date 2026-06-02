"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartCanvasProps {
    activeMetric: string;
    data: any[];
}

export default function ChartCanvas({ activeMetric, data }: ChartCanvasProps) {
    // Custom premium layout tooltip component for Recharts hover actions
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
                    <p className="text-[10px] font-medium text-zinc-500 mb-1">{payload[0].payload.date}, 2026</p>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-violet-500" />
                        <span className="text-xs sm:text-sm font-semibold text-zinc-100 font-mono">
                            {activeMetric === "Price" ? `$${payload[0].value.toLocaleString()}` : `${payload[0].value}k units`}
                        </span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[280px] sm:h-[360px] font-mono text-[10px] sm:text-xs">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="aurexChartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6c47ff" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#6c47ff" stopOpacity={0.0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid vertical={false} stroke="#141417" strokeDasharray="4 4" />

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        stroke="#52525b"
                        dy={12}
                        padding={{ left: 10, right: 10 }}
                        // 🌟 THE FIX: Changed from "auto" to "preserveStartEnd" to fit the type definitions
                        interval="preserveStartEnd"
                        minTickGap={30}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        stroke="#52525b"
                        dx={-4}
                        domain={[
                            (dataMin) => Math.floor(dataMin * 0.99),
                            (dataMax) => Math.ceil(dataMax * 1.01)
                        ]}
                        tickFormatter={(value) => Math.round(value).toLocaleString()}
                        hide={data.length === 0}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: "#27272a", strokeWidth: 1 }}
                    />

                    <Area
                        type="monotone"
                        dataKey={activeMetric}
                        stroke="#6c47ff"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#aurexChartGradient)"
                        activeDot={{ r: 4, stroke: "#9d85ff", strokeWidth: 1 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}