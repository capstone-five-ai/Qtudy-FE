import useToast from '@/hooks/useToast';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function ToastMessage() {
  const { toast, removeToast } = useToast();
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [show, setShow] = useState(toast.message?.length ? true : false);

  useEffect(() => {
    if (!toast.message) return;

    const setShowTimeout = setTimeout(() => {
      setShow(true);
      clearTimeout(setShowTimeout);
    }, 100);

    const setClosingTimeout = setTimeout(() => {
      setIsClosing(true);
      clearTimeout(setClosingTimeout);
    }, toast.duration ?? 1000);

    setIsClosing(false);
    setShow(false);
  }, [toast]);

  if (!toast.message) return null;

  return (
    <StyledContainer
      className={isClosing ? 'closing show' : `${show && 'show'}`}
    >
      <StyledInnerContainer>
        <StyledContent>
          {toast.icon}
          <p>{toast.message}</p>
        </StyledContent>
        {toast.buttonText && (
          <StyledButton
            onClick={() => {
              toast.buttonHandler?.();
              removeToast();
            }}
          >
            {toast.buttonText}
          </StyledButton>
        )}
      </StyledInnerContainer>
    </StyledContainer>
  );
}

export default ToastMessage;

const StyledContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  z-index: 10;

  opacity: 0;
  &.show {
    opacity: 1;
  }
  &.closing {
    opacity: 0;
  }

  transition: opacity 300ms ease-in-out;
`;

const StyledInnerContainer = styled.div`
  width: 320px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;
  background: rgba(0, 0, 0, 0.52);

  position: relative;
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    ${({ theme }) => theme.typography.caption3};
    color: ${({ theme }) => theme.colors.grayScale09};
  }
`;

const StyledButton = styled.button`
  ${({ theme }) => theme.typography.caption3};
  color: ${({ theme }) => theme.colors.grayScale06};

  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
`;
