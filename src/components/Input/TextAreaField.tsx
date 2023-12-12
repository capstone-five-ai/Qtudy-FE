import reactTextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import Scrollbar from '../Scrollbar';

function TextAreaField({ ...props }) {
  return (
    <Container>
      <TextFieldContainer>
        <StyledTextArea minRows={19} {...props} />
      </TextFieldContainer>
    </Container>
  );
}

export default TextAreaField;

const Container = styled.div`
  padding: 16px;
  padding-right: 0px;
  border-radius: 4px;
  height: 100%;
  background: ${(props) => props.theme.colors.grayScale09};
`;

const TextFieldContainer = styled.div`
  overflow-y: scroll;
  height: 100%;
  ${Scrollbar}
`;

const StyledTextArea = styled(reactTextareaAutosize)`
  width: 100%;
  resize: none;
  border: none;
  text-align: justify;

  font-family: NotoSansRegular;
  font-size: 14px;
  font-style: normal;
  line-height: 180%; /* 25.2px */
  letter-spacing: 0.28px;

  white-space: pre-wrap;
  color: ${(props) => props.theme.colors.grayScale02};

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }
`;
