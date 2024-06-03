import MainLayout from '@/components/Layout/MainLayout';
import CategoryPage from '@/pages/CategoryPage';
import CategoryQuizDetailPage from '@/pages/CategoryQuizDetailPage';
import CategoryQuizEditPage from '@/pages/CategoryQuizEditPage';
import CategorySummaryDetailPage from '@/pages/CategorySummaryDetailPage';
import CategorySummaryEditPage from '@/pages/CategorySummaryEditPage';
import HistoryPage from '@/pages/HistoryPage';
import LoginPage from '@/pages/LoginPage';
import QuizAIPage from '@/pages/QuizAIPage';
import QuizUserPage from '@/pages/QuizUserPage';
import RedirectPage from '@/pages/RedirectPage';
import SelectServicePage from '@/pages/SelectServicePage';
import SummaryAIPage from '@/pages/SummaryAIPage';
import SummaryUserPage from '@/pages/SummaryUserPage';
import ProtectedRoute from '@/routers/ProtectedRoute';
import { Navigate, createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    element: <ProtectedRoute auth="NO_AUTH" />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/oauth/kakao/callback', element: <RedirectPage /> },
    ],
  },
  {
    element: <ProtectedRoute auth="AUTH" />,
    children: [{ path: '/', element: <SelectServicePage /> }],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'quiz',
        children: [
          { path: '', element: <Navigate replace to="ai" /> },
          { path: 'ai', element: <QuizAIPage /> },
          { path: 'user', element: <QuizUserPage /> },
        ],
      },
      {
        path: 'summary',
        children: [
          { path: '', element: <Navigate replace to="ai" /> },
          { path: 'ai', element: <SummaryAIPage /> },
          { path: 'user', element: <SummaryUserPage /> },
        ],
      },
      {
        path: 'management',
        children: [
          { path: '', element: <Navigate replace to="history" /> },
          {
            element: <ProtectedRoute auth="AUTH" />,
            children: [
              { path: 'history', element: <HistoryPage /> },
              { path: 'category', element: <CategoryPage /> },
              { path: 'category/edit/quiz', element: <CategoryQuizEditPage /> },
              {
                path: 'category/edit/summary',
                element: <CategorySummaryEditPage />,
              },
            ],
          },
          { path: 'category/quiz', element: <CategoryQuizDetailPage /> },
          {
            path: 'category/summary',
            element: <CategorySummaryDetailPage />,
          },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate replace to="/" /> },
];

const router = createBrowserRouter(routes);

export default router;
