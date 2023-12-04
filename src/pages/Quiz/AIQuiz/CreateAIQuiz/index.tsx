import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import UploadType from '../../../../components/SelectAIType/UploadType';
import TextType from '../../../../components/SelectAIType/TextType';
import { UploadedFileType } from '../../../../types';
import loadingSelector from '../../../../recoil/selectors/loading';
import SelectAIType from '../../../../components/SelectAIType';
import uploadFileUtils from '../../../../utils/uploadFileUtils';
import CreateSideBar from '../../../../components/SideBar/CreateSideBar';

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
  const setLoading = useSetRecoilState(loadingSelector);

  useEffect(() => {
    setInputOption(DEFAULT_INPUT_OPTION);
    setPdfFile(null);
    setImageFiles([]);
  }, [type]);

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
