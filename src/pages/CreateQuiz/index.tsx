import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QuizLayout from '../../layouts/QuizLayout';
import CreateRightSideBar from './CreateRightSieBar';
import SelectAIQuizType from './SelectAIQuizType';
import UploadType from './UploadType';
import TextType from './TextType';

function CreateQuiz() {
  const [createType] = useSearchParams();
  const type = createType.get('type');
  const [inputOption, setInputOption] = useState<{ [key: string]: string }>({
    type: '', // 문제 유형
    amount: '', // 문제량
    difficulty: '', // 난이도
    file: '', // 파일명
  });
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (!type) {
      setInputOption({
        type: '',
        amount: '',
        difficulty: '',
        file: '',
      });
    }
  }, [type]);

  const handleSubmit = () => {
    // TODO: 문제 생성 시작
  };

  return (
    <QuizLayout>
      <Container>
        {!type && <SelectAIQuizType />}
        {type === 'upload' && <UploadType />}
        {type === 'text' && <TextType inputText={inputText} setInputText={setInputText} />}
        <CreateRightSideBar
          disabled={!type}
          inputOption={inputOption}
          setInputOption={setInputOption}
          handleSubmit={handleSubmit}
        />
      </Container>
    </QuizLayout>
  );
}

export default CreateQuiz;

const Container = styled.div`
  display: flex;
  min-height: 524px;
`;
