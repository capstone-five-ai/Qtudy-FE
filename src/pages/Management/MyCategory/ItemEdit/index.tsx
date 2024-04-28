import { Navigate, useSearchParams } from 'react-router-dom';
import ContentWrapper from '../../../../components/Wrapper/ContentWrapper';
import QuizItemEdit from './QuizItemEdit';
import SummaryItemEdit from './SummaryItemEdit';

function ItemEdit() {
  const [params] = useSearchParams();

  if (!params.get('category') || (params.get('category') !== 'quiz' && params.get('category') !== 'summary'))
    return <Navigate to="/management/mycategory" replace />;

  return (
    <ContentWrapper>
      {params.get('category') === 'quiz' && <QuizItemEdit />}
      {params.get('category') === 'summary' && <SummaryItemEdit />}
    </ContentWrapper>
  );
}

export default ItemEdit;
