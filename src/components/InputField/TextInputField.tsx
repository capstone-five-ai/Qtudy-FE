import Typography from '@/components/Typography';
import styled from 'styled-components';

export interface TextInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

function TextInputField({
  error = false,
  errorMessage = '',
  ...props
}: TextInputFieldProps) {
  return (
    <StyledContainer>
      <StyledInput $error={error} {...props} />
      {error && (
        <Typography variant="caption4" color="errorRed">
          {errorMessage}
        </Typography>
      )}
    </StyledContainer>
  );
}

export default TextInputField;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  position: relative;
`;

const StyledInput = styled.input<{ $error: boolean }>`
  padding: 5px 12px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayScale06};
  color: ${(props) => props.theme.colors.grayScale02};
  background-color: transparent;

  ${({ theme }) => theme.typography.caption3};

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }

  &:focus {
    ${({ $error }) =>
      !$error && 'border-bottom: 1px solid rgba(62, 215, 205, 0.4);'}
  }

  ${({ $error }) => $error && 'border-bottom: 1px solid rgba(238, 0, 0, 0.4);'}
`;
