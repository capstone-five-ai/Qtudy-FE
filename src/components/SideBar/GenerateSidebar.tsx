import GenerateButton from '@/components/Button/GenerateButton';
import FileNameInputField from '@/components/InputField/FileNameInputField';
import RadioInputFieldContainer from '@/components/InputField/RadioInputFieldContainer';
import Sidebar from '@/components/Sidebar/Sidebar';
import styled from 'styled-components';

interface GenerateSidebarProps<T> {
  optionList: {
    key: keyof T;
    label: string;
    options: string[];
  }[];
  inputOption: T;
  setInputOption: React.Dispatch<React.SetStateAction<T>>;
  handleFileNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  generateButtonDisabled?: boolean;
  inputFieldDisabled?: boolean;
}

function GenerateSidebar<T extends object>({
  optionList,
  inputOption,
  setInputOption,
  handleFileNameChange,
  handleSubmit,
  generateButtonDisabled = false,
  inputFieldDisabled = false,
}: GenerateSidebarProps<T>) {
  return (
    <Sidebar>
      <StyledSidebarContentContainer>
        <StyledOptionContainer>
          {optionList.map((option) => (
            <RadioInputFieldContainer
              key={String(option.key)}
              optionInputKey={option.key}
              inputOption={inputOption}
              setInputOption={setInputOption}
              inputFieldLabel={option.label}
              inputFieldList={option.options}
              disabled={inputFieldDisabled}
            />
          ))}
          {'fileName' in inputOption &&
            'isDuplicatedFileName' in inputOption && (
              <FileNameInputField
                name="fileName"
                value={inputOption.fileName as string}
                onChange={handleFileNameChange}
                disabled={inputFieldDisabled}
                errorMessage="중복되는 파일명입니다."
                isError={inputOption.isDuplicatedFileName === true}
              />
            )}
        </StyledOptionContainer>
        <GenerateButton
          onClick={handleSubmit}
          disabled={generateButtonDisabled}
        />
      </StyledSidebarContentContainer>
    </Sidebar>
  );
}

export default GenerateSidebar;

const StyledOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledSidebarContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
