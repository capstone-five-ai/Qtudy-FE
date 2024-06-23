import FileTypeChip from '@/components/Chip/FileTypeChip';
import Typography from '@/components/Typography/Typography';
import HistoryPagination from '@/containers/HistoryPage/HistoryPagination';
import { useGetQuizHistory, useGetSummaryHistory } from '@/hooks/useGetHistory';
import { ServiceType } from '@/types/category.type';
import { HistoryType } from '@/types/history.type';
import { useState } from 'react';
import styled from 'styled-components';

const HistoryPage = () => {
  const [filter, setFilter] = useState<ServiceType>('QUIZ');
  const [page, setPage] = useState(1);

  const { data: quizData, isFetching: isQuizFetching } =
    useGetQuizHistory(page);
  const { data: summaryData, isFetching: isSummaryFetching } =
    useGetSummaryHistory(page);

  const initPage = (filterType: ServiceType) => {
    setPage(1);
    setFilter(filterType);
  };

  if (isQuizFetching || isSummaryFetching || !quizData || !summaryData)
    return <div />;

  const quizzes = {
    histories: quizData.content.map((item: HistoryType) => {
      return { ...item, dtype: 'QUIZ' };
    }),
    totalPages: quizData.totalPages,
  };

  const summaries = {
    histories: summaryData.content,
    totalPages: summaryData.totalPages,
  };
  return (
    <Wrapper>
      <Header>
        {(filter === 'QUIZ' && quizzes.histories.length > 0) ||
        (filter === 'SUMMARY' && summaries.histories.length > 0) ? (
          <Title>
            <Typography variant="button">
              AI가 생성한 퀴즈 및 요약이에요
            </Typography>
          </Title>
        ) : (
          <div />
        )}
        {quizzes.histories.length + summaries.histories.length > 0 && (
          <ChipWrapper>
            <FileTypeChip
              selected={filter === 'QUIZ'}
              onClick={() => initPage('QUIZ')}
            >
              퀴즈
            </FileTypeChip>
            <FileTypeChip
              selected={filter === 'SUMMARY'}
              onClick={() => initPage('SUMMARY')}
            >
              요약
            </FileTypeChip>
          </ChipWrapper>
        )}
      </Header>
      <HistoryPagination
        page={page}
        handlePageClick={({ selected }: { selected: number }) => {
          setPage(selected + 1);
        }}
        type={
          quizzes.histories.length + summaries.histories.length === 0
            ? 'ALL'
            : filter
        }
        histories={filter === 'QUIZ' ? quizzes.histories : summaries.histories}
        totalPages={
          filter === 'QUIZ' ? quizzes.totalPages : summaries.totalPages
        }
      />
    </Wrapper>
  );
};

export default HistoryPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 20px 23px 20px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  padding-left: 32px;
  align-items: center;
`;

const ChipWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
