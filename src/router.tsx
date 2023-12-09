import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts';
import Management from './pages/Management';
import Quiz from './pages/Quiz';
import Summary from './pages/Summary';
import Home from './pages/home';
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
        path: 'quiz/*',
        element: <Quiz />,
      },
      { path: 'summary/*', element: <Summary /> },
      {
        path: 'management/*',
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
