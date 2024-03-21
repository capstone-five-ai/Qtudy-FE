import styled from 'styled-components';
import SideBar from '../../../../components/SideBar';
import Typography from '../../../../components/Typography';
import { CREATE_USER_QUIZ_TYPE } from '../../../../constants';
import RadioButtonField from '../../../../components/Button/RadioButton/RadioButtonField';
import { ProblemType } from '../../../../types/question.type';

interface RightSideBarProps {
  quizType: { [key: string]: string };
  disabled: boolean;
  setQuizType: React.Dispatch<React.SetStateAction<{ label: string; value: ProblemType }>>;
  handleSubmit: () => void;
}

function RightSideBar({ quizType, disabled, setQuizType, handleSubmit }: RightSideBarProps) {
  return (
    <SideBar buttonDisabled={disabled} handleSubmit={handleSubmit}>
      <Container>
        <Typography variant="subtitle" color="grayScale02">
          퀴즈 유형
        </Typography>
        <ButtonContainer>
          {CREATE_USER_QUIZ_TYPE.map((button) => (
            <RadioButtonField
              key={button.label}
              value={button.label}
              name="퀴즈 유형"
              checked={button.label === quizType.label}
              onChange={() => {
                setQuizType(button);
              }}
              disabled={false}
            />
          ))}
        </ButtonContainer>
      </Container>
    </SideBar>
  );
}

export default RightSideBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;
