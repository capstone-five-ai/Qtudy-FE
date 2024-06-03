import NotoSansKRBold from '@/assets/fonts/NotoSans-Bold.woff2';
import NotoSansKRMedium from '@/assets/fonts/NotoSans-Medium.woff2';
import NotoSansKRRegular from '@/assets/fonts/NotoSans-Regular.woff2';
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

    &:disabled {
      cursor: default;
    }
  }

  input {
    border: none;
    background: none;
    outline: none;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url('${NotoSansKRBold}') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url('${NotoSansKRMedium}') format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url('${NotoSansKRRegular}') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
`;

export default GlobalStyles;
