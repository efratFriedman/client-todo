import { useTaskData } from "../../../hooks/useTaskData";
import { useUiStore } from "../../../stores/uiStore";
import TaskFilters from "../TaskFilters/TaskFilters";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.scss";

const TaskList = () => {
  const { theme } = useUiStore();
  const { filtered, countLabel, isLoading, isError, error, refetch } = useTaskData();

  if (isLoading)
    return <div className={`${styles.empty} ${styles[theme]}`}>Loading...</div>;

  if (isError)
    return (
      <div className={`${styles.empty} ${styles[theme]}`}>
        Error loading tasks: {error?.message}
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );

  return (
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      <div className={styles.header}>
        <TaskFilters/>
        <span className={styles.count}>{countLabel}</span>
      </div>

      <ul className={styles.list}>
        {filtered.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}

        {filtered.length === 0 && (
          <li className={styles.empty}>No tasks found.</li>
        )}
      </ul>
    </div>
  );
};

export default TaskList;