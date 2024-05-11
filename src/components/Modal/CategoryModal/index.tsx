import { AxiosError } from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryApi from '../../../api/CategoryApi';
import { ReactComponent as AddCategory } from '../../../assets/icons/add_category.svg';
import { CategoryInfoType } from '../../../types';
import CompleteButton from '../../Button/CompleteButton';
import CTAButton from '../../Button/CTAButton';
import InputField from '../../Input/InputField';
import Typography from '../../Typography';
import ModalContainer from '../ModalContainer';
import CategoryList from './CategoryList';
import { CategoryType } from '../../../types/category.type';

type Props = {
  onClose: () => void;
  categoryType: keyof CategoryType;
  contentId: number;
  generateType: 'ai' | 'user';
};

function CategoryModal({ onClose, categoryType, contentId, generateType }: Props) {
  const [categories, setCategories] = useState<CategoryInfoType[]>([]);

  const [newCategory, setNewCategory] = useState('');
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
      if (e instanceof AxiosError && e.response?.status === 400) setShowWarn(true);
    }
  };

  const handleClickSave = async () => {
    if (categoryType === 'summary') await CategoryApi.saveSummaryToCategory(saveCategoryIds, contentId, generateType);
    if (categoryType === 'quiz') await CategoryApi.saveProblemToCategory(saveCategoryIds, contentId, generateType);

    onClose();
  };

  return (
    <ModalContainer onClose={onClose}>
      <Wrapper>
        <Header>
          <Typography variant="button">나만의 카테고리에 저장하고 관리할 수 있어요</Typography>
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
  );
}

const Wrapper = styled.div`
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
`;

export default CategoryModal;
