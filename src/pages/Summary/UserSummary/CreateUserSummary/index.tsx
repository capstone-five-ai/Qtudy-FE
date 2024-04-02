import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import RightSideBar from './RightSideBar';
import { useCreateSummaryByUser } from '../../../../hooks/useCreateSummary';
import loadingSelector from '../../../../recoil/selectors/loading';
import Loader from '../../../../components/Modal/Loader';
import TextAreaField from '../../../../components/Input/TextAreaField';

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
        <TextAreaField
          placeholder="요약을 생성하고 싶은 관련 텍스트를 입력해주세요."
          value={inputText}
          handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
        />
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
  margin: 24px 36px;
`;
