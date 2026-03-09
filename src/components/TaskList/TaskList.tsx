import { useTaskData } from "../../hooks/useTaskData";
import { useFilterStore } from "../../stores/filterStore";
import { useUiStore } from "../../stores/uiStore";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.scss";

const TaskList = () => {
  const { theme }                       = useUiStore();
  const { statusFilter, setStatusFilter }                = useFilterStore();
  const { filtered, countLabel, isLoading } = useTaskData();

  if (isLoading) return <div className={`${styles.empty} ${styles[theme]}`}>Loading...</div>;

  return (
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      <div className={styles.header}>
        <div className={styles.filters}>
          <button
            className={`${styles.filterTab} ${statusFilter === 'all' ? styles.active : ''}`}
            onClick={() => { setStatusFilter('all'); }}
          >
            All
          </button>
          <button
            className={`${styles.filterTab} ${statusFilter === 'pending' ? styles.active : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`${styles.filterTab} ${statusFilter === 'in-progress' ? styles.active : ''}`}
            onClick={() => setStatusFilter('in-progress')}
          >
            In Progress
          </button>
          <button
            className={`${styles.filterTab} ${statusFilter === 'completed' ? styles.active : ''}`}
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </button>
        </div>
        <span className={styles.count}>{countLabel}</span>
      </div>

      <ul className={styles.list}>
        {filtered.map((task) => <TaskItem key={task.id} task={task} />)}
        {filtered.length === 0 && <li className={styles.empty}>No tasks found.</li>}
      </ul>
    </div>
  );
};

export default TaskList;