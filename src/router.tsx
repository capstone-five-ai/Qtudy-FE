import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts';
import Home from './pages/home';
import Login from './pages/login';
import SelectService from './pages/selectService';
import Quiz from './pages/Quiz';
import Management from './pages/Management';

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
        element: <Quiz />,
      },
      {
        path: 'management',
        element: <Management />,
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
