import { DefaultTheme } from 'styled-components';

const colors = {
  /** Brand Colors */
  mainMint: '#3ED7CD',
  mainMintDark: '#36BDB4',
  mainMintLight: '#FBFFFF',
  mainMintShadow: 'rgba(54, 189, 180, 0.32)',

  /** Grayscale Colors */
  grayScale01: '#000000',
  grayScale02: '#424242',
  grayScale03: '#757575',
  grayScale04: '#9e9e9e',
  grayScale05: '#bdbdbd',
  grayScale06: '#e0e0e0',
  grayScale07: '#fafafa',
  grayScale08: '#fcfcfc',
  grayScale09: '#ffffff',

  /** Kakao Colors */
  kakaoYellow: '#FEE500',
  kakaoBlack: '#000000',

  /** Error Colors */
  errorRed: '#ee0000',
};

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

const theme: DefaultTheme = {
  colors,
  fontSize,
  gradation,
};

export default theme;
