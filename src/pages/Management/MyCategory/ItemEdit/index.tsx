import { Navigate, useSearchParams } from 'react-router-dom';
import MainWrapper from '../../../../components/Wrapper/MainWrapper';
import ContentWrapper from '../../../../components/Wrapper/ContentWrapper';
import QuizItemEdit from './QuizItemEdit';
import SummaryItemEdit from './SummaryItemEdit';

function ItemEdit() {
  const [params] = useSearchParams();

  if (!params.get('category') || (params.get('category') !== 'quiz' && params.get('category') !== 'summary'))
    return <Navigate to="/management/mycategory" replace />;

  return (
    <MainWrapper>
      <ContentWrapper>
        {params.get('category') === 'quiz' && <QuizItemEdit />}
        {params.get('category') === 'summary' && <SummaryItemEdit />}
      </ContentWrapper>
    </MainWrapper>
  );
}

export default ItemEdit;
