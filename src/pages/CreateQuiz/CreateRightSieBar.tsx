import styled from 'styled-components';
import { useState } from 'react';
import RadioButtonList from '../../components/Button/RadioButtonList';
import LargeButton from '../../components/Button/LargeButton';
import FileNameInputField from '../../components/InputField/FileNameInputField';

const LIST = [
  { label: '문제 유형', button: ['객관식', '주관식'] },
  { label: '문제량', button: ['적게', '적당히', '많이'] },
  { label: '난이도', button: ['상', '중', '하'] },
];

interface RightSideBarProps {
  disabled?: boolean;
}

function CreateRightSideBar({ disabled = false }: RightSideBarProps) {
  const [optionInput, setOptionInput] = useState<{ [key: string]: string }>({
    '문제 유형': '',
    문제량: '',
    난이도: '',
    파일명: '',
  });

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionInput({ ...optionInput, 파일명: e.target.value });
  };

  return (
    <Container>
      <InnerContainer>
        {LIST.map((list) => (
          <RadioButtonList
            key={list.label}
            buttonLabel={list.label}
            buttonList={list.button}
            checkedButton={optionInput}
            setCheckedButton={setOptionInput}
            disabled={disabled}
          />
        ))}
        <FileNameInputField
          name="file"
          value={optionInput['파일명']}
          onChange={handleFileInputChange}
          disabled={disabled}
        />
        <LargeButton type="button" disabled={disabled}>
          Generate
        </LargeButton>
      </InnerContainer>
    </Container>
  );
}

CreateRightSideBar.defaultProps = {
  disabled: false,
};

export default CreateRightSideBar;

const Container = styled.div`
  box-sizing: border-box;
  width: 360px;
  padding: 24px 0px;
  margin-left: auto;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  height: 100%;
  padding: 0px 36px;

  border-left: 1px solid;
  border-color: ${(props) => props.theme.colors.grayScale06};
`;
