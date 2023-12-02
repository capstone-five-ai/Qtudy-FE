import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as TextIcon } from '../../../../assets/icons/icon-text.svg';
import { ReactComponent as UploadIcon } from '../../../../assets/icons/icon-upload.svg';
import Typography from '../../../../components/Typography';

function SelectAIQuizType() {
  return (
    <Container>
      <Link to="?type=upload" style={{ textDecoration: 'none' }}>
        <TypeContainer>
          <UploadIcon />
          <Text>
            <Typography variant="subtitle" color="grayScale02">
              파일 업로드
            </Typography>
            <Typography variant="caption3" color="grayScale02">
              (.pdf, .txt, .jpg, .png)
            </Typography>
          </Text>
        </TypeContainer>
      </Link>
      <Link to="?type=text" style={{ textDecoration: 'none' }}>
        <TypeContainer>
          <TextIcon />
          <Text>
            <Typography variant="subtitle" color="grayScale02">
              텍스트 직접 입력
            </Typography>
          </Text>
        </TypeContainer>
      </Link>
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

  .sub {
    font-family: NotoSansRegular;
    font-size: 13px;
  }
`;
