import { useDebounce } from '@/ui/utils';
import React, { useState } from 'react';
import Checkbox from '../Checkbox';

type Props = {
  task: Task;
  onChange: (task: Partial<Task>) => void;
};

const TaskItem: React.FC<Props> = React.memo(({ task, onChange }) => {
  const [checked, setChecked] = useState(task.done);
  const debounce = useDebounce();

  const handleChange = (value: boolean) => {
    debounce(() => onChange({ id: task.id, done: value }), 1000);
    setChecked(value);
  };

  return (
    <label className="flex items-center my-1 mx-0">
      <Checkbox checked={checked} onChange={handleChange} name={`${task.title} check`} />
      {task.title}
    </label>
  );
});

export default TaskItem;
