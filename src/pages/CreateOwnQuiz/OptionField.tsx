import { v4 as uuidv4 } from 'uuid';
import OptionRadioButton from '../../components/Button/OptionRadioButton';
import Typography from '../../components/Typography';

interface OptionFieldProps {
  options: { input: string; check: boolean }[];
  answer: number;
  handleEdit: (type: string, index: number) => void;
  handleCheck: (type: string, index: number, input: string) => void;
  handleDelete: (index: number) => void;
  handleSetAnswer: React.Dispatch<React.SetStateAction<number>>;
}
function OptionField({ options, answer, handleEdit, handleCheck, handleDelete, handleSetAnswer }: OptionFieldProps) {
  return (
    <>
      <Typography variant="caption1" color="grayScale02">
        정답
      </Typography>
      {options.map((option, index) => (
        <OptionRadioButton
          key={uuidv4()}
          type="option"
          input={option}
          index={index}
          answer={answer}
          handleEdit={handleEdit}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          handleSetAnswer={handleSetAnswer}
        />
      ))}
    </>
  );
}

export default OptionField;
