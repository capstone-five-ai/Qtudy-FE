import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Question from '../../components/Question';
import LinkButton from '../../components/Button/LinkButton';
import { QuestionType } from '../../types/question.type';
import QuizCategoryApi from '../../api/QuizCategoryApi';
import SaveButton from '../../components/Button/SaveButton';
import Typography from '../../components/Typography';
import { CateogorizedOtherQuiz } from '../../types/quiz.type';

function ShareQuiz({ currentId }: { currentId: string | null }) {
  const link = window.location.href;
  const [currentQuiz, setCurrentQuiz] = useState<QuestionType | null>(null);
  const [otherQuizList, setOtherQuizList] = useState<CateogorizedOtherQuiz[]>([]);

  const getQuizItem = async (id: string) => {
    await QuizCategoryApi.get(id).then((data) => {
      const quizData = data.response;
      setOtherQuizList(quizData.categorizedProblems);
      setCurrentQuiz({
        problemName: quizData.problemName,
        problemAnswer: quizData.problemAnswer,
        problemCommentary: quizData.problemCommentary,
        problemType: quizData.problemType,
        problemChoices: quizData.problemChoices,
      });
    });
  };

  useEffect(() => {
    if (currentId) getQuizItem(currentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <QuestionContainer>{currentQuiz && <Question question={currentQuiz} />}</QuestionContainer>
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
                {otherQuizList[0] && (
                  <Typography
                    variant="caption3"
                    color="grayScale03"
                  >{`Q. ${otherQuizList[0].categorizedProblemName}`}</Typography>
                )}
              </div>
            </Nav>
            <Nav>
              <div className="nav-problem-name current">
                <Typography variant="caption2" color="grayScale02">{`Q. ${currentQuiz?.problemName}`}</Typography>
              </div>
            </Nav>
            <Nav>
              <div className="nav-title">
                <Typography variant="caption2" color="mainMintDark72">
                  Next
                </Typography>
              </div>
              <div className="nav-problem-name no-current">
                {otherQuizList[1] && (
                  <Typography
                    variant="caption3"
                    color="grayScale03"
                  >{`Q. ${otherQuizList[1].categorizedProblemName}`}</Typography>
                )}
              </div>
            </Nav>
          </NavWrapper>
          <ButtonWrapper>
            <LinkButton link={link} />
            <SaveButton disabled />
          </ButtonWrapper>
        </SideBar>
      </SideWrapper>
    </>
  );
}

export default ShareQuiz;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 40px;
`;

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
  //padding-bottom: 30px;
  //gap: 16px;
  //justify-content: end;
  //align-items: end;

  //height: 100%;
`;
