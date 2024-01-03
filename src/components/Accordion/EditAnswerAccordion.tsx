import styled, { css } from 'styled-components';
import { useState } from 'react';
import reactTextareaAutosize from 'react-textarea-autosize';
import Typography from '../Typography';
import { ReactComponent as CheckIcon } from '../../assets/icons/complete.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit_gray.svg';
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
          <CommentaryContainer
            onClick={() => {
              if (commentary.check && commentary.input === '') setCommentary({ ...commentary, check: false });
            }}
            $activeClick={commentary.check && commentary.input === ''}
          >
            <StyledTextarea
              minRows={2}
              placeholder="생성하고 싶은 해설을 입력해주세요."
              value={commentary.input}
              onChange={handleTextareaChange}
              readOnly={commentary.check}
              $readOnly={commentary.check}
              $activeClick={commentary.check && commentary.input === ''}
            />
            {commentary.check ? (
              <EditIcon
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setCommentary({ ...commentary, check: false });
                }}
              />
            ) : (
              <CheckIcon
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setCommentary({ ...commentary, check: true });
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
`;

const CommentaryContainer = styled.div<{ $activeClick: boolean }>`
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

  cursor: ${(props) => props.$activeClick && 'pointer'};
`;

const StyledTextarea = styled(reactTextareaAutosize)<{ $readOnly: boolean; $activeClick: boolean }>`
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

  ${(props) =>
    props.$readOnly &&
    css`
      background: transparent;
      cursor: default;
    `}

  cursor: ${(props) => props.$activeClick && 'pointer'};
`;
