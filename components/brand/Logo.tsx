"use client";

import React from "react";
import Image from "next/image";
import { LogoProps } from "@/types";

export default function Logo({ height = 14, className = "" }: LogoProps) {
    // Elegant optical scaling ratio for the brand image icon
    const imageSize = height * 1;

    return (
        <div className={`inline-flex items-center gap-1.5 select-none ${className}`} style={{ height }}>

            {/* ========================================================================= */}
            {/* 1. BRAND IMAGE ICON                                                      */}
            {/* ========================================================================= */}
            <div style={{ height: imageSize, width: imageSize }} className="relative shrink-0 flex items-center justify-center">
                <Image
                    src="/logo.jpeg"
                    alt="Aurex Symbol"
                    fill
                    sizes={`${imageSize}px`}
                    className="object-contain"
                    priority
                />
            </div>

            {/* ========================================================================= */}
            {/* 2. THE TYPOGRAPHY (Tightly packed horizontal bounds)                      */}
            {/* ========================================================================= */}
            <svg
                // 🌟 THE GAP FIX: Shifted X-start from 128 to 135 to slice away the dead space before the letter 'A'
                // This forces the text block to pull inward and align perfectly next to your image mark
                viewBox="135 38 208 42"
                className="w-auto overflow-visible"
                style={{ height: height * 0.48 }}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="saasXGradient" x1="320" y1="40" x2="355" y2="75" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#16a34a" />
                    </linearGradient>
                </defs>

                <g id="typography-nodes" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* 'A' - Crisp geometric open layout */}
                    <path d="M136 74 L148.5 44 L161 74" stroke="#e4e4e7" />

                    {/* 'U' - Minimalist clean curve */}
                    <path d="M184 44 L184 68 C184 72 187 74 191 74 L203 74 C207 74 210 72 210 68 L210 44" stroke="#e4e4e7" />

                    {/* 'R' - Clean technical curve and angled leg */}
                    <path d="M233 74 L233 44 L251 44 C257 44 261 48 261 54 C261 60 257 63 251 63 L233 63 M249 63 L262 74" stroke="#e4e4e7" />

                    {/* 'E' - Exactly three parallel horizontal tracks with NO vertical spine */}
                    <path d="M284 44 L304 44 M284 59 L302 59 M284 74 L304 74" stroke="#e4e4e7" />

                    {/* 'X' - Handcrafted premium emerald brand accent */}
                    <path d="M326 44 L348 74 M348 44 L326 74" stroke="url(#saasXGradient)" strokeWidth="6.5" />
                </g>
            </svg>
        </div>
    );
}