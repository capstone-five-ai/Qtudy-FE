import QuizCheckForm from '@/components/Form/QuizCheckForm';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import CategorySidebar from '@/containers/CategoryDetailPage/CategorySidebar';
import TopButtonBar from '@/containers/CategoryDetailPage/TopButtonBar';
import authState from '@/recoils/atoms/authState';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function CategoryQuizDetailPage() {
  const isAuthenticated = useRecoilValue(authState);
  /* const [quiz, setQuiz] = useState({
    problemName: '문제 이름',
    problemContent: '문제 내용',
    problemAnswer: 2,
    problemCommentary: '문제 해설',
    problemType: 'MULTIPLE',
    problemChoices: ['선택지1', '선택지2', '선택지3', '선택지4'],
  }); */
  const quiz = {
    problemName: '문제 이름',
    problemContent: '문제 내용',
    problemAnswer: '2',
    problemCommentary: '문제 해설',
    problemType: 'MULTIPLE',
    problemChoices: ['선택지1', '선택지2', '선택지3', '선택지4'],
  };

  return (
    <ContentWrapper>
      <StyledContent $isAuthenticated={isAuthenticated}>
        {isAuthenticated && <TopButtonBar />}
        <StyledInnerContainer>
          <QuizCheckForm
            quiz={{
              problemName: quiz?.problemName,
              problemChoices: quiz?.problemChoices,
              problemAnswer: quiz?.problemAnswer,
              problemCommentary: quiz?.problemCommentary,
            }}
          />
        </StyledInnerContainer>
      </StyledContent>
      <CategorySidebar isAuthenticated={isAuthenticated} />
    </ContentWrapper>
  );
}

export default CategoryQuizDetailPage;

const StyledContent = styled.div<{ $isAuthenticated: boolean }>`
  flex: 1;
  padding: 0 20px 40px 40px;
  padding-top: ${({ $isAuthenticated }) =>
    $isAuthenticated ? '24px' : '40px'};
`;

const StyledInnerContainer = styled.div`
  overflow-y: scroll;
  ${Scrollbar}
`;
