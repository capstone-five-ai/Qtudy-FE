import { postLogout } from '@/apis/authApi';
import { ReactComponent as Logo } from '@/assets/logo/qtudy.svg';
import KakaoLoginSmallButton from '@/components/Button/KakaoLoginSmallButton';
import MenuBar from '@/components/Navigation/MenuBar';
import authState from '@/recoils/atoms/authState';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

function TopNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      const response = await postLogout();

      if (response) {
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      }
    } catch (error) {
      // TODO: handle error
    }
  };

  return (
    <StyledContainer>
      <StyledInnerContainer>
        <div className="menu-list">
          <Link to="/">
            <Logo width="113px" height="60px" style={{ marginRight: '60px' }} />
          </Link>
          <MenuBar />
        </div>
        {isAuthenticated ? (
          <LogoutButton type="button" onClick={handleLogout}>
            Logout
          </LogoutButton>
        ) : (
          <KakaoLoginSmallButton onClick={handleLogin} />
        )}
      </StyledInnerContainer>
    </StyledContainer>
  );
}

export default TopNavigation;

const StyledContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.mainMintLight};
`;

const StyledInnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
  padding: 0px 40px;
  height: 64px;

  .menu-list {
    display: flex;
    align-items: center;
  }
`;

const LogoutButton = styled.button`
  border: none;
  background: transparent;

  ${({ theme }) => theme.typography.subtitle};
  color: ${({ theme }) => theme.colors.grayScale04};

  &:hover {
    color: ${({ theme }) => theme.colors.grayScale02};
  }
`;
