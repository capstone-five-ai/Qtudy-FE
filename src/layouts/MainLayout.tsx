import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import TabBar from '../components/TapBar/TabBar';
import ContentHeader from '../components/Header/ContentHeader';
import MainWrapper from '../components/Wrapper/MainWrapper';
import { HEADER_CONTENT } from '../constants';

function MainLayout({ contentKey }: { contentKey: string }) {
  return (
    <Container>
      <ContentHeader text={HEADER_CONTENT[contentKey].header} />
      <TabBar tabList={HEADER_CONTENT[contentKey].tabs} />
      <ChildrenContainer>
        <MainWrapper>
          <Outlet />
        </MainWrapper>
      </ChildrenContainer>
    </Container>
  );
}

export default MainLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChildrenContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
`;
