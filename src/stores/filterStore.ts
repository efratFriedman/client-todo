import { create } from 'zustand'
import type { TaskStatus, TaskPriority } from '../api/types'

export type StatusFilter = TaskStatus | 'all'
export type PriorityFilter = TaskPriority | 'all'

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

