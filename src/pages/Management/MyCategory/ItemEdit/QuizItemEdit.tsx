import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { QuestionType } from '../../../../types/question.type';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import NoButtonSideBar from '../../../../components/SideBar/NoButtonSideBar';
import Scrollbar from '../../../../components/Scrollbar';
import EditAnswerAccordion from '../../../../components/Accordion/EditAnswerAccordion';
import { CREATE_USER_QUIZ_TYPE } from '../../../../constants';
import QuizView from '../../../Quiz/UserQuiz/CreateUserQuiz/QuizView';
import { UserQuizInputType } from '../../../../types';

function QuizItemEdit() {
  const [params] = useSearchParams();
  const location = useLocation();
  const [type, setType] = useState('MULTIPLE');
  const [question, setQuestion] = useState({ id: uuidv4(), input: '', check: true });
  const [answer, setAnswer] = useState(-1);
  const [commentary, setCommentary] = useState({ id: uuidv4(), input: '', check: true });
  const [options, setOptions] = useState<UserQuizInputType[]>([]);

  useEffect(() => {
    const { state } = location;
    if (state.quizData) {
      const quiz = state.quizData as QuestionType;
      const quizAnswer = Number(quiz.problemAnswer);
      setType(quiz.problemType);
      setQuestion({ ...question, input: quiz.problemName });
      setAnswer(!Number.isNaN(quizAnswer) ? quizAnswer : -1);
      setCommentary({ ...commentary, input: quiz.problemCommentary });

      const choices = quiz.problemChoices.map((choice) => {
        return { id: uuidv4(), input: choice, check: true };
      });
      setOptions(choices);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFinishEdit = () => {
    // TODO: 문제 수정 API 연결
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  return (
    <>
      <CategoryItemContentWrapper isEdit handleFinishEdit={handleFinishEdit}>
        <QuizContainer>
          <QuizView
            quizType={type}
            question={question}
            options={options}
            answer={answer}
            setQuestion={setQuestion}
            setOptions={setOptions}
            setAnswer={setAnswer}
          />
          <EditAnswerAccordion
            answer={type === CREATE_USER_QUIZ_TYPE[0].value ? answer.toString() : null}
            commentary={commentary}
            setCommentary={setCommentary}
          />
        </QuizContainer>
      </CategoryItemContentWrapper>
      <NoButtonSideBar />
    </>
  );
}

export default QuizItemEdit;

const QuizContainer = styled.div`
  flex-grow: 1;
  margin: 40px 0px 40px 20px;
  padding: 0px 20px;

  display: flex;
  flex-direction: column;
  gap: 48px;

  overflow-y: scroll;
  ${Scrollbar}
`;
