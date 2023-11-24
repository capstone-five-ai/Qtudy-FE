import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import QuizLayout from '../../layouts/QuizLayout';
import CreateRightSideBar from './CreateRightSieBar';
import SelectAIQuizType from './SelectAIQuizType';
import UploadType from './UploadType';
import TextType from './TextType';

function CreateQuiz() {
  const [createType] = useSearchParams();
  const type = createType.get('type');

  return (
    <QuizLayout>
      <Container>
        {!type && <SelectAIQuizType />}
        {type === 'upload' && <UploadType />}
        {type === 'text' && <TextType />}
        <CreateRightSideBar disabled={!type} />
      </Container>
    </QuizLayout>
  );
}

export default CreateQuiz;

const Container = styled.div`
  display: flex;
  min-height: 524px;
`;
