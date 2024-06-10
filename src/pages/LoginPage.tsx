import LoginButton from '@/components/Button/LoginButton';
import Typography from '@/components/Typography/Typography';
import BrandMotion from '@/containers/LoginPage/BrandMotion';
import navigateToLogin from '@/utils/navigateToLogin';
import styled, { keyframes } from 'styled-components';

function LoginPage() {
  return (
    <>
      <BrandWrapper>
        <BrandMotion />
      </BrandWrapper>
      <LoginWrapper>
        <LoginButton onClick={navigateToLogin}>Login with Kakao</LoginButton>
        <Typography variant="caption3">
          로그인 후 서비스 이용이 가능합니다
        </Typography>
      </LoginWrapper>
    </>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BrandWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.colors.mainMintLight};
`;

const LoginWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100vw;
  left: 0;
  bottom: 27%;

  animation: ${fadeIn} 700ms ease-in-out forwards;
`;

export default LoginPage;
