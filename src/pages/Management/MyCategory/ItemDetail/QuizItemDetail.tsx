import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import LinkButton from '../../../../components/Button/LinkButton';
import Question from '../../../../components/Question';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import { QuestionType } from '../../../../types/question.type';
import CategoryModal from '../../../../components/Modal/CategoryModal';
import QuizCategoryApi from '../../../../api/QuizCategoryApi';
import SaveButton from '../../../../components/Button/SaveButton';

function QuizItemDetail() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [currentCategoaryId, setCurrentCategoaryId] = useState(-1);
  const [currentQuiz, setCurrentQuiz] = useState<QuestionType | null>(null);
  const mainUrl = window.location.origin;

  const getQuizItem = async (id: string) => {
    await QuizCategoryApi.get(id).then((data) => {
      const quizData = data.response;
      setCurrentQuiz({
        problemName: quizData.problemName,
        problemAnswer: quizData.problemAnswer,
        problemCommentary: quizData.problemCommentary,
        problemType: quizData.problemType,
        problemChoices: quizData.problemChoices,
      });
      setCurrentCategoaryId(quizData.categoryId);
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
        {currentQuiz && <Question question={currentQuiz} />}
      </CategoryItemContentWrapper>
      <SideWrapper>
        <SideBar>
          <ButtonWrapper>
            <LinkButton link={`${mainUrl}/management/mycategory/share?category=quiz&id=${params.get('id')}`} />
          </ButtonWrapper>

          <SaveButton disabled={false} onClick={() => setShowCategoryModal(true)} />
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
