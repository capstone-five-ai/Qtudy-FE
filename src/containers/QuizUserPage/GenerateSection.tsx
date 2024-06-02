import QuizGenerationForm from '@/components/Form/QuizGenerationForm';
import GenerateLoader from '@/components/Loader/GenerateLoader';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import GenerateSidebar from '@/components/Sidebar/GenerateSidebar';
import { usePostQuizByUser } from '@/hooks/usePostQuiz';
import loadingState from '@/recoils/atoms/loadingState';
import {
  GenerateQuizOption,
  GenerateQuizType,
  QuizType,
} from '@/types/quiz.type';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const GENERATE_OPTIONS: {
  key: keyof GenerateQuizOption;
  label: string;
  options: string[];
}[] = [{ key: 'type', label: '퀴즈 유형', options: ['객관식', '주관식'] }];

const initialQuizContent: QuizType = {
  problemName: '',
  problemAnswer: '-1',
  problemCommentary: '',
  problemChoices: [''],
};

function GenerateSection() {
  const showLoading = useRecoilValue(loadingState);
  const [quizContent, setQuizContent] = useState<QuizType>(initialQuizContent);
  const [inputOption, setInputOption] = useState<GenerateQuizOption>({
    type: '객관식',
  });
  const { mutate: generateByUser, status: generateStatus } =
    usePostQuizByUser();

  useEffect(() => {
    setQuizContent(initialQuizContent);
    setInputOption({ ...inputOption });
  }, [inputOption.type]);

  const handleSubmit = () => {
    let payload;

    if (inputOption.type === '객관식') {
      payload = quizContent;
    } else {
      const { problemChoices, problemAnswer, ...rest } = quizContent;
      payload = rest;
    }

    generateByUser({
      newQuizData: payload,
      quizType: inputOption.type as GenerateQuizType,
    });
  };

  return (
    <>
      {showLoading && (
        <GenerateLoader isLoading={generateStatus === 'pending'} />
      )}
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
        handleSubmit={handleSubmit}
        generateButtonDisabled={
          Object.values(inputOption).includes('') ||
          quizContent.problemName === '' ||
          (inputOption.type === '객관식' &&
            quizContent.problemAnswer === '-1') ||
          (inputOption.type === '객관식' &&
            quizContent.problemChoices?.length === 0)
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
