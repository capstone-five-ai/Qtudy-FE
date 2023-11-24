import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import QuizLayout from '../../layouts/QuizLayout';
import CreateRightSideBar from './CreateRightSieBar';
import SelectAIQuizType from './SelectAIQuizType';
import UploadType from './UploadType';
import TextType from './TextType';

function CreateQuiz() {
  const [createType] = useSearchParams();
  const type = createType.get('type');
  const [optionInput, setOptionInput] = useState<{ [key: string]: string }>({
    type: '', // 문제 유형
    amount: '', // 문제량
    difficulty: '', // 난이도
    file: '', // 파일명
  });

  const handleSubmit = () => {
    // TODO: 문제 생성 시작
    console.log(optionInput);
    console.log(type);
  };

  return (
    <QuizLayout>
      <Container>
        {!type && <SelectAIQuizType />}
        {type === 'upload' && <UploadType />}
        {type === 'text' && <TextType />}
        <CreateRightSideBar
          disabled={!type}
          optionInput={optionInput}
          setOptionInput={setOptionInput}
          handleSubmit={handleSubmit}
        />
      </Container>
      <button type="button" onClick={handleSubmit}>
        테스트
      </button>
    </QuizLayout>
  );
}

export default CreateQuiz;

const Container = styled.div`
  display: flex;
  min-height: 524px;
`;
