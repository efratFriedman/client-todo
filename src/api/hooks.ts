import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "./queryClient";
import type { CreateTaskDto, UpdateTaskDto, Task } from "./types";

const API_URL = 'http://localhost:3001/tasks';

export function useTasks(){
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<Task[]> => {
      const { data } = await axios.get<Task[]>(API_URL);
      return data;
    },
  });
}

export function useAddTask() {
    return useMutation({
        mutationFn: async (newTask: CreateTaskDto): Promise<Task> => {
            const { data } = await axios.post<Task>(API_URL, newTask);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
        onError: (error: Error) => console.error('Error adding task:', error.message),
    })

}

export function useToggleTaskStatus(){
    return useMutation({
        mutationFn: async ({ taskId, updates }: { taskId: string; updates: UpdateTaskDto }): Promise<Task> => {
            const { data } = await axios.patch<Task>(`${API_URL}/${taskId}`, updates);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
        onError: (error: Error) => console.error('Error updating task:', error.message),
    })
}

export function useDeleteTask(){
    return useMutation({
        mutationFn: async (taskId: string): Promise<void> => {
            await axios.delete(`${API_URL}/${taskId}`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
        onError: (error: Error) => console.error('Error deleting task:', error.message),
    })
}
