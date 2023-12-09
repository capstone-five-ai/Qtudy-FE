import { Route, Routes } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import History from './History';
import MyCategory from './MyCategory';
import ItemDetail from './MyCategory/ItemDetail';
import ItemEdit from './MyCategory/ItemEdit';

function Management() {
  return (
    <MainLayout contentKey="management">
      <Routes>
        <Route path="/history" element={<History />} />
        <Route path="/mycategory" element={<MyCategory />} />
        <Route path="/mycategory/detail" element={<ItemDetail />} />
        <Route path="/mycategory/edit" element={<ItemEdit />} />
      </Routes>
    </MainLayout>
  );
}

export default Management;
