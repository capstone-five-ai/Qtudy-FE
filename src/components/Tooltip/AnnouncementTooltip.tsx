import TooltipTail from '@/assets/images/tooltip-tail.svg';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

function AnnouncementTooltip() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }, []);

  return (
    <StyledContainer $isVisible={show}>
      <StyledInnerContainer>
        <TooltipText>생성 후에는 여기서 편집이 가능해요!</TooltipText>
      </StyledInnerContainer>
    </StyledContainer>
  );
}

export default AnnouncementTooltip;

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

const StyledContainer = styled.div<{ $isVisible: boolean }>`
  opacity: 0;
  animation: ${(props) => (props.$isVisible ? fadeIn : fadeOut)} 0.3s
    ease-in-out forwards;

  position: absolute;
  top: 35px;
  right: -15px;
`;

const StyledInnerContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const TooltipText = styled.div`
  width: fit-content;
  padding: 10px 24px;

  background: ${({ theme }) => theme.colors.grayScale03};
  color: ${({ theme }) => theme.colors.mainMintLight};
  ${({ theme }) => theme.typography.detail};
  white-space: nowrap;
  text-align: center;

  border-radius: 16px;

  &::after {
    content: '';
    width: 12px;
    height: 11px;
    background: url(${TooltipTail});

    position: absolute;
    bottom: 100%;
    right: 14%;
    transform: translateX(-50%);
  }
`;
