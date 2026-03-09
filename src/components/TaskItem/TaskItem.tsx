import { useUiStore } from "../../stores/uiStore";
import styles from "./TaskItem.module.scss";
import { Trash2, Clock, CheckCircle2, Circle, Loader2 } from "lucide-react";
import type { Task, TaskStatus } from "../../api/types";
import { useDeleteTask, useToggleTaskStatus } from "../../api/hooks";
import { formatDate } from "../../utils/date";

const STATUS_CYCLE: Record<TaskStatus, TaskStatus> = {
  "pending":     "in-progress",
  "in-progress": "completed",
  "completed":   "pending",
};

const StatusIcon = ({ status }: { status: TaskStatus }) => {
  if (status === "completed")   return <CheckCircle2 size={22} className={styles.iconCompleted} />;
  if (status === "in-progress") return <Loader2      size={22} className={`${styles.iconProgress} ${styles.spin}`} />;
  return <Circle size={22} className={styles.iconPending} />;
};



const TaskItem = ({ task }: { task: Task }) => {
  const { theme }                = useUiStore();
  const { mutate: toggleStatus, isPending: toggling } = useToggleTaskStatus();
  const { mutate: deleteTask }   = useDeleteTask();

  return (
    <li className={`${styles.item} ${styles[theme]} ${task.status === "completed" ? styles.done : ""}`}>
      <button
        className={styles.statusBtn}
        onClick={() => {
          toggleStatus(
            { taskId: task.id, updates: { status: STATUS_CYCLE[task.status] } },
            {
                  }
          );
        }}
        aria-label="Toggle status"
        disabled={toggling}
      >
        <StatusIcon status={task.status} />
      </button>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{task.title}</span>
          <span className={`${styles.badge} ${styles[task.priority]}`}>
            {task.priority.toUpperCase()}
          </span>
        </div>

        {task.description && <p className={styles.desc}>{task.description}</p>}

        <div className={styles.meta}>
          <Clock size={12} />
          <span>{formatDate(task.createdAt)}</span>
        </div>
      </div>

      <button
        className={styles.deleteBtn}
        onClick={() => deleteTask(task.id)}
        aria-label="Delete task"
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
};

export default TaskItem;