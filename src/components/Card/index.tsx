import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as TextIcon } from '../../assets/icons/icon-text.svg';
import { ReactComponent as UploadIcon } from '../../assets/icons/uploadFile.svg';
import Typography from '../Typography';

export function UploadedCard() {
  return (
    <Link to="?type=upload" style={{ textDecoration: 'none' }}>
      <TypeContainer>
        <UploadIcon />
        <TextContainer>
          <Typography variant="subtitle" color="grayScale02">
            파일 업로드
          </Typography>
          <Typography variant="caption3" color="grayScale02">
            (.pdf, .txt, .jpg, .png)
          </Typography>
        </TextContainer>
      </TypeContainer>
    </Link>
  );
}

export function TextCard() {
  return (
    <Link to="?type=text" style={{ textDecoration: 'none' }}>
      <TypeContainer>
        <TextIcon />
        <TextContainer>
          <Typography variant="subtitle" color="grayScale02">
            텍스트 직접 입력
          </Typography>
        </TextContainer>
      </TypeContainer>
    </Link>
  );
}

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

    path:first-of-type {
      fill: ${(props) => props.theme.colors.mainMint};
    }

    path:nth-of-type(2),
    path:nth-of-type(3) {
      stroke: ${(props) => props.theme.colors.mainMint};
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  .sub {
    font-family: NotoSansRegular;
    font-size: 13px;
  }
`;
