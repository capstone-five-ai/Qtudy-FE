import authApi from '@/apis/AuthApi';
import authState from '@/recoils/atoms/authState';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

function RedirectPage() {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get('code');
  const setIsAuthenticated = useSetRecoilState(authState);

  const login = useCallback(async () => {
    if (!code) return;

    try {
      const kakaoRes = await authApi.authKakao(code);
      const loginRes = await authApi.login(kakaoRes.access_token);
      localStorage.setItem('accessToken', loginRes.accessToken);
      localStorage.setItem('refreshToken', loginRes.refreshToken);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      // TODO: 오류 처리 로직 추가 (예: 오류 페이지로 이동, 메시지 표시 등)
    }
  }, [code, navigate, setIsAuthenticated]);

  useEffect(() => {
    if (!code) return;
    login();
  }, [code, login]);

  return null;
}

export default RedirectPage;
