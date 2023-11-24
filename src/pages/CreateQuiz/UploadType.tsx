import styled from 'styled-components';
import { ReactComponent as UploadIcon } from '../../assets/icons/icon-upload.svg';
import Typography from '../../components/Typography';

function UploadType() {
  return (
    <Container>
      <UploadIcon />
      <Text>
        <Typography variant="subtitle" color="grayScale02">
          파일을 업로드해주세요
        </Typography>
        <Typography variant="caption3" color="grayScale02">
          (.pdf, .txt, .jpg, .png)
        </Typography>
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
`;
