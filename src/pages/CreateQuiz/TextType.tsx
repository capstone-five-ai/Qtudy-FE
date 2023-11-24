import styled from 'styled-components';
import TextAreaField from '../../components/Input/TextAreaField';

interface TextTypeProps {
  textInput: string;
  setTextInput: React.Dispatch<React.SetStateAction<string>>;
}

function TextType({ textInput, setTextInput }: TextTypeProps) {
  return (
    <Container>
      <TextAreaField
        placeholder="퀴즈를 생성하고 싶은 관련 텍스트를 입력해주세요."
        value={textInput}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextInput(e.target.value)}
      />
    </Container>
  );
}

export default TextType;

const Container = styled.div`
  width: 100%;
  height: inherit;
  margin: 24px 36px;
`;
