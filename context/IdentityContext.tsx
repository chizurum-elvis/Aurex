// "use client";
//
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { IdentityContextType} from "@/types";
//
//
// const IdentityContext = createContext<IdentityContextType | undefined>(undefined);
//
// export function IdentityProvider({ children, authDefaultName }: { children: React.ReactNode; authDefaultName: string }) {
//     const [displayName, setDisplayName] = useState(authDefaultName);
//
//     // 1. Try to load the custom name from local storage first so it stays snappy on refresh
//     useEffect(() => {
//         const savedName = localStorage.getItem("matrix_user_display_name");
//         if (savedName) {
//             setDisplayName(savedName);
//         } else if (authDefaultName) {
//             setDisplayName(authDefaultName);
//         }
//     }, [authDefaultName]);
//
//     // 2. Production asynchronous save engine
//     const handleSetDisplayName = async (name: string) => {
//         const trimmedName = name.trim();
//         if (!trimmedName) return { success: false, error: "Name cannot be empty" };
//
//         // Optimistic UI updates right away
//         setDisplayName(trimmedName);
//         localStorage.setItem("matrix_user_display_name", trimmedName);
//
//         try {
//             const response = await fetch("/api/user/profile", {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ displayName: trimmedName }),
//             });
//
//             const result = await response.json();
//             if (!response.ok || !result.success) throw new Error(result.error);
//
//             return { success: true };
//         } catch (error: any) {
//             console.error("Failed to sync profile:", error);
//             return { success: false, error: "Failed to save to server cloud profile." };
//         }
//     };
//
//     return (
//         <IdentityContext.Provider value={{ displayName, setDisplayName: handleSetDisplayName }}>
//             {children}
//         </IdentityContext.Provider>
//     );
// }
//
// export function useIdentity() {
//     const context = useContext(IdentityContext);
//     if (!context) throw new Error("useIdentity must be used within an IdentityProvider");
//     return context;
// }

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface IdentityContextType {
    displayName: string;
    setDisplayName: (name: string) => Promise<{ success: boolean; error?: string }>;
}

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


