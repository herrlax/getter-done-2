type Task = {
  id: string;
  date: string;
  title: string;
  comments: Array<string>;
  done: boolean;
};

declare interface Window {
  electron: {
    /**
     * Gets all tasks
     */
    getTasks(): Promise<Record<string, Task>>;
    /**
     * Adds a single task
     */
    addTask(task: Task): Promise<Task>;
    /**
     * Overwrites all tasks
     */
    writeTasks(tasks: Array<Task>): Promise<void>;
    /**
     * Updates a single task
     * @param task partial task to update
     */
    updateTask(task: Partial<Task>): Promise<Task>;
  };
}
