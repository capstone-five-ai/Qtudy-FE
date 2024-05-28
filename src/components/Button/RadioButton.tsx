import styled from 'styled-components';

interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// 라디오 버튼
function RadioButton({ ...props }: RadioButtonProps) {
  return <StyledRadioButton type="radio" {...props} />;
}

export default RadioButton;

const StyledRadioButton = styled.input.attrs({ type: 'radio' })`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;

  width: 14px;
  height: 14px;
  margin: 0 1px;
  background: white;
  box-shadow: 0 0 0 1px ${(props) => props.theme.colors.grayScale05};
  border-radius: 50%;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  &:checked {
    background: ${(props) => props.theme.colors.mainMint};
    border: 3px solid white;
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.mainMint};
  }
`;
