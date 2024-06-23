import Typography from '@/components/Typography/Typography';
import HistoryItem from '@/containers/HistoryPage/HistoryItem';
import {
  CreatedTime,
  Delete,
  FileName,
  Filter,
  PDFDown,
} from '@/containers/HistoryPage/HistoryList.style';
import { HistoryType } from '@/types/history.type';
import styled from 'styled-components';

type Props = {
  histories: HistoryType[];
};

function HistoryList({ histories }: Props) {
  return (
    <Wrapper>
      <Header>
        <Filter>
          <Typography variant="button" color="grayScale03">
            구분
          </Typography>
        </Filter>
        <FileName>
          <Typography variant="button" color="grayScale03">
            제목
          </Typography>
        </FileName>
        <CreatedTime>
          <Typography variant="button" color="grayScale03">
            생성 시간
          </Typography>
        </CreatedTime>
        <PDFDown>
          <Typography variant="button" color="grayScale03">
            PDF 다운
          </Typography>
        </PDFDown>
        <Delete>
          <Typography variant="button" color="grayScale03">
            삭제
          </Typography>
        </Delete>
      </Header>
      {histories.map((v) => (
        <HistoryItem key={v.fileId} history={v} />
      ))}
    </Wrapper>
  );
}

export default HistoryList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  padding: 16.5px 32px;
  justify-content: center;
  align-items: center;
  gap: 20px;

  border-bottom: 1px solid rgba(62, 215, 205, 0.32);
`;
