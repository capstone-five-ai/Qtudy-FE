import 'styled-components';
import { ColorsTypes, TypographyTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    typography: TypographyTypes;
  }
}
