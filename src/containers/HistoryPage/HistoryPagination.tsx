import { ReactComponent as PrevIcon } from '@/assets/icons/arrow-left.svg';
import { ReactComponent as NextIcon } from '@/assets/icons/arrow-right.svg';
import EmptyHistory from '@/containers/HistoryPage/EmptyHistory';
import HistoryList from '@/containers/HistoryPage/HistoryList';
import { ServiceType } from '@/types/category.type';
import { HistoryType } from '@/types/history.type';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

interface Props {
  fetchPage: (page: number) => void;
  histories: HistoryType[];
  totalPages: number;
  type: 'ALL' | ServiceType;
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

  if (type === 'ALL' || histories.length === 0) {
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

    ${({ theme }) => theme.typography.caption3};
    color: ${({ theme }) => theme.colors.grayScale04};
    text-align: center;

    cursor: pointer;
  }

  .selected > a {
    ${({ theme }) => theme.typography.caption1};
    color: ${({ theme }) => theme.colors.grayScale02};
  }
`;

export default HistoryPagination;
