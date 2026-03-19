import { Trash2 } from "lucide-react";
import { useDeleteTask } from "../../../../api/hooks";
import styles from "../TaskItem.module.scss";

type Props = {
  taskId: string;
};

const DeleteTaskButton = ({ taskId }: Props) => {
  const { mutate: deleteTask } = useDeleteTask();

  return (
    <button
      className={styles.deleteBtn}
      onClick={() => deleteTask(taskId)}
      aria-label="Delete task"
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteTaskButton;