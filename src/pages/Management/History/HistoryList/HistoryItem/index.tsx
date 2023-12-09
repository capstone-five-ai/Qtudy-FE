import { FormEvent, useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/icon-edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/icon-trash.svg';
import PDFButton from '../../../../../components/Button/PDFButton';
import DeleteModal from '../../../../../components/Modal/DeleteModal';
import Typography from '../../../../../components/Typography';
import { HistoryType } from '../../../../../types/history.type';
import { CreatedTime, Delete, FileName, Filter, PDFDown } from '../../ItemLayout';

type Props = {
  history: HistoryType;
};

function HistoryItem({ history }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getDateFormat = (dateStr: string) => {
    const date = dateStr.slice(0, -10).replace(/-/g, '.').replace(/T/g, ' ');

    return date;
  };

  const handleClickEdit = () => {
    setEditMode(true);
  };

  const handleClickDelete = () => {
    setShowDeleteModal(true);
  };

  const editFileName = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: put filename api call
    setEditMode(false);
  };

  const deleteFile = () => {
    // TODO: delete api call
    setShowDeleteModal(false);
  };

  const filterName = history.dtype === 'PROBLEM' ? '퀴즈' : '요약';
  return (
    <Wrapper>
      <Filter>
        <Typography variant="subtitle">{filterName}</Typography>
      </Filter>
      <FileName>
        {editMode ? (
          <Form onSubmit={editFileName}>
            <Input placeholder="지정하실 파일명을 입력해주세요." />
          </Form>
        ) : (
          <>
            <Typography variant="subtitle">{history.fileName}</Typography>
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
        <PDFButton label="퀴즈" variant={2} />
        <PDFButton label="정답" variant={2} />
      </PDFDown>
      <Delete>
        <DeleteIcon width={20} height={20} cursor="pointer" onClick={handleClickDelete} />
      </Delete>
      {showDeleteModal && (
        <DeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={deleteFile}
          title="요약을 삭제하시겠습니까?"
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
