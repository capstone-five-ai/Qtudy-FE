import { editQuizToCategory } from '@/apis/quizCategoryApi';
import QuizGenerationForm from '@/components/Form/QuizGenerationForm';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import DefaultSidebar from '@/components/Sidebar/DefaultSidebar';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import TopButtonBar from '@/containers/CategoryDetailPage/TopButtonBar';
import useRedirect from '@/hooks/useRedirect';
import { CategoryQuizItem, QuizType } from '@/types/quiz.type';
import { QUIZ_TYPE } from '@/utils/convertToRequestData';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const initialQuizContent: QuizType = {
  problemName: '',
  problemAnswer: '-1',
  problemCommentary: '',
  problemChoices: [''],
};

function CategoryQuizEditPage() {
  const [params] = useSearchParams();
  const categoryId = Number(params.get('categoryId'));
  const quizId = Number(params.get('id'));
  const [quizContent, setQuizContent] = useState<QuizType>(initialQuizContent);
  const [quizType, setQuizType] = useState('객관식');
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = useRedirect();

  useEffect(() => {
    const { state } = location;

    if (state.quizData) {
      const quiz = state.quizData as CategoryQuizItem;
      setQuizType(
        Object.entries(QUIZ_TYPE).find(
          ([_, value]) => value === quiz.problemType
        )?.[0] ?? '객관식'
      );
      setQuizContent({
        problemName: quiz.problemName,
        problemAnswer: quiz.problemAnswer ?? '',
        problemCommentary: quiz.problemCommentary,
        problemChoices: quiz.problemChoices ?? [],
      });
    } else {
      navigate(
        `/management/category/quiz?categoryId=${categoryId}&id=${quizId}`
      );
    }
  }, []);

  useEffect(() => {
    if (isNaN(categoryId) || isNaN(quizId)) {
      redirect('/management/category');
    }
  }, [categoryId, quizId]);

  const handleCancel = () => {
    navigate(`/management/category/quiz?categoryId=${categoryId}&id=${quizId}`);
  };

  const handleEdit = async () => {
    try {
      await editQuizToCategory(quizId, quizContent);
      handleCancel();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ContentWrapper>
      <StyledContent>
        <TopButtonBar
          isEdit
          handleCancel={handleCancel}
          handleComplete={handleEdit}
          disabledComplete={
            quizContent.problemName === '' ||
            quizContent.problemCommentary === '' ||
            quizContent.problemChoices.includes('') ||
            (quizContent.problemAnswer === '-1' && quizType === '객관식')
          }
          margin="20px"
        />
        <StyledInnerContainer>
          <QuizGenerationForm
            quizType={quizType}
            quizContent={quizContent}
            setQuizContent={setQuizContent}
            showWarning
          />
        </StyledInnerContainer>
      </StyledContent>
      <DefaultSidebar />
    </ContentWrapper>
  );
}

export default CategoryQuizEditPage;

const StyledContent = styled.div`
  flex: 1;
  padding: 24px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInnerContainer = styled.div`
  overflow-y: scroll;
  ${Scrollbar}

  width: 100%;
  padding: 0 20px 4px 40px;
`;
