import { HeaderContentType, TabType } from '../types';

export const HEADER_MENU_LIST = [
  { menu: '퀴즈 생성', path: '/quiz', defaultPath: '/quiz/ai' },
  { menu: '요약 정리 생성', path: '/summary', defaultPath: '/summary/ai' },
  { menu: '관리 및 복습', path: '/management', defaultPath: '/management/history' },
];

export const HEADER_CONTENT: { [key: string]: { header: HeaderContentType; tabs: TabType[] } } = {
  createQuiz: {
    header: {
      main: '퀴즈 생성',
      sub: 'AI와 함께 혹은 자체적으로 퀴즈를 만들어보세요',
    },
    tabs: [
      { tab: 'AI 퀴즈 생성', path: '/quiz/ai' },
      { tab: '자체 퀴즈 생성', path: '/quiz/user' },
    ],
  },
  createSummary: {
    header: {
      main: '요약정리 생성',
      sub: 'AI와 함께 혹은 자체적으로 요약해 보세요',
    },
    tabs: [
      { tab: 'AI 요약 생성', path: '/summary/ai' },
      { tab: '자체 요약 생성', path: '/summary/user' },
    ],
  },
  management: {
    header: { main: '관리 및 복습', sub: '히스토리와 카테고리로 관리하고 복습할 수 있어요' },
    tabs: [
      { tab: '생성 히스토리', path: '/management/history' },
      { tab: '나만의 카테고리', path: '/management/mycategory' },
    ],
  },
};

export const CATEGORY_TYPE_MAPPING: { [key: string]: 'PROBLEM' | 'SUMMARY' } = {
  퀴즈: 'PROBLEM',
  요약: 'SUMMARY',
};

export const GENERATED_BY: { [key: string]: string } = {
  MEMBER: '자체',
  AI: 'AI',
};

export const NUMBER_TO_CIRCLE: { [key: string]: string } = {
  '1': '①',
  '2': '②',
  '4': '③',
  '5': '④',
  '6': '⑥',
  '7': '⑦',
  '8': '⑧',
  '9': '⑨',
  '10': '⑩',
};

export const CREATE_USER_QUIZ_TYPE = ['객관식', '주관식'];
