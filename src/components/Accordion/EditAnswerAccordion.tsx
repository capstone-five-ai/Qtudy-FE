import styled from 'styled-components';
import { useState } from 'react';
import reactTextareaAutosize from 'react-textarea-autosize';
import Typography from '../Typography';
import { ReactComponent as CheckIcon } from '../../assets/icons/icon-check.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/icon-edit.svg';
import { NUMBER_TO_CIRCLE } from '../../constants';
import AnswerAccordionTitle from './AnswerAccordionTitle';
import { UserQuizInputType } from '../../types';

interface EditAnswerAccordionProps {
  answer: string | null;
  commentary: UserQuizInputType;
  setCommentary: React.Dispatch<React.SetStateAction<UserQuizInputType>>;
}

function EditAnswerAccordion({ answer, commentary, setCommentary }: EditAnswerAccordionProps) {
  const [show, setShow] = useState(false);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentary({ ...commentary, input: e.target.value });
  };

  return (
    <Container>
      <AnswerAccordionTitle show={show} setShow={setShow} />
      {show && (
        <>
          {answer ? (
            <Typography variant="subtitle" color="grayScale02">
              {`정답 ${NUMBER_TO_CIRCLE[answer] ? NUMBER_TO_CIRCLE[answer] : ''}`}
            </Typography>
          ) : null}
          <CommentaryContainer>
            <StyledTextarea
              minRows={2}
              placeholder="생성하고 싶은 해설을 입력해주세요."
              value={commentary.input}
              onChange={handleTextareaChange}
              disabled={commentary.check}
            />
            {commentary.check ? (
              <EditIcon className="icon" onClick={() => setCommentary({ ...commentary, check: false })} />
            ) : (
              <CheckIcon className="icon" onClick={() => setCommentary({ ...commentary, check: true })} />
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
