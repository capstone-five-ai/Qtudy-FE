import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToast from '../../hooks/useToast';
import Typography from '../Typography';

function Toast() {
  const { toast, icon } = useToast();
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [show, setShow] = useState(toast.length > 0);

  useEffect(() => {
    if (toast.length === 0) return;

    const setShowTimeout = setTimeout(() => {
      setShow(true);
      clearTimeout(setShowTimeout);
    }, 100);

    const setClosingTimeout = setTimeout(() => {
      setIsClosing(true);
      clearTimeout(setClosingTimeout);
    }, 1000);

    setIsClosing(false);
    setShow(false);
  }, [toast]);

  if (toast.length === 0) return <div />;

  return (
    <Wrapper>
      <ToastWrapper className={isClosing ? 'closing show' : `${show && 'show'}`}>
        {icon}
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
  z-index: 10;
`;

const ToastWrapper = styled.div`
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.52);
  box-shadow: 0px 0px 16px 0px rgba(117, 117, 117, 0.16);

  display: flex;
  width: 320px;
  height: 40px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;

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
