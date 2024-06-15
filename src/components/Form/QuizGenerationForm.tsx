import AddQuizOptionButton from '@/components/Button/AddQuizOptionButton';
import RadioButton from '@/components/Button/RadioButton';
import { CommentEditInputField } from '@/components/InputField/CommentInputField';
import QuizInputField from '@/components/InputField/QuizInputField';
import Typography from '@/components/Typography/Typography';
import useToast from '@/hooks/useToast';
import colors from '@/styles/color';
import { QuizType } from '@/types/quiz.type';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import DeleteIcon from '../Icon/DeleteIcon';

interface QuizFormProps {
  quizType: string;
  quizContent: QuizType;
  setQuizContent: (newQuizContent: QuizType) => void;
  showWarning?: boolean;
}

const MAX_OPTION_COUNT = 10;

function QuizGenerationForm({
  quizType,
  quizContent,
  setQuizContent,
  showWarning = false,
}: QuizFormProps) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const { fireToast } = useToast();

  useEffect(() => {
    setIsCommentOpen(false);
  }, [quizType]);

  useEffect(() => {
    if (quizContent.problemCommentary === '') setIsCommentOpen(true);
  }, [showWarning]);

  const handleChangeQuestion = (
    e: React.ChangeEvent<HTMLInputElement>,
    _: number
  ) => {
    const { name, value } = e.target;
    setQuizContent({ ...quizContent, [name]: value });
  };

  const handleChangeChoice = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedChoices = [...quizContent.problemChoices];
    updatedChoices[index] = e.target.value;
    setQuizContent({ ...quizContent, problemChoices: updatedChoices });
  };

  const handleDeleteChoice = (deleteIndex: number) => {
    const beforeChoices = [...quizContent.problemChoices];
    const updatedChoices = [...quizContent.problemChoices];
    const beforeAnswer = quizContent.problemAnswer;
    let updatedAnswer = quizContent.problemAnswer;
    updatedChoices.splice(deleteIndex, 1);

    if (quizContent.problemAnswer === `${deleteIndex + 1}`)
      updatedAnswer = '-1';

    setQuizContent({
      ...quizContent,
      problemChoices: updatedChoices,
      problemAnswer: updatedAnswer,
    });

    // 토스트 메시지와 함께 되돌리기 함수 제공
    fireToast({
      icon: <DeleteIcon width={20} height={20} stroke={colors.grayScale05} />,
      message: `항목이 삭제되었습니다.`,
      buttonText: '되돌리기',
      buttonHandler: () => undoDelete(beforeChoices, beforeAnswer),
    });
  };

  const undoDelete = (
    beforeChoices: QuizType['problemChoices'],
    beforeAnswer: QuizType['problemAnswer']
  ) => {
    setQuizContent({
      ...quizContent,
      problemChoices: beforeChoices,
      problemAnswer: beforeAnswer,
    });
  };

  const handleAddOption = () => {
    setQuizContent({
      ...quizContent,
      problemChoices: [...quizContent.problemChoices, ''],
    });
  };

  const handleCommentaryChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuizContent({ ...quizContent, problemCommentary: e.target.value });
  };

  return (
    <StyledContainer>
      <StyledQuizContainer>
        <QuizInputField
          type="question"
          index={0}
          isEdit
          name="problemName"
          value={quizContent.problemName}
          onChange={handleChangeQuestion}
          showWarning={showWarning && quizContent.problemName === ''}
          warningMessage="입력 필수인 항목입니다."
        />
        {quizType === '객관식' && (
          <>
            <Typography variant="caption1" color="grayScale02">
              정답
            </Typography>
            <StyledChoiceListContainer>
              {quizContent.problemChoices.map((choice, index) => (
                <StyledChoiceWrapper
                  key={`${index}`}
                  $warning={showWarning && choice === ''}
                >
                  <RadioButton
                    value={choice}
                    checked={quizContent.problemAnswer === `${index + 1}`}
                    onChange={() => {
                      setQuizContent({
                        ...quizContent,
                        problemAnswer: `${index + 1}`,
                      });
                    }}
                  />
                  <QuizInputField
                    type="choice"
                    index={index}
                    isEdit
                    name="problemChoices"
                    value={choice}
                    onChange={handleChangeChoice}
                    onDelete={handleDeleteChoice}
                    showWarning={showWarning && choice === ''}
                    warningMessage="빈 항목입니다."
                  />
                </StyledChoiceWrapper>
              ))}
            </StyledChoiceListContainer>
            <AddQuizOptionButton
              handleClick={handleAddOption}
              disabled={quizContent.problemChoices.length >= MAX_OPTION_COUNT}
            />
          </>
        )}
      </StyledQuizContainer>
      <CommentEditInputField
        commentary={quizContent.problemCommentary}
        isMultiple={quizType === '객관식'}
        answer={
          quizContent.problemAnswer ? quizContent.problemAnswer : undefined
        }
        isCommentOpen={isCommentOpen}
        setIsCommentOpen={setIsCommentOpen}
        isEdit
        onChange={handleCommentaryChange}
        showWarning={showWarning && quizContent.problemCommentary === ''}
        warningMessage="입력 필수인 항목입니다."
      />
    </StyledContainer>
  );
}

export default QuizGenerationForm;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const StyledQuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 4px;
`;

const StyledChoiceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledChoiceWrapper = styled.div<{ $warning: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;

  ${({ $warning }) =>
    $warning &&
    css`
      & > input {
        margin-bottom: 23px;
      }
    `}
`;
