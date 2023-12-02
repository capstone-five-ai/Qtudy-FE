import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts';
import Home from './pages/home';
import CreateAIQuiz from './pages/CreateAIQuiz';
import MainLayout from './layouts/MainLayout';
import Login from './pages/login';
import SelectService from './pages/selectService';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'create',
        element: <MainLayout contentKey="createQuiz" />,
        children: [
          {
            path: 'quiz',
            children: [{ path: 'ai', element: <CreateAIQuiz /> }],
          },
        ],
      },
    ],
  },
  {
    path: 'select',
    element: <SelectService />,
  },
  {
    path: 'login',
    element: <Login />,
  },
];

const router = createBrowserRouter(routes);

export default router;
