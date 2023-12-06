import styled from 'styled-components';
import Typography from '../../../components/Typography';

function DefaultView() {
  return (
    <Container>
      <Typography variant="detail" color="grayScale04">
        카테고리를 선택해주세요
      </Typography>
    </Container>
  );
}

export default DefaultView;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
