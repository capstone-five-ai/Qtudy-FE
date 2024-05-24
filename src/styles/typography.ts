interface Typography {
  font: string;
  weight?: number;
  size: number;
  lineHeight?: number;
  letterSpacing: number;
}

const TYPOGRAPHY = ({
  font,
  weight,
  size,
  lineHeight,
  letterSpacing,
}: Typography) => {
  return `
    font-family: "${font}", sans-serif;
    font-weight: ${weight};
    font-size: ${size}px;
    line-height: ${lineHeight ? `${lineHeight}%` : 'auto'};
    letter-spacing: ${letterSpacing}%;
  `;
};

const typography = {
  h1: TYPOGRAPHY({
    font: 'Nanum Square Neo',
    weight: 800,
    size: 20,
    letterSpacing: 0,
  }),
  h2: TYPOGRAPHY({
    font: 'Nanum Square Neo',
    weight: 800,
    size: 18,
    letterSpacing: 0,
  }),
  h3: TYPOGRAPHY({
    font: 'Nanum Square Neo',
    weight: 800,
    size: 16,
    letterSpacing: 2,
  }),
  h4: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 500,
    size: 16,
    letterSpacing: 0,
  }),
  subtitle: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 500,
    size: 14,
    letterSpacing: 0,
  }),
  body1: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 500,
    size: 14,
    lineHeight: 160,
    letterSpacing: 0,
  }),
  body2: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 400,
    size: 14,
    letterSpacing: 0,
  }),
  body3: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 400,
    size: 14,
    lineHeight: 180,
    letterSpacing: 2,
  }),
  detail: TYPOGRAPHY({
    font: 'Nanum Square Neo',
    weight: 700,
    size: 13,
    letterSpacing: 2,
  }),
  caption1: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 700,
    size: 13,
    letterSpacing: 0,
  }),
  caption2: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 500,
    size: 13,
    letterSpacing: 0,
  }),
  caption3: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 400,
    size: 13,
    letterSpacing: 0,
  }),
  caption4: TYPOGRAPHY({
    font: 'Noto Sans KR',
    weight: 400,
    size: 11,
    letterSpacing: 0,
  }),
  button: TYPOGRAPHY({
    font: 'Nanum Square Neo',
    weight: 800,
    size: 14,
    letterSpacing: 0,
  }),
};

export default typography;
