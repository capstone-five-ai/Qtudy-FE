import styled from 'styled-components';
import { useState } from 'react';
import QuizLayout from '../../layouts/QuizLayout';
import CreateRightSideBar from './CreateRightSieBar';
import SelectAIQuizType from './SelectAIQuizType';
import UploadType from './UploadType';

function CreateQuiz() {
  const [createType, setCreateType] = useState<'upload' | 'text' | null>(null);

  return (
    <QuizLayout>
      <Container>
        {!createType && <SelectAIQuizType setCreateType={setCreateType} />}
        {createType === 'upload' && <UploadType />}
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
