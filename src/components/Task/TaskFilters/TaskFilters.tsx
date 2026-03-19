import { useFilterStore } from "../../../stores/filterStore";
import { useUiStore } from "../../../stores/uiStore";
import styles from "./TaskFilters.module.scss";
import clsx from "clsx";

const FILTERS = ["all", "pending", "in-progress", "completed"] as const;

const FILTER_LABELS: Record<typeof FILTERS[number], string> = {
  all: "All",
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
};

const TaskFilters = () => {
  const { statusFilter, setStatusFilter } = useFilterStore();
  const { theme } = useUiStore(); 

  return (
    <div className={styles.filters}>
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={clsx(styles.filterTab, styles[theme], {
            [styles.active]: statusFilter === filter,
          })}
          onClick={() => setStatusFilter(filter)}
        >
          {FILTER_LABELS[filter]}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;