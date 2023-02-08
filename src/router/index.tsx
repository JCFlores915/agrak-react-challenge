import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from '../App';

import { ListUsers, User } from '../issues/views'

export const router = createBrowserRouter([
  {
    path: '/issues',
    element: <App />,
    children: [
        { path: 'list', element: <ListUsers/>,  },
        { path: 'user/:id', element: <User /> },
        { path: 'user', element: <User /> },
        { path: '*', element: <Navigate to="list" /> },
    ]
  },
  {
    path: '/',
    element: <Navigate to="issues/list" />
  },
  {
    path: '*',
    element: <h1>Not found</h1>,
  },
]);

