import styled from 'styled-components';
import QuizLayout from '../../layouts/QuizLayout';
import CreateRightSideBar from './CreateRightSieBar';

function CreateQuiz() {
  return (
    <QuizLayout>
      <Container>
        <div>퀴즈</div>
        <CreateRightSideBar />
      </Container>
    </QuizLayout>
  );
}

export default CreateQuiz;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 524px;
`;
