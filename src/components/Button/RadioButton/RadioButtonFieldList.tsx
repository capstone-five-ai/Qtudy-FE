import styled from 'styled-components';
import Typography from '../../Typography';
import RadioButtonField from './RadioButtonField';

interface RadioButtonFieldListProps {
  optionInputKey: string; // 설정 변수 내 키 값
  inputOption: { [key: string]: string }; // 설정 변수
  setInputOption: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>; // 설정 수정 함수
  buttonLabel: string; // 설정 라벨
  buttonList: string[]; // 설정 하나의 내부 버튼 목록
  disabled: boolean; // 버튼 활성화 여부
}

function RadioButtonFieldList({
  optionInputKey,
  inputOption,
  setInputOption,
  buttonLabel,
  buttonList,
  disabled,
}: RadioButtonFieldListProps) {
  return (
    <Container>
      <Typography variant="subtitle" color="grayScale02">
        {buttonLabel}
      </Typography>
      <ButtonContainer>
        {buttonList.map((button) => (
          <RadioButtonField
            key={button}
            value={button}
            name={buttonLabel}
            checked={inputOption[optionInputKey] === button}
            onChange={() => setInputOption({ ...inputOption, [optionInputKey]: button })}
            disabled={disabled}
          />
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default RadioButtonFieldList;

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
