import { create } from "zustand"

interface UserSettings {
    theme: 'light' | 'dark'
    defaultFilter: 'all' | 'active' | 'completed'
    setTheme: (theme: 'light' | 'dark') => void
    setFilter: (filter: 'all' | 'active' | 'completed') => void
}

export const useUserSettingsStore = create<UserSettings>((set) => ({
    theme: 'light',
    defaultFilter: "all",
    setTheme: (theme) => set({ theme }),
    setFilter: (filter) => set({ defaultFilter: filter })
}))