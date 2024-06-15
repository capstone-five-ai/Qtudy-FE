import SuspenseLoading from '@/components/Loader/SuspenseLoading';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import { lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';

// 동적으로 로드할 컴포넌트
const ResultSection = lazy(
  () => import('@/containers/QuizAIPage/ResultSection')
);
const GenerateSection = lazy(
  () => import('@/containers/QuizAIPage/GenerateSection')
);

function QuizAIPage() {
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

export default QuizAIPage;
