import { ReactComponent as CloseIcon } from '@/assets/icons/exit.svg';
import React, { useEffect } from 'react';

import styled from 'styled-components';

interface DefaultModalProps {
  children: React.ReactNode;
  height?: string;
  closeButton?: boolean;
  onClose?: () => void;
}

function DefaultModal({
  children,
  height = 'auto',
  closeButton = false,
  onClose,
}: DefaultModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <StyledOverlay>
      <StyledModalContainer $height={height}>
        {closeButton && (
          <CloseIcon
            className="icon"
            width="16px"
            height="16px"
            onClick={onClose}
          />
        )}
        {children}
      </StyledModalContainer>
    </StyledOverlay>
  );
}

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.6);
`;

const StyledModalContainer = styled.div<{ $height: string }>`
  width: 480px;
  height: ${({ $height }) => $height};
  position: relative;

  border-radius: 12px;
  border: 1px solid rgba(62, 215, 205, 0.4);
  background: ${({ theme }) => theme.colors.grayScale09};
  box-shadow: 0px 0px 40px 0px rgba(54, 189, 180, 0.12);

  .icon {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
`;

export default DefaultModal;
