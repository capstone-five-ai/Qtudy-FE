import { Navigate, useSearchParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import MainWrapper from '../../components/Wrapper/MainWrapper';
import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import ShareQuiz from './ShareQuiz';
import ShareSummary from './ShareSummary';

function Share() {
  const [params] = useSearchParams();

  if (!params.get('category') || !params.get('id')) return <Navigate to="/" replace />;

  return (
    <MainLayout contentKey="management">
      <MainWrapper>
        <ContentWrapper>
          {params.get('category') === 'quiz' && <ShareQuiz currentId={params.get('id')} />}
          {params.get('category') === 'summary' && <ShareSummary currentId={params.get('id')} />}
        </ContentWrapper>
      </MainWrapper>
    </MainLayout>
  );
}

export default Share;
