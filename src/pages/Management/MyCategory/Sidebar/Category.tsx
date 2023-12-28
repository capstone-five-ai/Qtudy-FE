import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '../../../../components/Typography';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit_gray.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';
import { CategoryInfoType } from '../../../../types';

interface CategoryProps {
  category: CategoryInfoType;
  active: boolean;
  setActiveCategory: React.Dispatch<React.SetStateAction<CategoryInfoType | null>>;
  handleEditCategory: (id: number, name: string) => void;
  handleDeleteCategory: (id: number) => void;
}

function Category({ category, active, setActiveCategory, handleEditCategory, handleDeleteCategory }: CategoryProps) {
  const [editMode, setEditMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

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
    <Container type="button" $active={active} onClick={() => setActiveCategory(category)}>
      {editMode ? (
        <Input
          ref={inputRef}
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="지정하실 파일명을 입력해주세요."
        />
      ) : (
        <>
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
              <DeleteIcon onClick={() => handleDeleteCategory(category.categoryId)} style={{ cursor: 'pointer' }} />
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
  text-align: left;
  padding: 8px 0px 8px 20px;

  border: none;
  border-left: 2px solid;
  border-color: ${(props) => (props.$active ? props.theme.colors.mainMint : 'transparent')};
  background: transparent;

  & > div:nth-child(1) {
    word-break: break-all;
    cursor: pointer;
    padding-right: ${(props) => (props.$active ? '10px' : '20px')};
  }

  .icon-list {
    display: flex;
    gap: 16px;
  }
`;

const Input = styled.input`
  border: none;
  color: ${(props) => props.theme.colors.grayScale02};
  background-color: transparent;
  padding: 0;

  font-family: NotoSansRegular;
  font-size: 14px;
  line-height: auto;
  letter-spacing: 0;

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }

  width: 100%;
`;
