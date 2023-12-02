import styled from 'styled-components';

function TextAreaField({ ...props }) {
  return <TextArea {...props} />;
}

export default TextAreaField;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 16px;
  resize: none;
  border: none;
  text-align: justify;
  background: ${(props) => props.theme.colors.grayScale09};

  font-family: NotoSansRegular;
  font-size: 14px;
  font-style: normal;
  line-height: 180%; /* 25.2px */
  letter-spacing: 0.28px;

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }
`;
