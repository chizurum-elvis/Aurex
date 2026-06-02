"use client";

import React, { useState, useEffect } from "react";
import {
    User,
    Shield,
    Database,
    RotateCcw,
    KeyRound,
    Bell,
    Save,
    CheckCircle2,
    AlertTriangle
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useIdentity } from "@/context/IdentityContext"; // 🌟 Injected layout identity state layer

export default function SettingsPage() {
    const { user } = useUser();
    const { displayName, setDisplayName } = useIdentity(); // 🌟 Grab layout sync variables

    const [activeTab, setActiveTab] = useState("general");
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Form States
    const [inputName, setInputName] = useState("");
    const [syncInterval, setSyncInterval] = useState("hourly");
    const [customApiKey, setCustomApiKey] = useState("");
    const [emailAlerts, setEmailAlerts] = useState(true);

    useEffect(() => {
        if (displayName) {
            setInputName(displayName);
        }

    }, [displayName, user?.id]);

    const handleSaveChanges = async (e: React.FormEvent) => {
        if (e) e.preventDefault();

        const trimmed = inputName.trim();
        if (!trimmed) {
            alert("Display name cannot be entirely blank spaces.");
            return;
        }

        setIsSaving(true);
        setSaveSuccess(false);

        // 1. Dispatch string mutation parameters down to the Context state machine & LocalStorage
        const result = await setDisplayName(trimmed);

        if (result.success) {
            // 2. ⚡ THE FIX: Clear client stale cache tokens so your sidebar and popover reload names instantly
            if (user) {
                await user.reload();
            }
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } else {
            alert(result.error || "An error occurred while saving your profile parameters.");
        }

        setIsSaving(false);
    };

    const sections = [
        { id: "general", label: "Account Profile", icon: User },
        { id: "pipeline", label: "Data Pipeline", icon: Database },
        { id: "security", label: "Security & API", icon: Shield },
    ];

    return (
        <form onSubmit={handleSaveChanges} className="min-h-screen bg-zinc-950 text-zinc-100 p-6 space-y-6 antialiased selection:bg-violet-500/30">

            {/* HEADER SECTION */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-5">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
                        Workspace Settings
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1 font-medium">
                        Manage your node parameters, core engine sync profiles, and multi-tenant authorization preferences.
                    </p>
                </div>

                {/* Global Save Trigger Button */}
                <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-50 hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 text-xs font-semibold rounded-xl transition duration-150 active:scale-98"
                >
                    {saveSuccess ? (
                        <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            Changes Saved
                        </>
                    ) : (
                        <>
                            <Save className="h-3.5 w-3.5" />
                            {isSaving ? "Saving Config..." : "Save Changes"}
                        </>
                    )}
                </button>
            </div>

            {/* TWO COLUMN MINIMALIST LAYOUT CONTAINER */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">

                {/* LEFT COLUMN: NAVIGATION TABS STICKY SIDEBAR */}
                <div className="md:col-span-1 space-y-1 md:sticky md:top-6">
                    {sections.map((tab) => {
                        const Icon = tab.icon;
                        const isSelected = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all border ${
                                    isSelected
                                        ? "bg-zinc-900/60 border-zinc-800 text-zinc-50 font-semibold shadow-sm"
                                        : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/20"
                                }`}
                            >
                                <Icon className={`h-4 w-4 ${isSelected ? "text-violet-400" : "text-zinc-600"}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* RIGHT COLUMN: INTERACTIVE CONTROLS CONTAINER */}
                <div className="md:col-span-3 space-y-6 max-w-2xl">

                    {/* TAB CONTENT MODULE 1: PROFILE MANAGEMENT */}
                    {activeTab === "general" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-4">
                                <h3 className="text-sm font-semibold text-zinc-200 border-b border-zinc-900 pb-2">
                                    Identity Details
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                                            Display Name
                                        </label>
                                        {/* 🌟 Dynamic Controlled Input Element */}
                                        <input
                                            type="text"
                                            value={inputName}
                                            onChange={(e) => setInputName(e.target.value)}
                                            placeholder="Enter display nickname..."
                                            className="w-full bg-zinc-950 border border-zinc-900 focus:border-zinc-800 focus:outline-none rounded-xl p-3 text-xs font-medium font-mono tracking-tight text-zinc-300"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                                            Routing Email Link
                                        </label>
                                        {/* 🌟 Dynamically fetch direct verified Gmail string from live authenticated session */}
                                        <input
                                            type="email"
                                            value={user?.primaryEmailAddress?.emailAddress || "Loading authentication node..."}
                                            className="w-full bg-zinc-950 border border-zinc-900 focus:border-zinc-800 focus:outline-none rounded-xl p-3 text-xs font-medium font-mono tracking-tight text-zinc-500 opacity-60 cursor-not-allowed"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Preferences Configuration Subpanel */}
                            <div className="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-4">
                                <h3 className="text-sm font-semibold text-zinc-200 border-b border-zinc-900 pb-2">
                                    Notification Hub Settings
                                </h3>

                                <div className="flex items-center justify-between p-1">
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-medium text-zinc-200 flex items-center gap-2">
                                            <Bell className="h-3.5 w-3.5 text-zinc-500" />
                                            Dynamic Market Threshold Alerts
                                        </div>
                                        <p className="text-[11px] text-zinc-500">
                                            Receive email dispatch packets immediately if assets cross major custom resistance indices.
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={emailAlerts}
                                        onChange={(e) => setEmailAlerts(e.target.checked)}
                                        className="h-4 w-4 rounded border-zinc-900 bg-zinc-950 text-violet-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-violet-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB CONTENT MODULE 2: DATA PIPELINE CONTROLS */}
                    {activeTab === "pipeline" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-4">
                                <h3 className="text-sm font-semibold text-zinc-200 border-b border-zinc-900 pb-2">
                                    Ingestion Frequency Controller
                                </h3>
                                <p className="text-[11px] text-zinc-400">
                                    Select your background cron-scheduler refresh rate window. Shorter periods consume higher API token quotas.
                                </p>

                                <div className="grid grid-cols-3 gap-2 pt-2">
                                    {[
                                        { value: "realtime", label: "5 Minutes" },
                                        { value: "hourly", label: "Hourly Refresh" },
                                        { value: "daily", label: "Daily Frame" },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setSyncInterval(option.value)}
                                            className={`p-3 border rounded-xl text-xs font-medium transition text-center ${
                                                syncInterval === option.value
                                                    ? "bg-zinc-900 border-zinc-700 text-zinc-100 font-semibold"
                                                    : "bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800"
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Destructive Action Panel */}
                            <div className="border border-red-950 bg-red-500/[0.02] rounded-2xl p-6 space-y-4">
                                <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wider font-mono">
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                    Danger Management Node
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-medium text-zinc-200">Reset Watchlist Blueprint Array</div>
                                        <p className="text-[11px] text-zinc-500">
                                            Permanently wipe all pinned reference identifiers out of your database session structure.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (confirm("Are you certain you wish to wipe your personal watchlist matrix?")) {
                                                // Hook up your clear API implementation statement cleanly here
                                            }
                                        }}
                                        className="flex items-center justify-center gap-2 px-3 py-2 bg-red-950/40 hover:bg-red-900/20 border border-red-900/60 hover:border-red-500 text-red-400 text-xs font-medium rounded-xl transition"
                                    >
                                        <RotateCcw className="h-3.5 w-3.5" />
                                        Reset Data Blueprint
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB CONTENT MODULE 3: SECURITY & API ENDPOINTS */}
                    {activeTab === "security" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-4">
                                <h3 className="text-sm font-semibold text-zinc-200 border-b border-zinc-900 pb-2">
                                    Alpha Vantage API Provisioning
                                </h3>
                                <p className="text-[11px] text-zinc-500">
                                    Override the system-wide core key config by providing a user-scoped endpoint credential vector token below.
                                </p>

                                <div className="space-y-1.5 pt-2 relative">
                                    <label className="text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider block">
                                        Personal Authorization Key
                                    </label>
                                    <div className="relative flex items-center">
                                        <KeyRound className="absolute left-3.5 h-3.5 w-3.5 text-zinc-600" />
                                        <input
                                            type="password"
                                            placeholder="••••••••••••••••••••••••"
                                            value={customApiKey}
                                            onChange={(e) => setCustomApiKey(e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-900 focus:border-zinc-800 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-xs font-mono tracking-widest text-zinc-300 placeholder:text-zinc-800"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </form>
    );
}