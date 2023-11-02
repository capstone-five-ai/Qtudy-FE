import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts';
import Home from './pages/home';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
