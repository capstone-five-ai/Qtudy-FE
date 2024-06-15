import { postNewCategory } from '@/apis/categoryApi';
import NewCategoryInputField from '@/components/InputField/CategoryInputFieldContainer';
import DefaultModal from '@/components/Modal/DefaultModal';
import { ServiceType } from '@/types/category.type';
import { AxiosError } from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

interface NewCategoryModalProps {
  onClose: () => void;
  onSubmit: () => void;
  categoryType: ServiceType;
}

function NewCategoryModal({
  onClose,
  onSubmit,
  categoryType,
}: NewCategoryModalProps) {
  const [newCategory, setNewCategory] = useState('');
  const [showWarn, setShowWarn] = useState(false);

  const handleGenerateNewCategory = async () => {
    try {
      const convertType = categoryType === 'QUIZ' ? 'PROBLEM' : categoryType;
      await postNewCategory(newCategory, convertType);
      setNewCategory('');
      setShowWarn(false);
      onSubmit();
      onClose();
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 400)
        setShowWarn(true);
    }
  };

  return (
    <DefaultModal height="160px" closeButton onClose={onClose}>
      <StyledModalContentContainer>
        <NewCategoryInputField
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value);
          }}
          initialOpen
          handleSubmit={handleGenerateNewCategory}
          isError={showWarn}
          disabledButton
        />
      </StyledModalContentContainer>
    </DefaultModal>
  );
}

export default NewCategoryModal;

const StyledModalContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 52px 32px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
