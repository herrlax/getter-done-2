import { useQuery } from '@tanstack/react-query';

const MOCK_TASKS = {
  '2024-06-08T08:21:55.747Z': {
    id: '2024-06-08T08:21:55.747Z',
    date: '2024-06-08T08:21:55.747Z',
    title: 'Group tasks by date',
    comments: [],
    done: true
  },
  '2024-06-08T08:22:03.604Z': {
    id: '2024-06-08T08:22:03.604Z',
    date: '2024-06-08T08:22:03.604Z',
    title: 'Add section for completed tasks',
    comments: [],
    done: true
  },
  '2024-06-08T08:22:20.203Z': {
    id: '2024-06-08T08:22:20.203Z',
    date: '2024-06-08T08:22:20.203Z',
    title: 'Enable auto-removal of completed tasks',
    comments: [],
    done: true
  },
  '2024-06-08T08:22:28.508Z': {
    id: '2024-06-08T08:22:28.508Z',
    date: '2024-06-08T08:22:28.508Z',
    title: 'Replace styled components with tailwind',
    comments: [],
    done: true
  },
  '2024-06-08T08:22:36.514Z': {
    id: '2024-06-08T08:22:36.514Z',
    date: '2024-06-08T08:22:36.514Z',
    title: 'Style like Kry brand',
    comments: [],
    done: true
  },
  '2024-06-08T08:22:56.164Z': {
    id: '2024-06-08T08:22:56.164Z',
    date: '2024-06-08T08:22:56.164Z',
    title: 'Replace modal with a text input on start screen',
    comments: [],
    done: false
  },
  '2024-06-08T08:23:05.389Z': {
    id: '2024-06-08T08:23:05.389Z',
    date: '2024-06-08T08:23:05.389Z',
    title: 'Enable delete tasks',
    comments: [],
    done: false
  },
  '2024-06-08T08:24:45.405Z': {
    id: '2024-06-08T08:24:45.405Z',
    date: '2024-06-08T08:24:45.405Z',
    title: 'Handle case when there is no tasks.json file',
    comments: [],
    done: true
  }
};

const fetchTasksQuery = async () => {
  // const res = await window.electron.getTasks();

  console.log('Object.values(MOCK_TASKS)>>>>', Object.values(MOCK_TASKS));

  return Object.values(MOCK_TASKS);
};

export const useGetTasks = () =>
  useQuery({
    queryKey: getTasksQueryKey,
    queryFn: () => fetchTasksQuery()
  });

export const getTasksQueryKey = ['get-tasks'];
