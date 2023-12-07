import styled from 'styled-components';
import { ReactComponent as ChatIcon } from '../../assets/icons/icon-chat.svg';
import { ReactComponent as ArrowIcon } from '../../assets/icons/icon-arrow.svg';
import Typography from '../Typography';

interface AnswerAccordionTitleProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function AnswerAccordionTitle({ show, setShow }: AnswerAccordionTitleProps) {
  return (
    <Container onClick={() => setShow(!show)}>
      <ChatIcon />
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
