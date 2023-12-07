import { useState } from 'react';
import styled from 'styled-components';
import RightSideBar from './RightSideBar';
import TextType from '../../../../components/SelectAIType/TextType';
import Scrollbar from '../../../../components/Scrollbar';

function CreateUserSummary() {
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');

  const handleSubmit = () => {
    // TODO: 서버로 전송
  };
  return (
    <>
      <Container>
        <TextType service="summary" inputText={inputText} setInputText={setInputText} />
      </Container>
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

const Container = styled.div`
  width: 100%;
  margin: 16px 0px;

  overflow-y: scroll;
  ${Scrollbar}
`;
