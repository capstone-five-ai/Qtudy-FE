import { Navigate, useSearchParams } from 'react-router-dom';
import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import ShareQuiz from './ShareQuiz';
import ShareSummary from './ShareSummary';

function Share() {
  const [params] = useSearchParams();

  if (!params.get('category') || !params.get('id')) return <Navigate to="/" replace />;

  return (
    <ContentWrapper>
      {params.get('category') === 'quiz' && <ShareQuiz currentId={params.get('id')} />}
      {params.get('category') === 'summary' && <ShareSummary currentId={params.get('id')} />}
    </ContentWrapper>
  );
}

export default Share;
