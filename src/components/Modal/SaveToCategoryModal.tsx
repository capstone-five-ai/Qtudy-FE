import PlainButton from '@/components/Button/PlainButton';
import CheckBox from '@/components/CheckBox/CheckBox';
import NewCategoryInputField from '@/components/InputField/CategoryInputFieldContainer';
import DefaultModal from '@/components/Modal/DefaultModal';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import { CategoryInfoType } from '@/types/category.type';
import { useState } from 'react';
import styled from 'styled-components';

interface SaveToCategoryModalProps {
  onClose: () => void;
}

function SaveToCategoryModal({ onClose }: SaveToCategoryModalProps) {
  const [categories, setCategories] = useState<CategoryInfoType[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [saveCategoryIds, setSaveCategoryIds] = useState<number[]>([]);
  /* const [categories, setCategories] = useState<CategoryInfoType[]>([]);

  
  const [saveCategoryIds, setSaveCategoryIds] = useState<number[]>([]);
  const [showWarn, setShowWarn] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const getCategories = useCallback(async () => {
    const data = await CategoryApi.getCategoryList(categoryType);
    setCategories(data.data);
  }, [categoryType]);

  useEffect(() => {
    getCategories();
  }, [categoryType, getCategories]);

  const handleChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handlePostCategory = async () => {
    try {
      const data = await CategoryApi.createCategory(newCategory, categoryType);
      setCategories([...categories, data]);
      setShowWarn(false);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 400)
        setShowWarn(true);
    }
  }; */

  /* const handleClickSave = async () => {
    if (categoryType === 'summary')
      await CategoryApi.saveSummaryToCategory(
        saveCategoryIds,
        contentId,
        generateType
      );
    if (categoryType === 'quiz')
      await CategoryApi.saveProblemToCategory(
        saveCategoryIds,
        contentId,
        generateType
      );

    onClose();
  }; */

  /* return (
    <ModalContainer onClose={onClose}>
      <Wrapper>
        <Header>
          <Typography variant="button">
            나만의 카테고리에 저장하고 관리할 수 있어요
          </Typography>
        </Header>
        {categories.length > 0 && (
          <CategoryWrapper>
            <CategoryList
              categories={categories}
              saveCategoryIds={saveCategoryIds}
              setSaveCategoryIds={setSaveCategoryIds}
            />
          </CategoryWrapper>
        )}
        <NewCategoryWrapper>
          <NewCategoryButton onClick={() => setShowInput((prev) => !prev)}>
            <AddCategory />
            <Typography variant="caption2">카테고리 추가</Typography>
          </NewCategoryButton>
          <>
            {showInput && (
              <FormWrapper>
                <InputWrapper>
                  <InputField
                    error={showWarn}
                    value={newCategory}
                    onChange={handleChangeCategory}
                    placeholder="카테고리명을 입력해주세요."
                  />
                </InputWrapper>
                <CompleteButton onClick={handlePostCategory} />
              </FormWrapper>
            )}
            {showWarn && (
              <Typography variant="caption4" color="errorRed">
                중복되는 카테고리입니다.
              </Typography>
            )}
          </>
        </NewCategoryWrapper>

        <ButtonWrapper>
          <CTAButton size="small" onClick={handleClickSave}>
            저장
          </CTAButton>
        </ButtonWrapper>
      </Wrapper>
    </ModalContainer>
  ); */

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
            handleSubmit={() => {}}
          />
        </StyledModalContent>
        <PlainButton size="small">저장</PlainButton>
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

/* const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 32px 20px 32px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;

  margin-bottom: 40px;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 24px;
  width: 100%;
`;

const NewCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const NewCategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;

  width: fit-content;
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin-top: 40px;
`; */
