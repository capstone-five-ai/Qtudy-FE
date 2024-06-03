import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import GenerateSection from '@/containers/QuizAIPage/GenerateSection';
import ResultSection from '@/containers/QuizAIPage/ResultSection';
import { useSearchParams } from 'react-router-dom';

function QuizAIPage() {
  const [searchParams] = useSearchParams();
  const complete = searchParams.get('complete');

  return (
    <ContentWrapper>
      {complete === 'true' ? <ResultSection /> : <GenerateSection />}
    </ContentWrapper>
  );
}

export default QuizAIPage;
