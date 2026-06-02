'use client';

import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import { AuthControlsProps} from "@/types";


export default function AuthControls({
                                         signInLabel = "Sign In",
                                         signUpLabel = "Get Started"
                                     }: AuthControlsProps) {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return <div className="h-8 w-20 animate-pulse rounded-lg bg-zinc-900" />;
    }

    if (isSignedIn) {
        return (
            <div className="flex items-center gap-4">
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "w-8 h-8 border border-zinc-800"
                        }
                    }}
                />
            </div>
        );
    }

    // Check if this is our custom homepage terminal call-to-action
    const isTerminalCTA = signUpLabel === "Open Terminal View";

    return (
        <div className="flex items-center gap-3">
            {/* Only render sign in if using the default layout */}
            {signInLabel === "Sign In" && (
                <SignInButton mode="modal">
                    <button className="text-[11px] font-semibold text-zinc-400 hover:text-zinc-100 transition duration-150 px-2 py-1">
                        {signInLabel}
                    </button>
                </SignInButton>
            )}

            <SignUpButton mode="modal">
                <button
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-lg transition-all duration-150 select-none ${
                        isTerminalCTA
                            ? "bg-zinc-100 hover:bg-white text-zinc-950 border-0 outline-none shadow-[0_4px_25px_rgba(255,255,255,0.08)]" // 🌟 Completely borderless clean solid white canvas
                            : "bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400"
                    }`}
                >
                    {signUpLabel}
                    <ArrowRight className={`h-3.5 w-3.5 ${isTerminalCTA ? "text-zinc-900" : "text-emerald-400"}`} />
                </button>
            </SignUpButton>
        </div>
    );
}