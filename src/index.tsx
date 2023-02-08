import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router';
import { router } from './router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
