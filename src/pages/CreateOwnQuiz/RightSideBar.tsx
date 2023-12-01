import RadioButtonList from '../../components/Button/RadioButton/RadioButtonList';
import SideBar from '../../components/SideBar';
import { CREATE_OWN_QUIZ_TYPE } from '../../constants';

interface RightSideBarProps {
  quizType: { [key: string]: string };
  disabled: boolean;
  setQuizType: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  handleSubmit: () => void;
}

function RightSideBar({ quizType, disabled, setQuizType, handleSubmit }: RightSideBarProps) {
  return (
    <SideBar buttonDisabled={disabled} handleSubmit={handleSubmit}>
      <RadioButtonList
        optionInputKey="type"
        buttonLabel="문제 유형"
        buttonList={CREATE_OWN_QUIZ_TYPE}
        inputOption={quizType}
        setInputOption={setQuizType}
        disabled={false}
      />
    </SideBar>
  );
}

export default RightSideBar;
