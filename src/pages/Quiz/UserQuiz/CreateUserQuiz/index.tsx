import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import RightSideBar from './RightSideBar';
import { CREATE_USER_QUIZ_TYPE } from '../../../../constants';
import { useCreateQuizByUser } from '../../../../hooks/useCreateQuiz';
import loadingSelector from '../../../../recoil/selectors/loading';
import Loader from '../../../../components/Modal/Loader';
import Scrollbar from '../../../../components/Scrollbar';
import QuizCommentary from './QuizCommentary';
import getCircleNum from '../../../../utils/getCircleNum';
import QuizForm from './QuizForm';

function CreateUserQuiz() {
  const [quizType, setQuizType] = useState(CREATE_USER_QUIZ_TYPE[0]);
  const [question, setQuestion] = useState<string>('');
  const [choices, setChoices] = useState([{ id: uuidv4(), content: '' }]);
  const [answer, setAnswer] = useState<number>(-1);
  const [commentary, setCommentary] = useState<string>('');
  const showLoader = useRecoilValue(loadingSelector);
  const setShowLoader = useSetRecoilState(loadingSelector);

  const { mutate, isLoading } = useCreateQuizByUser();

  useEffect(() => {
    setQuestion('');
    setChoices([{ id: uuidv4(), content: '' }]);
    setAnswer(-1);
    setCommentary('');
  }, [quizType]);

  const handleSubmit = () => {
    setShowLoader(true);

    try {
      if (quizType === CREATE_USER_QUIZ_TYPE[0]) {
        mutate({
          problemName: question,
          problemAnswer: answer ? answer.toString() : '',
          problemCommentary: commentary,
          problemType: quizType.value,
          problemChoices: choices.map((choice) => choice.content),
        });
      } else {
        mutate({
          problemName: question,
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
      <StyledQuizContainer>
        <QuizForm
          quizType={quizType.value}
          question={question}
          choices={choices}
          answer={answer}
          setQuestion={setQuestion}
          setChoices={setChoices}
          setAnswer={setAnswer}
        />
        <QuizCommentary
          answer={quizType.value === CREATE_USER_QUIZ_TYPE[0].value ? getCircleNum(answer) : null}
          commentary={commentary}
          setCommentary={setCommentary}
        />
      </StyledQuizContainer>
      <RightSideBar
        quizType={quizType}
        disabled={quizType.value === CREATE_USER_QUIZ_TYPE[0].value ? !answer : false}
        setQuizType={setQuizType}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default CreateUserQuiz;

const StyledQuizContainer = styled.div`
  flex-grow: 1;
  margin: 40px 0px 40px 20px;
  padding: 0px 20px;

  display: flex;
  flex-direction: column;
  gap: 48px;

  overflow-y: scroll;
  ${Scrollbar};
`;
