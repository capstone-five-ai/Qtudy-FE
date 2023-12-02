import styled from 'styled-components';
import { ReactComponent as KakaoLogo } from '../../assets/icons/icon_kakao.svg';

function KakaoLoginSmallButton({ handleClick }: { handleClick: () => void }) {
  return (
    <Container type="button" onClick={handleClick}>
      <KakaoLogo />
      Login
    </Container>
  );
}

export default KakaoLoginSmallButton;

const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 13px 16px;
  background: ${(props) => props.theme.colors.kakaoYellow};
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
