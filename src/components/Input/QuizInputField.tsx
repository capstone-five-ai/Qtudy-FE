import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as CheckIcon } from '../../assets/icons/icon-check.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/icon-edit.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/icon-trash.svg';
import { CreateUserQuizInput } from '../../types';

const PLACEHOLDER = {
  question: '퀴즈 질문을 작성해주세요.',
  option: '선지 내용을 작성해주세요.',
};

export interface QuizInputFieldProps {
  type: 'question' | 'option';
  input: CreateUserQuizInput;
  index: number;
  handleEdit: (type: string, index: number) => void;
  handleCheck: (type: string, index: number, input: string) => void;
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
      <StyledInput
        placeholder={PLACEHOLDER[type]}
        value={currentInput}
        onChange={handleInputChange}
        disabled={input.check}
      />
      <IconContainer>
        {input.check ? (
          <EditIcon
            className="icon edit-icon"
            onClick={() => {
              handleEdit(type, index);
            }}
          />
        ) : (
          <CheckIcon
            className="icon"
            onClick={() => {
              handleCheck(type, index, currentInput);
            }}
          />
        )}
        {type === 'option' && handleDelete && (
          <TrashIcon
            className="icon"
            onClick={() => {
              handleDelete(index);
            }}
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

  width: 100%;
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

  &:disabled {
    background: transparent;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  .icon {
    cursor: pointer;
  }

  .edit-icon {
    path {
      fill: ${(props) => props.theme.colors.grayScale04};
    }
  }
`;
