import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import authState from '../../recoil/atoms/authState';
import AIQuizComplete from './AIQuiz/AIQuizComplete';
import CreateAIQuiz from './AIQuiz/CreateAIQuiz';
import CreateUserQuiz from './UserQuiz/CreateUserQuiz';
import UserQuizComplete from './UserQuiz/UserQuizComplete';

function Quiz() {
  const [qs] = useSearchParams();
  const complete = qs.get('complete') === 'true';

  const isAuthenticated = useRecoilValue(authState);

  if (!complete && !isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <ContentWrapper>
      <Routes>
        <Route path="/ai" element={complete ? <AIQuizComplete /> : <CreateAIQuiz />} />
        <Route path="/user" element={complete ? <UserQuizComplete /> : <CreateUserQuiz />} />
      </Routes>
    </ContentWrapper>
  );
}

export default Quiz;
