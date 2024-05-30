import styled from 'styled-components';
import NumberItem from './NumberItem';

interface NumberPanelProps {
  numOfQuiz: number;
  questionNum: number;
  setQuestionNum: React.Dispatch<React.SetStateAction<number>>;
}

function NumberPanel({
  numOfQuiz,
  questionNum,
  setQuestionNum,
}: NumberPanelProps) {
  const handleSelectNum = (num: number) => {
    setQuestionNum(num);
  };

  return (
    <Wrapper>
      {Array.from({ length: numOfQuiz }, (_, index) => (
        <NumButton
          type="button"
          key={index}
          onClick={() => handleSelectNum(index + 1)}
        >
          <NumberItem selected={questionNum === index + 1} num={index + 1} />
        </NumButton>
      ))}
    </Wrapper>
  );
}

export default NumberPanel;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 21px 25px;

  width: 288px;
  gap: 14px 22px;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale06};
  background: ${({ theme }) => theme.colors.grayScale09};
`;

const NumButton = styled.button`
  border: 0;
  background-color: transparent;
  padding: 0;
`;
