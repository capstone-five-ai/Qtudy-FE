import styled from 'styled-components';

type ButtonType = JSX.IntrinsicElements['button']['type'];

interface LargeButtonProps {
  type: ButtonType;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

function LargeButton({ type, children, disabled = false, onClick }: LargeButtonProps) {
  return (
    <Container>
      <button type={type === 'button' ? 'button' : 'submit'} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </Container>
  );
}

LargeButton.defaultProps = {
  disabled: false,
  onClick() {},
};

export default LargeButton;

const Container = styled.div`
  width: 288px;
  height: 48px;
  border-radius: 8px;
  box-shadow: 8px 4px 20px 0px rgba(54, 189, 180, 0.32);

  button {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
    background: ${(props) => props.theme.colors.mainMint};
    cursor: pointer;

    color: ${(props) => props.theme.colors.grayScale09};
    font-family: NanumSquareNeo;
    font-size: 16px;
    font-weight: 700;

    &:hover {
      background: ${(props) => props.theme.colors.mainMintDark};
    }
  }

  button:disabled {
    background: ${(props) => props.theme.colors.grayScale06};
    cursor: default;
  }
`;
