import GenerateLoader from '@/components/Loader/GenerateLoader';
import GenerateSidebar from '@/components/Sidebar/GenerateSidebar';
import GenerateMethodWrapper from '@/components/Wrapper/GenerateMethodWrapper';
import GenerateTextWrapper from '@/containers/QuizAIPage/GenerateTextWrapper';
import GenerateUploadWrapper from '@/containers/QuizAIPage/GenerateUploadWrapper';
import useDebouncedValue from '@/hooks/useDebouncedValue';
import useDuplicatedFileName from '@/hooks/useDuplicatedFileName';
import {
  usePostQuizByImage,
  usePostQuizByPdf,
  usePostQuizByText,
} from '@/hooks/usePostQuiz';
import loadingState from '@/recoils/atoms/loadingState';
import { GenerateQuizOption } from '@/types/quiz.type';
import uploadFile, { UploadedFileType } from '@/utils/uploadFile';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

export interface GenerateOptionsType {
  key: keyof GenerateQuizOption;
  label: string;
  options: string[];
}

const GENERATE_OPTIONS: GenerateOptionsType[] = [
  { key: 'type', label: '퀴즈 유형', options: ['객관식', '주관식'] },
  { key: 'amount', label: '퀴즈 양', options: ['적게', '적당히', '많이'] },
  { key: 'difficulty', label: '난이도', options: ['하', '중', '상'] },
];

const initialInputOption = {
  type: '',
  amount: '',
  difficulty: '',
  fileName: '',
  isDuplicatedFileName: null,
};

function GenerateSection() {
  const [searchParams] = useSearchParams();
  const method = searchParams.get('method');
  const [inputOption, setInputOption] =
    useState<GenerateQuizOption>(initialInputOption);
  const [text, setText] = useState<string>('');
  const [pdfFile, setPdfFile] = useState<UploadedFileType | null>(null);
  const [imageFiles, setImageFiles] = useState<UploadedFileType[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const showLoading = useRecoilValue(loadingState);
  const { mutate: generateByText, status: textStatus } = usePostQuizByText();
  const { mutate: generateByPdf, status: pdfStatus } = usePostQuizByPdf();
  const { mutate: generateByImage, status: imageStatus } = usePostQuizByImage();
  const { debouncedInputValue: debouncedFileName } = useDebouncedValue({
    inputValue: inputOption.fileName,
  });

  useEffect(() => {
    setInputOption(initialInputOption);
  }, [method]);

  useDuplicatedFileName({
    fileName: debouncedFileName,
    checkType: 'PROBLEM',
    duplicateHandler: (isDuplicatedFileName) =>
      setInputOption({ ...inputOption, isDuplicatedFileName }),
  });

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

  if (method !== null && method !== 'upload' && method !== 'text')
    return <Navigate to="/quiz" />;

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
      {!method && (
        <StyledContent>
          <GenerateMethodWrapper type="QUIZ" />
        </StyledContent>
      )}
      {method === 'upload' && (
        <StyledUploadContent>
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
        </StyledUploadContent>
      )}
      {method === 'text' && (
        <StyledTextContent>
          <GenerateTextWrapper
            type="QUIZ"
            inputText={text}
            setInputText={setText}
          />
        </StyledTextContent>
      )}
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
          (pdfFile === null && imageFiles.length === 0 && text === '') ||
          inputOption.isDuplicatedFileName !== false
        }
      />
    </>
  );
}

export default GenerateSection;

const StyledContent = styled.div`
  flex: 1;
`;

const StyledUploadContent = styled(StyledContent)`
  padding: 12px;
  padding-right: 1px;
  height: 100%;
`;

const StyledTextContent = styled(StyledContent)`
  padding: 24px 36px;
  padding-right: 20px;
`;
