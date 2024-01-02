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
import Typography from '../../../../components/Typography';
import { CateogorizedOtherQuiz } from '../../../../types/quiz.type';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';

function QuizItemDetail() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [currentCategoaryId, setCurrentCategoaryId] = useState(-1);
  const [currentQuiz, setCurrentQuiz] = useState<QuestionType | null>(null);
  const [otherQuizList, setOtherQuizList] = useState<CateogorizedOtherQuiz[]>([]);
  const mainUrl = window.location.origin;

  const getQuizItem = async (id: string) => {
    await QuizCategoryApi.get(id).then((data) => {
      const quizData = data.response;
      console.log(quizData);
      setOtherQuizList(quizData.categorizedProblems);
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

  const handleDelete = () => {
    QuizCategoryApi.delete(Number(params.get('id'))).then(() => {
      navigate(-1);
    });
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  return (
    <>
      <CategoryItemContentWrapper handleMoveToList={handleMoveToList} handleEdit={handleEdit}>
        {currentQuiz && <Question question={currentQuiz} />}
      </CategoryItemContentWrapper>
      <SideWrapper>
        <SideBar>
          <NavWrapper>
            <Nav>
              <div className="nav-title">
                <Typography variant="caption2" color="mainMintDark72">
                  Pre
                </Typography>
              </div>
              <div className="nav-problem-name no-current">
                <Typography
                  variant="caption3"
                  color="grayScale03"
                >{`Q. ${otherQuizList[0].categorizedProblemName}`}</Typography>
              </div>
            </Nav>
            <Nav>
              <div className="nav-problem-name current">
                <Typography variant="caption2" color="grayScale02">{`Q. ${currentQuiz?.problemName}`}</Typography>
                <DeleteIcon className="icon" onClick={handleDelete} />
              </div>
            </Nav>
            <Nav>
              <div className="nav-title">
                <Typography variant="caption2" color="mainMintDark72">
                  Next
                </Typography>
              </div>
              <div className="nav-problem-name no-current">
                <Typography
                  variant="caption3"
                  color="grayScale03"
                >{`Q. ${otherQuizList[1].categorizedProblemName}`}</Typography>
              </div>
            </Nav>
          </NavWrapper>
          <ButtonWrapper>
            <LinkButton link={`${mainUrl}/management/mycategory/share?category=quiz&id=${params.get('id')}`} />
            <SaveButton disabled={false} onClick={() => setShowCategoryModal(true)} />
          </ButtonWrapper>
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
  width: 360px;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid ${(props) => props.theme.colors.grayScale06};
  margin: 24px 0;
  padding-right: 36px;
  flex: 1;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0px;
`;

const Nav = styled.div`
  .nav-title {
    margin-left: 28px;
  }

  .nav-problem-name {
    padding: 6px 0px;

    border-left: 2px solid;
    border-color: transparent;
  }

  .current {
    padding-left: 26px;
    border-color: ${(props) => props.theme.colors.mainMint};

    display: flex;
    justify-content: space-between;

    & > div {
      width: 248px;
      word-break: break-all;
    }

    .icon {
      cursor: pointer;
    }
  }

  .no-current {
    margin-left: 26px;
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: end;
  margin-left: 36px;
`;
