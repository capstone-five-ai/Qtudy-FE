import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import authState from '../../recoil/atoms/authState';
import CreateAISummary from './AISummary/CreateAISummary';
import SummaryComplete from './SummaryComplete';
import CreateUserSummary from './UserSummary/CreateUserSummary';

function Summary() {
  const [qs] = useSearchParams();
  const complete = qs.get('complete') === 'true';

  const isAuthenticated = useRecoilValue(authState);

  if (!complete && !isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <ContentWrapper>
      <Routes>
        <Route path="/ai" element={complete ? <SummaryComplete type="ai" /> : <CreateAISummary />} />
        <Route path="/user" element={complete ? <SummaryComplete type="user" /> : <CreateUserSummary />} />
      </Routes>
    </ContentWrapper>
  );
}

export default Summary;
