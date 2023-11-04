import styled from 'styled-components';
import { useState } from 'react';
import RadioButtonList from '../../components/Button/RadioButtonList';

const Container = styled.div`
  box-sizing: border-box;
  width: 360px;
  min-height: calc(100vh - 254px);
  padding: 24px 0px;

  background-color: yellow;
`;

const InnerContainer = styled.div`
  height: 100%;
  padding: 0px 36px;

  border-left: 1px solid;
  border-color: ${(props) => props.theme.colors.grayScale06};
`;

function RightSideBar() {
  const list = ['객관식', '주관식'];
  const [checked, setChecked] = useState<string>(list[0]);
  return (
    <Container>
      <InnerContainer>
        <RadioButtonList buttonLabel="문제 유형" buttonList={list} checked={checked} setChecked={setChecked} />
      </InnerContainer>
    </Container>
  );
}

export default RightSideBar;
