import ContentHeader from '@/components/Header/ContentHeader';
import TopNavigation from '@/components/Navigation/TopNavigation';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function MainLayout() {
  return (
    <MainContainer>
      <TopNavigation />
      <ContentHeader />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </MainContainer>
  );
}

export default MainLayout;

const MainContainer = styled.div`
  width: 100%;
  min-width: 1200px;
  height: 572px;
`;

const OutletContainer = styled.div`
  width: 1200px;
  padding: 20px;
  margin: 0 auto;
`;
