import PlainButton from '@/components/Button/PlainButton';
import DefaultModal from '@/components/Modal/DefaultModal';
import styled from 'styled-components';

interface LoginModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function LoginModal({ onConfirm, onCancel }: LoginModalProps) {
  return (
    <DefaultModal height="224px">
      <StyledModalContentContainer>
        <StyledTitle>
          <span>로그인이 필요한 서비스입니다.</span>
          <span>로그인 페이지로 이동할까요?</span>
        </StyledTitle>
        <StyledButtonContainer>
          <PlainButton size="small" variant="gray" onClick={onCancel}>
            취소
          </PlainButton>
          <PlainButton size="small" onClick={onConfirm}>
            이동
          </PlainButton>
        </StyledButtonContainer>
      </StyledModalContentContainer>
    </DefaultModal>
  );
}

export default LoginModal;

const StyledModalContentContainer = styled.div`
  height: 100%;
  padding: 21px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 54px;
`;

const StyledTitle = styled.div`
  ${({ theme }) => theme.typography.button};
  color: ${({ theme }) => theme.colors.grayScale02};
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 36px;
`;
