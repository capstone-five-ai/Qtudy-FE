import FileNameInputField from '@/components/InputField/FileNameInputField';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import TopButtonBar from '@/containers/CategoryDetailPage/TopButtonBar';
import GenerateTextWrapper from '@/containers/QuizAIPage/GenerateTextWrapper';
import { useState } from 'react';
import styled from 'styled-components';

function CategorySummaryEditPage() {
  const [fileName, setFileName] = useState('');
  const [summaryContent, setSummaryContent] = useState<string>('');

  return (
    <ContentWrapper>
      <StyledContent>
        <TopButtonBar isEdit />
        <StyledInnerContainer>
          <GenerateTextWrapper
            type="SUMMARY"
            inputText={summaryContent}
            setInputText={setSummaryContent}
          />
        </StyledInnerContainer>
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

const StyledInnerContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  ${Scrollbar}
`;
