import styled from 'styled-components';
import { ReactComponent as TestIcon } from '../../../assets/icons/icon-upload.svg';
import Typography from '../../../components/Typography';
import DefaultButton from '../../../components/Button/DefaultButton';

function NoCategory() {
  const handleAddCategory = () => {
    // TODO: 카테고리 생성 API 연결
  };

  return (
    <Container>
      <div className="text-container">
        <div className="main-text">
          <TestIcon style={{ marginBottom: '16' }} />
          <Typography variant="h2" color="grayScale03">
            아직 생성된 카테고리가 없어요
          </Typography>
          <Highlight />
        </div>
        <Typography variant="detail" color="grayScale03">
          퀴즈 및 요약을 생성하고 카테고리에 저장해보세요
        </Typography>
      </div>
      <DefaultButton onClick={handleAddCategory}>카테고리 먼저 만들기</DefaultButton>
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

    .main-text {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: max-content;
      margin-top: 160px;
      margin-bottom: 24px;
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
