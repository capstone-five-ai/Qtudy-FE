import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import GenerateSection from '@/containers/SummaryUserPage/GenerateSection';
import ResultSection from '@/containers/SummaryUserPage/ResultSection';
import { useSearchParams } from 'react-router-dom';

function SummaryUserPage() {
  const [searchParams] = useSearchParams();
  const complete = searchParams.get('complete');

  return (
    <ContentWrapper>
      {complete === 'true' ? <ResultSection /> : <GenerateSection />}
    </ContentWrapper>
  );
}

export default SummaryUserPage;
