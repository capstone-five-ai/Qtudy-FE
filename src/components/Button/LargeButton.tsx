import styled from 'styled-components';

type ButtonType = JSX.IntrinsicElements['button']['type'];

interface LargeButtonProps {
  type: ButtonType;
  children: React.ReactNode;
  disabled: boolean;
  onClick?: () => void;
}

LargeButton.defaultProps = {
  onClick() {},
};

function LargeButton({ type, children, disabled, onClick }: LargeButtonProps) {
  return (
    <Container $disabled={disabled}>
      <button type={type === 'button' ? 'button' : 'submit'} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </Container>
  );
}

export default LargeButton;

const Container = styled.div<{ $disabled: boolean }>`
  width: 288px;
  height: 48px;
  border-radius: 8px;
  box-shadow: ${(props) => !props.$disabled && `8px 4px 20px 0px ${props.theme.colors.mainMintShadow}`};

  button {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
    background: ${(props) => props.theme.gradation.mainMintGra};
    cursor: pointer;

    color: ${(props) => props.theme.colors.grayScale09};
    font-family: NanumSquareNeo;
    font-size: 16px;
    font-weight: 700;

    &:hover {
      background: ${(props) => props.theme.gradation.mainMintDarkGra};
    }
  }

  button:disabled {
    background: ${(props) => props.theme.colors.grayScale06};
    cursor: default;
  }
`;
