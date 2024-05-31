import { ReactComponent as AddIcon } from '@/assets/icons/plus-folder.svg';
import NameInputField from '@/components/InputField/NameInputField';
import { useState } from 'react';
import styled from 'styled-components';

interface NewCategoryInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  initialOpen?: boolean;
  handleSubmit: () => void;
  isError?: boolean;
}

function CategoryInputFieldContainer({
  initialOpen = true,
  handleSubmit,
  isError = false,
  ...props
}: NewCategoryInputFieldProps) {
  const [openInput, setOpenInput] = useState(initialOpen);
  return (
    <StyledContainer>
      <StyledAddButton onClick={() => setOpenInput((prev) => !prev)}>
        <AddIcon />
        <span>카테고리 추가</span>
      </StyledAddButton>
      {openInput && (
        <StyledInputFieldContainer>
          <NameInputField
            placeholder="카테고리명을 입력해주세요."
            errorMessage="중복되는 카테고리입니다."
            isError={isError}
            {...props}
          />
          <button type="button" onClick={handleSubmit}>
            완료
          </button>
        </StyledInputFieldContainer>
      )}
    </StyledContainer>
  );
}

export default CategoryInputFieldContainer;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledAddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    ${({ theme }) => theme.typography.caption2};
    color: ${({ theme }) => theme.colors.grayScale02};
  }
`;

const StyledInputFieldContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;

  button {
    width: 56px;
    height: 27px;

    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.mainMintDark};
    background: ${({ theme }) => theme.colors.grayScale09};

    ${({ theme }) => theme.typography.detail};
    color: ${({ theme }) => theme.colors.mainMintDark};
  }
`;
