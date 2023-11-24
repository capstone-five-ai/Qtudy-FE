import styled from 'styled-components';
import RadioButton from './RadioButton';
import Typography from '../Typography';

interface RadioButtonListProps {
  optionInputKey: string; // 설정 변수 내 키 값
  optionInput: { [key: string]: string }; // 설정 변수
  setOptionInput: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>; // 설정 수정 함수
  buttonLabel: string; // 설정 라벨
  buttonList: string[]; // 설정 하나의 내부 버튼 목록
  disabled: boolean; // 버튼 활성화 여부
}

function RadioButtonList({
  optionInputKey,
  optionInput,
  setOptionInput,
  buttonLabel,
  buttonList,
  disabled,
}: RadioButtonListProps) {
  return (
    <Container>
      <Typography variant="subtitle" color="grayScale02">
        {buttonLabel}
      </Typography>
      <ButtonContainer>
        {buttonList.map((button) => (
          <RadioButton
            key={button}
            value={button}
            name={buttonLabel}
            checked={optionInput[optionInputKey] === button}
            onChange={() => setOptionInput({ ...optionInput, [optionInputKey]: button })}
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
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
