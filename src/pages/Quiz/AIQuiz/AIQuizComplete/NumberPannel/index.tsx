import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import NumberItem from './NumberItem';

type Props = {
  numOfQuiz: number;
  questionNum: number;
  setQuestionNum: Dispatch<SetStateAction<number>>;
};

function NumberPannel({ numOfQuiz, questionNum, setQuestionNum }: Props) {
  const handleSelectNum = (num: number) => {
    setQuestionNum(num);
  };

  return (
    <Wrapper>
      {Array.from({ length: numOfQuiz }, (_, index) => (
        <NumButton type="button" key={index} onClick={() => handleSelectNum(index + 1)}>
          <NumberItem selected={questionNum === index + 1} num={index + 1} />
        </NumButton>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 21px 25px;

  gap: 22px;

  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.grayScale06};
  background: ${(props) => props.theme.colors.grayScale09};
`;

const NumButton = styled.button`
  border: 0;
  background-color: transparent;
  padding: 0;
`;

export default NumberPannel;
