import Scrollbar from '@/components/Scrollbar/Scrollbar';
import GenerateSidebar from '@/components/Sidebar/GenerateSidebar';
import GenerateTextWrapper from '@/containers/QuizAIPage/GenerateTextWrapper';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function GenerateSection() {
  const [summaryContent, setSummaryContent] = useState<string>('');
  const [inputOption, setInputOption] = useState<{ [key: string]: string }>({
    fileName: '',
  });

  useEffect(() => {
    setSummaryContent('');
    setInputOption({ ...inputOption, fileName: '' });
  }, [inputOption.type]);

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputOption({ ...inputOption, [e.target.name]: e.target.value });
  };

  return (
    <>
      <StyledContent>
        <GenerateTextWrapper
          type="summary"
          inputText={summaryContent}
          setInputText={setSummaryContent}
        />
      </StyledContent>
      <GenerateSidebar
        optionList={[]}
        inputOption={inputOption}
        setInputOption={setInputOption}
        handleFileNameChange={handleFileNameChange}
        handleSubmit={() => {
          // TODO: 제출 버튼 클릭시 동작
        }}
        generateButtonDisabled={
          Object.values(inputOption).includes('') || summaryContent === ''
        }
      />
    </>
  );
}

export default GenerateSection;

const StyledContent = styled.div`
  flex: 1;

  overflow-y: scroll;
  ${Scrollbar}
`;
