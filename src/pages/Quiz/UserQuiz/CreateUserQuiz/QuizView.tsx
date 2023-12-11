import styled from 'styled-components';
import { CREATE_USER_QUIZ_TYPE } from '../../../../constants';
import { UserQuizInputType } from '../../../../types';
import QuestionField from './QuestionField';
import OptionField from './OptionField';
import AddOptionButton from '../../../../components/Button/AddOptionButton';

interface QuizViewProps {
  quizType: string;
  question: UserQuizInputType;
  options: UserQuizInputType[];
  answer: number;
  setQuestion: React.Dispatch<React.SetStateAction<UserQuizInputType>>;
  setOptions: React.Dispatch<React.SetStateAction<UserQuizInputType[]>>;
  setAnswer: React.Dispatch<React.SetStateAction<number>>;
}

const DEFAULT_INPUT = { input: '', check: false };
const MAX_OPTION_COUNT = 10;

function QuizView({ quizType, question, options, answer, setQuestion, setOptions, setAnswer }: QuizViewProps) {
  const handleAddOption = () => {
    setOptions([...options, DEFAULT_INPUT]);
  };

  return (
    <div>
      {quizType === CREATE_USER_QUIZ_TYPE[0].value ? (
        <QuizInputFieldContainer>
          <QuestionField question={question} setQuestion={setQuestion} />
          <OptionField options={options} answer={answer} setOptions={setOptions} setAnswer={setAnswer} />
          <AddOptionButton handleClick={handleAddOption} disabled={options.length >= MAX_OPTION_COUNT} />
        </QuizInputFieldContainer>
      ) : (
        <QuestionField question={question} setQuestion={setQuestion} />
      )}
    </div>
  );
}

export default QuizView;

const QuizInputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
