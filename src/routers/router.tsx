import MainLayout from '@/components/Layout/MainLayout';
import SuspenseLoading from '@/components/Loader/SuspenseLoading';
import ProtectedRoute from '@/routers/ProtectedRoute';
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RedirectPage = lazy(() => import('@/pages/RedirectPage'));
const SelectServicePage = lazy(() => import('@/pages/SelectServicePage'));
const QuizAIPage = lazy(() => import('@/pages/QuizAIPage'));
const QuizUserPage = lazy(() => import('@/pages/QuizUserPage'));
const SummaryAIPage = lazy(() => import('@/pages/SummaryAIPage'));
const SummaryUserPage = lazy(() => import('@/pages/SummaryUserPage'));
const HistoryPage = lazy(() => import('@/pages/HistoryPage'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage'));
const CategoryQuizDetailPage = lazy(
  () => import('@/pages/CategoryQuizDetailPage')
);
const CategoryQuizEditPage = lazy(() => import('@/pages/CategoryQuizEditPage'));
const CategorySummaryDetailPage = lazy(
  () => import('@/pages/CategorySummaryDetailPage')
);
const CategorySummaryEditPage = lazy(
  () => import('@/pages/CategorySummaryEditPage')
);

const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SuspenseLoading />}>{children}</Suspense>
);

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

const router = createBrowserRouter(
  routes.map((route) => ({
    ...route,
    element: <AppWrapper>{route.element}</AppWrapper>,
  }))
);

export default router;
