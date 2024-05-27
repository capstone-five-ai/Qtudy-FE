import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import NoButtonSideBar from '../../../../components/SideBar/NoButtonSideBar';
import FileNameInputField from '../../../../components/Input/FileNameInputField';
import { SummaryType } from '../../../../types/summary.type';
import TextAreaField from '../../../../components/Input/TextAreaField';
import SummaryCategoryApi from '../../../../api/SummaryCategoryApi';

function SummaryItemEdit() {
  const [params] = useSearchParams();
  const location = useLocation();
  const [summaryId, setSummaryId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const { state } = location;
    const id = params.get('id');
    if (id) setSummaryId(id);

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

  const handleFinishEdit = async () => {
    await SummaryCategoryApi.edit(summaryId, title, content).then(() => {
      navigate(`/management/mycategory/detail?category=summary&id=${summaryId}`);
    });
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  return (
    <>
      <CategoryItemContentWrapper isEdit handleFinishEdit={handleFinishEdit}>
        <TextAreaField
          placeholder="요약을 생성하고 싶은 관련 텍스트를 입력해주세요."
          value={content}
          handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        />
      </CategoryItemContentWrapper>
      <NoButtonSideBar>
        <FileNameInputField name="file" value={title} onChange={handleFileNameChange} />
      </NoButtonSideBar>
    </>
  );
}

export default SummaryItemEdit;
