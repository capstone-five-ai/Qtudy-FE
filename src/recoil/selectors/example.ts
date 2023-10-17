import { selector } from 'recoil';
import exampleState from '../atoms/exampleState';

const exampleSelector = selector({
  key: 'exampleSelector',
  get: ({ get }) => {
    const count = get(exampleState);
    return count;
  },
  set: ({ set }, newValue) => {
    set(exampleState, newValue);
  },
});

export default exampleSelector;
