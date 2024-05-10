import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { CREATE_USER_QUIZ_TYPE } from '../../../../constants';
import { UserQuizInputType } from '../../../../types';
import AddOptionButton from '../../../../components/Button/AddOptionButton';
import QuizInputField from '../../../../components/Input/QuizInputField';
import Typography from '../../../../components/Typography';
import RadioButton from '../../../../components/Button/RadioButton/RadioButton';

interface QuizFormProps {
  quizType: string;
  question: string;
  choices: UserQuizInputType[];
  answer: number;
  setQuestion: (newQuestion: string) => void;
  setChoices: (newChoices: UserQuizInputType[]) => void;
  setAnswer: (newAnswer: number) => void;
}

const MAX_OPTION_COUNT = 10;

function QuizForm({ quizType, question, choices, answer, setQuestion, setChoices, setAnswer }: QuizFormProps) {
  const handleAddOption = () => {
    setChoices([...choices, { id: uuidv4(), content: '' }]);
  };

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleChangeChoice = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedChoices = [...choices];
    updatedChoices[index].content = e.target.value;
    setChoices(updatedChoices);
  };

  const handleDelete = (index: number) => {
    const updatedChoices = [...choices];
    updatedChoices.splice(index, 1);
    setChoices(updatedChoices);
  };

  return (
    <StyledContainer>
      <QuizInputField type="question" value={question} index={0} handleChange={handleChangeQuestion} />
      {quizType === CREATE_USER_QUIZ_TYPE[0].value && (
        <>
          <Typography variant="caption1" color="grayScale02">
            정답
          </Typography>
          {choices.map((choice, index) => (
            <StyledQuizForm key={choice.id}>
              <label htmlFor={`choice-${index}`}>
                <RadioButton
                  id={`choice-${index}`}
                  value={index}
                  name="option"
                  checked={index === answer - 1}
                  onChange={() => setAnswer(index + 1)}
                />
                <span style={{ display: 'none' }}>{index}</span>
              </label>
              <QuizInputField
                type="choice"
                value={choice.content}
                index={index}
                handleChange={handleChangeChoice}
                handleDelete={handleDelete}
              />
            </StyledQuizForm>
          ))}
          <AddOptionButton handleClick={handleAddOption} disabled={choices.length >= MAX_OPTION_COUNT} />
        </>
      )}
    </StyledContainer>
  );
}

export default QuizForm;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledQuizForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  width: 724px;

  label {
    cursor: pointer;
  }
`;
