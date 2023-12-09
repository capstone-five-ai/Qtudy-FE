import reactTextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

function TextAreaField({ ...props }) {
  return <StyledTextArea minRows={20} {...props} />;
}

export default TextAreaField;

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
  color: ${(props) => props.theme.colors.grayScale02}

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }
`;
