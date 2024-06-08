import React from 'react';
import { render } from '@testing-library/react';
import TasksList from '.';

const mockTask: Task = {
  id: '',
  date: new Date(),
  title: '',
  comments: [] as string[],
  done: false
};

describe('<TasksList />', function () {
  it('renders TasksList', () => {
    render(<TasksList onEditTask={jest.fn()} tasks={[]} />);
  });
});
