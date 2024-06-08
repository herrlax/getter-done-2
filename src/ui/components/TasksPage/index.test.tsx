import React from 'react';
import { render } from '@testing-library/react';
import TasksPage from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('<TasksPage />', function () {
  it('renders TasksPage', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TasksPage />
      </QueryClientProvider>
    );
  });
});
