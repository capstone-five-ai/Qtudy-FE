import GenerateButton from '@/components/Button/GenerateButton';
import FileNameInputField from '@/components/InputField/FileNameInputField';
import RadioInputFieldContainer from '@/components/InputField/RadioInputFieldContainer';
import Sidebar from '@/components/Sidebar/Sidebar';
import styled from 'styled-components';

interface GenerateSidebarProps {
  optionList: { key: string; label: string; options: string[] }[];
  inputOption: { [key: string]: string };
  setInputOption: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  handleFileNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

function GenerateSidebar({
  optionList,
  inputOption,
  setInputOption,
  handleFileNameChange,
  handleSubmit,
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
            />
          ))}
          <FileNameInputField
            name="fileName"
            value={inputOption.file}
            onChange={handleFileNameChange}
          />
        </StyledOptionContainer>
        <GenerateButton
          onClick={handleSubmit}
          disabled={Object.values(inputOption).includes('')}
        />
      </StyledSidebarContentContainer>
    </Sidebar>
  );
}

export default GenerateSidebar;

const StyledOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledSidebarContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
