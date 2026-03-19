import { useUiStore } from "../../../stores/uiStore";
import type { Task } from "../../../api/types";
import TaskStatusButton from "./TaskStatusButton/TaskStatusButton";
import DeleteTaskButton from "./DeleteTaskButton/DeleteTaskButton";
import TaskContent from "./TaskContent/TaskContent";
import styles from "./TaskItem.module.scss";

type Props = {
  task: Task;
};

const TaskItem = ({ task }: Props) => {
  const { theme } = useUiStore();

  return (
  <li className={`${styles.item} ${styles[theme]} ${task.status === "completed" ? styles.done : ""}`}>

  <TaskStatusButton taskId={task.id} status={task.status} />

  <TaskContent task={task} />

  <DeleteTaskButton taskId={task.id} />

</li>
  );
};

export default TaskItem;