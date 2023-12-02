import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts';
import CreateQuiz from './pages/CreateQuiz';
import Home from './pages/home';
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
      {
        path: 'select',
        element: <SelectService />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
