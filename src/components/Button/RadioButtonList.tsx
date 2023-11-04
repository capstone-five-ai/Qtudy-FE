import styled from 'styled-components';
import RadioButton from './RadioButton';

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

interface RadioButtonListProps {
  buttonLabel: string;
  buttonList: string[];
  checkedValue: string;
  setCheckedValue: (isCheck: string) => void;
  disabled: boolean;
}

function RadioButtonList({ buttonLabel, buttonList, checkedValue, setCheckedValue, disabled }: RadioButtonListProps) {
  return (
    <Container>
      <div className="title">{buttonLabel}</div>
      <ButtonContainer>
        {buttonList.map((button) => (
          <RadioButton
            key={button}
            value={button}
            name={buttonLabel}
            checked={checkedValue === button}
            onChange={() => setCheckedValue(button)}
            disabled={disabled}
          />
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default RadioButtonList;
