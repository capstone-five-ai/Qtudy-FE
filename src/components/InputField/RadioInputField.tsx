import RadioButton from '@/components/Button/RadioButton';
import styled from 'styled-components';

interface RadioInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  children: React.ReactNode;
}

function RadioInputField({
  disabled = false,
  children,
  ...props
}: RadioInputFieldProps) {
  return (
    <StyledRadioButtonContainer htmlFor={props.id} $disabled={disabled}>
      <RadioButton {...props} />
      {children}
    </StyledRadioButtonContainer>
  );
}

export default RadioInputField;

const StyledRadioButtonContainer = styled.label<{ $disabled: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 0px 1px;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};

  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.grayScale03};
`;
