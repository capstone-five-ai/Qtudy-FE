import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts';
import Home from './pages/home';
import CreateAIQuiz from './pages/CreateAIQuiz';
import MainLayout from './layouts/MainLayout';

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
];

const router = createBrowserRouter(routes);

export default router;
