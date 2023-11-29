// TODO : 각 메뉴 path 수정
export const HEADER_MENU_LIST = [
  { menu: '퀴즈 생성', path: '/' },
  { menu: '요약 정리 생성', path: '/2' },
  { menu: '저장 및 관리', path: '/3' },
];

export const HEADER_CONTENT_CREATE_QUIZ = {
  main: 'AI와 함께 혹은 자체적으로 퀴즈를 만들어보세요',
  sub: '생성한 퀴즈는 저장 및 관리 페이지에서 확인하고 편집할 수 있습니다',
};

export const TAB_CREATE_QUIZ = [
  { tab: 'AI 퀴즈 생성', path: '/create/quiz/ai' },
  { tab: '자체 퀴즈 생성', path: '/create/quiz/own' },
];
