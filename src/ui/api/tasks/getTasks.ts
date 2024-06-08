import { useQuery } from '@tanstack/react-query';

const fetchTasksQuery = async () => {
  const res = await window.electron.getTasks();

  return Object.values(res);
};

export const useGetTasks = () =>
  useQuery({
    queryKey: getTasksQueryKey,
    queryFn: () => fetchTasksQuery()
  });

export const getTasksQueryKey = ['get-tasks'];
