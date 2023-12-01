import styled from 'styled-components';
import QuestionField from './QuestionField';
import { CreateOwnQuizInput } from '../../types';
import OptionField from './OptionField';
import AddOptionButton from '../../components/Button/AddOptionButton';
import EditAnswerAccordion from '../../components/Accordion/EditAnswerAccordion';

const MAX_OPTION_COUNT = 10;

interface MultipleQuizProps {
  question: CreateOwnQuizInput;
  options: CreateOwnQuizInput[];
  answer: number;
  commentary: CreateOwnQuizInput;
  handleEdit: (type: string, index: number) => void;
  handleCheck: (type: string, index: number, input: string) => void;
  handleDelete: (index: number) => void;
  handleAddOption: () => void;
  handleSetAnswer: React.Dispatch<React.SetStateAction<number>>;
}

function MultipleQuiz({
  question,
  options,
  answer,
  commentary,
  handleEdit,
  handleCheck,
  handleDelete,
  handleAddOption,
  handleSetAnswer,
}: MultipleQuizProps) {
  return (
    <Container>
      <QuizInputFieldContainer>
        <QuestionField input={question} handleEdit={handleEdit} handleCheck={handleCheck} />
        <OptionField
          options={options}
          answer={answer}
          handleEdit={handleEdit}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          handleSetAnswer={handleSetAnswer}
        />
        <AddOptionButton handleClick={handleAddOption} disabled={options.length >= MAX_OPTION_COUNT} />
      </QuizInputFieldContainer>
      <EditAnswerAccordion
        answer={answer.toString()}
        commentaryInput={commentary}
        handleEdit={handleEdit}
        handleCheck={handleCheck}
      />
    </Container>
  );
}
export default MultipleQuiz;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;

  margin: 40px;
  margin-right: 36px;
`;

const QuizInputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
