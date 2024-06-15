import GenerateLoader from '@/components/Loader/GenerateLoader';
import GenerateSidebar from '@/components/Sidebar/GenerateSidebar';
import GenerateTextWrapper from '@/containers/QuizAIPage/GenerateTextWrapper';
import useDebouncedValue from '@/hooks/useDebouncedValue';
import useDuplicatedFileName from '@/hooks/useDuplicatedFileName';
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
    isDuplicatedFileName: null,
  });
  const { mutate: generateByUser, status: generateStatus } =
    usePostSummaryByUser();
  const { debouncedInputValue: debouncedFileName } = useDebouncedValue({
    inputValue: inputOption.fileName,
  });
  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputOption({
      ...inputOption,
      isDuplicatedFileName: null,
      [e.target.name]: e.target.value,
    });
  };

  useDuplicatedFileName({
    fileName: debouncedFileName,
    checkType: 'SUMMARY',
    duplicateHandler: (isDuplicatedFileName) =>
      setInputOption({ ...inputOption, isDuplicatedFileName }),
  });

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
          Object.values(inputOption).includes('') ||
          summaryContent === '' ||
          inputOption.isDuplicatedFileName !== false
        }
      />
    </>
  );
}

export default GenerateSection;

const StyledContent = styled.div`
  flex: 1;
  padding: 24px 36px;
`;
