import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import authState from '../recoil/atoms/authState';

type Props = {
  auth: 'AUTH' | 'NO_AUTH' | 'COMMON';
};

function ProtectedRoute({ auth }: Props) {
  const [isAuthenticated] = useRecoilState(authState);

  if (auth === 'AUTH') return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  if (auth === 'NO_AUTH') return isAuthenticated ? <Navigate to="/select" /> : <Outlet />;
  return <Outlet />;
}

export default ProtectedRoute;
