import { useState } from 'react';
import styled from 'styled-components';
import RightSideBar from './RightSideBar';
import { CREATE_USER_QUIZ_TYPE } from '../../../../constants';
import Scrollbar from '../../../../components/Scrollbar';
import EditAnswerAccordion from '../../../../components/Accordion/EditAnswerAccordion';
import QuizView from './QuizView';

const DEFAULT_INPUT = { input: '', check: false };
const DEFAULT_INPUT_COMMENTARY = {
  input: '',
  check: true,
};

function CreateUserQuiz() {
  const [quizType, setQuizType] = useState(CREATE_USER_QUIZ_TYPE[0]);
  const [question, setQuestion] = useState({ input: '', check: false });
  const [options, setOptions] = useState([DEFAULT_INPUT, DEFAULT_INPUT, DEFAULT_INPUT, DEFAULT_INPUT]);
  const [answer, setAnswer] = useState(-1);
  const [commentary, setCommentary] = useState(DEFAULT_INPUT_COMMENTARY);

  const handleSubmit = () => {
    // TODO: API 연결
  };

  return (
    <>
      <QuizContainer>
        <QuizView
          quizType={quizType.label}
          question={question}
          options={options}
          answer={answer}
          setQuestion={setQuestion}
          setOptions={setOptions}
          setAnswer={setAnswer}
        />
        <EditAnswerAccordion
          answer={quizType.label === CREATE_USER_QUIZ_TYPE[0].label ? answer.toString() : null}
          commentary={commentary}
          setCommentary={setCommentary}
        />
      </QuizContainer>
      <RightSideBar
        quizType={quizType}
        disabled={
          quizType.label === CREATE_USER_QUIZ_TYPE[0].label
            ? !(question.check && answer > 0 && commentary.check && options.every((option) => option.check === true))
            : !(question.check && commentary.check)
        }
        setQuizType={setQuizType}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default CreateUserQuiz;

const QuizContainer = styled.div`
  flex-grow: 1;
  margin: 40px 0px 40px 20px;
  padding: 0px 20px;

  display: flex;
  flex-direction: column;
  gap: 48px;

  overflow-y: scroll;
  ${Scrollbar}

  background: red;
`;
