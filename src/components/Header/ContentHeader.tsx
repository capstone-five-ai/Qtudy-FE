import styled from 'styled-components';
import { PageContentType } from '../../types';
import Typography from '../Typography';

function ContentHeader({ text }: { text: PageContentType }) {
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
  gap: 6px;
  text-align: center;
  padding: 20px 0px;
`;

export default ContentHeader;
