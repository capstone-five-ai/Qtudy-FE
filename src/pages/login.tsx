import styled, { keyframes } from 'styled-components';
import BrandMotion from '../components/BrandMotion';
import LoginButton from '../components/Button/LoginButton';
import Typography from '../components/Typography';
import MainWrapper from '../components/Wrapper/MainWrapper';

function Login() {
  // TODO: 로그인 구현
  const loginPath = 'http://localhost:8080/api/oauth/login';
  const handleLogin = () => {
    window.location.href = loginPath;
  };

  return (
    <MainWrapper>
      <BrandWrapper>
        <BrandMotion />
      </BrandWrapper>
      <LoginWrapper>
        <LoginButton onClick={handleLogin}>Login with Kakao</LoginButton>
        <Typography variant="caption3">로그인 후 서비스 이용이 가능합니다</Typography>
      </LoginWrapper>
    </MainWrapper>
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

export default Login;
