import styled from 'styled-components';
import ContentWrapper from '../../../components/Wrapper/ContentWrapper';
import CreateAIQuiz from './CreateAIQuiz';

function AIQuiz() {
  return (
    <ContentWrapper>
      <Container>
        <CreateAIQuiz />
      </Container>
    </ContentWrapper>
  );
}

export default AIQuiz;

const Container = styled.div`
  display: flex;
  min-height: inherit;
`;
