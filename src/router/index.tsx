import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts';
import Management from '../pages/Management';
import Quiz from '../pages/Quiz';
import Summary from '../pages/Summary';
import Login from '../pages/login';
import Redirection from '../pages/login/Redirection';
import SelectService from '../pages/selectService';
import ProtectedRoute from './ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <ProtectedRoute auth="AUTH" />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: 'management/*',
            element: <Management />,
          },
        ],
      },
      { path: 'select', element: <SelectService /> },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute auth="NO_AUTH" />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'oauth/kakao/callback',
        element: <Redirection />,
      },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'quiz/*',
        element: <Quiz />,
      },
      { path: 'summary/*', element: <Summary /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
