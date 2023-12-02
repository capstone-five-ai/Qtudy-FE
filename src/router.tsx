import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts';
import Home from './pages/home';
import MainLayout from './layouts/MainLayout';
import Login from './pages/login';
import SelectService from './pages/selectService';
import AIQuiz from './pages/Quiz/AIQuiz';

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
        path: 'quiz',
        element: <MainLayout contentKey="createQuiz" />,
        children: [{ path: 'ai', element: <AIQuiz /> }],
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
