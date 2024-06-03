import RadioInputField from '@/components/InputField/RadioInputField';
import styled from 'styled-components';

interface RadioInputFieldContainerProps<T> {
  optionInputKey: keyof T;
  inputOption: T;
  setInputOption: React.Dispatch<React.SetStateAction<T>>;
  inputFieldLabel: string;
  inputFieldList: string[];
  disabled?: boolean;
}

function RadioInputFieldContainer<T>({
  optionInputKey,
  inputOption,
  setInputOption,
  inputFieldLabel,
  inputFieldList,
  disabled = false,
}: RadioInputFieldContainerProps<T>) {
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
