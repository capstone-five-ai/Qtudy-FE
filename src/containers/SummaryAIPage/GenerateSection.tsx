import GenerateLoader from '@/components/Loader/GenerateLoader';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import GenerateSidebar from '@/components/Sidebar/GenerateSidebar';
import GenerateMethodWrapper from '@/components/Wrapper/GenerateMethodWrapper';
import GenerateTextWrapper from '@/containers/QuizAIPage/GenerateTextWrapper';
import GenerateUploadWrapper from '@/containers/QuizAIPage/GenerateUploadWrapper';
import {
  usePostSummaryByImage,
  usePostSummaryByPdf,
  usePostSummaryByText,
} from '@/hooks/usePostSummary';
import loadingState from '@/recoils/atoms/loadingState';
import { GenerateSummaryOption } from '@/types/summary.type';
import uploadFile, { UploadedFileType } from '@/utils/uploadFile';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

export interface GenerateOptionsType {
  key: keyof GenerateSummaryOption;
  label: string;
  options: string[];
}

const GENERATE_OPTIONS: GenerateOptionsType[] = [
  { key: 'amount', label: '요약량', options: ['짧게', '적당히', '길게'] },
];

const initialInputOption = {
  amount: '',
  fileName: '',
};

function GenerateSection() {
  const [searchParams] = useSearchParams();
  const method = searchParams.get('method');
  const [inputOption, setInputOption] =
    useState<GenerateSummaryOption>(initialInputOption);
  const [text, setText] = useState<string>('');
  const [pdfFile, setPdfFile] = useState<UploadedFileType | null>(null);
  const [imageFiles, setImageFiles] = useState<UploadedFileType[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const showLoading = useRecoilValue(loadingState);
  const { mutate: generateByText, status: textStatus } = usePostSummaryByText();
  const { mutate: generateByPdf, status: pdfStatus } = usePostSummaryByPdf();
  const { mutate: generateByImage, status: imageStatus } =
    usePostSummaryByImage();

  useEffect(() => {
    setInputOption(initialInputOption);
  }, [method]);

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputOption({ ...inputOption, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const fileData = new FormData();

    if (method === 'text') {
      generateByText({ option: inputOption, text });
    } else if (method === 'upload' && pdfFile) {
      fileData.append('file', pdfFile.file);

      generateByPdf({
        option: inputOption,
        file: fileData,
      });
    } else if (method === 'upload' && imageFiles.length > 0) {
      imageFiles.forEach((image) => {
        fileData.append('file', image.file);
      });

      generateByImage({
        option: inputOption,
        file: fileData,
      });
    }
  };

  return (
    <>
      {showLoading && (
        <GenerateLoader
          isLoading={
            textStatus === 'pending' ||
            pdfStatus === 'pending' ||
            imageStatus === 'pending'
          }
        />
      )}
      <StyledContent>
        {!method && <GenerateMethodWrapper type="SUMMARY" />}
        {method === 'upload' && (
          <GenerateUploadWrapper
            inputRef={inputRef}
            pdfFile={pdfFile}
            imageFiles={imageFiles}
            handleFileUpload={(event) =>
              uploadFile.handleFileUpload(
                event,
                imageFiles,
                setPdfFile,
                setImageFiles
              )
            }
            handleDelete={(deleteIndex) =>
              uploadFile.handleDelete(
                deleteIndex,
                pdfFile,
                imageFiles,
                setPdfFile,
                setImageFiles
              )
            }
          />
        )}
        {method === 'text' && (
          <GenerateTextWrapperContainer>
            <GenerateTextWrapper
              type="SUMMARY"
              inputText={text}
              setInputText={setText}
            />
          </GenerateTextWrapperContainer>
        )}
      </StyledContent>
      <GenerateSidebar
        optionList={GENERATE_OPTIONS}
        inputOption={inputOption}
        setInputOption={setInputOption}
        handleFileNameChange={handleFileNameChange}
        handleSubmit={handleSubmit}
        inputFieldDisabled={!method}
        generateButtonDisabled={
          !method ||
          Object.values(inputOption).includes('') ||
          (pdfFile === null && imageFiles.length === 0 && text === '')
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

const GenerateTextWrapperContainer = styled.div`
  height: 100%;
  padding: 24px 36px;
  padding-right: 20px;
`;
