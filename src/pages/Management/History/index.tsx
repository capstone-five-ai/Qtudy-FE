import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { ReactComponent as NextIcon } from '../../../assets/icons/arrow_next.svg';
import { ReactComponent as PrevIcon } from '../../../assets/icons/arrow_prev.svg';
import Chip from '../../../components/Chip';
import Typography from '../../../components/Typography';
import { HistoryType } from '../../../types/history.type';
import HistoryList from './HistoryList';

const PROBLEM = 'PROBLEM';
const SUMMARY = 'SUMMARY';

function History() {
  const [filter, setFilter] = useState<'PROBLEM' | 'SUMMARY'>(PROBLEM);
  const [histories, setHistories] = useState<HistoryType[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // TODO: call api get history by page & filter
    setHistories([
      {
        fileId: 3,
        fileName: '문제파일 이름',
        dtype: 'PROBLEM',
        createTime: '2023-11-26T15:46:55.899476',
      },
      {
        fileId: 2,
        fileName: '문제파일 이름2',
        dtype: 'PROBLEM',
        createTime: '2023-11-26T15:46:11.143202',
      },
      {
        fileId: 4,
        fileName: '문제파일 이름2',
        dtype: 'PROBLEM',
        createTime: '2023-11-26T15:46:11.143202',
      },
      {
        fileId: 5,
        fileName: '문제파일 이름2',
        dtype: 'PROBLEM',
        createTime: '2023-11-26T15:46:11.143202',
      },
      {
        fileId: 6,
        fileName: '문제파일 이름2',
        dtype: 'PROBLEM',
        createTime: '2023-11-26T15:46:11.143202',
      },
      {
        fileId: 7,
        fileName: '문제파일 이름2',
        dtype: 'PROBLEM',
        createTime: '2023-11-26T15:46:11.143202',
      },
      {
        fileId: 8,
        fileName: '문제파일 이름2',
        dtype: 'PROBLEM',
        createTime: '2023-11-26T15:46:11.143202',
      },
      {
        fileId: 9,
        fileName: '문제파일 이름2',
        dtype: 'PROBLEM',
        createTime: '2023-11-26T15:46:11.143202',
      },
    ]);
  }, []);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <Wrapper>
      <Header>
        <Title>
          <Typography variant="button">AI가 생성한 퀴즈 및 요약이에요</Typography>
        </Title>
        <ChipWrapper>
          <Chip selected={filter === PROBLEM} onClick={() => setFilter(PROBLEM)}>
            퀴즈
          </Chip>
          <Chip selected={filter === SUMMARY} onClick={() => setFilter(SUMMARY)}>
            요약
          </Chip>
        </ChipWrapper>
      </Header>
      <ListWrapper>
        <HistoryList histories={histories} />
      </ListWrapper>
      <Pagination>
        <ReactPaginate
          forcePage={page - 1}
          pageCount={3}
          previousLabel={<PrevIcon />}
          nextLabel={<NextIcon />}
          onPageChange={handlePageClick}
        />
      </Pagination>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 16px 60px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.div`
  padding: 0 32px;
`;

const ChipWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ListWrapper = styled.div``;

const Pagination = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 10px;

  > ul {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  a {
    display: flex;
    align-items: center;

    color: var(--grayscale04, #9e9e9e);
    text-align: center;

    font-family: NotoSansRegular;
    font-size: 13px;
    font-style: normal;
    line-height: normal;

    cursor: pointer;
  }

  .selected > a {
    color: var(--grayscale02, #424242);

    font-family: NotoSansBold;
  }
`;

export default History;
