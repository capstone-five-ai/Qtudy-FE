import Scrollbar from '@/components/Scrollbar/Scrollbar';
import { ServiceType } from '@/types/category.type';
import textareaAdjustHeight from '@/utils/textareaAdjustHeight';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface GenerateTextWrapperProps {
  type: ServiceType;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

const PLACEHOLDER = {
  QUIZ: '퀴즈를 생성하고 싶은 관련 텍스트를 입력해주세요.',
  SUMMARY: '요약을 생성하고 싶은 관련 텍스트를 입력해주세요.',
};

function GenerateTextWrapper({
  type,
  inputText,
  setInputText,
}: GenerateTextWrapperProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaAdjustHeight(textareaRef);
  }, [inputText]);

  return (
    <StyledContainer>
      <StyledTextArea
        ref={textareaRef}
        placeholder={PLACEHOLDER[type]}
        value={inputText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setInputText(e.target.value);
        }}
      />
    </StyledContainer>
  );
}

export default GenerateTextWrapper;

const StyledContainer = styled.div`
  height: 100%;
  padding: 16px;
  padding-right: 0px;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.grayScale09};

  overflow-y: scroll;
  ${Scrollbar}
`;

const StyledTextArea = styled.textarea`
  resize: none;
  border: none;

  width: 100%;
  padding: 0;
  margin: 0;

  ${({ theme }) => theme.typography.body2};
  color: ${(props) => props.theme.colors.grayScale02};
  line-height: 25px;
  white-space: pre-wrap;

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }
`;
