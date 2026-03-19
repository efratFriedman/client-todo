import { Clock } from "lucide-react";
import type { Task } from "../../../../api/types";
import { formatDate } from "../../../../utils/date";
import styles from "../TaskItem.module.scss";

type Props = {
  task: Task;
};

const TaskContent = ({ task }: Props) => {
  return (
    <div className={styles.content}>
      <div className={styles.titleRow}>
        <span className={styles.title}>{task.title}</span>

        <span className={`${styles.badge} ${styles[task.priority]}`}>
          {task.priority.toUpperCase()}
        </span>
      </div>

      {task.description && (
        <p className={styles.desc}>{task.description}</p>
      )}

      <div className={styles.meta}>
        <Clock size={12} />
        <span>{formatDate(task.createdAt)}</span>
      </div>
    </div>
  );
};

export default TaskContent;