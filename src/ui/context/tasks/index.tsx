import React, { useContext, useEffect, useMemo, useReducer } from 'react';
import produce from 'immer';

export type Task = {
  id: string;
  date: Date;
  title: string;
  comments: string[];
};

type State = {
  data: Task[];
  addTask: {
    pendingTask?: Task;
    isLoading: boolean;
    isError: boolean;
  };
  syncTasks: {
    isLoading: boolean;
    isError: boolean;
  };
};

type Action = {
  addTask: (task: Task) => void;
  syncTasks: () => void;
};

type ReducerAction =
  | { type: 'add_task_init'; data: Task }
  | { type: 'add_task_success' }
  | { type: 'add_task_errored' }
  | { type: 'sync_tasks_init' }
  | { type: 'sync_tasks_success'; data: Task[] }
  | { type: 'sync_tasks_errored' };

const TasksStateContext = React.createContext<State | undefined>(undefined);
const TasksActionContext = React.createContext<Action | undefined>(undefined);

const curriedReducer: (state: State, action: ReducerAction) => State = produce(
  (draft: State, action: ReducerAction) => {
    switch (action.type) {
      case 'add_task_init':
        draft.addTask.isLoading = true;
        draft.addTask.isError = false;
        draft.addTask.pendingTask = action.data;
        return;

      case 'add_task_success':
        draft.addTask.isLoading = false;
        draft.addTask.isError = false;
        draft.addTask.pendingTask = undefined;
        return;

      case 'add_task_errored':
        draft.addTask.isLoading = false;
        draft.addTask.isError = true;
        return;

      case 'sync_tasks_init':
        draft.syncTasks.isLoading = true;
        draft.syncTasks.isError = false;
        return;

      case 'sync_tasks_success':
        draft.syncTasks.isLoading = false;
        draft.syncTasks.isError = false;
        draft.data = action.data;
        return;

      case 'sync_tasks_errored':
        draft.syncTasks.isLoading = false;
        draft.syncTasks.isError = true;
        return;

      default:
        throw new Error('Unsupported action');
    }
  }
);

type ProviderProps = {
  data: Task[];
};

const initialState = {
  data: [],
  addTask: {
    pendingTask: undefined,
    isLoading: false,
    isError: false
  },
  syncTasks: {
    isLoading: false,
    isError: false
  }
};

const TasksProvider: React.FC<ProviderProps> = ({ data, children }) => {
  const [state, dispatch]: [State, React.Dispatch<ReducerAction>] = useReducer(
    curriedReducer,
    {
      ...initialState,
      data: [...initialState.data, ...data]
    }
  );

  useEffect(() => {
    if (state.addTask.isError) {
      console.error('Failed to add task');
    }
  }, [state.addTask.isError]);

  useEffect(() => {
    if (state.syncTasks.isError) {
      console.error('Failed to sync tasks');
    }
  }, [state.syncTasks.isError]);

  useEffect(() => {
    let isCurrent = true;

    const update = async () => {
      try {
        const res = await window.electron.getTasks();

        if (isCurrent) {
          dispatch({ type: 'sync_tasks_success', data: res });
        }
      } catch (e) {
        if (isCurrent) {
          dispatch({ type: 'sync_tasks_errored' });
        }
      }
    };

    if (state.syncTasks.isLoading) {
      update();
    }
  }, [state.syncTasks.isLoading]);

  useEffect(() => {
    let isCurrent = true;

    const update = async () => {
      if (typeof state.addTask.pendingTask !== 'undefined') {
        try {
          await window.electron.writeTasks([...state.data, state.addTask.pendingTask]);

          if (isCurrent) {
            dispatch({ type: 'add_task_success' });
            dispatch({ type: 'sync_tasks_init' });
          }
        } catch (e) {
          if (isCurrent) {
            dispatch({ type: 'add_task_errored' });
          }
        }
      }
    };

    if (state.addTask.isLoading && typeof state.addTask.pendingTask !== 'undefined') {
      update();
    }

    return () => {
      isCurrent = false;
    };
  }, [state.addTask.isLoading, state.addTask.pendingTask]);

  const actions = useMemo(
    () => ({
      addTask: (task: Task) => {
        dispatch({ type: 'add_task_init', data: task });
      },
      syncTasks: () => {
        dispatch({ type: 'sync_tasks_init' });
      }
    }),
    []
  );

  return (
    <TasksStateContext.Provider value={state}>
      <TasksActionContext.Provider value={actions}>
        {children}
      </TasksActionContext.Provider>
    </TasksStateContext.Provider>
  );
};

const useTasksState = () => {
  const context = useContext(TasksStateContext);

  if (typeof context === 'undefined') {
    throw new Error('useTasksState must be used within a TasksProvider');
  }

  return context;
};

const useTasksAction = () => {
  const context = useContext(TasksActionContext);

  if (typeof context === 'undefined') {
    throw new Error('useTasksAction must be used within a TasksProvider');
  }

  return context;
};

export { TasksProvider, useTasksState, useTasksAction };