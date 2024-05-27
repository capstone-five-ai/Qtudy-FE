import styled from 'styled-components';
import { HeaderContentType } from '../../types';
import Typography from '../Typography';

function ContentHeader({ text }: { text: HeaderContentType }) {
  return (
    <Container>
      <Typography variant="h3" color="grayScale02">
        {text.main}
      </Typography>
      <Typography variant="detail" color="grayScale03">
        {text.sub}
      </Typography>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  padding: 28px 0px 20px;
`;

export default ContentHeader;
