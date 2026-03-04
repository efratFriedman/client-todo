import { create } from 'zustand'

export type StatusFilter = 'all' | 'active' | 'completed'
export type PriorityFilter = 'all' | 'low' | 'medium' | 'high'

interface FilterState {
  statusFilter: StatusFilter
  priorityFilter: PriorityFilter
  setStatusFilter: (status: StatusFilter) => void
  setPriorityFilter: (priority: PriorityFilter) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  statusFilter: 'all',
  priorityFilter: 'all',
  setStatusFilter: (status) => set({ statusFilter: status }),
  setPriorityFilter: (priority) => set({ priorityFilter: priority }),
  resetFilters: () => set({ statusFilter: 'all', priorityFilter: 'all' }),
}))

