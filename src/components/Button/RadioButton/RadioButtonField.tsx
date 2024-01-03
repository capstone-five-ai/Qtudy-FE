import styled from 'styled-components';
import Typography from '../../Typography';
import RadioButton from './RadioButton';

function RadioButtonField({ ...props }) {
  const { disabled, value } = props;

  return (
    <Container $disabled={disabled}>
      <RadioButton disabled={disabled} {...props} />
      <Typography variant="body2" color="grayScale03">
        {value}
      </Typography>
    </Container>
  );
}

export default RadioButtonField;

const Container = styled.label<{ $disabled: boolean }>`
  width: max-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 0px 1px;
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
`;
