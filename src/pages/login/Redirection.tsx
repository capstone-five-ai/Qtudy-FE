import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import AuthApi from '../../api/AuthApi';
import authState from '../../recoil/atoms/authState';

function Redirection() {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get('code');
  const setIsAuthenticated = useSetRecoilState(authState);

  const login = useCallback(async () => {
    if (!code) return;
    const kakaoRes = await AuthApi.authKakao(code);
    const loginRes = await AuthApi.login(kakaoRes.access_token);

    localStorage.setItem('accessToken', loginRes.accessToken);
    localStorage.setItem('refreshToken', loginRes.refreshToken);
    setIsAuthenticated(true);

    navigate('/select');
  }, [code, navigate, setIsAuthenticated]);

  useEffect(() => {
    if (!code) return;
    login();
  }, [code, login]);

  return <div />;
}

export default Redirection;
