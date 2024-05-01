import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';

const PLACEHOLDER = {
  question: '퀴즈 질문을 입력해주세요.',
  choice: '항목을 입력해주세요.',
};

export interface QuizInputFieldProps {
  type: 'question' | 'choice';
  value: string;
  index: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleDelete?: (index: number) => void;
}

QuizInputField.defaultProps = {
  handleDelete: undefined,
};

function QuizInputField({ type, value, index, handleChange, handleDelete }: QuizInputFieldProps) {
  return (
    <StyledContainer>
      <StyledInput placeholder={PLACEHOLDER[type]} value={value} onChange={(e) => handleChange(e, index)} />
      <StyledIconContainer>
        {type === 'choice' && handleDelete && (
          <DeleteIcon
            className="icon"
            onClick={() => {
              handleDelete(index);
            }}
          />
        )}
      </StyledIconContainer>
    </StyledContainer>
  );
}

export default QuizInputField;

const StyledContainer = styled.div`
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

const StyledIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  .icon {
    cursor: pointer;
  }
`;
