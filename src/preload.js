const ipcRenderer = require('electron').ipcRenderer;
const contextBridge = require('electron').contextBridge;

const TASKS_FILE = 'tasks.json';

contextBridge.exposeInMainWorld('electron', {
  getTasks: async () => {
    try {
      const res = await ipcRenderer.invoke('read-file', TASKS_FILE);
      const tasks = JSON.parse(res);
      return tasks;
    } catch (e) {
      return [];
    }
  },
  addTask: async (task) => {
    const res = await ipcRenderer.invoke('read-file', TASKS_FILE);
    let tasksObject = JSON.parse(res);

    if (!tasksObject) {
      tasksObject = {};
    }

    // TODO generate id here instead
    tasksObject[task.id] = task;

    await ipcRenderer.invoke('write-file', {
      content: tasksObject,
      fileName: TASKS_FILE
    });

    return task;
  },
  writeTasks: async (tasks) => {
    const tasksObject = {};

    tasks.forEach((task) => {
      tasksObject[task.id] = task;
    });

    return ipcRenderer.invoke('write-file', {
      content: tasksObject,
      fileName: TASKS_FILE
    });
  },
  updateTask: async (updatedTask) => {
    const res = await ipcRenderer.invoke('read-file', TASKS_FILE);
    const tasksObject = JSON.parse(res);

    if (!tasksObject[updatedTask.id]) {
      throw new Error(
        `Task with id ${updatedTask.id} was not found in file ${TASKS_FILE}`
      );
    }

    const currentTask = tasksObject[updatedTask.id];

    const fullyUpdatedTask = { ...currentTask, ...updatedTask };

    tasksObject[updatedTask.id] = fullyUpdatedTask;

    await ipcRenderer.invoke('write-file', {
      content: tasksObject,
      fileName: TASKS_FILE
    });

    return fullyUpdatedTask;
  }
});
