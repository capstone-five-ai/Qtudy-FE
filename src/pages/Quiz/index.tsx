import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import MainLayout from '../../layouts/MainLayout';
import CreateAIQuiz from './AIQuiz/CreateAIQuiz';

function Quiz() {
  return (
    <MainLayout contentKey="createQuiz">
      <ContentWrapper>
        <CreateAIQuiz />
      </ContentWrapper>
    </MainLayout>
  );
}

export default Quiz;
