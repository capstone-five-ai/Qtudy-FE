import styled, { css } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '../../../../components/Typography';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit_gray.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';
import { ReactComponent as CompleteIcon } from '../../../../assets/icons/complete.svg';
import { CategoryInfoType } from '../../../../types';
import DeleteModal from '../../../../components/Modal/DeleteModal';

interface CategoryProps {
  category: CategoryInfoType;
  active: boolean;
  handleEditCategory: (id: number, name: string) => void;
  handleDeleteCategory: (id: number) => void;
  setActiveCategoryName: React.Dispatch<React.SetStateAction<string>>;
}

function Category({
  category,
  active,
  handleEditCategory,
  handleDeleteCategory,
  setActiveCategoryName,
}: CategoryProps) {
  const [editMode, setEditMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as HTMLElement)) {
        setEditMode(false);
        handleEditCategory(category.categoryId, newCategoryName);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, newCategoryName]);

  return (
    <Container
      type="button"
      $active={active}
      onClick={() => {
        setActiveCategoryName(category.categoryName);
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('categoryId', String(category.categoryId));
        navigate(`${location.pathname}?${searchParams.toString()}`);
      }}
    >
      {editMode ? (
        <>
          <Input
            ref={inputRef}
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="파일명을 입력해주세요."
          />
          <div className="icon-list">
            <CompleteIcon
              onClick={() => handleEditCategory(category.categoryId, newCategoryName)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </>
      ) : (
        <>
          {showDeleteModal && (
            <DeleteModal
              onCancel={() => setShowDeleteModal(false)}
              onConfirm={() => handleDeleteCategory(category.categoryId)}
              title="카테고리를 삭제하시겠습니까?"
            />
          )}
          <Typography variant="body2" color={active ? 'mainMintDark' : `grayScale02`}>
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
              <DeleteIcon onClick={() => setShowDeleteModal(true)} style={{ cursor: 'pointer' }} />
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default Category;

const Container = styled.button<{ $active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding: 12px 0px 12px 20px;
  border-left: 1px solid ${(props) => props.theme.colors.grayScale06};

  position: relative;

  ${(props) =>
    props.$active &&
    css`
      &:before {
        content: '';
        width: 2px;
        height: 100%;
        position: absolute;
        top: 0;
        left: -1px;
        background-color: ${props.theme.colors.mainMint};
      }
    `}

  & > div:nth-child(1) {
    word-break: break-all;
    cursor: pointer;
    padding-right: ${(props) => (props.$active ? '10px' : '20px')};
  }

  .icon-list {
    display: flex;
    gap: 16px;
  }

  &:hover {
    ${(props) =>
      !props.$active &&
      css`
        background: ${props.theme.colors.grayScale07};
      `}
  }
`;

const Input = styled.input`
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
