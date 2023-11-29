import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as CheckIcon } from '../../assets/icons/icon-check.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/icon-edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/icon-trash.svg';

const PLACEHOLDER = {
  question: '퀴즈 질문을 작성해주세요.',
  option: '선지 내용을 작성해주세요.',
};

interface QuizInput {
  input: string;
  check: boolean;
}

interface QuizInputFieldProps {
  type: 'question' | 'option';
  input: QuizInput;
  index: number;
  handleEdit: (index: number) => void;
  handleCheck: (index: number, input: string) => void;
  handleDelete?: (index: number) => void;
}

QuizInputField.defaultProps = {
  handleDelete: undefined,
};

function QuizInputField({ type, input, index, handleEdit, handleCheck, handleDelete }: QuizInputFieldProps) {
  const [currentInput, setCurrentInput] = useState(input.input);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  return (
    <Container>
      <StyledInput placeholder={PLACEHOLDER[type]} value={currentInput} onChange={handleInputChange} />
      <IconContainer>
        {input.check ? (
          <EditIcon
            onClick={() => {
              handleEdit(index);
            }}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <CheckIcon
            onClick={() => {
              handleCheck(index, currentInput);
            }}
            style={{ cursor: 'pointer' }}
          />
        )}
        {type === 'option' && handleDelete && (
          <TrashIcon
            onClick={() => {
              handleDelete(index);
            }}
            style={{ cursor: 'pointer' }}
          />
        )}
      </IconContainer>
    </Container>
  );
}

export default QuizInputField;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;

  background: ${(props) => props.theme.colors.grayScale09};
  padding: 12px 16px;
  border-radius: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  color: ${(props) => props.theme.colors.grayScale02}
  background: transparent;

  font-family: NotoSansRegular;
  size: 14px;
  line-height: auto;
  letter-spacing: 0;

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
