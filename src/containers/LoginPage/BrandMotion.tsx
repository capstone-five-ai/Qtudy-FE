import { ReactComponent as Logo } from '@/assets/logo/qtudy.svg';
import Typography from '@/components/Typography';
import styled, { keyframes } from 'styled-components';

function BrandMotion() {
  return (
    <AnimatedBrand>
      <AnimatedLogo />
    </AnimatedBrand>
  );
}

function Brand() {
  return (
    <Wrapper>
      <Typography variant="h4" color="mainMintDark">
        AI가 생성한 퀴즈와 요약으로 효율적인 학습을 돕는
      </Typography>
      <Logo />
    </Wrapper>
  );
}

const slideAndShrink = keyframes`
  0% {
    transform: translateY(0) scale(1);
  }
  30% {
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(-118.66px) scale(0.8);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimatedLogo = styled(Brand)`
  animation: ${slideAndShrink} 700ms ease-in-out forwards;
  height: auto;
`;

const AnimatedBrand = styled.div`
  animation: ${slideAndShrink} 700ms ease-in-out forwards;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    text-align: center;
  }
`;

export default BrandMotion;
