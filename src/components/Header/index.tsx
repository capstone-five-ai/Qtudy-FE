import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import AuthApi from '../../api/AuthApi';
import { ReactComponent as Logo } from '../../assets/logo/logo_main.svg';
import authState from '../../recoil/atoms/authState';
import navigateToLogin from '../../utils/navigateToLogin';
import KakaoLoginSmallButton from '../Button/KakaoLoginSmallButton';
import Typography from '../Typography';
import MenuBar from './MenuBar';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigateToLogin();
  };

  const handleLogout = async () => {
    const response = await AuthApi.logout();

    if (response) {
      setIsAuthenticated(false);
      navigate('/');
    }
  };

  return (
    <Container>
      <InnerContainer>
        <div className="menu-list">
          <Link to="/select">
            <Logo width="113px" height="60px" style={{ marginRight: '60px' }} />
          </Link>
          <MenuBar />
        </div>
        {isAuthenticated ? (
          <LogoutButton type="button" onClick={handleLogout}>
            <Typography variant="subtitle" color="grayScale04" hoverColor="grayScale02">
              Logout
            </Typography>
          </LogoutButton>
        ) : (
          <KakaoLoginSmallButton handleClick={handleLogin} />
        )}
      </InnerContainer>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  background: ${(props) => props.theme.colors.mainMintLight};
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
  padding: 0px 20px;
  max-width: 1200px;
  height: 64px;

  .menu-list {
    display: flex;
    align-items: center;
  }
`;

const LogoutButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;
