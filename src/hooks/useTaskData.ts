import { useTasks } from "../api/hooks";
import { useFilterStore } from "../stores/filterStore";

export const useTaskData = () => {
  const { data: tasks = [], isLoading, isError, error, refetch } = useTasks();
  const { statusFilter } = useFilterStore();

  const filtered = statusFilter === "all" ? tasks : tasks.filter(t => t.status === statusFilter);
  const activeCount = tasks.filter(t => t.status !== "completed").length;
  const countLabel = statusFilter === 'all'
    ? `${activeCount} active tasks`
    : `${filtered.length} ${statusFilter === 'completed' ? 'completed' : statusFilter} task${filtered.length === 1 ? '' : 's'}`;

  return { filtered, countLabel, isLoading, isError, error, refetch };
};