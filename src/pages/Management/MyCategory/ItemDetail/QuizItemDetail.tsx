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
import DeleteModal from '../../../../components/Modal/DeleteModal';

function QuizItemDetail() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCategoaryId, setCurrentCategoaryId] = useState(-1);
  const [currentQuiz, setCurrentQuiz] = useState<QuestionType | null>(null);
  const [otherQuizList, setOtherQuizList] = useState<{
    pre: CateogorizedOtherQuiz | null;
    next: CateogorizedOtherQuiz | null;
  }>({ pre: null, next: null });
  const mainUrl = window.location.origin;

  const getQuizItem = async (id: string) => {
    await QuizCategoryApi.get(id).then((data) => {
      const quizData = data.response;
      setOtherQuizList({ pre: quizData.categorizedProblems[0], next: quizData.categorizedProblems[1] });
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
      {showDeleteModal && (
        <DeleteModal
          onCancel={() => {
            setShowDeleteModal(false);
          }}
          onConfirm={() => {
            handleDelete();
          }}
          title="퀴즈를 삭제하시겠습니까?"
        />
      )}
      <CategoryItemContentWrapper handleMoveToList={handleMoveToList} handleEdit={handleEdit}>
        {currentQuiz && <Question question={currentQuiz} />}
      </CategoryItemContentWrapper>
      <SideWrapper>
        <SideBar>
          <NavWrapper>
            {otherQuizList.pre && (
              <Nav>
                <div className="nav-title">
                  <Typography variant="caption2" color="mainMintDark72">
                    Pre
                  </Typography>
                </div>
                <button
                  type="button"
                  className="nav-problem-name no-current"
                  onClick={() => {
                    navigate(
                      `/management/mycategory/detail?category=quiz&id=${otherQuizList.pre?.categorizedProblemId}`
                    );
                  }}
                >
                  <Typography
                    variant="caption3"
                    color="grayScale03"
                  >{`Q. ${otherQuizList.pre.categorizedProblemName}`}</Typography>
                </button>
              </Nav>
            )}
            {(otherQuizList.pre || otherQuizList.next) && (
              <Nav>
                <div className="nav-problem-name current">
                  <Typography variant="caption2" color="grayScale02">{`Q. ${currentQuiz?.problemName}`}</Typography>
                  <DeleteIcon
                    className="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteModal(true);
                    }}
                  />
                </div>
              </Nav>
            )}
            {otherQuizList.next && (
              <Nav>
                <div className="nav-title">
                  <Typography variant="caption2" color="mainMintDark72">
                    Next
                  </Typography>
                </div>
                <button
                  type="button"
                  className="nav-problem-name no-current"
                  onClick={() => {
                    navigate(
                      `/management/mycategory/detail?category=quiz&id=${otherQuizList.next?.categorizedProblemId}`
                    );
                  }}
                >
                  <Typography
                    variant="caption3"
                    color="grayScale03"
                  >{`Q. ${otherQuizList.next.categorizedProblemName}`}</Typography>
                </button>
              </Nav>
            )}
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
    align-items: center;

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
