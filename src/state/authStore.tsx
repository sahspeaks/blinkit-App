import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mmkvStorege } from "./storage";

interface authStore {
    user: Record<string, any> | null;
    setUser: (user: any) => void;
    currentOrder: Record<string, any> | null;
    setCurrentOrder: (order: any) => void;
    logout: () => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}


export const useAuthStore = create<authStore>()(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user: any) => set({ user }),
            currentOrder: null,
            setCurrentOrder: (order: any) => set({ currentOrder: order }),
            logout: () => set({ user: null, currentOrder: null }),
            isLoggedIn: false,
            setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => mmkvStorege),
        }
    ),
)