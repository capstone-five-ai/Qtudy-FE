import styled, { css } from 'styled-components';

export interface NameInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  errorMessage?: string;
}
function NameInputField({
  isError = false,
  errorMessage,
  ...props
}: NameInputFieldProps) {
  return (
    <StyledContainer>
      <StyledInput $isError={isError} {...props} />
      {isError && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </StyledContainer>
  );
}

export default NameInputField;

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ $isError: boolean }>`
  flex: 1;
  padding: 5px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale06};

  ${({ theme }) => theme.typography.caption3};
  color: ${({ theme }) => theme.colors.grayScale02};

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale05};
  }

  &:focus {
    border-color: rgba(62, 215, 205, 0.4);
  }

  ${({ $isError }) =>
    $isError &&
    css`
      border-color: ${({ theme }) => theme.colors.errorRed};
    `};
`;

const StyledErrorMessage = styled.p`
  position: absolute;
  bottom: -2px;
  left: 0;
  transform: translateY(100%);

  ${({ theme }) => theme.typography.caption4};
  color: ${({ theme }) => theme.colors.errorRed};
`;
