import styled from 'styled-components';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ReactComponent as LoaderIcon } from '../../assets/icons/icon-loader.svg';
import { ReactComponent as TwinkleIcon } from '../../assets/icons/icon-twinkle.svg';
import Typography from '../Typography';
import loadingSelector from '../../recoil/selectors/loading';

function Loader({ isLoading }: { isLoading: boolean }) {
  const setShowLoader = useSetRecoilState(loadingSelector);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Container>
      <LoadingContainer>
        <LoaderIcon />
        {isLoading ? <Generating /> : <Complete />}
      </LoadingContainer>
    </Container>
  );
}

export default Loader;

function Generating() {
  return (
    <GenerateContainer>
      <Typography variant="h3" color="grayScale09">
        Generating
      </Typography>
      <Loading />
    </GenerateContainer>
  );
}

function Complete() {
  return (
    <CompleteContainer>
      <TwinkleIcon />
      <Typography variant="h3" color="mainMint">
        Complete!
      </Typography>
    </CompleteContainer>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const LoadingContainer = styled.div`
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
`;

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
    fill: ${(props) => props.theme.colors.mainMint};
  }
`;

const Loading = styled.span`
  width: 3px;
  height: 3px;

  color: #fff;
  border-radius: 50%;

  animation-fill-mode: both;
  animation: bblFadInOut 1.8s infinite ease-in-out;

  font-size: 7px;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;

  &:before,
  &:after {
    content: '';
    border-radius: 50%;
    width: 3px;
    height: 3px;
    animation-fill-mode: both;
    animation: bblFadInOut 1.8s infinite ease-in-out;
    position: absolute;
    top: 0;
  }

  &:before {
    left: -5px;
    animation-delay: -0.32s;
  }

  &:after {
    left: 5px;
  }

  @keyframes bblFadInOut {
    0%,
    80%,
    100% {
      box-shadow: 0 7px 0 -3px;
    }
    40% {
      box-shadow: 0 7px 0 0;
    }
  }
`;
