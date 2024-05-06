import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import NanumSquareBold from '../assets/fonts/NanumSquareNeoTTF-cBd.woff';
import NanumSquareExtraBold from '../assets/fonts/NanumSquareNeoTTF-dEb.woff';
import NotoSansBold from '../assets/fonts/NotoSansKR-Bold.woff';
import NotoSansMedium from '../assets/fonts/NotoSansKR-Medium.woff';
import NotoSansRegular from '../assets/fonts/NotoSansKR-Regular.woff';

const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }

  body {
    line-height: normal;
  }

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
    font-family: NanumSquareBold;
    src: url(${NanumSquareBold}) format('woff');
    font-style: normal;
  }

  @font-face {
    font-family: NanumSquareExtraBold;
    src: url(${NanumSquareExtraBold}) format('woff');
    font-style: normal;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
`;

export default GlobalStyles;
