import { editSummaryToCategory } from '@/apis/summaryCategoryApi';
import FileNameInputField from '@/components/InputField/FileNameInputField';
import DefaultSidebar from '@/components/Sidebar/DefaultSidebar';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import TopButtonBar from '@/containers/CategoryDetailPage/TopButtonBar';
import GenerateTextWrapper from '@/containers/QuizAIPage/GenerateTextWrapper';
import useDebouncedValue from '@/hooks/useDebouncedValue';
import useDuplicatedFileName from '@/hooks/useDuplicatedFileName';
import useRedirect from '@/hooks/useRedirect';
import { CategorySummaryItem } from '@/types/summary.type';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

function CategorySummaryEditPage() {
  const [params] = useSearchParams();
  const categoryId = Number(params.get('categoryId'));
  const summaryId = Number(params.get('id'));
  const [fileName, setFileName] = useState<string>('');
  const [newFileName, setNewFileName] = useState('');
  const [summaryContent, setSummaryContent] = useState<string>('');
  const [isDuplicatedFileName, setIsDuplicatedFileName] = useState<
    boolean | undefined
  >(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = useRedirect();

  const { debouncedInputValue: debouncedFileName } = useDebouncedValue({
    inputValue: newFileName,
  });

  useEffect(() => {
    const { state } = location;

    if (state.summaryData) {
      const summary = state.summaryData as CategorySummaryItem;
      setSummaryContent(summary.summaryContent);
      setFileName(summary.summaryTitle);
      setNewFileName(summary.summaryTitle);
    } else {
      navigate(
        `/management/category/summary?categoryId=${categoryId}&id=${summaryId}`
      );
    }
  }, []);

  useEffect(() => {
    if (isNaN(categoryId) || isNaN(summaryId)) redirect('/management/category');
  }, [categoryId, summaryId]);

  useDuplicatedFileName({
    initialFileName: fileName,
    fileName: debouncedFileName,
    checkType: 'SUMMARY',
    duplicateHandler: (isDuplicatedFileName) =>
      setIsDuplicatedFileName(isDuplicatedFileName),
  });

  const handleCancel = () => {
    navigate(
      `/management/category/summary?categoryId=${categoryId}&id=${summaryId}`
    );
  };

  const handleEdit = async () => {
    try {
      await editSummaryToCategory(summaryId, newFileName, summaryContent);
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
      <DefaultSidebar>
        <FileNameInputField
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          errorMessage="중복되는 제목입니다."
          isError={isDuplicatedFileName === true}
        />
      </DefaultSidebar>
    </ContentWrapper>
  );
}

export default CategorySummaryEditPage;

const StyledContent = styled.div`
  flex: 1;
  padding: 24px 36px;

  display: flex;
  flex-direction: column;
`;
