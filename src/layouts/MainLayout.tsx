import styled from 'styled-components';
import TabBar from '../components/TapBar/TabBar';
import ContentHeader from '../components/Header/ContentHeader';
import MainWrapper from '../components/Wrapper/MainWrapper';
import { HEADER_CONTENT } from '../constants';

interface MainLayoutProps {
  contentKey: string;
  children: React.ReactNode;
}

function MainLayout({ contentKey, children }: MainLayoutProps) {
  return (
    <Container>
      <ContentHeader text={HEADER_CONTENT[contentKey].header} />
      <TabBar tabList={HEADER_CONTENT[contentKey].tabs} />
      <ChildrenContainer>
        <MainWrapper>{children}</MainWrapper>
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
  padding: 20px 0px;
  width: 100%;
`;
