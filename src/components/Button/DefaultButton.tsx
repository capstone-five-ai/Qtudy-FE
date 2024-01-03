import styled from 'styled-components';
import React, { MouseEventHandler } from 'react';
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
  onClick?: MouseEventHandler<HTMLButtonElement>;
  theme?: 'mint' | 'gray';
  icon?: React.ReactNode | null;
  children: React.ReactNode;
}

DefaultButton.defaultProps = {
  size: 'medium',
  disabled: false,
  onClick() {},
  theme: 'mint',
  icon: null,
};

function DefaultButton({
  size = 'medium',
  disabled = false,
  onClick,
  theme = 'mint',
  icon,
  children,
}: DefaultButtonProps) {
  return (
    <Container
      $disabled={disabled}
      $theme={theme}
      $style={buttonStyle.find((el) => el.type === size) || buttonStyle[1]}
    >
      <button type="button" disabled={disabled} onClick={onClick as MouseEventHandler<HTMLButtonElement>}>
        {icon}
        <Typography variant="button" color={theme === 'mint' ? 'grayScale09' : 'grayScale02'}>
          {children}
        </Typography>
      </button>
    </Container>
  );
}

export default DefaultButton;

const Container = styled.div<{ $disabled: boolean; $style: Style; $theme: 'mint' | 'gray' }>`
  width: ${(props) => props.$style.width}px;
  height: ${(props) => props.$style.height}px;
  border-radius: 8px;
  ${(props) =>
    props.$theme === 'mint' && !props.$disabled && `box-shadow: 8px 4px 20px 0px ${props.theme.colors.mainMintShadow}`};
  ${({ $theme }) => $theme === 'gray' && 'box-shadow: 4px 2px 16px 0px rgba(189, 189, 189, 0.28);'}

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    width: 100%;
    height: 100%;
    border: ${({ $theme }) => ($theme === 'gray' ? '0.8px solid #E0E0E0' : 'none')};
    border-radius: 8px;
    background: ${(props) =>
      props.$theme === 'mint' ? props.theme.gradation.mainMintGra : props.theme.colors.grayScale08};
    cursor: pointer;

    &:hover {
      background: ${(props) =>
        props.$theme === 'mint' ? props.theme.gradation.mainMintDarkGra : props.theme.colors.grayScale07};
    }
  }

  button:disabled {
    background: ${(props) => props.theme.colors.grayScale06};
    cursor: default;
  }
`;
