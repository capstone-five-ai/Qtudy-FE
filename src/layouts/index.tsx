import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Header from '../components/Header';
import Loader from '../components/Loader';
import loadingSelector from '../recoil/selectors/loading';

function Layout() {
  const loading = useRecoilValue(loadingSelector);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
