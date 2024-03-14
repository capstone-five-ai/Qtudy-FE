import styled from 'styled-components';
import { TextCard, UploadedCard } from '../Card';
import Typography from '../Typography';

const SERVICE: { [key: string]: string } = {
  quiz: `생성하고 싶은 관련 파일 업로드 혹은 텍스트를 입력해보세요.\nAI가 퀴즈를 자동으로 생성해드려요!`,
  summary: '파일 업로드 혹은 텍스트 입력 시\nAI가 자동으로 요약해 드려요!',
};

function SelectAIType({ service }: { service: string }) {
  return (
    <Container>
      <InnerContainer>
        <TextContainer>
          <Typography variant="caption2" color="grayScale03">
            {SERVICE[service]}
          </Typography>
        </TextContainer>
        <CardContainer>
          <UploadedCard />
          <TextCard />
        </CardContainer>
      </InnerContainer>
    </Container>
  );
}

export default SelectAIType;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const InnerContainer = styled.div`
  position: relative;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
`;

const TextContainer = styled.div`
  > div {
    width: 100%;
    position: absolute;
    top: -90px;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    white-space: pre-wrap;
  }
`;
