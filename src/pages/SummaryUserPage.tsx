import SuspenseLoading from '@/components/Loader/SuspenseLoading';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import { lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';

const ResultSection = lazy(
  () => import('@/containers/SummaryUserPage/ResultSection')
);
const GenerateSection = lazy(
  () => import('@/containers/SummaryUserPage/GenerateSection')
);

function SummaryUserPage() {
  const [searchParams] = useSearchParams();
  const complete = searchParams.get('complete');

  return (
    <ContentWrapper>
      <Suspense fallback={<SuspenseLoading />}>
        {complete === 'true' ? <ResultSection /> : <GenerateSection />}
      </Suspense>
    </ContentWrapper>
  );
}

export default SummaryUserPage;
