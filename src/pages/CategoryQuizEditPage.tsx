import QuizGenerationForm from '@/components/Form/QuizGenerationForm';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import TopButtonBar from '@/containers/CategoryDetailPage/TopButtonBar';
import { GenerateQuizData } from '@/types/quiz.type';
import { useState } from 'react';
import styled from 'styled-components';

const initialQuizContent: GenerateQuizData = {
  problemName: '',
  problemAnswer: -1,
  problemCommentary: '',
  problemChoices: [''],
};

function CategoryQuizEditPage() {
  const [quizContent, setQuizContent] =
    useState<GenerateQuizData>(initialQuizContent);
  const [inputOption, setInputOption] = useState<{ [key: string]: string }>({
    type: '객관식',
    fileName: '',
  });

  return (
    <ContentWrapper>
      <StyledContent>
        <TopButtonBar isEdit />
        <StyledInnerContainer>
          <QuizGenerationForm
            quizType={inputOption.type}
            quizContent={quizContent}
            setQuizContent={setQuizContent}
          />
        </StyledInnerContainer>
      </StyledContent>
      <Sidebar />
    </ContentWrapper>
  );
}

export default CategoryQuizEditPage;

const StyledContent = styled.div`
  flex: 1;
  padding: 24px 20px 24px 40px;
`;

const StyledInnerContainer = styled.div`
  height: 100%;

  overflow-y: scroll;
  ${Scrollbar}
`;
