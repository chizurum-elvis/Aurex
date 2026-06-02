'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { IdentityContextType} from "@/types";

const IdentityContext = createContext<IdentityContextType | undefined>(undefined);

export function IdentityProvider({
                                     children,
                                     authDefaultName
                                 }: {
    children: React.ReactNode;
    authDefaultName: string;
}) {
    const { user, isLoaded } = useUser();
    const [displayName, setInternalDisplayName] = useState(authDefaultName);

    // 🌟 THE CRITICAL FIX: Sync the display name precisely to the active logged-in user
    useEffect(() => {
        if (!isLoaded || !user) return;

        // Use a unique localStorage key PER USER so accounts don't leak into each other
        const userSpecificKey = `aurex_display_name_${user.id}`;
        const savedName = localStorage.getItem(userSpecificKey);

        if (savedName) {
            setInternalDisplayName(savedName);
        } else {
            // New user with no saved local state -> fall back cleanly to their default Clerk name/Gmail
            setInternalDisplayName(authDefaultName);
        }
    }, [user?.id, isLoaded, authDefaultName]);

    const setDisplayName = async (newName: string) => {
        if (!user?.id) return { success: false, error: "No authenticated user session found." };

        try {
            const trimmed = newName.trim();
            const userSpecificKey = `aurex_display_name_${user.id}`;

            // 🌟 Save it specifically locked behind this user's unique ID
            localStorage.setItem(userSpecificKey, trimmed);
            setInternalDisplayName(trimmed);

            return { success: true };
        } catch (err) {
            return { success: false, error: "Failed to update localized profile states." };
        }
    };

    return (
        <IdentityContext.Provider value={{ displayName, setDisplayName }}>
            {children}
        </IdentityContext.Provider>
    );
}

export function useIdentity() {
    const context = useContext(IdentityContext);
    if (!context) throw new Error('useIdentity must be used within an IdentityProvider');
    return context;
}


