import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface UiState {
  theme: Theme
  isSidebarOpen: boolean
  tasksViewedCount: number
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  toggleSidebar: () => void
  incrementTasksViewed: () => void
}

export const useUiStore = create<UiState>((set, get) => ({
  theme: 'light',
  isSidebarOpen: true,
  tasksViewedCount: 0,
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  incrementTasksViewed: () =>
    set({ tasksViewedCount: get().tasksViewedCount + 1 }),
}))

