import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as TwinkleIcon } from '../../assets/icons/icon-twinkle.svg';
import Typography from '../Typography';

type Props = {
  disabled: boolean;
  onClick?: () => void;
  children: ReactNode;
};

TwinkleButton.defaultProps = {
  onClick: null,
};

function TwinkleButton({ disabled, onClick, children }: Props) {
  return (
    <Container $disabled={disabled}>
      <button type="button" disabled={disabled} onClick={onClick}>
        <TwinkleIcon />
        <Typography variant="button" color="grayScale09">
          {children}
        </Typography>
      </button>
    </Container>
  );
}

const Container = styled.div<{ $disabled: boolean }>`
  width: 288px;
  height: 48px;
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

export default TwinkleButton;
