import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import DefaultButton from '../../../../components/Button/DefaultButton';
import Empty1 from '../../../../components/Empty/Empty1';

interface Props {
  type: 'all' | 'quiz' | 'summary';
}

function EmptyHistory({ type }: Props) {
  const navigate = useNavigate();
  const highlight = (function getHighlight() {
    if (type === 'quiz') return 'AI 퀴즈';
    if (type === 'summary') return 'AI 요약';
    return 'AI 퀴즈 및 요약';
  })();

  const title = `아직 생성된 ${highlight}${type === 'quiz' ? '가' : '이'} 없어요`;

  return (
    <Container>
      <Empty1 title={title} highlight={highlight} />
      <ButtonContainer>
        {(type === 'all' || type === 'quiz') && (
          <DefaultButton onClick={() => navigate('/quiz/ai')}>AI 퀴즈 생성하러 가기</DefaultButton>
        )}
        {(type === 'all' || type === 'summary') && (
          <DefaultButton onClick={() => navigate('/summary/ai')}>AI 요약 생성하러 가기</DefaultButton>
        )}
      </ButtonContainer>
    </Container>
  );
}

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

export default EmptyHistory;
