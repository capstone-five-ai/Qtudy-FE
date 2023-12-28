import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Question from '../../components/Question';
import LinkButton from '../../components/Button/LinkButton';
import { QuestionType } from '../../types/question.type';
import QuizCategoryApi from '../../api/QuizCategoryApi';
import SaveButton from '../../components/Button/SaveButton';

function ShareQuiz({ currentId }: { currentId: string | null }) {
  const link = window.location.href;
  const [currentQuiz, setCurrentQuiz] = useState<QuestionType | null>(null);

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
          <ButtonWrapper>
            <LinkButton link={link} />
          </ButtonWrapper>

          <SaveButton disabled />
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
