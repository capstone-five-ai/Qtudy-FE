import { ColorsTypes } from '@/styles/theme';
import { ReactNode } from 'react';

export interface Style {
  type: string;
  font: string;
  size: number;
  weight: number;
  lineHeight: string;
  letterSpacing: number;
}

export const typographies: Style[] = [
  {
    type: 'h1',
    font: 'NanumSquareNeoExtraBold',
    size: 20,
    weight: 800,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'h2',
    font: 'NanumSquareNeoExtraBold',
    size: 18,
    weight: 800,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'h3',
    font: 'NanumSquareNeoExtraBold',
    size: 16,
    weight: 800,
    lineHeight: 'auto',
    letterSpacing: 2,
  },
  {
    type: 'h4',
    font: 'Noto Sans KR',
    size: 16,
    weight: 500,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'subtitle',
    font: 'Noto Sans KR',
    size: 14,
    weight: 500,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'subtitle2',
    font: 'Noto Sans KR',
    size: 14,
    weight: 500,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'body1',
    font: 'Noto Sans KR',
    size: 14,
    weight: 500,
    lineHeight: '160%',
    letterSpacing: 0,
  },
  {
    type: 'body2',
    font: 'Noto Sans KR',
    size: 14,
    weight: 400,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'body3',
    font: 'Noto Sans KR',
    size: 14,
    weight: 400,
    lineHeight: '180%',
    letterSpacing: 2,
  },
  {
    type: 'detail',
    font: 'NanumSquareNeoBold',
    size: 13,
    weight: 700,
    lineHeight: 'auto',
    letterSpacing: 2,
  },
  {
    type: 'caption1',
    font: 'Noto Sans KR',
    size: 13,
    weight: 700,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'caption2',
    font: 'Noto Sans KR',
    size: 13,
    weight: 500,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'caption3',
    font: 'Noto Sans KR',
    size: 13,
    weight: 400,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'caption4',
    font: 'Noto Sans KR',
    size: 11,
    weight: 400,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'button',
    font: 'NanumSquareNeoExtraBold',
    size: 14,
    weight: 800,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
  {
    type: 'default',
    font: '',
    size: 14.5,
    weight: 500,
    lineHeight: 'auto',
    letterSpacing: 0,
  },
];

export const defaultStyle: Style = {
  type: 'body1',
  font: 'Noto Sans KR',
  size: 14,
  weight: 400,
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
