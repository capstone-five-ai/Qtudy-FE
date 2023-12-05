import styled from 'styled-components';
import DefaultButton from '../../../components/Button/DefaultButton';
import Typography from '../../../components/Typography';
import { CategoryType } from '../../../types';
import { ReactComponent as NoneIcon } from '../../../assets/icons/icon-none.svg';

function NoItem({ categoryType }: { categoryType: CategoryType }) {
  const TEXT = { 퀴즈: '아직 생성된 퀴즈가 없어요', 요약: '아직 생성된 요약이 없어요' };

  const handleAddCategory = () => {
    // TODO: 카테고리 생성 API 연결
  };

  return (
    <Container>
      <div className="text-container">
        <Typography variant="h3" color="grayScale03">
          {TEXT[categoryType]}
        </Typography>
        <NoneIcon />
        <Highlight />
      </div>
      <div className="button-container">
        <DefaultButton size="large" onClick={handleAddCategory}>
          카테고리에 퀴즈 추가
        </DefaultButton>
      </div>
    </Container>
  );
}

export default NoItem;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .text-container {
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;

    & > div:nth-child(1) {
      position: relative;
      z-index: 2;
    }
  }

  .button-container {
    position: absolute;
    bottom: 32px;
  }
`;

const Highlight = styled.div`
  width: 32px;
  height: 6px;
  background: ${(props) => props.theme.colors.mainMint};
  opacity: 0.2;

  position: absolute;
  bottom: 0;
  left: 83px;
  z-index: 1;
`;
