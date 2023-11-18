import styled from 'styled-components';
import { ReactComponent as UploadIcon } from '../../assets/svg/icon-upload.svg';

function UploadType() {
  return (
    <Container>
      <UploadIcon />
      <Text>
        <span className="main">파일 업로드</span>
        <span className="sub">(.pdf, .txt, .jpg, .png)</span>
      </Text>
    </Container>
  );
}

export default UploadType;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  .main {
    font-family: NotoSansMedium;
    font-size: 14px;
  }
  .sub {
    font-family: NotoSansRegular;
    font-size: 13px;
  }
`;
