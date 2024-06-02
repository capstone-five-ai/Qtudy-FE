import { useEffect, useState } from 'react';

interface DebouncedValueProps {
  inputValue?: string;
  delay?: number;
}

const useDebouncedValue = ({
  inputValue,
  delay = 500,
}: DebouncedValueProps) => {
  const [debouncedInputValue, setDebouncedInputValue] = useState('');

  useEffect(() => {
    if (inputValue === undefined) return;
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, delay);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, delay]);

  return { debouncedInputValue };
};

export default useDebouncedValue;
