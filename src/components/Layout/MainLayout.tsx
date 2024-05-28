import ContentHeader from '@/components/Header/ContentHeader';
import TopNavigation from '@/components/Navigation/TopNavigation';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function MainLayout() {
  return (
    <>
      <TopNavigation />
      <ContentHeader />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </>
  );
}

export default MainLayout;

const OutletContainer = styled.div`
  width: 1200px;
  padding: 20px;
  margin: 0 auto;
`;
