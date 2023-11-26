import { selector } from 'recoil';
import loadingState from '../atoms/LoadingState';

const loadingSelector = selector({
  key: 'loadingSelector',
  get: ({ get }) => {
    const result = get(loadingState);
    return result;
  },
  set: ({ set }, newValue) => {
    set(loadingState, newValue);
  },
});

export default loadingSelector;
