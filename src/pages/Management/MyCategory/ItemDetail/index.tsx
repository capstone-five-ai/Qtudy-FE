import { Navigate, useSearchParams } from 'react-router-dom';
import MainWrapper from '../../../../components/Wrapper/MainWrapper';
import ContentWrapper from '../../../../components/Wrapper/ContentWrapper';
import QuizItemDetail from './QuizItemDetail';
import SummaryItemDetail from './SummaryItemDetail';

function ItemDetail() {
  const [params] = useSearchParams();

  if (!params.get('category') || (params.get('category') !== 'quiz' && params.get('category') !== 'summary'))
    return <Navigate to="/management/mycategory" replace />;

  return (
    <MainWrapper>
      <ContentWrapper>
        {params.get('category') === 'quiz' && <QuizItemDetail />}
        {params.get('category') === 'summary' && <SummaryItemDetail />}
      </ContentWrapper>
    </MainWrapper>
  );
}

export default ItemDetail;