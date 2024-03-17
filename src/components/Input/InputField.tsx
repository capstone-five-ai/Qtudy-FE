import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

function InputField({ error = false, ...props }: { error?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  return <Input $error={error} {...props} />;
}

export default InputField;

InputField.defaultProps = {
  error: false,
};

const Input = styled.input<{ $error: boolean }>`
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
    ${({ $error }) => !$error && 'border-bottom: 1px solid rgba(62, 215, 205, 0.4);'}
  }

  ${({ $error }) => $error && 'border-bottom: 1px solid rgba(238, 0, 0, 0.4);'}
`;
