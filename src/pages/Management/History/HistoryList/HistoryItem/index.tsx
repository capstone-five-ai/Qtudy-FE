import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import FileApi from '../../../../../api/FileApi';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/edit_gray.svg';
import PDFButton from '../../../../../components/Button/PDFButton';
import DeleteModal from '../../../../../components/Modal/DeleteModal';
import Typography from '../../../../../components/Typography';
import { HistoryType } from '../../../../../types/history.type';
import { CreatedTime, Delete, FileName, Filter, PDFDown } from '../../ItemLayout';

type Props = {
  history: HistoryType;
  updateList: (page: number) => void;
};

function HistoryItem({ history, updateList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileName, setFileName] = useState(history.fileName);
  const [newFileName, setNewFileName] = useState(fileName);

  useEffect(() => {
    if (inputRef.current === null) return;
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }, [editMode]);

  const getDateFormat = (dateStr: string) => {
    const date = dateStr.slice(0, 16).replace(/-/g, '.').replace(/T/g, ' ');

    return date;
  };

  const handleClickFile = () => {
    const typeParam = history.dtype === 'PROBLEM' ? 'quiz' : 'summary';
    navigate(`/${typeParam}/ai?complete=true&id=${history.fileId}`);
  };

  const handleClickEdit = () => {
    setEditMode(true);
  };

  const handleClickDelete = () => {
    setShowDeleteModal(true);
  };

  const submitFileName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await editFileName();
  };

  const editFileName = async () => {
    await FileApi.updateFileName(history.fileId, newFileName);
    setEditMode(false);
    setFileName(newFileName);
  };

  const deleteFile = async () => {
    await FileApi.deleteFile(history.fileId);
    setShowDeleteModal(false);
    updateList(1);
  };

  const filterName = history.dtype === 'PROBLEM' ? '퀴즈' : '요약';
  return (
    <Wrapper>
      <Filter>
        <Typography variant="subtitle">{filterName}</Typography>
      </Filter>
      <FileName>
        {editMode ? (
          <Form onSubmit={submitFileName}>
            <Input
              ref={inputRef}
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="파일명을 입력해주세요."
              onBlur={editFileName}
            />
          </Form>
        ) : (
          <>
            <FileNameWrapper type="button" onClick={handleClickFile}>
              <Typography variant="subtitle" hoverVariant="subtitle2">
                {fileName}
              </Typography>
            </FileNameWrapper>
            <EditIcon width={20} height={20} onClick={handleClickEdit} cursor="pointer" />
          </>
        )}
      </FileName>
      <CreatedTime>
        <Typography variant="body3" color="grayScale03">
          {getDateFormat(history.createTime)}
        </Typography>
      </CreatedTime>
      <PDFDown>
        {history.dtype === 'PROBLEM' ? (
          <>
            <PDFButton
              label="퀴즈"
              variant={2}
              fileId={history.fileId}
              pdfType="PROBLEM"
              type="ai"
              fileName={history.fileName}
            />
            <PDFButton
              label="정답"
              variant={2}
              fileId={history.fileId}
              pdfType="ANSWER"
              type="ai"
              fileName={history.fileName}
            />
          </>
        ) : (
          <PDFButton
            label="요약"
            variant={2}
            fileId={history.fileId}
            pdfType="SUMMARY"
            type="ai"
            fileName={history.fileName}
          />
        )}
      </PDFDown>
      <Delete>
        <DeleteIcon width={20} height={20} cursor="pointer" onClick={handleClickDelete} />
      </Delete>
      {showDeleteModal && (
        <DeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={deleteFile}
          title={`${history.dtype === 'PROBLEM' ? '퀴츠' : '요약'}을 삭제하시겠습니까?`}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  padding: 16.5px 32px;
  justify-content: center;
  align-items: center;
  gap: 20px;

  border-bottom: 0.5px solid var(--grayscale06, #e0e0e0);
`;

const FileNameWrapper = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  border: none;
  color: ${(props) => props.theme.colors.grayScale02};
  background-color: transparent;

  font-family: NotoSansRegular;
  font-size: 13px;
  line-height: auto;
  letter-spacing: 0;

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }

  width: 100%;
`;

export default HistoryItem;
