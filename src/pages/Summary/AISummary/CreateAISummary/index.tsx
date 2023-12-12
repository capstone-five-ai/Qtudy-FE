import { useSearchParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import SelectAIType from '../../../../components/SelectAIType';
import { UploadedFileType } from '../../../../types';
import loadingSelector from '../../../../recoil/selectors/loading';
import UploadType from '../../../../components/SelectAIType/UploadType';
import TextType from '../../../../components/SelectAIType/TextType';
import uploadFileUtils from '../../../../utils/uploadFileUtils';
import CreateSideBar from '../../../../components/SideBar/CreateSideBar';
import CreateContentWrapper from '../../../../components/Wrapper/CreateContentWrapper';
import Loader from '../../../../components/Modal/Loader';
import { convertToSummaryData } from '../../../../utils/convertToRequestData';
import {
  useCreateSummaryByImage,
  useCreateSummaryByPdf,
  useCreateSummaryByText,
} from '../../../../hooks/useCreateSummary';

const DEFAULT_INPUT_OPTION = {
  amount: '', // 요약량
  file: '', // 파일명
};

function CreateAISummary() {
  const [createType] = useSearchParams();
  const type = createType.get('type');
  const [inputOption, setInputOption] = useState<{ [key: string]: string }>(DEFAULT_INPUT_OPTION);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pdfFile, setPdfFile] = useState<UploadedFileType | null>(null);
  const [imageFiles, setImageFiles] = useState<UploadedFileType[]>([]);
  const showLoader = useRecoilValue(loadingSelector);
  const setShowLoader = useSetRecoilState(loadingSelector);

  const { mutate: createByImage, isLoading: isImageLoading } = useCreateSummaryByImage();
  const { mutate: createByPdf, isLoading: isPdfLoading } = useCreateSummaryByPdf();
  const { mutate: createByText, isLoading: isTextLoading } = useCreateSummaryByText();

  const handleSubmit = () => {
    setShowLoader(true);

    try {
      const fileData = new FormData();
      const option = convertToSummaryData(inputOption);

      if (type === 'text') {
        createByText({ fileName: option.fileName, summaryData: { option, text: inputText } });
      } else if (type === 'upload' && pdfFile) {
        fileData.append('file', pdfFile.file);
        createByPdf({ fileName: option.fileName, summaryData: { option, file: fileData } });
      } else if (type === 'upload' && imageFiles.length > 0) {
        imageFiles.forEach((image) => {
          fileData.append('file', image.file);
        });
        createByImage({ fileName: option.fileName, summaryData: { option, file: fileData } });
      }
    } catch {
      setShowLoader(false);
    }
  };

  return (
    <>
      {showLoader && <Loader isLoading={isTextLoading || isPdfLoading || isImageLoading} />}
      <CreateContentWrapper>
        {!type && <SelectAIType service="summary" />}
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
        {type === 'text' && <TextType service="summary" inputText={inputText} setInputText={setInputText} />}
      </CreateContentWrapper>
      <CreateSideBar
        service="summary"
        disabled={!type}
        buttonDisabled={
          Object.values(inputOption).includes('') || (!pdfFile && imageFiles.length === 0 && inputText === '')
        }
        inputOption={inputOption}
        setInputOption={setInputOption}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default CreateAISummary;
