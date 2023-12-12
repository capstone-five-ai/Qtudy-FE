import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import LinkButton from '../../../../components/Button/LinkButton';
import TwinkleButton from '../../../../components/Button/TwinkleButton';
import Question from '../../../../components/Question';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import { QuestionType } from '../../../../types/question.type';
import CategoryModal from '../../../../components/Modal/CategoryModal';
import QuizCategoryApi from '../../../../api/QuizCategoryApi';

function QuizItemDetail() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [currentCategoaryId, setCurrentCategoaryId] = useState(-1);
  const [currentQuiz, setCurrentQuiz] = useState<QuestionType | null>(null);
  const [questionNum, setQuestionNum] = useState(1);

  const getQuizItem = async (id: string) => {
    await QuizCategoryApi.get(id).then((data) => {
      setCurrentQuiz({
        problemName: data.problemName,
        problemAnswer: data.probelAnswer,
        problemCommentary: data.problemCommentary,
        problemType: data.problemType,
        problemChoices: data.problemChoices,
      });
      setQuestionNum(parseInt(data.problemAnswer || '1', 10));
      setCurrentCategoaryId(data.categoryId);
    });
  };

  useEffect(() => {
    const id = params.get('id');
    if (id) getQuizItem(id);
  }, [params]);

  const handleMoveToList = () => {
    navigate('/management/mycategory', { state: { activeTab: '퀴즈', categoryId: currentCategoaryId } });
  };

  const handleEdit = () => {
    navigate(`/management/mycategory/edit?category=quiz&id=${params.get('id')}`, { state: { quizData: currentQuiz } });
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  return (
    <>
      <CategoryItemContentWrapper handleMoveToList={handleMoveToList} handleEdit={handleEdit}>
        {currentQuiz && <Question question={currentQuiz} questionNum={questionNum} />}
      </CategoryItemContentWrapper>
      <SideWrapper>
        <SideBar>
          <ButtonWrapper>
            <LinkButton link={`management/mycategory/share?category=quiz&id=${params.get('id')}`} />
          </ButtonWrapper>

          <TwinkleButton disabled={false} onClick={() => setShowCategoryModal(true)}>
            Save to Category
          </TwinkleButton>
        </SideBar>
      </SideWrapper>
      {showCategoryModal && (
        <CategoryModal
          onClose={() => setShowCategoryModal(false)}
          categoryType="PROBLEM"
          contentId={Number(params.get('id') || -1)}
          generateType={currentQuiz?.aiGeneratedProblemId ? 'ai' : 'user'}
        />
      )}
    </>
  );
}

export default QuizItemDetail;

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid ${(props) => props.theme.colors.grayScale06};
  margin: 24px 0;
  padding: 0 36px;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  gap: 16px;
  justify-content: end;
  align-items: end;

  height: 100%;
`;
