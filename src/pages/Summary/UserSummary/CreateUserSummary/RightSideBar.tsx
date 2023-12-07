import FileNameInputField from '../../../../components/Input/FileNameInputField';
import SideBar from '../../../../components/SideBar';

interface RightSideBarProps {
  buttonDisabled: boolean;
  inputFileName: string;
  setInputFileName: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

function RightSideBar({ buttonDisabled, inputFileName, setInputFileName, handleSubmit }: RightSideBarProps) {
  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFileName(e.target.value);
  };
  return (
    <SideBar buttonDisabled={buttonDisabled} handleSubmit={handleSubmit}>
      <FileNameInputField name="file" value={inputFileName} onChange={handleFileNameChange} />
    </SideBar>
  );
}

export default RightSideBar;
