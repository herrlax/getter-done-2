import React from 'react';
import TaskItem from '../TaskItem';
import { LIST } from './styles';

type Props = {
  tasks: Array<Task>;
  onEditTask: (task: Partial<Task>) => void;
};

const TaskList: React.FC<Props> = ({ tasks, onEditTask }) => {
  return (
    <ul css={LIST}>
      {tasks.map((task: Task) => (
        <li key={task.id}>
          <TaskItem task={task} onChange={onEditTask} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
