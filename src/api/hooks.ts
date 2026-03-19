import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "./queryClient";
import type { CreateTaskDto, UpdateTaskDto, Task } from "./types";
import { toast } from "react-toastify";

const API_URL = 'http://localhost:3001/tasks';

export function useTasks() {
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
        onSuccess: () => {
            toast.success('task created!')
        },
        onError: (err: any) => {
            toast.error(`Failed to add task: ${err.message}`);
        },
    })

}

export function useToggleTaskStatus() {
    return useMutation({
        mutationFn: async ({ taskId, updates }: { taskId: string; updates: UpdateTaskDto }): Promise<Task> => {
            const { data } = await axios.patch<Task>(`${API_URL}/${taskId}`, updates);
            return data;
        },
        onSuccess: (updatedTask) => {
            queryClient.setQueryData<Task[]>(['tasks'], (old) =>
                old ? old.map(t => t.id === updatedTask.id ? updatedTask : t) : old
            );
            toast.success('update successfully!')
        },
        onError: (error: Error) => console.error('Error updating task:', error.message),
    })
}

export function useDeleteTask() {
    return useMutation({
        mutationFn: async (taskId: string): Promise<void> => {
            await axios.delete(`${API_URL}/${taskId}`);
        },
        onSuccess: (_, taskId) => {
            queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) =>
                oldTasks ? oldTasks.filter(t => t.id !== taskId) : []
            );
            toast.success('Task deleted locally!');
        },
        onError: (error: Error) => console.error('Error deleting task:', error.message),
    });
}
