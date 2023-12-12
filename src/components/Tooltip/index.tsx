import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { ReactComponent as TooltipIcon } from '../../assets/icons/icon-tooltip.svg';
import Typography from '../Typography';

function Tooltip() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container $isVisible={show}>
      <TooltipContainer>
        <Typography variant="detail" color="mainMintDark">
          생성 후에는 여기서 편집이 가능해요!
        </Typography>
        <TooltipIcon style={{ position: 'relative' }} />
      </TooltipContainer>
    </Container>
  );
}

export default Tooltip;

const Container = styled.div<{ $isVisible: boolean }>`
  opacity: 0;
  animation: ${(props) => (props.$isVisible ? fadeIn : fadeOut)} 0.3s ease-in-out forwards;

  position: absolute;
  top: 5px;
  right: -40px;
  z-index: 2;
`;

const TooltipContainer = styled.div`
  position: relative;

  & > div {
    position: absolute;
    left: 40px;
    bottom: 36px;
    z-index: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;
