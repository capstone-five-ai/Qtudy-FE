import TextInputField, {
  TextInputFieldProps,
} from '@/components/InputField/TextInputField';
import Typography from '@/components/Typography/Typography';
import styled from 'styled-components';

function FileNameInputField(props: TextInputFieldProps) {
  return (
    <StyledContainer>
      <Typography variant="subtitle" color="grayScale02">
        파일명
      </Typography>
      <TextInputField placeholder="파일명을 입력해주세요." {...props} />
    </StyledContainer>
  );
}

export default FileNameInputField;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
