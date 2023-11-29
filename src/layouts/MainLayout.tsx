import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import TabBar from '../components/TapBar/TabBar';
import ContentHeader from '../components/Header/ContentHeader';
import MainWrapper from '../components/Wrapper/MainWrapper';
import { HeaderContentType, TabType } from '../types';

interface MainLayoutProps {
  header: HeaderContentType;
  tabList: TabType[];
}

function MainLayout({ header, tabList }: MainLayoutProps) {
  return (
    <Container>
      <ContentHeader text={header} />
      <TabBar tabList={tabList} />
      <ChildrenContainer>
        <MainWrapper>
          <InnerContainer>
            <Outlet />
          </InnerContainer>
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

const InnerContainer = styled.div`
  background-color: ${(props) => props.theme.colors.grayScale08};
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px rgba(189, 189, 189, 0.28);
`;
