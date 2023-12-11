import { Navigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { QuestionType } from '../../../../types/question.type';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import NoButtonSideBar from '../../../../components/SideBar/NoButtonSideBar';
import Scrollbar from '../../../../components/Scrollbar';
import EditAnswerAccordion from '../../../../components/Accordion/EditAnswerAccordion';
import { CREATE_USER_QUIZ_TYPE } from '../../../../constants';
import QuizView from '../../../Quiz/UserQuiz/CreateUserQuiz/QuizView';

function QuizItemEdit() {
  const [params] = useSearchParams();

  const questionData: QuestionType = {
    problemName: '인공지능은 무엇을 모방할 수 있는 기술 및 연구 분야인가요?',
    problemAnswer: '2',
    problemCommentary:
      '인공지능의 목표는 인간의 인지 능력을 모방할 수 있는 지능적인 기계를 만드는 것입니다. 즉, 사람처럼 생각하고 학습하며 문제를 해결할 수 있는 기계를 개발하는 것이 목표입니다.',
    problemType: 'MULTIPLE',
    problemChoices: ['선지111', '선지222', '선지333', '선지444'],
  };

  const answerNum = parseInt(questionData.problemAnswer || '', 10);

  const [question, setQuestion] = useState({ id: uuidv4(), input: questionData.problemName, check: true });
  const [options, setOptions] = useState(
    questionData.problemChoices.map((item) => {
      return { id: uuidv4(), input: item, check: true };
    })
  );
  const [answer, setAnswer] = useState(!Number.isNaN(answerNum) ? answerNum : -1);
  const [commentary, setCommentary] = useState({ id: uuidv4(), input: questionData.problemCommentary, check: true });

  const handleFinishEdit = () => {
    // TODO: 문제 수정 API 연결
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  return (
    <>
      <CategoryItemContentWrapper isEdit handleFinishEdit={handleFinishEdit}>
        <QuizContainer>
          <QuizView
            quizType={questionData.problemType}
            question={question}
            options={options}
            answer={answer}
            setQuestion={setQuestion}
            setOptions={setOptions}
            setAnswer={setAnswer}
          />
          <EditAnswerAccordion
            answer={questionData.problemType === CREATE_USER_QUIZ_TYPE[0].value ? answer.toString() : null}
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
