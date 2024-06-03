import { DefaultTheme } from 'styled-components';
import colors from './color';
import typography from './typography';

export type ColorsTypes = typeof colors;
export type TypographyTypes = typeof typography;

const theme: DefaultTheme = {
  colors,
  typography,
};

export default theme;
