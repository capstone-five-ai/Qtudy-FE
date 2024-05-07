import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import NotoSansBold from '../assets/fonts/NotoSansKR-Bold.woff';
import NotoSansMedium from '../assets/fonts/NotoSansKR-Medium.woff';
import NotoSansRegular from '../assets/fonts/NotoSansKR-Regular.woff';
import NanumSquareNeoEB from '../assets/fonts/NanumSquareNeoTTF-dEb.woff';
import NanumSquareNeoB from '../assets/fonts/NanumSquareNeoTTF-cBd.woff';

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
    font-family: 'Noto Sans KR';
    src: url('${NotoSansRegular}') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url('${NotoSansMedium}') format('woff');
    font-weight: 500;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Noto Sans KR';
    src: url('${NotoSansBold}') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Nanum Square Neo';
    src: url('${NanumSquareNeoEB}') format('woff');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'Nanum Square Neo';
    src: url('${NanumSquareNeoB}') format('woff');
    font-weight: 700;
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
