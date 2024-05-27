import { ReactComponent as KakaoIcon } from '@/assets/icons/kakao-icon.svg';
import styled from 'styled-components';

interface KakaoLoginSmallButtonProps {
  onClick?: () => void;
}

function KakaoLoginSmallButton({ onClick }: KakaoLoginSmallButtonProps) {
  return (
    <StyledContainer type="button" onClick={onClick}>
      <KakaoIcon />
      Login
    </StyledContainer>
  );
}

export default KakaoLoginSmallButton;

const StyledContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 13px 16px;
  background: ${({ theme }) => theme.colors.kakaoYellow};
  border: none;
  border-radius: 6px;

  color: ${({ theme }) => theme.colors.kakaoBlack};
`;
