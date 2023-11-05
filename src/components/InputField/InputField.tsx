import styled from 'styled-components';

const Input = styled.input`
  padding: 5px 12px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayScale06};

  font-family: NotoSansRegular;
  font-size: 12px;

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.mainMint};
  }
`;

function InputField({ ...props }) {
  return <Input placeholder="지정하실 파일명을 입력해주세요." {...props} />;
}

export default InputField;
