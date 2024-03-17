import { ReactNode } from 'react';
import { ColorsTypes } from '../styles/theme';

const NotoSansRegular = 'NotoSansRegular';
const NotoSansMedium = 'NotoSansMedium';
const NotoSansBold = 'NotoSansBold';

const NanumSquareBold = 'NanumSquareBold';
const NanumSquareExtraBold = 'NanumSquareExtraBold';

export interface Style {
  type: string;
  font: string;
  size: number;
  lineHeight: string;
  letterSpacing: number;
}

export const typographies: Style[] = [
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
    type: 'subtitle2',
    font: NotoSansBold,
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

export const defaultStyle: Style = {
  type: 'body1',
  font: NotoSansRegular,
  size: 14,
  lineHeight: 'auto',
  letterSpacing: 0,
};

export interface TypographyProps {
  children?: ReactNode;
  component?: string;
  variant: string;
  color?: keyof ColorsTypes;
  hoverVariant?: string;
  hoverColor?: keyof ColorsTypes;
}
