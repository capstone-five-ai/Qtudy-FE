import { getAIQuizAllFile } from '@/apis/quizApi';
import { getAISummaryAllFile } from '@/apis/summaryApi';
import FileTypeChip from '@/components/Chip/FileTypeChip';
import Typography from '@/components/Typography/Typography';
import HistoryPagination from '@/containers/HistoryPage/HistoryPagination';
import { ServiceType } from '@/types/category.type';
import { HistoryType } from '@/types/history.type';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

interface HistoryPageType {
  histories: HistoryType[];
  totalPages: number;
}

const HistoryPage = () => {
  const [filter, setFilter] = useState<ServiceType>('QUIZ');
  const [quizes, setQuizes] = useState<HistoryPageType>();
  const [summaries, setSummaries] = useState<HistoryPageType>();

  const getQuizes = async (quizPage: number) => {
    const response = await getAIQuizAllFile(quizPage);
    const newHistories = response.content.map((item: HistoryType) =>
      item.dtype === 'PROBLEM' ? { ...item, dtype: 'QUIZ' } : item
    );

    setQuizes({ histories: newHistories, totalPages: response.totalPages });
  };

  const getSummaries = async (summaryPage: number) => {
    const response = await getAISummaryAllFile(summaryPage);
    const newHistories = response.content;
    setSummaries({ histories: newHistories, totalPages: response.totalPages });
  };

  const updateList = useCallback(
    (updatePage: number) => {
      if (filter === 'QUIZ') getQuizes(updatePage);
      if (filter === 'SUMMARY') getSummaries(updatePage);
    },
    [filter]
  );

  useEffect(() => {
    getQuizes(1);
    getSummaries(1);
  }, []);

  if (!quizes || !summaries) return null;

  return (
    <Wrapper>
      <Header>
        {(filter === 'QUIZ' && quizes.histories.length > 0) ||
        (filter === 'SUMMARY' && summaries.histories.length > 0) ? (
          <Title>
            <Typography variant="button">
              AI가 생성한 퀴즈 및 요약이에요
            </Typography>
          </Title>
        ) : (
          <div />
        )}
        {quizes.histories.length + summaries.histories.length > 0 && (
          <ChipWrapper>
            <FileTypeChip
              selected={filter === 'QUIZ'}
              onClick={() => setFilter('QUIZ')}
            >
              퀴즈
            </FileTypeChip>
            <FileTypeChip
              selected={filter === 'SUMMARY'}
              onClick={() => setFilter('SUMMARY')}
            >
              요약
            </FileTypeChip>
          </ChipWrapper>
        )}
      </Header>
      <HistoryPagination
        type={
          quizes.histories.length + summaries.histories.length === 0
            ? 'ALL'
            : filter
        }
        fetchPage={updateList}
        histories={filter === 'QUIZ' ? quizes.histories : summaries.histories}
        totalPages={
          filter === 'QUIZ' ? quizes.totalPages : summaries.totalPages
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
