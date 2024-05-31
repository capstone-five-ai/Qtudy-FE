import MainLayout from '@/components/Layout/MainLayout';
import CategoryPage from '@/pages/CategoryPage';
import CategoryQuizDetailPage from '@/pages/CategoryQuizDetailPage';
import CategoryQuizEditPage from '@/pages/CategoryQuizEditPage';
import CategorySummaryDetailPage from '@/pages/CategorySummaryDetailPage';
import CategorySummaryEditPage from '@/pages/CategorySummaryEditPage';
import HistoryPage from '@/pages/HIstoryPage';
import LoginPage from '@/pages/LoginPage';
import QuizAIPage from '@/pages/QuizAIPage';
import QuizUserPage from '@/pages/QuizUserPage';
import RedirectPage from '@/pages/RedirectPage';
import SelectServicePage from '@/pages/SelectServicePage';
import SummaryAIPage from '@/pages/SummaryAIPage';
import SummaryUserPage from '@/pages/SummaryUserPage';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
  { path: '/', element: <SelectServicePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/oauth/kakao/callback', element: <RedirectPage /> },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'quiz',
        children: [
          { path: 'ai', element: <QuizAIPage /> },
          { path: 'user', element: <QuizUserPage /> },
        ],
      },
      {
        path: 'summary',
        children: [
          { path: 'ai', element: <SummaryAIPage /> },
          { path: 'user', element: <SummaryUserPage /> },
        ],
      },
      {
        path: 'management',
        children: [
          { path: 'history', element: <HistoryPage /> },
          { path: 'category', element: <CategoryPage /> },
          { path: 'category/quiz', element: <CategoryQuizDetailPage /> },
          { path: 'category/summary', element: <CategorySummaryDetailPage /> },
          { path: 'category/edit/quiz', element: <CategoryQuizEditPage /> },
          {
            path: 'category/edit/summary',
            element: <CategorySummaryEditPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
