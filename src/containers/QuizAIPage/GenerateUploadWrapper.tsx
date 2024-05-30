import { ReactComponent as ExitIcon } from '@/assets/icons/exit.svg';
import { ReactComponent as UploadIcon } from '@/assets/icons/upload-file.svg';
import Typography from '@/components/Typography/Typography';
import uploadFile, { UploadedFileType } from '@/utils/uploadFile';
import { useMemo } from 'react';
import styled from 'styled-components';

interface GenerateUploadWrapperProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  pdfFile: UploadedFileType | null;
  imageFiles: UploadedFileType[];
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (index: number | null) => void;
}

function GenerateUploadWrapper({
  inputRef,
  pdfFile,
  imageFiles,
  handleFileUpload,
  handleDelete,
}: GenerateUploadWrapperProps) {
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
      <StyledContainer
        onClick={() => uploadFile.handleUploadButtonClick(inputRef)}
      >
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/*, .pdf"
          multiple
          ref={inputRef}
          onChange={handleFileUpload}
        />
        <UploadIcon />
        <StyledTextContainer>
          <Typography variant="subtitle" color="grayScale02">
            파일을 업로드해주세요
          </Typography>
          <Typography variant="caption3" color="grayScale02">
            (.pdf, .txt, .jpg, .png)
          </Typography>
        </StyledTextContainer>
      </StyledContainer>
    );
  }

  return (
    <StyledPreviewContainer>
      {pdfFile !== null && (
        <PreviewCard>
          <DeleteButton onClick={() => handleDelete(null)}>
            <ExitIcon />
          </DeleteButton>
          <object
            data={pdfObjectURL}
            type="application/pdf"
            width="400"
            height="300"
          >
            PDF 미리보기를 지원하지 않는 브라우저입니다.
          </object>
        </PreviewCard>
      )}
      {imageFiles.length > 0 &&
        imageFiles.map((image, index) => (
          <PreviewCard key={image.name}>
            <DeleteButton
              onClick={() => {
                console.log('test');
                handleDelete(index);
              }}
            >
              <ExitIcon />
            </DeleteButton>
            <img src={imageObjectURLs[index]} alt="이미지 미리보기" />
          </PreviewCard>
        ))}
    </StyledPreviewContainer>
  );
}

export default GenerateUploadWrapper;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  height: 100%;
  cursor: pointer;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const StyledPreviewContainer = styled.div`
  margin: 12px;
  margin-right: 0px;

  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const DeleteButton = styled.button`
  display: none;
  justify-content: center;
  align-items: center;

  padding: 6px;
  border-radius: 50%;
  background: rgba(117, 117, 117, 0.6);

  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;

  svg {
    width: 12px;
    height: 12px;

    path {
      stroke: white;
    }
  }
`;

const PreviewCard = styled.div`
  width: 245px;
  height: 138px;
  margin: 4px;

  border-radius: 4px;
  border: 1px solid;
  border-color: transparent;
  box-shadow: 0px 0px 4px 0px rgba(117, 117, 117, 0.28);

  position: relative;
  overflow: hidden;

  object {
    width: 111%;
    position: absolute;
    top: -70px;
    left: -4px;
    opacity: 0.8;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.grayScale06};

    img {
      opacity: 1;
    }

    object {
      opacity: 1;
    }

    ${DeleteButton} {
      display: flex;
    }
  }
`;
