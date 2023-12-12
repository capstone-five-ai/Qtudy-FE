import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import UploadType from '../../../../components/SelectAIType/UploadType';
import TextType from '../../../../components/SelectAIType/TextType';
import { UploadedFileType } from '../../../../types';
import loadingSelector from '../../../../recoil/selectors/loading';
import SelectAIType from '../../../../components/SelectAIType';
import uploadFileUtils from '../../../../utils/uploadFileUtils';
import CreateSideBar from '../../../../components/SideBar/CreateSideBar';
import Loader from '../../../../components/Modal/Loader';
import CreateContentWrapper from '../../../../components/Wrapper/CreateContentWrapper';
import { convertToRequestData } from '../../../../utils/convertToRequestData';
import { useCreateQuizByImage, useCreateQuizByPdf, useCreateQuizByText } from '../../../../hooks/useCreateQuiz';

const DEFAULT_INPUT_OPTION = {
  type: '', // 문제 유형
  amount: '', // 문제량
  difficulty: '', // 난이도
  file: '', // 파일명
};

function CreateAIQuiz() {
  const [createType] = useSearchParams();
  const type = createType.get('type');
  const [inputOption, setInputOption] = useState<{ [key: string]: string }>(DEFAULT_INPUT_OPTION);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pdfFile, setPdfFile] = useState<UploadedFileType | null>(null);
  const [imageFiles, setImageFiles] = useState<UploadedFileType[]>([]);
  const showLoader = useRecoilValue(loadingSelector);
  const setShowLoader = useSetRecoilState(loadingSelector);

  const { mutate: createByImage, isLoading: isImageLoading } = useCreateQuizByImage();
  const { mutate: createByPdf, isLoading: isPdfLoading } = useCreateQuizByPdf();
  const { mutate: createByText, isLoading: isTextLoading } = useCreateQuizByText();

  useEffect(() => {
    setInputOption(DEFAULT_INPUT_OPTION);
    setPdfFile(null);
    setImageFiles([]);
  }, [type]);

  const handleSubmit = async () => {
    setShowLoader(true);

    try {
      const fileData = new FormData();
      const option = convertToRequestData(inputOption);

      if (type === 'text') {
        createByText({ fileName: option.fileName, quizData: { option, text: inputText } });
      } else if (type === 'upload' && pdfFile) {
        fileData.append('file', pdfFile.file);
        createByPdf({ fileName: option.fileName, quizData: { option, file: fileData } });
      } else if (type === 'upload' && imageFiles.length > 0) {
        imageFiles.forEach((image) => {
          fileData.append('file', image.file);
        });
        createByImage({ fileName: option.fileName, quizData: { option, file: fileData } });
      }
    } catch {
      setShowLoader(false);
    }
  };

  return (
    <>
      {showLoader && <Loader isLoading={isPdfLoading || isTextLoading || isImageLoading} />}
      <CreateContentWrapper>
        {!type && <SelectAIType service="quiz" />}
        {type === 'upload' && (
          <UploadType
            inputRef={inputRef}
            pdfFile={pdfFile}
            imageFiles={imageFiles}
            handleFileUpload={(event) => uploadFileUtils.handleFileUpload(event, setPdfFile, setImageFiles)}
            handleDelete={(deleteIndex) =>
              uploadFileUtils.handleDelete(deleteIndex, pdfFile, imageFiles, setPdfFile, setImageFiles)
            }
          />
        )}
        {type === 'text' && <TextType service="quiz" inputText={inputText} setInputText={setInputText} />}
      </CreateContentWrapper>
      <CreateSideBar
        service="quiz"
        disabled={!type}
        buttonDisabled={
          Object.values(inputOption).includes('') && (!pdfFile || imageFiles.length > 0 || inputText !== '')
        }
        inputOption={inputOption}
        setInputOption={setInputOption}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default CreateAIQuiz;
