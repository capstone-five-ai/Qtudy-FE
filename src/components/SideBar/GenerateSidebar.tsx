import GenerateButton from '@/components/Button/GenerateButton';
import FileNameInputField from '@/components/InputField/FileNameInputField';
import RadioInputFieldContainer from '@/components/InputField/RadioInputFieldContainer';
import Sidebar from '@/components/Sidebar/Sidebar';
import { GenerateQuizOption } from '@/types/quiz.type';
import styled from 'styled-components';

interface GenerateSidebarProps {
  optionList: {
    key: keyof GenerateQuizOption;
    label: string;
    options: string[];
  }[];
  inputOption: GenerateQuizOption;
  setInputOption: React.Dispatch<React.SetStateAction<GenerateQuizOption>>;
  handleFileNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  generateButtonDisabled?: boolean;
  inputFieldDisabled?: boolean;
}

function GenerateSidebar({
  optionList,
  inputOption,
  setInputOption,
  handleFileNameChange,
  handleSubmit,
  generateButtonDisabled = false,
  inputFieldDisabled = false,
}: GenerateSidebarProps) {
  return (
    <Sidebar>
      <StyledSidebarContentContainer>
        <StyledOptionContainer>
          {optionList.map((option) => (
            <RadioInputFieldContainer
              key={option.key}
              optionInputKey={option.key}
              inputOption={inputOption}
              setInputOption={setInputOption}
              inputFieldLabel={option.label}
              inputFieldList={option.options}
              disabled={inputFieldDisabled}
            />
          ))}
          {'fileName' in inputOption && (
            <FileNameInputField
              name="fileName"
              value={inputOption.fileName}
              onChange={handleFileNameChange}
              disabled={inputFieldDisabled}
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
