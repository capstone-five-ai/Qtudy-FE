import styled from 'styled-components';
import { useMemo } from 'react';
import { ReactComponent as UploadIcon } from '../../assets/icons/uploadFile.svg';
import { ReactComponent as ExitIcon } from '../../assets/icons/icon-exit.svg';
import Typography from '../Typography';
import { UploadedFileType } from '../../types';
import uploadFileUtils from '../../utils/uploadFileUtils';
import Scrollbar from '../Scrollbar';

interface UploadTypeProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  pdfFile: UploadedFileType | null;
  imageFiles: UploadedFileType[];
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (index: number | null) => void;
}

function UploadType({ inputRef, pdfFile, imageFiles, handleFileUpload, handleDelete }: UploadTypeProps) {
  const pdfObjectURL = useMemo(() => {
    if (pdfFile) {
      return URL.createObjectURL(pdfFile!.file);
    }
    return undefined;
  }, [pdfFile]);

  const imageObjectURLs = useMemo(() => {
    return imageFiles.map((image) => URL.createObjectURL(image.file));
  }, [imageFiles]);

  if (!pdfFile && imageFiles.length <= 0) {
    return (
      <Container onClick={() => uploadFileUtils.handleUploadButtonClick(inputRef)}>
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/*, .pdf"
          multiple
          ref={inputRef}
          onChange={handleFileUpload}
        />
        <UploadIcon />
        <Text>
          <Typography variant="subtitle" color="grayScale02">
            파일을 업로드해주세요
          </Typography>
          <Typography variant="caption3" color="grayScale02">
            (.pdf, .txt, .jpg, .png)
          </Typography>
        </Text>
      </Container>
    );
  }

  return (
    <PreviewContainer>
      <PreviewInnerContainer>
        {pdfFile !== null && (
          <Preview>
            <button type="button" className="icon-container" onClick={() => handleDelete(null)}>
              <ExitIcon />
            </button>
            <object data={pdfObjectURL} type="application/pdf" width="400" height="300">
              PDF 미리보기를 지원하지 않는 브라우저입니다.
            </object>
          </Preview>
        )}
        {/* {imageFiles.length > 0 && (
          <AddButton onClick={() => uploadFileUtils.handleUploadButtonClick(inputRef)}>
            <input
              style={{ display: 'none' }}
              type="file"
              accept="image/*, .pdf"
              multiple
              ref={inputRef}
              onChange={handleFileUpload}
            />
            <UploadIcon className="add-icon" />
            <Typography variant="subtitle" color="grayScale03">
              파일 추가
            </Typography>
          </AddButton>
        )} */}
        {imageFiles.length > 0 &&
          imageFiles.map((image, index) => (
            <Preview key={image.name}>
              <button type="button" className="icon-container" onClick={() => handleDelete(index)}>
                <ExitIcon />
              </button>
              <img src={imageObjectURLs[index]} alt="이미지 미리보기" />
            </Preview>
          ))}
      </PreviewInnerContainer>
    </PreviewContainer>
  );
}

export default UploadType;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const PreviewContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  ${Scrollbar}
`;

const PreviewInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const Preview = styled.div`
  width: 245px;
  height: 138px;
  margin: 3px;
  border-radius: 4px;
  border: 1px solid;
  border-color: transparent;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 0px 4px 0px rgba(117, 117, 117, 0.28);

  object {
    width: 111%;
    position: absolute;
    top: -70px;
    left: -4px;
    opacity: 0.6;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
  }

  .icon-container {
    display: none;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.grayScale06};
    .icon-container {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 24px;
      height: 24px;
      border: none;
      border-radius: 50%;
      background: rgba(117, 117, 117, 0.6);

      position: absolute;
      z-index: 1;
      top: 12px;
      right: 12px;
      cursor: pointer;

      path {
        stroke: white;
      }
    }

    img {
      opacity: 1;
    }

    object {
      opacity: 1;
    }
  }
`;

/* const AddButton = styled(Preview)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: ${(props) => props.theme.colors.grayScale06};
  opacity: 1;
  cursor: pointer;

  .add-icon {
    height: 50px;
  }
`; */
