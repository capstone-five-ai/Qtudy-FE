import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import NanumSquareBold from '../assets/fonts/NanumSquareNeo/NanumSquareNeoTTF-cBd.woff';
import NanumSquareExtraBold from '../assets/fonts/NanumSquareNeo/NanumSquareNeoTTF-dEb.woff';

import NanumSquareBold2 from '../assets/fonts/NanumSquareNeo/NanumSquareNeoTTF-cBd.woff2';
import NanumSquareExtraBold2 from '../assets/fonts/NanumSquareNeo/NanumSquareNeoTTF-dEb.woff2';

import NotoSansBold from '../assets/fonts/NotoSansKR/NotoSansKR-Bold.woff';
import NotoSansMedium from '../assets/fonts/NotoSansKR/NotoSansKR-Medium.woff';
import NotoSansRegular from '../assets/fonts/NotoSansKR/NotoSansKR-Regular.woff';

import NotoSansBold2 from '../assets/fonts/NotoSansKR/NotoSansKR-Bold.woff2';
import NotoSansMedium2 from '../assets/fonts/NotoSansKR/NotoSansKR-Medium.woff2';
import NotoSansRegular2 from '../assets/fonts/NotoSansKR/NotoSansKR-Regular.woff2';

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
    src: url(${NotoSansRegular2}) format('woff2'),
      url(${NotoSansRegular}) format('woff');
    font-style: normal;
  }

  @font-face {
    font-family: NotoSansMedium;
    src: url(${NotoSansMedium2}) format('woff2'),
      url(${NotoSansMedium}) format('woff');
    font-style: normal;
  }
  
  @font-face {
    font-family: NotoSansBold;
    src: url(${NotoSansBold2}) format('woff2'),
      url(${NotoSansBold}) format('woff');
    font-style: normal;
  }

  @font-face {
    font-family: NanumSquareBold;
    src: url(${NanumSquareBold2}) format('woff2'),
      url(${NanumSquareBold}) format('woff');
    font-style: normal;
  }

  @font-face {
    font-family: NanumSquareExtraBold;
    src: url(${NanumSquareExtraBold2}) format('woff2'),
      url(${NanumSquareExtraBold}) format('woff');
    font-style: normal;
  }
`;

export default GlobalStyles;
