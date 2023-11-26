import styled from 'styled-components';
import { useState } from 'react';
import { TAB_AI_QUIZ_CREATION, TEXT_AI_QUIZ_CREATION } from '../constants';
import TabBar from '../components/TapBar/TabBar';
import ContentHeader from '../components/Header/ContentHeader';
import MainWrapper from '../components/Wrapper/MainWrapper';

function QuizLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(TAB_AI_QUIZ_CREATION[0]);
  return (
    <Container>
      <ContentHeader text={TEXT_AI_QUIZ_CREATION} />
      <TabBar tabList={TAB_AI_QUIZ_CREATION} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ChildrenContainer>
        <MainWrapper>
          <InnerContainer>{children}</InnerContainer>
        </MainWrapper>
      </ChildrenContainer>
    </Container>
  );
}

export default QuizLayout;

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
