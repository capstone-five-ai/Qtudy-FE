import styled from 'styled-components';
import QuizInputField from '../../../../components/Input/QuizInputField';
import { UserQuizInputType } from '../../../../types';

interface QuestionFieldProps {
  question: UserQuizInputType;
  setQuestion: React.Dispatch<React.SetStateAction<UserQuizInputType>>;
}
function QuestionField({ question, setQuestion }: QuestionFieldProps) {
  const handleEdit = () => {
    setQuestion({ ...question, check: false });
  };

  const handleCheck = () => {
    setQuestion({ ...question, check: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({ ...question, input: e.target.value });
  };

  return (
    <Container>
      <QuizInputField
        type="question"
        input={question}
        index={0}
        handleEdit={handleEdit}
        handleCheck={handleCheck}
        handleChange={handleChange}
      />
    </Container>
  );
}

export default QuestionField;

const Container = styled.div`
  display: flex;
  padding-left: 28px;
  width: 724px;
`;
