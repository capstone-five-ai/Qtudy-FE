import styled from 'styled-components';
import { ReactComponent as SpinnerImage } from '../../assets/images/spinner.svg';
import { ReactComponent as LogoImage } from '../../assets/logo/logo_main.svg';

function Loader() {
  return (
    <LoadingWrapper>
      <ImageContainer>
        <SpinnerImage className="spinner" />
        <LogoImage className="logo" />
      </ImageContainer>
    </LoadingWrapper>
  );
}

export default Loader;

const LoadingWrapper = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;

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

const ImageContainer = styled.div`
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
    width: 79px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
