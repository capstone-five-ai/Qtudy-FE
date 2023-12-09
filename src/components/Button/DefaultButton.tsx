import styled from 'styled-components';
import Typography from '../Typography';

interface Style {
  type: string;
  width: number;
  height: number;
}

const buttonStyle: Style[] = [
  {
    type: 'large',
    width: 360,
    height: 48,
  },
  { type: 'medium', width: 288, height: 48 },
  { type: 'small', width: 100, height: 40 },
];

interface DefaultButtonProps {
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

DefaultButton.defaultProps = {
  size: 'medium',
  disabled: false,
  onClick() {},
};

function DefaultButton({ size = 'medium', disabled = false, onClick, children }: DefaultButtonProps) {
  console.log(size);
  return (
    <Container $disabled={disabled} $style={buttonStyle.find((el) => el.type === size) || buttonStyle[1]}>
      <button type="button" disabled={disabled} onClick={onClick}>
        <Typography variant="button" color="grayScale09">
          {children}
        </Typography>
      </button>
    </Container>
  );
}

export default DefaultButton;

const Container = styled.div<{ $disabled: boolean; $style: Style }>`
  width: ${(props) => props.$style.width}px;
  height: ${(props) => props.$style.height}px;
  border-radius: 8px;
  box-shadow: ${(props) => !props.$disabled && `8px 4px 20px 0px ${props.theme.colors.mainMintShadow}`};

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
    background: ${(props) => props.theme.gradation.mainMintGra};
    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme.gradation.mainMintDarkGra};
    }
  }

  button:disabled {
    background: ${(props) => props.theme.colors.grayScale06};
    cursor: default;
  }
`;
