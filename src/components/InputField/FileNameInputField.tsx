import styled from 'styled-components';
import InputField from './InputField';

function FileNameInputField({ ...props }) {
  return (
    <Container>
      <div className="title">파일명</div>
      <InputField {...props} />
    </Container>
  );
}

export default FileNameInputField;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    font-family: NotoSansMedium;
    color: ${(props) => props.theme.colors.grayScale02};
  }
`;
