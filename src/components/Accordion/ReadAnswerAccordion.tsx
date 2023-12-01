import styled from 'styled-components';
import { useState } from 'react';
import Typography from '../Typography';
import { NUMBER_TO_CIRCLE } from '../../constants';
import AnswerAccordionTitle from './AnswerAccordionTitle';

interface ReadAnswerAccordionProps {
  answer: string;
  commentary: string;
}

function ReadAnswerAccordion({ answer, commentary }: ReadAnswerAccordionProps) {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <AnswerAccordionTitle show={show} setShow={setShow} />
      {show && (
        <CommentaryContainer>
          <div className="answer">
            <Typography variant="subtitle" color="grayScale02">
              {`정답 ${NUMBER_TO_CIRCLE[answer]}`}
            </Typography>
          </div>
          <div className="commentary">
            <Typography variant="body3" color="grayScale02">
              {commentary}
            </Typography>
          </div>
        </CommentaryContainer>
      )}
    </Container>
  );
}

export default ReadAnswerAccordion;

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
  background: ${(props) => props.theme.colors.mainMintLight};
  padding: 16px;

  .commentary {
    white-space: pre-wrap;
  }

  .icon {
    align-self: flex-end;
  }
`;
