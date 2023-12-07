import styled from 'styled-components';
import EditAnswerAccordion from '../../../../components/Accordion/EditAnswerAccordion';
import { CreateUserQuizInput } from '../../../../types';
import QuestionField from './QuestionField';

interface SubjectiveQuizProps {
  question: CreateUserQuizInput;
  answer: number;
  commentary: CreateUserQuizInput;
  handleEdit: (type: string, index: number) => void;
  handleCheck: (type: string, index: number, input: string) => void;
}
function SubjectiveQuiz({ question, answer, commentary, handleEdit, handleCheck }: SubjectiveQuizProps) {
  return (
    <Container>
      <QuestionField input={question} handleEdit={handleEdit} handleCheck={handleCheck} />
      <EditAnswerAccordion
        answer={answer.toString()}
        commentaryInput={commentary}
        handleEdit={handleEdit}
        handleCheck={handleCheck}
      />
    </Container>
  );
}
export default SubjectiveQuiz;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;
