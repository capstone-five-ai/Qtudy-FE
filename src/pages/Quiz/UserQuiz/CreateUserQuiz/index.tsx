import { useState } from 'react';
import styled from 'styled-components';
import RightSideBar from './RightSideBar';
import MultipleQuiz from './MultipleQuiz';
import { CREATE_USER_QUIZ_TYPE } from '../../../../constants';
import SubjectiveQuiz from './SubjectiveQuiz';
import Scrollbar from '../../../../components/Scrollbar';

const DEFAULT_INPUT = { input: '', check: false };
const DEFAULT_INPUT_COMMENTARY = {
  input: '',
  check: true,
};

function CreateUserQuiz() {
  const [quizType, setQuizType] = useState<{ [key: string]: string }>({ type: CREATE_USER_QUIZ_TYPE[0] });
  const [question, setQuestion] = useState({ input: '', check: false });
  const [options, setOptions] = useState([DEFAULT_INPUT, DEFAULT_INPUT, DEFAULT_INPUT, DEFAULT_INPUT]);
  const [answer, setAnswer] = useState(-1);
  const [commentary, setCommentary] = useState(DEFAULT_INPUT_COMMENTARY);

  const handleEdit = (type: string, index: number) => {
    if (type === 'question') {
      setQuestion({ ...question, check: false });
    } else if (type === 'option') {
      const updatedOption = [...options];
      updatedOption[index] = { ...updatedOption[index], check: false };
      setOptions(updatedOption);
    } else if (type === 'commentary') {
      setCommentary({ ...commentary, check: false });
    }
  };

  const handleCheck = (type: string, index: number, input: string) => {
    if (type === 'question') {
      setQuestion({ input, check: true });
    } else if (type === 'option') {
      const updatedOption = [...options];
      updatedOption[index] = { input, check: true };
      setOptions(updatedOption);
    } else if (type === 'commentary') {
      setCommentary({ input, check: true });
    }
  };

  const handleDelete = (indexToDelete: number) => {
    setOptions((prevOptions) => {
      return prevOptions.filter((_, index) => index !== indexToDelete);
    });

    if (indexToDelete === answer - 1) setAnswer(-1);
  };

  const handleAddOption = () => {
    setOptions([...options, DEFAULT_INPUT]);
  };

  const handleSubmit = () => {
    // TODO: API 연결
  };

  return (
    <>
      <QuizContainer>
        {quizType.type === CREATE_USER_QUIZ_TYPE[0] && (
          <MultipleQuiz
            question={question}
            options={options}
            answer={answer}
            commentary={commentary}
            handleEdit={handleEdit}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handleAddOption={handleAddOption}
            handleSetAnswer={setAnswer}
          />
        )}
        {quizType.type === CREATE_USER_QUIZ_TYPE[1] && (
          <SubjectiveQuiz
            question={question}
            answer={answer}
            commentary={commentary}
            handleEdit={handleEdit}
            handleCheck={handleCheck}
          />
        )}
      </QuizContainer>
      <RightSideBar
        quizType={quizType}
        disabled={
          quizType.type === CREATE_USER_QUIZ_TYPE[0]
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
  margin: 20px;
  margin-right: 0px;
  padding: 20px;

  overflow-y: scroll;
  ${Scrollbar}
`;
