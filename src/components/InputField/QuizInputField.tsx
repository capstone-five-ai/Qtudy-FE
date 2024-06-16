import DeleteIcon from '@/components/Icon/DeleteIcon';
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
  showWarning?: boolean;
  warningMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onDelete?: (index: number) => void;
}

function QuizInputField({
  type,
  index,
  isEdit,
  showWarning = false,
  warningMessage,
  onChange,
  onDelete,
  ...props
}: QuizInputFieldProps) {
  return (
    <div style={{ width: '100%' }}>
      <StyledContainer $type={type} $warning={showWarning}>
        <StyledInput
          placeholder={PLACEHOLDER[type]}
          onChange={(event) => {
            onChange(event, index);
          }}
          disabled={!isEdit}
          {...props}
        />
        <StyledIconContainer>
          {type === 'choice' && (
            <DeleteIcon
              className="icon"
              onClick={() => {
                onDelete && onDelete(index);
              }}
            />
          )}
        </StyledIconContainer>
      </StyledContainer>
      <ErrorMessage $show={showWarning}>{warningMessage}</ErrorMessage>
    </div>
  );
}

export default QuizInputField;

const StyledContainer = styled.div<{
  $type: 'question' | 'choice';
  $warning: boolean;
}>`
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
  border: 0.5px solid transparent;

  &:hover {
    box-shadow: 0px 0px 4px 0px rgba(117, 117, 117, 0.32);
  }

  ${({ $warning, theme }) =>
    $warning &&
    css`
      border-color: ${theme.colors.errorRed};
    `}
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
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  color: ${({ theme }) => theme.colors.errorRed};
  ${({ theme }) => theme.typography.caption3};
  margin-top: 4px;
`;
