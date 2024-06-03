import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import GenerateSection from '@/containers/SummaryAIPage/GenerateSection';
import ResultSection from '@/containers/SummaryAIPage/ResultSection';
import { useSearchParams } from 'react-router-dom';

function SummaryAIPage() {
  const [searchParams] = useSearchParams();
  const complete = searchParams.get('complete');

  return (
    <ContentWrapper>
      {complete === 'true' ? <ResultSection /> : <GenerateSection />}
    </ContentWrapper>
  );
}

export default SummaryAIPage;
