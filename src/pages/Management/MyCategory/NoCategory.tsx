import styled from 'styled-components';
import { ReactComponent as TestIcon } from '../../../assets/icons/icon-upload.svg';
import Typography from '../../../components/Typography';
import DefaultButton from '../../../components/Button/DefaultButton';

interface NoCategoryProps {
  setShowNoCategoryView: React.Dispatch<React.SetStateAction<boolean>>;
}

function NoCategory({ setShowNoCategoryView }: NoCategoryProps) {
  return (
    <Container>
      <div />
      <div className="text-container">
        <div className="main-text">
          <TestIcon />
          <Typography variant="h2" color="grayScale03">
            아직 생성된 카테고리가 없어요
          </Typography>
          <Highlight />
        </div>
        <Typography variant="detail" color="grayScale03">
          퀴즈 및 요약을 생성하고 카테고리에 저장해보세요
        </Typography>
      </div>
      <DefaultButton onClick={() => setShowNoCategoryView(false)}>카테고리 먼저 만들기</DefaultButton>
    </Container>
  );
}

export default NoCategory;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 160px;
  max-height: calc(100vh - 65px - 190px);
  min-height: 572px;

  .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    .main-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: max-content;
      position: relative;

      & > div:nth-child(1) {
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
