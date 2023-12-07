import { selector } from 'recoil';
import tooltipState from '../atoms/tooltipState';

const tooltipSelector = selector({
  key: 'tooltipSelector',
  get: ({ get }) => {
    const result = get(tooltipState);
    return result;
  },
  set: ({ set }, newValue) => {
    set(tooltipState, newValue);
  },
});

export default tooltipSelector;
