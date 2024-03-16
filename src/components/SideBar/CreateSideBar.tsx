import styled from 'styled-components';
import SideBar from '.';
import RadioButtonFieldList from '../Button/RadioButton/RadioButtonFieldList';
import FileNameInputField from '../Input/FileNameInputField';

const LIST = {
  quiz: [
    { dataKey: 'type', label: '퀴즈 유형', button: ['객관식', '주관식'] },
    { dataKey: 'amount', label: '퀴즈 양', button: ['적게', '적당히', '많이'] },
    { dataKey: 'difficulty', label: '난이도', button: ['상', '중', '하'] },
  ],
  summary: [{ dataKey: 'amount', label: '요약량', button: ['짧게', '적당히', '길게'] }],
};

interface CreateSideBarProps {
  service: 'quiz' | 'summary';
  disabled?: boolean; // 사이드바 활성 여부
  buttonDisabled?: boolean;
  inputOption: { [key: string]: string }; // 설정 변수
  setInputOption: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>; // 설정 수정 함수
  handleSubmit: () => void;
}

function CreateSideBar({
  service,
  disabled = false,
  buttonDisabled = false,
  inputOption,
  setInputOption,
  handleSubmit,
}: CreateSideBarProps) {
  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputOption({ ...inputOption, [e.target.name]: e.target.value });
  };

  return (
    <SideBar buttonDisabled={buttonDisabled} handleSubmit={handleSubmit}>
      <Container>
        {LIST[service].map((list) => (
          <RadioButtonFieldList
            key={list.dataKey}
            optionInputKey={list.dataKey}
            buttonLabel={list.label}
            buttonList={list.button}
            inputOption={inputOption}
            setInputOption={setInputOption}
            disabled={disabled}
          />
        ))}
        <FileNameInputField name="file" value={inputOption.file} onChange={handleFileNameChange} disabled={disabled} />
      </Container>
    </SideBar>
  );
}

CreateSideBar.defaultProps = {
  disabled: false,
  buttonDisabled: false,
};

export default CreateSideBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
