import { Route, Routes } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import History from './History';
import MyCategory from './MyCategory';

function Management() {
  return (
    <MainLayout contentKey="management">
      <Routes>
        <Route path="/history" element={<History />} />
        <Route path="/mycategory" element={<MyCategory />} />
      </Routes>
    </MainLayout>
  );
}

export default Management;
