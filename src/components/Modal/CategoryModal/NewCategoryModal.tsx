import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import CategoryApi from '../../../api/CategoryApi';
import { ReactComponent as AddCategory } from '../../../assets/icons/add_category.svg';
import { CategoryInfoType } from '../../../types';
import CompleteButton from '../../Button/CompleteButton';
import InputField from '../../Input/InputField';
import Typography from '../../Typography';
import ModalContainer from '../ModalContainer';
import { CategoryType } from '../../../types/category.type';

type Props = {
  onClose: () => void;
  categoryType: keyof CategoryType;
  categoryList: CategoryInfoType[];
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryInfoType[]>>;
};

function NewCategoryModal({ onClose, categoryType, categoryList, setCategoryList }: Props) {
  const [newCategory, setNewCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);

  const handlePostCategory = async () => {
    setCategoryError(false);
    await CategoryApi.createCategory(newCategory, categoryType)
      .then((data) => {
        setCategoryList([...categoryList, data]);
        onClose();
      })
      .catch((err) => {
        if (err.response.data.errorCode === 'C-002') setCategoryError(true);
      });
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  return (
    <ModalContainer onClose={onClose}>
      <Wrapper>
        <NewCategoryWrapper>
          <NewCategoryButton type="button">
            <AddCategory />
            <Typography variant="caption2">카테고리 추가</Typography>
          </NewCategoryButton>
          <FormWrapper>
            <InputWrapper>
              <InputField
                value={newCategory}
                onChange={handleChangeCategory}
                error={categoryError}
                errorMessage="중복되는 카테고리입니다."
              />
            </InputWrapper>
            <CompleteButton onClick={handlePostCategory} />
          </FormWrapper>
        </NewCategoryWrapper>
      </Wrapper>
    </ModalContainer>
  );
}

const Wrapper = styled.div`
  padding: 0px 32px;
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

  cursor: pointer;

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

  > input {
    flex: 1;
  }
`;

export default NewCategoryModal;
