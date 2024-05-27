import 'styled-components';
import { ColorsTypes, FontSizeTypes, GradationTypes, TypographyTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fontSize: FontSizeTypes;
    gradation: GradationTypes;
    typography: TypographyTypes;
  }
}
