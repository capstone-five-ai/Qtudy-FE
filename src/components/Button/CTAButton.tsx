import styled, { css } from 'styled-components';
import React from 'react';
import Typography from '../Typography';

interface SizeStyle {
  type: string;
  width: number;
  height: number;
}

const buttonSizeStyle: SizeStyle[] = [
  {
    type: 'large',
    width: 360,
    height: 48,
  },
  { type: 'medium', width: 288, height: 48 },
  { type: 'small', width: 100, height: 40 },
];

interface CTAButtonProps {
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  theme?: 'mint' | 'gray';
  icon?: React.ReactNode | null;
  children: React.ReactNode;
}

CTAButton.defaultProps = {
  size: 'medium',
  disabled: false,
  onClick() {},
  theme: 'mint',
  icon: null,
};

function CTAButton({ size = 'medium', disabled = false, onClick, theme = 'mint', icon, children }: CTAButtonProps) {
  /* return (
    <Container
      $disabled={disabled}
      $theme={theme}
      $style={buttonSizeStyle.find((el) => el.type === size) || buttonSizeStyle[1]}
    >
      <button type="button" disabled={disabled} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}>
        {icon}
        <Typography variant="button" color={theme === 'mint' ? 'grayScale09' : 'grayScale02'}>
          {children}
        </Typography>
      </button>
    </Container>
  ); */

  return (
    <StyledButton
      type="button"
      $disabled={disabled}
      $theme={theme}
      $style={buttonSizeStyle.find((el) => el.type === size) || buttonSizeStyle[1]}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {icon}
      <Typography variant="button" color={theme === 'gray' && !disabled ? 'grayScale02' : 'grayScale09'}>
        {children}
      </Typography>
    </StyledButton>
  );
}

export default CTAButton;

const StyledButton = styled.button<{ $disabled: boolean; $style: SizeStyle; $theme: 'mint' | 'gray' }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: ${({ $style }) => $style.width}px;
  height: ${({ $style }) => $style.height}px;

  border-radius: 8px;
  border: ${({ $theme }) => ($theme === 'gray' ? '0.8px solid #E0E0E0' : 'none')};

  background: ${(props) =>
    props.$theme === 'mint' ? props.theme.gradation.mainMintGra : props.theme.colors.grayScale08};
  cursor: pointer;

  ${(props) =>
    props.$disabled &&
    css`
      background: ${props.theme.colors.grayScale06};
      cursor: default;
    `}

  ${(props) =>
    props.$theme === 'mint' && !props.$disabled && `box-shadow: 4px 4px 16px 0px ${props.theme.colors.mainMintShadow}`};
  ${(props) =>
    props.$theme === 'gray' && !props.$disabled && 'box-shadow: 4px 2px 16px 0px rgba(189, 189, 189, 0.28);'};

  &:hover {
    ${(props) =>
      props.$theme === 'gray' &&
      css`
        background: ${props.theme.colors.grayScale07};
        box-shadow: 4px 2px 16px 0px rgba(142, 142, 142, 0.28);
      `}
    ${(props) =>
      props.$theme === 'mint' &&
      css`
        background: ${props.theme.gradation.mainMintDarkGra};
        box-shadow: 4px 2px 16px 0px ${props.theme.colors.mainMintShadow};
      `}
  }
`;
