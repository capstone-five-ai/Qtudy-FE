import { styled } from 'styled-components';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/icon-edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/icon-trash.svg';

import PDFButton from '../../../../../components/Button/PDFButton';
import Typography from '../../../../../components/Typography';
import { HistoryType } from '../../../../../types/history.type';
import { CreatedTime, Delete, FileName, Filter, PDFDown } from '../../ItemLayout';

type Props = {
  history: HistoryType;
};

function HistoryItem({ history }: Props) {
  const filterName = history.dtype === 'PROBLEM' ? '퀴즈' : '요약';
  return (
    <Wrapper>
      <Filter>
        <Typography variant="subtitle">{filterName}</Typography>
      </Filter>
      <FileName>
        <Typography variant="subtitle">{history.fileName}</Typography>
        <EditIcon width={20} height={20} />
      </FileName>
      <CreatedTime>
        <Typography variant="body3" color="grayScale03">
          {history.createTime}
        </Typography>
      </CreatedTime>
      <PDFDown>
        <PDFButton label="퀴즈" variant={2} />
        <PDFButton label="정답" variant={2} />
      </PDFDown>
      <Delete>
        <Typography variant="button" color="grayScale03">
          <DeleteIcon width={20} height={20} />
        </Typography>
      </Delete>
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

export default HistoryItem;
