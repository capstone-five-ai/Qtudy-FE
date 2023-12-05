import styled from 'styled-components';
import ContentWrapper from '../../../components/Wrapper/ContentWrapper';
import Typography from '../../../components/Typography';

function DefaultView() {
  return (
    <ContentWrapper>
      <Container>
        <Typography variant="detail" color="grayScale04">
          카테고리를 선택해주세요
        </Typography>
      </Container>
    </ContentWrapper>
  );
}

export default DefaultView;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
