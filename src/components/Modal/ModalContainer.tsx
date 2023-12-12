import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Exit } from '../../assets/icons/exit_nostroke.svg';

type Props = {
  onClose?: () => void;
  children: ReactNode;
};

ModalContainer.defaultProps = {
  onClose: null,
};

function ModalContainer({ onClose, children }: Props) {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [show, setShow] = useState(false);

  const handleClickClose = () => {
    setIsClosing(true);

    const setShowTimeout = setTimeout(() => {
      clearTimeout(setShowTimeout);
      if (onClose) onClose();
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, []);

  return (
    <Background className={isClosing ? 'closing show' : `${show && 'show'}`}>
      <Wrapper>
        {onClose && (
          <Close onClick={handleClickClose}>
            <Exit stroke="#424242" />
          </Close>
        )}
        <ContentWrapper>{children}</ContentWrapper>
      </Wrapper>
    </Background>
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);

  opacity: 0;
  &.show {
    opacity: 1;
  }
  &.closing {
    opacity: 0;
  }

  transition: opacity 300ms ease-out;

  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
  background-color: ${(props) => props.theme.colors.grayScale09};
  width: 480px;
  min-height: 160px;

  border-radius: 12px;
  border: 1px solid rgba(62, 215, 205, 0.4);

  box-shadow: 0px 0px 40px 0px rgba(62, 215, 205, 0.12);
`;

const Close = styled.div`
  position: absolute;

  right: 20px;
  top: 20px;

  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export default ModalContainer;
