import styled from 'styled-components';

function RadioButton({ ...props }) {
  const { disabled } = props;

  return <StyledInput type="radio" $disabled={disabled !== undefined ? disabled : false} {...props} />;
}

export default RadioButton;

const StyledInput = styled.input.attrs({ type: 'radio' })<{ $disabled: boolean }>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  margin: 0;
  background-color: white;
  box-shadow: 0 0 0 1px ${(props) => props.theme.colors.grayScale05};
  border-radius: 50%;
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};

  &:checked {
    background-color: ${(props) => props.theme.colors.mainMint};
    border: 3px solid white;
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.mainMint};
  }
`;
