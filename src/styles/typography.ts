interface Typography {
  font: string;
  weight?: number;
  size: number;
  lineHeight?: number;
  letterSpacing?: number;
}

const TYPOGRAPHY = ({
  font,
  weight,
  size,
  lineHeight,
  letterSpacing,
}: Typography) => {
  return `
    font-family: '${font}', sans-serif;
    font-weight: ${weight};
    font-size: ${size}px;
    line-height: ${lineHeight ? `${lineHeight}%` : 'normal'};
    letter-spacing: ${letterSpacing ? `${letterSpacing}px` : 'normal'};
  `;
};

const typography = {
  h1: TYPOGRAPHY({
    font: 'NanumSquareNeoExtraBold',
    weight: 800,
    size: 20,
  }),
  h2: TYPOGRAPHY({
    font: 'NanumSquareNeoExtraBold',
    weight: 800,
    size: 18,
  }),
  h3: TYPOGRAPHY({
    font: 'NanumSquareNeoExtraBold',
    weight: 800,
    size: 16,
    letterSpacing: 0.32,
  }),
  h4: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 500,
    size: 15,
    lineHeight: 160,
  }),
  subtitle: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 500,
    size: 14,
  }),
  subtitle2: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 700,
    size: 14,
  }),
  body1: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 500,
    size: 14,
    lineHeight: 160,
  }),
  body2: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 400,
    size: 14,
  }),
  body3: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 400,
    size: 14,
    lineHeight: 180,
    letterSpacing: 0.32,
  }),
  detail: TYPOGRAPHY({
    font: 'NanumSquareNeoBold',
    weight: 700,
    size: 13,
    letterSpacing: 0.32,
  }),
  caption1: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 700,
    size: 13,
  }),
  caption2: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 500,
    size: 13,
  }),
  caption3: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 400,
    size: 13,
  }),
  caption4: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 400,
    size: 11,
  }),
  button: TYPOGRAPHY({
    font: 'NanumSquareNeoExtraBold',
    weight: 800,
    size: 14,
  }),
};

export default typography;
