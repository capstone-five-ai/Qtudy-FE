import GenerateMethodCard from '@/components/Card/GenerateMethodCard';
import styled from 'styled-components';

const EXPLANATION_TEXT = {
  QUIZ: '생성하고 싶은 관련 파일 업로드 혹은 텍스트를 입력해보세요.\nAI가 퀴즈를 자동으로 생성해드려요!',
  SUMMARY:
    '요약하고 싶은 관련 파일 업로드 혹은 텍스트를 입력해보세요.\nAI가 자동으로 요약해 드려요!',
};

interface GenerateMethodWrapperProps {
  type: 'QUIZ' | 'SUMMARY';
}

function GenerateMethodWrapper({ type }: GenerateMethodWrapperProps) {
  return (
    <StyledContainer>
      <p className="text">{EXPLANATION_TEXT[type]}</p>
      <StyledCardContainer>
        <GenerateMethodCard type="upload" />
        <GenerateMethodCard type="text" />
      </StyledCardContainer>
    </StyledContainer>
  );
}

export default GenerateMethodWrapper;

const StyledContainer = styled.div`
  margin-top: 86px;

  .text {
    ${({ theme }) => theme.typography.caption2};
    color: ${({ theme }) => theme.colors.grayScale03};
    text-align: center;
    margin-bottom: 52px;
    white-space: pre-line;
  }
`;

const StyledCardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 48px;
`;
