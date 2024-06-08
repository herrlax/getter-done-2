import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasksQueryKey } from './getTasks';

const updateTaskMutation = (task: Partial<Task>) => window.electron.updateTask(task);

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getTasksQueryKey });
    }
  });
};
