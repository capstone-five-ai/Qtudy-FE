import { ReactComponent as NoneIcon } from '@/assets/icons/none.svg';
import Typography from '@/components/Typography/Typography';
import { ServiceType } from '@/types/category.type';
import styled from 'styled-components';

const TEXT = {
  QUIZ: '아직 생성된 퀴즈가 없어요',
  SUMMARY: '아직 생성된 요약이 없어요',
};

function NoItemSection({ categoryType }: { categoryType: ServiceType }) {
  return (
    <StyledContainer>
      <div className="text-container">
        <Typography variant="h3" color="grayScale03">
          {TEXT[categoryType]}
        </Typography>
        <NoneIcon />
        <Highlight />
      </div>
    </StyledContainer>
  );
}

export default NoItemSection;

const StyledContainer = styled.div`
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
