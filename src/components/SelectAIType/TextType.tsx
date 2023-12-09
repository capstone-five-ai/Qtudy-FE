import styled from 'styled-components';
import TextAreaField from '../Input/TextAreaField';
import Scrollbar from '../Scrollbar';

const PLACEHOLDER = {
  quiz: '퀴즈를 생성하고 싶은 관련 텍스트를 입력해주세요.',
  summary: '요약을 생성하고 싶은 관련 텍스트를 입력해주세요.',
};
interface TextTypeProps {
  service: 'quiz' | 'summary';
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

function TextType({ service, inputText, setInputText }: TextTypeProps) {
  return (
    <Container>
      <TextAreaField
        placeholder={PLACEHOLDER[service]}
        value={inputText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
      />
    </Container>
  );
}

export default TextType;

const Container = styled.div`
  display: flex;
  padding: 16px;
  padding-right: 0px;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.grayScale09};

  height: 100%;
  padding-right: 0;
  overflow-y: scroll;
  ${Scrollbar}
`;
