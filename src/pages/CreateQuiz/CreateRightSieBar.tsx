import RadioButtonList from '../../components/Button/RadioButtonList';
import FileNameInputField from '../../components/Input/FileNameInputField';
import SideBar from '../../components/SideBar';

const LIST = [
  { dataKey: 'type', label: '문제 유형', button: ['객관식', '주관식'] },
  { dataKey: 'amount', label: '문제량', button: ['적게', '적당히', '많이'] },
  { dataKey: 'difficulty', label: '난이도', button: ['상', '중', '하'] },
];

interface RightSideBarProps {
  disabled?: boolean; // 사이드바 활성 여부
  optionInput: { [key: string]: string }; // 설정 변수
  setOptionInput: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>; // 설정 수정 함수
  handleSubmit: () => void;
}

function CreateRightSideBar({ disabled = false, optionInput, setOptionInput, handleSubmit }: RightSideBarProps) {
  const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionInput({ ...optionInput, [e.target.name]: e.target.value });
  };

  return (
    <SideBar buttonDisabled={Object.values(optionInput).includes('')} handleSubmit={handleSubmit}>
      <>
        {LIST.map((list) => (
          <RadioButtonList
            key={list.dataKey}
            optionInputKey={list.dataKey}
            buttonLabel={list.label}
            buttonList={list.button}
            optionInput={optionInput}
            setOptionInput={setOptionInput}
            disabled={disabled}
          />
        ))}
        <FileNameInputField name="file" value={optionInput.file} onChange={handleChangeFileInput} disabled={disabled} />
      </>
    </SideBar>
  );
}

CreateRightSideBar.defaultProps = {
  disabled: false,
};

export default CreateRightSideBar;
