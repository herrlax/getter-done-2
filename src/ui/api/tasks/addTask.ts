import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasksQueryKey } from './getTasks';

const addTaskMutation = (task: Task) => window.electron.addTask(task);

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTaskMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getTasksQueryKey });
    }
  });
};
