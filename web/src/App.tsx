// src/App.tsx
import React from 'react';
import AppRoutes from './routes/routes';
import { QueryClientProvider } from 'react-query';
import { apolloClient, queryClient } from './main.config';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <AppRoutes/>
        <Toaster richColors theme='light' />
      </ApolloProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
