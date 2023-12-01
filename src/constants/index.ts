// TODO : 각 메뉴 path 수정
export const HEADER_MENU_LIST = [
  { menu: '퀴즈 생성', path: '/' },
  { menu: '요약 정리 생성', path: '/2' },
  { menu: '저장 및 관리', path: '/3' },
];

export const TEXT_AI_QUIZ_CREATION = {
  main: 'AI와 함께 혹은 자체적으로 퀴즈를 만들어보세요',
  sub: '생성한 퀴즈는 저장 및 관리 페이지에서 확인하고 편집할 수 있습니다',
};

export const TAB_AI_QUIZ_CREATION = ['AI 퀴즈 생성', '자체 퀴즈 생성'];

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

export const CREATE_OWN_QUIZ_TYPE = ['객관식', '주관식'];
