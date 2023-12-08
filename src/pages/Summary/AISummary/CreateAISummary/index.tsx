import { useSearchParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import SelectAIType from '../../../../components/SelectAIType';
import { UploadedFileType } from '../../../../types';
import loadingSelector from '../../../../recoil/selectors/loading';
import UploadType from '../../../../components/SelectAIType/UploadType';
import TextType from '../../../../components/SelectAIType/TextType';
import uploadFileUtils from '../../../../utils/uploadFileUtils';
import CreateSideBar from '../../../../components/SideBar/CreateSideBar';
import CreateContentWrapper from '../../../../components/Wrapper/CreateContentWrapper';

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
  const setLoading = useSetRecoilState(loadingSelector);

  const handleSubmit = () => {
    const formData = new FormData();

    if (pdfFile) {
      formData.append('pdfFile', pdfFile.file, pdfFile.name);
    }

    if (imageFiles.length > 0) {
      imageFiles.forEach((image, index) => {
        formData.append(`imageFile_${index}`, image.file, image.name);
      });
    }

    // TODO: 서버로 formData 전송
    setLoading(true);
  };

  return (
    <>
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
