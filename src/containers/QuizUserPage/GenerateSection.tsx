import QuizGenerationForm from '@/components/Form/QuizGenerationForm';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import GenerateSidebar from '@/components/Sidebar/GenerateSidebar';
import { GenerateQuizData } from '@/types/quiz.type';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const GENERATE_OPTIONS = [
  { key: 'type', label: '퀴즈 유형', options: ['객관식', '주관식'] },
];

const initialQuizContent: GenerateQuizData = {
  problemName: '',
  problemAnswer: -1,
  problemCommentary: '',
  problemChoices: [''],
};

function GenerateSection() {
  const [quizContent, setQuizContent] =
    useState<GenerateQuizData>(initialQuizContent);
  const [inputOption, setInputOption] = useState<{ [key: string]: string }>({
    type: '객관식',
    fileName: '',
  });

  useEffect(() => {
    setQuizContent(initialQuizContent);
    setInputOption({ ...inputOption, fileName: '' });
  }, [inputOption.type]);

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputOption({ ...inputOption, [e.target.name]: e.target.value });
  };

  return (
    <>
      <StyledContent>
        <StyledInnerContent>
          <QuizGenerationForm
            quizType={inputOption.type}
            quizContent={quizContent}
            setQuizContent={setQuizContent}
          />
        </StyledInnerContent>
      </StyledContent>
      <GenerateSidebar
        optionList={GENERATE_OPTIONS}
        inputOption={inputOption}
        setInputOption={setInputOption}
        handleFileNameChange={handleFileNameChange}
        handleSubmit={() => {
          // TODO: 제출 버튼 클릭시 동작
          console.log(quizContent);
        }}
        generateButtonDisabled={
          Object.values(inputOption).includes('') ||
          quizContent.problemName === '' ||
          quizContent.problemAnswer === -1 ||
          quizContent.problemChoices.length === 0
        }
      />
    </>
  );
}

export default GenerateSection;

const StyledContent = styled.div`
  flex: 1;
  padding: 40px 0;
`;

const StyledInnerContent = styled.div`
  height: 100%;
  padding-left: 40px;
  padding-right: 20px;

  overflow-y: scroll;
  ${Scrollbar}
`;
