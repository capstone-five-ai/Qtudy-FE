import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Management from '../pages/Management';
import Quiz from '../pages/Quiz';
import Summary from '../pages/Summary';
import Login from '../pages/login';
import Redirection from '../pages/login/Redirection';
import SelectService from '../pages/selectService';
import ProtectedRoute from './ProtectedRoute';
import Share from '../pages/Share';

const routes = [
  { path: '/', element: <Navigate to="select" /> },
  { path: '*', element: <Navigate to="select" /> },
  {
    path: '/',
    element: <ProtectedRoute auth="AUTH" />,
    children: [
      {
        path: '/',
        element: <Layout contentKey="management" />,
        children: [
          {
            path: 'management/*',
            element: <Management />,
          },
          {
            path: 'management/mycategory/share',
            element: <Share />,
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
    element: <Layout contentKey="quiz" />,
    children: [
      {
        path: 'quiz/*',
        element: <Quiz />,
      },
    ],
  },
  {
    path: '/',
    element: <Layout contentKey="summary" />,
    children: [{ path: 'summary/*', element: <Summary /> }],
  },
];

const router = createBrowserRouter(routes);

export default router;
