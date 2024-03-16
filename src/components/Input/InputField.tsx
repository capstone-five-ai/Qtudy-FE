import styled from 'styled-components';

function InputField({ ...props }) {
  return <Input {...props} />;
}

export default InputField;

const Input = styled.input`
  padding: 5px 12px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayScale06};
  color: ${(props) => props.theme.colors.grayScale02};
  background-color: transparent;

  font-family: NotoSansRegular;
  font-size: 13px;
  line-height: auto;
  letter-spacing: 0;

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }

  &:focus {
    border-bottom: 1px solid rgba(62, 215, 205, 0.4);
  }
`;
