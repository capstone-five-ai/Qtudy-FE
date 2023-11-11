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

function RightSideBar() {
  const [checked, setChecked] = useState<string>('');
  return (
    <Container>
      <InnerContainer>
        {LIST.map((list) => (
          <RadioButtonList
            buttonLabel={list.label}
            buttonList={list.button}
            checkedValue={checked}
            setCheckedValue={setChecked}
            disabled={false}
          />
        ))}
        <FileNameInputField />
        <LargeButton type="button">생성하기</LargeButton>
      </InnerContainer>
    </Container>
  );
}

export default RightSideBar;

const Container = styled.div`
  box-sizing: border-box;
  width: 360px;
  min-height: calc(100vh - 254px);
  padding: 24px 0px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: 100%;
  padding: 0px 36px;

  border-left: 1px solid;
  border-color: ${(props) => props.theme.colors.grayScale06};
`;
