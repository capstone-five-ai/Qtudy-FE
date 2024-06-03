import authState from '@/recoils/atoms/authState';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

function useRedirect() {
  const isAuthenticated = useRecoilValue(authState);
  const navigate = useNavigate();

  const redirect = (redirectPath: string) => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  return redirect;
}

export default useRedirect;
