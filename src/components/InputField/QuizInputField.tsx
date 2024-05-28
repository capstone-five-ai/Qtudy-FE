import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '@/assets/icons/trash.svg';
import styled, { css } from 'styled-components';

const PLACEHOLDER = {
  question: '퀴즈 질문을 입력해주세요.',
  choice: '항목을 입력해주세요.',
};

interface QuizInputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  type: 'question' | 'choice';
  index: number;
  isEdit?: boolean;
  setIsEdit?: (value: boolean) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onDelete?: (index: number) => void;
}

function QuizInputField({
  type,
  index,
  isEdit,
  setIsEdit,
  onChange,
  onDelete,
  ...props
}: QuizInputFieldProps) {
  return (
    <StyledContainer $type={type}>
      <StyledInput
        placeholder={PLACEHOLDER[type]}
        onChange={(event) => {
          onChange(event, index);
        }}
        disabled={!isEdit}
        {...props}
      />
      <StyledIconContainer>
        {!isEdit && (
          <EditIcon
            className="icon"
            onClick={() => {
              setIsEdit && setIsEdit(true);
            }}
          />
        )}
        {type === 'choice' && (
          <DeleteIcon
            className="icon"
            onClick={() => {
              // TODO: 삭제 토스트 구현
              onDelete && onDelete(index);
            }}
          />
        )}
      </StyledIconContainer>
    </StyledContainer>
  );
}

export default QuizInputField;

const StyledContainer = styled.div<{ $type: 'question' | 'choice' }>`
  display: flex;
  align-items: center;
  ${({ $type }) =>
    $type === 'choice' &&
    css`
      gap: 20px;
    `}
  width: 100%;
  background: ${(props) => props.theme.colors.grayScale09};
  padding: 12px 16px;
  border-radius: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
  ${({ theme }) => theme.typography.body2};
  color: ${(props) => props.theme.colors.grayScale02};
  background: transparent;

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }
`;

const StyledIconContainer = styled.div`
  display: flex;
  gap: 16px;

  .icon {
    cursor: pointer;
  }
`;
