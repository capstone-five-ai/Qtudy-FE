import PlainButton from '@/components/Button/PlainButton';
import DefaultModal from '@/components/Modal/DefaultModal';
import styled from 'styled-components';
import DeleteIcon from '../Icon/DeleteIcon';

interface DeleteItemModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
}

// TODO: 삭제 성공 시 토스트 메시지 띄우기
function DeleteItemModal({ onConfirm, onCancel, title }: DeleteItemModalProps) {
  return (
    <DefaultModal height="224px">
      <StyledModalContentContainer>
        <StyledTitle>
          <StyledLinkIcon>
            <DeleteIcon />
          </StyledLinkIcon>
          <span>{title}</span>
        </StyledTitle>
        <StyledButtonContainer>
          <PlainButton size="small" variant="gray" onClick={onCancel}>
            취소
          </PlainButton>
          <PlainButton size="small" onClick={onConfirm}>
            삭제
          </PlainButton>
        </StyledButtonContainer>
      </StyledModalContentContainer>
    </DefaultModal>
  );
}

export default DeleteItemModal;

const StyledModalContentContainer = styled.div`
  height: 100%;
  padding: 21px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 44px;
`;

const StyledLinkIcon = styled.div`
  width: 36px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 18px;
  background: ${({ theme }) => theme.colors.grayScale09};
  box-shadow: 0px 4px 8px 0px rgba(54, 189, 180, 0.24);

  svg {
    width: 24px;
    height: 24px;
  }
`;

const StyledTitle = styled.div`
  ${({ theme }) => theme.typography.button};
  color: ${({ theme }) => theme.colors.grayScale02};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 36px;
`;
