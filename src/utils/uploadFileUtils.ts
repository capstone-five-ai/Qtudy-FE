import { UploadedFileType } from '../types';

const uploadFileUtils = {
  handleUploadButtonClick(inputRef: React.MutableRefObject<HTMLInputElement | null>) {
    if (!inputRef || !inputRef.current) return;
    inputRef.current.click();
  },

  handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>,
    setPdfFile: React.Dispatch<React.SetStateAction<UploadedFileType | null>>,
    setImageFiles: React.Dispatch<React.SetStateAction<UploadedFileType[]>>
  ) {
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
  },

  handleDelete(
    deleteIndex: number | null,
    pdfFile: UploadedFileType | null,
    imageFiles: UploadedFileType[],
    setPdfFile: React.Dispatch<React.SetStateAction<UploadedFileType | null>>,
    setImageFiles: React.Dispatch<React.SetStateAction<UploadedFileType[]>>
  ) {
    if (pdfFile) {
      setPdfFile(null);
    } else if (deleteIndex !== null) {
      setImageFiles(
        imageFiles.filter((_, index) => {
          return deleteIndex !== index;
        })
      );
    }
  },
};

export default uploadFileUtils;
