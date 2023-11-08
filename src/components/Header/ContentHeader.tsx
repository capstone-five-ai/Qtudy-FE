import styled from 'styled-components';
import { PageContentType } from '../../types';

function ContentHeader({ text }: { text: PageContentType }) {
  return (
    <Container>
      <div className="main-text">{text.main}</div>
      <div className="sub-text">{text.sub}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
  padding: 20px 0px;

  .main-text {
    font-family: NotoSansBold;
    font-size: 16px;
    color: ${(props) => props.theme.colors.grayScale02};
  }

  .sub-text {
    font-family: NotoSansMedium;
    font-size: 12px;
    color: ${(props) => props.theme.colors.grayScale03};
  }
`;

export default ContentHeader;
