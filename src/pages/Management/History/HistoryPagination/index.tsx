import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { ReactComponent as NextIcon } from '../../../../assets/icons/arrow_next.svg';
import { ReactComponent as PrevIcon } from '../../../../assets/icons/arrow_prev.svg';
import { HistoryType } from '../../../../types/history.type';
import EmptyHistory from '../EmptyHistory';
import HistoryList from '../HistoryList';

interface Props {
  fetchPage: (page: number) => void;
  histories: HistoryType[];
  totalPages: number;
  type: 'quiz' | 'summary';
}

function HistoryPagination({ fetchPage, histories, totalPages, type }: Props) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const updateList = useCallback(
    (updatePage: number) => {
      fetchPage(updatePage);
      setLoading(false);
    },
    [fetchPage]
  );

  useEffect(() => {
    if (loading) return;
    updateList(page);
  }, [loading, page, totalPages, updateList]);

  useEffect(() => {
    updateList(1);
    setPage(1);
  }, [updateList]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  if (histories.length === 0) {
    return <EmptyHistory type={type} />;
  }

  return (
    <>
      <ListWrapper>
        <HistoryList histories={histories} updateList={updateList} />
      </ListWrapper>
      <Pagination>
        <ReactPaginate
          forcePage={page - 1}
          pageCount={totalPages}
          previousLabel={<PrevIcon />}
          nextLabel={<NextIcon />}
          onPageChange={handlePageClick}
        />
      </Pagination>
    </>
  );
}

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

export default HistoryPagination;
