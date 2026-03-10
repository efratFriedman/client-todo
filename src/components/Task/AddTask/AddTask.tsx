import styles from "./AddTask.module.scss";
import { Plus } from "lucide-react";
import { useUiStore } from "../../../stores/uiStore";
import { useAddTaskForm } from "../../../hooks/useAddTaskForm";
import type { TaskPriority } from "../../../api/types";


const AddTask = () => {
  const PRIORITIES: TaskPriority[] = ["low", "medium", "high"];
  const { theme } = useUiStore();
  const {
    title, setTitle,
    description, setDescription,
    priority, setPriority,
    handleSubmit,
    isPending
  } = useAddTaskForm();

  return (
    <div className={`${styles.card} ${styles[theme]}`}>
      <input
        className={styles.titleInput}
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />

      <input
        className={styles.descInput}
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className={styles.row}>
        <div className={styles.chips}>
          {PRIORITIES.map((p) => (
            <button
              key={p}
              className={`${styles.chip} ${priority === p ? styles[`priority_${p}`] : ""}`}
              onClick={() => setPriority(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          className={styles.addBtn}
          onClick={handleSubmit}
          disabled={!title.trim() || isPending}
          aria-label="Add task"
        >
          <Plus size={18} />
          <span className={styles.addLabel}>Add</span>
        </button>
      </div>
    </div>
  );
};

export default AddTask;