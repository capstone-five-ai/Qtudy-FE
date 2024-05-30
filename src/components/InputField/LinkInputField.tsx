import { useEffect, useRef } from 'react';
import styled from 'styled-components';

function LinkInputField({ link }: { link: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.selectionStart = e.target.value.length;
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return <Input value={link} ref={inputRef} disabled onFocus={handleFocus} />;
}

const Input = styled.input`
  width: 100%;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: none;
  background: none;
  color: ${(props) => props.theme.colors.grayScale03};
  ${({ theme }) => theme.typography.caption3};
`;

export default LinkInputField;
