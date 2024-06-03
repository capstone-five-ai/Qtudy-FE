import Typography from '@/components/Typography/Typography';
import { TypographyProps } from '@/types/typography.type';
import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface HighlightedProps {
  children: ReactNode;
}

function Highlighted({
  children,
  ...props
}: HighlightedProps & TypographyProps) {
  return (
    <Wrapper>
      <Typography {...props}>{children}</Typography>
      <Highlight />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  position: relative;

  > div {
    z-index: 2;
  }
`;

const Highlight = styled.span`
  width: 100%;
  height: 6px;
  background: ${(props) => props.theme.colors.mainMint};
  opacity: 0.2;

  position: absolute;
  bottom: 0;
  /* right: 73px; */
  z-index: 1;
`;

export default Highlighted;
