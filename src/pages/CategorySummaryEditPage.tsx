import { editSummaryToCategory } from '@/apis/summaryCategoryApi';
import FileNameInputField from '@/components/InputField/FileNameInputField';
import Sidebar from '@/components/Sidebar/Sidebar';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import TopButtonBar from '@/containers/CategoryDetailPage/TopButtonBar';
import GenerateTextWrapper from '@/containers/QuizAIPage/GenerateTextWrapper';
import useRedirect from '@/hooks/useRedirect';
import { CategorySummaryItem } from '@/types/summary.type';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

function CategorySummaryEditPage() {
  const [params] = useSearchParams();
  const categoryId = Number(params.get('categoryId'));
  const summaryId = Number(params.get('id'));
  const [fileName, setFileName] = useState('');
  const [summaryContent, setSummaryContent] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = useRedirect();

  useEffect(() => {
    const { state } = location;

    if (state.summaryData) {
      const summary = state.summaryData as CategorySummaryItem;
      setSummaryContent(summary.summaryContent);
      setFileName(summary.summaryTitle);
    } else {
      navigate(
        `/management/category/summary?categoryId=${categoryId}&id=${summaryId}`
      );
    }
  }, []);

  useEffect(() => {
    if (isNaN(categoryId) || isNaN(summaryId)) redirect('/management/category');
  }, [categoryId, summaryId]);

  const handleCancel = () => {
    navigate(
      `/management/category/summary?categoryId=${categoryId}&id=${summaryId}`
    );
  };

  const handleEdit = async () => {
    try {
      await editSummaryToCategory(summaryId, fileName, summaryContent);
      handleCancel();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ContentWrapper>
      <StyledContent>
        <TopButtonBar
          isEdit
          handleCancel={handleCancel}
          handleComplete={handleEdit}
        />
        <GenerateTextWrapper
          type="SUMMARY"
          inputText={summaryContent}
          setInputText={setSummaryContent}
        />
      </StyledContent>
      <Sidebar>
        <FileNameInputField
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </Sidebar>
    </ContentWrapper>
  );
}

export default CategorySummaryEditPage;

const StyledContent = styled.div`
  flex: 1;
  padding: 24px 20px 24px 40px;

  display: flex;
  flex-direction: column;
`;
