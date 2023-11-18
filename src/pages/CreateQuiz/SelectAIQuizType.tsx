import styled from 'styled-components';
import { ReactComponent as UploadIcon } from '../../assets/svg/icon-upload.svg';
import { ReactComponent as TextIcon } from '../../assets/svg/icon-text.svg';

interface SelectAIQuizTypeProps {
  setCreateType: React.Dispatch<React.SetStateAction<'upload' | 'text' | null>>;
}

function SelectAIQuizType({ setCreateType }: SelectAIQuizTypeProps) {
  return (
    <Container>
      <TypeContainer onClick={() => setCreateType('upload')}>
        <UploadIcon />
        <Text>
          <span className="main">파일 업로드</span>
          <span>(.pdf, .txt, .jpg, .png)</span>
        </Text>
      </TypeContainer>
      <TypeContainer onClick={() => setCreateType('text')}>
        <TextIcon />
        <Text>
          <span className="main">텍스트 직접 입력</span>
        </Text>
      </TypeContainer>
    </Container>
  );
}

export default SelectAIQuizType;

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

const TypeContainer = styled.div`
  background: ${(props) => props.theme.colors.grayScale09};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 220px;
  height: 220px;
  border-radius: 12px;
  box-shadow: 0px 0px 8px 0px rgba(189, 189, 189, 0.2);
  &:hover {
    box-shadow: 0px 0px 8px 0px rgba(54, 189, 180, 0.24);
    path {
      fill: ${(props) => props.theme.colors.mainMint};
    }
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  .main {
    font-family: NotoSansMedium;
    font-size: 14px;
  }
  .sub {
    font-family: NotoSansRegular;
    font-size: 13px;
  }
`;
