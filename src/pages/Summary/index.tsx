import { Route, Routes, useSearchParams } from 'react-router-dom';
import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import MainWrapper from '../../components/Wrapper/MainWrapper';
import MainLayout from '../../layouts/MainLayout';
import CreateAISummary from './AISummary/CreateAISummary';
import SummaryComplete from './SummaryComplete';
import CreateUserSummary from './UserSummary/CreateUserSummary';

function Summary() {
  const [qs] = useSearchParams();
  const complete = qs.get('complete') === 'true';

  return (
    <MainLayout contentKey="createSummary">
      <MainWrapper>
        <ContentWrapper>
          <Routes>
            <Route path="/ai" element={complete ? <SummaryComplete /> : <CreateAISummary />} />
            <Route path="/user" element={complete ? <SummaryComplete /> : <CreateUserSummary />} />
          </Routes>
        </ContentWrapper>
      </MainWrapper>
    </MainLayout>
  );
}

export default Summary;
