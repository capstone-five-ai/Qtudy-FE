import styled from 'styled-components';
import { ReactComponent as ExplanationIcon } from '../../assets/icons/explanation.svg';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import Typography from '../Typography';

interface AnswerAccordionTitleProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function AnswerAccordionTitle({ show, setShow }: AnswerAccordionTitleProps) {
  return (
    <Container onClick={() => setShow(!show)}>
      <ExplanationIcon />
      <Typography variant="button" color="mainMintDark">
        정답 및 해설
      </Typography>
      <ArrowIcon className={!show ? 'arrow-close' : 'arrow-open'} />
    </Container>
  );
}

export default AnswerAccordionTitle;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  cursor: pointer;
  width: max-content;

  .arrow-open {
    transform: rotate(-180deg);
  }

  .arrow-close {
    transform: rotate(0deg);
  }
`;
