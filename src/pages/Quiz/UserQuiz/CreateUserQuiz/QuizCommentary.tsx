import { useState } from 'react';
import styled from 'styled-components';
import AnswerAccordionTitle from '../../../../components/Accordion/AnswerAccordionTitle';
import Typography from '../../../../components/Typography';

interface EditAnswerAccordionProps {
  answer: string | null;
  commentary: string;
  setCommentary: (comment: string) => void;
}

function QuizCommentary({ answer, commentary, setCommentary }: EditAnswerAccordionProps) {
  const [show, setShow] = useState(false);

  const handleChangeTextareaHeight = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaTarget = event.target;

    textareaTarget.style.height = '0px';
    textareaTarget.style.height = `${textareaTarget.scrollHeight}px`;
  };

  return (
    <StyledContainer>
      <AnswerAccordionTitle show={show} setShow={setShow} />
      {show && (
        <>
          {answer && (
            <Typography variant="subtitle" color="grayScale02">
              {`정답 ${answer}`}
            </Typography>
          )}
          <StyledCommentary>
            <StyledTextarea
              rows={1}
              placeholder="해설을 입력해주세요."
              value={commentary}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setCommentary(e.target.value);
                handleChangeTextareaHeight(e);
              }}
            />
          </StyledCommentary>
        </>
      )}
    </StyledContainer>
  );
}

export default QuizCommentary;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledCommentary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  min-height: 104px;
  padding: 16px;

  border-radius: 8px;
  background: ${(props) => props.theme.colors.grayScale09};
`;

const StyledTextarea = styled.textarea`
  resize: none;
  border: none;
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.colors.grayScale02};

  font-family: NotoSansRegular;
  font-size: 14px;
  font-style: normal;
  line-height: normal;

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }
`;
