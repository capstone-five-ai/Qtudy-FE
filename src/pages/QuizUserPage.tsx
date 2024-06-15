import SuspenseLoading from '@/components/Loader/SuspenseLoading';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import { Suspense, lazy } from 'react';
import { useSearchParams } from 'react-router-dom';

const ResultSection = lazy(
  () => import('@/containers/QuizUserPage/ResultSection')
);
const GenerateSection = lazy(
  () => import('@/containers/QuizUserPage/GenerateSection')
);

const QuizUserPage = () => {
  const [searchParams] = useSearchParams();
  const complete = searchParams.get('complete');

  return (
    <ContentWrapper>
      <Suspense fallback={<SuspenseLoading />}>
        {complete === 'true' ? <ResultSection /> : <GenerateSection />}
      </Suspense>
    </ContentWrapper>
  );
};

export default QuizUserPage;
