import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts';
import Home from './pages/home';
import CreateAIQuiz from './pages/CreateAIQuiz';
import MainLayout from './layouts/MainLayout';
import { HEADER_CONTENT_CREATE_QUIZ, TAB_CREATE_QUIZ } from './constants';

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
        element: <MainLayout header={HEADER_CONTENT_CREATE_QUIZ} tabList={TAB_CREATE_QUIZ} />,
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
