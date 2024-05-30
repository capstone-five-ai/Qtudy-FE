import NewCategoryInputField from '@/components/InputField/CategoryInputFieldContainer';
import DefaultModal from '@/components/Modal/DefaultModal';
import { useState } from 'react';
import styled from 'styled-components';

interface NewCategoryModalProps {
  onClose: () => void;
}

function NewCategoryModal({ onClose }: NewCategoryModalProps) {
  const [newCategory, setNewCategory] = useState('');

  return (
    <DefaultModal height="160px" closeButton onClose={onClose}>
      <StyledModalContentContainer>
        <NewCategoryInputField
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value);
          }}
          initialOpen
          handleSubmit={() => {}}
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
