import styled from 'styled-components';
import { ReactComponent as CheckIcon } from '../../assets/icons/complete.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit_gray.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { UserQuizInputType } from '../../types';

const PLACEHOLDER = {
  question: '퀴즈 질문을 작성해주세요.',
  option: '선지 내용을 작성해주세요.',
};

export interface QuizInputFieldProps {
  type: 'question' | 'option';
  input: UserQuizInputType;
  index: number;
  handleEdit: (index: number) => void;
  handleCheck: (index: number) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleDelete?: (index: number) => void;
}

QuizInputField.defaultProps = {
  handleDelete: undefined,
};

function QuizInputField({
  type,
  input,
  index,
  handleEdit,
  handleCheck,
  handleChange,
  handleDelete,
}: QuizInputFieldProps) {
  return (
    <Container>
      <StyledInput
        placeholder={PLACEHOLDER[type]}
        value={input.input}
        onChange={(e) => handleChange(e, index)}
        disabled={input.check}
      />
      <IconContainer>
        {input.check ? (
          <EditIcon
            className="icon"
            onClick={() => {
              handleEdit(index);
            }}
          />
        ) : (
          <CheckIcon
            className="icon"
            onClick={() => {
              handleCheck(index);
            }}
          />
        )}
        {type === 'option' && handleDelete && (
          <DeleteIcon
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
`;
