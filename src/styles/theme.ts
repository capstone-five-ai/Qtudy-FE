import { DefaultTheme } from 'styled-components';

const colors = {
  /** Brand Colors */
  mainMint: '#3ED7CD',
  mainMintDark: '#36BDB4',
  mainMintLight: '#FBFFFF',

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
};

const fontSize = {
  title: 20,
  subTitle: 16,
  text: 14,
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;

const theme: DefaultTheme = {
  colors,
  fontSize,
};

export default theme;
