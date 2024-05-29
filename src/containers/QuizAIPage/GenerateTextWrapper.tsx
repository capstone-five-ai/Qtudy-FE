import Scrollbar from '@/components/Scrollbar/Scrollbar';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface GenerateTextWrapperProps {
  type: 'quiz' | 'summary';
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

const PLACEHOLDER = {
  quiz: '퀴즈를 생성하고 싶은 관련 텍스트를 입력해주세요.',
  summary: '요약을 생성하고 싶은 관련 텍스트를 입력해주세요.',
};

function GenerateTextWrapper({
  type,
  inputText,
  setInputText,
}: GenerateTextWrapperProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = 'auto';
    const newHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [inputText]);

  return (
    <StyledContainer>
      <TextFieldContainer>
        <StyledTextArea
          ref={textareaRef}
          placeholder={PLACEHOLDER[type]}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInputText(e.target.value);
            adjustHeight();
          }}
        />
      </TextFieldContainer>
    </StyledContainer>
  );
}

export default GenerateTextWrapper;

const StyledContainer = styled.div`
  padding: 24px 36px;
  padding-right: 20px;
  height: 100%;
`;

const TextFieldContainer = styled.div`
  padding: 16px;
  padding-right: 0px;
  border-radius: 4px;
  height: 100%;
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
