import NanumSquareNeoBold from '@/assets/fonts/NanumSqureNeo/NanumSquareNeo-Bold.woff2';
import NanumSquareNeoExtraBold from '@/assets/fonts/NanumSqureNeo/NanumSquareNeo-ExtraBold.woff2';
import NotoSansKRBold from '@/assets/fonts/NotoSansKR/NotoSans-Bold.woff2';
import NotoSansKRMedium from '@/assets/fonts/NotoSansKR/NotoSans-Medium.woff2';
import NotoSansKRRegular from '@/assets/fonts/NotoSansKR/NotoSans-Regular.woff2';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

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

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url('${NotoSansKRBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url('${NotoSansKRMedium}) format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url('${NotoSansKRRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Nanum Square Neo';
    src: url('${NanumSquareNeoExtraBold}) format('woff2');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'Nanum Square Neo';
    src: url('${NanumSquareNeoBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
  }
`;

export default GlobalStyles;
