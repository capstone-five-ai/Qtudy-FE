import styled from 'styled-components';
import { useState } from 'react';
import reactTextareaAutosize from 'react-textarea-autosize';
import Typography from '../Typography';
import { ReactComponent as CheckIcon } from '../../assets/icons/icon-check.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/icon-edit.svg';
import { NUMBER_TO_CIRCLE } from '../../constants';
import AnswerAccordionTitle from './AnswerAccordionTitle';

interface EditAnswerAccordionProps {
  answer: string;
  commentaryInput: { input: string; check: boolean };
  handleEdit: (type: string, index: number) => void;
  handleCheck: (type: string, index: number, input: string) => void;
}

function EditAnswerAccordion({ answer, commentaryInput, handleEdit, handleCheck }: EditAnswerAccordionProps) {
  const [show, setShow] = useState(false);
  const [currentInput, setCurrentInput] = useState(commentaryInput.input);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentInput(e.target.value);
  };

  return (
    <Container>
      <AnswerAccordionTitle show={show} setShow={setShow} />
      {show && (
        <>
          <Typography variant="subtitle" color="grayScale02">
            {`정답 ${NUMBER_TO_CIRCLE[answer] ? NUMBER_TO_CIRCLE[answer] : ''}`}
          </Typography>
          <CommentaryContainer>
            <StyledTextarea
              minRows={2}
              placeholder="생성하고 싶은 해설을 입력해주세요."
              value={currentInput}
              onChange={handleTextareaChange}
              disabled={commentaryInput.check}
            />
            {commentaryInput.check ? (
              <EditIcon
                className="icon edit-icon"
                onClick={() => {
                  handleEdit('commentary', 0);
                }}
              />
            ) : (
              <CheckIcon
                className="icon"
                onClick={() => {
                  handleCheck('commentary', 0, currentInput);
                }}
              />
            )}
          </CommentaryContainer>
        </>
      )}
    </Container>
  );
}

export default EditAnswerAccordion;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 170px;
`;

const CommentaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.grayScale09};
  padding: 16px;

  .icon {
    align-self: flex-end;
    cursor: pointer;
  }

  .edit-icon {
    path {
      fill: ${(props) => props.theme.colors.grayScale04};
    }
  }
`;

const StyledTextarea = styled(reactTextareaAutosize)`
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
