import { Route, Routes, useSearchParams } from 'react-router-dom';
import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import MainWrapper from '../../components/Wrapper/MainWrapper';
import MainLayout from '../../layouts/MainLayout';
import AIQuizComplete from './AIQuiz/AIQuizComplete';
import CreateAIQuiz from './AIQuiz/CreateAIQuiz';
import CreateUserQuiz from './UserQuiz/CreateUserQuiz';
import UserQuizComplete from './UserQuiz/UserQuizComplete';

function Quiz() {
  const [qs] = useSearchParams();
  const complete = qs.get('complete') === 'true';

  return (
    <MainLayout contentKey="createQuiz">
      <MainWrapper>
        <ContentWrapper>
          <Routes>
            <Route path="/ai" element={complete ? <AIQuizComplete /> : <CreateAIQuiz />} />
            <Route path="/user" element={complete ? <UserQuizComplete /> : <CreateUserQuiz />} />
          </Routes>
        </ContentWrapper>
      </MainWrapper>
    </MainLayout>
  );
}

export default Quiz;
