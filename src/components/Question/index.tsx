import { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as ExplanationIcon } from '../../assets/icons/explanation.svg';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import { QuestionType } from '../../types/question.type';
import getCircleNum from '../../utils/getCircleNum';
import Typography from '../Typography';

type Props = {
  question: QuestionType;
  questionNum?: number;
};

Question.defaultProps = {
  questionNum: undefined,
};

function Question({ question, questionNum }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const questionHead = questionNum?.toString().padStart(2, '0') || 'Q';

  const handleClickAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowAnswer(!showAnswer);
  };

  return (
    <Wrapper>
      <Quiz>
        <Typography variant="subtitle">
          {questionHead}. {question.problemName}
        </Typography>
        {question.problemChoices && question.problemChoices.length > 0 && (
          <Choice>
            {question.problemChoices?.map((choice, idx) => (
              <Typography
                key={choice}
                variant="body2"
                color={showAnswer && Number(question.problemAnswer) === idx + 1 ? 'correctBlue' : 'grayScale02'}
              >
                {getCircleNum(idx + 1)} {choice}
              </Typography>
            ))}
          </Choice>
        )}
      </Quiz>
      <AnswerWrapper>
        <AnswerButton type="button" onClick={handleClickAnswer}>
          <ExplanationIcon />
          <Typography variant="button" color="mainMintDark">
            정답 및 해설
          </Typography>
          <ArrowIcon className={showAnswer ? 'arrow-close' : 'arrow-open'} />
        </AnswerButton>
        {showAnswer && (
          <Commentary>
            {question.problemType === 'MULTIPLE' && question.problemAnswer && (
              <div className="answer">
                <Typography variant="subtitle">정답</Typography>
                <Typography variant="subtitle" color="correctBlue">
                  {getCircleNum(question.problemAnswer)}
                </Typography>
              </div>
            )}
            <Typography variant="body3">{question.problemCommentary}</Typography>
          </Commentary>
        )}
      </AnswerWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 68px;
`;

const Quiz = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Choice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 24px;
`;

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AnswerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  border: 0;
  background-color: transparent;
  padding: 0;
  cursor: pointer;

  .arrow-open {
    transform: rotate(-180deg);
  }

  .arrow-close {
    transform: rotate(0deg);
  }
`;

const Commentary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.mainMintLight};

  .answer {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;

export default Question;
