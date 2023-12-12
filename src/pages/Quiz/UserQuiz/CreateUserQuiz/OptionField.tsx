import styled from 'styled-components';
import Typography from '../../../../components/Typography';
import { UserQuizInputType } from '../../../../types';
import QuizInputField from '../../../../components/Input/QuizInputField';
import RadioButton from '../../../../components/Button/RadioButton/RadioButton';

interface OptionFieldProps {
  options: UserQuizInputType[];
  answer: number;
  setOptions: React.Dispatch<React.SetStateAction<UserQuizInputType[]>>;
  setAnswer: React.Dispatch<React.SetStateAction<number>>;
}
function OptionField({ options, answer, setOptions, setAnswer }: OptionFieldProps) {
  const handleEdit = (index: number) => {
    const updatedOption = [...options];
    updatedOption[index] = { ...updatedOption[index], check: false };
    setOptions(updatedOption);
  };

  const handleCheck = (index: number) => {
    const updatedOption = [...options];
    updatedOption[index] = { ...updatedOption[index], check: true };
    setOptions(updatedOption);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedOption = [...options];
    updatedOption[index].input = e.target.value;
    setOptions(updatedOption);
  };

  const handleDelete = (indexToDelete: number) => {
    setOptions((prevOptions) => {
      return prevOptions.filter((_, index) => index !== indexToDelete);
    });

    if (indexToDelete === answer - 1) setAnswer(-1);
  };

  return (
    <>
      <Typography variant="caption1" color="grayScale02">
        정답
      </Typography>
      {options.map((option, index) => (
        <Container key={option.id}>
          <RadioButtonLabel>
            <RadioButton
              value={index}
              name="option"
              checked={index === answer - 1}
              onChange={() => setAnswer(index + 1)}
            />
            <span style={{ display: 'none' }}>{index}</span>
          </RadioButtonLabel>
          <QuizInputField
            type="option"
            input={option}
            index={index}
            handleEdit={handleEdit}
            handleCheck={handleCheck}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        </Container>
      ))}
    </>
  );
}

export default OptionField;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const RadioButtonLabel = styled.label`
  cursor: pointer;
`;
