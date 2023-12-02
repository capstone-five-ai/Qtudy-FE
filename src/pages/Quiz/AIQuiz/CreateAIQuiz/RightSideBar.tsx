import styled from 'styled-components';
import RadioButtonFieldList from '../../../../components/Button/RadioButton/RadioButtonFieldList';
import FileNameInputField from '../../../../components/Input/FileNameInputField';
import SideBar from '../../../../components/SideBar';

const LIST = [
  { dataKey: 'type', label: '문제 유형', button: ['객관식', '주관식'] },
  { dataKey: 'amount', label: '문제량', button: ['적게', '적당히', '많이'] },
  { dataKey: 'difficulty', label: '난이도', button: ['상', '중', '하'] },
];

interface RightSideBarProps {
  disabled?: boolean; // 사이드바 활성 여부
  inputOption: { [key: string]: string }; // 설정 변수
  setInputOption: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>; // 설정 수정 함수
  handleSubmit: () => void;
}

function RightSideBar({ disabled = false, inputOption, setInputOption, handleSubmit }: RightSideBarProps) {
  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputOption({ ...inputOption, [e.target.name]: e.target.value });
  };

  return (
    <SideBar buttonDisabled={Object.values(inputOption).includes('')} handleSubmit={handleSubmit}>
      <Container>
        {LIST.map((list) => (
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

RightSideBar.defaultProps = {
  disabled: false,
};

export default RightSideBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
