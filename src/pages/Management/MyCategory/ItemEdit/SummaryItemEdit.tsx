import { useEffect, useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import NoButtonSideBar from '../../../../components/SideBar/NoButtonSideBar';
import FileNameInputField from '../../../../components/Input/FileNameInputField';
import TextType from '../../../../components/SelectAIType/TextType';
import { SummaryType } from '../../../../types/summary.type';

function SummaryItemEdit() {
  const [params] = useSearchParams();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const { state } = location;
    if (state.summaryData) {
      const summary = state.summaryData as SummaryType;
      setTitle(summary.summaryTitle);
      setContent(summary.summaryContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleFinishEdit = () => {
    // TODO: 요약 수정 API 연결
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  return (
    <>
      <CategoryItemContentWrapper isEdit={false} handleFinishEdit={handleFinishEdit}>
        <TextType service="summary" inputText={content} setInputText={setContent} />
      </CategoryItemContentWrapper>
      <NoButtonSideBar>
        <FileNameInputField name="file" value={title} onChange={handleFileNameChange} />
      </NoButtonSideBar>
    </>
  );
}

export default SummaryItemEdit;
