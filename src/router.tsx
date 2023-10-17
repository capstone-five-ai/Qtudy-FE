import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
];

const router = createBrowserRouter(routes);

export default router;
