import Typography from '@/components/Typography/Typography';
import styled from 'styled-components';
import NameInputField, { NameInputFieldProps } from './NameInputField';

function FileNameInputField(props: NameInputFieldProps) {
  return (
    <StyledContainer>
      <Typography variant="subtitle" color="grayScale02">
        제목
      </Typography>
      <NameInputField placeholder="제목을 입력해주세요." {...props} />
    </StyledContainer>
  );
}

export default FileNameInputField;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
