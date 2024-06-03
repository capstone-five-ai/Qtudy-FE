import TooltipTail from '@/assets/images/tooltip-tail.svg';
import tooltipState from '@/recoils/atoms/tooltipState';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';

function AnnouncementTooltip() {
  const [showTooltip, setShowTooltip] = useRecoilState(tooltipState);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showTooltip) {
      setIsVisible(true);
      // Reset timeout to hide tooltip state after all animations have completed
      const timeout = setTimeout(() => {
        setShowTooltip(false);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [showTooltip, setShowTooltip]);

  useEffect(() => {
    if (isVisible) {
      const fadeOutTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 3700);
      return () => clearTimeout(fadeOutTimeout);
    }
  }, [isVisible]);

  return (
    <StyledContainer $showTooltip={showTooltip} $isVisible={isVisible}>
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
    transform: translateY(-5px);
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
    transform: translateY(-5px);
  }
`;

const StyledContainer = styled.div<{
  $showTooltip: boolean;
  $isVisible: boolean;
}>`
  display: ${(props) =>
    props.$showTooltip ? 'block' : 'none'}; /* display 관리 추가 */
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
