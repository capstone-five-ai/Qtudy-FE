import styled from 'styled-components';
import EditAnswerAccordion from '../../components/Accordion/EditAnswerAccordion';
import { CreateOwnQuizInput } from '../../types';
import QuestionField from './QuestionField';

interface SubjectiveQuizProps {
  question: CreateOwnQuizInput;
  answer: number;
  commentary: CreateOwnQuizInput;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;

  margin: 40px;
  margin-right: 36px;
`;
