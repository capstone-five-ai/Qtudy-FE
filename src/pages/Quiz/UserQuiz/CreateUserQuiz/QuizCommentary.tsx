import { useState } from 'react';
import styled from 'styled-components';
import AnswerAccordionTitle from '../../../../components/Accordion/AnswerAccordionTitle';
import Typography from '../../../../components/Typography';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit_gray.svg';

interface QuizCommentaryProps {
  isEdit?: boolean;
  setIsEdit?: ((edit: boolean) => void) | null;
  answer: string | null;
  commentary: string;
  setCommentary: (comment: string) => void;
}

QuizCommentary.defaultProps = {
  isEdit: false,
  setIsEdit: null,
};

function QuizCommentary({ isEdit = false, setIsEdit = null, answer, commentary, setCommentary }: QuizCommentaryProps) {
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
              disabled={!isEdit}
            />
            {!isEdit && (
              <EditIcon
                className="icon"
                onClick={() => {
                  if (setIsEdit) setIsEdit(true);
                }}
              />
            )}
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
  justify-content: space-between;

  min-height: 104px;
  padding: 16px;

  border-radius: 8px;
  background: ${(props) => props.theme.colors.grayScale09};

  .icon {
    margin-left: auto;
    cursor: pointer;
  }
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

  &:disabled {
    background: transparent;
  }
`;
