import { Route, Routes, useSearchParams } from 'react-router-dom';
import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import MainLayout from '../../layouts/MainLayout';
import AIQuizComplete from './AIQuiz/AIQuizComplete';
import CreateAIQuiz from './AIQuiz/CreateAIQuiz';
import UserQuiz from './UserQuiz';

function Quiz() {
  const [qs] = useSearchParams();
  const complete = qs.get('complete') === 'true';

  return (
    <MainLayout contentKey="createQuiz">
      <ContentWrapper>
        <Routes>
          <Route path="/ai" element={complete ? <AIQuizComplete /> : <CreateAIQuiz />} />
          <Route path="/user" element={<UserQuiz />} />
        </Routes>
      </ContentWrapper>
    </MainLayout>
  );
}

export default Quiz;
