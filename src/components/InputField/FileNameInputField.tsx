import styled from 'styled-components';
import InputField from './InputField';
import Typography from '../Typography';

function FileNameInputField({ ...props }) {
  return (
    <Container>
      <Typography variant="subtitle" color="grayScale02">
        파일명
      </Typography>
      <InputField placeholder="지정하실 파일명을 입력해주세요." {...props} />
    </Container>
  );
}

export default FileNameInputField;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
