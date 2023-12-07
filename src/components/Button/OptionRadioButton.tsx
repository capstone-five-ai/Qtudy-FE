import styled from 'styled-components';
import QuizInputField, { QuizInputFieldProps } from '../Input/QuizInputField';
import RadioButton from './RadioButton/RadioButton';

interface OptionRadioButtonProps extends QuizInputFieldProps {
  answer: number;
  handleSetAnswer: React.Dispatch<React.SetStateAction<number>>;
}

function OptionRadioButton({
  type,
  input,
  index,
  answer,
  handleEdit,
  handleCheck,
  handleDelete,
  handleSetAnswer,
}: OptionRadioButtonProps) {
  return (
    <Container>
      <RadioButtonLabel>
        <RadioButton
          value={index}
          name={type}
          checked={index === answer - 1}
          onChange={() => handleSetAnswer(index + 1)}
        />
        <span style={{ display: 'none' }}>{index}</span>
      </RadioButtonLabel>
      <QuizInputField
        type={type}
        input={input}
        index={index}
        handleEdit={handleEdit}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
    </Container>
  );
}

export default OptionRadioButton;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const RadioButtonLabel = styled.label`
  cursor: pointer;
  padding: 1px;
`;
