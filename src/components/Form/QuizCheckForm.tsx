import { CommentDefaultInputField } from '@/components/InputField/CommentInputField';
import { GenerateUserQuizItem, ProblemsOfAIQuizFile } from '@/types/quiz.type';
import getCircleNum from '@/utils/getCircleNum';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface QuizCheckFormProps {
  quiz: ProblemsOfAIQuizFile | GenerateUserQuizItem;
}

function QuizCheckForm({ quiz }: QuizCheckFormProps) {
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    setShowComment(false);
  }, [quiz]);

  return (
    <StyledContainer>
      <StyledQuizContent>
        <div className="name">Q. {quiz.problemName}</div>
        {quiz.problemAnswer && (
          <div className="choices">
            {quiz.problemChoices.map((choice, index) => (
              <span
                key={`${choice}-${index}`}
                className={
                  Number(quiz.problemAnswer) === index + 1 && showComment
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
        answer={
          quiz.problemAnswer && Number(quiz.problemAnswer) > 0
            ? quiz.problemAnswer
            : undefined
        }
        isCommentOpen={showComment}
        setIsCommentOpen={setShowComment}
        isMultiple={!!quiz.problemAnswer}
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
