import { useState } from 'react';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import NoButtonSideBar from '../../../../components/SideBar/NoButtonSideBar';
import FileNameInputField from '../../../../components/Input/FileNameInputField';
import TextType from '../../../../components/SelectAIType/TextType';
import { SummaryType } from '../../../../types/summary.type';

function SummaryItemEdit() {
  // TODO: 바로 아이템 내용 가져오기

  const summary: SummaryType = {
    summaryTitle: 'Sum no.1',
    summaryContent: `인공지능(AI)은 인간의 인지 능력을 모방할 수 있는 지능적인 기계를 만드는 기술과 연구 분야입니다. 이는 음성 인식, 문제 해결, 학습, 의사 결정 및 패턴 인식과 같이 일반적으로 인간의 지능이 필요한 작업을 수행할 수 있는 컴퓨터 시스템 및 알고리즘을 개발하는 것을 포함합니다. AI는 기계 학습, 자연어 처리, 컴퓨터 비전 및 로봇 공학을 비롯한 다양한 하위 분야를 포함합니다. AI는 의료, 금융, 교통, 제조 및 엔터테인먼트 등 다양한 분야에서 응용되고 있습니다.`,
  };

  const [title, setTitle] = useState(summary.summaryTitle);
  const [content, setContent] = useState(summary.summaryContent);

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleFinishEdit = () => {
    // TODO: 요약 수정 API 연결
  };

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
