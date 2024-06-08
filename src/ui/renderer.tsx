import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TasksPage from './components/TasksPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const container = document.getElementById('root');
const queryClient = new QueryClient();

if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <TasksPage />
    </QueryClientProvider>
  );
}
