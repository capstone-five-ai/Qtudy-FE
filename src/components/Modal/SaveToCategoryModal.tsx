import { postNewCategory } from '@/apis/categoryApi';
import { postQuizToCategory } from '@/apis/quizCategoryApi';
import { postSummaryToCategory } from '@/apis/summaryCategoryApi';
import { ReactComponent as SaveIcon } from '@/assets/icons/save.svg';
import PlainButton from '@/components/Button/PlainButton';
import CheckBox from '@/components/CheckBox/CheckBox';
import NewCategoryInputField from '@/components/InputField/CategoryInputFieldContainer';
import DefaultModal from '@/components/Modal/DefaultModal';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import { useGetCategoryList } from '@/hooks/useGetCategory';
import useToast from '@/hooks/useToast';
import { CategoryType, ServiceType } from '@/types/category.type';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface SaveToCategoryModalProps {
  categoryType: ServiceType;
  contentId: number;
  onClose: () => void;
}

function SaveToCategoryModal({
  categoryType,
  contentId,
  onClose,
}: SaveToCategoryModalProps) {
  const [showWarn, setShowWarn] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [saveCategoryIds, setSaveCategoryIds] = useState<number[]>([]);
  const { data: fetchedCategoryList } = useGetCategoryList(categoryType);
  const { fireToast } = useToast();

  useEffect(() => {
    if (fetchedCategoryList) {
      setCategories(fetchedCategoryList.data);
    }
  }, [fetchedCategoryList]);

  const handleCheckCategory = (newId: number) => {
    const exist = saveCategoryIds.indexOf(newId);
    if (exist > -1) {
      const newSaveCategoryIds = saveCategoryIds.slice();
      newSaveCategoryIds.splice(exist, 1);

      setSaveCategoryIds(newSaveCategoryIds);
      return;
    }

    const idSet = new Set([...saveCategoryIds, newId]);
    const idArr = Array.from(idSet);

    setSaveCategoryIds(idArr);
  };

  const handleGenerateNewCategory = async () => {
    try {
      const convertType = categoryType === 'QUIZ' ? 'PROBLEM' : categoryType;

      const data = await postNewCategory(newCategory, convertType);
      setCategories([...categories, data]);
      setNewCategory('');
      setShowWarn(false);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 400)
        setShowWarn(true);
    }
  };

  const handlePostCategory = () => {
    try {
      if (categoryType === 'SUMMARY')
        postSummaryToCategory(saveCategoryIds, contentId);
      if (categoryType === 'QUIZ')
        postQuizToCategory(saveCategoryIds, contentId);

      onClose();
      fireToast({ icon: <SaveIcon />, message: '카테고리에 저장되었습니다!' });
    } catch (e) {}
  };

  return (
    <DefaultModal onClose={onClose} closeButton>
      <StyledModalContentContainer>
        <StyledModalContent $hasCategory={categories.length > 0}>
          <div className="title">
            나만의 카테고리에 저장하고 관리할 수 있어요
          </div>
          {categories.length > 0 && (
            <div className="category-list">
              {categories.map((category) => (
                <StyledCategoryItem
                  key={category.categoryId}
                  onClick={() => {
                    handleCheckCategory(category.categoryId);
                  }}
                >
                  <CheckBox
                    checked={saveCategoryIds.includes(category.categoryId)}
                  />
                  <span>{category.categoryName}</span>
                </StyledCategoryItem>
              ))}
            </div>
          )}
          <NewCategoryInputField
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
            }}
            initialOpen={false}
            handleSubmit={handleGenerateNewCategory}
            isError={showWarn}
          />
        </StyledModalContent>
        <PlainButton size="small" onClick={handlePostCategory}>
          저장
        </PlainButton>
      </StyledModalContentContainer>
    </DefaultModal>
  );
}

export default SaveToCategoryModal;

const StyledModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 40px;

  padding: 21px 32px;
`;

const StyledModalContent = styled.div<{ $hasCategory: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $hasCategory }) => ($hasCategory ? '24px' : '40px')};

  .title {
    ${({ theme }) => theme.typography.button};
    color: ${({ theme }) => theme.colors.grayScale02};
    margin-top: 39px;
  }

  .category-list {
    width: 100%;
    max-height: 200px;
    padding: 24px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    border-radius: 4px;
    background: ${({ theme }) => theme.colors.grayScale07};
    box-shadow: 0px 0px 4px 0px rgba(189, 189, 189, 0.28);

    overflow-y: scroll;
    ${Scrollbar}
  }
`;

const StyledCategoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  width: fit-content;
  cursor: pointer;

  span {
    ${({ theme }) => theme.typography.caption3};
    color: ${({ theme }) => theme.colors.grayScale02};
  }
`;
