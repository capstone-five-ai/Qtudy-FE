import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToast from '../../hooks/useToast';
import Typography from '../Typography';

function Toast() {
  const { toast } = useToast();
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const show = toast.length > 0;

  useEffect(() => {
    if (toast.length === 0) return;

    const setExistTimeout = setTimeout(() => {
      setIsClosing(true);
      clearTimeout(setExistTimeout);
    }, 1000);
    setIsClosing(false);
  }, [toast]);

  return (
    <Wrapper>
      <ToastWrapper $isClosing={isClosing} className={isClosing ? 'closing show' : `${show && 'show'}`}>
        <Typography variant="caption3" color="grayScale09">
          {toast}
        </Typography>
      </ToastWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  bottom: 30px;
`;

const ToastWrapper = styled.div<{ $isClosing: boolean }>`
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.52);
  box-shadow: 0px 0px 16px 0px rgba(117, 117, 117, 0.16);

  display: flex;
  width: 320px;
  height: 40px;
  padding: 8px;
  justify-content: center;
  align-items: center;

  opacity: 0;
  &.show {
    opacity: 1;
  }
  &.closing {
    opacity: 0;
  }

  transition: opacity 300ms ease-in-out;

  z-index: 1000;
`;

export default Toast;
