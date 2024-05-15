import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import HistoryApi from '../../../api/HistoryApi';
import Chip from '../../../components/Chip';
import Typography from '../../../components/Typography';
import { HistoryType } from '../../../types/history.type';
import EmptyHistory from './EmptyHistory';
import HistoryPagination from './HistoryPagination';

const PROBLEM = 'PROBLEM';
const SUMMARY = 'SUMMARY';

interface HistoryPageType {
  histories: HistoryType[];
  totalPages: number;
}

function History() {
  const [filter, setFilter] = useState<'PROBLEM' | 'SUMMARY'>(PROBLEM);
  const [quizes, setQuizes] = useState<HistoryPageType>({ histories: [], totalPages: 0 });
  const [summaries, setSummaries] = useState<HistoryPageType>({ histories: [], totalPages: 0 });

  const getQuizes = async (quizPage: number) => {
    const response = await HistoryApi.getQuizList(quizPage);
    const newHistories = response.content;
    setQuizes({ histories: newHistories, totalPages: response.totalPages });
  };

  const getSummaries = async (summaryPage: number) => {
    const response = await HistoryApi.getSummaryList(summaryPage);
    const newHistories = response.content;
    setSummaries({ histories: newHistories, totalPages: response.totalPages });
  };

  const updateList = useCallback(
    (updatePage: number) => {
      if (filter === 'PROBLEM') getQuizes(updatePage);
      if (filter === 'SUMMARY') getSummaries(updatePage);
    },
    [filter]
  );

  useEffect(() => {
    updateList(1);
  }, [filter, updateList]);

  if (quizes.totalPages === 0 && summaries.totalPages === 0) {
    return <EmptyHistory type="all" />;
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
      <HistoryPagination
        type={filter === PROBLEM ? 'quiz' : 'summary'}
        fetchPage={updateList}
        histories={filter === PROBLEM ? quizes.histories : summaries.histories}
        totalPages={filter === PROBLEM ? quizes.totalPages : summaries.totalPages}
      />
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

export default History;
