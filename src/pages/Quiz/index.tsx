import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import MainWrapper from '../../components/Wrapper/MainWrapper';
import MainLayout from '../../layouts/MainLayout';
import CreateAIQuiz from './AIQuiz/CreateAIQuiz';

function Quiz() {
  return (
    <MainLayout contentKey="createQuiz">
      <MainWrapper>
        <ContentWrapper>
          <CreateAIQuiz />
        </ContentWrapper>
      </MainWrapper>
    </MainLayout>
  );
}

export default Quiz;
