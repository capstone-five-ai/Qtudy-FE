import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthApi from '../../api/AuthApi';

function Redirection() {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get('code');

  const login = useCallback(async () => {
    if (!code) return;
    const kakaoRes = await AuthApi.authKakao(code);
    const loginRes = await AuthApi.login(kakaoRes.access_token);

    localStorage.setItem('accessToken', loginRes.accessToken);
    localStorage.setItem('refreshToken', loginRes.refreshToken);

    navigate('/select');
  }, [code, navigate]);

  useEffect(() => {
    if (!code) return;
    login();
  }, [code, login]);

  return <div />;
}

export default Redirection;
