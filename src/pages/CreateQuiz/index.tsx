import styled from 'styled-components';
import QuizLayout from '../../layouts/QuizLayout';
import CreateRightSideBar from './CreateRightSieBar';
import SelectAIQuizType from './SelectAIQuizType';

function CreateQuiz() {
  return (
    <QuizLayout>
      <Container>
        <SelectAIQuizType />
        <CreateRightSideBar />
      </Container>
    </QuizLayout>
  );
}

export default CreateQuiz;

const Container = styled.div`
  display: flex;
  min-height: 524px;
`;
