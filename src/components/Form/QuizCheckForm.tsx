import { CommentDefaultInputField } from '@/components/InputField/CommentInputField';
import getCircleNum from '@/utils/getCircleNum';
import { useState } from 'react';
import styled from 'styled-components';

interface QuizCheckFormProps {
  quiz: {
    problemName: string;
    problemType: string;
    problemChoices: string[];
    problemAnswer: number;
    problemCommentary: string;
  };
}

function QuizCheckForm({ quiz }: QuizCheckFormProps) {
  const [showComment, setShowComment] = useState(false);

  return (
    <StyledContainer>
      <StyledQuizContent>
        <div className="name">Q. {quiz.problemName}</div>
        {quiz.problemType === 'MULTIPLE' && (
          <div className="choices">
            {quiz.problemChoices.map((choice, index) => (
              <span
                className={
                  quiz.problemAnswer === index + 1 && showComment
                    ? 'answer'
                    : ''
                }
              >
                {getCircleNum(index + 1)} {choice}
              </span>
            ))}
          </div>
        )}
      </StyledQuizContent>
      <CommentDefaultInputField
        commentary={quiz.problemCommentary}
        answer={quiz.problemAnswer > 0 ? quiz.problemAnswer : undefined}
        isCommentOpen={showComment}
        setIsCommentOpen={setShowComment}
        isMultiple={quiz.problemType === 'MULTIPLE'}
      />
    </StyledContainer>
  );
}

export default QuizCheckForm;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 68px;
`;

const StyledQuizContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;

  .name {
    ${({ theme }) => theme.typography.subtitle};
    color: ${({ theme }) => theme.colors.grayScale02};
    white-space: pre-wrap;
    word-break: break-all;
  }

  .choices {
    display: flex;
    flex-direction: column;
    gap: 16px;

    margin-left: 24px;

    span {
      ${({ theme }) => theme.typography.body2};
      color: ${({ theme }) => theme.colors.grayScale02};
    }

    .answer {
      color: ${({ theme }) => theme.colors.correctBlue};
    }
  }
`;
