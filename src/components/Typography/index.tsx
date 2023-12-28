import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { ColorsTypes } from '../../styles/theme';

const NotoSansRegular = 'NotoSansRegular';
const NotoSansMedium = 'NotoSansMedium';
const NotoSansBold = 'NotoSansBold';

const NanumSquareBold = 'NanumSquareBold';
const NanumSquareExtraBold = 'NanumSquareExtraBold';

interface Style {
  type: string;
  font: string;
  size: number;
  lineHeight: string;
  letterSpacing: number;
}

const typographies: Style[] = [
  {
    type: 'h1',
    font: NanumSquareExtraBold,
    size: 20,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'h2',
    font: NanumSquareExtraBold,
    size: 18,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'h3',
    font: NanumSquareExtraBold,
    size: 16,
    lineHeight: 'auto',
    letterSpacing: 2,
  },
  {
    type: 'h4',
    font: NotoSansMedium,
    size: 16,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'subtitle',
    font: NotoSansMedium,
    size: 14,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'body1',
    font: NotoSansMedium,
    size: 14,
    lineHeight: '160%',
    letterSpacing: 0,
  },
  {
    type: 'body2',
    font: NotoSansRegular,
    size: 14,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'body3',
    font: NotoSansRegular,
    size: 14,
    lineHeight: '180%',
    letterSpacing: 2,
  },
  {
    type: 'detail',
    font: NanumSquareBold,
    size: 13,
    lineHeight: 'auto',
    letterSpacing: 2,
  },
  {
    type: 'caption1',
    font: NotoSansBold,
    size: 13,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'caption2',
    font: NotoSansMedium,
    size: 13,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'caption3',
    font: NotoSansRegular,
    size: 13,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'caption4',
    font: NotoSansRegular,
    size: 11,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'button',
    font: NanumSquareExtraBold,
    size: 14,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'default',
    font: '',
    size: 14.5,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
];

const defaultStyle: Style = {
  type: 'body1',
  font: NotoSansRegular,
  size: 14,
  lineHeight: 'auto',
  letterSpacing: 0,
};

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
  font-family: ${(props) => props.$style.font};
  font-size: ${(props) => props.$style.size}px;
  line-height: ${(props) => props.$style.lineHeight};
  letter-spacing: ${(props) => props.$style.letterSpacing}%;

  color: ${(props) => props.$color && props.theme.colors[props.$color]};

  &:hover {
    color: ${(props) => props.$hoverColor && props.theme.colors[props.$hoverColor]};
    ${(props) =>
      props.$hoverStyle &&
      css`
        font-family: ${props.$hoverStyle.font};
        font-size: ${props.$hoverStyle.size}px;
        line-height: ${props.$hoverStyle.lineHeight};
        letter-spacing: ${props.$hoverStyle.letterSpacing}%;
      `}
  }
`;

export default Typography;
