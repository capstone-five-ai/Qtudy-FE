import { DefaultTheme } from 'styled-components';

// 예시. 디자인에 따라 변경 필요
const colors = {
  header: '#1565C0',
  primary: '#2196F3',
  white: '#ffffff',
  black: '#000000',
  border: '#E5E5E5',
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
