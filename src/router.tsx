import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts';
import CreateQuiz from './pages/CreateQuiz';
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
        path: 'create/quiz',
        element: <CreateQuiz />,
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
