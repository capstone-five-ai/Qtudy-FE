import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts';
import Home from './pages/home';
import CreateQuiz from './pages/CreateQuiz';

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
];

const router = createBrowserRouter(routes);

export default router;
