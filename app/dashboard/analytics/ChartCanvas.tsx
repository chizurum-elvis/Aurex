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
                    <p className="text-xs font-medium text-zinc-500 mb-1">{payload[0].payload.date}, 2026</p>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-violet-500" />
                        <span className="text-sm font-semibold text-zinc-100 font-mono">
              {activeMetric === "Price" ? `$${payload[0].value.toLocaleString()}` : `${payload[0].value}k units`}
            </span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-90 font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="aurexChartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6c47ff" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#6c47ff" stopOpacity={0.0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid vertical={false} stroke="#18181b" strokeDasharray="4 4" />

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        stroke="#52525b"
                        dy={12}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        stroke="#52525b"
                        dx={-8}
                        domain={[
                            (dataMin) => Math.floor(dataMin - 50),
                            (dataMax) => Math.ceil(dataMax + 50)
                        ]}
                        tickFormatter={(value) => Math.round(value).toLocaleString()}
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#27272a", strokeWidth: 1 }} />

                    <Area
                        type="monotone"
                        dataKey={activeMetric}
                        stroke="#6c47ff"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#aurexChartGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}