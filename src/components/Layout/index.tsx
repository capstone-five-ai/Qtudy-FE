import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import TopNavigation from './TopNavigation';
import ContentHeader from './ContentHeader';
import { HEADER_CONTENT } from '../../constants';
import MenuTabBar from './MenuTabBar';

interface LayoutProps {
  contentKey: string;
}

function Layout({ contentKey }: LayoutProps) {
  return (
    <>
      <TopNavigation />
      <ContentHeader text={HEADER_CONTENT[contentKey].header} />
      <MenuTabBar tabList={HEADER_CONTENT[contentKey].tabs} />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </>
  );
}

export default Layout;

const OutletContainer = styled.div`
  width: 1200px;
  padding: 20px;
  margin: 0 auto;
`;
