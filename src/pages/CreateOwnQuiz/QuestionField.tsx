import styled from 'styled-components';
import QuizInputField from '../../components/Input/QuizInputField';

interface QuestionFieldProps {
  input: { input: string; check: boolean };
  handleEdit: (index: number) => void;
  handleCheck: (index: number, input: string) => void;
}
function QuestionField({ input, handleEdit, handleCheck }: QuestionFieldProps) {
  return (
    <Container>
      <QuizInputField type="question" input={input} index={0} handleEdit={handleEdit} handleCheck={handleCheck} />
    </Container>
  );
}

export default QuestionField;

const Container = styled.div`
  display: flex;
  padding-left: 28px;
`;
