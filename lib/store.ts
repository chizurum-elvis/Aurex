import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserProfileStore} from "@/types";
import { SidebarState} from "@/types";



export const useSidebarStore = create<SidebarState>((set) => ({
    isSidebarOpen: true, // Default open state on desktop mount
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));



export const useUserProfileStore = create<UserProfileStore>()(
    persist(
        (set) => ({
            customDisplayNames: {}, // Initialize as an empty object map

            setDisplayNameForUser: (userId, newName) =>
                set((state) => ({
                    customDisplayNames: {
                        ...state.customDisplayNames, // Keep all other user configurations safe
                        [userId]: newName,           // Update ONLY this specific user slot
                    }
                })),
        }),
        {
            name: 'aurex-user-sessions-v1', // Storage identifier key in localStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);