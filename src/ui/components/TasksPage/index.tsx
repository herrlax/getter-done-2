import React, { useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import Progress from '../Progress';
import TaskDialog from '../TaskDialog';
import TaskList from '../TaskList';
import { useGetTasks, useUpdateTask } from '@/ui/api/tasks';
import { useAddTask } from '@/ui/api/tasks';

const TasksPage = () => {
  const [showProgress, setShowProgress] = useState(true);
  const [taskDialogIsOpen, setTaskDialogIsOpen] = useState(false);
  const { data } = useGetTasks();
  const { mutate: addTask, isPending: addTaskIsPending } = useAddTask();
  const { mutate: updateTask, isPending: updateTaskIsPending } = useUpdateTask();

  useEffect(() => {
    setTimeout(() => {
      setShowProgress(false);
    }, 5000);
  }, []);

  const numberOfCompleted = useMemo(
    () => data?.filter((t) => t.done).length || 0,
    [data]
  );

  return (
    <React.Fragment>
      <div>
        <h1>Good day to you 👋</h1>
        <p className="mt-0">It's time to get things done. Let's go!</p>
        {!!data?.length && showProgress && (
          <div className="flex items-center animate-fade-out absolute">
            <Progress progress={numberOfCompleted / data.length} />
            <span className="animate-fade-in">
              {numberOfCompleted === data.length ? (
                <React.Fragment>All your tasks are done. Nice job 👍</React.Fragment>
              ) : (
                <span>
                  {numberOfCompleted} of {data.length} tasks are done. Keep it up!
                </span>
              )}
            </span>
          </div>
        )}
        {!showProgress && (
          <div className="flex flex-col gap-2 animate-fade-in ">
            <Button
              onClick={() => setTaskDialogIsOpen(true)}
              variant="secondary"
              disabled={addTaskIsPending || updateTaskIsPending}
              className="w-fit"
            >
              Add task
            </Button>
            {data && <TaskList tasks={data} onEditTask={updateTask} />}
          </div>
        )}
      </div>
      {taskDialogIsOpen && (
        <TaskDialog
          onDismiss={() => setTaskDialogIsOpen(false)}
          onAddTask={(task: Task) => addTask(task)}
        />
      )}
    </React.Fragment>
  );
};

export default TasksPage;
