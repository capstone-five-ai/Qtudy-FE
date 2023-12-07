import RadioButtonFieldList from '../../../../components/Button/RadioButton/RadioButtonFieldList';
import SideBar from '../../../../components/SideBar';
import { CREATE_USER_QUIZ_TYPE } from '../../../../constants';

interface RightSideBarProps {
  quizType: { [key: string]: string };
  disabled: boolean;
  setQuizType: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  handleSubmit: () => void;
}

function RightSideBar({ quizType, disabled, setQuizType, handleSubmit }: RightSideBarProps) {
  return (
    <SideBar buttonDisabled={disabled} handleSubmit={handleSubmit}>
      <RadioButtonFieldList
        optionInputKey="type"
        buttonLabel="문제 유형"
        buttonList={CREATE_USER_QUIZ_TYPE}
        inputOption={quizType}
        setInputOption={setQuizType}
        disabled={false}
      />
    </SideBar>
  );
}

export default RightSideBar;
