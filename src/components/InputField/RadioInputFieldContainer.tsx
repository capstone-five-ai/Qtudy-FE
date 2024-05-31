import RadioInputField from '@/components/InputField/RadioInputField';
import { GenerateQuizOption } from '@/types/quiz.type';
import styled from 'styled-components';

interface RadioInputFieldContainerProps {
  optionInputKey: keyof GenerateQuizOption;
  inputOption: GenerateQuizOption;
  setInputOption: React.Dispatch<React.SetStateAction<GenerateQuizOption>>;
  inputFieldLabel: string;
  inputFieldList: string[];
  disabled?: boolean;
}

function RadioInputFieldContainer({
  optionInputKey,
  inputOption,
  setInputOption,
  inputFieldLabel,
  inputFieldList,
  disabled = false,
}: RadioInputFieldContainerProps) {
  return (
    <StyledContainer>
      <div className="label">{inputFieldLabel}</div>
      <div className="button-container">
        {inputFieldList.map((field) => (
          <RadioInputField
            key={field}
            value={field}
            name={inputFieldLabel}
            checked={inputOption[optionInputKey] === field}
            onChange={() =>
              !disabled &&
              setInputOption({ ...inputOption, [optionInputKey]: field })
            }
            disabled={disabled}
          >
            {field}
          </RadioInputField>
        ))}
      </div>
    </StyledContainer>
  );
}

export default RadioInputFieldContainer;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  .label {
    ${({ theme }) => theme.typography.subtitle};
    color: ${({ theme }) => theme.colors.grayScale02};
  }

  .button-container {
    display: flex;
    flex-direction: column;
    gap: 9px;
  }
`;
