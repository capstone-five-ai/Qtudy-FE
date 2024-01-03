import { atom } from 'recoil';

const tooltipState = atom({
  key: 'tooltipState',
  default: false,
});

export default tooltipState;
