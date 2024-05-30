import useToast from '@/hooks/useToast';
import { useEffect } from 'react';
import styled from 'styled-components';

function ToastMessage() {
  const { toast } = useToast();

  useEffect(() => {
    if (!toast.message) return;

    const setShowTimeout = setTimeout(() => {
      clearTimeout(setShowTimeout);
    }, 100);

    const setClosingTimeout = setTimeout(() => {
      clearTimeout(setClosingTimeout);
    }, 1000);
  }, [toast]);

  if (!toast.message) return null;

  return (
    <StyledContainer>
      <StyledInnerContainer>
        <StyledContent>
          {toast.icon}
          <p>{toast.message}</p>
        </StyledContent>
        {toast.buttonText && (
          <StyledButton
            onClick={() => {
              toast.buttonHandler && toast.buttonHandler();
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
