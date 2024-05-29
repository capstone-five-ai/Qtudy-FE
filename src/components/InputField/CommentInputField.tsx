import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow-up.svg';
import { ReactComponent as CommentIcon } from '@/assets/icons/commentary.svg';
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg';
import getCircleNum from '@/utils/getCircleNum';
import textareaAdjustHeight from '@/utils/textareaAdjustHeight';
import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

interface CommentInputFieldProps {
  isMultiple?: boolean;
  answer?: number;
  commentary: string;
  isCommentOpen: boolean;
  setIsCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CommentEditInputFieldProps extends CommentInputFieldProps {
  isEdit?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setIsEdit?: (value: boolean) => void;
}

export function CommentDefaultInputField({
  isMultiple = false,
  answer,
  commentary,
  isCommentOpen,
  setIsCommentOpen,
}: CommentInputFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isCommentOpen) textareaAdjustHeight(textareaRef);
  }, [isCommentOpen, commentary]);

  return (
    <StyledContainer>
      <StyledTitle
        $isOpen={isCommentOpen}
        onClick={() => setIsCommentOpen((prev) => !prev)}
      >
        <CommentIcon />
        <span>정답 및 해설</span>
        <ArrowIcon className="arrow" />
      </StyledTitle>
      {isCommentOpen && (
        <>
          <StyledDefaultContent>
            {isMultiple && (
              <div className="answer-container">
                <span className="title">정답 </span>
                <span className="answer">{answer && getCircleNum(answer)}</span>
              </div>
            )}
            <StyledText>{commentary}</StyledText>
          </StyledDefaultContent>
        </>
      )}
    </StyledContainer>
  );
}

export function CommentEditInputField({
  isEdit = false,
  isMultiple = false,
  answer,
  commentary,
  isCommentOpen,
  setIsCommentOpen,
  onChange,
  setIsEdit,
}: CommentEditInputFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isCommentOpen) textareaAdjustHeight(textareaRef);
  }, [isCommentOpen, commentary]);

  return (
    <StyledContainer>
      <StyledTitle
        $isOpen={isCommentOpen}
        onClick={() => setIsCommentOpen((prev) => !prev)}
      >
        <CommentIcon />
        <span>정답 및 해설</span>
        <ArrowIcon className="arrow" />
      </StyledTitle>
      {isCommentOpen && (
        <>
          {isMultiple && (
            <div className="answer-container">
              <span className="title">정답 </span>
              <span className="answer">{answer && getCircleNum(answer)}</span>
            </div>
          )}
          <StyledEditContent>
            <StyledTextarea
              ref={textareaRef}
              placeholder="해설을 입력해주세요."
              value={commentary}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                onChange && onChange(event);
              }}
              disabled={!isEdit}
            />
            {!isEdit && (
              <EditIcon
                className="icon"
                onClick={() => {
                  setIsEdit && setIsEdit(true);
                }}
              />
            )}
          </StyledEditContent>
        </>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .answer-container {
    width: 100%;
    ${({ theme }) => theme.typography.subtitle};

    .title {
      color: ${({ theme }) => theme.colors.grayScale02};
    }
    .answer {
      color: ${({ theme }) => theme.colors.correctBlue};
    }
  }
`;

const StyledTitle = styled.button<{ $isOpen: boolean }>`
  ${({ theme }) => theme.typography.button};
  color: ${({ theme }) => theme.colors.mainMintDark};
  display: flex;
  align-items: center;
  gap: 4px;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      .arrow {
        transform: rotate(180deg);
      }
    `}
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding: 16px;
  border-radius: 8px;
`;

const StyledDefaultContent = styled(StyledContent)`
  gap: 12px;
  background: ${({ theme }) => theme.colors.mainMintLight};
`;

const StyledEditContent = styled(StyledContent)`
  background: ${({ theme }) => theme.colors.grayScale09};
`;

const StyledTextarea = styled.textarea`
  resize: none;
  border: none;

  width: 100%;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.grayScale02};
  ${({ theme }) => theme.typography.body2};
  line-height: 20px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale05};
  }

  &:disabled {
    background: transparent;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledText = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.grayScale02};
  ${({ theme }) => theme.typography.body2};
  white-space: pre-wrap;
`;
