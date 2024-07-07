import { ReactComponent as PrevIcon } from '@/assets/icons/arrow-left.svg';
import { ReactComponent as NextIcon } from '@/assets/icons/arrow-right.svg';
import EmptyHistory from '@/containers/HistoryPage/EmptyHistory';
import HistoryList from '@/containers/HistoryPage/HistoryList';
import { ServiceType } from '@/types/category.type';
import { HistoryType } from '@/types/history.type';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

interface Props {
  histories: HistoryType[];
  totalPages: number;
  type: 'ALL' | ServiceType;
  page: number;
  handlePageClick: ({ selected }: { selected: number }) => void;
}

function HistoryPagination({
  histories,
  totalPages,
  type,
  page,
  handlePageClick,
}: Props) {
  if (type === 'ALL' || histories.length === 0) {
    return <EmptyHistory type={type} />;
  }

  return (
    <>
      <ListWrapper>
        <HistoryList histories={histories} />
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
