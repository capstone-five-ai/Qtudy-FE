import styled from 'styled-components';
import Typography from '../../../components/Typography';
import { CategoryType } from '../../../types';
import { ReactComponent as NoneIcon } from '../../../assets/icons/icon-none.svg';

const TEXT = { 퀴즈: '아직 생성된 퀴즈가 없어요', 요약: '아직 생성된 요약이 없어요' };

function NoItem({ categoryType }: { categoryType: CategoryType }) {
  return (
    <Container>
      <div className="text-container">
        <Typography variant="h3" color="grayScale03">
          {TEXT[categoryType]}
        </Typography>
        <NoneIcon />
        <Highlight />
      </div>
    </Container>
  );
}

export default NoItem;

const Container = styled.div`
  width: 100%;
  height: 100%;
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
`;

const Highlight = styled.div`
  width: 31px;
  height: 6px;
  background: ${(props) => props.theme.colors.mainMint};
  opacity: 0.2;

  position: absolute;
  bottom: 0;
  left: 83.5px;
  z-index: 1;
`;
