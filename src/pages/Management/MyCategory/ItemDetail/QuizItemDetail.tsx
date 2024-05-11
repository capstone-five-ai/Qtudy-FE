import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Question from '../../../../components/Question';
import { QuestionType } from '../../../../types/question.type';
import CategoryModal from '../../../../components/Modal/CategoryModal';
import QuizCategoryApi from '../../../../api/QuizCategoryApi';
import CategoryItemButtonBar from '../../../../components/ButtonBar/CategoryItemButtonBar';
import Scrollbar from '../../../../components/Scrollbar';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';
import { CategoryOtherQuiz } from '../../../../types/quiz.type';
import LinkButton from '../../../../components/Button/LinkButton';
import SaveButton from '../../../../components/Button/SaveButton';

function QuizItemDetail() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [currentCategoryId, setCurrentCategoryId] = useState(-1);
  const [prevQuiz, setPrevQuiz] = useState<CategoryOtherQuiz | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<QuestionType | null>(null);
  const [nextQuiz, setNextQuiz] = useState<CategoryOtherQuiz | null>(null);
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
      setCurrentCategoryId(quizData.categoryId);
      setPrevQuiz(quizData.previousProblem);
      setNextQuiz(quizData.nextProblem);
    });
  };

  useEffect(() => {
    const id = params.get('id');
    if (id) getQuizItem(id);
  }, [params]);

  const handleReturnToList = () => {
    navigate(`/management/mycategory?type=quiz&categoryId=${currentCategoryId}`);
  };

  const handleEdit = () => {
    navigate(`/management/mycategory/edit?category=quiz&id=${params.get('id')}`, { state: { quizData: currentQuiz } });
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  return (
    <>
      <StyledContainer>
        <CategoryItemButtonBar handleReturnToList={handleReturnToList} handleEdit={handleEdit} />
        <StyledQuizContainer>{currentQuiz && <Question question={currentQuiz} />}</StyledQuizContainer>
      </StyledContainer>
      <Sidebar>
        <div className="content">
          {prevQuiz && (
            <Navigation>
              <span className="label">Pre</span>
              <button
                type="button"
                onClick={() =>
                  navigate(`/management/mycategory/detail?category=quiz&id=${prevQuiz.categorizedProblemId}`)
                }
              >
                {prevQuiz.categorizedProblemName}
              </button>
            </Navigation>
          )}
          {currentQuiz && (
            <CurrentNavigation>
              <button type="button">{currentQuiz.problemName}</button>
              <DeleteIcon className="delete-button" onClick={() => QuizCategoryApi.delete(currentCategoryId)} />
            </CurrentNavigation>
          )}
          {nextQuiz && (
            <Navigation>
              <span className="label">Next</span>
              <button
                type="button"
                onClick={() =>
                  navigate(`/management/mycategory/detail?category=quiz&id=${nextQuiz.categorizedProblemId}`)
                }
              >
                {nextQuiz.categorizedProblemName}
              </button>
            </Navigation>
          )}
        </div>
        <ButtonWrapper>
          <LinkButton link={`${mainUrl}/management/mycategory/share?category=quiz&id=${params.get('id')}`} />
        </ButtonWrapper>
        <SaveButton disabled={false} onClick={() => setShowCategoryModal(true)} />
      </Sidebar>
      {showCategoryModal && (
        <CategoryModal
          onClose={() => setShowCategoryModal(false)}
          categoryType="quiz"
          contentId={Number(params.get('id') || -1)}
          generateType={currentQuiz?.aiGeneratedProblemId ? 'ai' : 'user'}
        />
      )}
    </>
  );
}

export default QuizItemDetail;

const StyledContainer = styled.div`
  flex-grow: 1;
  padding: 24px 0px 20px 40px;

  display: flex;
  flex-direction: column;
`;

const StyledQuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  padding-right: 20px;
  overflow-y: scroll;

  ${Scrollbar}
`;

const Sidebar = styled.div`
  width: 360px;
  margin: 24px 0;
  border-left: 1px solid ${(props) => props.theme.colors.grayScale06};

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 36px;

  .content {
    position: absolute;
    top: 0;
    left: -1px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
    margin-top: 16px;
  }
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  padding-left: 24px;
  padding-right: 36px;
  border-left: 2px solid transparent;

  min-height: 38px;

  .label {
    ${({ theme }) => theme.typography.caption2};
    color: rgba(54, 189, 180, 0.72);
  }

  button {
    width: 248px;

    cursor: pointer;
    text-align: left;
    ${({ theme }) => theme.typography.caption3};
    color: ${({ theme }) => theme.colors.grayScale03};

    word-break: break-all;
  }
`;

const CurrentNavigation = styled(Navigation)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-left-color: ${(props) => props.theme.colors.mainMint};

  button {
    width: 248px;
    cursor: pointer;
    text-align: left;
    ${({ theme }) => theme.typography.caption2};
    color: ${({ theme }) => theme.colors.grayScale02};
  }

  .delete-button {
    cursor: pointer;
  }
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
