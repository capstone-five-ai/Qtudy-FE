import { ReactComponent as EmptyIcon } from '@/assets/icons/chat.svg';
import PlainButton from '@/components/Button/PlainButton';
import Highlighted from '@/components/Typography/Highlighted';
import Typography from '@/components/Typography/Typography';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

interface Props {
  type: 'ALL' | 'QUIZ' | 'SUMMARY';
}

function EmptyHistory({ type }: Props) {
  const navigate = useNavigate();
  const highlight = (function getHighlight() {
    if (type === 'QUIZ') return 'AI 퀴즈';
    if (type === 'SUMMARY') return 'AI 요약';
    return 'AI 퀴즈 및 요약';
  })();

  const title = `아직 생성된 ${highlight}${type === 'QUIZ' ? '가' : '이'} 없어요`;

  const highlightedText = useCallback((text: string, query: string) => {
    if (query !== '' && text.includes(query)) {
      const parts = text.split(new RegExp(`(${query})`, 'gi'));

      return (
        <TitleWrapper>
          {parts.map((part) => {
            const formattedPart = part.startsWith(' ')
              ? `&nbsp;${part.trim()}`
              : part;
            const finalPart = formattedPart.endsWith(' ')
              ? `${formattedPart.trim()}&nbsp;`
              : formattedPart;

            return part === query ? (
              <Highlighted key={part} variant="h2" color="grayScale03">
                {part}
              </Highlighted>
            ) : (
              // eslint-disable-next-line react/no-danger
              <span
                key={finalPart}
                dangerouslySetInnerHTML={{ __html: finalPart }}
              />
            );
          })}
        </TitleWrapper>
      );
    }

    return text;
  }, []);

  return (
    <Container>
      <TextContainer>
        <div />
        <div className="text-container">
          <div className="main-text">
            <EmptyIcon />
            <Typography variant="h2" color="grayScale03">
              {highlight ? highlightedText(title, highlight) : title}
            </Typography>
          </div>
        </div>
      </TextContainer>
      <ButtonContainer>
        {(type === 'ALL' || type === 'QUIZ') && (
          <PlainButton onClick={() => navigate('/quiz/ai')}>
            AI 퀴즈 생성하러 가기
          </PlainButton>
        )}
        {(type === 'ALL' || type === 'SUMMARY') && (
          <PlainButton onClick={() => navigate('/summary/ai')}>
            AI 요약 생성하러 가기
          </PlainButton>
        )}
      </ButtonContainer>
    </Container>
  );
}

export default EmptyHistory;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 156px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
`;

const TitleWrapper = styled.div`
  display: flex;
`;

const TextContainer = styled.div`
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
