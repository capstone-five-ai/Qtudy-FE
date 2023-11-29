import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts';
import Home from './pages/home';
import CreateAIQuiz from './pages/CreateAIQuiz';

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
        element: <CreateAIQuiz />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
