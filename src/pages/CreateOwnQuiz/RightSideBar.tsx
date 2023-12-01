import { useState } from 'react';
import RadioButtonList from '../../components/Button/RadioButton/RadioButtonList';
import SideBar from '../../components/SideBar';

interface RightSideBarProps {
  handleSubmit: () => void;
}

function RightSideBar({ handleSubmit }: RightSideBarProps) {
  const [inputOption, setInputOption] = useState<{ [key: string]: string }>({ type: '' });
  return (
    <SideBar buttonDisabled={false} handleSubmit={handleSubmit}>
      <RadioButtonList
        optionInputKey="type"
        buttonLabel="문제 유형"
        buttonList={['객관식', '주관식']}
        inputOption={inputOption}
        setInputOption={setInputOption}
        disabled={false}
      />
    </SideBar>
  );
}

export default RightSideBar;
