import styled from 'styled-components';
import RadioButton from './RadioButton';

interface RadioButtonListProps {
  buttonLabel: string;
  buttonList: string[];
  checkedButton: { [key: string]: string };
  setCheckedButton: (checked: { [key: string]: string }) => void;
  disabled: boolean;
}

function RadioButtonList({ buttonLabel, buttonList, checkedButton, setCheckedButton, disabled }: RadioButtonListProps) {
  return (
    <Container>
      <div className="title">{buttonLabel}</div>
      <ButtonContainer>
        {buttonList.map((button) => (
          <RadioButton
            key={button}
            value={button}
            name={buttonLabel}
            checked={checkedButton[buttonLabel] === button}
            onChange={() => setCheckedButton({ ...checkedButton, [buttonLabel]: button })}
            disabled={disabled}
          />
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default RadioButtonList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 14px;

  .title {
    font-family: NotoSansMedium;
    color: ${(props) => props.theme.colors.grayScale02};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  font-family: NotoSansRegular;
  color: ${(props) => props.theme.colors.grayScale03};
`;
