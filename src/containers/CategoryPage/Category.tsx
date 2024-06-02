import { deleteCategory, editCategoryName } from '@/apis/categoryApi';
import { ReactComponent as CompleteIcon } from '@/assets/icons/complete.svg';
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg';
import DeleteIcon from '@/components/Icon/DeleteIcon';
import DeleteItemModal from '@/components/Modal/DeleteItemModal';
import Typography from '@/components/Typography/Typography';
import useToast from '@/hooks/useToast';
import { CategoryType } from '@/types/category.type';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface CategoryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  category: CategoryType;
  active?: boolean;
  refetchCategory: () => void;
}

function Category({
  category,
  active = false,
  refetchCategory,
  ...props
}: CategoryProps) {
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { fireToast } = useToast();

  const handleSubmitCategoryName = async () => {
    try {
      await editCategoryName(
        String(category.categoryId),
        category.categoryType,
        newCategoryName
      );
      setEditMode(false);
      refetchCategory();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(String(category.categoryId));
      fireToast({
        icon: <DeleteIcon width={20} height={20} />,
        message: '항목이 삭제되었습니다',
      });
      setShowDeleteModal(true);
      refetchCategory();
      navigate(
        `/management/category?type=${category.categoryType.toLowerCase()}`
      );
    } catch (e) {}
  };

  return (
    <StyledContainer type="button" $active={active} {...props}>
      {editMode ? (
        <>
          <StyledInput
            ref={inputRef}
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="파일명을 입력해주세요."
          />
          <div className="icon-list">
            <CompleteIcon
              onClick={handleSubmitCategoryName}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </>
      ) : (
        <>
          {showDeleteModal && (
            <DeleteItemModal
              onCancel={() => setShowDeleteModal(false)}
              onConfirm={handleDeleteCategory}
              title="카테고리를 삭제하시겠습니까?"
            />
          )}
          <Typography
            variant="body2"
            color={active ? 'mainMintDark' : `grayScale02`}
          >
            {category.categoryName}
          </Typography>
          {active && (
            <div className="icon-list">
              <EditIcon
                onClick={() => {
                  setNewCategoryName(category.categoryName);
                  setEditMode(true);
                }}
                style={{ cursor: 'pointer' }}
              />
              <DeleteIcon
                width={20}
                height={20}
                onClick={() => setShowDeleteModal(true)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          )}
        </>
      )}
    </StyledContainer>
  );
}

export default Category;

const StyledContainer = styled.button<{ $active: boolean }>`
  position: relative;
  padding: 12px 20px;
  padding-right: 0;
  white-space: pre-line;
  word-break: break-all;

  display: flex;
  justify-content: space-between;
  align-items: center;

  text-align: left;
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.colors.grayScale02};
  background: ${({ theme }) => theme.colors.grayScale09};
  border-left: 1px solid ${({ theme }) => theme.colors.grayScale06};

  &:hover {
    ${({ $active, theme }) =>
      !$active &&
      css`
        background: ${theme.colors.grayScale07};
      `};
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors.grayScale09};
      color: ${theme.colors.mainMintDark};

      &:before {
        content: '';
        width: 2px;
        height: 100%;
        position: absolute;
        top: 0;
        left: -1px;
        background-color: ${theme.colors.mainMint};
      }
    `};

  .icon-list {
    display: flex;
    gap: 16px;
  }
`;

const StyledInput = styled.input`
  border: none;
  color: ${(props) => props.theme.colors.grayScale02};
  background-color: transparent;
  padding: 0;

  ${({ theme }) => theme.typography.body2};

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }

  width: 100%;
`;
