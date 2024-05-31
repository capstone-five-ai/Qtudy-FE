import AddQuizOptionButton from '@/components/Button/AddQuizOptionButton';
import RadioButton from '@/components/Button/RadioButton';
import { CommentEditInputField } from '@/components/InputField/CommentInputField';
import QuizInputField from '@/components/InputField/QuizInputField';
import Typography from '@/components/Typography/Typography';
import { QuizType } from '@/types/quiz.type';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface QuizFormProps {
  quizType: string;
  quizContent: QuizType;
  setQuizContent: (newQuizContent: QuizType) => void;
}

const MAX_OPTION_COUNT = 10;

function QuizGenerationForm({
  quizType,
  quizContent,
  setQuizContent,
}: QuizFormProps) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  useEffect(() => {
    setIsCommentOpen(false);
  }, [quizType]);

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

  const handleDeleteChoice = (index: number) => {
    const updatedChoices = [...quizContent.problemChoices];
    //const choiceToRemove = updatedChoices[index];
    let updatedAnswer = quizContent.problemAnswer;
    updatedChoices.splice(index, 1);

    if (quizContent.problemAnswer === `${index + 1}`) updatedAnswer = '-1';

    setQuizContent({
      ...quizContent,
      problemChoices: updatedChoices,
      problemAnswer: updatedAnswer,
    });

    // 토스트 메시지와 함께 되돌리기 함수 제공
    //showToast(`"${choiceToRemove}" 항목이 삭제되었습니다.`, () =>
    //  undoDelete(index, choiceToRemove)
    //);
  };

  /* const undoDelete = () => {
    const updatedChoices = [...quizContent.problemChoices];
    updatedChoices.splice(index, 0, choice); // 원래 위치에 다시 삽입
    setQuizContent({
      ...quizContent,
      problemChoices: updatedChoices,
    });
    hideToast(); // 토스트 메시지 숨기기
  }; */

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
        />
        {quizType === '객관식' && (
          <>
            <Typography variant="caption1" color="grayScale02">
              정답
            </Typography>
            <StyledChoiceListContainer>
              {quizContent.problemChoices.map((choice, index) => (
                <StyledChoiceWrapper key={`${index}`}>
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
`;

const StyledChoiceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledChoiceWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
