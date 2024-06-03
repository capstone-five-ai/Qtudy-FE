import { ReactComponent as EmptyIcon } from '@/assets/icons/chat.svg';
import PlainButton from '@/components/Button/PlainButton';
import Typography from '@/components/Typography/Typography';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function NoCategorySection() {
  const navigate = useNavigate();

  return (
    <Container>
      <div />
      <div className="text-container">
        <div className="main-text">
          <EmptyIcon />
          <Typography variant="h2" color="grayScale03">
            아직 생성된 카테고리가 없어요
          </Typography>
          <Highlight />
        </div>
        <Typography variant="detail" color="grayScale03">
          퀴즈 및 요약을 생성하고 카테고리에 저장해보세요
        </Typography>
      </div>
      <PlainButton onClick={() => navigate('/management/category?type=quiz')}>
        카테고리 먼저 만들기
      </PlainButton>
    </Container>
  );
}

export default NoCategorySection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 156px;
  max-height: calc(100vh - 65px - 190px);
  min-height: 572px;
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

const Highlight = styled.div`
  width: 69px;
  height: 6px;
  background: ${(props) => props.theme.colors.mainMint};
  opacity: 0.2;

  position: absolute;
  bottom: 0;
  right: 73px;
  z-index: 1;
`;
