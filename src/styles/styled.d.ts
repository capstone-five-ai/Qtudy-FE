import 'styled-components';
import { ColorsTypes, FontSizeTypes, GradationTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fontSize: FontSizeTypes;
    gradation: GradationTypes;
  }
}
