import styled from 'styled-components';
import Typography from '../Typography';

function RadioButton({ ...props }) {
  const { disabled, value } = props;

  return (
    <Container $disabled={disabled}>
      <input type="radio" {...props} />
      <Typography variant="body2" color="grayScale03">
        {value}
      </Typography>
    </Container>
  );
}

export default RadioButton;

const Container = styled.label<{ $disabled: boolean }>`
  width: max-content;
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
`;
