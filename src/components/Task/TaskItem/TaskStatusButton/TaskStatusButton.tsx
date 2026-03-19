import { Loader2, CheckCircle2, Circle } from "lucide-react";
import styles from "../TaskItem.module.scss";
import type { TaskStatus } from "../../../../api/types";
import { useToggleTaskStatus } from "../../../../api/hooks";

const STATUS_CYCLE: Record<TaskStatus, TaskStatus> = {
  pending: "in-progress",
  "in-progress": "completed",
  completed: "pending",
};

const StatusIcon = ({ status }: { status: TaskStatus }) => {
  if (status === "completed") {
    return <CheckCircle2 size={22} className={styles.iconCompleted} />;
  }

  if (status === "in-progress") {
    return <Loader2 size={22} className={`${styles.iconProgress} ${styles.spin}`} />;
  }

  return <Circle size={22} className={styles.iconPending} />;
};

type Props = {
  taskId: string;
  status: TaskStatus;
};

const TaskStatusButton = ({ taskId, status }: Props) => {
  const { mutate: toggleStatus, isPending } = useToggleTaskStatus();

  const nextStatus = STATUS_CYCLE[status];

  return (
    <button
      className={styles.statusBtn}
      onClick={() =>
        toggleStatus({
          taskId,
          updates: { status: nextStatus },
        })
      }
      aria-label="Toggle status"
      disabled={isPending}
    >
      <StatusIcon status={status} />
    </button>
  );
};

export default TaskStatusButton;