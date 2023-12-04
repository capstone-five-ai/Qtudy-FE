import { useState } from 'react';
import RightSideBar from './RightSideBar';
import TextType from '../../../../components/SelectAIType/TextType';

function CreateUserSummary() {
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');

  const handleSubmit = () => {
    // TODO: 서버로 전송
  };
  return (
    <>
      <TextType service="summary" inputText={inputText} setInputText={setInputText} />
      <RightSideBar
        buttonDisabled={inputText === '' || fileName === ''}
        inputFileName={fileName}
        setInputFileName={setFileName}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default CreateUserSummary;
