import FileTypeChip from '@/components/Chip/FileTypeChip';
import Typography from '@/components/Typography/Typography';
import HistoryPagination from '@/containers/HistoryPage/HistoryPagination';
import { HistoryType } from '@/types/history.type';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

interface HistoryPageType {
  histories: HistoryType[];
  totalPages: number;
}

const HistoryPage = () => {
  const [filter, setFilter] = useState<'QUIZ' | 'SUMMARY'>('QUIZ');
  const [quizzes, setQuizzes] = useState<HistoryPageType>({
    histories: [
      {
        fileId: 1,
        fileName: '파일이름',
        dtype: 'QUIZ',
        createTime: '둥둥둥',
      },
    ],
    totalPages: 0,
  });
  const [summaries, setSummaries] = useState<HistoryPageType>({
    histories: [],
    totalPages: 0,
  });

  const getQuizzes = async (quizPage: number) => {
    //const response = await HistoryApi.getQuizList(quizPage);
    //const newHistories = response.content;
    //setQuizzes({ histories: newHistories, totalPages: response.totalPages });
  };

  const getSummaries = async (summaryPage: number) => {
    //const response = await HistoryApi.getSummaryList(summaryPage);
    //const newHistories = response.content;
    //setSummaries({ histories: newHistories, totalPages: response.totalPages });
  };

  const updateList = useCallback(
    (updatePage: number) => {
      if (filter === 'QUIZ') getQuizzes(updatePage);
      if (filter === 'SUMMARY') getSummaries(updatePage);
    },
    [filter]
  );

  useEffect(() => {
    getQuizzes(1);
    getSummaries(1);
  }, []);

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
          quizzes.histories.length + summaries.histories.length === 0
            ? 'ALL'
            : filter
        }
        fetchPage={updateList}
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
