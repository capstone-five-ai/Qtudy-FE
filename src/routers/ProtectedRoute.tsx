import authState from '@/recoils/atoms/authState';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

type Props = {
  auth: 'AUTH' | 'NO_AUTH' | 'COMMON';
};

function ProtectedRoute({ auth }: Props) {
  const [isAuthenticated] = useRecoilState(authState);
  const [searchParams] = useSearchParams();
  const complete = searchParams.get('complete') === 'true';

  if (auth === 'AUTH') {
    if (complete) return <Outlet />;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  }
  if (auth === 'NO_AUTH')
    return isAuthenticated ? <Navigate to="/select" /> : <Outlet />;
  return <Outlet />;
}

export default ProtectedRoute;
