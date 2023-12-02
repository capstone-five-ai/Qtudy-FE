import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as GenerateQuiz } from '../../assets/icons/generate_quiz.svg';
import { ReactComponent as GenerateSummary } from '../../assets/icons/generate_summary.svg';
import { ReactComponent as SaveAndManage } from '../../assets/icons/save_and_manage.svg';

import { ReactComponent as Gradation } from '../../assets/icons/gradation_ellipse.svg';
import Typography from '../../components/Typography';
import Card from './Card';

type MenuType = {
  icon: ReactNode;
  title: string;
  subTitle: string;
  content: string;
  svgType: 'fill' | 'stroke';
  path: string;
};

function SelectService() {
  const [selectedIdx, setSelectedIdx] = useState(-1);

  // TODO: path 수정 필요
  const menus: MenuType[] = [
    {
      icon: <GenerateQuiz />,
      title: '퀴즈 생성하기',
      subTitle: 'Generate a quiz',
      content: `AI와 함께 혹은 자체적으로\n퀴즈를 만들 수 있어요`,
      svgType: 'fill',
      path: '/create/quiz',
    },
    {
      icon: <GenerateSummary />,
      title: '요약 정리 생성하기',
      subTitle: 'Generate a summary',
      content: `AI와 함께 혹은 자체적으로\n요약 정리를 할 수 있어요`,
      svgType: 'fill',
      path: '/create/summary',
    },
    {
      icon: <SaveAndManage />,
      title: '저장 및 관리하기',
      subTitle: 'Save and manage',
      content: `생성한 것들을 편리하게\n저장 및 관리할 수 있어요`,
      svgType: 'stroke',
      path: '/',
    },
  ];

  return (
    <Container>
      <Title>
        <Typography variant="h1" component="span" color="mainMint">
          큐터디
        </Typography>
        <Typography variant="h1" component="span">
          와 함께 시작할 기능을 선택해주세요!
        </Typography>
        <GradationContainer>
          <Gradation />
        </GradationContainer>
      </Title>
      <CardContainer>
        {menus.map((menu, idx) => (
          <div
            key={menu.title}
            onFocus={() => null}
            onBlur={() => null}
            onMouseOver={() => setSelectedIdx(idx)}
            onMouseOut={() => setSelectedIdx(-1)}
          >
            <Card {...menu} selected={idx === selectedIdx} selectedIdx={selectedIdx} />
          </div>
        ))}
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 84px;

  height: calc(100vh - 64px);
`;

const Title = styled.div`
  display: flex;
  position: relative;
`;

const GradationContainer = styled.div`
  position: absolute;
  top: -62px;
  right: -72px;
`;

const CardContainer = styled.div`
  display: flex;

  gap: 48px;
`;

export default SelectService;
