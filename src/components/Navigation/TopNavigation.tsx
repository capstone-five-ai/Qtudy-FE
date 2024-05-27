import authApi from '@/apis/authApi';
import { ReactComponent as Logo } from '@/assets/logo/qtudy.svg';
import KakaoLoginSmallButton from '@/components/Button/KakaoLoginSmallButton';
import MenuBar from '@/components/Navigation/MenuBar';
import authState from '@/recoils/atoms/authState';
import navigateToLogin from '@/utils/navigateToLogin';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

function TopNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState); // [1
  const navigate = useNavigate();

  const handleLogin = () => {
    navigateToLogin();
  };

  const handleLogout = async () => {
    try {
      const response = await authApi.logout();

      if (response) {
        setIsAuthenticated(false);
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
