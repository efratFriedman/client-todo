import { io } from "socket.io-client";
import type { Task } from "../api/types";
import { queryClient } from "../api/queryClient";


export const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('✅ Socket connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('❌ Socket disconnected');
});

socket.on('task-created', (newTask: Task) => {
  console.log('📝 New task created:', newTask);
  queryClient.invalidateQueries({ queryKey: ['tasks'] });
});

socket.on('task-updated', (updatedTask: Task) => {
  console.log('✏️ Task updated:', updatedTask);
  queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) =>
    oldTasks ? oldTasks.map(t => t.id === updatedTask.id ? updatedTask : t) : []
  );
});

socket.on('task-deleted', (taskId: string) => {
  console.log('🗑️ Task deleted:', taskId);
  queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) =>
    oldTasks ? oldTasks.filter(t => t.id !== taskId) : []
  );
});