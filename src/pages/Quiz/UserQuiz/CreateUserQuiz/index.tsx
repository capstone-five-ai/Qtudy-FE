import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import RightSideBar from './RightSideBar';
import { CREATE_USER_QUIZ_TYPE } from '../../../../constants';
import Scrollbar from '../../../../components/Scrollbar';
import EditAnswerAccordion from '../../../../components/Accordion/EditAnswerAccordion';
import QuizView from './QuizView';
import { useCreateQuizByUser } from '../../../../hooks/useCreateQuiz';
import loadingSelector from '../../../../recoil/selectors/loading';
import Loader from '../../../../components/Modal/Loader';

const DEFAULT_INPUT = { input: '', check: false };
const DEFAULT_INPUT_COMMENTARY = { input: '', check: true };

function CreateUserQuiz() {
  const [quizType, setQuizType] = useState(CREATE_USER_QUIZ_TYPE[0]);
  const [question, setQuestion] = useState({ ...DEFAULT_INPUT, id: uuidv4() });
  const [options, setOptions] = useState([{ ...DEFAULT_INPUT, id: uuidv4() }]);
  const [answer, setAnswer] = useState(-1);
  const [commentary, setCommentary] = useState({ ...DEFAULT_INPUT_COMMENTARY, id: uuidv4() });
  const showLoader = useRecoilValue(loadingSelector);
  const setShowLoader = useSetRecoilState(loadingSelector);

  const { mutate, isLoading } = useCreateQuizByUser();

  const handleSubmit = () => {
    setShowLoader(true);

    try {
      if (quizType === CREATE_USER_QUIZ_TYPE[0]) {
        mutate({
          problemName: question.input,
          problemAnswer: answer.toString(),
          problemCommentary: commentary.input,
          problemType: quizType.value,
          problemChoices: options.map((option) => option.input),
        });
      } else {
        mutate({
          problemName: question.input,
          problemCommentary: commentary.input,
          problemType: quizType.value,
        });
      }
    } catch {
      setShowLoader(false);
    }
  };

  return (
    <>
      {showLoader && <Loader isLoading={isLoading} />}
      <QuizContainer>
        <QuizView
          quizType={quizType.value}
          question={question}
          options={options}
          answer={answer}
          setQuestion={setQuestion}
          setOptions={setOptions}
          setAnswer={setAnswer}
        />
        <EditAnswerAccordion
          answer={quizType.value === CREATE_USER_QUIZ_TYPE[0].value ? answer.toString() : null}
          commentary={commentary}
          setCommentary={setCommentary}
        />
      </QuizContainer>
      <RightSideBar
        quizType={quizType}
        disabled={
          quizType.value === CREATE_USER_QUIZ_TYPE[0].value
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
`;
