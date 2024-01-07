import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import RightSideBar from './RightSideBar';
import TextType from '../../../../components/SelectAIType/TextType';
import { useCreateSummaryByUser } from '../../../../hooks/useCreateSummary';
import loadingSelector from '../../../../recoil/selectors/loading';
import Loader from '../../../../components/Modal/Loader';

function CreateUserSummary() {
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');
  const showLoader = useRecoilValue(loadingSelector);
  const setShowLoader = useSetRecoilState(loadingSelector);

  const { mutate, isLoading } = useCreateSummaryByUser();

  const handleSubmit = () => {
    setShowLoader(true);

    try {
      mutate({ summaryTitle: fileName, summaryContent: inputText });
    } catch {
      setShowLoader(false);
    }
  };
  return (
    <>
      {showLoader && <Loader isLoading={isLoading} />}
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
  flex-grow: 1;
  padding: 10px;
  padding-right: 0px;
`;
