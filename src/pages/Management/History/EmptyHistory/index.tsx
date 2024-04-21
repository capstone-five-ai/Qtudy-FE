import { useNavigate } from 'react-router';
import styled from 'styled-components';
import CTAButton from '../../../../components/Button/CTAButton';
import Empty1 from '../../../../components/Empty/Empty1';

function EmptyHistory() {
  const navigate = useNavigate();
  return (
    <Container>
      <Empty1 title="아직 생성된 AI 퀴즈 및 요약이 없어요" highlight="AI 퀴즈 및 요약" />
      <ButtonContainer>
        <CTAButton onClick={() => navigate('/quiz/ai')}>AI 퀴즈 생성하러 가기</CTAButton>
        <CTAButton onClick={() => navigate('/summary/ai')}>AI 요약 생성하러 가기</CTAButton>
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
