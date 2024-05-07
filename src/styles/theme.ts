import { DefaultTheme } from 'styled-components';
import colors from './color';
import typography from './typography';

const fontSize = {
  title: 20,
  subTitle: 16,
  text: 14,
};

const gradation = {
  mainMintGra: 'linear-gradient(rgba(62, 215, 205, 0.6), rgba(62, 215, 205, 1))',
  mainMintDarkGra: 'linear-gradient(rgba(54, 189, 180, 0.6), rgba(54, 189, 180, 1))',
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;
export type GradationTypes = typeof gradation;
export type TypographyTypes = typeof typography;

const theme: DefaultTheme = {
  colors,
  fontSize,
  gradation,
  typography,
};

export default theme;
