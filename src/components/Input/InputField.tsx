import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import Typography from '../Typography';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

function InputField({ error = false, errorMessage = '', ...props }: InputFieldProps) {
  return (
    <Container>
      <Input $error={error} {...props} />
      <div className="error-message">
        {error && (
          <Typography variant="caption4" color="errorRed">
            {errorMessage}
          </Typography>
        )}
      </div>
    </Container>
  );
}

export default InputField;

InputField.defaultProps = {
  error: false,
  errorMessage: '',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  position: relative;

  .error-message {
    position: absolute;
    transform: translate(0, 100%);
    bottom: 0;
    left: 0;
  }
`;

const Input = styled.input<{ $error: boolean }>`
  padding: 5px 12px;
  margin-bottom: 2px;
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
