import { useCallback } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as EmptyIcon } from '../../assets/icons/empty.svg';
import Typography from '../Typography';
import Highlighted from '../Typography/Highlighted';

interface Empty1Props {
  title: string;
  subtitle?: string;
  highlight?: string;
}

function Empty1({ title, subtitle, highlight }: Empty1Props) {
  const highlightedText = useCallback((text: string, query: string) => {
    if (query !== '' && text.includes(query)) {
      const parts = text.split(new RegExp(`(${query})`, 'gi'));

      return (
        <TitleWrapper>
          {parts.map((part) => {
            const formattedPart = part.startsWith(' ') ? `&nbsp;${part.trim()}` : part;
            const finalPart = formattedPart.endsWith(' ') ? `${formattedPart.trim()}&nbsp;` : formattedPart;

            return part === query ? (
              <Highlighted key={uuidv4()} variant="h2" color="grayScale03">
                {part}
              </Highlighted>
            ) : (
              // eslint-disable-next-line react/no-danger
              <span dangerouslySetInnerHTML={{ __html: finalPart }} />
            );
          })}
        </TitleWrapper>
      );
    }

    return text;
  }, []);

  return (
    <Container>
      <div />
      <div className="text-container">
        <div className="main-text">
          <EmptyIcon />
          <Typography variant="h2" color="grayScale03">
            {highlight ? highlightedText(title, highlight) : title}
          </Typography>
        </div>
        {subtitle && (
          <Typography variant="detail" color="grayScale03">
            {subtitle}
          </Typography>
        )}
      </div>
    </Container>
  );
}

Empty1.defaultProps = {
  subtitle: null,
  highlight: null,
};

const TitleWrapper = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 156px;
  position: relative;

  .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    position: relative;

    .main-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: max-content;
      position: relative;

      & > div:nth-child(2) {
        position: relative;
        z-index: 2;
      }
    }
  }
`;

export default Empty1;
