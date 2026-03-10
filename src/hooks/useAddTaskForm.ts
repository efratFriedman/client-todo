import { useState } from "react";
import type { TaskPriority } from "../api/types";
import { useAddTask } from "../api/hooks";

export const useAddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  const { mutate: addTask, isPending } = useAddTask();

  const handleSubmit = () => {
    if (!title.trim()) return;
    addTask(
      { title, description, status: "pending", priority },
      { onSuccess: () => { setTitle(""); setDescription(""); } }
    );
  };

  return {
    title, setTitle,
    description, setDescription,
    priority, setPriority,
    handleSubmit,
    isPending
  };
};