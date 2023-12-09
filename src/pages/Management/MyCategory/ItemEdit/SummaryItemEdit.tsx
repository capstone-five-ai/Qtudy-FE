import { useState } from 'react';
import ContentWrapper from '../../../../components/Wrapper/ContentWrapper';
import MainWrapper from '../../../../components/Wrapper/MainWrapper';
import MainLayout from '../../../../layouts/MainLayout';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import NoButtonSideBar from '../../../../components/SideBar/NoButtonSideBar';
import FileNameInputField from '../../../../components/Input/FileNameInputField';
import TextType from '../../../../components/SelectAIType/TextType';

function SummaryItemDetail() {
  // TODO: 바로 아이템 내용 가져오기
  const [title, setTitle] = useState('요약 정리 제목1');
  const [content, setContent] = useState('요약 정리 내용');

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <MainLayout contentKey="manage">
      <MainWrapper>
        <ContentWrapper>
          <CategoryItemContentWrapper isEdit={false}>
            <TextType service="summary" inputText={content} setInputText={setContent} />
          </CategoryItemContentWrapper>
          <NoButtonSideBar>
            <FileNameInputField name="file" value={title} onChange={handleFileNameChange} />
          </NoButtonSideBar>
        </ContentWrapper>
      </MainWrapper>
    </MainLayout>
  );
}

export default SummaryItemDetail;
