// TODO: path 수정
export const HEADER_MENU_LIST = [
  {
    header: {
      title: '퀴즈 생성',
      subtitle: 'AI와 함께 혹은 자체적으로 퀴즈를 만들어보세요',
    },
    tabs: [
      { tab: 'AI 퀴즈 생성', path: '/ai' },
      { tab: '자체 퀴즈 생성', path: '/user' },
    ],
    path: '/quiz',
  },
  {
    header: {
      title: '요약정리 생성',
      subtitle: 'AI와 함께 혹은 자체적으로 요약해 보세요',
    },
    tabs: [
      { tab: 'AI 요약 생성', path: '/ai' },
      { tab: '자체 요약 생성', path: '/user' },
    ],
    path: '/summary',
  },
  {
    header: {
      title: '관리 및 복습',
      subtitle: '히스토리와 카테고리로 관리하고 복습할 수 있어요',
    },
    tabs: [
      { tab: '생성 히스토리', path: '/' },
      { tab: '나만의 카테고리', path: '/' },
    ],
    path: '/management',
  },
];
