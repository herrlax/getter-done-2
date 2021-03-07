import React, { useContext, useMemo, useReducer } from 'react';
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
  | { type: 'sync_task_init' }
  | { type: 'sync_task_success' }
  | { type: 'sync_task_errored' };

const TasksStateContext = React.createContext<State | undefined>(undefined);
const TasksActionContext = React.createContext<Action | undefined>(undefined);

const curriedReducer: (state: State, action: ReducerAction) => State = produce(
  (draft: State, action: ReducerAction) => {
    switch (action.type) {
      case 'add_task_init':
        draft.addTask.isLoading = true;
        draft.addTask.isError = false;
        return;

      case 'add_task_success':
        draft.addTask.isLoading = false;
        draft.addTask.isError = false;
        return;

      case 'add_task_errored':
        draft.addTask.isLoading = false;
        draft.addTask.isError = true;
        return;

      case 'sync_task_init':
        draft.syncTasks.isLoading = true;
        draft.syncTasks.isError = false;
        return;

      case 'sync_task_success':
        draft.syncTasks.isLoading = false;
        draft.syncTasks.isError = false;
        return;

      case 'sync_task_errored':
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
    isLoading: false,
    isError: false,
  },
  syncTasks: {
    isLoading: false,
    isError: false,
  },
};

const TasksProvider: React.FC<ProviderProps> = ({ data, children }) => {
  const [state, dispatch]: [State, React.Dispatch<ReducerAction>] = useReducer(
    curriedReducer,
    {
      ...initialState,
      data: [
        ...initialState.data,
        ...data
      ]
    }
  );

  const actions = useMemo(() => ({
    addTask: (task: Task) => {
      dispatch({ type: 'add_task_init', data: task });
    },
    syncTasks: () => {
      // todo
    }
  }), []);

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
