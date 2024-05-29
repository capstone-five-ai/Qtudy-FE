import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import GenerateSection from '@/containers/QuizUserPage/GenerateSection';
import { useSearchParams } from 'react-router-dom';

// complete 여부에 따라 완료 페이지 vs 생성 페이지
const QuizUserPage = () => {
  const [searchParams] = useSearchParams();
  const complete = searchParams.get('complete');

  // TODO: 이외의 모든 path는 생성 페이지 렌더링
  // TODO: complete가 true일 경우 완료 페이지 렌더링
  return (
    <ContentWrapper>
      {complete === 'true' ? null : <GenerateSection />}
    </ContentWrapper>
  );
};

export default QuizUserPage;
