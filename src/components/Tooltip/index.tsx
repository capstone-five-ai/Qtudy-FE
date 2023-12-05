import styled from 'styled-components';
import { ReactComponent as TooltipIcon } from '../../assets/icons/icon-tooltip.svg';
import Typography from '../Typography';

function Tooltip() {
  return (
    <Container>
      <TooltipContainer>
        <Typography variant="detail" color="mainMintDark">
          생성 후에는 여기서 편집이 가능해요!
        </Typography>
        <TooltipIcon style={{ position: 'relative' }} />
      </TooltipContainer>
    </Container>
  );
}

export default Tooltip;

const Container = styled.div`
  position: absolute;
  top: 5px;
  right: -40px;
`;

const TooltipContainer = styled.div`
  position: relative;

  & > div {
    position: absolute;
    left: 40px;
    bottom: 36px;
    z-index: 1;
  }
`;
