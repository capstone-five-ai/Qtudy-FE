import styled from 'styled-components';

function RadioButton({ ...props }) {
  return (
    <Container $disabled={...props.disabled}>
      <input type="radio" {...props} />
      <span>{{ ...props }.value}</span>
    </Container>
  );
}

export default RadioButton;

const Container = styled.label<{ $disabled: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 1px;
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};

  input[type='radio'] {
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
  }

  input[type='radio']:checked {
    background-color: ${(props) => props.theme.colors.mainMint};
    border: 3px solid white;
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.mainMint};
  }

  span {
    font-family: NotoSansRegular;
    font-size: 14px;
  }
`;
