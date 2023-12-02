import { HeaderContentType, TabType } from '../types';

// TODO : 각 메뉴 path 수정
export const HEADER_MENU_LIST = [
  { menu: '퀴즈 생성', path: '/create/quiz' },
  { menu: '요약 정리 생성', path: '/2' },
  { menu: '저장 및 관리', path: '/3' },
];

export const HEADER_CONTENT: { [key: string]: { header: HeaderContentType; tabs: TabType[] } } = {
  createQuiz: {
    header: {
      main: 'AI와 함께 혹은 자체적으로 퀴즈를 만들어보세요',
      sub: '생성한 퀴즈는 저장 및 관리 페이지에서 확인하고 편집할 수 있습니다',
    },
    tabs: [
      { tab: 'AI 퀴즈 생성', path: '/create/quiz/ai' },
      { tab: '자체 퀴즈 생성', path: '/create/quiz/own' },
    ],
  },
  createSummary: {
    header: {
      main: 'AI와 함께 혹은 자체적으로 요약 정리해보세요',
      sub: '생성한 요약은 저장 및 관리 페이지에서 확인하고 편집할 수 있습니다',
    },
    tabs: [
      { tab: 'AI 요약 생성', path: '/' },
      { tab: '자체 요약 생성', path: '/' },
    ],
  },
  manage: {
    header: { main: 'AI가 생성한 퀴즈 및 요약 히스토리를 확인해보세요', sub: '' },
    tabs: [
      { tab: '생성 히스토리', path: '/' },
      { tab: '나만의 카테고리', path: '/' },
    ],
  },
};
