import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Chip from '../../../components/Chip';
import Typography from '../../../components/Typography';
import { HistoryType } from '../../../types/history.type';
import HistoryList from './HistoryList';

const PROBLEM = 'PROBLEM';
const SUMMARY = 'SUMMARY';

function History() {
  const [filter, setFilter] = useState<'PROBLEM' | 'SUMMARY'>(PROBLEM);
  const [histories, setHistories] = useState<HistoryType[]>([]);

  useEffect(() => {
    // TODO: call api get history
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
    ]);
  }, []);

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

export default History;
