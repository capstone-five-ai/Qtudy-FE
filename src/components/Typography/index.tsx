import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { ColorsTypes } from '../../styles/theme';
import { Style, defaultStyle, typographies } from '../../types/typography';

function Typography({
  children,
  component,
  variant,
  color,
  hoverVariant,
  hoverColor,
}: {
  children?: ReactNode;
  component?: string;
  variant: string;
  color?: keyof ColorsTypes;
  hoverVariant?: string;
  hoverColor?: keyof ColorsTypes;
}) {
  return (
    <STypography
      as={component}
      $style={typographies.find((el) => el.type === variant) || defaultStyle}
      $color={color}
      $hoverStyle={typographies.find((el) => el.type === hoverVariant)}
      $hoverColor={hoverColor}
      className="typography"
    >
      {children}
    </STypography>
  );
}

Typography.defaultProps = {
  children: null,
  component: 'div',
  color: 'grayScale02',
  hoverVariant: undefined,
  hoverColor: undefined,
};

const STypography = styled.div<{
  $style: Style;
  $color: keyof ColorsTypes | undefined;
  $hoverStyle: Style | undefined;
  $hoverColor: keyof ColorsTypes | undefined;
}>`
  font-family: '${(props) => props.$style.font}', sans-serif;
  font-size: ${(props) => props.$style.size}px;
  font-weight: ${(props) => props.$style.weight};
  line-height: ${(props) => props.$style.lineHeight};
  letter-spacing: ${(props) => props.$style.letterSpacing}%;

  color: ${(props) => props.$color && props.theme.colors[props.$color]};

  &:hover {
    color: ${(props) => props.$hoverColor && props.theme.colors[props.$hoverColor]};
    ${(props) =>
      props.$hoverStyle &&
      css`
        font-family: '${props.$hoverStyle.font}';
        font-size: ${props.$hoverStyle.size}px;
        font-weight: ${props.$style.weight};
        line-height: ${props.$hoverStyle.lineHeight};
        letter-spacing: ${props.$hoverStyle.letterSpacing}%;
      `}
  }
`;

export default Typography;
