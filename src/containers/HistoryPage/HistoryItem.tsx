import { deleteFile, updateFileName } from '@/apis/fileApi';
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg';
import PDFDownloadButton from '@/components/Button/PDFDownloadButton';
import DeleteIcon from '@/components/Icon/DeleteIcon';
import DeleteItemModal from '@/components/Modal/DeleteItemModal';
import Typography from '@/components/Typography/Typography';
import {
  CreatedTime,
  Delete,
  FileName,
  Filter,
  PDFDown,
} from '@/containers/HistoryPage/HistoryList.style';
import useToast from '@/hooks/useToast';
import { HistoryType } from '@/types/history.type';
import { convertToKRTime } from '@/utils/convertToKRTime';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

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
  const { fireToast } = useToast();

  useEffect(() => {
    if (inputRef.current === null) return;
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }, [editMode]);

  const getDateFormat = (dateStr: string) => {
    const date = convertToKRTime(dateStr);
    return date;
  };

  const handleClickFile = () => {
    navigate(
      `/${history.dtype.toLowerCase()}/ai?complete=true&id=${history.fileId}`
    );
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
    await updateFileName(history.fileId, newFileName);
    setEditMode(false);
    setFileName(newFileName);
  };

  const deleteFileItem = async () => {
    await deleteFile(history.fileId);
    fireToast({
      icon: <DeleteIcon width={20} height={20} />,
      message: '항목이 삭제되었습니다',
    });
    setShowDeleteModal(false);
    updateList(1);
  };

  const filterName = history.dtype === 'QUIZ' ? '퀴즈' : '요약';
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
              <div className="fileName">{fileName}</div>
            </FileNameWrapper>
            <EditIcon
              width={20}
              height={20}
              onClick={handleClickEdit}
              cursor="pointer"
            />
          </>
        )}
      </FileName>
      <CreatedTime>
        <Typography variant="body3" color="grayScale03">
          {getDateFormat(history.createTime)}
        </Typography>
      </CreatedTime>
      <PDFDown>
        {history.dtype === 'QUIZ' ? (
          <>
            <PDFDownloadButton
              variant={2}
              fileId={history.fileId}
              pdfType="QUIZ"
              type="AI"
              fileName={history.fileName}
            />
            <PDFDownloadButton
              variant={2}
              fileId={history.fileId}
              pdfType="ANSWER"
              type="AI"
              fileName={history.fileName}
            />
          </>
        ) : (
          <PDFDownloadButton
            variant={2}
            fileId={history.fileId}
            pdfType="SUMMARY"
            type="AI"
            fileName={history.fileName}
          />
        )}
      </PDFDown>
      <Delete>
        <DeleteIcon
          width={20}
          height={20}
          onClick={handleClickDelete}
          cursor="pointer"
        />
      </Delete>
      {showDeleteModal && (
        <DeleteItemModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            deleteFileItem();
            setShowDeleteModal(false);
          }}
          title={`${history.dtype === 'QUIZ' ? '퀴즈를' : '요약을'} 삭제하시겠습니까?`}
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

  .fileName {
    ${({ theme }) => theme.typography.subtitle};
    color: ${(props) => props.theme.colors.grayScale02};

    &:hover {
      ${({ theme }) => theme.typography.subtitle2};
    }
  }
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  border: none;
  color: ${(props) => props.theme.colors.grayScale02};
  background-color: transparent;

  ${({ theme }) => theme.typography.subtitle};

  &::placeholder {
    ${({ theme }) => theme.typography.caption3};
    color: ${(props) => props.theme.colors.grayScale05};
  }

  width: 100%;
`;

export default HistoryItem;
