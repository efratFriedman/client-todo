import { useFilterStore } from "../../../stores/filterStore";
import styles from "./TaskFilters.module.scss";

const TaskFilters = () => {
  const { statusFilter, setStatusFilter } = useFilterStore();

  return (
    <div className={styles.filters}>
      <button
        className={`${styles.filterTab} ${statusFilter === "all" ? styles.active : ""}`}
        onClick={() => setStatusFilter("all")}
      >
        All
      </button>

      <button
        className={`${styles.filterTab} ${statusFilter === "pending" ? styles.active : ""}`}
        onClick={() => setStatusFilter("pending")}
      >
        Pending
      </button>

      <button
        className={`${styles.filterTab} ${statusFilter === "in-progress" ? styles.active : ""}`}
        onClick={() => setStatusFilter("in-progress")}
      >
        In Progress
      </button>

      <button
        className={`${styles.filterTab} ${statusFilter === "completed" ? styles.active : ""}`}
        onClick={() => setStatusFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilters;