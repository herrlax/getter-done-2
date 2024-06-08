import React from 'react';
import TaskItem from '../TaskItem';

type Props = {
  tasks: Array<Task>;
  onEditTask: (task: Partial<Task>) => void;
};

const TaskList: React.FC<Props> = ({ tasks, onEditTask }) => {
  return (
    <ul className="list-none m-0 p-0">
      {tasks.map((task: Task) => (
        <li key={task.id}>
          <TaskItem task={task} onChange={onEditTask} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
