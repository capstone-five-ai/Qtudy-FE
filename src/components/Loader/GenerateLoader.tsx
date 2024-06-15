import { ReactComponent as TwinkleIcon } from '@/assets/icons/twinkle.svg';
import { ReactComponent as SpinnerImage } from '@/assets/images/loader.svg';
import { ReactComponent as LogoIcon } from '@/assets/logo/qtudy.svg';
import Typography from '@/components/Typography/Typography';
import loadingState from '@/recoils/atoms/loadingState';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

function Generating() {
  return (
    <GenerateContainer>
      <Typography variant="h3" color="grayScale05">
        Generating ...
      </Typography>
    </GenerateContainer>
  );
}

function Complete() {
  return (
    <CompleteContainer>
      <TwinkleIcon />
      <Typography variant="h3" color="grayScale09">
        Complete!
      </Typography>
    </CompleteContainer>
  );
}

function GenerateLoader({ isLoading }: { isLoading: boolean }) {
  const setShowLoader = useSetRecoilState(loadingState);
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  }, [isLoading]);

  return (
    <StyledContainer>
      <StyledLoadingContainer>
        <StyledImageContainer>
          <LogoIcon className="logo" />
          <SpinnerImage className="spinner" />
        </StyledImageContainer>
        {isLoading ? <Generating /> : <Complete />}
      </StyledLoadingContainer>
    </StyledContainer>
  );
}

export default GenerateLoader;

const GenerateContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding-right: 5px;
`;

const CompleteContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  path {
    fill: ${(props) => props.theme.colors.grayScale09};
  }
`;

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledLoadingContainer = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 10;

  width: 100%;
  height: 100%;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StyledImageContainer = styled.div`
  width: 160px;
  height: 160px;
  position: relative;

  .spinner {
    animation: spin 1s linear infinite;
    position: absolute;
    top: 0;
    left: 0;
  }

  .logo {
    height: 29px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
