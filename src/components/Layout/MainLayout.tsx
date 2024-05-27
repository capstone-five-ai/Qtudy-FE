import TopNavigation from '@/components/Navigation/TopNavigation';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <TopNavigation />
      <Outlet />
    </>
  );
}

export default MainLayout;
