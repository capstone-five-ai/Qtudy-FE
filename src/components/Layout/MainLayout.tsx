import ContentHeader from '@/components/Header/ContentHeader';
import TopNavigation from '@/components/Navigation/TopNavigation';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <TopNavigation />
      <ContentHeader />
      <Outlet />
    </>
  );
}

export default MainLayout;
