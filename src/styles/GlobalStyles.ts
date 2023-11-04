import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import NotoSansBold from '../assets/fonts/NotoSansKR-Bold.woff';
import NotoSansMedium from '../assets/fonts/NotoSansKR-Medium.woff';
import NotoSansRegular from '../assets/fonts/NotoSansKR-Regular.woff';
import NanumSquareNeo from '../assets/fonts/NanumSquareNeo-Variable.woff';

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: NotoSansRegular;
    src: url(${NotoSansRegular}) format('woff');
    font-style: normal;
  }
  @font-face {
    font-family: NotoSansMedium;
    src: url(${NotoSansMedium}) format('woff');
    font-style: normal;
  }
  @font-face {
    font-family: NotoSansBold;
    src: url(${NotoSansBold}) format('woff');
    font-style: normal;
  }
  @font-face {
    font-family: NanumSquareNeo;
    src: url(${NanumSquareNeo}) format('woff');
    font-style: normal;
  }
`;

export default GlobalStyles;
