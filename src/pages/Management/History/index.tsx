import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import HistoryApi from '../../../api/HistoryApi';
import { ReactComponent as NextIcon } from '../../../assets/icons/arrow_next.svg';
import { ReactComponent as PrevIcon } from '../../../assets/icons/arrow_prev.svg';
import Chip from '../../../components/Chip';
import Typography from '../../../components/Typography';
import { HistoryType } from '../../../types/history.type';
import EmptyHistory from './EmptyHistory';
import HistoryList from './HistoryList';

const PROBLEM = 'PROBLEM';
const SUMMARY = 'SUMMARY';

function History() {
  const [filter, setFilter] = useState<'PROBLEM' | 'SUMMARY'>(PROBLEM);
  const [histories, setHistories] = useState<HistoryType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getQuizes = async (quizPage: number) => {
    const response = await HistoryApi.getQuizList(quizPage);
    const newHistories = response.content;
    setHistories(newHistories);
    setTotalPage(response.totalPages);
  };

  const getSummaries = async (summaryPage: number) => {
    const response = await HistoryApi.getSummaryList(summaryPage);
    const newHistories = response.content;
    setHistories(newHistories);
    setTotalPage(response.totalPages);
  };

  const updateList = useCallback(
    (updatePage: number) => {
      if (filter === 'PROBLEM') getQuizes(updatePage);
      if (filter === 'SUMMARY') getSummaries(updatePage);
      setLoading(false);
    },
    [filter]
  );

  useEffect(() => {
    if (loading) return;
    updateList(page);
  }, [loading, page, updateList]);

  useEffect(() => {
    updateList(1);
    setPage(1);
  }, [filter, updateList]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  if (histories.length === 0) {
    return <EmptyHistory />;
  }

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
        <HistoryList histories={histories} updateList={updateList} />
      </ListWrapper>
      <Pagination>
        <ReactPaginate
          forcePage={page - 1}
          pageCount={totalPage}
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
  gap: 12px;
  padding: 8px 60px 23px 60px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  padding: 0 32px;
  align-items: center;
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

    ${({ theme }) => theme.typography.caption3};

    cursor: pointer;
  }

  .selected > a {
    color: var(--grayscale02, #424242);

    font-family: 'Noto Sans KR';
    font-weight: 700;
  }
`;

export default History;
