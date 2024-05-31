import GenerateLoader from '@/components/Loader/GenerateLoader';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import GenerateSidebar from '@/components/Sidebar/GenerateSidebar';
import GenerateTextWrapper from '@/containers/QuizAIPage/GenerateTextWrapper';
import { usePostSummaryByUser } from '@/hooks/usePostSummary';
import loadingState from '@/recoils/atoms/loadingState';
import { GenerateSummaryOption } from '@/types/summary.type';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function GenerateSection() {
  const showLoading = useRecoilValue(loadingState);
  const [summaryContent, setSummaryContent] = useState<string>('');
  const [inputOption, setInputOption] = useState<GenerateSummaryOption>({
    fileName: '',
  });
  const { mutate: generateByUser, status: generateStatus } =
    usePostSummaryByUser();

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputOption({ ...inputOption, [e.target.name]: e.target.value });
  };

  return (
    <>
      {showLoading && (
        <GenerateLoader isLoading={generateStatus === 'pending'} />
      )}
      <StyledContent>
        <GenerateTextWrapper
          type="SUMMARY"
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
          generateByUser({
            title: inputOption.fileName,
            summary: summaryContent,
          });
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

  padding: 24px 36px;
  padding-right: 20px;
`;
