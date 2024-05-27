import styled from 'styled-components';
import Scrollbar from '../Scrollbar';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextAreaField({ handleChange, ...props }: TextAreaFieldProps) {
  const handleChangeTextareaHeight = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaTarget = event.target;

    textareaTarget.style.height = '0px';
    textareaTarget.style.height = `${textareaTarget.scrollHeight}px`;
  };

  return (
    <Container>
      <TextFieldContainer>
        <StyledTextArea
          onChange={(e) => {
            handleChange(e);
            handleChangeTextareaHeight(e);
          }}
          {...props}
          rows={1}
        />
      </TextFieldContainer>
    </Container>
  );
}

export default TextAreaField;

const Container = styled.div`
  padding: 16px;
  padding-right: 0px;
  border-radius: 4px;
  height: 100%;
  background: ${(props) => props.theme.colors.grayScale09};
`;

const TextFieldContainer = styled.div`
  overflow-y: scroll;
  height: 100%;
  ${Scrollbar}
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  text-align: justify;
  overflow: hidden;

  ${({ theme }) => theme.typography.body3};

  white-space: pre-wrap;
  color: ${(props) => props.theme.colors.grayScale02};

  &::placeholder {
    color: ${(props) => props.theme.colors.grayScale05};
  }
`;
