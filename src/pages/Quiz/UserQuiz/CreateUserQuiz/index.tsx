import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import RightSideBar from './RightSideBar';
import { CREATE_USER_QUIZ_TYPE } from '../../../../constants';
import QuizView from './QuizView';
import { useCreateQuizByUser } from '../../../../hooks/useCreateQuiz';
import loadingSelector from '../../../../recoil/selectors/loading';
import Loader from '../../../../components/Modal/Loader';
import Scrollbar from '../../../../components/Scrollbar';
import QuizCommentary from '../../../../components/Accordion/QuizCommentary';
import getCircleNum from '../../../../utils/getCircleNum';

const DEFAULT_INPUT = { input: '', check: false };

function CreateUserQuiz() {
  const [quizType, setQuizType] = useState(CREATE_USER_QUIZ_TYPE[0]);
  const [question, setQuestion] = useState({ ...DEFAULT_INPUT, id: uuidv4() });
  const [options, setOptions] = useState([{ ...DEFAULT_INPUT, id: uuidv4() }]);
  const [answer, setAnswer] = useState<number | null>(null);
  const [commentary, setCommentary] = useState<string>('');
  const showLoader = useRecoilValue(loadingSelector);
  const setShowLoader = useSetRecoilState(loadingSelector);

  const { mutate, isLoading } = useCreateQuizByUser();

  useEffect(() => {
    setQuestion({ ...DEFAULT_INPUT, id: uuidv4() });
    setOptions([{ ...DEFAULT_INPUT, id: uuidv4() }]);
    setAnswer(-1);
    setCommentary('');
  }, [quizType]);

  const handleSubmit = () => {
    setShowLoader(true);

    try {
      if (quizType === CREATE_USER_QUIZ_TYPE[0]) {
        mutate({
          problemName: question.input,
          problemAnswer: answer.toString(),
          problemCommentary: commentary,
          problemType: quizType.value,
          problemChoices: options.map((option) => option.input),
        });
      } else {
        mutate({
          problemName: question.input,
          problemCommentary: commentary,
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
        <QuizCommentary
          answer={quizType.value === CREATE_USER_QUIZ_TYPE[0].value ? getCircleNum(answer) : null}
          commentary={commentary}
          setCommentary={setCommentary}
        />
      </QuizContainer>
      <RightSideBar
        quizType={quizType}
        disabled={
          quizType.value === CREATE_USER_QUIZ_TYPE[0].value
            ? !(question.check && answer > 0 && options.every((option) => option.check === true))
            : !question.check
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
  ${Scrollbar};

  background: green;
`;
