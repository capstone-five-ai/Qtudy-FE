import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import QuizLayout from '../../layouts/QuizLayout';
import CreateRightSideBar from './CreateRightSieBar';
import SelectAIQuizType from './SelectAIQuizType';
import UploadType from './UploadType';
import TextType from './TextType';
import { UploadedFileType } from '../../types';
import loadingSelector from '../../recoil/selectors/loading';

const DEFAULT_INPUT_OPTION = {
  type: '', // 문제 유형
  amount: '', // 문제량
  difficulty: '', // 난이도
  file: '', // 파일명
};

function CreateQuiz() {
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

  const handleUploadButtonClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;

    let pdfFound = false;
    const newImageFiles: UploadedFileType[] = [];

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const uploadedFile: UploadedFileType = { file, name: file.name };

      if (file.type === 'application/pdf' && !pdfFound) {
        pdfFound = true;
        setPdfFile(uploadedFile);
      } else if (file.type.includes('image')) {
        newImageFiles.push(uploadedFile);
      }
    }

    setImageFiles(newImageFiles);
  };

  const handleDelete = (deleteIndex: number | null) => {
    if (pdfFile) {
      setPdfFile(null);
    } else if (deleteIndex !== null) {
      setImageFiles(
        imageFiles.filter((_, index) => {
          return deleteIndex !== index;
        })
      );
    }
  };

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
    <QuizLayout>
      <Container>
        {!type && <SelectAIQuizType />}
        {type === 'upload' && (
          <UploadType
            inputRef={inputRef}
            pdfFile={pdfFile}
            imageFiles={imageFiles}
            handleFileUpload={handleFileUpload}
            handleUploadButtonClick={handleUploadButtonClick}
            handleDelete={handleDelete}
          />
        )}
        {type === 'text' && <TextType inputText={inputText} setInputText={setInputText} />}
        <CreateRightSideBar
          disabled={!type}
          inputOption={inputOption}
          setInputOption={setInputOption}
          handleSubmit={handleSubmit}
        />
      </Container>
    </QuizLayout>
  );
}

export default CreateQuiz;

const Container = styled.div`
  display: flex;
  min-height: 524px;
`;
