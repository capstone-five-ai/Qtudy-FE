import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import GenerateSection from '@/containers/QuizUserPage/GenerateSection';
import ResultSection from '@/containers/QuizUserPage/ResultSection';
import { useSearchParams } from 'react-router-dom';

const QuizUserPage = () => {
  const [searchParams] = useSearchParams();
  const complete = searchParams.get('complete');

  return (
    <ContentWrapper>
      {complete === 'true' ? <ResultSection /> : <GenerateSection />}
    </ContentWrapper>
  );
};

export default QuizUserPage;
